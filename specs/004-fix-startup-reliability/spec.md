# Feature Specification: Diagnóstico, Correção de Inicialização e Alta Disponibilidade PWA (`https://hyrox-simulado-26d.web.app/`)

**Feature Branch**: `004-fix-startup-reliability`  
**Created**: 2026-11-10  
**Status**: Implemented  
**Input**: User description: `"https://hyrox-simulado-26d.web.app/ NAO ESTA INICIANDO, VERIFICAR, ANALISAR E DEIXAR FUNCIONANDO"`

---

## Diagnóstico Técnico da Causa-Raiz (Por que o site não iniciava)

A análise da aplicação publicada em `https://hyrox-simulado-26d.web.app/` identificou **4 causas técnicas combinadas** que impediam o arranque da interface no navegador Web/Mobile:

1. **Dependência de Transpilação JSX em Tempo de Execução (`@babel/standalone` ~3,2 MB via `unpkg.com`)**:
   - O ficheiro `public/index.html` continha ~5.080 linhas dentro de `<script type="text/babel">` que dependiam do download e execução síncrona de `https://unpkg.com/@babel/standalone/babel.min.js` (que sofre redirecionamento HTTP `302` no `unpkg.com`). Quando o redirecionamento atrasava, falhava ou disparava após o evento `DOMContentLoaded`, o bloco `<script type="text/babel">` nunca era compilado nem executado, deixando `<div id="root"></div>` vazio (ecrã escuro `#020617`).
2. **Interceção Indevida de Scripts Cross-Origin pelo Service Worker (`public/sw.js`)**:
   - O Service Worker intercetava todas as requisições `GET` (incluindo scripts externos de CDNs como `cdn.tailwindcss.com` e `unpkg.com`) dentro de `event.respondWith(fetch(event.request))`. Em navegadores modernos (Chrome/Safari/Edge), intercetar tags `<script>` cross-origin sem CORS explícito e com redirecionamento HTTP `302` resulta em respostas opacas bloqueadas (`ERR_FAILED`) ou cache corrompido.
3. **Retenção de Cache Antigo (`v1`/`v2`/`v3`) sem Auto-Recuperação (`Self-Healing`) nem Cabeçalhos `no-cache`**:
   - Navegadores que acederam à primeira versão do site mantinham o Service Worker antigo e o `index.html` em cache sem cabeçalhos `Cache-Control: no-cache, no-store, must-revalidate` no `firebase.json`.
4. **Leitura de `localStorage` sem `try/catch` Defensivo**:
   - Leituras diretas de `JSON.parse(localStorage.getItem(...))` sem bloco `try/catch` podiam interromper a montagem inicial do componente `App` caso houvesse qualquer dado residual inválido no armazenamento local do navegador.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Inicialização Instantânea sem Transpilador Babel em Runtime (Priority: P1)

Como atleta ou treinador ao abrir `https://hyrox-simulado-26d.web.app/` no computador ou telemóvel, quero que a aplicação **HYROX Periodização** inicie imediatamente em menos de 1 segundo, sem depender de compilação JSX no navegador (`@babel/standalone`), exibindo o painel completo Pro Dark Mode logo no primeiro acesso.

**Why this priority**: É a correção central que elimina 100% do ponto único de falha de arranque (`<script type="text/babel">`).

**Independent Test**: Abrir `https://hyrox-simulado-26d.web.app/` em qualquer navegador desktop ou mobile e verificar que o cabeçalho `HYROX Periodização`, a faixa de 4 KPIs e as 6 abas carregam instantaneamente.

**Acceptance Scenarios**:

1. **Given** que o utilizador acede a `https://hyrox-simulado-26d.web.app/`, **When** o documento HTML é carregado, **Then** o código da aplicação já está pré-compilado em JavaScript nativo (`React.createElement`) e monta a interface sem necessitar de `@babel/standalone`.
2. **Given** que uma CDN primária (`cdnjs.cloudflare.com`) sofra instabilidade na rede da operadora, **When** a página carrega, **Then** um mecanismo de fallback automático carrega `React` e `ReactDOM` a partir de CDN secundária (`jsdelivr.net` / `unpkg.com`) antes de montar a aplicação.

---

### User Story 2 - Auto-Limpeza de Service Worker/Cache Antigo e Proteção Same-Origin (Priority: P1)

Como utilizador que já visitou `https://hyrox-simulado-26d.web.app/` anteriormente, quero que a página limpe automaticamente caches/Service Workers antigos (`v1`, `v2`, `v3`) e que o novo Service Worker (`v4`) nunca intercete scripts de CDNs externas, garantindo que atualizações futuras entrem em vigor imediatamente.

**Why this priority**: Sem invalidar o cache antigo e restringir o Service Worker a `same-origin`, os dispositivos que visitaram a versão anterior continuariam presos no ecrã em branco em cache.

**Independent Test**: Recarregar `https://hyrox-simulado-26d.web.app/` num navegador com cache prévio e confirmar que os caches legados são removidos e a aplicação inicia normalmente.

**Acceptance Scenarios**:

1. **Given** um navegador com caches antigos (`hyrox-26d-pwa-v1`, `v2` ou `v3`), **When** o utilizador abre `https://hyrox-simulado-26d.web.app/`, **Then** o bootloader remove os caches obsoletos e aplica cabeçalhos `Cache-Control: no-cache, no-store, must-revalidate` para `/index.html` e `/sw.js`.
2. **Given** que a página requisita recursos externos (`cdn.tailwindcss.com`, `cdnjs.cloudflare.com`), **When** o evento `fetch` passa pelo `sw.js`, **Then** o Service Worker ignora imediatamente qualquer URL de origem externa (`url.origin !== self.location.origin`).

---

### User Story 3 - Bootloader Visual, Error Boundary e Leitura Segura de `localStorage` (Priority: P2)

Como utilizador, quero ver um indicador visual imediato enquanto a aplicação monta e, caso exista algum dado corrompido no `localStorage`, quero que a aplicação recupere automaticamente os valores padrão sem nunca apresentar uma tela preta ou em branco.

**Why this priority**: Garante resiliência total contra falhas de estado local ou conexões móveis lentas.

**Independent Test**: Inserir um JSON inválido no `localStorage` e recarregar a página; a aplicação deve ignorar o valor inválido, usar o fallback seguro e abrir normalmente.

**Acceptance Scenarios**:

1. **Given** um valor corrompido em qualquer chave `hyrox_*` do `localStorage`, **When** a aplicação inicia, **Then** o helper `safeReadStorage` captura a exceção e restaura o valor padrão sem travar o React.
2. **Given** o carregamento inicial da página, **When** o HTML é exibido antes da hidratação do React, **Then** `<div id="root">` mostra um painel de arranque Pro Dark Mode com botão de recuperação rápida caso a rede bloqueie scripts externos.

---

### Edge Cases

- **Bloqueio ou lentidão de CDN numa operadora móvel**: O carregador sequencial tenta `cdnjs.cloudflare.com` (sem redirecionamentos 302) e faz fallback automático para `cdn.jsdelivr.net` e `unpkg.com`.
- **Utilizador preso em Service Worker antigo**: Caso a aplicação não sinalize `window.__HYROX_BOOTED__ = true` em até 4 segundos no primeiro carregamento, o script de auto-recuperação desregistra todos os Service Workers, limpa a Cache Storage e recarrega a página limpa.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A aplicação em `public/index.html` e `hyrox_26_day_tactical_periodization_tracker.html` DEVE conter todo o código da aplicação pré-compilado em JavaScript padrão (`React.createElement`), eliminando completamente a dependência de `@babel/standalone` em tempo de execução.
- **FR-002**: O carregamento de `React 18` e `ReactDOM 18` DEVE utilizar URLs diretos e estáveis (`cdnjs.cloudflare.com`) com fallback automático para `cdn.jsdelivr.net`.
- **FR-003**: Todas as leituras e gravações de `localStorage` DEVEM ser encapsuladas em funções utilitárias com `try/catch` (`safeReadStorage` / `safeWriteStorage`) para impedir falhas de arranque por JSON inválido ou modo privado restrito.
- **FR-004**: O ficheiro `public/sw.js` (`hyrox-periodizacao-pwa-v4`) DEVE ignorar estritamente todas as requisições cross-origin (`if (url.origin !== self.location.origin) return;`) e eliminar todas as caches anteriores durante a ativação.
- **FR-005**: O ficheiro `firebase.json` DEVE configurar cabeçalhos HTTP `Cache-Control: no-cache, no-store, must-revalidate` para `/`, `/index.html`, `/sw.js` e `/manifest.json`.
- **FR-006**: A aplicação DEVE incluir um `ErrorBoundary` React e um ecrã inicial de bootloader dentro de `<div id="root">` com botão de limpeza de cache/recuperação com 1 clique.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero erros de sintaxe ou de execução JavaScript validados via compilação e teste automatizado em Node.js antes do deploy.
- **SC-002**: Tempo de arranque da interface (`window.__HYROX_BOOTED__ === true`) inferior a **300ms** após o carregamento dos scripts base, com 0 bytes de `@babel/standalone` transferidos.
- **SC-003**: Site publicado e ativo em `https://hyrox-simulado-26d.web.app/` e sincronizado no repositório GitHub `https://github.com/Gegeu-sp/simulado_hyrox.git`.


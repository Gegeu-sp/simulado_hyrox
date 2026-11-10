# Phase 0 Research: Aplicação Web e Mobile (PWA) no Firebase para o Tracker HYROX 26 Dias

**Feature**: `002-firebase-web-mobile-pwa`
**Date**: 2026-11-10

## 1. Empacotamento Executável para Firebase Hosting (`public/index.html`)

- **Decision**: Estruturar o diretório `public/` como raiz de publicação do **Firebase Hosting** (`firebase.json`), contendo `public/index.html` (aplicação web/mobile autónoma completa com `<!DOCTYPE html>`, meta tags mobile/PWA, Tailwind CSS, importação modular de `react`, `react-dom/client` e `lucide-react` + motor completo do Tracker HYROX 26 Dias e Pareto 80/20), `public/manifest.json`, `public/sw.js` (Service Worker de cache offline) e `public/icon.svg`. Manter também o ficheiro `hyrox_26_day_tactical_periodization_tracker.html` na raiz sincronizado como versão HTML executável autocontida.
- **Rationale**: Atualmente, `hyrox_26_day_tactical_periodization_tracker.html` contém apenas código JSX bruto (`import React...`) sem estrutura HTML, não podendo ser aberto diretamente num navegador nem servido estaticamente no Firebase Hosting. Um bundle HTML autocontido em `public/index.html` elimina a necessidade de etapas frágeis de compilação local e permite deploy imediato via `npx -y firebase-tools@latest deploy --only hosting`.
- **Alternatives Considered**:
  - *Criar um projeto Next.js / SSR com Firebase App Hosting*: Rejeitado pelas diretrizes da skill `firebase-hosting-basics` ("Choose Firebase Hosting if you are deploying a simple SPA without SSR") e pelo Princípio III da Constituição (*100% Client-Side & Offline-First*).

## 2. Experiência Mobile Nativa (PWA, Bottom Navigation Bar e Screen Wake Lock)

- **Decision**:
  1. **PWA Standalone (`manifest.json` + `sw.js`)**: Configurar `"display": "standalone"`, `"orientation": "portrait"`, `"background_color": "#020617"` e `"theme_color": "#020617"`, com Service Worker de estratégia *Stale-While-Revalidate* para cache offline completo após a primeira visita.
  2. **Barra de Navegação Inferior Fixa Mobile (`Bottom Navigation Bar`)**: Em ecrãs `< 768px` (`md:hidden`), apresentar uma barra fixa na base (`fixed bottom-0 inset-x-0 z-40`) com acesso direto de 1 toque às 6 vistas (`Treino`, `1RMs`, `Calendário`, `Carga`, `Tática`, `Nutrição`), respeitando `env(safe-area-inset-bottom)` para iOS/Android.
  3. **Prevenção de Bloqueio de Ecrã (`Screen Wake Lock API`)**: Integrar `navigator.wakeLock.request('screen')` atrelado ao estado `timerRunning` do Cronómetro EMOM & Roxzone (com fallback silencioso caso o navegador não suporte), exibindo indicador visual `Ecrã Ativo` enquanto o cronómetro estiver em contagem.
- **Rationale**: No ginásio, o bloqueio automático do ecrã do telemóvel durante um EMOM ou simulação obriga o atleta a desbloquear o aparelho com mãos suadas. A barra inferior coloca todas as abas na zona de alcance natural do polegar.
- **Alternatives Considered**:
  - *Manter apenas abas horizontais no topo com scroll*: Pouco ergonómico em smartphones durante o treino.

## 3. Sincronização Híbrida Web ↔ Mobile (Firestore + LocalStorage + Backup JSON)

- **Decision**: Implementar um módulo de **Sincronização Web & Mobile (Cloud Sync + Backup JSON)** baseado no padrão *Local-First, Cloud-Synced*:
  - O `localStorage` (`hyrox_*`) continua a ser lido e escrito síncrona e instantaneamente em cada interação (latência zero).
  - Um objeto consolidado `AthleteSyncSnapshot` (contendo todas as 10 chaves de estado do atleta + `updatedAt` ISO timestamp + `deviceLabel`) pode ser sincronizado com o **Cloud Firestore** na coleção `hyrox_profiles/{syncCode}` (via SDK/REST do Firebase quando configurado pelo utilizador) e também exportado/importado como ficheiro `.json` ou código copiável em 1 clique.
  - Resolução de conflitos: Prevalece o snapshot com `updatedAt` mais recente (*Last-Write-Wins*), com confirmação clara na interface ao puxar dados da nuvem.
- **Rationale**: Respeita rigorosamente o Princípio III da Constituição (nenhuma dependência bloqueante de rede durante o treino) enquanto resolve o problema de continuidade entre o computador de casa (Web) e o smartphone no ginásio (Mobile).
- **Alternatives Considered**:
  - *Substituir `localStorage` por leituras diretas de rede*: Rejeitado porque viola o Princípio III da Constituição e degradaria a performance em ginásios sem cobertura móvel.

## 4. Regras de Segurança do Cloud Firestore (`firestore.rules`)

- **Decision**: Isolar os documentos de perfil em `match /hyrox_profiles/{syncCode}` exigindo validação estrita de esquema, tamanho de payload e campos obrigatórios (`updatedAt`, `divisionKey`, `selectedDayNum`), delegando a autoria do ficheiro `firestore.rules` ao subagente especialista obrigatório `firestore-rules-author` durante a fase de implementação.
- **Rationale**: Cumpre a diretriz obrigatória do ambiente para `firestore.rules` e impede gravações malformadas ou abusivas na coleção de perfis sincronizados.


# Feature Specification: Aplicação Web e Mobile (PWA) no Firebase para o Tracker HYROX 26 Dias

**Feature Branch**: `002-firebase-web-mobile-pwa`

**Created**: 2026-11-10

**Status**: Draft

**Input**: User description: "vamos criar uma pagina no firebase para ter web e mobile"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acesso Web Público e Instalação Mobile como App (PWA) (Priority: P1)

Como atleta em preparação para o simulado HYROX, quero aceder ao Tracker de Periodização de 26 Dias através de um endereço web público rápido (hospedado no Firebase) tanto no navegador do computador quanto no telemóvel, podendo instalá-lo no ecrã inicial do smartphone (iOS e Android) em tela cheia e utilizá-lo dentro do ginásio ou pista mesmo sem sinal de internet.

**Why this priority**: Atualmente o código do tracker está em formato de componente bruto não executável diretamente no navegador. Transformá-lo numa página web funcional, responsiva e instalável no telemóvel é o requisito base para uso real no dia a dia de treinos.

**Independent Test**: Pode ser testado abrindo o URL da aplicação num navegador desktop e num telemóvel, instalando o atalho no ecrã inicial (PWA), ativando o modo avião e verificando que todas as 6 abas e o Motor de Pareto 80/20 funcionam integralmente.

**Acceptance Scenarios**:

1. **Given** que a aplicação está publicada no endereço web do Firebase, **When** o atleta abre o link no computador ou no telemóvel, **Then** a página carrega imediatamente com todas as funcionalidades do Tracker de 26 Dias e do Motor de Pareto 80/20 prontas a usar, sem necessidade de ferramentas de desenvolvimento.
2. **Given** que o atleta acede à página pelo navegador do telemóvel (Android ou iOS), **When** seleciona "Adicionar ao Ecrã Principal / Instalar App", **Then** a aplicação abre em modo autónomo (*standalone* sem barras de endereço do navegador), com ícone dedicado HYROX e suporte completo a funcionamento *offline*.

---

### User Story 2 - Experiência Otimizada para Uso Mobile em Ginásio/Pista (Priority: P2)

Como atleta durante uma sessão de treino intensa (com mãos suadas e sob fadiga), quero uma navegação móvel ergonómica ao alcance do polegar, com áreas de toque amplas para o cronómetro da Roxzone, registo de RPE e seleção de dias, e manutenção do ecrã ativo (*Wake Lock*) enquanto o cronómetro estiver em contagem.

**Why this priority**: A utilização em telemóvel durante o treino exige ergonomia tátil superior à de um ecrã desktop comum, evitando toques acidentais ou bloqueio do ecrã a meio de um EMOM ou transição de Roxzone.

**Independent Test**: Pode ser testado em janela mobile (`360px`–`430px` de largura) verificando a barra de navegação inferior fixa para o polegar, o tamanho dos botões interativos e a permanência do cronómetro visível durante a execução do treino.

**Acceptance Scenarios**:

1. **Given** que o atleta abre a aplicação num ecrã mobile, **When** navega entre as 6 secções principais (`Treino`, `1RMs`, `Calendário`, `Carga`, `Tática`, `Nutrição`), **Then** dispõe de uma barra de navegação rápida e ergonómica na base do ecrã (além do cabeçalho compacto) que não exige rolagem lateral complexa.
2. **Given** que o atleta está a meio de uma sessão na aba "Treino do Dia" no telemóvel, **When** aciona o Cronómetro EMOM & Roxzone (ou o botão "3 Passos"), **Then** o cronómetro permanece facilmente acessível em destaque e solicita ao dispositivo que mantenha o ecrã ligado enquanto a contagem estiver ativa.

---

### User Story 3 - Continuidade de Dados entre Web (Computador) e Mobile (Telemóvel) (Priority: P2)

Como atleta que planeia a estratégia e analisa gráficos no computador (Web), mas regista cargas, `1RMs`, `sRPE` e conclusão de treinos no telemóvel durante a sessão no ginásio (Mobile), quero que o meu progresso esteja acessível em ambos os dispositivos sem perder dados caso fique sem internet no ginásio.

**Why this priority**: Ter versão Web e Mobile só entrega 100% de valor se o atleta não ficar com dois históricos separados e incompatíveis (um no computador de casa e outro no telemóvel do ginásio).

**Independent Test**: Pode ser testado alterando um valor (ex.: marcar o Dia 1 como concluído ou atualizar um `1RM` no telemóvel) e verificando que o estado atualizado reflete na visualização Web.

**Acceptance Scenarios**:

1. **Given** que o atleta atualiza o seu peso corporal, `GRP`, `1RMs`, diário de `sRPE` ou dias concluídos no telemóvel, **When** abre a página no navegador do computador, **Then** visualiza exatamente os mesmos dados atualizados.
2. **Given** que o atleta está sem internet no ginásio, **When** regista os dados do treino no telemóvel, **Then** as alterações são guardadas imediatamente no armazenamento local do dispositivo e sincronizadas assim que a ligação for restabelecida.

---

### Edge Cases

- **Perda de sinal de rede a meio do treino no ginásio**: A aplicação nunca deve bloquear o ecrã nem perder dados digitados; o armazenamento local (`localStorage` / cache offline) permanece como fonte primária imediata.
- **Ecrãs móveis pequenos (`320px` a `375px`)**: Tabelas densas (como a Matriz de Cargas Oficiais e os seletores de 26 dias) devem adaptar-se com rolagem horizontal suave ou cartões empilhados sem cortar botões nem gerar sobreposição de texto.
- **Conflito de edição offline entre dois dispositivos**: Caso o utilizador edite dados offline no telemóvel e depois abra no computador, deve prevalecer o registo com carimbo de data/hora (`updatedAt`) mais recente, mantendo opção de exportação/importação de backup em JSON.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE ser empacotado como uma aplicação web autónoma e pronta para publicação no **Firebase Hosting**, acessível diretamente por qualquer navegador desktop ou mobile sem necessidade de compilação manual pelo utilizador final.
- **FR-002**: O sistema DEVE cumprir os requisitos de **Progressive Web App (PWA)** para dispositivos móveis (manifesto de aplicação, ícone dedicado HYROX, meta tags para iOS/Android em ecrã inteiro e cache *offline* de todos os recursos da página).
- **FR-003**: A interface mobile DEVE apresentar uma barra de navegação inferior fixa (*Bottom Navigation Bar*) em ecrãs verticais de smartphone, permitindo alternar com um único toque do polegar entre as 6 vistas principais (`TODAY`, `STRENGTH_RM`, `CALENDAR`, `LOAD`, `STRATEGY`, `NUTRITION`).
- **FR-004**: O sistema DEVE manter o ecrã do telemóvel ativo (prevenção de bloqueio automático de ecrã quando suportado pelo navegador) sempre que o Cronómetro Tático de Roxzone / EMOM estiver em execução.
- **FR-005**: O sistema DEVE gerir a persistência e partilha de dados entre a visualização Web e Mobile através de uma arquitetura híbrida **Offline-First (`localStorage`) + Sincronização em Nuvem Firebase (Firestore com cache offline)**, complementada por exportação/importação de ficheiro JSON.
- **FR-006**: O acesso ao perfil sincronizado entre dispositivos DEVE funcionar através de um **Código de Sincronização de Atleta (`syncKey` / ID direto do perfil, ex.: `hyrox-atleta-01`)** configurável na interface sem exigir fluxo complexo de criação de conta, operando em modo 100% local até que as credenciais do projeto Firebase sejam ativadas.
- **FR-007**: O sistema DEVE disponibilizar uma função de **Backup Manual (Exportar / Importar JSON)** do estado completo do atleta (`hyrox_*`), garantindo portabilidade total e segurança contra limpeza de cache do navegador.

### Key Entities

- **Perfil Sincronizado do Atleta (Athlete Sync State)**: Conjunto unificado de todos os estados do ciclo de 26 dias (`selectedDayNum`, `divisionKey`, `athleteWeight`, `goalPace`, `completedDays`, `dayLogs`, `oneRMs`, `customPcts`, `roxzoneTargetSec`, `fractionationProfile`) acompanhado do carimbo temporal da última atualização (`lastUpdatedAt`).
- **Manifesto de Instalação Mobile (PWA Manifest & Offline Cache)**: Configuração que define o nome da aplicação (`HYROX 26D Tracker`), cores do tema escuro (`#020617`), orientação vertical e lista de ativos guardados em cache para funcionamento sem rede.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A página publicada carrega e torna-se totalmente interativa em menos de 2 segundos em conexões móveis 4G/Wi-Fi e em menos de 1 segundo em carregamentos subsequentes via cache local.
- **SC-002**: 100% das funcionalidades das 6 abas e dos 4 pilares de Pareto 80/20 operam sem erros em modo avião (*offline*) após o primeiro acesso à página no telemóvel ou computador.
- **SC-003**: Em ecrãs móveis a partir de `360px` de largura, o atleta consegue alternar entre qualquer aba e acionar o cronómetro da Roxzone ou marcar um treino como concluído com apenas 1 toque de polegar, sem zoom manual nem corte horizontal de conteúdo.
- **SC-004**: O atleta consegue transferir ou sincronizar o seu histórico completo de 26 dias entre o computador (Web) e o smartphone (Mobile) com zero perda de registos de `1RM`, `sRPE` ou dias concluídos.

## Assumptions

- **Manutenção do Princípio Offline-First (Constituição III)**: Mesmo com hospedagem e eventual sincronização via Firebase, a aplicação continua a ler e gravar instantaneamente no `localStorage` do dispositivo, garantindo latência zero no ginásio e funcionamento total sem rede.
- **Hospedagem no Plano Gratuito (Firebase Spark Plan)**: A arquitetura de publicação no Firebase será desenhada para operar integralmente dentro dos limites gratuitos do Firebase (Firebase Hosting e, se selecionado, Firestore no tier gratuito).


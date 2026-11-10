# Feature Specification: Banco de Dados de Alunos & Atletas e Comparador de Desempenho

**Feature Branch**: `006-athlete-database-comparison`  
**Created**: 2026-11-10  
**Status**: Ready for Implementation  
**Input**: User description: "PRECISA CRIAR UM BANCO DE DADOS PARA SALVAR AS INFORMAÇÕES DO ALUNO E ATLETA PARA COMPARAR E FICAREM GUARDADAS."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gestão Completa de Alunos e Atletas no Banco de Dados (Priority: P1)

Como Personal Trainer ou Atleta utilizando o **HYROX Periodização**, preciso cadastrar, salvar, carregar, atualizar e manter guardados múltiplos perfis de alunos/atletas num Banco de Dados persistente (Local + Nuvem Cloud Firestore + Exportação/Importação JSON), para que as informações de cada aluno (nome, divisão, peso, Goal Race Pace GRP, velocidades das 5 zonas Z1–Z5, 1RMs, dias concluídos, logs diários de carga/velocidade e táticas de Roxzone/fracionamento) fiquem guardadas permanentemente sem risco de perda ao alternar entre alunos ou ao iniciar um novo ciclo.

**Why this priority**: É a base fundamental solicitada pelo utilizador: garantir que todos os dados de cada aluno/atleta fiquem guardados de forma estruturada e permanente num banco de dados acessível em qualquer momento.

**Independent Test**: Criar dois perfis de alunos distintos (ex.: "Aluno A - Men Open" e "Atleta B - Men Pro"), salvar as alterações de cargas/treinos de cada um no Banco de Dados, alternar entre eles com 1 clique e verificar que 100% dos treinos, zonas `km/h`, `1RMs` e gráficos são restaurados instantaneamente e sincronizados com o Cloud Firestore.

**Acceptance Scenarios**:

1. **Given** qualquer ecrã da aplicação, **When** o treinador/atleta acede à aba ou painel **Banco de Dados & Comparador de Alunos/Atletas**, **Then** visualiza a lista completa de alunos/atletas guardados, o perfil ativo no momento e o botão **"Salvar Snapshot / Guardar no Banco de Dados"**.
2. **Given** o formulário de novo registo no Banco de Dados, **When** o utilizador insere Nome do Aluno/Atleta, Categoria/Objetivo, Notas Técnicas e clica em **"Criar / Guardar Aluno no Banco"**, **Then** o sistema cria um registo único com ID, carimbo temporal (`updatedAt`), snapshot completo de métricas e persiste tanto no Banco Local (`IndexedDB` / `localStorage`) quanto na coleção `hyrox_athletes_db` do Cloud Firestore.
3. **Given** um aluno já cadastrado cujos treinos do dia, velocidades `Z1–Z5` ou `1RMs` foram atualizados, **When** o utilizador clica em **"Atualizar / Guardar Dados do Aluno Ativo"** (ou quando o auto-save do aluno ativo é acionado), **Then** o registo desse aluno no Banco de Dados é atualizado imediatamente e uma avaliação histórica (*Snapshot de Evolução*) pode ser arquivada para comparação temporal.

---

### User Story 2 - Comparação Lado a Lado Entre Dois Alunos/Atletas ou Entre Ciclos do Mesmo Atleta (Priority: P1)

Como Personal Trainer ou Atleta, preciso selecionar quaisquer dois registos guardados no Banco de Dados (ex.: **Aluno A vs. Aluno B**, ou **Avaliação Inicial vs. Avaliação Final do mesmo Atleta**) para comparar lado a lado todas as suas métricas de desempenho, zonas de corrida (`km/h` e `/km`), força máxima (`1RM`), carga acumulada (`sRPE`), distância percorrida (`km`), Roxzone e sobreposição do Gráfico de Radar (5 capacidades).

**Why this priority**: O utilizador solicitou explicitamente que o banco de dados permita **salvar as informações do aluno e atleta para comparar e ficarem guardadas**.

**Independent Test**: Selecionar o "Registo A" e o "Registo B" no Comparador do Banco de Dados e verificar a tabela comparativa com diferenças absolutas e percentuais ($\Delta$), além do Gráfico de Radar Duplo sobreposto (`Atleta A` vs. `Atleta B`).

**Acceptance Scenarios**:

1. **Given** pelo menos dois registos no Banco de Dados (dois alunos diferentes ou dois snapshots históricos do mesmo aluno), **When** o utilizador seleciona o **Perfil A (Base)** e o **Perfil B (Comparado)** no Comparador, **Then** o sistema exibe imediatamente os deltas ($\Delta$) de:
   - **Progresso e Volume**: Treinos Concluídos (`/26`), Carga Interna Confirmada (`sRPE` em UA), Distância Confirmada (`km`);
   - **Corrida e Zonas (`Z1` a `Z5`)**: Velocidade GRP (`km/h`), Pace GRP (`/km`), Velocidade Média Real Confirmada (`km/h`) e tabela comparativa de `Z1` a `Z5`;
   - **Força Máxima (`1RM` em `kg` e Força Relativa `kg/kg corporal`)**: `Back Squat`, `Front Squat`, `Trap Bar Deadlift`, `RDL`, `Bulgarian Split Squat`, `Walking Lunges`, `Push Press`, `Goblet Squat`, `Remada Curvada`;
   - **Tática & Prontidão**: Tempo de Roxzone (`16x`), Prontidão Média (`%`) e Proporção Aeróbica de Pareto (`80/20`).
2. **Given** dois perfis selecionados no Comparador, **When** o utilizador visualiza o **Gráfico de Radar Comparativo Sobreposto (5 Capacidades)**, **Then** vê os dois polígonos desenhados simultaneamente (*Força*, *Resistência*, *Mobilidade*, *Potência*, *Velocidade*) com legenda clara de quem lidera em cada capacidade física.

---

### User Story 3 - Sincronização em Nuvem (Cloud Firestore) e Exportação/Importação Completa da Base de Alunos (Priority: P2)

Como Personal Trainer ou Atleta que utiliza tanto o computador (Web) quanto o telemóvel no ginásio (Mobile PWA), preciso que o Banco de Dados de Alunos/Atletas sincronize com o Cloud Firestore (`hyrox_profiles` e `hyrox_athletes_db`) e permita exportar/importar toda a carteira de alunos num único ficheiro `.JSON`.

**Why this priority**: Garante redundância total (Offline-First + Cloud Backup) para que os dados de todos os alunos nunca se percam.

**Independent Test**: Clicar em **"Sincronizar Banco de Dados na Nuvem (Firestore)"** ou **"Exportar Base Completa (.JSON)"** e validar que todos os alunos e o histórico de avaliações são incluídos e restaurados fielmente.

**Acceptance Scenarios**:

1. **Given** múltiplos alunos guardados localmente, **When** o utilizador clica em **"Guardar Carteira de Alunos na Nuvem (Cloud Firestore)"**, **Then** todos os registos e snapshots históricos são gravados no documento da turma/treinador no Firestore e podem ser restaurados em qualquer dispositivo através do Código de Sincronização.

---

### Edge Cases

- **Primeiro acesso sem alunos cadastrados**: O sistema deve inicializar automaticamente o Banco de Dados com o **Perfil Atual do Atleta** já guardado como primeiro registo ativo + 1 perfil de referência (*Benchmark HYROX Pro/Open*) para que o Comparador funcione imediatamente desde o primeiro segundo.
- **Exclusão acidental do único perfil ativo**: O sistema impede que a lista fique vazia (mantendo sempre pelo menos 1 perfil ativo) e pede confirmação antes de remover um registo.
- **Operação Offline no ginásio**: Todas as operações de criar, editar, trocar de aluno, salvar snapshot histórico e comparar funcionam 100% offline via armazenamento local persistente, sincronizando com o Cloud Firestore assim que houver ligação.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE disponibilizar um módulo dedicado **Banco de Dados & Comparador (`Alunos & Atletas`)** acessível diretamente na navegação principal (Web e Mobile) e no cabeçalho.
- **FR-002**: O Banco de Dados DEVE armazenar para cada Aluno/Atleta (e seus snapshots históricos): `id`, `name`, `roleOrCategory` (`Aluno`, `Atleta Open`, `Atleta Pro`, `Simulado`), `coachNotes`, `createdAt`, `updatedAt`, `divisionKey`, `athleteWeight`, `goalPace`, `runningZonesKmh` (`Z1`–`Z5`), `oneRMs` (9 exercícios), `customPcts`, `completedDays`, `dayLogs` (incluindo `rpe`, `duration`, `morningHR`, `usedZone`, `usedSpeedKmh`, `usedPace`, `distanceKm`, `confirmedAt`), `roxzoneTargetSec`, `fractionationProfile` e resumo de métricas calculadas (`doneCount`, `loggedLoadUnits`, `confirmedDistanceKm`, `avgConfirmedSpeedKmh`, `radarScores`).
- **FR-003**: O sistema DEVE sincronizar automaticamente (auto-save) as alterações feitas pelo aluno/atleta ativo no seu respetivo registo dentro do Banco de Dados, além de oferecer um botão explícito **"Guardar Snapshot Histórico para Comparação"** (permitindo guardar marcos como *"Semana 1 - Calibração"*, *"Semana 2 - Pico"*, *"Dia da Prova"* do mesmo aluno).
- **FR-004**: O sistema DEVE permitir alternar com 1 clique qual é o **Aluno/Atleta Ativo**, carregando instantaneamente todos os seus dados em todas as abas (`Treino do Dia`, `Analytics & Gráficos (7)`, `Meus 1RMs`, `Calendário`, `Tática 05/12`, `Nutrição`).
- **FR-005**: O sistema DEVE incluir um **Motor Comparador Lado a Lado (`Perfil A vs. Perfil B`)** com:
  1. Gráfico de Radar Duplo Sobreposto (5 capacidades: Força, Resistência, Mobilidade, Potência, Velocidade);
  2. Comparativo de Zonas de Corrida (`Z1` a `Z5` em `km/h` e `min/km`) e Velocidade Média Confirmada;
  3. Comparativo de Força Bruta (`1RM` em `kg`) e Força Relativa (`1RM / Peso Corporal`) nos exercícios âncora do HYROX;
  4. Comparativo de Carga Acumulada (`sRPE`), Aderência (`/26 dias`), Distância (`km`) e Eficiência de Roxzone (`s`).
- **FR-006**: O Banco de Dados completo (`athletesDatabase` + `activeAthleteId`) DEVE ser incluído na sincronização em nuvem (Cloud Firestore) e na exportação/importação de Backup `.JSON`.

### Key Entities

- **AthleteRecord (`Registo de Aluno/Atleta no Banco de Dados`)**: Entidade persistente contendo identificação do aluno/atleta, dados antropométricos, divisão, matriz de velocidades `Z1–Z5`, `1RMs`, histórico dos 26 dias (`completedDays` + `dayLogs`) e métricas consolidadas.
- **ComparisonReport (`Relatório Comparativo A vs. B`)**: Estrutura calculada em tempo real que confronta dois `AthleteRecord` e extrai diferenças absolutas, percentuais e vantagem competitiva por pilar.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O treinador ou atleta consegue cadastrar um novo aluno/atleta ou salvar um snapshot histórico no Banco de Dados em menos de 10 segundos.
- **SC-002**: A alternância entre dois alunos guardados restaura 100% dos treinos, zonas de corrida (`km/h`), `1RMs` e os 7 gráficos em menos de 50 milissegundos, sem perda de dados.
- **SC-003**: O Comparador Lado a Lado exibe simultaneamente os indicadores de dois alunos/snapshots (incluindo Radar sobreposto, velocidades `Z1–Z5` e `1RMs`) com cálculo exato das diferenças ($\Delta$).
- **SC-004**: 100% dos registos do Banco de Dados permanecem guardados após recarregar a página, fechar o navegador ou sincronizar via Cloud Firestore / ficheiro `.JSON`.

---

## Assumptions

- O projeto Firebase ativo (`hyrox-simulado-26d`) continuará a utilizar o Cloud Firestore combinado com persistência local imediata (`localStorage` / `IndexedDB` fallback) para garantir funcionamento *Offline-First* no ginásio e backup em nuvem sem necessidade de ecrãs de login bloqueantes.


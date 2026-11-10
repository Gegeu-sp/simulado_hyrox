# Feature Specification: Fidelidade de Dados Salvos/Confirmados, Edição de Velocidade por Zona de Corrida (km/h ↔ Pace) e Sincronização Global (`005-real-data-zones-sync`)

**Feature Branch**: `005-real-data-zones-sync`  
**Created**: 2026-11-10  
**Status**: Implemented  
**Input**: User description: `"PRECISA ESTA DE ACORDO COM OS DADOS SALVOS E CONFIRMADOS, PARA SER MAIS FIDEDIGNOS, ALEM DISSO EU TENHO AS ZONAS DA CORRIDA PRECISA SER EDITADA PARA EU COLOCAR A VELOCIDADE QUE FOI USADA DE ACORDO COM A ZONA PRESCRITA. TODOS OS DADOS INSERIDOS PRECISA TER CONDISENTE EM TODA A APLICAÇÃO TODOS, TODOS OS DADOS PRECISAM ESTAR SINCRONIZADOS"`

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Edição das Zonas de Corrida (`Z1` a `Z5`) e Registo da Velocidade Usada (`km/h` ↔ `min/km`) por Sessão (Priority: P1)

Como atleta ou treinador, quero poder editar as minhas **5 Zonas de Corrida (`Z1`, `Z2`, `Z3/GRP`, `Z4`, `Z5`)** em **Velocidade (`km/h`)** ou **Pace (`min/km`)** e, em cada dia de treino, registar a **Velocidade Real Usada (`km/h`)**, o **Pace Real (`/km`)** e a **Zona Executada** de acordo com a zona prescrita da sessão, com conversão automática instantânea entre `km/h` e `min/km`.

**Why this priority**: Na prática de treino (especialmente em passadeira/esteira ergométrica e pista), o controlo da intensidade é feito em velocidade (`km/h`) associada à zona prescrita (`Z1` a `Z5`). Permitir configurar as zonas e registar a velocidade exata usada em cada treino torna os dados fisiológicos 100% fidedignos.

**Independent Test**: Alterar a velocidade da Zona 2 (ex: `11,5 km/h`) ou registar no Treino do Dia a velocidade usada (ex: `12,8 km/h` na Zona 3) e verificar que o Pace (`04:41 /km`), os cards de referência, os KPIs do topo e os 7 gráficos atualizam imediatamente.

**Acceptance Scenarios**:

1. **Given** que o utilizador visualiza um treino com corrida (ou o painel de Zonas de Corrida), **When** altera a velocidade (`km/h`) de qualquer zona (`Z1` a `Z5`), **Then** o sistema converte automaticamente para Pace (`min/km` via `60 / kmh`), sincroniza a Zona 3 com o `Goal Race Pace (GRP)` e recalcula as velocidades prescritas de todas as 26 sessões.
2. **Given** que o utilizador está no card **Controle de Carga & Corrida Diária** do Dia selecionado, **When** insere a **Velocidade Usada (`km/h`)** (ou Pace) e a **Zona Real Executada (`Z1` a `Z5`)** e clica em **Salvar & Confirmar Treino**, **Then** o dia é marcado como confirmado/salvo e a velocidade registada passa a alimentar todos os gráficos e estatísticas da aplicação.

---

### User Story 2 - Gráficos e Métricas 100% Fidedignos aos Dados Salvos e Confirmados (Priority: P1)

Como utilizador ao abrir a aba **Analytics & Gráficos (7)**, quero que todos os 7 gráficos e indicadores reflitam fielmente os **dados realmente salvos e confirmados** pelo atleta (duração real, RPE real, velocidade `km/h` usada na zona, FC matinal, cargas de 1RM e sessões concluídas), permitindo alternar entre a visão **Confirmados (Real Executado)** e **Confirmados + Planeado**.

**Why this priority**: Anteriormente, gráficos como o de Barras Empilhadas (`M1–M4`) e o de Área Acumulada utilizavam valores estáticos ou assumiam a carga planeada mesmo em dias não confirmados, não refletindo com exatidão apenas o que o atleta realmente treinou e salvou.

**Independent Test**: Confirmar 3 dias de treino com velocidades (`km/h`), durações e RPE específicos, abrir a aba `Analytics & Gráficos (7)` e verificar que os números de carga, volume acumulado, séries/minutos em zonas `Z1–Z5` por microciclo e evolução de velocidade correspondem exatamente à soma dos dias confirmados.

**Acceptance Scenarios**:

1. **Given** que o utilizador salvou e confirmou sessões de treino, **When** acede ao **Gráfico 1A (Evolução)**, **Then** pode visualizar a evolução real de **Carga (`sRPE`)**, **Força (`%1RM` / Carga `kg`)** e **Velocidade Usada (`km/h` e Pace `/km`)**, diferenciando claramente os pontos confirmados dos dias ainda não realizados.
2. **Given** que o utilizador confirma treinos ou edita a duração/zona executada nos Microciclos 1 a 4, **When** visualiza o **Gráfico 2A (Barras Empilhadas — Séries Musculares & Zonas FC Z1-Z5)** e o **Gráfico 1B (Área Acumulada)**, **Then** os valores das barras e áreas são calculados dinamicamente a partir das sessões confirmadas e dos parâmetros reais do atleta (sem tabelas estáticas fixas).

---

### User Story 3 - Sincronização Total e Consistência Unificada em Toda a Aplicação (Priority: P1)

Como utilizador, quero que qualquer dado inserido ou editado em qualquer aba (Pace/Velocidade GRP, Zonas `Z1–Z5` em `km/h`, Peso Corporal, Divisão, 1RMs, `%1RM` dos blocos, Tempo Roxzone, Fracionamento, Dias Confirmados e Registos Diários) fique imediatamente consistente em todas as 6 abas, nos 4 KPIs superiores, no `localStorage`, no Cloud Firestore (`Push`/`Pull`) e no ficheiro de Backup `.JSON`.

**Why this priority**: Garante que a aplicação funcione como uma fonte única de verdade (*Single Source of Truth*), sem discrepâncias entre o que aparece no Treino do Dia, no Calendário, na aba de Força 1RM, na Tática e nos 7 Gráficos Analíticos.

**Independent Test**: Alterar o 1RM, a velocidade de uma Zona de Corrida e confirmar um treino; verificar que o Cabeçalho, os 4 KPIs, as 6 abas e o JSON exportado contêm todos os valores sincronizados.

**Acceptance Scenarios**:

1. **Given** qualquer alteração na velocidade do GRP ou da Zona 3 (`km/h` ou `min/km`), **When** o valor é modificado no topo ou no editor de zonas, **Then** ambos os campos (`Pace /km` e `Velocidade km/h`), as zonas `Z1–Z5`, as prescrições dos 26 dias e o gráfico de Pareto/Radar são atualizados simultaneamente.
2. **Given** um perfil sincronizado via Cloud Firestore ou Backup `.JSON`, **When** o utilizador exporta ou guarda na nuvem, **Then** o snapshot inclui também a tabela personalizada de velocidades por zona (`runningZonesKmh`) e os registos de velocidade/zona diários (`dayLogs`).

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Editor de Zonas de Corrida `Z1` a `Z5` em `km/h` e `min/km`)**: O sistema DEVE disponibilizar uma matriz editável das 5 Zonas de Corrida (`Z1 Regenerativo`, `Z2 Base Aeróbica`, `Z3 Ritmo de Prova / GRP`, `Z4 Limiar Anaeróbico`, `Z5 VO2máx / Intervalos`) exibindo e permitindo editar a **Velocidade (`km/h`)** e o **Pace (`min/km`)** com conversão matemática bidirecional (`velocidadeKmh = 3600 / paceSegundos`).
- **FR-002 (Registo Diário da Velocidade Usada na Zona Prescrita)**: Em cada dia do plano de 26 dias, o painel de registo da sessão DEVE exibir a **Zona Prescrita do Dia** + **Velocidade Alvo Sugerida (`km/h` e `/km`)** e permitir ao atleta inserir e salvar:
  - **Zona Real Executada (`Z1`, `Z2`, `Z3`, `Z4`, `Z5` ou `REST`)**;
  - **Velocidade Média Usada (`km/h`)** (com atualização automática do **Pace Real Usado `min/km`** e vice-versa);
  - **Distância de Corrida Real (`km`)**, **Duração Real (`min`)**, **RPE Borg (`6–20`)**, **FC Basal Matinal (`bpm`)** e botão explícito **Salvar & Confirmar Dados do Dia**.
- **FR-003 (Cálculo Dinâmico Fidedigno nos 7 Gráficos)**:
  - **Gráfico 1A (Linha)**: Suporte a visualização de `Carga (sRPE)`, `Força (%1RM)` e `Velocidade (km/h) / Pace`, plotando os valores reais confirmados nos dias salvos face à linha prescrita;
  - **Gráfico 1B (Área Acumulada)** e **Gráfico 2A (Barras Empilhadas M1–M4)**: Calculados dinamicamente a partir das sessões e logs reais (séries prescritas × cargas de 1RM e minutos reais por zona `Z1–Z5`), com filtro interativo entre **"Modo Fidedigno: Apenas Treinos Confirmados/Salvos"** e **"Visão Completa: Confirmados + Planeado"**;
  - **Gráfico 2B (Radar)**, **Gráfico 3A (Dispersão)**, **Gráfico 3B (Combinado Barra+Linha)** e **Gráfico 4 (Pareto 80/20)**: Recalculados em tempo real com base nas velocidades reais (`km/h`), cargas de 1RM, RPEs, FC matinal e dias confirmados.
- **FR-004 (Sincronização Global e Persistência)**: Todos os estados (`runningZonesKmh`, `dayLogs` com `usedSpeedKmh`, `usedPace`, `usedZone`, `distanceKm`, `confirmedAt`, `completedDays`, `oneRMs`, `customPcts`, `goalPace`, `athleteWeight`, `divisionKey`, `roxzoneTargetSec`, `fractionationProfile`) DEVEM persistir em `localStorage`, sincronizar via Firestore REST e exportar/importar via `.JSON`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Conversão exata e imediata (`< 16ms`) entre `Velocidade (km/h)` e `Pace (min/km)` tanto nas 5 Zonas Globais (`Z1–Z5`) quanto no registo diário de cada um dos 26 dias.
- **SC-002**: 100% dos 7 gráficos da aba `Analytics & Gráficos (7)` respondem dinamicamente à confirmação/edição de qualquer treino, velocidade usada, duração, RPE ou 1RM, sem dados estáticos desconectados.
- **SC-003**: Aplicação validada sem erros em Node.js V8, publicada em `https://hyrox-simulado-26d.web.app/` e sincronizada no GitHub `https://github.com/Gegeu-sp/simulado_hyrox.git`.


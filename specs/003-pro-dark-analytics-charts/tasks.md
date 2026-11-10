---

description: "Task list for Pro Dark Mode Layout & 7 Analytics/Pareto Charts implementation"
---

# Tasks: Layout Profissional Dark Mode Responsivo (Web & Mobile) e Suite Completa de Gráficos Analíticos & Diagrama de Pareto HYROX

**Input**: Design documents from `/specs/003-pro-dark-analytics-charts/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/analytics-ui-contract.md, quickstart.md

**Tests**: Validation scenarios are defined in `quickstart.md` (interactive Desktop `1440x900` and Mobile `375x812` verification).

**Organization**: Tasks are grouped by user story (`US1` to `US5`) to enable independent implementation and verification of the Pro Dark Mode layout, the 7 SVG analytical charts, and the Firebase Hosting sync/deployment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files or non-overlapping sections)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`, `[US4]`, `[US5]`)
- Exact file paths included in every task description

---

## Phase 1: Setup (Pro Dark Mode Styling & Chart Control States)

**Purpose**: Prepare global CSS rules, glassmorphism surface classes, and interactive chart state hooks in `public/index.html`.

- [X] T001 Configure enhanced Pro Dark Mode CSS rules (radial ambient background glow, custom dark scrollbars, glassmorphism card utilities, and responsive SVG chart styles) in `public/index.html`
- [X] T002 Add interactive chart state hooks (`evolutionMetric`: `'SRPE' | 'STRENGTH_RM' | 'PACE'`, `compositionMode`: `'MUSCLE_SETS' | 'HR_ZONES'`, `paretoMetric`: `'FATIGUE' | 'TIME_LOSS'`, and `hoveredDayNum`: `number | null`) inside `App` in `public/index.html`

---

## Phase 2: Foundational (Real-Time Mathematical & Physiological Analytics Engine)

**Purpose**: Implement the core `useMemo` calculation engine (`analyticsData`) that derives the 5 data structures from `data-model.md` before rendering the UI and the 7 SVG charts.

**⚠️ CRITICAL**: Must complete before user story phases.

- [X] T003 Implement the `analyticsData` `useMemo` engine computing `EvolutionDayPoint` (`dayNum` `1..26`, `plannedSRPE`, `actualSRPE`, `strengthIntensityPct` `0..100`, `targetPaceSec`, and cumulative muscle volumes `cumAnteriorVol`, `cumPosteriorVol`, `cumUpperVol`, `cumCoreGripVol`, `cumAerobicVol`) and `MicrocycleCompositionBucket` (`microcycleId` `1..4`, `muscleSets`, `hrZonesMin` `z1..z5`) in `public/index.html`
- [X] T004 Implement inside `analyticsData` the `AthleteRadarProfile` 5-axis calculator (`strength`, `endurance`, `mobility`, `power`, `speed` normalized to `0..100` vs. division benchmark), `SessionCorrelationPoint` (`externalLoad` `0..100`, `internalRPE` `6..20`, `readinessScore` `0..100`, `zoneStatus`: `'OPTIMAL' | 'HIGH_LOAD' | 'OVERREACH_RISK'`), and `ParetoExerciseItem` (10 HYROX segments sorted descending by `value`, with `sharePct` `0..100`, `cumulativePct` `0..100`, and `isVital80` boolean flag) in `public/index.html`

**Checkpoint**: All 5 analytical data structures are dynamically computed and reactive to `oneRMs`, `divisionKey`, `goalPace`, `athleteWeight`, `roxzoneTargetSec`, `completedDays`, and `dayLogs`.

---

## Phase 3: User Story 1 - Layout Profissional Dark Mode e Alinhamento Perfeito em Web e Mobile (Priority: P1) 🎯 MVP

**Goal**: Refinar o cabeçalho de comando, adicionar a Faixa Executiva de Telemetria (4 KPIs alinhados) no topo da aplicação e alinhar simetricamente as grelhas e cartões para Web (`>= 1024px`) e Mobile (`< 768px`).

**Independent Test**: Abrir `public/index.html` em Desktop (`1440x900`) e Mobile (`375x812`), verificar a Faixa Executiva de 4 KPIs no topo, o alinhamento de altura (`h-full flex flex-col justify-between`) dos cartões lado a lado e zero barra de rolagem horizontal em Mobile.

### Implementation for User Story 1

- [X] T005 [US1] Upgrade the Command Header and add the 4-card Executive Telemetry KPI Strip (1: Progresso & Microciclo Ativo, 2: Balanço de Pareto 80/20 Aeróbico vs. Força, 3: Índice de Prontidão & Carga sRPE, 4: Eficiência Roxzone 16x & Meta GRP) with quick-jump links to the Analytics hub in `public/index.html`
- [X] T006 [US1] Align card grids (`items-stretch`, uniform headers, badges, and responsive padding) across Desktop and Mobile viewports and update the navigation tab label to `Analytics & Carga` in `public/index.html`

**Checkpoint**: User Story 1 is complete — the Pro Dark Mode layout and KPI telemetry strip are active and aligned on Web and Mobile.

---

## Phase 4: User Story 5 - Diagrama de Pareto (80/20) para Eficiência de Exercícios e Diagnóstico de Prova (Priority: P1)

**Goal**: Implementar o **Gráfico de Pareto 80/20 (Barras Ordenadas + Curva Acumulada 0–100% + Linha de Corte 80%)** para isolar quais exercícios/estações do HYROX consomem 80% da fadiga acumulada ou do tempo perdido pelo atleta.

**Independent Test**: Alternar entre `Desgaste / Fadiga Acumulada (%)` e `Tempo Perdido vs. Elite (s)` no Gráfico de Pareto, alterar um 1RM ou o tempo de Roxzone e confirmar a reordenação decrescente das barras no Eixo X, a curva acumulada no Eixo Y direito com linha tracejada nos 80% e o cartão de Diagnóstico Tático 80/20.

### Implementation for User Story 5

- [X] T007 [US5] Implement the interactive SVG **Pareto 80/20 Exercise Efficiency Chart** (sorted descending bars on X-axis highlighting `isVital80` items, cumulative percentage line `0%–100%` on right Y-axis, dashed `80%` threshold line, metric toggle `FATIGUE` vs. `TIME_LOSS`, and automated 80/20 Tactical Diagnostic panel) in `public/index.html`

**Checkpoint**: The Pareto 80/20 Exercise Efficiency diagram and automated diagnostic are live.

---

## Phase 5: User Story 2 - Gráficos de Evolução de Desempenho e Carga (Sobrecarga Progressiva) (Priority: P1)

**Goal**: Implementar na secção "1. Evolução de Desempenho e Carga" o **Gráfico de Linha (Line Chart)** e o **Gráfico de Área (Area Chart)** ao longo dos 26 dias.

**Independent Test**: Alternar no Gráfico de Linha entre `Carga (sRPE)`, `Força (% 1RM)` e `Ritmo (Pace)` e inspecionar o Gráfico de Área Empilhada mostrando o volume acumulado dos 5 sistemas/grupos musculares do Dia 1 ao Dia 26.

### Implementation for User Story 2

- [X] T008 [US2] Implement the interactive SVG **Gráfico de Linha (Line Chart)** for 26-day progression with metric selector (`SRPE` Planned vs. Actual UA, `STRENGTH_RM` `% 1RM` progression, and `PACE` running pace trajectory) in `public/index.html`
- [X] T009 [US2] Implement the interactive SVG **Gráfico de Área (Area Chart)** displaying cumulative training volume across the 26 days by muscle group / motor system (`Motor Aeróbico`, `Cadeia Anterior`, `Cadeia Posterior`, `Superior Push/Pull`, `Core & Grip`) in `public/index.html`

**Checkpoint**: Section 1 (Line Chart + Area Chart) is complete and reactive.

---

## Phase 6: User Story 3 - Gráficos de Distribuição e Composição Multidimensional do Treino (Priority: P2)

**Goal**: Implementar na secção "2. Distribuição e Composição do Treino" o **Gráfico de Barras Empilhadas (Stacked Bar Chart)** para os 4 Microciclos e o **Gráfico de Radar / Teia (Radar Chart)** de 5 eixos.

**Independent Test**: Alternar o Gráfico de Barras Empilhadas entre `Séries por Grupo Muscular` e `Zonas de FC (Z1 a Z5)` e verificar o polígono de 5 eixos (`Força`, `Resistência`, `Mobilidade`, `Potência`, `Velocidade`) no Gráfico de Radar face ao benchmark da divisão.

### Implementation for User Story 3

- [X] T010 [US3] Implement the interactive SVG **Gráfico de Barras Empilhadas (Stacked Bar Chart)** comparing Microcycles 1 to 4 with mode toggle between weekly muscle group sets (`muscleSets`) and time spent in heart rate zones `Z1` to `Z5` (`hrZonesMin`) in `public/index.html`
- [X] T011 [US3] Implement the interactive SVG **Gráfico de Radar / Teia (Radar Chart)** plotting the athlete's 5-axis polygon (`Força`, `Resistência`, `Mobilidade`, `Potência`, `Velocidade` `0–100%`) against the official division benchmark polygon with asymmetry diagnostics in `public/index.html`

**Checkpoint**: Section 2 (Stacked Bar Chart + 5-Axis Radar Chart) is complete and reactive.

---

## Phase 7: User Story 4 - Gráficos de Correlação Esforço-Fadiga e Prontidão / Recuperação (Priority: P2)

**Goal**: Implementar na secção "3. Correlação e Métricas de Recuperação" o **Gráfico de Dispersão (Scatter Plot)** e o **Gráfico Combinado (Barra Vertical + Linha)**.

**Independent Test**: Registar ou alterar o RPE e a FC basal de um dia e verificar a posição do ponto no Scatter Plot (Carga Externa vs. PSE Borg `6–20`) e a curva de Prontidão/VFC sobreposta às barras verticais de volume no Gráfico Combinado.

### Implementation for User Story 4

- [X] T012 [US4] Implement the interactive SVG **Gráfico de Dispersão (Scatter Plot)** correlating External Load (X-axis) with Internal Load PSE/RPE Borg `6–20` (Y-axis), including efficiency/overreaching zones and click-to-select day navigation in `public/index.html`
- [X] T013 [US4] Implement the interactive SVG **Gráfico Combinado (Barra Vertical + Linha)** overlaying daily/weekly training volume (Vertical Bars) with the Readiness / Recovery & HRV/Basal HR stability score (`0–100%` Line) across the 4 microcycles in `public/index.html`

**Checkpoint**: All 7 analytical charts (`Line`, `Area`, `Stacked Bar`, `Radar`, `Scatter`, `Combined Bar+Line`, and `Pareto 80/20`) are complete and integrated.

---

## Phase 8: Polish, Root Synchronization & Firebase Hosting Update

**Purpose**: Mirror `public/index.html` to `hyrox_26_day_tactical_periodization_tracker.html`, bump Service Worker cache version so mobile/web clients receive the new update immediately, and deploy to Firebase Hosting.

- [X] T014 [P] Bump `CACHE_NAME` in `public/sw.js` to `'hyrox-26d-pwa-v2'` so installed PWA clients automatically refresh the updated bundle in `public/sw.js`
- [X] T015 Synchronize root `hyrox_26_day_tactical_periodization_tracker.html` with `public/index.html` and validate all 7 charts and responsive Dark Mode layout against `quickstart.md` in `hyrox_26_day_tactical_periodization_tracker.html`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1 — T001–T002)**: No dependencies — prepares styles and state hooks.
- **Foundational (Phase 2 — T003–T004)**: Depends on Phase 1 — builds the unified `analyticsData` calculation engine required by all 7 charts.
- **User Story 1 (Phase 3 — T005–T006, P1 🎯 MVP)**: Upgrades the Pro Dark Mode layout and KPI telemetry strip.
- **User Stories 5, 2, 3, 4 (Phases 4–7 — T007–T013)**: Render the 7 interactive SVG charts consuming `analyticsData`.
- **Polish & Sync (Phase 8 — T014–T015)**: Updates Service Worker cache version and synchronizes the root HTML mirror.

### Parallel Opportunities

- `T014` (`public/sw.js`) can be executed in parallel with the `public/index.html` updates (`T001`–`T013`).

---

## Implementation Strategy

### MVP First + Complete 7-Chart Suite

1. Complete Phase 1 & Phase 2 (`T001`–`T004`) to establish the Pro Dark Mode styles and the `analyticsData` mathematical engine.
2. Complete Phase 3 (`T005`–`T006`) to deliver the aligned Web & Mobile Pro Dark Mode layout and Executive KPI Strip.
3. Complete Phases 4–7 (`T007`–`T013`) to render all 7 interactive SVG charts (`Pareto 80/20`, `Line`, `Area`, `Stacked Bar`, `Radar`, `Scatter`, `Combined Bar+Line`).
4. Complete Phase 8 (`T014`–`T015`) to sync files and redeploy to Firebase Hosting (`https://hyrox-simulado-26d.web.app`).


---

description: "Task list for implementing the Pareto 80/20 Tactical Engine in HYROX 26-Day Periodization Tracker"
---

# Tasks: Motor Tático de Pareto 80/20 para Periodização HYROX (26 Dias)

**Input**: Design documents from `/specs/001-pareto-80-20-tactics/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/ui-state-contract.md, quickstart.md

**Tests**: Validation scenarios are defined in `quickstart.md` (no automated test runner requested in specification).

**Organization**: Tasks are grouped by user story (`US1` to `US4`) to enable independent implementation and verification of each tactical front in `hyrox_26_day_tactical_periodization_tracker.html`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (independent sections/constants without blocking dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Exact file path included in every task description (`hyrox_26_day_tactical_periodization_tracker.html`)

## Path Conventions

- **Single-file React Application**: `hyrox_26_day_tactical_periodization_tracker.html` at repository root

---

## Phase 1: Setup (Shared Infrastructure & Tactical Constants)

**Purpose**: Prepare imports, static reference constants, and helper utilities in `hyrox_26_day_tactical_periodization_tracker.html` required by the Pareto 80/20 engine.

- [X] T001 Verify and import any additional `lucide-react` icons needed for Pareto 80/20 indicators (such as `Target` or `TrendingUp` if needed, or reuse `Zap`, `Activity`, `Dumbbell`, `Timer`, `ShieldAlert`, `Scale`, `Compass`, `Award`) at the top of `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T002 Define the `PARETO_PILLAR_META` dictionary mapping each `pillar` enum value (`'AEROBIC_ENGINE' | 'STRENGTH_FLOOR' | 'ROXZONE_MARGINAL' | 'PREVENTIVE_PACING' | 'RECOVERY_SUPERCOMP'`) to its Portuguese label, badge styling, and 80/20 rule summary in `hyrox_26_day_tactical_periodization_tracker.html`

---

## Phase 2: Foundational (Blocking Prerequisites — State & Persistence)

**Purpose**: Core `localStorage` state hooks and safe fallback hydration that MUST be complete before user story UI and selectors are wired.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T003 Initialize `roxzoneTargetSec` state (`number` constrained to `12..60`, default `22`) with safe hydration from `localStorage.getItem('hyrox_roxzone_sec')` (`Math.min(60, Math.max(12, parseInt(val, 10) || 22))`) and `useEffect` persistence in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T004 Initialize `fractionationProfile` state (`'SAFE_80_20' | 'BALANCED_PARETO' | 'ELITE_DENSITY'`, default `'BALANCED_PARETO'`) with safe validation against `['SAFE_80_20', 'BALANCED_PARETO', 'ELITE_DENSITY']` from `localStorage.getItem('hyrox_fractionation_profile')` and `useEffect` persistence in `hyrox_26_day_tactical_periodization_tracker.html`

**Checkpoint**: Foundational state and `localStorage` contracts (`hyrox_roxzone_sec` and `hyrox_fractionation_profile`) are ready.

---

## Phase 3: User Story 1 - Auditoria do Motor Aeróbico e Regra 80/20 de Volume (Priority: P1) 🎯 MVP

**Goal**: Exibir em cada um dos 26 dias o "Núcleo Vital 20% (Foco de Pareto)" e disponibilizar um painel de Auditoria da Regra do Motor Aeróbico (80/20) comparando o equilíbrio planeado (82% motor aeróbico/corrida comprometida vs. 18% piso de força) com o realizado pelo atleta, incluindo alerta de negligência aeróbica.

**Independent Test**: Navegar pelos 26 dias na aba `TODAY` verificando o card de Diretriz Diária de Pareto e aceder à aba `LOAD` para comprovar que a barra 80/20 atualiza ao marcar dias como concluídos e dispara o alerta quando `doneCount >= 3` e `actualAerobicRatioPct < 65%`.

### Implementation for User Story 1

- [X] T005 [US1] Create the `PARETO_DAY_DIRECTIVES` mapping (`ParetoDayDirective` for `dayNum` `1..26`) with fields `pillar` (`'AEROBIC_ENGINE' | 'STRENGTH_FLOOR' | 'ROXZONE_MARGINAL' | 'PREVENTIVE_PACING' | 'RECOVERY_SUPERCOMP'`), `bucket8020` (`'PRIMARY_80_AEROBIC' | 'SUPPORT_20_STRENGTH' | 'RECOVERY'`), `vital20Focus`, and `avoidTrap` (or helper function `getDayParetoDirective(day)`) in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T006 [US1] Extend the `stats` `useMemo` selector (or create `paretoAudit` `useMemo`) to compute `AerobicAuditMetrics` (`plannedAerobicSessions` = 18, `plannedStrengthSessions` = 4, `plannedAerobicRatioPct` = 82, `completedAerobicSessions`, `completedStrengthSessions`, `actualAerobicRatioPct`, `aerobicLoadUnits`, `strengthLoadUnits`, and `imbalanceWarning` set to `true` when `doneCount >= 3` and `actualAerobicRatioPct < 65`) in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T007 [US1] Render the "Núcleo Vital de Pareto (Regra 80/20 da Sessão)" card inside the `TODAY` tab workout view, displaying the day's `pillar` badge, `bucket8020` classification, `vital20Focus` directive, and `avoidTrap` warning in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T008 [US1] Render the "Auditoria de Pareto 80/20: Regra do Motor Aeróbico vs. Piso de Força" panel and conditional `imbalanceWarning` alert banner inside the `LOAD` tab in `hyrox_26_day_tactical_periodization_tracker.html`

**Checkpoint**: User Story 1 (MVP) is complete and independently testable in the `TODAY` and `LOAD` tabs.

---

## Phase 4: User Story 2 - Diagnóstico do "Piso de Força" (Strength Floor) vs. Cargas da Divisão (Priority: P2)

**Goal**: Cruzar automaticamente os `1RMs` compostos do atleta com as cargas oficiais da divisão selecionada (`WOMEN_OPEN`, `MEN_OPEN`, `WOMEN_PRO`, `MEN_PRO`) nas 5 estações pesadas (`Sled Push`, `Sled Pull`, `Farmer's Carry`, `Sandbag Lunges`, `Wall Balls`), classificando o estatuto neuromuscular entre `Domínio Metabólico (Protegido)`, `Zona Limiar` e `Alerta SNC (Modo Sobrevivência)`.

**Independent Test**: Alterar a divisão competitiva no topo ou editar qualquer `1RM` na aba `STRENGTH_RM` e verificar a atualização instantânea dos cartões de diagnóstico das 5 estações, incluindo proteção contra `1RM = 0` (`status: 'UNCONFIGURED'`).

### Implementation for User Story 2

- [X] T009 [US2] Implement the `strengthFloorDiagnostics` `useMemo` selector returning the array of 5 `StrengthFloorStationDiag` items (`stationId`: `'sledPush' | 'sledPull' | 'farmersCarry' | 'sandbagLunges' | 'wallBalls'`, `officialLoadDesc`, `anchorExerciseName`, `athleteAnchor1RM`, `relativeDemandPct`, `status`: `'PROTECTED' | 'THRESHOLD' | 'CNS_RISK' | 'UNCONFIGURED'`, `statusLabel`, `recommendation`) using the threshold formulas from `research.md` in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T010 [US2] Render the "Diagnóstico do Piso de Força (Pareto 20% Strength Floor vs. Cargas Oficiais da Divisão)" matrix section in the `STRENGTH_RM` tab with semantic status badges (`PROTECTED` emerald, `THRESHOLD` amber, `CNS_RISK` rose, `UNCONFIGURED` slate) and target microcycle days (Dias 1, 8, 15, 21) in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T011 [US2] Enhance the strength prescription cards in the `TODAY` tab (Days 1, 8, 15, and 21) with a badge indicating which HYROX stations are protected by that compound lift and a reminder to avoid junk reps to concentric failure in `hyrox_26_day_tactical_periodization_tracker.html`

**Checkpoint**: User Stories 1 and 2 are both functional and independently testable.

---

## Phase 5: User Story 3 - Simulador e Protocolo Cirúrgico da Roxzone (Ganho Marginal de 6 Minutos) (Priority: P3)

**Goal**: Disponibilizar o simulador interativo das 16 passagens na Roxzone (comparando o tempo projetado do atleta com o Top 10% `05:21` e Bottom 10% `11:25` e convertendo a economia em `seg/km` de corrida) e integrar o guia rápido do Protocolo dos 3 Passos no cronómetro tático da sessão.

**Independent Test**: Ajustar o controlo deslizante de tempo por transição (`12s` a `60s`) na aba `STRATEGY`, validar os cálculos de tempo total (`roxzoneTargetSec * 16`), minutos poupados vs. `685s` e equivalente em `seg/km`, e verificar a meta de transição exibida no cronómetro da aba `TODAY`.

### Implementation for User Story 3

- [X] T012 [US3] Implement the `roxzoneSim` `useMemo` selector calculating `totalRoxzoneSec` (`roxzoneTargetSec * 16`), `eliteBenchmarkSec` (`321`), `slowBenchmarkSec` (`685`), `savedVsSlowSec` (`Math.max(0, 685 - totalRoxzoneSec)`), and `equivalentPaceGainSecPerKm` (`Math.round(savedVsSlowSec / 8)`) in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T013 [US3] Update the "Protocolo dos 3 Passos na Roxzone" section in the `STRATEGY` tab into an interactive "Simulador Cirúrgico da Roxzone (16 Transições & Regra 80/20)" with a range input (`12` to `60` sec), comparative progress bars (`05:21` Elite vs. Athlete vs. `11:25` Passivo), pace-equivalent savings badge, and the 3-step behavioral checklist in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T014 [US3] Enhance the "Cronómetro EMOM & Roxzone" widget in the `TODAY` tab with a visual indicator of the athlete's configured Roxzone transition target (`roxzoneTargetSec` s) and a 1-click preset/reminder for the 3-Step Protocol in `hyrox_26_day_tactical_periodization_tracker.html`

**Checkpoint**: User Story 3 is complete and independently testable in the `STRATEGY` and `TODAY` tabs.

---

## Phase 6: User Story 4 - Planeador de Fracionamento Preventivo para Estações de Alta Fadiga (Priority: P3)

**Goal**: Fornecer 3 esquemas selecionáveis de fracionamento preventivo (*Rep-Breaking Schemes*) com pausas de 3 a 5 respirações antes da falha concêntrica para **Sandbag Lunges (100m)** e **Wall Balls (100 reps)**, sincronizados entre a aba `STRATEGY` e os dias de treino na aba `TODAY` (incluindo o Dia 26 — Simulado Oficial).

**Independent Test**: Selecionar cada um dos 3 perfis (`SAFE_80_20`, `BALANCED_PARETO`, `ELITE_DENSITY`) na aba `STRATEGY`, confirmar a atualização das séries e pausas respiratórias, navegar para o Dia 26 na aba `TODAY` para verificar o plano ativo e recarregar a página para confirmar a persistência.

### Implementation for User Story 4

- [X] T015 [P] [US4] Define the `FRACTIONATION_SCHEMES` constant dictionary (`SAFE_80_20`, `BALANCED_PARETO`, `ELITE_DENSITY`) with `id`, `name`, `wallBallsSets`, `wallBallsRestBreaths`, `lungesStrategy`, `lungesRestBreaths`, and `estimatedTimeSaved` per `data-model.md` in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T016 [US4] Render the interactive "Planeador de Fracionamento Preventivo (Pareto Estações 7 & 8 — Anti-Falha)" selector in the `STRATEGY` tab allowing 1-click switching between `SAFE_80_20`, `BALANCED_PARETO`, and `ELITE_DENSITY` and displaying the detailed rep-breaking and breathing protocol in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T017 [US4] Display the athlete's active `FRACTIONATION_SCHEMES[fractionationProfile]` summary badge inside workout blocks in the `TODAY` tab whenever `block.usesRW` includes `'sandbagLunges'` or `'wallBalls'` (including Day 26 Official Simulation) in `hyrox_26_day_tactical_periodization_tracker.html`

**Checkpoint**: All 4 User Stories are complete and independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Edge case hardening, visual consistency, and end-to-end validation against `quickstart.md`.

- [X] T018 Verify defensive fallbacks for malformed `goalPace` strings, `0 kg` `1RM` inputs, and `0/26` completed days across all Pareto calculations in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T019 Validate responsive layout, high-contrast dark theme (`slate-950`/`slate-900`), and `font-mono` numeric hierarchy across all 4 Pareto modules per `quickstart.md` in `hyrox_26_day_tactical_periodization_tracker.html`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1 — T001–T002)**: No dependencies — can start immediately.
- **Foundational (Phase 2 — T003–T004)**: Depends on Phase 1 — **BLOCKS** user stories that consume persisted Pareto preferences (`US3` and `US4`).
- **User Story 1 (Phase 3 — T005–T008, P1 🎯 MVP)**: Depends on Phase 1–2 completion; independent of `US2`, `US3`, and `US4`.
- **User Story 2 (Phase 4 — T009–T011, P2)**: Depends on Phase 1–2 completion; independent of `US1`, `US3`, and `US4`.
- **User Story 3 (Phase 5 — T012–T014, P3)**: Depends on `T003` (`roxzoneTargetSec` state); independent of `US1`, `US2`, and `US4`.
- **User Story 4 (Phase 6 — T015–T017, P3)**: Depends on `T004` (`fractionationProfile` state); independent of `US1`, `US2`, and `US3`.
- **Polish (Phase 7 — T018–T019)**: Depends on Phases 3–6 completion.

### Parallel Opportunities

- Constantes de domínio estáticas (`T002`, `T005`, `T015`) não possuem conflito entre si e podem ser definidas em sequência rápida na secção de constantes de `hyrox_26_day_tactical_periodization_tracker.html`.
- Seletores `useMemo` de cada User Story (`T006` para `US1`, `T009` para `US2`, `T012` para `US3`) operam sobre fatias independentes do estado e não bloqueiam a lógica uns dos outros.
- As vistas de interface situam-se em abas distintas (`LOAD` para `T008`, `STRENGTH_RM` para `T010`, `STRATEGY` para `T013` e `T016`), permitindo entrega incremental limpa por história de utilizador.

---

## Parallel Example: Constant & Selector Preparation

```bash
# Definir estruturas estáticas de domínio no topo do ficheiro:
Task T002: "Define PARETO_PILLAR_META dictionary in hyrox_26_day_tactical_periodization_tracker.html"
Task T015: "Define FRACTIONATION_SCHEMES constant dictionary in hyrox_26_day_tactical_periodization_tracker.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (`T001`–`T002`)
2. Complete Phase 2: Foundational (`T003`–`T004`)
3. Complete Phase 3: User Story 1 (`T005`–`T008`)
4. **STOP and VALIDATE**: Confirm the Daily Pareto 80/20 directive in `TODAY` and the Aerobic Engine 80/20 Audit bar + imbalance warning in `LOAD`.

### Incremental Delivery

1. **Foundation (`T001`–`T004`)** → Base constants and `localStorage` hooks ready.
2. **+ US1 (`T005`–`T008`)** → Regra do Motor Aeróbico 80/20 e Diretriz Diária ativas (MVP).
3. **+ US2 (`T009`–`T011`)** → Diagnóstico do Piso de Força (*Strength Floor*) vs. Cargas Oficiais ativo na aba `STRENGTH_RM` e nos blocos de força.
4. **+ US3 (`T012`–`T014`)** → Simulador Cirúrgico da Roxzone (16 Transições) e Protocolo dos 3 Passos ativos.
5. **+ US4 (`T015`–`T017`)** → Planeador de Fracionamento Preventivo (*Rep-Breaking*) ativo para Sandbag Lunges e Wall Balls.
6. **+ Polish (`T018`–`T019`)** → Validação completa de casos de fronteira e responsividade.


---

description: "Task list for Firebase Web & Mobile PWA implementation"
---

# Tasks: Aplicação Web e Mobile (PWA) no Firebase para o Tracker HYROX 26 Dias

**Input**: Design documents from `/specs/002-firebase-web-mobile-pwa/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/firebase-pwa-contract.md, quickstart.md

**Tests**: Validation scenarios are defined in `quickstart.md` (manual and browser/emulator verification).

**Organization**: Tasks are grouped by user story (`US1` to `US3`) to enable independent implementation and verification of the Firebase Hosting PWA bundle, Mobile UX ergonomics, and Web ↔ Mobile Cloud/JSON synchronization.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`)
- Exact file paths included in every task description

---

## Phase 1: Setup (Firebase Project & Hosting Configuration)

**Purpose**: Initialize Firebase Hosting and Cloud Firestore configuration files at the repository root.

- [X] T001 [P] Create `firebase.json` with Hosting (`"public": "public"`, SPA rewrite to `"/index.html"`, `cleanUrls: true`, `trailingSlash: false`, and cache headers for `/sw.js` and `/manifest.json`) and Firestore (`rules: "firestore.rules"`, `indexes: "firestore.indexes.json"`) in `firebase.json`
- [X] T002 [P] Create `.firebaserc` with default project placeholder configuration in `.firebaserc`
- [X] T003 [P] Create `firestore.indexes.json` with empty base indexes structure (`{ "indexes": [], "fieldOverrides": [] }`) in `firestore.indexes.json`

---

## Phase 2: Foundational (Security Rules & PWA Assets)

**Purpose**: Author Cloud Firestore Security Rules via the mandatory specialist subagent and create the core PWA manifest and icon assets before building the runnable application bundle.

**⚠️ CRITICAL**: Must complete before user story phases.

- [X] T004 Delegate authoring of `firestore.rules` to the `firestore-rules-author` subagent to secure `match /hyrox_profiles/{syncCode}` with schema validation (`schemaVersion == 1`, `syncCode` length `3..40`, `selectedDayNum` `1..26`, `divisionKey` in `['WOMEN_OPEN', 'MEN_OPEN', 'WOMEN_PRO', 'MEN_PRO']`, `athleteWeight` `35..200`, `roxzoneTargetSec` `12..60`, `fractionationProfile` in `['SAFE_80_20', 'BALANCED_PARETO', 'ELITE_DENSITY']`) in `firestore.rules`
- [X] T005 [P] Create the HYROX tactical vector app icon in `public/icon.svg`
- [X] T006 [P] Create the PWA Web App Manifest (`name`: `"HYROX 26 Dias • Periodização Tática & Pareto 80/20"`, `short_name`: `"HYROX 26D"`, `start_url`: `"/index.html"`, `display`: `"standalone"`, `background_color`: `"#020617"`, `theme_color`: `"#facc15"`, `orientation`: `"portrait-primary"`) in `public/manifest.json`

**Checkpoint**: Firebase configuration, Firestore security rules, and PWA manifest/icon assets are ready.

---

## Phase 3: User Story 1 - Acesso Web Público e Instalação Mobile como App (PWA) (Priority: P1) 🎯 MVP

**Goal**: Converter o componente React do Tracker de 26 Dias + Motor de Pareto 80/20 numa página HTML5/PWA 100% executável no navegador (Desktop e Mobile) com Service Worker de cache offline em `public/index.html` e `public/sw.js`.

**Independent Test**: Abrir `public/index.html` (ou servir via Firebase Hosting emulator), verificar que a aplicação renderiza sem etapa de build manual, registar o Service Worker `public/sw.js` e confirmar funcionamento *offline*.

### Implementation for User Story 1

- [X] T007 [P] [US1] Create the Offline-First Service Worker implementing install/activate pre-caching of `/`, `/index.html`, `/manifest.json`, `/icon.svg` and *Stale-While-Revalidate* runtime caching for CDN scripts in `public/sw.js`
- [X] T008 [US1] Create the self-contained runnable HTML5 application in `public/index.html` with mobile/iOS PWA meta tags (`apple-mobile-web-app-capable`, `viewport-fit=cover`, `theme-color: #020617`), Tailwind CSS, ES module import map for `react`, `react-dom/client`, and `lucide-react`, Service Worker registration, and the complete HYROX 26-Day + Pareto 80/20 React application in `public/index.html`

**Checkpoint**: User Story 1 (MVP) is functional — the app is directly runnable in any browser and installable as an offline-capable PWA.

---

## Phase 4: User Story 2 - Experiência Otimizada para Uso Mobile em Ginásio/Pista (Priority: P2)

**Goal**: Adicionar a barra de navegação inferior fixa (*Bottom Navigation Bar*) para uso com o polegar em smartphones (`< 768px`) e integrar a API `Screen Wake Lock` no Cronómetro EMOM & Roxzone para impedir o bloqueio do ecrã durante o treino.

**Independent Test**: Redimensionar o navegador para viewport mobile (`375x812`), alternar entre as 6 abas através da barra inferior fixa e iniciar o cronómetro verificando o indicador `Ecrã Ativo (Wake Lock)`.

### Implementation for User Story 2

- [X] T009 [US2] Implement the `Screen Wake Lock` hook (`navigator.wakeLock.request('screen')`) inside `App` in `public/index.html`, automatically acquiring the wake lock when `timerRunning === true`, re-acquiring on `visibilitychange`, and displaying the `Wake Lock Ativo (Ecrã Sempre Ligado)` status badge in the Cronómetro EMOM & Roxzone card in `public/index.html`
- [X] T010 [US2] Implement the fixed mobile *Bottom Navigation Bar* (`md:hidden fixed bottom-0 inset-x-0 z-40`) with 1-tap thumb access to all 6 tabs (`Treino`, `1RMs`, `26 Dias`, `Carga`, `Tática`, `Nutrição`) and safe-area bottom padding in `public/index.html`

**Checkpoint**: User Stories 1 and 2 are complete — mobile ergonomics and screen wake lock are active.

---

## Phase 5: User Story 3 - Continuidade de Dados entre Web (Computador) e Mobile (Telemóvel) (Priority: P2)

**Goal**: Permitir sincronizar o estado completo do atleta (`AthleteSyncSnapshot`) entre Web e Mobile através do Cloud Firestore (`hyrox_profiles/{syncCode}`) e disponibilizar Exportação/Importação de Backup JSON em 1 clique.

**Independent Test**: Abrir o modal `Web & Mobile Sync` no cabeçalho, exportar o backup `.json`, alterar um valor, importar o ficheiro `.json` para restaurar o estado e testar o envio/receção (Push/Pull) com Cloud Firestore para o `syncCode` configurado.

### Implementation for User Story 3

- [X] T011 [US3] Implement `buildAthleteSyncSnapshot()` and `applyAthleteSyncSnapshot(snapshot)` helpers validating all constraints from `data-model.md` (`schemaVersion === 1`, `syncCode` `3..40` chars, `selectedDayNum` `1..26`, `divisionKey` enum, `athleteWeight` `35..200`, `roxzoneTargetSec` `12..60`, `fractionationProfile` enum) and persisting `hyrox_sync_code`, `hyrox_firebase_config`, `hyrox_last_updated_at`, and `hyrox_last_synced_at` in `public/index.html`
- [X] T012 [US3] Implement Cloud Firestore synchronization (`pushToCloudFirestore` and `pullFromCloudFirestore` targeting `hyrox_profiles/{syncCode}` via Firestore REST/Web API with automatic online sync option) and 1-click JSON file Export/Import handlers in `public/index.html`
- [X] T013 [US3] Render the "Web & Mobile Sync (Firebase Cloud + Backup JSON + Guia Instalar App)" button in the top header and its interactive modal in `public/index.html`

**Checkpoint**: All 3 User Stories (`US1`, `US2`, `US3`) are complete in `public/index.html`.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Keep root `hyrox_26_day_tactical_periodization_tracker.html` synchronized with `public/index.html` and validate the full setup.

- [X] T014 Synchronize the root `hyrox_26_day_tactical_periodization_tracker.html` with the runnable `public/index.html` bundle so opening either file works identically in `hyrox_26_day_tactical_periodization_tracker.html`
- [X] T015 Validate all files (`firebase.json`, `.firebaserc`, `firestore.rules`, `firestore.indexes.json`, `public/index.html`, `public/manifest.json`, `public/sw.js`, `public/icon.svg`) against `quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1 — T001–T003)**: No dependencies — can run immediately in parallel.
- **Foundational (Phase 2 — T004–T006)**: `T004` delegates `firestore.rules` to `firestore-rules-author`; `T005` and `T006` create PWA static assets in `public/`.
- **User Story 1 (Phase 3 — T007–T008, P1 🎯 MVP)**: Depends on Phase 1–2; creates `public/sw.js` and `public/index.html`.
- **User Story 2 (Phase 4 — T009–T010, P2)**: Enhances `public/index.html` with mobile Bottom Navigation and Screen Wake Lock.
- **User Story 3 (Phase 5 — T011–T013, P2)**: Enhances `public/index.html` with Web ↔ Mobile Cloud Firestore sync and JSON Backup.
- **Polish (Phase 6 — T014–T015)**: Mirrors `public/index.html` to root `hyrox_26_day_tactical_periodization_tracker.html` and verifies all artifacts.

### Parallel Opportunities

- `T001`, `T002`, `T003`, `T005`, `T006`, `T007` operate on independent files (`firebase.json`, `.firebaserc`, `firestore.indexes.json`, `public/icon.svg`, `public/manifest.json`, `public/sw.js`) and can be executed in parallel while `T004` (`firestore.rules` via `firestore-rules-author`) runs.

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 & Phase 2 (`T001`–`T006`)
2. Complete Phase 3 (`T007`–`T008`)
3. Validate `public/index.html` as an installable, offline-ready PWA for Firebase Hosting.
4. Layer `US2` (Mobile Bottom Nav + Wake Lock) and `US3` (Cloud Firestore Sync + JSON Backup), then sync root file (`T014`–`T015`).

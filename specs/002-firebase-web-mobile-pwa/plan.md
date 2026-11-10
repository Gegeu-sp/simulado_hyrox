# Implementation Plan: Aplicação Web e Mobile (PWA) no Firebase para o Tracker HYROX 26 Dias

**Branch**: `002-firebase-web-mobile-pwa` | **Date**: 2026-11-10 | **Spec**: [spec.md](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/specs/002-firebase-web-mobile-pwa/spec.md)

**Input**: Feature specification from `/specs/002-firebase-web-mobile-pwa/spec.md`

## Summary

Transformar o **HYROX 26-Day Tactical Periodization Tracker** (atualmente um ficheiro de componente JSX bruto não executável diretamente no navegador) numa **Progressive Web App (PWA) Web & Mobile completa**, pronta para hospedagem no **Firebase Hosting** e sincronização entre dispositivos via **Cloud Firestore** + **Backup JSON**:
1. **Empacotamento Web Executável & Firebase Hosting (`public/index.html` + `firebase.json`)**: Criar a estrutura oficial de publicação do Firebase Hosting com `public/index.html` autocontido e diretamente executável no navegador (React 18 + Tailwind CSS + Lucide Icons + Motor de Pareto 80/20 completo), mantendo também `hyrox_26_day_tactical_periodization_tracker.html` atualizado e executável.
2. **PWA Instalável no Telemóvel & Offline Cache (`public/manifest.json` + `public/sw.js` + `public/icon.svg`)**: Permitir instalação no ecrã inicial do Android e iOS em modo *standalone* (ecrã inteiro) e funcionamento 100% *offline* no ginásio ou pista através de Service Worker.
3. **Ergonomia Mobile para Treino (`Bottom Navigation Bar` + `Screen Wake Lock`)**: Adicionar barra de navegação inferior fixa para o polegar em ecrãs móveis (`< 768px`), ajustes de área segura (`safe-area`) e ativação automática da API `Screen Wake Lock` enquanto o Cronómetro Tático da Roxzone/EMOM estiver em execução.
4. **Sincronização Web ↔ Mobile (`Cloud Sync Firestore` + `Exportar/Importar JSON`)**: Painel integrado de sincronização que permite partilhar o estado completo do atleta (`1RMs`, `GRP`, peso, dias concluídos, `sRPE`, meta de Roxzone e perfil de fracionamento) entre computador e smartphone através de um Código de Atleta no Cloud Firestore (com regras de segurança geradas pelo subagente especialista `firestore-rules-author`) e backup manual em ficheiro `.json`.

## Technical Context

**Language/Version**: HTML5, JavaScript ES2022 / JSX (React 18 Functional Components), Service Worker API, Screen Wake Lock API

**Primary Dependencies**: `react@18`, `react-dom@18`, `lucide-react`, Tailwind CSS, Firebase Hosting & Cloud Firestore REST/Web integration (`firebase-tools`)

**Storage**: `window.localStorage` (`hyrox_*` como fonte primária *Offline-First* imediata) + Cloud Firestore (`hyrox_profiles/{syncCode}`) + Exportação/Importação de ficheiro `.json`

**Testing**: Validação em Desktop, Mobile Viewport (`360px`–`430px`), Modo Offline (DevTools) e Emulador do Firebase Hosting conforme [quickstart.md](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/specs/002-firebase-web-mobile-pwa/quickstart.md)

**Target Platform**: Web Desktop (Chrome, Edge, Safari, Firefox) e Mobile PWA (iOS Safari "Adicionar ao Ecrã Principal" e Android Chrome "Instalar App") via Firebase Hosting CDN

**Project Type**: Progressive Web Application (PWA) Single-Page App configurada para Firebase Hosting e Cloud Firestore

**Performance Goals**: First Contentful Paint `< 1.5s` em 4G/Wi-Fi, carregamento `< 0.5s` via Service Worker cache offline, transições de aba em `< 16ms` (60fps).

**Constraints**: Preservação estrita do funcionamento 100% *offline* no ginásio (Princípio III da Constituição); compatibilidade total com todas as chaves `hyrox_*` existentes; delegação obrigatória da criação de `firestore.rules` ao subagente `firestore-rules-author`.

**Scale/Scope**: 6 vistas táticas responsivas, 26 dias de treino, 4 frentes de Pareto 80/20, sincronização de 10 chaves de estado do atleta entre Web e Mobile.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio da Constituição (`v1.0.0`) | Avaliação Pré-Pesquisa | Avaliação Pós-Design (Fase 1) | Evidência / Justificativa |
|--------------------------------------|------------------------|-------------------------------|---------------------------|
| **I. Fidelidade Científica e Regulamentar HYROX (INVIOLÁVEL)** | ✅ PASS | ✅ PASS | Mantém intactos todos os dados dos 26 dias, 4 microciclos, cargas oficiais 2026/27 e os 4 pilares do Motor Tático de Pareto 80/20. |
| **II. Prescrição Dinâmica e Individualizada** | ✅ PASS | ✅ PASS | Todos os cálculos de `1RM`, `GRP`, nutrição e Pareto permanecem dinâmicos e são sincronizados integralmente entre Web e Mobile. |
| **III. Arquitetura Offline-First e Persistência Local Imediata** | ✅ PASS | ✅ PASS | O `localStorage` (`hyrox_*`) continua a ser a fonte primária síncrona; o Service Worker (`sw.js`) garante abertura da página sem internet e o Cloud Sync atua de forma não-bloqueante. |
| **IV. Monitorização de Carga Interna (sRPE) e Prontidão Fisiológica** | ✅ PASS | ✅ PASS | O diário de `sRPE`, FC basal matinal e notas de transição passa a ser facilmente registado no telemóvel no fim do treino e sincronizado com o computador. |
| **V. Interface Tática de Alta Legibilidade e Usabilidade em Treino** | ✅ PASS | ✅ PASS | A nova *Bottom Navigation Bar* mobile e o *Screen Wake Lock* no cronómetro elevam a usabilidade prática durante as sessões de treino. |

**Resultado do Gate**: **APROVADO** (Zero violações à Constituição).

## Project Structure

### Documentation (this feature)

```text
specs/002-firebase-web-mobile-pwa/
├── plan.md                         # Este plano de implementação (/speckit-plan)
├── research.md                     # Decisões arquiteturais PWA, Mobile UX e Firebase (Fase 0)
├── data-model.md                   # Modelo AthleteSyncSnapshot e FirebaseSyncConfig (Fase 1)
├── quickstart.md                   # Guia de validação Web, Mobile, Offline e Deploy (Fase 1)
├── contracts/
│   └── firebase-pwa-contract.md    # Contratos de Hosting, Firestore Sync e Mobile UI
├── checklists/
│   └── requirements.md             # Checklist de qualidade da especificação (16/16 PASS)
└── tasks.md                        # Lista de tarefas de implementação (/speckit-tasks)
```

### Source Code (repository root)

```text
./
├── firebase.json                                     # Configuração do Firebase Hosting e Firestore
├── .firebaserc                                       # Mapeamento de projeto Firebase (default alias)
├── firestore.rules                                   # Regras de segurança Firestore (via firestore-rules-author)
├── firestore.indexes.json                            # Índices do Cloud Firestore
├── public/                                           # Diretório público servido pelo Firebase Hosting CDN
│   ├── index.html                                    # Aplicação Web & Mobile PWA completa e executável
│   ├── manifest.json                                 # Manifesto de instalação PWA (Android/iOS/Desktop)
│   ├── sw.js                                         # Service Worker para funcionamento Offline-First
│   └── icon.svg                                      # Ícone vetorial tático HYROX (HX)
└── hyrox_26_day_tactical_periodization_tracker.html  # Ficheiro raiz sincronizado e executável
```

**Structure Decision**: Adota-se a estrutura padrão do **Firebase Hosting** (`public/` + `firebase.json` + `firestore.rules` + `firestore.indexes.json`) mantendo `hyrox_26_day_tactical_periodization_tracker.html` na raiz sincronizado com `public/index.html` para que o utilizador possa tanto abrir o ficheiro localmente com duplo clique quanto publicar no Firebase Hosting.

## Complexity Tracking

> Nenhuma violação à Constituição identificada; tabela de exceções não aplicável.

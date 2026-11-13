---
description: "Task list for feature 009: Gráfico de Pareto Dinâmico por Treino"
---

# Tasks: Gráfico de Pareto (80/20) Dinâmico por Dia de Treino

**Input**: Design documents from `specs/009-daily-workout-pareto-analysis/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`

## Phase 1: Setup & Foundational Engine

- [x] T001 Criar estrutura de especificação e contratos em `specs/009-daily-workout-pareto-analysis/`
- [x] T002 Implementar a função `getDailyWorkoutParetoCandidates(dayNum, ctx)` em `src/App.jsx` cobrindo todos os 26 dias de treino com blocos, corrida, ergômetros, 1RMs e dicas táticas
- [x] T003 Adicionar estados reativos `paretoScope` ('WORKOUT_DAY' | 'COMPETITION'), `paretoDayNum` e `paretoMetric` ('FATIGUE' | 'TIME') em `src/App.jsx`

---

## Phase 2: User Story 1 - Análise de Pareto Dinâmica por Dia (Priority: P1) 🎯 MVP

- [x] T004 [US1] Atualizar o cálculo memoizado `analyticsData` em `src/App.jsx` para derivar `rawParetoCandidates` dinamicamente conforme `paretoScope` e `paretoDayNum`
- [x] T005 [US1] Ordenar decrescentemente os candidatos, computar percentuais individuais (`sharePct`) e acumulados (`cumulativePct`), garantindo fechamento exato em 100.0%
- [x] T006 [US1] Identificar os itens do grupo `★ Vital 80%` e gerar o diagnóstico tático da sessão diária

---

## Phase 3: User Story 2 - Controles Interativos e Interface (Priority: P2)

- [x] T007 [US2] Implementar no topo do Card do Gráfico de Pareto os botões de Escopo: "Treino do Dia (Dia X)" vs. "Simulado Completo"
- [x] T008 [US2] Implementar dropdown de navegação rápida dos 26 dias integrado no cabeçalho do cartão de Pareto com indicação do tipo de sessão
- [x] T009 [US2] Implementar alternância de métrica: "Fadiga / Carga Interna" vs. "Tempo Gasto"
- [x] T010 [US2] Renderizar o estado informativo especial para dias de descanso (Dias 6, 13, 20) com diretrizes de regeneração do SNC
- [x] T011 [US2] Atualizar a renderização das barras SVG (destaque dourado para vitais, ciano para acumulada e linha de corte 80%) e a lista de diagnósticos abaixo do gráfico

---

## Phase 4: Validação, Compilação e Deploy

- [x] T012 Executar bateria de testes com `test_pareto_days.js` e compilar bundle de produção em `public/index.html` via `build_production_html.js`
- [x] T013 Validar integridade sintática e testes da matriz (26 dias × 4 divisões × 7 abas)
- [x] T014 Publicar no Firebase Hosting (`https://hyrox-simulado-26d.web.app`)
- [x] T015 Atualizar `README.md`, fazer commit e enviar para o GitHub (`origin main`)

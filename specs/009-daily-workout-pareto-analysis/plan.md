# Implementation Plan: Gráfico e Análise de Pareto (80/20) Dinâmico por Dia de Treino

**Branch**: `009-daily-workout-pareto-analysis` | **Date**: 2026-11-12 | **Spec**: [spec.md](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/specs/009-daily-workout-pareto-analysis/spec.md)

**Input**: Feature specification from `/specs/009-daily-workout-pareto-analysis/spec.md`

## Summary

Evoluir o Gráfico de Pareto para Eficiência de Exercícios na aba **Analytics & Gráficos (7)** de uma visão estática de prova (10 estações) para um motor multidimensional dinâmico por dia de treino. O sistema passa a decompor com precisão os exercícios, blocos, corrida prescrita (com velocidade, pace e distância) e sobrecargas de força (1RMs e Race Weights da divisão ativa) de **cada um dos 26 dias do ciclo**. O painel de Pareto incluirá:
1. Seletor de Escopo: "Treino do Dia (Dia X)" (padrão) vs. "Simulado Oficial Completo (Prova 8x1km + 8 Estações)";
2. Seletor rápido de navegação entre os 26 dias diretamente no cartão do gráfico;
3. Alternância de métrica: "Fadiga / Carga Interna da Sessão" vs. "Tempo Gasto no Treino";
4. Curva de Pareto visual com ordenação decrescente rigorosa, linha de corte 80% e totalização exata em 100.0%;
5. Diagnóstico tático da sessão destacando os 20% vitais de exercícios e diretrizes preventivas anti-fade.

## Technical Context

**Language/Version**: JavaScript (ES2022+ / React 18 sem dependências externas adicionais)  
**Primary Dependencies**: React (Hooks `useState`, `useMemo`, `useCallback`), Tailwind CSS via CDN, Lucide Icons via inline SVG, Canvas 2D API  
**Storage**: `localStorage` sob a chave `hyrox_pareto_scope` e `hyrox_pareto_metric` com fallbacks seguros  
**Testing**: Suite de testes com Node.js (`test_pareto_days.js`), verificação de integridade sintática e compilação do bundle de produção com matrix test (26 dias × 4 divisões × 7 abas)  
**Target Platform**: Navegadores modernos (Desktop, Tablet e Mobile), compatível com PWA e Offline-first  
**Performance Goals**: Troca de dia e recálculo da curva de Pareto em tempo inferior a 15ms  
**Constraints**: Zero dependência externa de bibliotecas de gráficos (SVG puro renderizado reativamente); manter 100% de coerência terminológica em Português do Brasil (rounds, esteira, quadril, etc.)

## Constitution Check

- **I. Fidelidade Científica e Regulamentar HYROX**: PASS. Cargas de estações respeitam rigorosamente a divisão ativa (`MEN_OPEN`, `WOMEN_OPEN`, `MEN_PRO`, `WOMEN_PRO`), deltas de sobrecarga (overload 1.0 a 1.25) e prescrição do modelo *Endurance-Led, Strength-Protected*.
- **II. Prescrição Dinâmica e Individualizada**: PASS. Para cada dia, exercícios de força utilizam a tabela de 1RMs do atleta ativo; corrida utiliza as 5 zonas de corrida e o ritmo GRP; dias com registros salvos utilizam tempos reais de `dayLogs`.
- **III. Arquitetura Offline-First e Persistência Local Imediata**: PASS. Execução 100% no cliente sem chamadas de rede ou backends externos.
- **IV. Monitorização de Carga Interna (sRPE)**: PASS. A métrica de fadiga pondera o volume, intensidade e stress biomecânico da sessão.
- **V. Interface Tática de Alta Legibilidade**: PASS. Pro Dark Mode, tooltips nativos em SVG, cores consistentes (dourado/laranja para Vital 80%, azul para secundários, ciano para linha cumulativa).

## Project Structure

### Documentation (this feature)

```text
specs/009-daily-workout-pareto-analysis/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── pareto-engine.ts
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code

```text
src/
└── App.jsx              # Funções getDailyWorkoutParetoCandidates(), estado paretoScope, UI no cartão de Pareto
public/
└── index.html           # Bundle de produção compilado
```

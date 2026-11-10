# Implementation Plan: Motor Tático de Pareto 80/20 para Periodização HYROX (26 Dias)

**Branch**: `001-pareto-80-20-tactics` | **Date**: 2026-11-10 | **Spec**: [spec.md](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/specs/001-pareto-80-20-tactics/spec.md)

**Input**: Feature specification from `/specs/001-pareto-80-20-tactics/spec.md`

## Summary

Implementar o **Motor Tático de Pareto 80/20** na aplicação de periodização de 26 dias para o simulado HYROX (`hyrox_26_day_tactical_periodization_tracker.html`), operacionalizando as 4 frentes científicas da Regra 80/20:
1. **Regra do Motor Aeróbico (80% Determinante Primário)**: Diretriz diária do "Núcleo Vital 20%" em cada um dos 26 dias e painel de auditoria planeado vs. realizado (82% sessões aeróbicas/híbridas vs. 18% sessões de força pura) com alerta contra negligência aeróbica.
2. **Identificação e Proteção do Piso de Força (*Strength Floor*)**: Matriz dinâmica que cruza os `1RMs` compostos do atleta com as cargas oficiais da divisão selecionada (`WOMEN_OPEN`, `MEN_OPEN`, `WOMEN_PRO`, `MEN_PRO`) nas 5 estações pesadas, diagnosticando se a estação está em *Domínio Metabólico (Protegido)*, *Zona Limiar* ou *Alerta SNC (Modo Sobrevivência)*.
3. **Gestão Cirúrgica da Roxzone (Ganho Marginal de 6 Minutos)**: Simulador interativo das 16 passagens na Roxzone (comparando o tempo do atleta contra os benchmarks de `05m21s` Top 10% e `11m25s` Bottom 10%, convertendo a economia em `seg/km` de corrida) e integração do **Protocolo dos 3 Passos** no cronómetro tático da sessão.
4. **Fracionamento Preventivo nas Estações de Alta Fadiga**: Seletor interativo de esquemas de quebra de séries (*Rep-Breaking*) pautados por ciclos respiratórios (3 a 5 respirações antes da falha concêntrica) para **Sandbag Lunges (100m)** e **Wall Balls (100 reps)**, sincronizado com os treinos do dia e com o plano do Simulado Oficial (Dia 26 — 05/12).

## Technical Context

**Language/Version**: JavaScript / JSX (React 18+ Functional Components via Hooks `useState`, `useEffect`, `useMemo`)

**Primary Dependencies**: `react`, `lucide-react`, Tailwind CSS utility classes

**Storage**: `window.localStorage` (chaves com prefixo padronizado `hyrox_*`, 100% *client-side* e *offline-first*)

**Testing**: Validação funcional e de invariantes de cálculo conforme [quickstart.md](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/specs/001-pareto-80-20-tactics/quickstart.md)

**Target Platform**: Navegadores Web Modernos (Desktop e Mobile Responsivo)

**Project Type**: Single-file React Web Application (`hyrox_26_day_tactical_periodization_tracker.html`)

**Performance Goals**: Recálculo instantâneo (`< 16ms` / 60fps) via `useMemo` ao alternar divisão competitiva, `1RMs`, ritmo `GRP`, tempo de transição na Roxzone ou perfil de fracionamento.

**Constraints**: Funcionamento 100% offline sem dependências externas de API; preservação integral dos dados canónicos dos 26 dias e 4 microciclos; tema escuro de alto contraste (`slate-950`/`slate-900`).

**Scale/Scope**: 26 dias de treino estruturados em 4 microciclos, 4 divisões oficiais HYROX Singles 2026/27, 9 exercícios compostos de força base, 8 estações oficiais e 6 abas de comando tático.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio da Constituição (`v1.0.0`) | Avaliação Pré-Pesquisa | Avaliação Pós-Design (Fase 1) | Evidência / Justificativa |
|--------------------------------------|------------------------|-------------------------------|---------------------------|
| **I. Fidelidade Científica e Regulamentar HYROX (INVIOLÁVEL)** | ✅ PASS | ✅ PASS | Preserva integralmente os 26 dias, as 4 divisões oficiais 2026/27, a polarização *Hard/Easy* e o corte de 55% no *Tapering*. |
| **II. Prescrição Dinâmica e Individualizada** | ✅ PASS | ✅ PASS | O índice de Piso de Força, a auditoria 80/20 e a economia na Roxzone (em minutos e `seg/km` sobre o `GRP`) são derivados dinamicamente do perfil do atleta. |
| **III. Arquitetura Offline-First e Persistência Local Imediata** | ✅ PASS | ✅ PASS | Novas preferências (`hyrox_roxzone_sec` e `hyrox_fractionation_profile`) persistem imediatamente no `localStorage` com *fallbacks* seguros. |
| **IV. Monitorização de Carga Interna (sRPE) e Prontidão Fisiológica** | ✅ PASS | ✅ PASS | A auditoria 80/20 integra tanto a contagem de sessões quanto as Unidades Arbitrárias (`sRPE`) registadas no diário de carga. |
| **V. Interface Tática de Alta Legibilidade e Usabilidade em Treino** | ✅ PASS | ✅ PASS | Utiliza codificação semântica (esmeralda/âmbar/rosa/amarelo), tipografia `font-mono` para métricas e integra o Protocolo dos 3 Passos no cronómetro de sessão. |

**Resultado do Gate**: **APROVADO** (Zero violações à Constituição).

## Project Structure

### Documentation (this feature)

```text
specs/001-pareto-80-20-tactics/
├── plan.md              # Este plano de implementação (/speckit-plan)
├── research.md          # Decisões científicas e algoritmos da Fase 0
├── data-model.md        # Modelo de dados e entidades da Fase 1
├── quickstart.md        # Guia de validação passo a passo da Fase 1
├── contracts/           # Contratos de UI e persistência localStorage
│   └── ui-state-contract.md
├── checklists/
│   └── requirements.md  # Checklist de qualidade da especificação
└── tasks.md             # Lista de tarefas de implementação (/speckit-tasks)
```

### Source Code (repository root)

```text
./
├── hyrox_26_day_tactical_periodization_tracker.html  # Aplicação principal React (Single-File Component)
└── .specify/
    ├── memory/
    │   └── constitution.md                           # Constituição do projeto (v1.0.0)
    └── feature.json                                  # Ponteiro da funcionalidade ativa
```

**Structure Decision**: A aplicação reside num único ficheiro autocontido (`hyrox_26_day_tactical_periodization_tracker.html`) na raiz do repositório. Todas as constantes de domínio de Pareto, hooks de estado (`localStorage`), seletores memoizados (`useMemo`) e secções visuais nas abas `TODAY`, `STRENGTH_RM`, `LOAD` e `STRATEGY` serão integrados diretamente neste ficheiro, mantendo a simplicidade arquitetural e a portabilidade total.

## Complexity Tracking

> Nenhuma violação à Constituição identificada; tabela de exceções não aplicável.

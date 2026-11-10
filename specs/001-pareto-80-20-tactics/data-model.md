# Phase 1 Data Model: Motor Tático de Pareto 80/20

**Feature**: `001-pareto-80-20-tactics`
**Date**: 2026-11-10

## 1. Entidades de Domínio

### 1.1 `ParetoDayDirective` (Diretriz Diária de Pareto 80/20)
Mapeamento estático-derivado para cada `dayNum` (1 a 26) de `WORKOUT_DAYS`:

| Campo | Tipo | Descrição / Regras de Validação |
|-------|------|---------------------------------|
| `dayNum` | `number` (1..26) | Identificador único do dia na periodização |
| `pillar` | `'AEROBIC_ENGINE' \| 'STRENGTH_FLOOR' \| 'ROXZONE_MARGINAL' \| 'PREVENTIVE_PACING' \| 'RECOVERY_SUPERCOMP'` | Pilar dominante do Princípio de Pareto na sessão |
| `bucket8020` | `'PRIMARY_80_AEROBIC' \| 'SUPPORT_20_STRENGTH' \| 'RECOVERY'` | Classificação para a auditoria quantitativa da Regra 80/20 |
| `vital20Focus` | `string` | Ação específica ("20% de esforço") que gera 80% do retorno fisiológico naquele dia |
| `avoidTrap` | `string` | O erro comum ("80% de desperdício/fadiga inútil") que o atleta deve evitar na sessão |

### 1.2 `AerobicAuditMetrics` (Métricas de Auditoria 80/20)
Objeto computado via `useMemo` a partir de `WORKOUT_DAYS`, `completedDays` e `dayLogs`:

| Campo | Tipo | Descrição / Fórmula |
|-------|------|---------------------|
| `plannedAerobicSessions` | `number` | Total de sessões ativas no eixo `PRIMARY_80_AEROBIC` (18 sessões) |
| `plannedStrengthSessions` | `number` | Total de sessões ativas no eixo `SUPPORT_20_STRENGTH` (4 sessões: Dias 1, 8, 15, 21) |
| `plannedAerobicRatioPct` | `number` | Percentagem planeada do motor aeróbico/híbrido (`82%`) |
| `completedAerobicSessions` | `number` | Sessões concluídas pelo atleta no eixo `PRIMARY_80_AEROBIC` |
| `completedStrengthSessions` | `number` | Sessões concluídas pelo atleta no eixo `SUPPORT_20_STRENGTH` |
| `actualAerobicRatioPct` | `number` | Percentagem real de treinos aeróbicos face ao total de treinos ativos concluídos |
| `aerobicLoadUnits` | `number` | Unidades Arbitrárias (`sRPE`) acumuladas no eixo aeróbico/corrida comprometida |
| `strengthLoadUnits` | `number` | Unidades Arbitrárias (`sRPE`) acumuladas no eixo de força |
| `imbalanceWarning` | `boolean` | `true` se `doneCount >= 3` e `actualAerobicRatioPct < 65%` (alerta de negligência do motor aeróbico) |

### 1.3 `StrengthFloorStationDiag` (Diagnóstico de Piso de Força por Estação)
Vetor computado via `useMemo` cruzando `oneRMs` e `DIVISIONS[divisionKey]`:

| Campo | Tipo | Descrição / Regras de Validação |
|-------|------|---------------------------------|
| `stationId` | `'sledPush' \| 'sledPull' \| 'farmersCarry' \| 'sandbagLunges' \| 'wallBalls'` | Identificador da estação oficial |
| `stationName` | `string` | Nome da estação (ex.: `2. Sled Push (50m)`) |
| `officialLoadDesc` | `string` | Carga oficial formatada para a divisão ativa (ex.: `152 kg`, `2x 24 kg`) |
| `officialLoadKg` | `number` | Valor numérico de referência da carga oficial |
| `anchorExerciseName` | `string` | Exercício composto base usado como âncora de força máxima |
| `athleteAnchor1RM` | `number` | Valor atual do `1RM` do atleta no exercício âncora (`>= 0`) |
| `relativeDemandPct` | `number` | Índice de exigência relativa face ao limiar de segurança da estação |
| `status` | `'PROTECTED' \| 'THRESHOLD' \| 'CNS_RISK' \| 'UNCONFIGURED'` | Estatuto neuromuscular da estação |
| `statusLabel` | `string` | Rótulo legível (`Domínio Metabólico (Protegido)`, `Zona Limiar`, `Alerta SNC / Sobrevivência`) |
| `recommendation` | `string` | Prescrição tática de Pareto (foco nos Dias 1, 8, 15, 21 ou ajuste de quebra de série) |

### 1.4 `RoxzoneSimulationState` (Estado e Simulação da Roxzone)
| Campo | Tipo | Descrição / Regras de Validação |
|-------|------|---------------------------------|
| `roxzoneTargetSec` | `number` (12..60) | Tempo médio por passagem na Roxzone (16 passagens oficiais). Padrão: `22` segundos |
| `totalRoxzoneSec` | `number` | `roxzoneTargetSec * 16` |
| `eliteBenchmarkSec` | `number` | `321` segundos (`05:21` — Top 10% oficial) |
| `slowBenchmarkSec` | `number` | `685` segundos (`11:25` — Bottom 10% oficial) |
| `savedVsSlowSec` | `number` | `Math.max(0, 685 - totalRoxzoneSec)` |
| `equivalentPaceGainSecPerKm` | `number` | `Math.round(savedVsSlowSec / 8)` (equivalente de ganho por km de corrida) |

### 1.5 `FractionationScheme` (Plano de Fracionamento Preventivo)
| Campo | Tipo | Descrição / Regras de Validação |
|-------|------|---------------------------------|
| `id` | `'SAFE_80_20' \| 'BALANCED_PARETO' \| 'ELITE_DENSITY'` | Identificador do perfil de fracionamento |
| `name` | `string` | Nome tático do perfil |
| `wallBallsSets` | `string` | Sequência de repetições até 100 (ex.: `25 - 20 - 15 - 15 - 15 - 10`) |
| `wallBallsRestBreaths` | `string` | Pausa em ciclos respiratórios (ex.: `3 a 5 respirações (~6s) com bola apoiada na parede`) |
| `lungesStrategy` | `string` | Esquema para os 100m de Sandbag Lunges sem pousar o saco no solo |
| `lungesRestBreaths` | `string` | Pausa respiratória em extensão completa da anca |
| `estimatedTimeSaved` | `string` | Ganho estimado ao evitar falha concêntrica (ex.: `+90s a +150s poupados vs. falha`) |

## 2. Persistência no `localStorage`

Novas chaves sincronizadas sob o prefixo obrigatório `hyrox_`:
- `hyrox_roxzone_sec`: `string` (inteiro entre `12` e `60`, padrão `'22'`)
- `hyrox_fractionation_profile`: `'SAFE_80_20' | 'BALANCED_PARETO' | 'ELITE_DENSITY'` (padrão `'BALANCED_PARETO'`)


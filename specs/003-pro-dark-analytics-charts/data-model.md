# Phase 1 Data Model: Suite de 7 Gráficos Analíticos, Diagrama de Pareto e Telemetria Dark Mode

**Feature**: `003-pro-dark-analytics-charts`  
**Date**: 2026-11-10

---

## 1. Entidades de Dados Analíticos (`useMemo` Derivados em Tempo Real)

### 1.1 `EvolutionDayPoint` (Para Gráfico 1: Linha e Gráfico 2: Área)

Representa um ponto diário (`dayNum: 1..26`) nas séries temporais de evolução de desempenho e volume acumulado.

| Campo | Tipo | Descrição / Regra de Cálculo |
| :--- | :--- | :--- |
| `dayNum` | `number` (`1..26`) | Número sequencial do dia no plano de 26 dias. |
| `date` | `string` | Data curta (`10/11` a `05/12`). |
| `microcycle` | `number` (`1..4`) | Identificador do microciclo. |
| `plannedSRPE` | `number` | Carga interna planeada em UA (`durationMin * (loadIndex === 0 ? 0 : loadIndex + 9)`). |
| `actualSRPE` | `number` | Carga interna registada pelo atleta (ou valor planeado se ainda não registado, com flag `isCompleted`). |
| `strengthIntensityPct` | `number` (`0..100`) | Percentagem máxima/média de `1RM` prescrita ou estimada na sessão. |
| `targetPaceSec` | `number` | Ritmo alvo da sessão em segundos por km (derivado do `goalPace` e categoria do dia). |
| `cumAnteriorVol` | `number` | Volume acumulado de estímulos na Cadeia Anterior (Quadríceps/Sled Push/Lunges/Wall Balls). |
| `cumPosteriorVol` | `number` | Volume acumulado na Cadeia Posterior (Glúteos/Isquiotibiais/Sled Pull/RDL/Trap Bar). |
| `cumUpperVol` | `number` | Volume acumulado Superior Empurrar/Puxar (SkiErg/Rowing/Push Press/Remada). |
| `cumCoreGripVol` | `number` | Volume acumulado de Core & Grip (Farmer's Carry/Abdominais/Estabilidade). |
| `cumAerobicVol` | `number` | Volume acumulado do Motor Aeróbico / Corrida (minutos ponderados). |

---

### 1.2 `MicrocycleCompositionBucket` (Para Gráfico 3: Barras Empilhadas)

Representa a composição semanal de cada um dos 4 microciclos (`M1` a `M4`).

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `microcycleId` | `number` (`1..4`) | Identificador do microciclo (`M1` a `M4`). |
| `label` | `string` | Nome curto (`Sem 1 (Choque)`, `Sem 2 (Pico)`, `Sem 3 (Transição)`, `Sem 4 (Taper)`). |
| `muscleSets` | `object` | `{ anterior: number, posterior: number, costasPull: number, ombrosPush: number, coreGrip: number }` (séries efetivas semanais). |
| `hrZonesMin` | `object` | `{ z1: number, z2: number, z3: number, z4: number, z5: number }` (minutos semanais em cada zona cardíaca). |

---

### 1.3 `AthleteRadarProfile` (Para Gráfico 4: Radar / Teia Multidimensional)

Representa os 5 eixos de avaliação física do atleta (`0` a `100`) face ao benchmark da divisão.

| Eixo (`id`) | Rótulo | Fórmula de Pontuação (`0..100`) | Benchmark Divisão |
| :--- | :--- | :--- | :--- |
| `strength` | `Força (1RM)` | Média das reservas de força nas 5 estações pesadas (`strengthFloorDiagnostics` reservePct). | `85` |
| `endurance` | `Resistência` | Baseado no `goalPace` (ex.: `04:00/km` = 95, `05:30/km` = 68) + bónus de treinos aeróbicos concluídos. | `85` |
| `mobility` | `Mobilidade` | Baseado na relação Front Squat / Back Squat (`>= 0.78` ideal para mecânica de Wall Ball/Lunge) + sessões de mobilidade. | `80` |
| `power` | `Potência` | Baseado nos 1RMs de Trap Bar Deadlift + Push Press + Back Squat face ao peso corporal (`athleteWeight`). | `82` |
| `speed` | `Velocidade & Roxzone` | Baseado na eficiência de transição `roxzoneTargetSec` (`20s` = 96, `40s` = 55) + ritmo de VO2máx (`GRP - 7s`). | `85` |

---

### 1.4 `SessionCorrelationPoint` (Para Gráfico 5: Dispersão e Gráfico 6: Combinado Barra + Linha)

Representa a relação entre carga externa, perceção interna de esforço e prontidão/recuperação.

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `dayNum` | `number` (`1..26`) | Dia do plano. |
| `externalLoad` | `number` (`0..100`) | Carga Externa Normalizada da sessão (`(durationMin * loadIndex) / 9.5`). |
| `internalRPE` | `number` (`6..20`) | Perceção Subjetiva de Esforço (Escala de Borg registada em `dayLogs` ou prevista para a sessão). |
| `readinessScore` | `number` (`0..100`) | Índice de Prontidão / VFC Estimada (`100 - fadiga residual acumulada - penalização de FC basal elevada`). |
| `zoneStatus` | `'OPTIMAL' \| 'HIGH_LOAD' \| 'OVERREACH_RISK'` | Classificação do acoplamento Carga Externa vs. Interna (`OVERREACH_RISK` quando `internalRPE` excede em `>= +2` o esperado para a carga externa). |

---

### 1.5 `ParetoExerciseItem` (Para Gráfico 7: Diagrama de Pareto 80/20 de Eficiência de Exercícios)

Representa cada exercício/segmento oficial do HYROX ordenado decrescentemente pelo seu impacto na fadiga ou no tempo perdido.

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `string` | Identificador (`running`, `sledPush`, `wallBalls`, `sandbagLunges`, `sledPull`, `burpees`, `roxzone`, `rowing`, `skiErg`, `farmersCarry`). |
| `name` | `string` | Nome curto oficial para o Eixo X. |
| `fatigueScore` | `number` | Pontuação de Desgaste / Fadiga Metabólica & Neuromuscular (ajustada dinamicamente pelos défices de `1RM` e `roxzoneTargetSec` do atleta). |
| `timeLossSec` | `number` | Tempo estimado perdido/gasto acima do benchmark de elite (segundos) com base no perfil atual do atleta. |
| `value` | `number` | Valor ativo conforme o modo selecionado (`'FATIGUE'` ou `'TIME_LOSS'`). |
| `sharePct` | `number` (`0..100`) | Percentagem individual do total (`%`). |
| `cumulativePct` | `number` (`0..100`) | Percentagem acumulada no Eixo Y direito (`0%` a `100%`). |
| `isVital80` | `boolean` | `true` se o exercício faz parte do grupo crítico que acumula até a linha de corte de **80%**. |
| `actionTip` | `string` | Diretriz técnica imediata para reduzir o desperdício naquela estação. |

---

## 2. Estado de Preferências de Visualização dos Gráficos

- **`evolutionMetric`**: `'SRPE' | 'STRENGTH_RM' | 'PACE'` (alterna a métrica do Gráfico de Linha).
- **`compositionMode`**: `'MUSCLE_SETS' | 'HR_ZONES'` (alterna o Gráfico de Barras Empilhadas entre Grupos Musculares e Zonas Cardíacas Z1–Z5).
- **`paretoMetric`**: `'FATIGUE' | 'TIME_LOSS'` (alterna o Gráfico de Pareto entre Fadiga Acumulada e Tempo Perdido/Excedente).
- **`analyticsFilterMicrocycle`**: `'ALL' | 1 | 2 | 3 | 4` (permite filtrar ou destacar um microciclo específico nas análises).


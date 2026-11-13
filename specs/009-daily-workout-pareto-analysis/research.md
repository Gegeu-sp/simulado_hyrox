# Phase 0 Research: Motor de Pareto Dinâmico por Treino

## 1. Mapeamento dos 26 Dias de Treino e Estrutura dos Exercícios

Cada dia no array `WORKOUT_DAYS` possui:
- `blocks`: Array com `{ name, details, usesRW, overload }`
- `category`: Categoria fisiológica (`STRENGTH`, `AEROBIC`, `COMPROMISED`, `ERG_CAPACITY`, `SPEED`, `SIMULATION`, `REST`, `RACE_DAY`)
- `durationMin`: Duração planejada da sessão (minutos)
- `loadIndex`: Índice de estresse (1 a 10)

### Casos Especiais:
1. **Dias de Descanso (Dias 6, 13, 20)**:
   - Categoria `REST`, sem blocos ativos de exercício.
   - Diagnóstico tático: 100% de foco na recuperação de glicogênio muscular, sono restaurador e hidratação. O painel deve exibir um estado informativo elegante com diretrizes de supercompensação e botão para alternar para a visão global da prova ou avançar para o próximo dia ativo.
2. **Dias de Força Pura / Acessórios (Dias 1, 8, 15, 21)**:
   - Exercícios principais (Back Squat, RDL, Bulgarian Split Squat, Trap Bar / Deadlift) calculados a partir dos 1RMs do atleta ativo (`oneRMs[key]`).
   - Trenós de sobrecarga calculados com `division.sledPushWeight * (overload || 1.0)`.
3. **Dias de Corrida Comprometida e Ergômetros (Dias 3, 4, 10, 11, 17, 18, 23)**:
   - Intervalos de corrida na zona prescrita (`Z3`, `Z4`, `Z5`) + blocos intercalados de SkiErg, Row, Burpee Broad Jumps, Sandbag Lunges e Wall Balls.
4. **Dias de Simulação / Simulado Oficial (Dias 7, 26)**:
   - No Dia 26 (ou no modo Simulado Completo), o gráfico decompõe as 8 estações da prova oficial + os 8x1km de corrida + as Roxzones.

## 2. Modelagem das Métricas: Fadiga vs. Tempo

### Métrica A: Fadiga / Carga Interna (`fatigueScore`)
A fadiga de um exercício/bloco pondera:
- Intensidade metabólica da estação ou exercício (ex.: Sled Push e Burpees possuem maior custo neuromuscular por minuto que trote leve ou mobilidade);
- Carga prescrita em relação à massa corporal do atleta ou ao 1RM;
- Tempo despendido ou repetições acumuladas.

### Métrica B: Tempo Gasto (`timeSec`)
Tempo real (quando disponível em `dayLogs[dayNum]`) ou tempo planejado em segundos calculado com base nos ritmos de corrida, cadence em ergômetros e repetições prescritas.

## 3. Algoritmo de Pareto (80/20) e Fechamento Exato em 100.0%

1. Extrair os candidatos do dia `dayNum` via `getDailyWorkoutParetoCandidates(dayNum, ctx)`.
2. Ordenar candidatos em ordem decrescente de valor (`value`).
3. Somar `totalVal = sum(item.value)`.
4. Para cada item `i`:
   - `sharePct = (item.value / totalVal) * 100`
   - `cumulativePct = sum(prev shares) + sharePct`
   - O último item recebe ajuste fino de arredondamento para garantir que `cumulativePct === 100.0`.
   - `isVital80 = (cumulativePct - sharePct) < 80.0`. Itens até ultrapassarem 80% são marcados como vitais.

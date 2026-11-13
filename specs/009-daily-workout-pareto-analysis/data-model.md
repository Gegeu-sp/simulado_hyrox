# Phase 1: Data Model & Contracts

## Entidades e Interfaces

### 1. `DailyWorkoutParetoItem`
```typescript
interface DailyWorkoutParetoItem {
  id: string;             // ex: 'day1_sled_push', 'day3_run_grp'
  name: string;           // Nome completo com carga ou distância (ex: 'Sled Push 100% RW (152 kg)')
  shortName: string;      // Rótulo compacto para o Eixo X (ex: 'Sled Push')
  category: 'RUN' | 'STATION' | 'STRENGTH' | 'WARMUP' | 'RECOVERY' | 'CORE';
  fatigueScore: number;   // Pontos relativos de fadiga (1..100)
  timeSec: number;        // Tempo estimado ou logado (segundos)
  value: number;          // Valor da métrica ativa (fatigueScore ou timeSec)
  sharePct: number;       // Percentual individual do total do treino (ex: 28.5)
  cumulativePct: number;  // Percentual acumulado da curva de Pareto (ex: 78.4)
  isVital80: boolean;     // Pertence aos 80% vitais da sessão
  actionTip: string;      // Diretriz tática para este exercício no dia
}
```

### 2. `ParetoScope`
```typescript
type ParetoScope = 'WORKOUT_DAY' | 'COMPETITION';
```

### 3. `ParetoMetric`
```typescript
type ParetoMetric = 'FATIGUE' | 'TIME';
```

### 4. `DailyParetoState`
```typescript
interface DailyParetoState {
  scope: ParetoScope;
  dayNum: number;
  metric: ParetoMetric;
  items: DailyWorkoutParetoItem[];
  totalValue: number;
  vitalCount: number;
  isRestDay: boolean;
  topVitalExercise?: DailyWorkoutParetoItem;
  efficiencyDirective: string;
}
```

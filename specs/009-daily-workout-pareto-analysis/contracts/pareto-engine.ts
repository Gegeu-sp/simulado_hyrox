/**
 * Contract: Pareto Engine for Daily Workout Efficiency
 */

export interface WorkoutContext {
  division: {
    id: string;
    name: string;
    sledPushWeight: number;
    sledPullWeight: number;
    kettlebellWeight: number;
    sandbagWeight: number;
    wallBallWeight: number;
  };
  runningZonesKmh: {
    Z1: number;
    Z2: number;
    Z3: number;
    Z4: number;
    Z5: number;
  };
  goalPace: string;
  oneRMs: Record<string, number>;
  customPcts: Record<string, number>;
  athleteWeight: number;
  currentLog?: {
    duration?: number;
    rpe?: number;
    usedSpeedKmh?: number;
    usedZone?: string;
    distanceKm?: number;
  };
}

export interface ParetoCandidate {
  id: string;
  name: string;
  shortName: string;
  category: 'RUN' | 'STATION' | 'STRENGTH' | 'WARMUP' | 'RECOVERY' | 'CORE';
  fatigueScore: number;
  timeSec: number;
  actionTip: string;
}

export type GetDailyParetoCandidatesFn = (
  dayNum: number,
  ctx: WorkoutContext
) => ParetoCandidate[];

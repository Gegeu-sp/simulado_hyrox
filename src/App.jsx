const { useState, useEffect, useMemo, useRef } = React;
const { createRoot } = ReactDOM;

// Ícones SVG vetoriais integrados (Lucide Standard) — zero dependências externas
const createSvgIcon = (children) => ({ className = 'w-4 h-4', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

const Calendar = createSvgIcon(<><rect width="18" height="18" x="3" y="4" rx="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></>);
const Flame = createSvgIcon(<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />);
const Activity = createSvgIcon(<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />);
const CheckCircle2 = createSvgIcon(<><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></>);
const Circle = createSvgIcon(<circle cx="12" cy="12" r="10" />);
const Dumbbell = createSvgIcon(<><path d="m6.5 6.5 11 11" /><path d="m21 21-1-1" /><path d="m3 3 1 1" /><path d="m18 22 4-4" /><path d="m2 6 4-4" /><path d="m3 10 7-7" /><path d="m14 21 7-7" /></>);
const Timer = createSvgIcon(<><line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="15" y1="14" y2="11" /><circle cx="12" cy="14" r="8" /></>);
const Trophy = createSvgIcon(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>);
const HeartPulse = createSvgIcon(<><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></>);
const Utensils = createSvgIcon(<><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></>);
const ChevronRight = createSvgIcon(<path d="m9 18 6-6-6-6" />);
const ChevronLeft = createSvgIcon(<path d="m15 18-6-6 6-6" />);
const Info = createSvgIcon(<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>);
const AlertTriangle = createSvgIcon(<><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>);
const Zap = createSvgIcon(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />);
const ShieldAlert = createSvgIcon(<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M12 8v4" /><path d="M12 16h.01" /></>);
const BarChart3 = createSvgIcon(<><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></>);
const Scale = createSvgIcon(<><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></>);
const Compass = createSvgIcon(<><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>);
const Play = createSvgIcon(<polygon points="6 3 20 12 6 21 6 3" />);
const Pause = createSvgIcon(<><rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" /></>);
const RotateCcw = createSvgIcon(<><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></>);
const Award = createSvgIcon(<><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></>);
const Cloud = createSvgIcon(<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />);
const Smartphone = createSvgIcon(<><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></>);
const Download = createSvgIcon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></>);
const Upload = createSvgIcon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></>);
const RefreshCw = createSvgIcon(<><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></>);
const X = createSvgIcon(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>);
const Database = createSvgIcon(<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></>);
const Users = createSvgIcon(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);
const Plus = createSvgIcon(<><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></>);
const Copy = createSvgIcon(<><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>);
const Trash2 = createSvgIcon(<><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></>);

// ==========================================
// EXERCÍCIOS DE FORÇA BASE & 1RM PADRÃO
// ==========================================

const STRENGTH_EXERCISES = {
  backSquat: { id: 'backSquat', name: 'Back Squat', unit: 'kg', default1RM: 130, note: '1RM da Barra (Costas)' },
  frontSquat: { id: 'frontSquat', name: 'Front Squat', unit: 'kg', default1RM: 100, note: '1RM da Barra (Frente)' },
  rdl: { id: 'rdl', name: 'Romanian Deadlift (RDL)', unit: 'kg', default1RM: 140, note: '1RM da Barra' },
  trapBarDeadlift: { id: 'trapBarDeadlift', name: 'Trap Bar Deadlift', unit: 'kg', default1RM: 160, note: '1RM Total' },
  bulgarianSplitSquat: { id: 'bulgarianSplitSquat', name: 'Bulgarian Split Squat', unit: 'kg', default1RM: 60, note: 'Carga Total (Barra/Halteres)' },
  barbellWalkingLunges: { id: 'barbellWalkingLunges', name: 'Heavy Barbell Walking Lunges', unit: 'kg', default1RM: 70, note: '1RM da Barra' },
  gobletSquat: { id: 'gobletSquat', name: 'Goblet Squat (Kettlebell/Halter)', unit: 'kg', default1RM: 40, note: '1RM do Halter/KB' },
  dbPushPress: { id: 'dbPushPress', name: 'Push Press com Halteres', unit: 'kg', default1RM: 24, note: '1RM por Halter (Cada Mão)' },
  bentOverRow: { id: 'bentOverRow', name: 'Remada Curvada', unit: 'kg', default1RM: 80, note: '1RM da Barra' }
};

// ==========================================
// DADOS EXTRAÍDOS FIELMENTE DO DOCUMENTO PDF
// ==========================================

const DIVISIONS = {
  WOMEN_OPEN: {
    id: 'WOMEN_OPEN',
    name: 'Women Open (Base)',
    sledPush: 102,
    sledPull: 78,
    farmersCarry: 16, // 2x 16kg
    sandbagLunges: 10,
    wallBallsWeight: 4,
    wallBallsTarget: '2,70 m'
  },
  MEN_OPEN: {
    id: 'MEN_OPEN',
    name: 'Men Open',
    sledPush: 152,
    sledPull: 103,
    farmersCarry: 24, // 2x 24kg
    sandbagLunges: 20,
    wallBallsWeight: 6,
    wallBallsTarget: '3,00 m'
  },
  WOMEN_PRO: {
    id: 'WOMEN_PRO',
    name: 'Women Pro',
    sledPush: 152,
    sledPull: 103,
    farmersCarry: 24, // 2x 24kg
    sandbagLunges: 20,
    wallBallsWeight: 6,
    wallBallsTarget: '2,70 m'
  },
  MEN_PRO: {
    id: 'MEN_PRO',
    name: 'Men Pro (Topo)',
    sledPush: 202,
    sledPull: 153,
    farmersCarry: 32, // 2x 32kg
    sandbagLunges: 30,
    wallBallsWeight: 9,
    wallBallsTarget: '3,00 m'
  }
};

const MICROCYCLES = [
  {
    id: 1,
    title: 'Microciclo 1: Calibração de Ritmo e Choque de Especificidade',
    dates: '10/11 a 15/11 (6 dias)',
    volumeRel: 85,
    intensitySpec: 85,
    focus: 'Adaptação inicial às transições e validação das cargas oficiais da divisão. Estabelecer baselines de ritmo.',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 2,
    title: 'Microciclo 2: Pico de Sobrecarga e Tolerância Máxima ao Lactato',
    dates: '16/11 a 22/11 (7 dias)',
    volumeRel: 100,
    intensitySpec: 95,
    focus: 'Maior acumulação de fadiga central e periférica; sobrecarga nos trenós (+10-15%) e simulação a 75% da prova.',
    color: 'from-red-600 to-rose-700'
  },
  {
    id: 3,
    title: 'Microciclo 3: Especificidade Crítica, Transições e Pré-Polimento',
    dates: '23/11 a 29/11 (7 dias)',
    volumeRel: 75,
    intensitySpec: 100,
    focus: 'Corte de 25% do volume (sobretudo excêntrico); foco cirúrgico na velocidade de transição na Roxzone.',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 4,
    title: 'Microciclo 4: Tapering, Supercompensação e Simulado Oficial',
    dates: '30/11 a 05/12 (6 dias)',
    volumeRel: 45,
    intensitySpec: 90,
    focus: 'Corte de 55% do volume; dissipação total da fadiga muscular e manutenção da tensão neural até sábado.',
    color: 'from-emerald-500 to-teal-600'
  }
];

const WORKOUT_DAYS = [
  // MICROCICLO 1
  {
    dayNum: 1,
    date: '10/11',
    weekday: 'Terça-feira',
    microcycle: 1,
    type: 'Força Específica & Trenós (Strength Floor)',
    category: 'STRENGTH',
    loadIndex: 8,
    durationMin: 60,
    volumeDesc: '60 min (300 m trenós/carries acumulados)',
    targetZone: 'Força / Alático-Glicolítico',
    targetRPE: '16-17 (Borg) | Cargas 100% RW',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Aquecimento', details: '10 min mobilidade de anca/tornozelo + ativação glútea.' },
      { 
        name: 'Força Base', 
        details: 'Back Squat ou Front Squat 4 x 8 reps (descanso 2 min) + Romanian Deadlift (RDL) 4 x 10 reps.',
        strengthPrescriptions: [
          { exId: 'backSquat', name: 'Back Squat (Barra Costas)', defaultPct: 0.775, sets: '4 x 8 reps (Opção A)', targetRIR: 'RIR 2 (Piso de Força)' },
          { exId: 'frontSquat', name: 'Front Squat (Barra Frente - 70% do Back Squat)', defaultPct: 0.70, sets: '4 x 8 reps (Opção B - Tronco Vertical)', targetRIR: 'RIR 2 (70% do 1RM Back Squat)' },
          { exId: 'rdl', name: 'Romanian Deadlift (RDL)', defaultPct: 0.725, sets: '4 x 10 reps', targetRIR: 'RIR 2 (Controlo Excêntrico)' }
        ]
      },
      { name: 'Especificidade de Trenós (4 Rondas)', details: '25 m Sled Push (100% RW) + 25 m Sled Pull (100% RW) + 100 m Farmer\'s Carry (100% RW). Descanso de 2 min entre rondas.', usesRW: ['sledPush', 'sledPull', 'farmersCarry'], overload: 1.0 }
    ],
    coachTip: 'A ausência de um "piso de força" (strength floor) impõe penalizações severas. Mantenha um ângulo corporal baixo no Sled Push e evite paragens intermédias.'
  },
  {
    dayNum: 2,
    date: '11/11',
    weekday: 'Quarta-feira',
    microcycle: 1,
    type: 'Base Aeróbica (Zona 2) & Mobilidade',
    category: 'AEROBIC',
    loadIndex: 3,
    durationMin: 60,
    volumeDesc: '60 min (~7 a 9 km de corrida)',
    targetZone: 'Zona 2 (70-75% FCmáx)',
    targetRPE: '11-12 (Borg)',
    nutritionType: 'LOW',
    blocks: [
      { name: 'Corrida Contínua', details: '45 minutos em terreno plano a ritmo estritamente conversacional (Zona 2).' },
      { name: 'Trabalho Complementar', details: '15 min de libertação miofascial (foam rolling) e mobilidade torácica e flexores da anca.' }
    ],
    coachTip: 'Ponte regenerativa obrigatória. O trabalho conversacional sem picos de esforço promove a capilarização e acelera a remoção de subprodutos metabólicos para quinta-feira.'
  },
  {
    dayNum: 3,
    date: '12/11',
    weekday: 'Quinta-feira',
    microcycle: 1,
    type: 'Compromised Running (Transições Base)',
    category: 'COMPROMISED',
    loadIndex: 9,
    durationMin: 65,
    volumeDesc: '65 min (5,5 km corrida + 5 estações)',
    targetZone: 'Zona 4 (85-90% FCmáx)',
    targetRPE: '16-17 (Borg)',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Aquecimento', details: '1,5 km trote leve + educativos de corrida.' },
      { name: 'Bloco Principal (5 Rondas)', details: '800 m de corrida ao ritmo alvo de prova (Goal Race Pace - GRP) imediatamente seguido de uma estação por ronda:\n• Ronda 1: 500 m SkiErg\n• Ronda 2: 20 m Burpee Broad Jumps\n• Ronda 3: 500 m Row\n• Ronda 4: 40 m Sandbag Lunges (100% RW)\n• Ronda 5: 30 Wall Balls (100% RW)', usesRW: ['sandbagLunges', 'wallBalls'], overload: 1.0 },
      { name: 'Recuperação', details: '90 segundos de trote/caminhada ativa entre rondas.' }
    ],
    coachTip: 'Na corrida sob fadiga, combata o encurtamento excessivo da passada e o overstriding. Foque na extensão da anca e reciclagem de lactato nos primeiros 200m.'
  },
  {
    dayNum: 4,
    date: '13/11',
    weekday: 'Sexta-feira',
    microcycle: 1,
    type: 'Limiar em Ergómetros & Resistência de Ombros',
    category: 'ERG_CAPACITY',
    loadIndex: 6,
    durationMin: 50,
    volumeDesc: '50 min (~1.800 m acumulados nos ergs + 90 WB)',
    targetZone: 'Zona 3-4 (82-88% FCmáx)',
    targetRPE: '15 (Borg)',
    nutritionType: 'MODERATE',
    blocks: [
      { name: 'Condicionamento Sem Impacto (EMOM 24 min - 6 Rondas)', details: '• Minuto 1: 12-15 cal SkiErg\n• Minuto 2: 15 Wall Balls (foco na cadência e respiração)\n• Minuto 3: 12-15 cal Row\n• Minuto 4: Descanso ativo.', usesRW: ['wallBalls'], overload: 1.0 },
      { name: 'Estabilidade do Core', details: '3 séries de Plank Pull-Throughs (20 reps) + Hollow Body Rocks (45 s).' }
    ],
    coachTip: 'Mantém o estímulo metabólico aeróbico elevado enquanto retira carga de impacto excêntrico dos tornozelos e joelhos antes da simulação de sábado.'
  },
  {
    dayNum: 5,
    date: '14/11',
    weekday: 'Sábado',
    microcycle: 1,
    type: 'Simulação Parcial Estruturada (Half-Sim Modificado)',
    category: 'SIMULATION',
    loadIndex: 9,
    durationMin: 65,
    volumeDesc: '55 a 70 min (4 km corrida + 50% de todas as estações)',
    targetZone: 'Zona 4 (88-92% FCmáx)',
    targetRPE: '17-18 (Ritmo de Prova)',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Execução Contínua Cronometrada (50% do volume na ordem oficial)', details: '1. 1 km Corrida -> 500 m SkiErg\n2. 1 km Corrida -> 25 m Sled Push (100% RW)\n3. 1 km Corrida -> 25 m Sled Pull (100% RW)\n4. 1 km Corrida -> 40 m Burpee Broad Jumps -> 500 m Row -> 100 m Farmer\'s Carry -> 50 m Sandbag Lunges -> 50 Wall Balls.', usesRW: ['sledPush', 'sledPull', 'farmersCarry', 'sandbagLunges', 'wallBalls'], overload: 1.0 }
    ],
    coachTip: 'Utilize géis isotónicos intra-treino (30 a 45g carbo/hora). Pratique o protocolo dos 3 passos ao sair de cada estação.'
  },
  {
    dayNum: 6,
    date: '15/11',
    weekday: 'Domingo',
    microcycle: 1,
    type: 'Descanso Absoluto',
    category: 'REST',
    loadIndex: 0,
    durationMin: 0,
    volumeDesc: '0 min (Repouso Total)',
    targetZone: 'Repouso',
    targetRPE: '6 (Repouso)',
    nutritionType: 'LOW',
    blocks: [
      { name: 'Protocolo de Restauração', details: 'Recuperação passiva completa do sistema nervoso central, hidratação (3 a 4 L de água + eletrólitos) e sono reparador (8+ horas).' }
    ],
    coachTip: 'O descanso de domingo é inegociável para permitir o reequilíbrio hormonal e a reparação miofibrilar antes da corrida fresca de segunda-feira.'
  },

  // MICROCICLO 2
  {
    dayNum: 7,
    date: '16/11',
    weekday: 'Segunda-feira',
    microcycle: 2,
    type: 'Intervalos de VO2máx e Limiar (Corrida Fresca)',
    category: 'SPEED',
    loadIndex: 8,
    durationMin: 60,
    volumeDesc: '60 min (9 km de volume total de corrida)',
    targetZone: 'Zona 4-5 (90-95% FCmáx)',
    targetRPE: '17-18 (Borg)',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Aquecimento', details: '2 km em Zona 1-2 + educativos de técnica de corrida.' },
      { name: 'Série Principal (6 x 1.000 m)', details: 'Em pista ou passadeira com 90 segundos de recuperação em trote leve entre repetições:\n• Primeiros 4 intervalos: 5 a 8 segundos/km mais rápidos que o ritmo alvo do HYROX.\n• Últimos 2 intervalos: cravados ao ritmo de 10 km.' },
      { name: 'Retorno à Calma', details: '1 km trote regenerativo.' }
    ],
    coachTip: 'Aproveite a frescura do SNC pós-descanso para desenvolver velocidade pura e potência aeróbica (VO2máx tem correlação de r = -0,71 com o tempo final).'
  },
  {
    dayNum: 8,
    date: '17/11',
    weekday: 'Terça-feira',
    microcycle: 2,
    type: 'Sobrecarga de Trenós & Força Unilateral',
    category: 'STRENGTH',
    loadIndex: 8,
    durationMin: 70,
    volumeDesc: '70 min (Overload Mecânico)',
    targetZone: 'Sobrecarga Neural e Periférica',
    targetRPE: '18 (Borg) | Trenó +10 a +15% RW',
    nutritionType: 'HIGH',
    blocks: [
      { 
        name: 'Força Unilateral', 
        details: 'Bulgarian Split Squats 4 x 8 por perna + Heavy Barbell Walking Lunges 3 x 16 passadas.',
        strengthPrescriptions: [
          { exId: 'bulgarianSplitSquat', name: 'Bulgarian Split Squat', defaultPct: 0.775, sets: '4 x 8 / perna', targetRIR: 'RIR 1-2 (Estabilidade Unilateral)' },
          { exId: 'barbellWalkingLunges', name: 'Heavy Barbell Walking Lunges', defaultPct: 0.725, sets: '3 x 16 passadas', targetRIR: 'Sobrecarga Específica p/ Sandbag' }
        ]
      },
      { name: 'Sobrecarga de Trenós (Overload - 5 Rondas)', details: '25 m Sled Push (com +10% a +15% ACIMA do peso oficial de prova) + 25 m Sled Pull (peso oficial 100% RW, focando na velocidade de transição na caixa), com 90 s de descanso entre séries.', usesRW: ['sledPush', 'sledPull'], overload: 1.125 },
      { name: 'Preensão Isométrica', details: '3 x 100 m Farmer\'s Carry pesado sem pousar os kettlebells.', usesRW: ['farmersCarry'], overload: 1.0 }
    ],
    coachTip: 'Treinar o Sled Push acima do peso de prova faz com que a carga oficial no dia 5 de dezembro pareça mecanicamente mais leve, protegendo suas pernas.'
  },
  {
    dayNum: 9,
    date: '18/11',
    weekday: 'Quarta-feira',
    microcycle: 2,
    type: 'Corrida Aeróbica Regenerativa (Zona 2)',
    category: 'AEROBIC',
    loadIndex: 3,
    durationMin: 65,
    volumeDesc: '65 min (~8 a 10 km de corrida)',
    targetZone: 'Zona 2 (<75% FCmáx)',
    targetRPE: '11-12 (Borg)',
    nutritionType: 'LOW',
    blocks: [
      { name: 'Corrida Contínua', details: '50 minutos suaves em superfície macia ou passadeira, mantendo a cadência controlada para reduzir forças de travagem.' },
      { name: 'Mobilidade', details: '15 min de alongamento dinâmico da cadeia posterior e tornozelos.' }
    ],
    coachTip: 'Não ceda à tentação de acelerar. Hoje o foco é depuração ativa e preparação para o treino severo de corrida comprometida de amanhã.'
  },
  {
    dayNum: 10,
    date: '19/11',
    weekday: 'Quinta-feira',
    microcycle: 2,
    type: 'Compromised Running Severo (Foco Membros Inferiores)',
    category: 'COMPROMISED',
    loadIndex: 9,
    durationMin: 70,
    volumeDesc: '70 min (5,5 km corrida + 200 m Carry + 200 m Lunges)',
    targetZone: 'Zona 4-5 (88-94% FCmáx)',
    targetRPE: '18 (Borg)',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Aquecimento', details: '1,5 km trote leve.' },
      { name: 'Circuito de Interferência Direta (4 Rondas Contínuas)', details: '• 400 m Corrida ao ritmo de prova\n• 50 m Farmer\'s Carry (100% RW)\n• 50 m Sandbag Lunges (100% RW, em blocos de 10 passadas com 2 respirações no topo)\n• 600 m Corrida Imediata ao ritmo de prova (foco na recuperação da passada nos primeiros 150 m).\n• Descanso: 2 minutos entre rondas.', usesRW: ['farmersCarry', 'sandbagLunges'], overload: 1.0 }
    ],
    coachTip: 'Nos Lunges, mantenha o saco alto nos trapézios (nunca na cervical), puxe os cotovelos para baixo e garanta o toque claro do joelho no solo sem dar passos de ajuste (shuffles).'
  },
  {
    dayNum: 11,
    date: '20/11',
    weekday: 'Sexta-feira',
    microcycle: 2,
    type: 'Capacidade de Ergómetros & Eficiência em Burpees',
    category: 'ERG_CAPACITY',
    loadIndex: 6,
    durationMin: 60,
    volumeDesc: '60 min (6.000 m de ergómetros + 80 m BBJ)',
    targetZone: 'Zona 3-4 (84-88% FCmáx)',
    targetRPE: '15-16 (Borg)',
    nutritionType: 'MODERATE',
    blocks: [
      { name: 'Bloco de Pacing nos Ergómetros (3 Séries)', details: '1.000 m SkiErg ao ritmo exato de prova + 60 s descanso + 1.000 m Row ao ritmo exato de prova + 2 min descanso.' },
      { name: 'Técnica Sob Fadiga (4 Séries)', details: '20 m Burpee Broad Jumps focando na colocação das mãos junto aos pés, base larga ao levantar e salto horizontal controlado (descanso 60 s).' }
    ],
    coachTip: 'SkiErg e Row são estações de controlo de ritmo (pacing stations), não de ataque. Nos Burpees, exale no fundo de cada repetição.'
  },
  {
    dayNum: 12,
    date: '21/11',
    weekday: 'Sábado',
    microcycle: 2,
    type: 'Simulação de Pico (75% do Volume Total - Big Brick)',
    category: 'SIMULATION',
    loadIndex: 9,
    durationMin: 75,
    volumeDesc: '65 a 80 min (6 km corrida + 6 estações completas)',
    targetZone: 'Zona 4-5 (90-96% FCmáx)',
    targetRPE: '18-19 (Borg - Ápice do Ciclo)',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Sequência Contínua de 6 Estações Completas', details: '1. 1 km Corrida + 1.000 m SkiErg\n2. 1 km Corrida + 50 m Sled Push (100% RW)\n3. 1 km Corrida + 50 m Sled Pull (100% RW)\n4. 1 km Corrida + 80 m Burpee Broad Jumps\n5. 1 km Corrida + 100 m Sandbag Lunges (100% RW)\n6. 1 km Corrida + 100 Wall Balls (100% RW, testando quebra planeada: 25-20-15-15-15-10).\n*(Nota: Omitir Remo e Farmer\'s Carry para limitar a sessão a ~70-75 min a 14 dias do teste)*', usesRW: ['sledPush', 'sledPull', 'sandbagLunges', 'wallBalls'], overload: 1.0 }
    ],
    coachTip: 'Este é o treino mais exigente dos 26 dias! Nos Wall Balls, apoie as mãos na bola contra a parede durante as 5 respirações de pausa — não pouse a bola no chão.'
  },
  {
    dayNum: 13,
    date: '22/11',
    weekday: 'Domingo',
    microcycle: 2,
    type: 'Descanso Absoluto',
    category: 'REST',
    loadIndex: 0,
    durationMin: 0,
    volumeDesc: '0 min (Repouso Total)',
    targetZone: 'Repouso',
    targetRPE: '6 (Repouso)',
    nutritionType: 'LOW',
    blocks: [
      { name: 'Supercompensação Inicial', details: 'Recuperação total, reposição agressiva de glicogénio muscular e sono profundo. Fim da fase de sobrecarga máxima.' }
    ],
    coachTip: 'A partir de amanhã entramos na janela de 14 dias de redução progressiva de fadiga (pré-polimento).'
  },

  // MICROCICLO 3
  {
    dayNum: 14,
    date: '23/11',
    weekday: 'Segunda-feira',
    microcycle: 3,
    type: 'Ritmo de Prova & Controlo de Limiar',
    category: 'SPEED',
    loadIndex: 7,
    durationMin: 50,
    volumeDesc: '50 min (7,5 km totais)',
    targetZone: 'Zona 4 (86-90% FCmáx)',
    targetRPE: '15-16 (Borg)',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Aquecimento', details: '1,5 km trote leve.' },
      { name: 'Calibração de Pace (5 x 1.000 m)', details: 'Cravados no ritmo alvo de prova (Goal Race Pace), com apenas 60 segundos de trote na Roxzone simulada entre séries para consolidar a perceção cinestésica do ritmo.' },
      { name: 'Retorno à Calma', details: '1 km trote leve.' }
    ],
    coachTip: 'Os atletas Top 10% mantêm as corridas intermédias (Corrida 3 à 7) dentro de uma margem estreita de apenas 10 segundos de variação.'
  },
  {
    dayNum: 15,
    date: '24/11',
    weekday: 'Terça-feira',
    microcycle: 3,
    type: 'Manutenção Neural de Força (Corte de Volume Excêntrico)',
    category: 'STRENGTH',
    loadIndex: 6,
    durationMin: 45,
    volumeDesc: '45 min (Alta tensão neural, baixa fadiga)',
    targetZone: 'Potência / Alático',
    targetRPE: '14-15 (Borg)',
    nutritionType: 'MODERATE',
    blocks: [
      { 
        name: 'Força Neural (Baixas Repetições, Sem Falha)', 
        details: 'Trap Bar Deadlift ou Back Squat 3 x 5 reps (a 80% 1RM, velocidade concêntrica máxima, 2,5 min descanso).',
        strengthPrescriptions: [
          { exId: 'trapBarDeadlift', name: 'Trap Bar Deadlift', defaultPct: 0.80, sets: '3 x 5 reps', targetRIR: '80% 1RM • Velocidade Concêntrica Máxima' },
          { exId: 'backSquat', name: 'Back Squat (Opção)', defaultPct: 0.80, sets: '3 x 5 reps', targetRIR: '80% 1RM • Sem Falha Muscular' }
        ]
      },
      { name: 'Velocidade nos Trenós (3 Séries)', details: '12,5 m Sled Push (100% RW) + 12,5 m Sled Pull (100% RW), focando na explosão inicial com descanso amplo de 2 min para evitar acidose residual.', usesRW: ['sledPush', 'sledPull'], overload: 1.0 }
    ],
    coachTip: 'Eliminamos o volume excêntrico pesado (como walking lunges longos) para extinguir microlesões estruturais enquanto preservamos o recrutamento de unidades motoras.'
  },
  {
    dayNum: 16,
    date: '25/11',
    weekday: 'Quarta-feira',
    microcycle: 3,
    type: 'Rodagem Aeróbica Curta & Mobilidade',
    category: 'AEROBIC',
    loadIndex: 3,
    durationMin: 50,
    volumeDesc: '50 min (~5 a 6 km)',
    targetZone: 'Zona 1-2 (<72% FCmáx)',
    targetRPE: '11 (Borg)',
    nutritionType: 'LOW',
    blocks: [
      { name: 'Corrida Zona 2', details: '35 minutos fáceis e fluidos.' },
      { name: 'Libertação e Articulações', details: '15 minutos focados na dorsiflexão do tornozelo, extensão da anca e abertura peitoral/ombros.' }
    ],
    coachTip: 'A rigidez articular elástica do tornozelo (RSI) depende de tendões recuperados e boa amplitude de dorsiflexão.'
  },
  {
    dayNum: 17,
    date: '26/11',
    weekday: 'Quinta-feira',
    microcycle: 3,
    type: 'Bricks de Transição Rápida (Roxzone Mastery)',
    category: 'COMPROMISED',
    loadIndex: 8,
    durationMin: 55,
    volumeDesc: '55 min (6,6 km corrida + 4 estações curtas)',
    targetZone: 'Zona 4 (88-90% FCmáx)',
    targetRPE: '16-17 (Borg)',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Aquecimento', details: '1 km leve.' },
      { name: 'Transições de Alta Precisão (4 Rondas)', details: '1.000 m Corrida a ritmo de prova -> Transição máxima de 15 segundos -> Estação curta:\n• Ronda 1: 150 m Farmer\'s Carry\n• Ronda 2: 30 Sandbag Lunges\n• Ronda 3: 20 Burpee Broad Jumps\n• Ronda 4: 40 Wall Balls\n-> Saída imediata em trote de 400 m no limiar para treinar o ajuste respiratório nos primeiros 10 metros pós-estação (2 min descanso entre rondas).', usesRW: ['farmersCarry', 'sandbagLunges', 'wallBalls'], overload: 1.0 }
    ],
    coachTip: 'A Roxzone separa os 10% mais rápidos (5m21s) dos 10% mais lentos (11m25s). Nunca trate a saída da estação como zona de descanso passivo!'
  },
  {
    dayNum: 18,
    date: '27/11',
    weekday: 'Sexta-feira',
    microcycle: 3,
    type: 'Polimento de Ergómetros & Cadência',
    category: 'ERG_CAPACITY',
    loadIndex: 5,
    durationMin: 45,
    volumeDesc: '45 min (Economia Mecânica)',
    targetZone: 'Zona 2-3 (75-82% FCmáx)',
    targetRPE: '13-14 (Borg)',
    nutritionType: 'MODERATE',
    blocks: [
      { name: 'Rotação Multi-Ergómetro (3 Rondas Contínuas)', details: '5 min Bike fácil + 500 m SkiErg a ritmo de prova + 5 min Row fácil + 500 m Row a ritmo de prova.' },
      { name: 'Ativação de Wall Balls', details: '3 x 20 repetições perfeitas, recebendo a bola no fundo do agachamento para aproveitar o ciclo alongamento-encurtamento.', usesRW: ['wallBalls'], overload: 1.0 }
    ],
    coachTip: 'No Remo, estabilize numa cadência económica de 24 a 28 s/m. Nos Wall Balls, garanta a prega da anca abaixo da linha do joelho para zero no-reps.'
  },
  {
    dayNum: 19,
    date: '28/11',
    weekday: 'Sábado',
    microcycle: 3,
    type: 'Último Ensaio de Ritmo (35% do Volume - Sharpener)',
    category: 'SIMULATION',
    loadIndex: 7,
    durationMin: 42,
    volumeDesc: '40 a 45 min (3 km corrida + estações fracionadas)',
    targetZone: 'Zona 4 (88% FCmáx)',
    targetRPE: '16 (Terminar com reserva)',
    nutritionType: 'HIGH',
    blocks: [
      { name: 'Ensaio Rápido a 7 Dias do Simulado (3 Rondas Contínuas)', details: '1.000 m Corrida a ritmo exato do Simulado seguido de estação combinada:\n• Ronda 1: 500 m SkiErg + 25 m Sled Push (100% RW)\n• Ronda 2: 500 m Row + 100 m Farmer\'s Carry (100% RW)\n• Ronda 3: 40 m Sandbag Lunges (100% RW) + 40 Wall Balls (100% RW).\n*(Importante: Terminar com reserva, sem ir à falha muscular)*', usesRW: ['sledPush', 'farmersCarry', 'sandbagLunges', 'wallBalls'], overload: 1.0 }
    ],
    coachTip: 'Estamos a 7 dias do simulado. O objetivo hoje é sentir o ritmo de prova fácil e controlado, sem esgotar as reservas.'
  },
  {
    dayNum: 20,
    date: '29/11',
    weekday: 'Domingo',
    microcycle: 3,
    type: 'Descanso Absoluto',
    category: 'REST',
    loadIndex: 0,
    durationMin: 0,
    volumeDesc: '0 min (Repouso Total)',
    targetZone: 'Repouso',
    targetRPE: '6 (Repouso)',
    nutritionType: 'LOW',
    blocks: [
      { name: 'Início da Semana de Tapering', details: 'Repouso total, início da otimização das reservas de glicogénio e sono reparador.' }
    ],
    coachTip: 'A partir de amanhã o volume cai 55% face ao pico. Qualquer tentativa de compensar treinos agora só gerará DOMS e fadiga residual.'
  },

  // MICROCICLO 4
  {
    dayNum: 21,
    date: '30/11',
    weekday: 'Segunda-feira',
    microcycle: 4,
    type: 'Manutenção Funcional & Aeróbico Leve',
    category: 'STRENGTH',
    loadIndex: 4,
    durationMin: 45,
    volumeDesc: '45 min (Sinalização Neural sem DOMS)',
    targetZone: 'Zona 2',
    targetRPE: '12-13 (Borg)',
    nutritionType: 'LOW',
    blocks: [
      { name: 'Mobilidade e Ativação', details: '15 min de fluxo articular.' },
      { 
        name: 'Força Leve (70% da carga habitual, zero falha)', 
        details: 'Goblet Squat 3 x 8 + Push Press com halteres 3 x 8 + Remada curvada 3 x 8 para sinalização neural sem induzir dor muscular tardia.',
        strengthPrescriptions: [
          { exId: 'gobletSquat', name: 'Goblet Squat', defaultPct: 0.575, sets: '3 x 8 reps', targetRIR: '~55-60% 1RM (Zero DOMS)' },
          { exId: 'dbPushPress', name: 'Push Press com Halteres', defaultPct: 0.575, sets: '3 x 8 reps', targetRIR: '~55-60% 1RM (C/ Halter)' },
          { exId: 'bentOverRow', name: 'Remada Curvada', defaultPct: 0.575, sets: '3 x 8 reps', targetRIR: '~55-60% 1RM (Ativação Dorsal)' }
        ]
      },
      { name: 'Corrida Leve', details: '25 minutos suaves em Zona 2.' }
    ],
    coachTip: 'Último estímulo com pesos livres da periodização. A partir de amanhã, zero carga excêntrica pesada nas pernas.'
  },
  {
    dayNum: 22,
    date: '01/12',
    weekday: 'Terça-feira',
    microcycle: 4,
    type: 'Rotação Suave de Máquinas & Corrida',
    category: 'AEROBIC',
    loadIndex: 3,
    durationMin: 40,
    volumeDesc: '40 min (Fluxo Sanguíneo sem Lactato)',
    targetZone: 'Zona 1-2 (<72% FCmáx)',
    targetRPE: '11 (Borg)',
    nutritionType: 'LOW',
    blocks: [
      { name: 'Sessão Contínua de Fluxo Sanguíneo (2 Rondas)', details: '5 min Bike + 5 min SkiErg técnico + 5 min Row técnico + 5 min Corrida fácil, focando na economia de movimento, relaxamento dos ombros e respiração controlada.' }
    ],
    coachTip: 'Mantenha os ombros relaxados e foque na eficiência mecânica do grande dorsal e da extensão da anca.'
  },
  {
    dayNum: 23,
    date: '02/12',
    weekday: 'Quarta-feira',
    microcycle: 4,
    type: 'Ativação Neuromuscular (Peak Sharpener)',
    category: 'SPEED',
    loadIndex: 5,
    durationMin: 35,
    volumeDesc: '35 min (Tensão Miogénica sem Fadiga)',
    targetZone: 'Ritmo de Prova (Frações Curtas)',
    targetRPE: '13 Global (Sem fadiga)',
    nutritionType: 'MODERATE',
    blocks: [
      { name: 'Corrida de Ativação', details: '10 min trote leve + 4 x 400 m exatamente ao ritmo de prova (com 90 s de caminhada/trote entre repetições).' },
      { name: 'EMOM Técnico de Estações (8 min - 30s trabalho / 30s descanso)', details: '• Min 1: SkiErg\n• Min 2: Sled Push leve\n• Min 3: Sled Pull leve\n• Min 4: Burpee Broad Jumps (3 reps fluidas)\n• Min 5: Row\n• Min 6: Farmer\'s Carry\n• Min 7: Lunges (peso corporal)\n• Min 8: 10 Wall Balls.', usesRW: ['wallBalls'], overload: 1.0 }
    ],
    coachTip: 'Estímulos curtos a 90% da intensidade específica evitam a sensação de letargia neuromuscular típica do polimento.'
  },
  {
    dayNum: 24,
    date: '03/12',
    weekday: 'Quinta-feira',
    microcycle: 4,
    type: 'Descanso Ativo / Mobilidade Pura',
    category: 'REST',
    loadIndex: 2,
    durationMin: 30,
    volumeDesc: '25 a 40 min (Regenerativo)',
    targetZone: 'Zona 1 (<120 bpm)',
    targetRPE: '9-10 (Borg)',
    nutritionType: 'CARB_LOAD',
    blocks: [
      { name: 'Protocolo Regenerativo', details: '25 minutos de caminhada leve ao ar livre + 15 minutos de mobilidade suave da anca, coluna torácica e tornozelos (ou descanso completo caso exista qualquer sinal de rigidez muscular residual).' }
    ],
    coachTip: 'INÍCIO DO CARB-LOADING (Últimas 48h): Suba para 6 a 8 g/kg de carboidratos limpos (arroz branco, massa, fruta) e reduza fibras insolúveis e gorduras.'
  },
  {
    dayNum: 25,
    date: '04/12',
    weekday: 'Sexta-feira',
    microcycle: 4,
    type: 'Shakeout Run (Ativação Pré-Prova)',
    category: 'AEROBIC',
    loadIndex: 2,
    durationMin: 18,
    volumeDesc: '15 a 20 min (Reatividade Tendinosa)',
    targetZone: 'Zona 1 + 3 Picos Aláticos de 12s',
    targetRPE: '10 (Borg)',
    nutritionType: 'CARB_LOAD',
    blocks: [
      { name: 'Trote de Desbloqueio', details: '12 a 15 minutos de corrida extremamente leve em Zona 1.' },
      { name: 'Retas de Ativação (Strides)', details: '3 x 80 metros de aceleração progressiva fluida (com retorno a passo) para manter a reatividade tendinosa sem gastar glicogénio.' },
      { name: 'Protocolo de Véspera', details: 'Hidratação controlada com cápsulas de sais ou bebida isotónica e jantar rico em hidratos de carbono de fácil digestão.' }
    ],
    coachTip: 'Proibido testar suplementos novos hoje! Elimine frituras, laticínios pesados e fibras insolúveis para zero desconforto gastrointestinal amanhã.'
  },
  {
    dayNum: 26,
    date: '05/12',
    weekday: 'Sábado',
    microcycle: 4,
    type: 'DIA DO SIMULADO OFICIAL HYROX',
    category: 'RACE_DAY',
    loadIndex: 10,
    durationMin: 86,
    volumeDesc: '60 a 105 min (8 km Corrida + 8 Estações Oficiais)',
    targetZone: '99% do tempo no Limiar ou acima (90-100% FCmáx)',
    targetRPE: '16 a 20 (Pico nos Wall Balls)',
    nutritionType: 'RACE_DAY',
    blocks: [
      { name: 'Aquecimento Oficial (30 min antes da largada)', details: '8 min trote progressivo + mobilidade dinâmica + Priming Metabólico (250 m SkiErg/Row forte + 5 Burpees + 8 Wall Balls + 2 x 100 m ao ritmo da Corrida 1).' },
      { name: 'Execução da Prova Completa (Ordem Fixa Oficial)', details: '1. Corrida 1 km (10-20s mais lento que o ritmo médio alvo!)\n2. Estação 1: SkiErg (1.000 m)\n3. Corrida 1 km\n4. Estação 2: Sled Push (50 m)\n5. Corrida 1 km\n6. Estação 3: Sled Pull (50 m)\n7. Corrida 1 km\n8. Estação 4: Burpee Broad Jumps (80 m)\n9. Corrida 1 km (Ponto crítico: manter cadência!)\n10. Estação 5: Rowing (1.000 m - estabilizar ventilação)\n11. Corrida 1 km\n12. Estação 6: Farmer\'s Carry (200 m)\n13. Corrida 1 km\n14. Estação 7: Sandbag Lunges (100 m - sem pousar o saco!)\n15. Corrida 1 km\n16. Estação 8: Wall Balls (100 repetições - quebra planeada!)', usesRW: ['sledPush', 'sledPull', 'farmersCarry', 'sandbagLunges', 'wallBalls'], overload: 1.0 }
    ],
    coachTip: 'REGRA DE OURO: Contenha a adrenalina no 1.º km (faça 10-20s mais lento que a meta). Na Roxzone, dê apenas 3 passos respirando fundo e volte imediatamente a trotar!'
  }
];

const OFFICIAL_STATIONS_STRATEGY = [
  {
    order: 1,
    name: 'SkiErg',
    volume: '1.000 m',
    role: 'Estação de Controlo (Pacing)',
    limitingFactor: 'Extensão da anca e grande dorsal; risco elevado de hiperventilação precoce.',
    tactics: 'Iniciar a 80% da capacidade nos primeiros 100m. Usar cadência longa apoiada na flexão do tronco e grande dorsal (poupar tricípites). Nos últimos 50m, reduzir solicitação das pernas para preparar a Corrida 2.',
    lactateImpact: 'Moderado (se controlado)'
  },
  {
    order: 2,
    name: 'Sled Push',
    volume: '50 m (4 x 12,5 m)',
    role: 'Sobrecarga Glicolítica Local',
    limitingFactor: 'Força de extensão de joelho/anca e atrito do tapete; paragens custam inércia.',
    tactics: 'Ângulo corporal baixo, braços bloqueados ou juntos ao tronco, passos curtos e constantes. Evitar paragens a meio da pista (vencer o atrito estático custa o dobro da força). Descansar apenas nas viragens de 12,5m.',
    lactateImpact: 'Muito Alto (Mediana: 128s)'
  },
  {
    order: 3,
    name: 'Sled Pull',
    volume: '50 m (4 x 12,5 m)',
    role: 'Força de Cadeia Posterior & Grip',
    limitingFactor: 'Cadeia posterior, preensão manual e tração na caixa delimitadora sem pisar linhas.',
    tactics: 'Não puxar apenas com os bíceps! Inclinar o peso corporal para trás com coluna neutra e caminhar para o fundo da caixa antes de recolher a corda mão sobre mão. Inserir micro-pausas de 3s a cada 12,5m.',
    lactateImpact: 'Muito Alto (Mediana: 155s)'
  },
  {
    order: 4,
    name: 'Burpee Broad Jumps',
    volume: '80 m',
    role: 'Estação Decisiva (Scoring)',
    limitingFactor: 'Potência horizontal e maior pico cardiovascular da 1.ª metade.',
    tactics: 'Colocar os pés junto às mãos em base larga ao levantar do solo (poupa lombar e flexores da anca). Executar saltos horizontais moderados e consistentes em séries mentais de 10 reps, exalando no fundo.',
    lactateImpact: 'Severo + Pico Cardíaco'
  },
  {
    order: 5,
    name: 'Rowing (Remo)',
    volume: '1.000 m',
    role: 'Recuperação Ativa & Pacing',
    limitingFactor: 'Gestão de ritmo a meio da prova; oportunidade para estabilizar a frequência respiratória.',
    tactics: 'Usar os primeiros 200m para regularizar a hiperventilação da Corrida 5. Estabilizar em 24-28 remadas/min com parcial constante. ZERO sprint final nos últimos 200m (poupar pernas para a segunda metade).',
    lactateImpact: 'Moderado (Estabilização)'
  },
  {
    order: 6,
    name: 'Farmer\'s Carry',
    volume: '200 m',
    role: 'Resistência Isométrica',
    limitingFactor: 'Antebraço, trapézio superior e estabilidade do core em marcha rápida.',
    tactics: 'Postura alta com escápulas retraídas para facilitar expansão pulmonar. Marcha rápida e curta sem correr em salto (evita oscilação dos kettlebells). No máximo 1 paragem rápida aos 100m se o grip falhar.',
    lactateImpact: 'Alto (Fadiga de Grip)'
  },
  {
    order: 7,
    name: 'Sandbag Lunges',
    volume: '100 m',
    role: 'Estação Crítica de Sobrevivência',
    limitingFactor: 'Força unilateral de quadricípite/glúteo; proibido pousar o saco (penalização 15s / DQ).',
    tactics: 'Saco alto nos trapézios (nunca na cervical), cotovelos puxados para baixo. Toque claro do joelho no solo e extensão completa da anca sem passos intermédios (shuffles). Fazer micro-pausa no topo a cada 10-15 reps (2 respirações).',
    lactateImpact: 'Extremo (Acidose Periférica)'
  },
  {
    order: 8,
    name: 'Wall Balls',
    volume: '100 repetições',
    role: 'Exaustão Final & Precisão',
    limitingFactor: 'Agachamento abaixo da paralela sob acidose severa; validação binária (zero avisos para no-rep).',
    tactics: 'Seguir fracionamento obrigatório: 25-20-15-15-15-10 ou 20-15-15-15-10-10-10-5. Nas pausas (5 respirações), apoiar as mãos na bola contra a parede sem a deixar cair no chão. Receber a bola já a descer no agachamento.',
    lactateImpact: 'Pico Absoluto (8,5+ mmol/L | RPE 20)'
  }
];

// ==========================================
// MOTOR TÁTICO DE PARETO 80/20 (CONSTANTES & REGRAS)
// ==========================================

const PARETO_PILLAR_META = {
  AEROBIC_ENGINE: {
    id: 'AEROBIC_ENGINE',
    label: 'Frente 1 • Motor Aeróbico (80% Determinante Primário)',
    shortBadge: '80% Motor Aeróbico',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    ruleSummary: 'A corrida representa 50-60% do tempo total de prova e possui o menor desvio padrão na classificação final.'
  },
  STRENGTH_FLOOR: {
    id: 'STRENGTH_FLOOR',
    label: 'Frente 2 • Piso de Força / Strength Floor (20% Suporte SNC)',
    shortBadge: '20% Piso de Força',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    ruleSummary: 'Força composta de alta eficiência e baixo volume para que as cargas oficiais exijam uma fração mínima do seu 1RM.'
  },
  ROXZONE_MARGINAL: {
    id: 'ROXZONE_MARGINAL',
    label: 'Frente 3 • Gestão Cirúrgica da Roxzone (Ganho Marginal)',
    shortBadge: 'Roxzone & Compromised Run',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    ruleSummary: '20% de disciplina comportamental na transição (Protocolo dos 3 Passos) poupa até 6 minutos sem custo metabólico extra.'
  },
  PREVENTIVE_PACING: {
    id: 'PREVENTIVE_PACING',
    label: 'Frente 4 • Fracionamento Preventivo & Simulação (Anti-Falha)',
    shortBadge: 'Fracionamento Preventivo 80/20',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    ruleSummary: 'Pequenas pausas planeadas de 3-5 respirações antes da falha concêntrica custam segundos mas poupam minutos.'
  },
  RECOVERY_SUPERCOMP: {
    id: 'RECOVERY_SUPERCOMP',
    label: 'Recuperação & Supercompensação do SNC',
    shortBadge: 'Dissipação de Fadiga',
    badgeClass: 'bg-slate-700/60 text-slate-300 border-slate-600',
    ruleSummary: 'A adaptação ocorre no repouso: proteger o sono e o glicogénio garante a absorção dos estímulos de alta carga.'
  }
};

const STRENGTH_STATION_PROTECTION_MAP = {
  backSquat: { stations: 'Sled Push (50m) & Wall Balls', tip: 'Pareto 20%: Foco em tensão mecânica limpa (RIR 2); zero falha concêntrica.' },
  frontSquat: { stations: 'Sled Push & Wall Balls (100 reps)', tip: 'Pareto 20%: Estabilidade torácica sob carga para proteger o padrão do Wall Ball.' },
  rdl: { stations: 'Sled Pull (50m) & Corrida 5-8', tip: 'Pareto 20%: Blindagem excêntrica da cadeia posterior sem induzir DOMS >72h.' },
  trapBarDeadlift: { stations: 'Sled Pull (50m) & Farmer\'s Carry (200m)', tip: 'Pareto 20%: Produção máxima de força concêntrica para reduzir o custo relativo do trenó.' },
  bulgarianSplitSquat: { stations: 'Sandbag Lunges (100m) & Sled Push', tip: 'Pareto 20%: Estabilidade unilateral de anca/joelho para eliminar passos intermédios.' },
  barbellWalkingLunges: { stations: 'Sandbag Lunges (100m)', tip: 'Pareto 20%: Torna o saco oficial da divisão leve e metabolicamente sustentável.' },
  gobletSquat: { stations: 'Wall Balls (100 reps)', tip: 'Pareto 20%: Manutenção de mobilidade e velocidade de saída do fundo do agachamento.' },
  dbPushPress: { stations: 'Wall Balls (Alvo 2,70m / 3,00m)', tip: 'Pareto 20%: Transferência elástica anca-ombro para poupar deltoides nas 100 reps.' },
  bentOverRow: { stations: 'Sled Pull & SkiErg / Rowing', tip: 'Pareto 20%: Resistência de tração dorsal e postura sob fadiga ventilatória.' }
};

const FRACTIONATION_SCHEMES = {
  SAFE_80_20: {
    id: 'SAFE_80_20',
    name: 'Conservador / Anti-Falha (Segurança SNC)',
    badge: '7 Séries • Risco Zero de Falha',
    wallBallsSets: '20 - 15 - 15 - 15 - 15 - 10 - 10',
    wallBallsRestBreaths: '4 a 5 respirações profundas (~7s) com a bola apoiada na parede',
    lungesStrategy: 'Blocos de 12,5m (meia pista) contínuos sem pousar o saco no solo',
    lungesRestBreaths: '3 respirações profundas em extensão completa da anca a cada 12,5m',
    estimatedTimeSaved: '+120s a +180s poupados face a quem vai até à falha na 1.ª série (~3m45s nos Wall Balls)'
  },
  BALANCED_PARETO: {
    id: 'BALANCED_PARETO',
    name: 'Tático Equilibrado 80/20 (Recomendado)',
    badge: '6 Séries • Ótimo Retorno Esforço/Tempo',
    wallBallsSets: '25 - 20 - 15 - 15 - 15 - 10',
    wallBallsRestBreaths: '3 a 5 respirações profundas (~5-6s) mantendo braços relaxados',
    lungesStrategy: 'Primeiros 50m em blocos de 25m; últimos 50m com micro-pausa a cada 12,5m',
    lungesRestBreaths: '2 a 3 respirações no topo antes que o vasto medial queime',
    estimatedTimeSaved: '+90s a +140s poupados com cadência constante (~3m15s nos Wall Balls)'
  },
  ELITE_DENSITY: {
    id: 'ELITE_DENSITY',
    name: 'Agressivo / Pro (Alta Densidade Metabólica)',
    badge: '4 Séries • Limiar Competitivo',
    wallBallsSets: '35 - 25 - 20 - 20',
    wallBallsRestBreaths: '3 respirações curtas e forçadas (~4s) sem largar o contacto visual do alvo',
    lungesStrategy: '4 x 25m unbroken (passadas diretas sem shuffle intermédio)',
    lungesRestBreaths: '2 respirações rápidas estritamente nas 3 viragens de 25m',
    estimatedTimeSaved: '+60s a +90s poupados para atletas com Piso de Força Protegido (~2m50s nos Wall Balls)'
  }
};

const PARETO_DAY_DIRECTIVES = {
  1: { pillar: 'STRENGTH_FLOOR', bucket8020: 'SUPPORT_20_STRENGTH', vital20Focus: 'Cumprir 4x8 no Squat e 4x10 no RDL com 2 repetições em reserva (RIR 2) e técnica rígida nos trenós a 100% RW.', avoidTrap: 'Não transforme a força base num circuito metabólico até à falha; proteja o SNC para a quinta-feira.' },
  2: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Manter 100% dos 50 min estritamente em Zona 2 nasal (65-75% FCmáx) para expandir densidade mitocondrial.', avoidTrap: 'Não acelere o ritmo mesmo que se sinta descansado; correr na "zona cinzenta" (Zona 3) sabota o treino de amanhã.' },
  3: { pillar: 'ROXZONE_MARGINAL', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Aplicar o Protocolo dos 3 Passos ao sair dos Lunges/Wall Balls e estabilizar o GRP nos primeiros 300m de cada 800m.', avoidTrap: 'Não caminhe nos primeiros 100m da corrida após largar os halteres; engrene o trote imediatamente.' },
  4: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Usar o SkiErg e o Remo para acumular volume aeróbico central com zero impacto excêntrico nas articulações.', avoidTrap: 'Não puxe nos ergómetros apenas com os braços; use o quadril e mantenha cadência de 24-28 spm.' },
  5: { pillar: 'PREVENTIVE_PACING', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Correr o 1.º km da simulação 10-15s mais lento que o GRP e fracionar preventivamente os 50 Wall Balls (20-15-15).', avoidTrap: 'Não largue em ritmo de 5km seco no primeiro bloco; teste a disciplina emocional de prova.' },
  6: { pillar: 'RECOVERY_SUPERCOMP', bucket8020: 'RECOVERY', vital20Focus: 'Sono profundo (8h+) e aporte completo de proteína e hidratos para supercompensar o Microciclo 1.', avoidTrap: 'Não faça "treinos extras" nem corte calorias no domingo de descanso.' },
  7: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Cravar os 6x 1.000m de forma homogénea (desvio <3s entre o 1.º e o 6.º tiro) para elevar o teto de VO2máx.', avoidTrap: 'Não faça o 1.º tiro de 1.000m como sprint máximo para depois colapsar nos tiros 5 e 6.' },
  8: { pillar: 'STRENGTH_FLOOR', bucket8020: 'SUPPORT_20_STRENGTH', vital20Focus: 'Dominar o Bulgarian Split Squat e o Walking Lunge pesado (70-80% 1RM) mais os trenós em overload (+10-15% RW).', avoidTrap: 'Não compense a carga pesada curvando a lombar; passos curtos e constantes vencem o atrito do Sled.' },
  9: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Atingir os 60 min contínuos em Zona 2 pura para lavar metabolitos do pico de sobrecarga de ontem.', avoidTrap: 'Não salte esta rodagem regenerativa: ela representa o alicerce de 80% da sua capacidade de recuperação entre estações.' },
  10: { pillar: 'ROXZONE_MARGINAL', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Superar a destruição ácida do Sled Push + Burpee Broad Jump mantendo cadência rápida (175+ spm) no 1km seguinte.', avoidTrap: 'Não dê saltos máximos nos Burpees; use passo largo junto às mãos e poupe os flexores da anca para correr.' },
  11: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Sustentar 30 minutos de EMOM nos ergómetros em limiar aeróbico controlado com respiração ritmada.', avoidTrap: 'Se a FC matinal subiu +5 a +10 bpm hoje, reduza imediatamente a intensidade para Zona 1-2.' },
  12: { pillar: 'PREVENTIVE_PACING', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Completar a Grande Simulação de 75% (6km + 6 estações) aplicando os 3 Passos nas 12 transições de Roxzone.', avoidTrap: 'Não tente bater recordes pessoais numa única estação isolada; proteja o tempo global do bloco.' },
  13: { pillar: 'RECOVERY_SUPERCOMP', bucket8020: 'RECOVERY', vital20Focus: 'Dissipação total da fadiga central do Microciclo 2 (o ponto mais duro dos 26 dias).', avoidTrap: 'Evite ficar longas horas em pé ou realizar atividades físicas recreativas desgastantes.' },
  14: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Sustentar os 3 blocos de 2.000m cravados no Goal Race Pace (GRP) com economia biomecânica máxima.', avoidTrap: 'Não force além do limiar anaeróbico; o objetivo hoje é eficiência mecânica no ritmo exato de prova.' },
  15: { pillar: 'STRENGTH_FLOOR', bucket8020: 'SUPPORT_20_STRENGTH', vital20Focus: 'Executar 3x5 a 80% 1RM com velocidade concêntrica máxima e cortar 25% do volume excêntrico.', avoidTrap: 'Proibido fazer descidas lentas (tempo excêntrico longo) ou repetições extras que gerem microlesões.' },
  16: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Oxigenar a musculatura em 45 min de Zona 2 leve e libertar anca/tornozelo para a fase de polimento.', avoidTrap: 'Não transforme a rodagem leve num teste de ritmo; guarde o sistema nervoso para amanhã.' },
  17: { pillar: 'ROXZONE_MARGINAL', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Executar as 5 rondas de transição ultra-rápida (400m + Estação) em menos de 5 segundos entre estação e trote.', avoidTrap: 'Zero paragens para beber água parado ou limpar suor durante as 5 passagens de Roxzone.' },
  18: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Calibrar o ritmo exato dos primeiros 300m de SkiErg e Rowing da prova sem elevar o lactato.', avoidTrap: 'Não acumule fadiga de preensão manual (grip) a 7 dias do simulado.' },
  19: { pillar: 'PREVENTIVE_PACING', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Ensaiar a sequência final (Farmer\'s Carry + Sandbag Lunges + Wall Balls) com o seu plano exato de quebra de séries.', avoidTrap: 'Não pouse a sandbag no chão em hipótese alguma e não faça a 1.ª série de Wall Balls acima do planeado.' },
  20: { pillar: 'RECOVERY_SUPERCOMP', bucket8020: 'RECOVERY', vital20Focus: 'Encerrar o bloco de carga e iniciar a janela de supercompensação fisiológica para a semana da prova.', avoidTrap: 'Não reduza a ingestão calórica apesar da redução do volume de treino no Tapering.' },
  21: { pillar: 'STRENGTH_FLOOR', bucket8020: 'SUPPORT_20_STRENGTH', vital20Focus: 'Ativação neural pura (3x6 a ~55-60% 1RM) e 2 pushes curtos de 12,5m apenas para manter recrutamento motor.', avoidTrap: 'Proibido aumentar cargas hoje mesmo sentindo-se forte; zero dano muscular na semana do simulado!' },
  22: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Sentir o ritmo de prova (GRP) leve e fácil nos 4x 800m graças à dissipação da fadiga acumulada.', avoidTrap: 'Não corra os 800m mais rápido que o GRP; poupe o glicogénio muscular.' },
  23: { pillar: 'ROXZONE_MARGINAL', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Polir a memória motora das 8 estações em estímulos curtos de 30s sem acumular ácido lático.', avoidTrap: 'Pare imediatamente aos 30 segundos de cada minuto do EMOM.' },
  24: { pillar: 'RECOVERY_SUPERCOMP', bucket8020: 'RECOVERY', vital20Focus: 'Iniciar o Carb-Loading (6 a 8 g/kg de hidratos limpos) para saturar 100% do glicogénio muscular e hepático.', avoidTrap: 'Corte fibras insolúveis (leguminosas, brócolos) e gorduras pesadas nas últimas 48h.' },
  25: { pillar: 'AEROBIC_ENGINE', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Desbloquear a reatividade tendinosa em 15 min de trote Zona 1 + 3 retas fluidas de 80m.', avoidTrap: 'Não teste suplementos, géis ou sapatilhas novas na véspera do simulado.' },
  26: { pillar: 'PREVENTIVE_PACING', bucket8020: 'PRIMARY_80_AEROBIC', vital20Focus: 'Executar os 4 Pilares de Pareto: Corrida 1 a +15s/km (anti-fade), trenós constantes, 3 Passos nas 16 Roxzones e quebra preventiva nos Wall Balls.', avoidTrap: 'Não queime a largada por adrenalina no 1.º km nem vá até à falha concêntrica nas estações 7 e 8!' }
};

const safeGetItem = (key, fallback = null) => {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch (_err) {
    return fallback;
  }
};

const safeGetJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch (_err) {
    return fallback;
  }
};

const safeSetItem = (key, val) => {
  try {
    localStorage.setItem(key, val);
  } catch (_err) {
    // Ignore quota or private-browsing storage errors
  }
};

// ==========================================
// MOTOR DE ZONAS DE CORRIDA (Z1 A Z5) & CONVERSÃO BIDIRECIONAL (KM/H <-> MIN/KM)
// ==========================================

const RUNNING_ZONES_META = {
  Z1: {
    id: 'Z1',
    shortLabel: 'Zona 1 (Regen.)',
    name: 'Z1 • Recuperação & Aquecimento',
    hrPct: '55–65% FCmáx',
    ratioToGRP: 0.78,
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    textClass: 'text-sky-400',
    hex: '#38bdf8'
  },
  Z2: {
    id: 'Z2',
    shortLabel: 'Zona 2 (Base Aeróbica)',
    name: 'Z2 • Base Mitocondrial Nasal',
    hrPct: '65–75% FCmáx',
    ratioToGRP: 0.89,
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    textClass: 'text-emerald-400',
    hex: '#34d399'
  },
  Z3: {
    id: 'Z3',
    shortLabel: 'Zona 3 (Ritmo GRP)',
    name: 'Z3 • Goal Race Pace (Prova HYROX)',
    hrPct: '75–82% FCmáx',
    ratioToGRP: 1.00,
    badgeClass: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/50',
    textClass: 'text-yellow-400',
    hex: '#facc15'
  },
  Z4: {
    id: 'Z4',
    shortLabel: 'Zona 4 (Limiar / Comp.)',
    name: 'Z4 • Limiar Anaeróbico & Compromised',
    hrPct: '82–89% FCmáx',
    ratioToGRP: 1.05,
    badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    textClass: 'text-orange-400',
    hex: '#fb923c'
  },
  Z5: {
    id: 'Z5',
    shortLabel: 'Zona 5 (VO2máx)',
    name: 'Z5 • Potência Aeróbica / Intervalos',
    hrPct: '90–98% FCmáx',
    ratioToGRP: 1.12,
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    textClass: 'text-rose-400',
    hex: '#f43f5e'
  }
};

const paceStrToSeconds = (paceStr, fallbackSec = 285) => {
  if (typeof paceStr !== 'string' || !paceStr.includes(':')) return fallbackSec;
  const parts = paceStr.trim().split(':');
  const m = parseInt(parts[0], 10);
  const s = parseInt(parts[1], 10);
  if (isNaN(m) || isNaN(s) || m < 2 || m > 18 || s < 0 || s >= 60) return fallbackSec;
  return m * 60 + s;
};

const secondsToPaceStr = (totalSec) => {
  const safe = Math.max(120, Math.min(1080, Math.round(Number(totalSec) || 285)));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const paceSecToKmh = (paceSec) => {
  const safe = Math.max(120, Math.min(1080, Number(paceSec) || 285));
  return Math.round((3600 / safe) * 10) / 10;
};

const kmhToPaceSec = (kmh) => {
  const safeKmh = Math.max(3.5, Math.min(25, parseFloat(kmh) || 12.6));
  return Math.round(3600 / safeKmh);
};

const kmhToPaceStr = (kmh) => secondsToPaceStr(kmhToPaceSec(kmh));

const buildDefaultRunningZonesKmh = (grpPaceStr = '04:45') => {
  const grpSec = paceStrToSeconds(grpPaceStr, 285);
  const grpKmh = paceSecToKmh(grpSec);
  return {
    Z1: Math.round(grpKmh * RUNNING_ZONES_META.Z1.ratioToGRP * 10) / 10,
    Z2: Math.round(grpKmh * RUNNING_ZONES_META.Z2.ratioToGRP * 10) / 10,
    Z3: grpKmh,
    Z4: Math.round(grpKmh * RUNNING_ZONES_META.Z4.ratioToGRP * 10) / 10,
    Z5: Math.round(grpKmh * RUNNING_ZONES_META.Z5.ratioToGRP * 10) / 10
  };
};

const getDayPrescribedZoneKey = (day) => {
  if (!day || day.category === 'REST') return 'REST';
  if (day.dayNum === 25) return 'Z1'; // Shakeout véspera Zona 1
  if (day.category === 'AEROBIC') return 'Z2';
  if (day.category === 'SPEED') {
    if (day.dayNum === 7) return 'Z5'; // 6x1000m VO2máx
    if (day.dayNum === 14) return 'Z4'; // 3x2000m Limiar
    return 'Z3'; // Dia 22 4x800m GRP
  }
  if (day.category === 'COMPROMISED') return 'Z4';
  if (day.category === 'SIMULATION' || day.category === 'RACE_DAY') return 'Z3';
  if (day.category === 'ERG_CAPACITY') return 'Z2';
  if (day.category === 'STRENGTH') return 'Z2';
  return 'Z3';
};

const getDayPlannedRunDistanceKm = (day) => {
  if (!day || day.category === 'REST') return 0;
  const distByDay = {
    1: 1.5, 2: 9.0, 3: 4.8, 4: 4.0, 5: 4.0, 6: 0,
    7: 7.5, 8: 1.5, 9: 11.0, 10: 5.0, 11: 4.5, 12: 6.0, 13: 0,
    14: 7.5, 15: 1.2, 16: 8.0, 17: 3.2, 18: 3.0, 19: 3.5, 20: 0,
    21: 1.0, 22: 4.5, 23: 2.0, 24: 0, 25: 3.0, 26: 8.0
  };
  return distByDay[day.dayNum] !== undefined ? distByDay[day.dayNum] : 4.0;
};

// Motor Analítico de Cálculo de Métricas e Radar 5D para qualquer Aluno/Atleta guardado no Banco de Dados (Feature 006)
const computeRecordSummaryMetrics = (record) => {
  if (!record || typeof record !== 'object') {
    return {
      doneCount: 0,
      progressPct: 0,
      loggedLoadUnits: 0,
      confirmedDistanceKm: 0,
      avgConfirmedSpeedKmh: 12.6,
      avgConfirmedPaceStr: '04:45',
      grpSpeedKmh: 12.6,
      grpPaceStr: '04:45',
      totalRoxzoneSec: 352,
      avg1RMKg: 80,
      relativeBackSquat: 1.4,
      radar: { strength: 70, endurance: 70, mobility: 70, power: 70, speed: 70, overall: 70 }
    };
  }
  const weight = Math.max(35, Math.min(200, parseFloat(record.athleteWeight) || 75));
  const paceStr = typeof record.goalPace === 'string' && record.goalPace.includes(':') ? record.goalPace : '04:45';
  const zones = record.runningZonesKmh && typeof record.runningZonesKmh === 'object'
    ? record.runningZonesKmh
    : buildDefaultRunningZonesKmh(paceStr);
  const completed = record.completedDays && typeof record.completedDays === 'object' ? record.completedDays : {};
  const logs = record.dayLogs && typeof record.dayLogs === 'object' ? record.dayLogs : {};
  const rms = record.oneRMs && typeof record.oneRMs === 'object' ? record.oneRMs : {};
  const roxSec = Math.max(12, Math.min(60, parseInt(record.roxzoneTargetSec, 10) || 22));
  const fracKey = ['SAFE_80_20', 'BALANCED_PARETO', 'ELITE_DENSITY'].includes(record.fractionationProfile)
    ? record.fractionationProfile
    : 'BALANCED_PARETO';

  const doneCount = Object.values(completed).filter(Boolean).length;
  const progressPct = Math.round((doneCount / WORKOUT_DAYS.length) * 100);

  let loggedLoadUnits = 0;
  let confirmedDistanceKm = 0;
  let speedSum = 0;
  let speedCount = 0;

  WORKOUT_DAYS.forEach((d) => {
    const isDone = Boolean(completed[d.dayNum]);
    const log = logs[d.dayNum] || {};
    const hasLog = log.rpe !== undefined || log.duration !== undefined || log.usedSpeedKmh !== undefined || log.distanceKm !== undefined;
    const isConfirmed = isDone || hasLog;
    if (isConfirmed) {
      const rpe = log.rpe !== undefined ? Number(log.rpe) : (d.loadIndex === 0 ? 0 : d.loadIndex + 9);
      const dur = log.duration !== undefined ? Number(log.duration) : d.durationMin;
      loggedLoadUnits += Math.round(rpe * dur);
      const dist = log.distanceKm !== undefined ? Number(log.distanceKm) : getDayPlannedRunDistanceKm(d);
      confirmedDistanceKm += dist;
      const zKey = log.usedZone || getDayPrescribedZoneKey(d);
      const spd = log.usedSpeedKmh !== undefined
        ? Number(log.usedSpeedKmh)
        : (zKey !== 'REST' ? (zones[zKey] || zones.Z3 || 12.6) : 0);
      if (spd > 0 && d.category !== 'REST') {
        speedSum += spd;
        speedCount += 1;
      }
    }
  });

  const grpSpeedKmh = Number(zones.Z3) || paceSecToKmh(paceStrToSeconds(paceStr, 285));
  const avgConfirmedSpeedKmh = speedCount > 0 ? Math.round((speedSum / speedCount) * 10) / 10 : grpSpeedKmh;
  const avgConfirmedPaceStr = kmhToPaceStr(avgConfirmedSpeedKmh);

  const bs = Number(rms.backSquat) || 110;
  const dl = Number(rms.trapBarDeadlift) || 140;
  const rdl = Number(rms.rdl) || 100;
  const pp = Number(rms.dbPushPress) || 24;
  const lunge = Number(rms.barbellWalkingLunges) || 60;
  const bss = Number(rms.bulgarianSplitSquat) || 60;

  const strengthRatio = (bs / (weight * 1.65) + dl / (weight * 2.05) + rdl / (weight * 1.45)) / 3;
  const strengthScore = Math.min(100, Math.max(35, Math.round(strengthRatio * 82)));

  const grpSec = paceStrToSeconds(paceStr, 285);
  const paceScore = Math.min(100, Math.max(40, Math.round(((375 - grpSec) / (375 - 220)) * 60 + 40)));
  const z2SpeedBonus = Math.min(12, Math.max(-8, Math.round(((Number(zones.Z2) || 11.0) - 10.5) * 2.5)));
  const enduranceScore = Math.min(100, Math.max(40, Math.round(paceScore * 0.75 + (progressPct * 0.25) + 12 + z2SpeedBonus)));

  const roxScore = Math.min(100, Math.max(40, Math.round(((45 - roxSec) / (45 - 15)) * 55 + 45)));
  const unilateralRatio = ((lunge + bss) / 2) / (weight * 0.9);
  const mobilityScore = Math.min(100, Math.max(42, Math.round(roxScore * 0.55 + Math.min(100, unilateralRatio * 80) * 0.45)));

  const powerRatio = (pp * 2) / (weight * 0.72) * 0.5 + (dl / (weight * 2.0)) * 0.5;
  const fracBonus = fracKey === 'ELITE_DENSITY' ? 8 : fracKey === 'BALANCED_PARETO' ? 4 : 0;
  const powerScore = Math.min(100, Math.max(40, Math.round(powerRatio * 78 + fracBonus)));

  const z4z5Bonus = Math.min(14, Math.max(-8, Math.round((((Number(zones.Z4) || 13.3) + (Number(zones.Z5) || 14.0)) / 2 - 13.0) * 3)));
  const speedScore = Math.min(100, Math.max(40, Math.round(paceScore * 0.72 + roxScore * 0.28 + z4z5Bonus)));
  const overall = Math.round((strengthScore + enduranceScore + mobilityScore + powerScore + speedScore) / 5);

  const rmValues = Object.values(STRENGTH_EXERCISES).map((ex) => Number(rms[ex.id]) || ex.default1RM);
  const avg1RMKg = Math.round((rmValues.reduce((a, b) => a + b, 0) / rmValues.length) * 10) / 10;

  return {
    doneCount,
    progressPct,
    loggedLoadUnits,
    confirmedDistanceKm: Math.round(confirmedDistanceKm * 10) / 10,
    avgConfirmedSpeedKmh,
    avgConfirmedPaceStr,
    grpSpeedKmh,
    grpPaceStr: paceStr,
    totalRoxzoneSec: roxSec * 16,
    avg1RMKg,
    relativeBackSquat: Math.round((bs / weight) * 100) / 100,
    radar: {
      strength: strengthScore,
      endurance: enduranceScore,
      mobility: mobilityScore,
      power: powerScore,
      speed: speedScore,
      overall
    }
  };
};

function App() {
  // Estados principais com persistência segura em localStorage
  const [selectedDayNum, setSelectedDayNum] = useState(() => {
    const saved = safeGetItem('hyrox_selected_day', null);
    const num = saved ? parseInt(saved, 10) : 1;
    return !isNaN(num) && num >= 1 && num <= 26 ? num : 1;
  });

  const [divisionKey, setDivisionKey] = useState(() => {
    const saved = safeGetItem('hyrox_division', 'MEN_OPEN');
    return DIVISIONS[saved] ? saved : 'MEN_OPEN';
  });

  const [athleteWeight, setAthleteWeight] = useState(() => {
    const saved = safeGetItem('hyrox_weight', null);
    const num = saved ? parseFloat(saved) : 75;
    return !isNaN(num) && num >= 35 && num <= 200 ? num : 75;
  });

  const [goalPace, setGoalPace] = useState(() => {
    return safeGetItem('hyrox_pace', '04:45') || '04:45';
  });

  // Matriz Editável das 5 Zonas de Corrida (Velocidade em km/h <-> Pace em min/km) sincronizada em toda a aplicação
  const [runningZonesKmh, setRunningZonesKmh] = useState(() => {
    const initialPace = safeGetItem('hyrox_pace', '04:45') || '04:45';
    const defaults = buildDefaultRunningZonesKmh(initialPace);
    const saved = safeGetJSON('hyrox_running_zones_kmh', null);
    if (saved && typeof saved === 'object') {
      return {
        Z1: Math.max(4, Math.min(25, parseFloat(saved.Z1) || defaults.Z1)),
        Z2: Math.max(4, Math.min(25, parseFloat(saved.Z2) || defaults.Z2)),
        Z3: Math.max(4, Math.min(25, parseFloat(saved.Z3) || defaults.Z3)),
        Z4: Math.max(4, Math.min(25, parseFloat(saved.Z4) || defaults.Z4)),
        Z5: Math.max(4, Math.min(25, parseFloat(saved.Z5) || defaults.Z5))
      };
    }
    return defaults;
  });

  const [completedDays, setCompletedDays] = useState(() => {
    return safeGetJSON('hyrox_completed_days', {});
  });

  const [dayLogs, setDayLogs] = useState(() => {
    return safeGetJSON('hyrox_day_logs', {});
  });

  // Escopo de Fidelidade dos 7 Gráficos: 'CONFIRMED_ONLY' (100% apenas dados salvos/confirmados) ou 'ALL_WITH_PLANNED' (Confirmados + Planeado)
  const [analyticsScope, setAnalyticsScope] = useState(() => {
    const saved = safeGetItem('hyrox_analytics_scope', 'ALL_WITH_PLANNED');
    return ['CONFIRMED_ONLY', 'ALL_WITH_PLANNED'].includes(saved) ? saved : 'ALL_WITH_PLANNED';
  });

  const [saveConfirmBanner, setSaveConfirmBanner] = useState('');

  // Estado para os 1RM de Força do Atleta
  const [oneRMs, setOneRMs] = useState(() => {
    const defaults = {};
    Object.values(STRENGTH_EXERCISES).forEach((ex) => {
      defaults[ex.id] = ex.default1RM;
    });
    const saved = safeGetJSON('hyrox_one_rms', null);
    return saved ? { ...defaults, ...saved } : defaults;
  });

  // Estado para customização das percentagens de prescrição por exercício/bloco (ex: Front Squat 70% do Back Squat)
  const [customPcts, setCustomPcts] = useState(() => {
    const defaults = {
      'backSquat_d1': 0.775,
      'frontSquat_d1': 0.70, // 70% explicitamente conforme solicitado
      'rdl_d1': 0.725,
      'bulgarianSplitSquat_d8': 0.775,
      'barbellWalkingLunges_d8': 0.725,
      'trapBarDeadlift_d15': 0.80,
      'backSquat_d15': 0.80,
      'gobletSquat_d21': 0.575,
      'dbPushPress_d21': 0.575,
      'bentOverRow_d21': 0.575
    };
    const saved = safeGetJSON('hyrox_custom_pcts', null);
    return saved ? { ...defaults, ...saved } : defaults;
  });

  // Estados do Motor Tático de Pareto 80/20 (Roxzone & Fracionamento Preventivo)
  const [roxzoneTargetSec, setRoxzoneTargetSec] = useState(() => {
    const saved = safeGetItem('hyrox_roxzone_sec', null);
    const parsed = parseInt(saved, 10);
    return !isNaN(parsed) ? Math.min(60, Math.max(12, parsed)) : 22;
  });

  const [fractionationProfile, setFractionationProfile] = useState(() => {
    const saved = safeGetItem('hyrox_fractionation_profile', 'BALANCED_PARETO');
    return ['SAFE_80_20', 'BALANCED_PARETO', 'ELITE_DENSITY'].includes(saved)
      ? saved
      : 'BALANCED_PARETO';
  });

  // Calculadora rápida de 1RM (Fórmula de Epley)
  const [calcWeight, setCalcWeight] = useState(100);
  const [calcReps, setCalcReps] = useState(5);
  const [calcTargetEx, setCalcTargetEx] = useState('backSquat');

  const [activeTab, setActiveTab] = useState('TODAY'); // TODAY, CALENDAR, STRENGTH_RM, LOAD, STRATEGY, NUTRITION, DATABASE

  // Banco de Dados de Alunos & Atletas + Histórico Comparativo Longitudinal (Feature 006)
  const [activeAthleteId, setActiveAthleteId] = useState(() => {
    return safeGetItem('hyrox_active_athlete_id', 'atleta-principal') || 'atleta-principal';
  });

  const [athletesDatabase, setAthletesDatabase] = useState(() => {
    const saved = safeGetJSON('hyrox_athletes_database_v1', null);
    if (Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    const defaultRMs = {};
    Object.values(STRENGTH_EXERCISES).forEach((ex) => {
      defaultRMs[ex.id] = ex.default1RM;
    });
    const benchRMs = {
      backSquat: 135,
      frontSquat: 105,
      trapBarDeadlift: 170,
      rdl: 125,
      bulgarianSplitSquat: 76,
      barbellWalkingLunges: 74,
      gobletSquat: 44,
      dbPushPress: 28,
      bentOverRow: 92
    };
    const nowIso = new Date().toISOString();
    return [
      {
        id: 'atleta-principal',
        name: 'Atleta Principal (Meu Perfil)',
        roleOrCategory: 'Atleta Titular • Ciclo 26 Dias',
        coachNotes: 'Perfil principal sincronizado automaticamente em tempo real.',
        recordType: 'ATHLETE',
        createdAt: nowIso,
        updatedAt: nowIso,
        divisionKey: safeGetItem('hyrox_division', 'MEN_OPEN') || 'MEN_OPEN',
        athleteWeight: parseFloat(safeGetItem('hyrox_weight', '75')) || 75,
        goalPace: safeGetItem('hyrox_pace', '04:45') || '04:45',
        runningZonesKmh: safeGetJSON('hyrox_running_zones_kmh', null) || buildDefaultRunningZonesKmh(safeGetItem('hyrox_pace', '04:45') || '04:45'),
        completedDays: safeGetJSON('hyrox_completed_days', {}),
        dayLogs: safeGetJSON('hyrox_day_logs', {}),
        oneRMs: safeGetJSON('hyrox_one_rms', null) ? { ...defaultRMs, ...safeGetJSON('hyrox_one_rms', null) } : defaultRMs,
        customPcts: safeGetJSON('hyrox_custom_pcts', {}),
        roxzoneTargetSec: parseInt(safeGetItem('hyrox_roxzone_sec', '22'), 10) || 22,
        fractionationProfile: safeGetItem('hyrox_fractionation_profile', 'BALANCED_PARETO') || 'BALANCED_PARETO'
      },
      {
        id: 'benchmark-hyrox-pro',
        name: 'Referência HYROX Sub-65m (Benchmark)',
        roleOrCategory: 'Benchmark Competitivo • Alvo Comparativo',
        coachNotes: 'Perfil de referência com zonas de corrida calibradas a 04:20/km (13.8 km/h) e força estabilizada para comparação lado a lado.',
        recordType: 'BENCHMARK',
        createdAt: nowIso,
        updatedAt: nowIso,
        divisionKey: 'MEN_OPEN',
        athleteWeight: 76,
        goalPace: '04:20',
        runningZonesKmh: buildDefaultRunningZonesKmh('04:20'),
        completedDays: { 1: true, 2: true, 3: true, 4: true, 5: true, 7: true, 8: true, 9: true },
        dayLogs: {
          1: { rpe: 7, duration: 70, usedZone: 'Z2', usedSpeedKmh: 12.1, usedPace: '04:58', distanceKm: 1.5, notes: 'Força sólida' },
          2: { rpe: 6, duration: 60, usedZone: 'Z2', usedSpeedKmh: 12.3, usedPace: '04:53', distanceKm: 9.0, notes: 'Aeróbio estável' },
          3: { rpe: 8, duration: 65, usedZone: 'Z3', usedSpeedKmh: 13.8, usedPace: '04:21', distanceKm: 4.8, notes: 'Compromised forte' },
          7: { rpe: 9, duration: 85, usedZone: 'Z3', usedSpeedKmh: 13.8, usedPace: '04:21', distanceKm: 7.5, notes: 'Simulação controlada' }
        },
        oneRMs: benchRMs,
        customPcts: {},
        roxzoneTargetSec: 18,
        fractionationProfile: 'ELITE_DENSITY'
      }
    ];
  });

  const [compareIdA, setCompareIdA] = useState('atleta-principal');
  const [compareIdB, setCompareIdB] = useState('benchmark-hyrox-pro');
  const [newAthleteName, setNewAthleteName] = useState('');
  const [newAthleteRole, setNewAthleteRole] = useState('Aluno / Atleta HYROX');
  const [newAthleteDivision, setNewAthleteDivision] = useState('MEN_OPEN');
  const [newAthleteWeight, setNewAthleteWeight] = useState(75);
  const [newAthletePace, setNewAthletePace] = useState('04:45');
  const [newAthleteStartClean, setNewAthleteStartClean] = useState(true);
  const [snapshotCustomLabel, setSnapshotCustomLabel] = useState('');
  const [dbBannerMsg, setDbBannerMsg] = useState('');

  // Estados Interativos da Suite de 7 Gráficos Analíticos & Pareto (Feature 003 - T002)
  const [evolutionMetric, setEvolutionMetric] = useState('SRPE'); // SRPE, STRENGTH_RM, PACE, SPEED_KMH
  const [compositionMode, setCompositionMode] = useState('MUSCLE_SETS'); // MUSCLE_SETS, HR_ZONES
  const [paretoMetric, setParetoMetric] = useState('FATIGUE'); // FATIGUE, TIME_LOSS
  const [hoveredDayNum, setHoveredDayNum] = useState(null);
  
  // Timer embutido para EMOMs / Transições + Screen Wake Lock Mobile (US2 - T009)
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const wakeLockRef = useRef(null);

  // Estados de Sincronização Web ↔ Mobile (Firebase Firestore REST & Backup JSON - US3 - T011/T012)
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncCode, setSyncCode] = useState(() => {
    return safeGetItem('hyrox_sync_code', 'hyrox-atleta-26d') || 'hyrox-atleta-26d';
  });
  const [firebaseProjectId, setFirebaseProjectId] = useState(() => {
    return safeGetItem('hyrox_firebase_project_id', 'hyrox-simulado-26d') || 'hyrox-simulado-26d';
  });
  const [syncStatus, setSyncStatus] = useState('LOCAL_ONLY'); // LOCAL_ONLY, SYNCING, SYNCED, ERROR
  const [syncMessage, setSyncMessage] = useState('');
  const [lastSyncedAt, setLastSyncedAt] = useState(() => {
    return safeGetItem('hyrox_last_synced_at', '') || '';
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    safeSetItem('hyrox_selected_day', selectedDayNum.toString());
  }, [selectedDayNum]);

  useEffect(() => {
    safeSetItem('hyrox_division', divisionKey);
  }, [divisionKey]);

  useEffect(() => {
    safeSetItem('hyrox_weight', athleteWeight.toString());
  }, [athleteWeight]);

  useEffect(() => {
    safeSetItem('hyrox_pace', goalPace);
  }, [goalPace]);

  useEffect(() => {
    safeSetItem('hyrox_running_zones_kmh', JSON.stringify(runningZonesKmh));
  }, [runningZonesKmh]);

  useEffect(() => {
    safeSetItem('hyrox_analytics_scope', analyticsScope);
  }, [analyticsScope]);

  useEffect(() => {
    safeSetItem('hyrox_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    safeSetItem('hyrox_day_logs', JSON.stringify(dayLogs));
  }, [dayLogs]);

  useEffect(() => {
    safeSetItem('hyrox_one_rms', JSON.stringify(oneRMs));
  }, [oneRMs]);

  useEffect(() => {
    safeSetItem('hyrox_custom_pcts', JSON.stringify(customPcts));
  }, [customPcts]);

  useEffect(() => {
    safeSetItem('hyrox_roxzone_sec', roxzoneTargetSec.toString());
  }, [roxzoneTargetSec]);

  useEffect(() => {
    safeSetItem('hyrox_fractionation_profile', fractionationProfile);
  }, [fractionationProfile]);

  useEffect(() => {
    safeSetItem('hyrox_sync_code', syncCode);
  }, [syncCode]);

  useEffect(() => {
    safeSetItem('hyrox_firebase_project_id', firebaseProjectId);
  }, [firebaseProjectId]);

  useEffect(() => {
    safeSetItem('hyrox_active_athlete_id', activeAthleteId);
  }, [activeAthleteId]);

  // Auto-Save Contínuo: mantém o registo do aluno/atleta ativo sempre atualizado dentro do Banco de Dados
  useEffect(() => {
    setAthletesDatabase((prevDb) => {
      if (!Array.isArray(prevDb) || prevDb.length === 0) return prevDb;
      const idx = prevDb.findIndex((item) => item.id === activeAthleteId);
      const updatedFields = {
        updatedAt: new Date().toISOString(),
        divisionKey,
        athleteWeight,
        goalPace,
        runningZonesKmh,
        completedDays,
        dayLogs,
        oneRMs,
        customPcts,
        roxzoneTargetSec,
        fractionationProfile
      };
      let nextDb;
      if (idx >= 0) {
        nextDb = prevDb.map((item, i) => (i === idx ? { ...item, ...updatedFields } : item));
      } else {
        nextDb = [
          {
            id: activeAthleteId || 'atleta-principal',
            name: 'Atleta Principal (Meu Perfil)',
            roleOrCategory: 'Atleta Titular • Ciclo 26 Dias',
            coachNotes: '',
            recordType: 'ATHLETE',
            createdAt: new Date().toISOString(),
            ...updatedFields
          },
          ...prevDb
        ];
      }
      safeSetItem('hyrox_athletes_database_v1', JSON.stringify(nextDb));
      return nextDb;
    });
  }, [
    activeAthleteId,
    divisionKey,
    athleteWeight,
    goalPace,
    runningZonesKmh,
    completedDays,
    dayLogs,
    oneRMs,
    customPcts,
    roxzoneTargetSec,
    fractionationProfile
  ]);

  const activeAthleteRecord = useMemo(() => {
    return athletesDatabase.find((a) => a.id === activeAthleteId) || athletesDatabase[0] || {
      id: 'atleta-principal',
      name: 'Atleta Principal',
      roleOrCategory: 'Atleta HYROX',
      coachNotes: ''
    };
  }, [athletesDatabase, activeAthleteId]);

  const handleSelectActiveAthlete = (targetId) => {
    const target = athletesDatabase.find((a) => a.id === targetId);
    if (!target) return;
    setActiveAthleteId(target.id);
    if (['WOMEN_OPEN', 'MEN_OPEN', 'WOMEN_PRO', 'MEN_PRO'].includes(target.divisionKey)) {
      setDivisionKey(target.divisionKey);
    }
    if (target.athleteWeight >= 35 && target.athleteWeight <= 200) {
      setAthleteWeight(Number(target.athleteWeight));
    }
    const safePace = typeof target.goalPace === 'string' && target.goalPace.includes(':') ? target.goalPace : '04:45';
    setGoalPace(safePace);
    setRunningZonesKmh(
      target.runningZonesKmh && typeof target.runningZonesKmh === 'object'
        ? { ...buildDefaultRunningZonesKmh(safePace), ...target.runningZonesKmh }
        : buildDefaultRunningZonesKmh(safePace)
    );
    setCompletedDays(target.completedDays && typeof target.completedDays === 'object' ? target.completedDays : {});
    setDayLogs(target.dayLogs && typeof target.dayLogs === 'object' ? target.dayLogs : {});
    if (target.oneRMs && typeof target.oneRMs === 'object') {
      const defaults = {};
      Object.values(STRENGTH_EXERCISES).forEach((ex) => { defaults[ex.id] = ex.default1RM; });
      setOneRMs({ ...defaults, ...target.oneRMs });
    }
    if (target.customPcts && typeof target.customPcts === 'object') {
      setCustomPcts((prev) => ({ ...prev, ...target.customPcts }));
    }
    if (target.roxzoneTargetSec >= 12 && target.roxzoneTargetSec <= 60) {
      setRoxzoneTargetSec(Number(target.roxzoneTargetSec));
    }
    if (['SAFE_80_20', 'BALANCED_PARETO', 'ELITE_DENSITY'].includes(target.fractionationProfile)) {
      setFractionationProfile(target.fractionationProfile);
    }
    setCompareIdA(target.id);
    setDbBannerMsg(`Perfil "${target.name}" carregado e sincronizado em todas as abas e gráficos!`);
    setTimeout(() => setDbBannerMsg(''), 4500);
  };

  const handleUpdateActiveAthleteMeta = (field, value) => {
    setAthletesDatabase((prevDb) => {
      const nextDb = prevDb.map((item) =>
        item.id === activeAthleteId
          ? { ...item, [field]: value, updatedAt: new Date().toISOString() }
          : item
      );
      safeSetItem('hyrox_athletes_database_v1', JSON.stringify(nextDb));
      return nextDb;
    });
  };

  const handleCreateNewAthlete = () => {
    const cleanName = String(newAthleteName || '').trim();
    if (!cleanName) {
      setDbBannerMsg('Por favor, indique o nome do Aluno ou Atleta para registar no Banco de Dados.');
      setTimeout(() => setDbBannerMsg(''), 4000);
      return;
    }
    const newId = `aluno-${Date.now()}`;
    const safePace = typeof newAthletePace === 'string' && /^\d{1,2}:\d{2}$/.test(newAthletePace.trim())
      ? newAthletePace.trim()
      : '04:45';
    const safeW = Math.max(35, Math.min(200, parseFloat(newAthleteWeight) || 75));
    const safeDiv = DIVISIONS[newAthleteDivision] ? newAthleteDivision : 'MEN_OPEN';
    const defaultRMs = {};
    Object.values(STRENGTH_EXERCISES).forEach((ex) => {
      defaultRMs[ex.id] = ex.default1RM;
    });
    const nowIso = new Date().toISOString();
    const newRecord = {
      id: newId,
      name: cleanName,
      roleOrCategory: String(newAthleteRole || 'Aluno / Atleta HYROX').trim(),
      coachNotes: 'Registo criado no Banco de Dados de Alunos & Atletas.',
      recordType: 'ATHLETE',
      createdAt: nowIso,
      updatedAt: nowIso,
      divisionKey: safeDiv,
      athleteWeight: safeW,
      goalPace: safePace,
      runningZonesKmh: newAthleteStartClean ? buildDefaultRunningZonesKmh(safePace) : { ...runningZonesKmh },
      completedDays: newAthleteStartClean ? {} : { ...completedDays },
      dayLogs: newAthleteStartClean ? {} : { ...dayLogs },
      oneRMs: newAthleteStartClean ? defaultRMs : { ...oneRMs },
      customPcts: { ...customPcts },
      roxzoneTargetSec: newAthleteStartClean ? 22 : roxzoneTargetSec,
      fractionationProfile: newAthleteStartClean ? 'BALANCED_PARETO' : fractionationProfile
    };
    const nextDb = [newRecord, ...athletesDatabase];
    setAthletesDatabase(nextDb);
    safeSetItem('hyrox_athletes_database_v1', JSON.stringify(nextDb));
    setNewAthleteName('');
    setCompareIdB(activeAthleteId);
    setCompareIdA(newId);
    // Ativa o novo aluno imediatamente
    setActiveAthleteId(newId);
    setDivisionKey(newRecord.divisionKey);
    setAthleteWeight(newRecord.athleteWeight);
    setGoalPace(newRecord.goalPace);
    setRunningZonesKmh(newRecord.runningZonesKmh);
    setCompletedDays(newRecord.completedDays);
    setDayLogs(newRecord.dayLogs);
    setOneRMs(newRecord.oneRMs);
    setRoxzoneTargetSec(newRecord.roxzoneTargetSec);
    setFractionationProfile(newRecord.fractionationProfile);
    setDbBannerMsg(`Aluno/Atleta "${cleanName}" guardado no Banco de Dados e ativado!`);
    setTimeout(() => setDbBannerMsg(''), 4500);
  };

  const handleSaveHistoricalSnapshot = () => {
    const now = new Date();
    const dateTag = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const customTag = String(snapshotCustomLabel || '').trim() || `Snapshot Dia ${selectedDayNum} (${dateTag})`;
    const snapId = `snap-${Date.now()}`;
    const snapRecord = {
      id: snapId,
      name: `${activeAthleteRecord.name} • [${customTag}]`,
      roleOrCategory: `Snapshot Histórico • ${DIVISIONS[divisionKey]?.name || divisionKey}`,
      coachNotes: `Fotografia longitudinal guardada em ${dateTag} com ${Object.values(completedDays).filter(Boolean).length}/26 dias concluídos.`,
      recordType: 'SNAPSHOT',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      divisionKey,
      athleteWeight,
      goalPace,
      runningZonesKmh: { ...runningZonesKmh },
      completedDays: { ...completedDays },
      dayLogs: JSON.parse(JSON.stringify(dayLogs || {})),
      oneRMs: { ...oneRMs },
      customPcts: { ...customPcts },
      roxzoneTargetSec,
      fractionationProfile
    };
    const nextDb = [snapRecord, ...athletesDatabase];
    setAthletesDatabase(nextDb);
    safeSetItem('hyrox_athletes_database_v1', JSON.stringify(nextDb));
    setSnapshotCustomLabel('');
    setCompareIdA(activeAthleteId);
    setCompareIdB(snapId);
    setDbBannerMsg(`Snapshot "${snapRecord.name}" guardado no Banco de Dados e selecionado como Perfil B na comparação!`);
    setTimeout(() => setDbBannerMsg(''), 4500);
  };

  const handleDeleteAthleteRecord = (targetId) => {
    if (athletesDatabase.length <= 1) {
      setDbBannerMsg('O Banco de Dados deve manter pelo menos 1 perfil ativo.');
      setTimeout(() => setDbBannerMsg(''), 3500);
      return;
    }
    const target = athletesDatabase.find((a) => a.id === targetId);
    const nextDb = athletesDatabase.filter((a) => a.id !== targetId);
    setAthletesDatabase(nextDb);
    safeSetItem('hyrox_athletes_database_v1', JSON.stringify(nextDb));
    if (targetId === activeAthleteId && nextDb[0]) {
      handleSelectActiveAthlete(nextDb[0].id);
    }
    if (targetId === compareIdA && nextDb[0]) {
      setCompareIdA(nextDb[0].id);
    }
    if (targetId === compareIdB && nextDb[0]) {
      setCompareIdB((nextDb[1] || nextDb[0]).id);
    }
    setDbBannerMsg(`Registo "${target ? target.name : targetId}" removido do Banco de Dados.`);
    setTimeout(() => setDbBannerMsg(''), 3500);
  };

  const sanitizeSyncCode = (raw) => {
    const cleaned = String(raw || '').trim().replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 40);
    return cleaned.length >= 3 ? cleaned : 'hyrox-atleta-26d';
  };

  const buildAthleteSyncSnapshot = (overrideCode) => {
    const cleanCode = sanitizeSyncCode(overrideCode || syncCode);
    const safePace = (typeof goalPace === 'string' && goalPace.length >= 4 && goalPace.length <= 8)
      ? goalPace
      : '04:45';
    return {
      schemaVersion: 1,
      syncCode: cleanCode,
      updatedAt: new Date().toISOString(),
      selectedDayNum: Math.min(26, Math.max(1, parseInt(selectedDayNum, 10) || 1)),
      divisionKey: ['WOMEN_OPEN', 'MEN_OPEN', 'WOMEN_PRO', 'MEN_PRO'].includes(divisionKey) ? divisionKey : 'MEN_OPEN',
      athleteWeight: Math.min(200, Math.max(35, parseFloat(athleteWeight) || 75)),
      goalPace: safePace,
      runningZonesKmh: runningZonesKmh || buildDefaultRunningZonesKmh(safePace),
      analyticsScope: ['CONFIRMED_ONLY', 'ALL_WITH_PLANNED'].includes(analyticsScope) ? analyticsScope : 'ALL_WITH_PLANNED',
      completedDays: completedDays || {},
      dayLogs: dayLogs || {},
      oneRMs: oneRMs || {},
      customPcts: customPcts || {},
      roxzoneTargetSec: Math.min(60, Math.max(12, parseInt(roxzoneTargetSec, 10) || 22)),
      fractionationProfile: ['SAFE_80_20', 'BALANCED_PARETO', 'ELITE_DENSITY'].includes(fractionationProfile)
        ? fractionationProfile
        : 'BALANCED_PARETO',
      activeAthleteId: activeAthleteId || 'atleta-principal',
      athletesDatabase: Array.isArray(athletesDatabase) ? athletesDatabase : [],
      deviceLabel: (typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent : 'HYROX PWA').slice(0, 75)
    };
  };

  const applyAthleteSyncSnapshot = (snapshot) => {
    if (!snapshot || Number(snapshot.schemaVersion) !== 1) {
      throw new Error('Formato de snapshot inválido (schemaVersion !== 1).');
    }
    if (Array.isArray(snapshot.athletesDatabase) && snapshot.athletesDatabase.length > 0) {
      setAthletesDatabase(snapshot.athletesDatabase);
      safeSetItem('hyrox_athletes_database_v1', JSON.stringify(snapshot.athletesDatabase));
    }
    if (typeof snapshot.activeAthleteId === 'string' && snapshot.activeAthleteId) {
      setActiveAthleteId(snapshot.activeAthleteId);
      safeSetItem('hyrox_active_athlete_id', snapshot.activeAthleteId);
    }
    if (snapshot.selectedDayNum >= 1 && snapshot.selectedDayNum <= 26) {
      setSelectedDayNum(Number(snapshot.selectedDayNum));
    }
    if (['WOMEN_OPEN', 'MEN_OPEN', 'WOMEN_PRO', 'MEN_PRO'].includes(snapshot.divisionKey)) {
      setDivisionKey(snapshot.divisionKey);
    }
    if (snapshot.athleteWeight >= 35 && snapshot.athleteWeight <= 200) {
      setAthleteWeight(Number(snapshot.athleteWeight));
    }
    if (typeof snapshot.goalPace === 'string' && snapshot.goalPace.includes(':')) {
      setGoalPace(snapshot.goalPace);
    }
    if (snapshot.runningZonesKmh && typeof snapshot.runningZonesKmh === 'object') {
      setRunningZonesKmh((prev) => ({
        ...prev,
        Z1: Math.max(4, Math.min(25, parseFloat(snapshot.runningZonesKmh.Z1) || prev.Z1)),
        Z2: Math.max(4, Math.min(25, parseFloat(snapshot.runningZonesKmh.Z2) || prev.Z2)),
        Z3: Math.max(4, Math.min(25, parseFloat(snapshot.runningZonesKmh.Z3) || prev.Z3)),
        Z4: Math.max(4, Math.min(25, parseFloat(snapshot.runningZonesKmh.Z4) || prev.Z4)),
        Z5: Math.max(4, Math.min(25, parseFloat(snapshot.runningZonesKmh.Z5) || prev.Z5))
      }));
    }
    if (['CONFIRMED_ONLY', 'ALL_WITH_PLANNED'].includes(snapshot.analyticsScope)) {
      setAnalyticsScope(snapshot.analyticsScope);
    }
    if (snapshot.completedDays && typeof snapshot.completedDays === 'object') {
      setCompletedDays(snapshot.completedDays);
    }
    if (snapshot.dayLogs && typeof snapshot.dayLogs === 'object') {
      setDayLogs(snapshot.dayLogs);
    }
    if (snapshot.oneRMs && typeof snapshot.oneRMs === 'object') {
      setOneRMs((prev) => ({ ...prev, ...snapshot.oneRMs }));
    }
    if (snapshot.customPcts && typeof snapshot.customPcts === 'object') {
      setCustomPcts((prev) => ({ ...prev, ...snapshot.customPcts }));
    }
    if (snapshot.roxzoneTargetSec >= 12 && snapshot.roxzoneTargetSec <= 60) {
      setRoxzoneTargetSec(Number(snapshot.roxzoneTargetSec));
    }
    if (['SAFE_80_20', 'BALANCED_PARETO', 'ELITE_DENSITY'].includes(snapshot.fractionationProfile)) {
      setFractionationProfile(snapshot.fractionationProfile);
    }
    const stamp = snapshot.updatedAt || new Date().toISOString();
    setLastSyncedAt(stamp);
    safeSetItem('hyrox_last_synced_at', stamp);
  };

  // Conversores JSON <-> Firestore REST API Value Format
  const toFirestoreValue = (val) => {
    if (val === null || val === undefined) return { nullValue: null };
    if (typeof val === 'boolean') return { booleanValue: val };
    if (typeof val === 'number') {
      return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
    }
    if (typeof val === 'string') return { stringValue: val };
    if (Array.isArray(val)) {
      return { arrayValue: { values: val.map(toFirestoreValue) } };
    }
    if (typeof val === 'object') {
      const fields = {};
      Object.entries(val).forEach(([k, v]) => {
        fields[k] = toFirestoreValue(v);
      });
      return { mapValue: { fields } };
    }
    return { stringValue: String(val) };
  };

  const fromFirestoreValue = (fv) => {
    if (!fv || typeof fv !== 'object') return null;
    if ('stringValue' in fv) return fv.stringValue;
    if ('integerValue' in fv) return parseInt(fv.integerValue, 10);
    if ('doubleValue' in fv) return parseFloat(fv.doubleValue);
    if ('booleanValue' in fv) return Boolean(fv.booleanValue);
    if ('nullValue' in fv) return null;
    if ('mapValue' in fv) {
      const out = {};
      const fields = (fv.mapValue && fv.mapValue.fields) || {};
      Object.entries(fields).forEach(([k, v]) => {
        out[k] = fromFirestoreValue(v);
      });
      return out;
    }
    if ('arrayValue' in fv) {
      const vals = (fv.arrayValue && fv.arrayValue.values) || [];
      return vals.map(fromFirestoreValue);
    }
    return null;
  };

  const pushToCloudFirestore = async () => {
    const cleanCode = sanitizeSyncCode(syncCode);
    const cleanProj = String(firebaseProjectId || '').trim();
    setSyncCode(cleanCode);
    if (!cleanProj) {
      setSyncStatus('ERROR');
      setSyncMessage('Indique o Firebase Project ID ou utilize a Exportação JSON direta.');
      return;
    }
    setSyncStatus('SYNCING');
    setSyncMessage('A enviar perfil e progresso para o Cloud Firestore...');
    try {
      const snapshot = buildAthleteSyncSnapshot(cleanCode);
      const firestoreDoc = toFirestoreValue(snapshot).mapValue;
      const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(cleanProj)}/databases/(default)/documents/hyrox_profiles/${encodeURIComponent(cleanCode)}`;
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(firestoreDoc)
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setLastSyncedAt(snapshot.updatedAt);
      safeSetItem('hyrox_last_synced_at', snapshot.updatedAt);
      setSyncStatus('SYNCED');
      setSyncMessage(`Sincronizado na nuvem com o código "${cleanCode}"!`);
    } catch (err) {
      setSyncStatus('ERROR');
      setSyncMessage(`Dados guardados localmente. Nuvem Firebase indisponível ou projeto "${cleanProj}" ainda não publicado (${err.message}). Use Exportar JSON abaixo se desejar transferir já.`);
    }
  };

  const pullFromCloudFirestore = async () => {
    const cleanCode = sanitizeSyncCode(syncCode);
    const cleanProj = String(firebaseProjectId || '').trim();
    setSyncCode(cleanCode);
    if (!cleanProj) {
      setSyncStatus('ERROR');
      setSyncMessage('Indique o Firebase Project ID ou importe um ficheiro JSON.');
      return;
    }
    setSyncStatus('SYNCING');
    setSyncMessage('A carregar progresso da nuvem...');
    try {
      const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(cleanProj)}/databases/(default)/documents/hyrox_profiles/${encodeURIComponent(cleanCode)}`;
      const res = await fetch(endpoint, { method: 'GET' });
      if (!res.ok) {
        throw new Error(res.status === 404 ? 'Código ainda não encontrado na nuvem' : `HTTP ${res.status}`);
      }
      const docJson = await res.json();
      const parsedSnapshot = fromFirestoreValue({ mapValue: { fields: docJson.fields || {} } });
      applyAthleteSyncSnapshot(parsedSnapshot);
      setSyncStatus('SYNCED');
      setSyncMessage(`Progresso restaurado com sucesso do código "${cleanCode}"!`);
    } catch (err) {
      setSyncStatus('ERROR');
      setSyncMessage(`Não foi possível carregar da nuvem (${err.message}). Os seus dados locais permanecem intactos.`);
    }
  };

  const handleExportBackupJson = () => {
    const cleanCode = sanitizeSyncCode(syncCode);
    const snapshot = buildAthleteSyncSnapshot(cleanCode);
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hyrox_26d_backup_${cleanCode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSyncStatus('SYNCED');
    setSyncMessage(`Ficheiro JSON (${a.download}) exportado! Envie para o seu telemóvel/PC e clique em Importar JSON.`);
  };

  const handleImportBackupJson = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(String(e.target.result || '{}'));
        applyAthleteSyncSnapshot(parsed);
        if (parsed.syncCode) setSyncCode(sanitizeSyncCode(parsed.syncCode));
        setSyncStatus('SYNCED');
        setSyncMessage('Backup JSON importado com sucesso! Todos os 1RMs, treinos e táticas foram atualizados.');
      } catch (err) {
        setSyncStatus('ERROR');
        setSyncMessage(`Erro ao importar JSON: ${err.message}`);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleOneRMChange = (exId, val) => {
    setOneRMs((prev) => ({
      ...prev,
      [exId]: Math.max(0, parseFloat(val) || 0)
    }));
  };

  const handlePctChange = (key, val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    setCustomPcts((prev) => ({
      ...prev,
      [key]: Math.min(1.0, Math.max(0.2, num / 100))
    }));
  };

  const estimatedEpley1RM = useMemo(() => {
    const w = parseFloat(calcWeight) || 0;
    const r = parseInt(calcReps, 10) || 1;
    if (r === 1) return Math.round(w);
    return Math.round(w * (1 + r / 30));
  }, [calcWeight, calcReps]);

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((s) => s + 1);
      }, 1000);
    } else if (!timerRunning && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Screen Wake Lock API para impedir desligamento do ecrã no ginásio durante o cronómetro (US2 - T009)
  useEffect(() => {
    let isCancelled = false;
    const requestWakeLock = async () => {
      if (timerRunning && typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
        try {
          const sentinel = await navigator.wakeLock.request('screen');
          if (!isCancelled) {
            wakeLockRef.current = sentinel;
            setWakeLockActive(true);
            sentinel.addEventListener('release', () => {
              setWakeLockActive(false);
            });
          } else {
            sentinel.release().catch(() => {});
          }
        } catch (_err) {
          setWakeLockActive(false);
        }
      } else if (!timerRunning && wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
        setWakeLockActive(false);
      }
    };
    requestWakeLock();
    return () => {
      isCancelled = true;
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, [timerRunning]);

  const currentWorkout = useMemo(() => {
    return WORKOUT_DAYS.find((d) => d.dayNum === selectedDayNum) || WORKOUT_DAYS[0];
  }, [selectedDayNum]);

  const currentMicrocycle = useMemo(() => {
    return MICROCYCLES.find((m) => m.id === currentWorkout.microcycle);
  }, [currentWorkout]);

  const currentDivision = DIVISIONS[divisionKey] || DIVISIONS.MEN_OPEN;

  const currentParetoDirective = useMemo(() => {
    const dir = PARETO_DAY_DIRECTIVES[currentWorkout.dayNum] || PARETO_DAY_DIRECTIVES[1];
    return {
      ...dir,
      meta: PARETO_PILLAR_META[dir.pillar] || PARETO_PILLAR_META.AEROBIC_ENGINE
    };
  }, [currentWorkout]);

  const activeFractionation = useMemo(() => {
    return FRACTIONATION_SCHEMES[fractionationProfile] || FRACTIONATION_SCHEMES.BALANCED_PARETO;
  }, [fractionationProfile]);

  // Funções auxiliares de cálculo de ritmo e formatação de tempo (declaradas antes dos useMemo)
  const formatTimer = (totalSec) => {
    const safeSec = Math.max(0, Math.round(Number(totalSec) || 0));
    const mins = Math.floor(safeSec / 60);
    const secs = safeSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'STRENGTH':
        return { label: 'Força & Trenós', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
      case 'AEROBIC':
        return { label: 'Zona 2 & Mobilidade', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
      case 'COMPROMISED':
        return { label: 'Compromised Running', bg: 'bg-rose-500/20 text-rose-400 border-rose-500/40' };
      case 'ERG_CAPACITY':
        return { label: 'Ergómetros & Core', bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' };
      case 'SIMULATION':
        return { label: 'Simulação HYROX', bg: 'bg-purple-500/20 text-purple-400 border-purple-500/40' };
      case 'SPEED':
        return { label: 'VO2máx & Limiar', bg: 'bg-orange-500/20 text-orange-400 border-orange-500/40' };
      case 'RACE_DAY':
        return { label: 'DIA DO SIMULADO', bg: 'bg-yellow-400 text-black font-bold border-yellow-300' };
      default:
        return { label: 'Descanso Absoluto', bg: 'bg-slate-700/50 text-slate-300 border-slate-600' };
    }
  };

  const calculateAdjustedPace = (basePaceStr, deltaSeconds) => {
    const safeStr = typeof basePaceStr === 'string' && basePaceStr.includes(':') ? basePaceStr : '04:45';
    const parts = safeStr.split(':');
    const m = parseInt(parts[0], 10);
    const s = parseInt(parts[1], 10);
    const baseSec = (!isNaN(m) && !isNaN(s) && m >= 2 && m <= 15 && s >= 0 && s < 60)
      ? m * 60 + s
      : 4 * 60 + 45;
    const totalSec = Math.max(120, baseSec + deltaSeconds);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Handlers de Sincronização Bidirecional de Pace (min/km) <-> Velocidade (km/h) para Zonas Z1-Z5 e GRP
  const handleGoalPaceChange = (newPaceStr) => {
    setGoalPace(newPaceStr);
    if (typeof newPaceStr === 'string' && /^\d{1,2}:\d{2}$/.test(newPaceStr.trim())) {
      const sec = paceStrToSeconds(newPaceStr.trim(), 285);
      const kmh = paceSecToKmh(sec);
      setRunningZonesKmh((prev) => ({
        ...prev,
        Z3: kmh
      }));
    }
  };

  const handleGoalSpeedKmhChange = (newKmhVal) => {
    const kmh = Math.max(4, Math.min(25, Math.round((parseFloat(newKmhVal) || 12.6) * 10) / 10));
    const paceStr = kmhToPaceStr(kmh);
    setGoalPace(paceStr);
    setRunningZonesKmh((prev) => ({
      ...prev,
      Z3: kmh
    }));
  };

  const handleZoneSpeedChange = (zoneId, newKmhVal) => {
    const kmh = Math.max(4, Math.min(25, Math.round((parseFloat(newKmhVal) || 10.0) * 10) / 10));
    setRunningZonesKmh((prev) => ({
      ...prev,
      [zoneId]: kmh
    }));
    if (zoneId === 'Z3') {
      setGoalPace(kmhToPaceStr(kmh));
    }
  };

  const handleZonePaceChange = (zoneId, newPaceStr) => {
    if (typeof newPaceStr === 'string' && newPaceStr.includes(':')) {
      const sec = paceStrToSeconds(newPaceStr, 285);
      const kmh = paceSecToKmh(sec);
      setRunningZonesKmh((prev) => ({
        ...prev,
        [zoneId]: kmh
      }));
      if (zoneId === 'Z3') {
        setGoalPace(secondsToPaceStr(sec));
      }
    }
  };

  const recalibrateAllZonesFromGRP = () => {
    const fresh = buildDefaultRunningZonesKmh(goalPace);
    setRunningZonesKmh(fresh);
  };

  const getDefaultDayRunningLog = (day) => {
    const targetDay = day || currentWorkout;
    const prescribedZone = getDayPrescribedZoneKey(targetDay);
    const zoneKmh = prescribedZone !== 'REST'
      ? (runningZonesKmh[prescribedZone] || runningZonesKmh.Z3 || 12.6)
      : 0;
    const plannedDist = getDayPlannedRunDistanceKm(targetDay);
    return {
      rpe: targetDay.loadIndex === 0 ? 6 : targetDay.loadIndex + 9,
      duration: targetDay.durationMin,
      morningHR: '',
      usedZone: prescribedZone === 'REST' ? 'Z1' : prescribedZone,
      usedSpeedKmh: zoneKmh > 0 ? zoneKmh : (runningZonesKmh.Z1 || 10.1),
      usedPace: zoneKmh > 0 ? kmhToPaceStr(zoneKmh) : kmhToPaceStr(runningZonesKmh.Z1 || 10.1),
      distanceKm: plannedDist,
      notes: ''
    };
  };

  const toggleDayCompletion = (dayNum) => {
    const targetDay = WORKOUT_DAYS.find((d) => d.dayNum === dayNum) || currentWorkout;
    setCompletedDays((prev) => {
      const nextCompleted = !prev[dayNum];
      if (nextCompleted) {
        setDayLogs((prevLogs) => {
          const existing = prevLogs[dayNum] || {};
          const defaults = getDefaultDayRunningLog(targetDay);
          return {
            ...prevLogs,
            [dayNum]: {
              ...defaults,
              ...existing,
              confirmedAt: new Date().toISOString()
            }
          };
        });
      }
      return {
        ...prev,
        [dayNum]: nextCompleted
      };
    });
  };

  const handleLogChange = (dayNum, field, value) => {
    const targetDay = WORKOUT_DAYS.find((d) => d.dayNum === dayNum) || currentWorkout;
    setDayLogs((prev) => {
      const base = prev[dayNum] || getDefaultDayRunningLog(targetDay);
      return {
        ...prev,
        [dayNum]: {
          ...base,
          [field]: value
        }
      };
    });
  };

  const handleDayZoneChange = (dayNum, zoneId) => {
    const targetDay = WORKOUT_DAYS.find((d) => d.dayNum === dayNum) || currentWorkout;
    const zoneKmh = runningZonesKmh[zoneId] || runningZonesKmh.Z3 || 12.6;
    const paceStr = kmhToPaceStr(zoneKmh);
    setDayLogs((prev) => {
      const base = prev[dayNum] || getDefaultDayRunningLog(targetDay);
      return {
        ...prev,
        [dayNum]: {
          ...base,
          usedZone: zoneId,
          usedSpeedKmh: zoneKmh,
          usedPace: paceStr
        }
      };
    });
  };

  const handleDaySpeedKmhChange = (dayNum, kmhVal) => {
    const targetDay = WORKOUT_DAYS.find((d) => d.dayNum === dayNum) || currentWorkout;
    const numKmh = Math.max(3.5, Math.min(25, Math.round((parseFloat(kmhVal) || 10.0) * 10) / 10));
    const paceStr = kmhToPaceStr(numKmh);
    setDayLogs((prev) => {
      const base = prev[dayNum] || getDefaultDayRunningLog(targetDay);
      return {
        ...prev,
        [dayNum]: {
          ...base,
          usedSpeedKmh: numKmh,
          usedPace: paceStr
        }
      };
    });
  };

  const handleDayPaceChange = (dayNum, paceStr) => {
    const targetDay = WORKOUT_DAYS.find((d) => d.dayNum === dayNum) || currentWorkout;
    setDayLogs((prev) => {
      const base = prev[dayNum] || getDefaultDayRunningLog(targetDay);
      const next = { ...base, usedPace: paceStr };
      if (typeof paceStr === 'string' && /^\d{1,2}:\d{2}$/.test(paceStr.trim())) {
        const sec = paceStrToSeconds(paceStr.trim(), 285);
        next.usedSpeedKmh = paceSecToKmh(sec);
      }
      return {
        ...prev,
        [dayNum]: next
      };
    });
  };

  const handleConfirmAndSaveDay = (dayNum) => {
    const targetDay = WORKOUT_DAYS.find((d) => d.dayNum === dayNum) || currentWorkout;
    const defaults = getDefaultDayRunningLog(targetDay);
    const stamp = new Date().toISOString();
    setDayLogs((prev) => {
      const existing = prev[dayNum] || {};
      const finalSpeed = parseFloat(existing.usedSpeedKmh) || defaults.usedSpeedKmh;
      const finalZone = existing.usedZone || defaults.usedZone;
      const finalDist = existing.distanceKm !== undefined ? parseFloat(existing.distanceKm) || 0 : defaults.distanceKm;
      return {
        ...prev,
        [dayNum]: {
          ...defaults,
          ...existing,
          rpe: existing.rpe !== undefined ? parseInt(existing.rpe, 10) : defaults.rpe,
          duration: existing.duration !== undefined ? parseInt(existing.duration, 10) : defaults.duration,
          usedZone: finalZone,
          usedSpeedKmh: finalSpeed,
          usedPace: kmhToPaceStr(finalSpeed),
          distanceKm: finalDist,
          confirmedAt: stamp
        }
      };
    });
    setCompletedDays((prev) => ({
      ...prev,
      [dayNum]: true
    }));
    setSaveConfirmBanner(`Dia ${dayNum} (${targetDay.date}) salvo, confirmado e sincronizado em todos os gráficos!`);
    setTimeout(() => {
      setSaveConfirmBanner('');
    }, 4500);
  };

  // Estatísticas globais, controle de carga (sRPE), velocidade real e Auditoria de Pareto 80/20 (US1)
  const stats = useMemo(() => {
    const totalDays = WORKOUT_DAYS.length;
    const doneCount = Object.values(completedDays).filter(Boolean).length;
    const progressPct = Math.round((doneCount / totalDays) * 100);

    let plannedLoadUnits = 0;
    let loggedLoadUnits = 0;
    let plannedAerobicSessions = 0;
    let plannedStrengthSessions = 0;
    let completedAerobicSessions = 0;
    let completedStrengthSessions = 0;
    let aerobicLoadUnits = 0;
    let strengthLoadUnits = 0;
    let plannedDistanceKm = 0;
    let confirmedDistanceKm = 0;
    let weightedConfirmedSpeedSum = 0;
    let confirmedSpeedSessions = 0;
    let confirmedRPESum = 0;

    WORKOUT_DAYS.forEach((day) => {
      const plannedRPE = day.loadIndex === 0 ? 0 : day.loadIndex + 9; // Aproximação Borg 6-20
      const pLoad = day.durationMin * plannedRPE;
      plannedLoadUnits += pLoad;
      const dayPlannedKm = getDayPlannedRunDistanceKm(day);
      plannedDistanceKm += dayPlannedKm;

      const dir = PARETO_DAY_DIRECTIVES[day.dayNum];
      const isStrengthBucket = dir?.bucket8020 === 'SUPPORT_20_STRENGTH' || day.category === 'STRENGTH';
      const isAerobicBucket = dir?.bucket8020 === 'PRIMARY_80_AEROBIC' || (!isStrengthBucket && day.category !== 'REST');

      if (isAerobicBucket) plannedAerobicSessions += 1;
      if (isStrengthBucket) plannedStrengthSessions += 1;

      if (completedDays[day.dayNum]) {
        const log = dayLogs[day.dayNum];
        const actualRPE = log?.rpe !== undefined ? parseInt(log.rpe, 10) : plannedRPE;
        const actualDur = log?.duration !== undefined ? parseInt(log.duration, 10) : day.durationMin;
        const dayUA = actualRPE * actualDur;
        loggedLoadUnits += dayUA;
        confirmedRPESum += actualRPE;

        const pZone = getDayPrescribedZoneKey(day);
        const defaultZoneKmh = pZone !== 'REST' ? (runningZonesKmh[pZone] || runningZonesKmh.Z3 || 12.6) : 0;
        const actualKmh = log?.usedSpeedKmh ? parseFloat(log.usedSpeedKmh) : defaultZoneKmh;
        const actualKm = log?.distanceKm !== undefined ? parseFloat(log.distanceKm) || 0 : dayPlannedKm;
        confirmedDistanceKm += actualKm;

        if (actualKmh > 0 && day.category !== 'REST') {
          weightedConfirmedSpeedSum += actualKmh;
          confirmedSpeedSessions += 1;
        }

        if (isAerobicBucket) {
          completedAerobicSessions += 1;
          aerobicLoadUnits += dayUA;
        } else if (isStrengthBucket) {
          completedStrengthSessions += 1;
          strengthLoadUnits += dayUA;
        }
      }
    });

    const totalPlannedActive = plannedAerobicSessions + plannedStrengthSessions;
    const plannedAerobicRatioPct = totalPlannedActive > 0
      ? Math.round((plannedAerobicSessions / totalPlannedActive) * 100)
      : 82;

    const totalCompletedActive = completedAerobicSessions + completedStrengthSessions;
    const actualAerobicRatioPct = totalCompletedActive > 0
      ? Math.round((completedAerobicSessions / totalCompletedActive) * 100)
      : plannedAerobicRatioPct;

    const imbalanceWarning = doneCount >= 3 && totalCompletedActive > 0 && actualAerobicRatioPct < 65;

    const grpSpeedKmh = runningZonesKmh.Z3 || paceSecToKmh(paceStrToSeconds(goalPace, 285));
    const avgConfirmedSpeedKmh = confirmedSpeedSessions > 0
      ? Math.round((weightedConfirmedSpeedSum / confirmedSpeedSessions) * 10) / 10
      : grpSpeedKmh;
    const avgConfirmedPaceStr = kmhToPaceStr(avgConfirmedSpeedKmh);
    const avgConfirmedRPE = doneCount > 0 ? Math.round((confirmedRPESum / doneCount) * 10) / 10 : 0;

    return {
      totalDays,
      doneCount,
      progressPct,
      plannedLoadUnits,
      loggedLoadUnits,
      plannedAerobicSessions,
      plannedStrengthSessions,
      plannedAerobicRatioPct,
      completedAerobicSessions,
      completedStrengthSessions,
      actualAerobicRatioPct,
      aerobicLoadUnits,
      strengthLoadUnits,
      imbalanceWarning,
      plannedDistanceKm: Math.round(plannedDistanceKm * 10) / 10,
      confirmedDistanceKm: Math.round(confirmedDistanceKm * 10) / 10,
      grpSpeedKmh,
      avgConfirmedSpeedKmh,
      avgConfirmedPaceStr,
      avgConfirmedRPE
    };
  }, [completedDays, dayLogs, runningZonesKmh, goalPace]);

  // Diagnóstico do Piso de Força (Strength Floor vs. Cargas Oficiais da Divisão - US2)
  const strengthFloorDiagnostics = useMemo(() => {
    const div = currentDivision;
    const backSq = parseFloat(oneRMs.backSquat) || 0;
    const frontSq = parseFloat(oneRMs.frontSquat) || 0;
    const rdl = parseFloat(oneRMs.rdl) || 0;
    const trapBar = parseFloat(oneRMs.trapBarDeadlift) || 0;
    const splitSq = parseFloat(oneRMs.bulgarianSplitSquat) || 0;
    const walkLunge = parseFloat(oneRMs.barbellWalkingLunges) || 0;
    const goblet = parseFloat(oneRMs.gobletSquat) || 0;
    const pushPress = parseFloat(oneRMs.dbPushPress) || 0;

    const evaluateStatus = (anchorRM, protectedTarget, thresholdTarget) => {
      if (anchorRM <= 0) {
        return {
          status: 'UNCONFIGURED',
          statusLabel: '1RM Não Configurado',
          badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
          barColor: 'bg-slate-600',
          reservePct: 0
        };
      }
      const ratio = anchorRM / protectedTarget;
      const reservePct = Math.min(100, Math.round(ratio * 100));
      if (anchorRM >= protectedTarget) {
        return {
          status: 'PROTECTED',
          statusLabel: 'Piso Protegido (Domínio Metabólico)',
          badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          barColor: 'bg-emerald-400',
          reservePct
        };
      }
      if (anchorRM >= thresholdTarget) {
        return {
          status: 'THRESHOLD',
          statusLabel: 'Zona Limiar (Atenção Mecânica)',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          barColor: 'bg-amber-400',
          reservePct
        };
      }
      return {
        status: 'CNS_RISK',
        statusLabel: 'Alerta SNC (Modo Sobrevivência)',
        badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        barColor: 'bg-rose-500',
        reservePct
      };
    };

    const squatAnchor = Math.max(backSq, Math.round(frontSq * 1.15));
    const pullAnchor = Math.max(trapBar, Math.round(rdl * 1.1));
    const carryTotalKg = div.farmersCarry * 2;
    const lungeAnchor = Math.max(walkLunge, Math.round(splitSq * 1.1));
    const wbAnchor = pushPress > 0 ? pushPress : Math.round(goblet * 0.6);

    const sledPushEval = evaluateStatus(squatAnchor, Math.round(div.sledPush * 0.85), Math.round(div.sledPush * 0.65));
    const sledPullEval = evaluateStatus(pullAnchor, Math.round(div.sledPull * 1.45), Math.round(div.sledPull * 1.15));
    const carryEval = evaluateStatus(pullAnchor, Math.round(carryTotalKg * 3.0), Math.round(carryTotalKg * 2.2));
    const lungeEval = evaluateStatus(lungeAnchor, Math.round(div.sandbagLunges * 3.0), Math.round(div.sandbagLunges * 2.2));
    const wbEval = evaluateStatus(wbAnchor, Math.round(div.wallBallsWeight * 3.5), Math.round(div.wallBallsWeight * 2.5));

    return [
      {
        stationId: 'sledPush',
        stationName: '2. Sled Push (50m)',
        officialLoadDesc: `${div.sledPush} kg`,
        anchorExerciseName: 'Back Squat / Front Squat Eq.',
        athleteAnchor1RM: squatAnchor,
        targetSafe1RM: Math.round(div.sledPush * 0.85),
        keyDays: 'Dias 1, 15 e 21',
        ...sledPushEval,
        recommendation: sledPushEval.status === 'PROTECTED'
          ? 'Reserva ampla: mantenha passadas curtas contínuas e descanse apenas nas viragens de 12,5m.'
          : 'Priorize o Back/Front Squat nos Dias 1 e 15 (80% 1RM) e fracione cada 12,5m em 2 impulsos curtos para não destruir as pernas.'
      },
      {
        stationId: 'sledPull',
        stationName: '3. Sled Pull (50m)',
        officialLoadDesc: `${div.sledPull} kg`,
        anchorExerciseName: 'Trap Bar Deadlift / RDL Eq.',
        athleteAnchor1RM: pullAnchor,
        targetSafe1RM: Math.round(div.sledPull * 1.45),
        keyDays: 'Dias 1 e 15',
        ...sledPullEval,
        recommendation: sledPullEval.status === 'PROTECTED'
          ? 'Cadeia posterior blindada: use inclinação de tronco e extensão de anca na caixa sem puxar apenas de bíceps.'
          : 'Reforce o RDL (Dia 1) e Trap Bar Deadlift (Dia 15); insira micro-pausa de 3s a cada 12,5m para preservar a lombar e o grip.'
      },
      {
        stationId: 'farmersCarry',
        stationName: '6. Farmer\'s Carry (200m)',
        officialLoadDesc: `2x ${div.farmersCarry} kg (${carryTotalKg} kg total)`,
        anchorExerciseName: 'Trap Bar Deadlift (Estabilidade/Grip)',
        athleteAnchor1RM: pullAnchor,
        targetSafe1RM: Math.round(carryTotalKg * 3.0),
        keyDays: 'Dias 1, 8 e 15',
        ...carryEval,
        recommendation: carryEval.status === 'PROTECTED'
          ? 'Piso seguro para 200m unbroken com escápulas retraídas e marcha rápida.'
          : 'Planeie 1 paragem cirúrgica de 5s aos 100m antes que a falha de antebraço contamine a Corrida 7.'
      },
      {
        stationId: 'sandbagLunges',
        stationName: '7. Sandbag Lunges (100m)',
        officialLoadDesc: `${div.sandbagLunges} kg`,
        anchorExerciseName: 'Walking Lunges / Split Squat',
        athleteAnchor1RM: lungeAnchor,
        targetSafe1RM: Math.round(div.sandbagLunges * 3.0),
        keyDays: 'Dia 8 (Sobrecarga Unilateral)',
        ...lungeEval,
        recommendation: lungeEval.status === 'PROTECTED'
          ? `O saco de ${div.sandbagLunges} kg representa <=33% da sua força unilateral. Mantenha blocos de 25m contínuos.`
          : 'Estação crítica! Foque no Dia 8 (Split Squat + Walking Lunge) e use pausas de 3 respirações em pé a cada 12,5m.'
      },
      {
        stationId: 'wallBalls',
        stationName: '8. Wall Balls (100 reps)',
        officialLoadDesc: `${div.wallBallsWeight} kg (Alvo ${div.wallBallsTarget})`,
        anchorExerciseName: 'Push Press (1RM por Halter)',
        athleteAnchor1RM: wbAnchor,
        targetSafe1RM: Math.round(div.wallBallsWeight * 3.5),
        keyDays: 'Dias 1, 15 e 21',
        ...wbEval,
        recommendation: wbEval.status === 'PROTECTED'
          ? 'Boa reserva de ombro/anca: use o esquema Tático Equilibrado (25-20-15-15-15-10) com transferência elástica.'
          : 'Alto risco de falha concêntrica no fim: adote obrigatoriamente o fracionamento Conservador (20-15-15-15-15-10-10).'
      }
    ];
  }, [currentDivision, oneRMs]);

  // Simulador Cirúrgico da Roxzone (16 Transições & Protocolo dos 3 Passos - US3)
  const roxzoneSim = useMemo(() => {
    const secPerPassage = Math.min(60, Math.max(12, parseInt(roxzoneTargetSec, 10) || 22));
    const totalRoxzoneSec = secPerPassage * 16;
    const eliteBenchmarkSec = 321; // 05:21 (Top 10%)
    const slowBenchmarkSec = 685; // 11:25 (Bottom 10%)
    const savedVsSlowSec = Math.max(0, slowBenchmarkSec - totalRoxzoneSec);
    const diffVsEliteSec = totalRoxzoneSec - eliteBenchmarkSec;
    const equivalentPaceGainSecPerKm = Math.round(savedVsSlowSec / 8);

    return {
      secPerPassage,
      totalRoxzoneSec,
      eliteBenchmarkSec,
      slowBenchmarkSec,
      savedVsSlowSec,
      diffVsEliteSec,
      equivalentPaceGainSecPerKm
    };
  }, [roxzoneTargetSec]);

  // ============================================================================
  // MOTOR ANALÍTICO DOS 7 GRÁFICOS & DIAGRAMA DE PARETO 80/20 (100% SINCRONIZADO COM DADOS SALVOS & ZONAS DE CORRIDA)
  // ============================================================================
  const analyticsData = useMemo(() => {
    // 1. Parse base GRP pace in seconds & GRP speed in km/h
    const safePaceStr = typeof goalPace === 'string' && goalPace.includes(':') ? goalPace : '04:45';
    const basePaceSec = paceStrToSeconds(safePaceStr, 285);
    const grpSpeedKmh = runningZonesKmh.Z3 || paceSecToKmh(basePaceSec);

    // Fator de carga real de força (média dos 1RMs atuais face aos defaults)
    const rmRatioSum = Object.values(STRENGTH_EXERCISES).reduce((acc, ex) => {
      const cur = parseFloat(oneRMs[ex.id]) || ex.default1RM;
      return acc + cur / Math.max(1, ex.default1RM);
    }, 0);
    const strengthLoadScale = Math.max(0.65, Math.min(1.6, rmRatioSum / Object.keys(STRENGTH_EXERCISES).length));

    // 2. Séries Temporais de 26 Dias (Evolução, Velocidade km/h, Volume Acumulado, Dispersão e Prontidão/VFC)
    let cumAnterior = 0;
    let cumPosterior = 0;
    let cumUpper = 0;
    let cumCoreGrip = 0;
    let cumAerobic = 0;
    let rollingFatigue = 12; // Fadiga residual inicial

    const evolutionSeries = WORKOUT_DAYS.map((day) => {
      const plannedRPE = day.loadIndex === 0 ? 6 : day.loadIndex + 9;
      const plannedSRPE = day.loadIndex === 0 ? 0 : day.durationMin * plannedRPE;
      const log = dayLogs[day.dayNum];
      const isCompleted = !!completedDays[day.dayNum];
      const hasLog = !!log;
      const loggedRPE = log && log.rpe !== undefined ? parseInt(log.rpe, 10) : plannedRPE;
      const loggedDur = log && log.duration !== undefined ? parseInt(log.duration, 10) : day.durationMin;
      const actualSRPE = day.loadIndex === 0 ? 0 : loggedRPE * loggedDur;
      const confirmedSRPE = isCompleted ? actualSRPE : 0;
      const effectiveSRPE = analyticsScope === 'CONFIRMED_ONLY'
        ? confirmedSRPE
        : (isCompleted || hasLog ? actualSRPE : plannedSRPE);

      // Zona de Corrida Prescrita vs. Zona/Velocidade Real Executada pelo Atleta
      const prescribedZoneKey = getDayPrescribedZoneKey(day);
      const prescribedSpeedKmh = prescribedZoneKey === 'REST'
        ? 0
        : (runningZonesKmh[prescribedZoneKey] || grpSpeedKmh);
      const prescribedPaceSec = prescribedSpeedKmh > 0
        ? kmhToPaceSec(prescribedSpeedKmh)
        : basePaceSec + 45;

      const usedZoneKey = log && log.usedZone
        ? log.usedZone
        : (prescribedZoneKey === 'REST' ? 'Z1' : prescribedZoneKey);
      const usedSpeedKmh = day.category === 'REST' && !isCompleted
        ? 0
        : (log && log.usedSpeedKmh !== undefined && parseFloat(log.usedSpeedKmh) > 0
          ? Math.round(parseFloat(log.usedSpeedKmh) * 10) / 10
          : prescribedSpeedKmh);
      const confirmedSpeedKmh = isCompleted ? usedSpeedKmh : 0;
      const effectiveSpeedKmh = analyticsScope === 'CONFIRMED_ONLY'
        ? confirmedSpeedKmh
        : usedSpeedKmh;

      const targetPaceSec = usedSpeedKmh > 0 ? kmhToPaceSec(usedSpeedKmh) : prescribedPaceSec;
      const plannedDistKm = getDayPlannedRunDistanceKm(day);
      const actualDistKm = log && log.distanceKm !== undefined ? parseFloat(log.distanceKm) || 0 : plannedDistKm;

      // Intensidade % 1RM do dia (real dos blocos de força ou solicitação neuromuscular ajustada à velocidade real)
      let strengthIntensityPct = 0;
      const strengthPcts = [];
      day.blocks.forEach((b) => {
        if (b.strengthPrescriptions) {
          b.strengthPrescriptions.forEach((sp) => {
            const key = `${sp.exId}_d${day.dayNum}`;
            const pct = customPcts[key] !== undefined ? customPcts[key] : sp.defaultPct;
            strengthPcts.push(Math.round(pct * 100));
          });
        }
      });
      if (strengthPcts.length > 0) {
        strengthIntensityPct = Math.round(strengthPcts.reduce((a, b) => a + b, 0) / strengthPcts.length);
      } else if (day.category === 'SIMULATION' || day.category === 'RACE_DAY') {
        strengthIntensityPct = 72;
      } else if (day.category === 'COMPROMISED') {
        strengthIntensityPct = 68;
      } else if (day.category === 'ERG_CAPACITY') {
        strengthIntensityPct = 55;
      } else if (day.category === 'SPEED') {
        strengthIntensityPct = 50;
      } else if (day.category === 'AEROBIC') {
        strengthIntensityPct = 35;
      } else {
        strengthIntensityPct = 0;
      }

      // Incremento de volume por agrupamento muscular / padrão motor escalado pelos dados reais do atleta
      let addAnt = 0, addPost = 0, addUp = 0, addCore = 0, addAero = 0;
      if (day.category === 'STRENGTH') {
        addAnt = 24 * strengthLoadScale;
        addPost = 22 * strengthLoadScale;
        addUp = 10 * strengthLoadScale;
        addCore = 16 * strengthLoadScale;
        addAero = 8;
      } else if (day.category === 'SPEED') {
        addAnt = 12; addPost = 14; addUp = 4; addCore = 8; addAero = 32;
      } else if (day.category === 'AEROBIC') {
        addAnt = 8; addPost = 8; addUp = 4; addCore = 6; addAero = 35;
      } else if (day.category === 'COMPROMISED') {
        addAnt = 26 * strengthLoadScale;
        addPost = 20 * strengthLoadScale;
        addUp = 14; addCore = 18; addAero = 28;
      } else if (day.category === 'ERG_CAPACITY') {
        addAnt = 10; addPost = 16; addUp = 26; addCore = 22; addAero = 24;
      } else if (day.category === 'SIMULATION' || day.category === 'RACE_DAY') {
        addAnt = 32; addPost = 26; addUp = 24; addCore = 24; addAero = 42;
      }

      const durScale = day.durationMin > 0 ? Math.max(0.3, Math.min(1.8, loggedDur / day.durationMin)) : 1.0;
      const speedScale = prescribedSpeedKmh > 0 && usedSpeedKmh > 0
        ? Math.max(0.7, Math.min(1.4, usedSpeedKmh / prescribedSpeedKmh))
        : 1.0;
      const mcScale = day.microcycle === 2 ? 1.12 : day.microcycle === 3 ? 0.85 : day.microcycle === 4 ? 0.55 : 1.0;
      const shouldAccumulate = analyticsScope === 'CONFIRMED_ONLY' ? isCompleted : true;
      const activeFactor = shouldAccumulate ? mcScale * durScale : 0;

      cumAnterior += Math.round(addAnt * activeFactor);
      cumPosterior += Math.round(addPost * activeFactor);
      cumUpper += Math.round(addUp * activeFactor);
      cumCoreGrip += Math.round(addCore * activeFactor);
      cumAerobic += Math.round(addAero * activeFactor * speedScale);

      // Correlação Carga Externa (0..100) vs Carga Interna PSE (6..20) & Prontidão/VFC (0..100)
      const activeDurForExt = isCompleted || hasLog ? loggedDur : day.durationMin;
      const externalLoad = Math.min(100, Math.round(((activeDurForExt * day.loadIndex) / 9.0) * speedScale));
      const internalRPE = isCompleted || hasLog ? loggedRPE : plannedRPE;

      // Modelo fisiológico de Prontidão / VFC (sobe no descanso/Tapering, desce após pico de carga ou FC basal alta)
      const hrVal = log && log.morningHR ? parseFloat(log.morningHR) : NaN;
      const hrPenalty = !isNaN(hrVal) && hrVal > 58 ? Math.min(18, (hrVal - 58) * 2.2) : 0;
      const fatigueInputLoad = isCompleted || hasLog
        ? Math.min(100, Math.round((actualSRPE / 14.5) * speedScale))
        : externalLoad;
      rollingFatigue = Math.max(4, Math.min(62, rollingFatigue * 0.72 + (fatigueInputLoad * 0.36) - (day.loadIndex === 0 ? 18 : day.loadIndex <= 4 ? 8 : 0)));
      const readinessScore = Math.min(99, Math.max(38, Math.round(98 - rollingFatigue - hrPenalty)));

      const expectedRPE = day.loadIndex === 0 ? 6 : 9 + day.loadIndex;
      const zoneStatus = internalRPE >= expectedRPE + 2 || (internalRPE >= 18 && externalLoad < 65)
        ? 'OVERREACH_RISK'
        : day.loadIndex >= 8
        ? 'HIGH_LOAD'
        : 'OPTIMAL';

      return {
        dayNum: day.dayNum,
        date: day.date,
        weekday: day.weekday,
        microcycle: day.microcycle,
        category: day.category,
        loadIndex: day.loadIndex,
        durationMin: day.durationMin,
        loggedDur,
        isCompleted,
        hasLog,
        plannedSRPE,
        actualSRPE,
        confirmedSRPE,
        effectiveSRPE,
        prescribedZoneKey,
        prescribedSpeedKmh,
        prescribedPaceSec,
        usedZoneKey,
        usedSpeedKmh,
        confirmedSpeedKmh,
        effectiveSpeedKmh,
        plannedDistKm,
        actualDistKm,
        strengthIntensityPct,
        targetPaceSec,
        cumAnteriorVol: cumAnterior,
        cumPosteriorVol: cumPosterior,
        cumUpperVol: cumUpper,
        cumCoreGripVol: cumCoreGrip,
        cumAerobicVol: cumAerobic,
        cumTotalVol: cumAnterior + cumPosterior + cumUpper + cumCoreGrip + cumAerobic,
        externalLoad,
        internalRPE,
        readinessScore,
        zoneStatus
      };
    });

    // 3. Composição Semanal dos 4 Microciclos 100% Dinâmica (Calculada dos Treinos Salvos/Confirmados + Zonas Editadas)
    const microcycleLabels = {
      1: { label: 'M1 • Calibração (85%)', shortLabel: 'M1 (Sem 1)' },
      2: { label: 'M2 • Pico Carga (100%)', shortLabel: 'M2 (Sem 2)' },
      3: { label: 'M3 • Transições (75%)', shortLabel: 'M3 (Sem 3)' },
      4: { label: 'M4 • Tapering & Prova (45%)', shortLabel: 'M4 (Sem 4)' }
    };

    const microcycleComposition = [1, 2, 3, 4].map((mcId) => {
      const mcDays = evolutionSeries.filter((d) => d.microcycle === mcId);
      const muscleSets = { anterior: 0, posterior: 0, costasPull: 0, ombrosPush: 0, coreGrip: 0 };
      const hrZonesMin = { z1: 0, z2: 0, z3: 0, z4: 0, z5: 0 };
      let confirmedDaysInMc = 0;
      let totalActiveDaysInMc = 0;

      mcDays.forEach((d) => {
        if (d.category !== 'REST') totalActiveDaysInMc += 1;
        if (d.isCompleted) confirmedDaysInMc += 1;

        const includeDay = analyticsScope === 'CONFIRMED_ONLY' ? d.isCompleted : true;
        if (!includeDay || d.category === 'REST') return;

        const dur = d.isCompleted || d.hasLog ? d.loggedDur : d.durationMin;
        const durRatio = d.durationMin > 0 ? Math.max(0.35, Math.min(1.6, dur / d.durationMin)) : 1.0;
        const zKey = (d.isCompleted || d.hasLog ? d.usedZoneKey : d.prescribedZoneKey) || 'Z2';

        // Distribuição de Séries Efetivas por Grupo Muscular
        let sAnt = 0, sPost = 0, sPull = 0, sPush = 0, sCore = 0;
        if (d.category === 'STRENGTH') {
          sAnt = 9 * strengthLoadScale;
          sPost = 8 * strengthLoadScale;
          sPull = 4 * strengthLoadScale;
          sPush = 4 * strengthLoadScale;
          sCore = 6 * strengthLoadScale;
        } else if (d.category === 'COMPROMISED') {
          sAnt = 8; sPost = 6; sPull = 5; sPush = 6; sCore = 6;
        } else if (d.category === 'ERG_CAPACITY') {
          sAnt = 3; sPost = 5; sPull = 8; sPush = 5; sCore = 7;
        } else if (d.category === 'SIMULATION' || d.category === 'RACE_DAY') {
          sAnt = 8; sPost = 7; sPull = 6; sPush = 6; sCore = 6;
        } else if (d.category === 'SPEED') {
          sAnt = 3; sPost = 3; sPull = 1; sPush = 1; sCore = 2;
        } else if (d.category === 'AEROBIC') {
          sAnt = 2; sPost = 2; sPull = 1; sPush = 1; sCore = 2;
        }

        muscleSets.anterior += Math.round(sAnt * durRatio);
        muscleSets.posterior += Math.round(sPost * durRatio);
        muscleSets.costasPull += Math.round(sPull * durRatio);
        muscleSets.ombrosPush += Math.round(sPush * durRatio);
        muscleSets.coreGrip += Math.round(sCore * durRatio);

        // Distribuição de Minutos nas Zonas Z1 a Z5 (respeitando a Zona Real Usada pelo Atleta no Dia)
        const warmupCoolMin = Math.round(dur * 0.18);
        const mainMin = Math.max(0, dur - warmupCoolMin);
        hrZonesMin.z1 += Math.round(warmupCoolMin * 0.65);
        hrZonesMin.z2 += Math.round(warmupCoolMin * 0.35);

        if (zKey === 'Z1') {
          hrZonesMin.z1 += Math.round(mainMin * 0.8);
          hrZonesMin.z2 += Math.round(mainMin * 0.2);
        } else if (zKey === 'Z2') {
          hrZonesMin.z2 += Math.round(mainMin * 0.82);
          hrZonesMin.z3 += Math.round(mainMin * 0.18);
        } else if (zKey === 'Z3') {
          hrZonesMin.z2 += Math.round(mainMin * 0.20);
          hrZonesMin.z3 += Math.round(mainMin * 0.60);
          hrZonesMin.z4 += Math.round(mainMin * 0.20);
        } else if (zKey === 'Z4') {
          hrZonesMin.z2 += Math.round(mainMin * 0.15);
          hrZonesMin.z3 += Math.round(mainMin * 0.25);
          hrZonesMin.z4 += Math.round(mainMin * 0.48);
          hrZonesMin.z5 += Math.round(mainMin * 0.12);
        } else if (zKey === 'Z5') {
          hrZonesMin.z2 += Math.round(mainMin * 0.20);
          hrZonesMin.z3 += Math.round(mainMin * 0.20);
          hrZonesMin.z4 += Math.round(mainMin * 0.25);
          hrZonesMin.z5 += Math.round(mainMin * 0.35);
        }
      });

      return {
        microcycleId: mcId,
        label: microcycleLabels[mcId].label,
        shortLabel: microcycleLabels[mcId].shortLabel,
        confirmedDaysInMc,
        totalActiveDaysInMc,
        muscleSets,
        hrZonesMin
      };
    });

    // 4. Perfil Multidimensional de Radar (5 Eixos: Força, Resistência, Mobilidade, Potência, Velocidade)
    const avgStrengthReserve = Math.round(
      strengthFloorDiagnostics.reduce((acc, s) => acc + (s.reservePct || 65), 0) /
      Math.max(1, strengthFloorDiagnostics.length)
    );
    const activePaceSecForScore = stats.doneCount > 0
      ? kmhToPaceSec(stats.avgConfirmedSpeedKmh)
      : basePaceSec;
    const paceScore = Math.min(98, Math.max(45, Math.round(100 - ((activePaceSecForScore - 225) / 155) * 48)));
    const aerobicCompletionBonus = Math.min(10, stats.completedAerobicSessions);
    const enduranceScore = Math.min(98, paceScore + aerobicCompletionBonus);

    const backSq = parseFloat(oneRMs.backSquat) || 120;
    const frontSq = parseFloat(oneRMs.frontSquat) || 95;
    const fsBsRatio = backSq > 0 ? frontSq / backSq : 0.78;
    const mobilityScore = Math.min(96, Math.max(52, Math.round(62 + Math.min(0.88, fsBsRatio) * 36)));

    const trapBar = parseFloat(oneRMs.trapBarDeadlift) || 150;
    const pushPress = parseFloat(oneRMs.dbPushPress) || 22;
    const w = Math.max(45, parseFloat(athleteWeight) || 75);
    const relPowerIndex = (trapBar + backSq + pushPress * 2) / w;
    const powerScore = Math.min(98, Math.max(48, Math.round(relPowerIndex * 21)));

    const z5Bonus = Math.min(8, Math.max(-6, Math.round(((runningZonesKmh.Z5 || 13.7) - 13.5) * 2.2)));
    const roxScore = Math.min(98, Math.max(42, Math.round(100 - ((roxzoneSim.secPerPassage - 16) / 44) * 55)));
    const speedScore = Math.min(98, Math.max(45, Math.round(roxScore * 0.55 + paceScore * 0.45 + z5Bonus)));

    const radarAxes = [
      { id: 'strength', label: 'Força (1RM)', score: avgStrengthReserve, benchmark: 85 },
      { id: 'endurance', label: 'Resistência', score: enduranceScore, benchmark: 86 },
      { id: 'mobility', label: 'Mobilidade', score: mobilityScore, benchmark: 80 },
      { id: 'power', label: 'Potência', score: powerScore, benchmark: 84 },
      { id: 'speed', label: 'Velocidade', score: speedScore, benchmark: 85 }
    ];
    const sortedRadar = [...radarAxes].sort((a, b) => a.score - b.score);
    const weakestCapability = sortedRadar[0];
    const strongestCapability = sortedRadar[sortedRadar.length - 1];

    // 5. Diagrama de Pareto 80/20 para Eficiência de Exercícios (Fadiga Acumulada vs Tempo Perdido)
    const diagMap = {};
    strengthFloorDiagnostics.forEach((d) => {
      diagMap[d.stationId] = d;
    });
    const getDeficitMultiplier = (stId) => {
      const d = diagMap[stId];
      if (!d) return 1.0;
      if (d.status === 'CNS_RISK') return 1.42;
      if (d.status === 'THRESHOLD') return 1.18;
      return 0.92;
    };

    const effectiveRunPaceSec = stats.doneCount > 0 ? kmhToPaceSec(stats.avgConfirmedSpeedKmh) : basePaceSec;
    const runFadePenaltySec = Math.max(25, Math.round((effectiveRunPaceSec - 240) * 1.35 + 48));
    const roxPenaltySec = Math.max(15, (roxzoneSim.secPerPassage - 18) * 16);
    const wbPenaltyMult = fractionationProfile === 'SAFE_80_20' ? 0.88 : fractionationProfile === 'ELITE_DENSITY' ? 1.18 : 0.95;

    const rawParetoCandidates = [
      {
        id: 'running',
        name: 'Corrida (8x1km)',
        shortName: 'Corrida 8km',
        fatigueScore: Math.round(210 * (effectiveRunPaceSec > 285 ? 1.15 : 1.0)),
        timeLossSec: runFadePenaltySec,
        actionTip: `Z3 GRP: ${runningZonesKmh.Z3} km/h (${goalPace}/km) • Corrida 1 a ${calculateAdjustedPace(goalPace, 15)}/km (+15s anti-fade) e Z4 Limiar a ${runningZonesKmh.Z4} km/h.`
      },
      {
        id: 'sledPush',
        name: 'Sled Push (50m)',
        shortName: 'Sled Push',
        fatigueScore: Math.round(165 * getDeficitMultiplier('sledPush')),
        timeLossSec: Math.round(68 * getDeficitMultiplier('sledPush')),
        actionTip: `Passos curtos em inclinação de 45°; proteja o Back/Front Squat nos Dias 1 e 15 para blindar os quadríceps.`
      },
      {
        id: 'wallBalls',
        name: 'Wall Balls (100)',
        shortName: 'Wall Balls',
        fatigueScore: Math.round(158 * getDeficitMultiplier('wallBalls') * wbPenaltyMult),
        timeLossSec: Math.round(64 * getDeficitMultiplier('wallBalls') * wbPenaltyMult),
        actionTip: `Quebra preventiva obrigatória (${activeFractionation.wallBallsSets}) com pausas de 3-5 respirações antes da falha.`
      },
      {
        id: 'sandbagLunges',
        name: 'Sandbag Lunges',
        shortName: 'Lunges 100m',
        fatigueScore: Math.round(142 * getDeficitMultiplier('sandbagLunges')),
        timeLossSec: Math.round(56 * getDeficitMultiplier('sandbagLunges')),
        actionTip: `Passada à largura da anca (evitar corda bamba) e micro-pausa em pé a cada 12,5m/25m.`
      },
      {
        id: 'roxzone',
        name: 'Roxzone (16x)',
        shortName: 'Roxzone 16x',
        fatigueScore: Math.round(65 + Math.max(0, roxzoneSim.secPerPassage - 20) * 3.2),
        timeLossSec: roxPenaltySec,
        actionTip: `Aplicar o Protocolo dos 3 Passos em todas as 16 saídas de estação (economia gratuita de ${formatTimer(roxzoneSim.savedVsSlowSec)}).`
      },
      {
        id: 'sledPull',
        name: 'Sled Pull (50m)',
        shortName: 'Sled Pull',
        fatigueScore: Math.round(118 * getDeficitMultiplier('sledPull')),
        timeLossSec: Math.round(46 * getDeficitMultiplier('sledPull')),
        actionTip: `Usar extensão de anca e caminhar para trás na caixa de 1,8m; proibido puxar isoladamente com os bíceps.`
      },
      {
        id: 'burpees',
        name: 'Burpee Broad Jump',
        shortName: 'Burpees 80m',
        fatigueScore: 112,
        timeLossSec: 44,
        actionTip: `Usar técnica step-up (um pé de cada vez) para manter FC abaixo do limiar anaeróbio antes da Corrida 5.`
      },
      {
        id: 'farmersCarry',
        name: 'Farmer\'s Carry',
        shortName: 'Farmer 200m',
        fatigueScore: Math.round(78 * getDeficitMultiplier('farmersCarry')),
        timeLossSec: Math.round(28 * getDeficitMultiplier('farmersCarry')),
        actionTip: `Ombros para trás e passos curtos/rápidos para não fadigar o antebraço antes dos Lunges.`
      },
      {
        id: 'rowing',
        name: 'Rowing (1.000m)',
        shortName: 'Rowing 1km',
        fatigueScore: 54,
        timeLossSec: 18,
        actionTip: `Usar o Remo como estação de recuperação tática a 24-26 spm; poupar 15s aqui custa 45s na corrida seguinte.`
      },
      {
        id: 'skiErg',
        name: 'SkiErg (1.000m)',
        shortName: 'SkiErg 1km',
        fatigueScore: 48,
        timeLossSec: 15,
        actionTip: `Fletir anca e usar o peso do tronco no início; poupar as pernas para o Sled Push da Estação 2.`
      }
    ];

    const sortedPareto = [...rawParetoCandidates]
      .map((item) => ({
        ...item,
        value: paretoMetric === 'FATIGUE' ? item.fatigueScore : item.timeLossSec
      }))
      .sort((a, b) => b.value - a.value);

    const totalParetoValue = Math.max(1, sortedPareto.reduce((acc, it) => acc + it.value, 0));
    let runningCumPct = 0;
    const paretoItems = sortedPareto.map((item, idx) => {
      const sharePct = Math.round((item.value / totalParetoValue) * 1000) / 10;
      const prevCum = runningCumPct;
      runningCumPct = Math.min(100, Math.round((runningCumPct + sharePct) * 10) / 10);
      if (idx === sortedPareto.length - 1) runningCumPct = 100;
      // Faz parte do grupo Vital 80% se começou antes dos 80% acumulados
      const isVital80 = prevCum < 80;
      return {
        ...item,
        sharePct,
        cumulativePct: runningCumPct,
        isVital80
      };
    });

    const vital80Exercises = paretoItems.filter((i) => i.isVital80);
    const avgReadiness = Math.round(
      evolutionSeries.reduce((acc, p) => acc + p.readinessScore, 0) / evolutionSeries.length
    );
    const currentDayPoint = evolutionSeries.find((p) => p.dayNum === selectedDayNum) || evolutionSeries[0];

    return {
      basePaceSec,
      grpSpeedKmh,
      evolutionSeries,
      microcycleComposition,
      radarAxes,
      weakestCapability,
      strongestCapability,
      paretoItems,
      vital80Exercises,
      totalParetoValue,
      avgReadiness,
      currentDayPoint
    };
  }, [
    goalPace,
    runningZonesKmh,
    analyticsScope,
    dayLogs,
    completedDays,
    customPcts,
    strengthFloorDiagnostics,
    stats.completedAerobicSessions,
    stats.doneCount,
    stats.avgConfirmedSpeedKmh,
    oneRMs,
    athleteWeight,
    roxzoneSim,
    fractionationProfile,
    activeFractionation,
    paretoMetric,
    selectedDayNum
  ]);

  const currentPrescribedZoneKey = getDayPrescribedZoneKey(currentWorkout);
  const currentDefaultRunningLog = getDefaultDayRunningLog(currentWorkout);
  const currentLog = {
    ...currentDefaultRunningLog,
    ...(dayLogs[currentWorkout.dayNum] || {})
  };

  // Cálculo nutricional dinâmico para o dia selecionado
  const dailyNutrition = useMemo(() => {
    const w = athleteWeight || 75;
    let carbsMin = 5, carbsMax = 7, title = 'Dia Intenso (Sobrecarga / Transições)';
    if (currentWorkout.nutritionType === 'LOW') {
      carbsMin = 4; carbsMax = 5; title = 'Dia Regenerativo (Zona 2 / Descanso)';
    } else if (currentWorkout.nutritionType === 'MODERATE') {
      carbsMin = 5; carbsMax = 6; title = 'Dia Moderado (Ergómetros / Técnica)';
    } else if (currentWorkout.nutritionType === 'CARB_LOAD') {
      carbsMin = 6; carbsMax = 8; title = 'Saturação de Glicogénio (Carb-Loading 48h)';
    } else if (currentWorkout.nutritionType === 'RACE_DAY') {
      carbsMin = 6; carbsMax = 8; title = 'Protocolo de Prova (Simulado 05/12)';
    }

    return {
      title,
      carbsGrams: `${Math.round(w * carbsMin)}g a ${Math.round(w * carbsMax)}g`,
      carbsPerKg: `${carbsMin} a ${carbsMax} g/kg`,
      proteinGrams: `${Math.round(w * 1.6)}g a ${Math.round(w * 2.2)}g`,
      preWorkoutCarbs: `${Math.round(w * 1.5)}g a ${Math.round(w * 2.0)}g (2-3h antes)`,
      postWorkoutCarbs: `${Math.round(w * 1.0)}g hidratos + 30g Whey (<45 min)`
    };
  }, [athleteWeight, currentWorkout]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 md:pb-16">
      {/* HEADER DE COMANDO HYROX */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-slate-950 font-black text-xl tracking-tighter shadow-lg shadow-yellow-400/20">
                HX
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white uppercase">
                    HYROX <span className="text-yellow-400">Periodização</span>
                  </h1>
                  <span className="hidden sm:inline-block text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                    10 Nov → 05 Dez
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Arquitetura Endurance-Led, Strength-Protected • 6x/Semana
                </p>
              </div>
            </div>

            {/* Progresso compacto mobile */}
            <div className="lg:hidden text-right">
              <span className="text-xs text-slate-400 block">Concluído</span>
              <span className="text-sm font-bold text-yellow-400">{stats.doneCount}/{stats.totalDays} dias ({stats.progressPct}%)</span>
            </div>
          </div>

          {/* SELETORES RÁPIDOS DE PERFIL, RITMO E SINCRONIZAÇÃO WEB/MOBILE */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-950/70 p-2 rounded-xl border border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-slate-400 hidden sm:inline">Aluno/Atleta:</span>
              <select
                value={activeAthleteId}
                onChange={(e) => handleSelectActiveAthlete(e.target.value)}
                className="bg-slate-800 text-purple-300 font-bold rounded-lg px-2 py-1 border border-purple-500/40 focus:outline-none focus:border-purple-400 max-w-[180px] truncate"
                title="Selecionar Aluno ou Atleta guardado no Banco de Dados"
              >
                {athletesDatabase.map((rec) => (
                  <option key={rec.id} value={rec.id}>
                    {rec.name} ({rec.goalPace}/km • {rec.athleteWeight}kg)
                  </option>
                ))}
              </select>
              <button
                onClick={() => setActiveTab('DATABASE')}
                className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 font-bold"
                title="Abrir Banco de Dados de Alunos & Comparador"
              >
                + / Comparar
              </button>
            </div>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="text-slate-400 hidden sm:inline">Divisão:</span>
              <select
                value={divisionKey}
                onChange={(e) => setDivisionKey(e.target.value)}
                className="bg-slate-800 text-white font-semibold rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:border-yellow-400"
              >
                {Object.values(DIVISIONS).map((div) => (
                  <option key={div.id} value={div.id}>{div.name}</option>
                ))}
              </select>
            </div>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-400">Pace GRP (Z3):</span>
              <input
                type="text"
                value={goalPace}
                onChange={(e) => handleGoalPaceChange(e.target.value)}
                placeholder="04:45"
                className="w-15 bg-slate-800 text-white font-mono font-bold text-center rounded-lg px-1.5 py-1 border border-slate-700 focus:outline-none focus:border-cyan-400"
              />
              <span className="text-slate-500">/km</span>
              <span className="text-slate-600">•</span>
              <input
                type="number"
                step="0.1"
                min="4"
                max="25"
                value={runningZonesKmh.Z3}
                onChange={(e) => handleGoalSpeedKmhChange(e.target.value)}
                className="w-14 bg-slate-800 text-yellow-400 font-mono font-bold text-center rounded-lg px-1 py-1 border border-slate-700 focus:outline-none focus:border-yellow-400"
                title="Velocidade Alvo da Zona 3 (GRP) em km/h"
              />
              <span className="text-slate-500">km/h</span>
            </div>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-400">Peso:</span>
              <input
                type="number"
                value={athleteWeight}
                onChange={(e) => setAthleteWeight(parseFloat(e.target.value) || 70)}
                className="w-14 bg-slate-800 text-white font-mono font-bold text-center rounded-lg px-1.5 py-1 border border-slate-700 focus:outline-none focus:border-emerald-400"
              />
              <span className="text-slate-500">kg</span>
            </div>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <button
              onClick={() => setSyncModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold border transition-all ${
                syncStatus === 'SYNCED'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  : syncStatus === 'SYNCING'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-yellow-400/15 text-yellow-300 border-yellow-400/40 hover:bg-yellow-400/25'
              }`}
              title="Sincronizar entre Web (PC) e Telemóvel (PWA / Cloud / JSON)"
            >
              <Cloud className="w-3.5 h-3.5 shrink-0" />
              <span>Web &amp; Mobile Sync</span>
            </button>
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS */}
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar border-t border-slate-800/60">
          {[
            { id: 'TODAY', label: 'Treino do Dia', icon: Flame },
            { id: 'DATABASE', label: `Banco de Dados & Comparar (${athletesDatabase.length})`, icon: Database },
            { id: 'LOAD', label: 'Analytics & Gráficos (7)', icon: BarChart3 },
            { id: 'STRENGTH_RM', label: 'Meus 1RMs (Força)', icon: Dumbbell },
            { id: 'CALENDAR', label: 'Calendário 26 Dias', icon: Calendar },
            { id: 'STRATEGY', label: 'Cargas & Tática 05/12', icon: Compass },
            { id: 'NUTRITION', label: 'Nutrição & Hidratação', icon: Utensils }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  active
                    ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 pt-5 space-y-6">
        {/* FAIXA EXECUTIVA DE TELEMETRIA PRO DARK MODE (4 KPIs ALINHADOS WEB & MOBILE - US1 - T005) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
          <div
            onClick={() => setActiveTab('CALENDAR')}
            className="cursor-pointer bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 hover:border-yellow-400/40 rounded-2xl p-3.5 sm:p-4 shadow-lg flex flex-col justify-between transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Progresso 26 Dias
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-yellow-400/15 text-yellow-400 border border-yellow-400/30">
                M{currentMicrocycle.id} ({currentMicrocycle.volumeRel}%)
              </span>
            </div>
            <div className="my-1.5 flex items-baseline justify-between gap-2">
              <strong className="text-lg sm:text-2xl font-mono font-black text-white">
                {stats.doneCount}<span className="text-xs sm:text-sm text-slate-400 font-normal">/26</span>
              </strong>
              <span className="text-xs font-mono font-bold text-yellow-400">{stats.progressPct}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500" style={{ width: `${Math.max(4, stats.progressPct)}%` }} />
            </div>
          </div>

          <div
            onClick={() => setActiveTab('LOAD')}
            className="cursor-pointer bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-400/40 rounded-2xl p-3.5 sm:p-4 shadow-lg flex flex-col justify-between transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pareto 80/20 &amp; Foco
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {analyticsData.vital80Exercises.length} Críticos
              </span>
            </div>
            <div className="my-1.5 flex items-baseline justify-between gap-2">
              <strong className="text-lg sm:text-2xl font-mono font-black text-emerald-400">
                {stats.actualAerobicRatioPct}%<span className="text-xs text-slate-400 font-normal"> / {100 - stats.actualAerobicRatioPct}%</span>
              </strong>
              <span className="text-[11px] text-cyan-400 font-semibold hidden sm:inline">Ver Pareto →</span>
            </div>
            <span className="text-[10px] text-slate-400 truncate block">
              Top #1 Custo: <strong className="text-slate-200">{analyticsData.paretoItems[0]?.shortName}</strong>
            </span>
          </div>

          <div
            onClick={() => setActiveTab('LOAD')}
            className="cursor-pointer bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-400/40 rounded-2xl p-3.5 sm:p-4 shadow-lg flex flex-col justify-between transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Prontidão &amp; VFC Est.
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                analyticsData.currentDayPoint.readinessScore >= 75
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              }`}>
                Dia {selectedDayNum}
              </span>
            </div>
            <div className="my-1.5 flex items-baseline justify-between gap-2">
              <strong className="text-lg sm:text-2xl font-mono font-black text-cyan-400">
                {analyticsData.currentDayPoint.readinessScore}%
              </strong>
              <span className="text-[11px] font-mono text-slate-400">
                Média: {analyticsData.avgReadiness}%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 truncate block">
              Perfil Radar: <strong className="text-amber-300">Foco {analyticsData.weakestCapability.label}</strong>
            </span>
          </div>

          <div
            onClick={() => setActiveTab('STRATEGY')}
            className="cursor-pointer bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 hover:border-purple-400/40 rounded-2xl p-3.5 sm:p-4 shadow-lg flex flex-col justify-between transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Vel. GRP &amp; Roxzone
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                {runningZonesKmh.Z3} km/h
              </span>
            </div>
            <div className="my-1.5 flex items-baseline justify-between gap-2">
              <strong className="text-lg sm:text-2xl font-mono font-black text-white">
                {goalPace}<span className="text-xs text-slate-400 font-normal">/km</span>
              </strong>
              <span className="text-xs font-mono font-bold text-purple-300">
                {stats.confirmedDistanceKm} km conf.
              </span>
            </div>
            <span className="text-[10px] text-slate-400 truncate block">
              Média Confirmada: <strong className="text-yellow-400">{stats.avgConfirmedSpeedKmh} km/h ({stats.avgConfirmedPaceStr}/km)</strong>
            </span>
          </div>
        </div>
        {/* ==========================================
            ABA 1: VISUALIZAR O TREINO DO DIA
        ========================================== */}
        {activeTab === 'TODAY' && (
          <div className="space-y-6">
            {/* SELETOR HORIZONTAL RÁPIDO DE DIAS (1 A 26) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-lg">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Linha Temporal de 26 Dias (Clique para navegar)
                </span>
                <span className="text-xs text-slate-400">
                  Progresso Geral: <strong className="text-yellow-400">{stats.doneCount}/26 treinos</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1">
                {WORKOUT_DAYS.map((d) => {
                  const isSelected = d.dayNum === selectedDayNum;
                  const isDone = !!completedDays[d.dayNum];
                  const isRace = d.category === 'RACE_DAY';
                  return (
                    <button
                      key={d.dayNum}
                      onClick={() => setSelectedDayNum(d.dayNum)}
                      className={`flex flex-col items-center justify-center min-w-[54px] py-2 px-1.5 rounded-xl border text-xs transition-all shrink-0 ${
                        isSelected
                          ? 'bg-yellow-400 text-slate-950 border-yellow-300 font-black scale-105 shadow-md shadow-yellow-400/20'
                          : isDone
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/50'
                          : isRace
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] opacity-75">D{d.dayNum}</span>
                      <span className="font-bold">{d.date}</span>
                      <div className="mt-1">
                        {isDone ? (
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                        ) : (
                          <span className={`block w-2 h-2 rounded-full ${
                            d.loadIndex >= 8 ? 'bg-rose-500' : d.loadIndex >= 5 ? 'bg-amber-400' : d.loadIndex > 0 ? 'bg-emerald-400' : 'bg-slate-600'
                          }`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BANNER DO MICROCICLO ATUAL */}
            <div className={`bg-gradient-to-r ${currentMicrocycle.color} rounded-2xl p-4 sm:p-5 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4`}>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-black/25 w-fit px-2.5 py-1 rounded-full mb-1.5">
                  <span>{currentMicrocycle.dates}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black">{currentMicrocycle.title}</h2>
                <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-3xl">{currentMicrocycle.focus}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 bg-black/25 p-3 rounded-xl border border-white/15">
                <div className="text-center px-2">
                  <span className="text-[11px] uppercase block opacity-80">Volume Rel.</span>
                  <span className="text-xl font-black">{currentMicrocycle.volumeRel}%</span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center px-2">
                  <span className="text-[11px] uppercase block opacity-80">Intensidade</span>
                  <span className="text-xl font-black">{currentMicrocycle.intensitySpec}%</span>
                </div>
              </div>
            </div>

            {/* GRID PRINCIPAL DO TREINO DO DIA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* COLUNA ESQUERDA (2/3): PRESCRIÇÃO COMPLETA DO TREINO */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
                  {/* Cabeçalho do Card de Treino */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                          Dia {currentWorkout.dayNum} de 26 • {currentWorkout.date} ({currentWorkout.weekday})
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${getCategoryBadge(currentWorkout.category).bg}`}>
                          {getCategoryBadge(currentWorkout.category).label}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        {currentWorkout.type}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedDayNum((prev) => Math.max(1, prev - 1))}
                        disabled={selectedDayNum === 1}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700"
                        title="Dia Anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleDayCompletion(currentWorkout.dayNum)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                          completedDays[currentWorkout.dayNum]
                            ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                            : 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-lg shadow-yellow-400/20'
                        }`}
                      >
                        {completedDays[currentWorkout.dayNum] ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Treino Concluído</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4" />
                            <span>Marcar Concluído</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedDayNum((prev) => Math.min(26, prev + 1))}
                        disabled={selectedDayNum === 26}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700"
                        title="Próximo Dia"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Métricas Alvo da Sessão */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
                    <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 uppercase block">Volume Total</span>
                      <span className="text-sm font-bold text-white mt-0.5 block">{currentWorkout.volumeDesc}</span>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 uppercase block">Zona Alvo</span>
                      <span className="text-sm font-bold text-cyan-400 mt-0.5 block">{currentWorkout.targetZone}</span>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 uppercase block">Perceção (RPE Borg)</span>
                      <span className="text-sm font-bold text-amber-400 mt-0.5 block">{currentWorkout.targetRPE}</span>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 uppercase block">Stress Fisiológico</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-black text-rose-400">{currentWorkout.loadIndex}/10</span>
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500"
                            style={{ width: `${currentWorkout.loadIndex * 10}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MATRIZ EDITÁVEL DAS 5 ZONAS DE CORRIDA (VELOCIDADE km/h <-> PACE min/km) SINCRONIZADA */}
                  <div className="mb-5 bg-slate-950/90 border border-cyan-500/35 rounded-xl p-4 space-y-3 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800/90">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-white block">
                            Zonas de Corrida Editáveis (Velocidade km/h &amp; Pace /km)
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {currentPrescribedZoneKey !== 'REST' ? (
                              <>
                                Zona Prescrita Hoje:{' '}
                                <strong className="text-yellow-400">
                                  {RUNNING_ZONES_META[currentPrescribedZoneKey]?.name} ({runningZonesKmh[currentPrescribedZoneKey]} km/h • {kmhToPaceStr(runningZonesKmh[currentPrescribedZoneKey])}/km)
                                </strong>
                              </>
                            ) : (
                              'Dia de Descanso Absoluto (Referência Z1 Regenerativa ativa)'
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {currentPrescribedZoneKey !== 'REST' && (
                          <button
                            onClick={() => handleDayZoneChange(currentWorkout.dayNum, currentPrescribedZoneKey)}
                            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all"
                            title="Preencher o registo de hoje com a velocidade exata da Zona Prescrita"
                          >
                            Usar Zona Prescrita ({currentPrescribedZoneKey}: {runningZonesKmh[currentPrescribedZoneKey]} km/h)
                          </button>
                        )}
                        <button
                          onClick={recalibrateAllZonesFromGRP}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 hover:border-yellow-400/50 hover:text-yellow-300 transition-all"
                          title="Recalibrar automaticamente Z1 a Z5 com base no Pace GRP (Z3)"
                        >
                          Recalibrar Z1–Z5 pelo GRP
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                      {Object.values(RUNNING_ZONES_META).map((zMeta) => {
                        const zKmh = runningZonesKmh[zMeta.id] || 12.0;
                        const zPace = kmhToPaceStr(zKmh);
                        const isPrescribed = currentPrescribedZoneKey === zMeta.id;
                        const isUsedToday = currentLog.usedZone === zMeta.id;
                        return (
                          <div
                            key={zMeta.id}
                            className={`rounded-xl p-2.5 border transition-all flex flex-col justify-between gap-2 ${
                              isPrescribed
                                ? 'bg-yellow-400/10 border-yellow-400 shadow-md shadow-yellow-400/10'
                                : isUsedToday
                                ? 'bg-cyan-500/10 border-cyan-400/60'
                                : 'bg-slate-900/80 border-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-black text-white">{zMeta.short}</span>
                              {isPrescribed && (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-yellow-400 text-slate-950">
                                  Prescrita
                                </span>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                                <span className="text-[10px] text-slate-400 font-bold">Vel:</span>
                                <div className="flex items-center gap-0.5">
                                  <input
                                    type="number"
                                    step="0.1"
                                    min="4"
                                    max="25"
                                    value={zKmh}
                                    onChange={(e) => handleZoneSpeedChange(zMeta.id, e.target.value)}
                                    className="w-12 bg-transparent text-yellow-400 font-mono font-black text-xs text-right focus:outline-none"
                                  />
                                  <span className="text-[10px] text-slate-400 font-mono">km/h</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800/80">
                                <span className="text-[10px] text-slate-400">Pace:</span>
                                <span className="text-[11px] font-mono font-bold text-cyan-300">{zPace}/km</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDayZoneChange(currentWorkout.dayNum, zMeta.id)}
                              className={`w-full py-1 rounded-lg text-[10px] font-bold transition-all ${
                                isUsedToday
                                  ? 'bg-emerald-500 text-slate-950 font-black'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                            >
                              {isUsedToday ? `✓ Usada Hoje (${zKmh} km/h)` : `Usar ${zMeta.id} Hoje`}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card do Núcleo Vital de Pareto (Regra 80/20 da Sessão - US1) */}
                  <div className="mb-5 bg-slate-950 border border-yellow-500/30 rounded-xl p-4 shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-yellow-400 text-slate-950">
                          Princípio de Pareto 80/20
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${currentParetoDirective.meta.badgeClass}`}>
                          {currentParetoDirective.meta.label}
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('LOAD')}
                        className="text-[11px] text-slate-400 hover:text-yellow-400 underline font-semibold"
                      >
                        Auditoria 80/20 ({stats.actualAerobicRatioPct}% Aeróbico) →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-emerald-950/25 border border-emerald-800/40 rounded-lg p-3">
                        <span className="font-extrabold uppercase text-emerald-400 block mb-1">
                          ✓ O 20% Vital de Hoje (80% do Retorno):
                        </span>
                        <p className="text-slate-200 leading-relaxed">
                          {currentParetoDirective.vital20Focus}
                        </p>
                      </div>
                      <div className="bg-rose-950/25 border border-rose-800/40 rounded-lg p-3">
                        <span className="font-extrabold uppercase text-rose-400 block mb-1">
                          ✕ Armadilha de Fadiga a Evitar (Desperdício):
                        </span>
                        <p className="text-slate-200 leading-relaxed">
                          {currentParetoDirective.avoidTrap}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Blocos Detalhados de Exercícios */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-yellow-400" />
                      Estrutura Detalhada da Sessão (Séries, Repetições, Descansos e Cargas)
                    </h4>

                    {currentWorkout.blocks.map((block, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-extrabold text-yellow-400 uppercase tracking-wide">
                            {idx + 1}. {block.name}
                          </span>
                          {block.overload && block.overload > 1 && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              Overload Mecânico (+10% a +15% RW)
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                          {block.details}
                        </p>

                        {/* Prescrição Calculada via 1RM e Percentagem Editável nos Blocos de Força */}
                        {block.strengthPrescriptions && block.strengthPrescriptions.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-800/80">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                              <span className="text-[11px] font-bold uppercase text-amber-400 flex items-center gap-1.5">
                                <Dumbbell className="w-3.5 h-3.5" />
                                Prescrição Dinâmica por Porcentagem de 1RM (Editável):
                              </span>
                              <button
                                onClick={() => setActiveTab('STRENGTH_RM')}
                                className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-semibold"
                              >
                                Gerir 1RMs & Diagnóstico Strength Floor →
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {block.strengthPrescriptions.map((sp, spIdx) => {
                                const pctKey = `${sp.exId}_d${currentWorkout.dayNum}`;
                                const currentPct = customPcts[pctKey] !== undefined ? customPcts[pctKey] : sp.defaultPct;
                                const userRM = oneRMs[sp.exId] || 0;
                                const calculatedKg = Math.round(userRM * currentPct);
                                const protectionInfo = STRENGTH_STATION_PROTECTION_MAP[sp.exId];

                                return (
                                  <div
                                    key={spIdx}
                                    className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 flex flex-col justify-between gap-2.5"
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div>
                                        <span className="text-xs font-extrabold text-white block">
                                          {sp.name}
                                        </span>
                                        <span className="text-[11px] text-slate-400 font-medium">
                                          {sp.sets}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-700">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold">1RM:</span>
                                        <input
                                          type="number"
                                          value={userRM}
                                          onChange={(e) => handleOneRMChange(sp.exId, e.target.value)}
                                          className="w-12 bg-transparent text-amber-400 font-mono font-bold text-xs text-right focus:outline-none"
                                        />
                                        <span className="text-[10px] text-slate-500">kg</span>
                                      </div>
                                    </div>

                                    {/* Controlo Editável da Porcentagem Exata */}
                                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                                      <span className="text-[11px] text-slate-300 font-medium">Porcentagem Alvo:</span>
                                      <div className="flex items-center gap-1">
                                        <input
                                          type="number"
                                          step="1"
                                          min="20"
                                          max="100"
                                          value={Math.round(currentPct * 100)}
                                          onChange={(e) => handlePctChange(pctKey, e.target.value)}
                                          className="w-12 bg-slate-900 text-yellow-400 font-mono font-bold text-xs text-center rounded px-1 py-0.5 border border-slate-700 focus:outline-none focus:border-yellow-400"
                                        />
                                        <span className="text-[11px] text-yellow-400 font-bold">%</span>
                                      </div>
                                    </div>

                                    {protectionInfo && (
                                      <div className="bg-slate-950/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px]">
                                        <span className="text-amber-300 font-bold block">
                                          Protege: {protectionInfo.stations}
                                        </span>
                                        <span className="text-slate-400 block mt-0.5">
                                          {protectionInfo.tip}
                                        </span>
                                      </div>
                                    )}

                                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                                      <span className="text-[10px] text-slate-400">{sp.targetRIR}</span>
                                      <span className="text-sm font-mono font-black text-emerald-400 bg-emerald-950/50 px-2.5 py-0.5 rounded border border-emerald-500/30">
                                        Carga: {calculatedKg} kg
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Mostrador Automático de Cargas Oficiais da Divisão Selecionada */}
                        {block.usesRW && block.usesRW.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2.5">
                            <div className="flex flex-wrap gap-2">
                              {block.usesRW.includes('sledPush') && (
                                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-300 border border-yellow-500/30">
                                  Sled Push: {currentDivision.sledPush} kg (100% RW)
                                </span>
                              )}
                              {block.usesRW.includes('sledPull') && (
                                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30">
                                  Sled Pull: {currentDivision.sledPull} kg (100% RW)
                                </span>
                              )}
                              {block.usesRW.includes('farmersCarry') && (
                                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                                  Farmer's Carry: 2x {currentDivision.farmersCarry} kg
                                </span>
                              )}
                              {block.usesRW.includes('sandbagLunges') && (
                                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30">
                                  Sandbag Lunges: {currentDivision.sandbagLunges} kg
                                </span>
                              )}
                              {block.usesRW.includes('wallBalls') && (
                                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30">
                                  Wall Balls: {currentDivision.wallBallsWeight} kg (Alvo {currentDivision.wallBallsTarget})
                                </span>
                              )}
                            </div>

                            {/* Plano de Fracionamento Preventivo Sincronizado (US4) */}
                            {(block.usesRW.includes('sandbagLunges') || block.usesRW.includes('wallBalls')) && (
                              <div className="bg-purple-950/25 border border-purple-500/30 rounded-xl p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="space-y-1">
                                  <span className="text-[11px] font-black uppercase text-purple-300 block">
                                    Pareto Anti-Falha • Plano Ativo: {activeFractionation.name}
                                  </span>
                                  {block.usesRW.includes('wallBalls') && (
                                    <p className="text-slate-200 font-mono text-[11px]">
                                      <strong>Wall Balls (100 reps):</strong> [{activeFractionation.wallBallsSets}] • Pausa: {activeFractionation.wallBallsRestBreaths}
                                    </p>
                                  )}
                                  {block.usesRW.includes('sandbagLunges') && (
                                    <p className="text-slate-200 font-mono text-[11px]">
                                      <strong>Sandbag Lunges (100m):</strong> {activeFractionation.lungesStrategy} ({activeFractionation.lungesRestBreaths})
                                    </p>
                                  )}
                                </div>
                                <button
                                  onClick={() => setActiveTab('STRATEGY')}
                                  className="text-[11px] font-bold text-purple-300 hover:text-purple-200 underline shrink-0 self-start sm:self-center"
                                >
                                  Alterar Fracionamento →
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Diretriz Fisiológica & Biomecânica do Dia */}
                  <div className="mt-5 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                        Foco Tático & Fisiológico da Sessão
                      </span>
                      <p className="text-xs sm:text-sm text-amber-100/90 mt-1 leading-relaxed">
                        {currentWorkout.coachTip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUNA DIREITA (1/3): DIÁRIO DE CARGA (sRPE), TIMER E NUTRIÇÃO DO DIA */}
              <div className="space-y-6">
                {/* REGISTO DE CONTROLE DE CARGA & VELOCIDADE REAL DA CORRIDA DO DIA */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-rose-400" />
                      Carga &amp; Velocidade Real
                    </h4>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-yellow-400 font-bold">
                      sRPE: {(currentLog.rpe || 0) * (currentLog.duration || 0)} UA
                    </span>
                  </div>

                  {saveConfirmBanner && (
                    <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>{saveConfirmBanner}</span>
                    </div>
                  )}

                  <div className="space-y-3.5 text-xs">
                    {/* Seletor de Zona Executada & Velocidade Usada na Corrida */}
                    <div className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-3 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase text-cyan-300">
                          Zona de Corrida Executada Hoje:
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Prescrita: <strong className="text-yellow-400">{currentPrescribedZoneKey}</strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1">
                        {Object.values(RUNNING_ZONES_META).map((z) => {
                          const activeZone = currentLog.usedZone === z.id;
                          return (
                            <button
                              key={z.id}
                              type="button"
                              onClick={() => handleDayZoneChange(currentWorkout.dayNum, z.id)}
                              className={`py-1.5 rounded-lg font-mono font-bold text-[11px] border transition-all ${
                                activeZone
                                  ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow'
                                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              {z.id}
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Vel. Usada (km/h):</label>
                          <input
                            type="number"
                            step="0.1"
                            min="3.5"
                            max="25"
                            value={currentLog.usedSpeedKmh}
                            onChange={(e) => handleDaySpeedKmhChange(currentWorkout.dayNum, e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-yellow-400 font-mono font-black text-center focus:outline-none focus:border-yellow-400"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Pace Real (/km):</label>
                          <input
                            type="text"
                            value={currentLog.usedPace || kmhToPaceStr(currentLog.usedSpeedKmh)}
                            onChange={(e) => handleDayPaceChange(currentWorkout.dayNum, e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-cyan-300 font-mono font-bold text-center focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Distância (km):</label>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="30"
                            value={currentLog.distanceKm}
                            onChange={(e) => handleLogChange(currentWorkout.dayNum, 'distanceKm', parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-emerald-300 font-mono font-bold text-center focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-slate-300 font-semibold">
                          RPE Real Sentido (Escala de Borg 6 a 20):
                        </label>
                        <span className="font-mono font-bold text-yellow-400">{currentLog.rpe} / 20</span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="20"
                        value={currentLog.rpe}
                        onChange={(e) => handleLogChange(currentWorkout.dayNum, 'rpe', parseInt(e.target.value, 10))}
                        className="w-full accent-yellow-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                        <span>6 (Repouso)</span>
                        <span>12 (Zona 2)</span>
                        <span>16 (Limiar)</span>
                        <span>20 (Exaustão)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Duração Real (min):</label>
                        <input
                          type="number"
                          value={currentLog.duration}
                          onChange={(e) => handleLogChange(currentWorkout.dayNum, 'duration', parseInt(e.target.value, 10) || 0)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-yellow-400"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">FC Basal Matinal (bpm):</label>
                        <input
                          type="number"
                          placeholder="Ex: 52"
                          value={currentLog.morningHR}
                          onChange={(e) => handleLogChange(currentWorkout.dayNum, 'morningHR', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Parciais / Notas de Transição e Fadiga:</label>
                      <textarea
                        rows="2"
                        placeholder="Registe parciais de 1km, velocidade nos intervalos, tempo nos trenós..."
                        value={currentLog.notes}
                        onChange={(e) => handleLogChange(currentWorkout.dayNum, 'notes', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-yellow-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleConfirmAndSaveDay(currentWorkout.dayNum)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-wide text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>✓ Salvar &amp; Confirmar Dados do Dia {currentWorkout.dayNum}</span>
                    </button>
                  </div>
                </div>

                {/* CRONÓMETRO TÁTICO DE ROXZONE / EMOM (Integrado com Protocolo 3 Passos - US3 & Wake Lock - US2) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                      <Timer className="w-4 h-4 text-cyan-400" />
                      Cronómetro EMOM &amp; Roxzone
                    </h4>
                    <div className="flex items-center gap-1.5">
                      {timerRunning && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                          wakeLockActive
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          <Smartphone className="w-3 h-3" />
                          {wakeLockActive ? 'Ecrã Ativo (Wake Lock)' : 'Timer Ativo'}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/50">
                        Meta Roxzone: {roxzoneSim.secPerPassage}s
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <span className={`text-3xl font-mono font-black tracking-wider ${
                        timerRunning && timerSeconds <= roxzoneSim.secPerPassage
                          ? 'text-emerald-400'
                          : timerRunning
                          ? 'text-amber-400'
                          : 'text-white'
                      }`}>
                        {formatTimer(timerSeconds)}
                      </span>
                      {timerRunning && (
                        <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                          {timerSeconds <= roxzoneSim.secPerPassage
                            ? `Janela 3 Passos Ativa (${roxzoneSim.secPerPassage - timerSeconds}s restantes)`
                            : 'Acima da meta de transição Roxzone'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className={`p-2.5 rounded-xl font-bold ${
                          timerRunning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                        }`}
                        title={timerRunning ? 'Pausar' : 'Iniciar'}
                      >
                        {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => { setTimerSeconds(0); setTimerRunning(true); }}
                        className="px-2.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-[11px] font-bold"
                        title="Reiniciar e Testar Transição de 3 Passos"
                      >
                        3 Passos
                      </button>
                      <button
                        onClick={() => { setTimerRunning(false); setTimerSeconds(0); }}
                        className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                        title="Zerar"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Protocolo: 3 passos + 1 ciclo nasal/bucal → trote</span>
                    <button
                      onClick={() => setActiveTab('STRATEGY')}
                      className="text-cyan-400 hover:underline font-semibold"
                    >
                      Simular 16x →
                    </button>
                  </div>
                </div>

                {/* RESUMO NUTRICIONAL DO DIA */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 mb-3">
                    <Utensils className="w-4 h-4 text-emerald-400" />
                    Meta Nutricional Hoje ({athleteWeight} kg)
                  </h4>
                  <div className="text-xs space-y-2.5">
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 font-semibold">
                      {dailyNutrition.title}
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Hidratos de Carbono ({dailyNutrition.carbsPerKg}):</span>
                      <span className="font-mono font-bold text-white">{dailyNutrition.carbsGrams}/dia</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Proteína (1,6 a 2,2 g/kg):</span>
                      <span className="font-mono font-bold text-white">{dailyNutrition.proteinGrams}/dia</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Pré-Treino (2-3h antes):</span>
                      <span className="font-mono text-slate-200">{dailyNutrition.preWorkoutCarbs}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Hidratação + Creatina:</span>
                      <span className="font-mono text-cyan-300">3-4L Água + 5g Creatina</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            ABA NOVA: CONFIGURAÇÃO E CALCULADORA DE 1RM (FORÇA)
        ========================================== */}
        {activeTab === 'STRENGTH_RM' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tabela de Inputs de 1RM dos Exercícios do Ciclo */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-yellow-400" />
                      Perfil de Força Máxima (1RM) para Prescrição Automática
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Insira o seu 1RM (1 Repetição Máxima) em cada exercício. Os treinos de força dos 4 microciclos atualizarão os pesos automaticamente.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  {Object.values(STRENGTH_EXERCISES).map((ex) => {
                    const rm = oneRMs[ex.id] || 0;
                    return (
                      <div
                        key={ex.id}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-bold text-white">{ex.name}</h4>
                            <span className="text-[11px] text-slate-400">{ex.note}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-700 focus-within:border-yellow-400">
                            <input
                              type="number"
                              value={rm}
                              onChange={(e) => handleOneRMChange(ex.id, e.target.value)}
                              className="w-16 bg-transparent text-yellow-400 font-mono font-black text-base text-right focus:outline-none"
                            />
                            <span className="text-xs text-slate-400 font-mono">{ex.unit}</span>
                          </div>
                        </div>

                        {/* Zonas Rápidas de Percentagem do Exercício */}
                        <div className="grid grid-cols-4 gap-1.5 pt-2.5 border-t border-slate-800/80 text-center font-mono text-[11px]">
                          <div className="bg-slate-900/90 py-1 px-1 rounded border border-slate-800">
                            <span className="block text-[9px] text-slate-500">60% (Tapering)</span>
                            <strong className="text-emerald-400">{Math.round(rm * 0.6)}kg</strong>
                          </div>
                          <div className="bg-slate-900/90 py-1 px-1 rounded border border-slate-800">
                            <span className="block text-[9px] text-slate-500">70% (10 reps)</span>
                            <strong className="text-cyan-400">{Math.round(rm * 0.7)}kg</strong>
                          </div>
                          <div className="bg-slate-900/90 py-1 px-1 rounded border border-slate-800">
                            <span className="block text-[9px] text-slate-500">75% (8 reps)</span>
                            <strong className="text-amber-400">{Math.round(rm * 0.75)}kg</strong>
                          </div>
                          <div className="bg-slate-900/90 py-1 px-1 rounded border border-slate-800">
                            <span className="block text-[9px] text-slate-500">80% (5 reps)</span>
                            <strong className="text-rose-400">{Math.round(rm * 0.8)}kg</strong>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coluna Direita: Calculadora de Estimativa de 1RM (Fórmula de Epley) */}
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <h4 className="text-sm font-black uppercase tracking-wider text-yellow-400 mb-1 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Não sabe o seu 1RM exato?
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Estime o seu 1RM a partir de uma série submáxima (Fórmula Científica de Epley) e aplique ao exercício desejado.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Escolha o Exercício:</label>
                      <select
                        value={calcTargetEx}
                        onChange={(e) => setCalcTargetEx(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-yellow-400"
                      >
                        {Object.values(STRENGTH_EXERCISES).map((ex) => (
                          <option key={ex.id} value={ex.id}>{ex.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Peso Levantado (kg):</label>
                        <input
                          type="number"
                          value={calcWeight}
                          onChange={(e) => setCalcWeight(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-yellow-400"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Repetições Feitas:</label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={calcReps}
                          onChange={(e) => setCalcReps(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-yellow-400"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center my-3">
                      <span className="text-[11px] uppercase text-slate-400 block">1RM Estimado (Epley)</span>
                      <span className="text-3xl font-mono font-black text-emerald-400 block mt-0.5">
                        {estimatedEpley1RM} kg
                      </span>
                    </div>

                    <button
                      onClick={() => handleOneRMChange(calcTargetEx, estimatedEpley1RM)}
                      className="w-full py-2.5 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-yellow-400/20"
                    >
                      Salvar {estimatedEpley1RM} kg em {STRENGTH_EXERCISES[calcTargetEx].name}
                    </button>
                  </div>
                </div>

                {/* Resumo da Progressão de Força nos 26 Dias */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                    Como a Periodização Usa o seu 1RM:
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li>
                      • <strong className="text-white">Dia 1 (10/11 - Base):</strong> 75-80% 1RM no Back Squat (4x8) e 70-75% no RDL (4x10) para proteger o seu <em>Strength Floor</em>.
                    </li>
                    <li>
                      • <strong className="text-white">Dia 8 (17/11 - Sobrecarga Unilateral):</strong> 75-80% no Bulgarian Split Squat e 70-75% no Walking Lunge.
                    </li>
                    <li>
                      • <strong className="text-white">Dia 15 (24/11 - Força Neural):</strong> Cravado em <strong>80% 1RM</strong> (3x5 reps) com velocidade concêntrica máxima e corte de dano excêntrico.
                    </li>
                    <li>
                      • <strong className="text-white">Dia 21 (30/11 - Tapering):</strong> ~55-60% 1RM (70% da carga habitual de 8 reps) para ativação neural sem induzir dor muscular tardia (DOMS) na semana da prova.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* MATRIZ DE DIAGNÓSTICO DO PISO DE FORÇA (PARETO 20% STRENGTH FLOOR - US2) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                      Pareto Frente 2 (20% Força)
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase">
                      Diagnóstico do Piso de Força (Strength Floor) vs. Divisão {currentDivision.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Se a sua força relativa for baixa, a estação deixa de ser um esforço metabólico controlado e torna-se um evento de sobrevivência que destrói o SNC.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono shrink-0">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Protegido
                  </span>
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Limiar
                  </span>
                  <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Alerta SNC
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {strengthFloorDiagnostics.map((diag) => (
                  <div
                    key={diag.stationId}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-sm font-black text-white">{diag.stationName}</h4>
                          <span className="text-xs font-mono text-yellow-400 font-bold">
                            Carga Oficial: {diag.officialLoadDesc}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border text-right ${diag.badgeClass}`}>
                          {diag.statusLabel}
                        </span>
                      </div>

                      <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 text-xs space-y-1.5 my-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Âncora ({diag.anchorExerciseName}):</span>
                          <strong className="font-mono text-white">{diag.athleteAnchor1RM} kg</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Alvo Piso Protegido:</span>
                          <strong className="font-mono text-emerald-400">&ge; {diag.targetSafe1RM} kg</strong>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full transition-all ${diag.barColor}`}
                            style={{ width: `${diag.reservePct}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mt-2">
                        {diag.recommendation}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Sessões Chave (20%):</span>
                      <span className="font-mono font-bold text-amber-300">{diag.keyDays}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            ABA 2: CALENDÁRIO COMPLETO DOS 4 MICROCICLOS
        ========================================== */}
        {activeTab === 'CALENDAR' && (
          <div className="space-y-8">
            {MICROCYCLES.map((mc) => {
              const mcDays = WORKOUT_DAYS.filter((d) => d.microcycle === mc.id);
              return (
                <div key={mc.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className={`bg-gradient-to-r ${mc.color} p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-black/25 px-2.5 py-0.5 rounded-full">
                        {mc.dates}
                      </span>
                      <h3 className="text-lg font-black mt-1">{mc.title}</h3>
                      <p className="text-xs text-white/90">{mc.focus}</p>
                    </div>
                    <div className="flex gap-4 text-xs font-mono bg-black/25 px-3.5 py-2 rounded-xl shrink-0">
                      <div>
                        <span className="block opacity-75">VOLUME</span>
                        <strong className="text-base">{mc.volumeRel}%</strong>
                      </div>
                      <div>
                        <span className="block opacity-75">INTENSIDADE</span>
                        <strong className="text-base">{mc.intensitySpec}%</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {mcDays.map((day) => {
                      const isDone = !!completedDays[day.dayNum];
                      const badge = getCategoryBadge(day.category);
                      return (
                        <div
                          key={day.dayNum}
                          onClick={() => {
                            setSelectedDayNum(day.dayNum);
                            setActiveTab('TODAY');
                          }}
                          className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${
                            isDone
                              ? 'bg-emerald-950/20 border-emerald-700/50 hover:border-emerald-500'
                              : day.category === 'RACE_DAY'
                              ? 'bg-yellow-500/10 border-yellow-500/60 hover:border-yellow-400'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-xs font-mono font-bold text-slate-400">
                                Dia {day.dayNum} • {day.date} ({day.weekday.split('-')[0]})
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleDayCompletion(day.dayNum);
                                }}
                                className="text-slate-400 hover:text-emerald-400"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : (
                                  <Circle className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border mb-2 ${badge.bg}`}>
                              {badge.label}
                            </span>
                            <h4 className="text-sm font-bold text-white leading-snug mb-1.5">
                              {day.type}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-2">
                              {day.volumeDesc}
                            </p>
                          </div>

                          <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">{day.targetRPE.split('|')[0]}</span>
                            <span className="font-mono font-bold text-yellow-400">
                              Carga {day.loadIndex}/10
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ==========================================
            ABA 3: CONTROLE DE CARGA, ONDULAÇÃO E PRONTIDÃO
        ========================================== */}
        {activeTab === 'LOAD' && (
          <div className="space-y-6">
            {/* BARRA EXECUTIVA DE FIDELIDADE DE DADOS SALVOS & CALIBRAÇÃO RÁPIDA DE ZONAS (Z1-Z5 km/h) */}
            <div className="bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-400 text-slate-950">
                      Motor de Dados Fidedignos &amp; Sincronizados
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                      {stats.doneCount}/26 Treinos Confirmados • {stats.confirmedDistanceKm} km • Média {stats.avgConfirmedSpeedKmh} km/h
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white uppercase">
                    Fonte dos 7 Gráficos: Sincronização Total (Treinos Salvos + Zonas Z1–Z5 + 1RMs)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Escolha se os gráficos devem exibir <strong>estritamente os treinos já salvos/confirmados</strong> ou a projeção combinada com o plano de 26 dias.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
                  <button
                    onClick={() => setAnalyticsScope('CONFIRMED_ONLY')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      analyticsScope === 'CONFIRMED_ONLY'
                        ? 'bg-emerald-400 text-slate-950 shadow font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ✓ Apenas Dados Salvos &amp; Confirmados (Fidedigno)
                  </button>
                  <button
                    onClick={() => setAnalyticsScope('ALL_WITH_PLANNED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      analyticsScope === 'ALL_WITH_PLANNED'
                        ? 'bg-yellow-400 text-slate-950 shadow font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Confirmados + Planeado (26 Dias)
                  </button>
                </div>
              </div>

              {/* Calibração Rápida de Velocidade (km/h) das 5 Zonas de Corrida diretamente nos Gráficos */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {Object.values(RUNNING_ZONES_META).map((z) => {
                  const zKmh = runningZonesKmh[z.id] || 12.0;
                  return (
                    <div key={z.id} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-black text-white block">{z.short}</span>
                        <span className="text-[10px] font-mono text-cyan-300">{kmhToPaceStr(zKmh)}/km</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                        <input
                          type="number"
                          step="0.1"
                          min="4"
                          max="25"
                          value={zKmh}
                          onChange={(e) => handleZoneSpeedChange(z.id, e.target.value)}
                          className="w-11 bg-transparent text-yellow-400 font-mono font-black text-xs text-right focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-400 font-mono">km/h</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cards Superiores de Carga */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 uppercase font-bold">Aderência &amp; Distância Confirmada</span>
                <div className="text-3xl font-black text-yellow-400 mt-1">
                  {stats.doneCount} / {stats.totalDays} <span className="text-base font-normal text-slate-400">dias ({stats.progressPct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mt-2.5">
                  <div className="h-full bg-yellow-400" style={{ width: `${stats.progressPct}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  Corrida Confirmada: <strong className="text-emerald-400">{stats.confirmedDistanceKm} km</strong> / {stats.plannedDistanceKm} km
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 uppercase font-bold">Carga Interna Confirmada (sRPE)</span>
                <div className="text-3xl font-black text-cyan-400 mt-1">
                  {stats.loggedLoadUnits.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ {stats.plannedLoadUnits.toLocaleString()} UA</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Calculado pelos treinos salvos/confirmados (RPE Real × Duração Real).
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-xs text-slate-400 uppercase font-bold">Velocidade Média Confirmada vs. GRP</span>
                <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                  {stats.avgConfirmedSpeedKmh} km/h <span className="text-sm font-normal text-slate-400">({stats.avgConfirmedPaceStr}/km)</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Alvo GRP (Z3): <strong className="text-white">{runningZonesKmh.Z3} km/h ({goalPace}/km)</strong> • Z4 Limiar: <strong className="text-amber-300">{runningZonesKmh.Z4} km/h</strong>
                </p>
              </div>
            </div>

            {/* =====================================================================
                GRÁFICO 7 (DESTAQUE): DIAGRAMA DE PARETO 80/20 PARA EFICIÊNCIA DE EXERCÍCIOS (US5 - T007)
            ===================================================================== */}
            <div className="bg-slate-900/95 border border-yellow-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded bg-yellow-400 text-slate-950">
                      Diagrama de Pareto 80/20 • Seleção &amp; Eficiência de Treino
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {analyticsData.vital80Exercises.length} de 10 segmentos = 80% do impacto
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight">
                    Gráfico de Pareto para Eficiência de Exercícios (Fadiga Acumulada &amp; Tempo Perdido)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    O Eixo X ordena as estações/corrida do maior para o menor impacto; a Linha Acumulada (Eixo Y direito) isola os exercícios que concentram <strong>80% do seu desgaste ou tempo perdido</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0 self-start lg:self-center">
                  <button
                    onClick={() => setParetoMetric('FATIGUE')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      paretoMetric === 'FATIGUE'
                        ? 'bg-yellow-400 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Fadiga / Esforço Acumulado
                  </button>
                  <button
                    onClick={() => setParetoMetric('TIME_LOSS')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      paretoMetric === 'TIME_LOSS'
                        ? 'bg-cyan-400 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tempo Perdido na Prova (s)
                  </button>
                </div>
              </div>

              {/* SVG do Gráfico de Pareto (Barras Decrescentes + Curva Acumulada 0-100% + Corte 80%) */}
              <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-3 sm:p-4">
                {(() => {
                  const items = analyticsData.paretoItems;
                  const maxVal = Math.max(1, items[0]?.value || 100);
                  const chartW = 760;
                  const chartH = 270;
                  const padL = 46;
                  const padR = 48;
                  const padT = 24;
                  const padB = 54;
                  const plotW = chartW - padL - padR;
                  const plotH = chartH - padT - padB;
                  const slotW = plotW / items.length;
                  const barW = Math.min(44, slotW * 0.62);
                  const y80 = padT + plotH * (1 - 0.8);

                  const linePoints = items
                    .map((it, idx) => {
                      const cx = padL + idx * slotW + slotW / 2;
                      const cy = padT + plotH * (1 - it.cumulativePct / 100);
                      return `${cx},${cy}`;
                    })
                    .join(' ');

                  return (
                    <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto overflow-visible">
                      <defs>
                        <linearGradient id="paretoVitalGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#facc15" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.85" />
                        </linearGradient>
                        <linearGradient id="paretoTrivialGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
                          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.75" />
                        </linearGradient>
                      </defs>

                      {/* Linhas de Grelha Horizontais (0%, 25%, 50%, 75%, 100%) */}
                      {[0, 25, 50, 75, 100].map((pct) => {
                        const y = padT + plotH * (1 - pct / 100);
                        const leftVal = Math.round((maxVal * pct) / 100);
                        return (
                          <g key={pct}>
                            <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                            <text x={padL - 6} y={y + 3} textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
                              {paretoMetric === 'TIME_LOSS' ? `${leftVal}s` : leftVal}
                            </text>
                            <text x={chartW - padR + 6} y={y + 3} textAnchor="start" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                              {pct}%
                            </text>
                          </g>
                        );
                      })}

                      {/* Linha Tracejada de Corte de Pareto 80% */}
                      <line
                        x1={padL}
                        y1={y80}
                        x2={chartW - padR}
                        y2={y80}
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                      />
                      <rect x={chartW - padR - 118} y={y80 - 16} width="114" height="14" rx="4" fill="#083344" stroke="#22d3ee" strokeWidth="0.8" />
                      <text x={chartW - padR - 61} y={y80 - 6} textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="bold" fontFamily="monospace">
                        LIMIAR PARETO 80%
                      </text>

                      {/* Barras Ordenadas Decrescentemente (Eixo X) */}
                      {items.map((it, idx) => {
                        const bh = Math.max(6, (it.value / maxVal) * plotH);
                        const bx = padL + idx * slotW + (slotW - barW) / 2;
                        const by = padT + plotH - bh;
                        const cx = padL + idx * slotW + slotW / 2;
                        return (
                          <g key={it.id}>
                            <rect
                              x={bx}
                              y={by}
                              width={barW}
                              height={bh}
                              rx="5"
                              fill={it.isVital80 ? 'url(#paretoVitalGrad)' : 'url(#paretoTrivialGrad)'}
                              stroke={it.isVital80 ? '#fde047' : '#334155'}
                              strokeWidth="1"
                            />
                            <text
                              x={cx}
                              y={by - 5}
                              textAnchor="middle"
                              fill={it.isVital80 ? '#fde047' : '#94a3b8'}
                              fontSize="9.5"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              {paretoMetric === 'TIME_LOSS' ? `${it.value}s` : `${it.sharePct}%`}
                            </text>
                            <text
                              x={cx}
                              y={padT + plotH + 16}
                              textAnchor="middle"
                              fill={it.isVital80 ? '#f8fafc' : '#94a3b8'}
                              fontSize="9.5"
                              fontWeight={it.isVital80 ? 'bold' : 'normal'}
                            >
                              {it.shortName}
                            </text>
                            <text
                              x={cx}
                              y={padT + plotH + 29}
                              textAnchor="middle"
                              fill={it.isVital80 ? '#facc15' : '#64748b'}
                              fontSize="8.5"
                              fontFamily="monospace"
                            >
                              {it.isVital80 ? '★ VITAL 80%' : '20% Rest.'}
                            </text>
                          </g>
                        );
                      })}

                      {/* Curva Acumulada (Eixo Y Direito: 0% a 100%) */}
                      <polyline
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="2.8"
                        points={linePoints}
                      />
                      {items.map((it, idx) => {
                        const cx = padL + idx * slotW + slotW / 2;
                        const cy = padT + plotH * (1 - it.cumulativePct / 100);
                        return (
                          <g key={`pt-${it.id}`}>
                            <circle
                              cx={cx}
                              cy={cy}
                              r="4.5"
                              fill={it.isVital80 ? '#22d3ee' : '#0f172a'}
                              stroke="#22d3ee"
                              strokeWidth="2"
                            />
                            <text
                              x={cx}
                              y={cy - 8}
                              textAnchor="middle"
                              fill="#67e8f9"
                              fontSize="9"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              {Math.round(it.cumulativePct)}%
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  );
                })()}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-gradient-to-b from-yellow-400 to-rose-500 inline-block" />
                      <strong className="text-slate-200">Barras Douradas/Rosa:</strong> Concentram 80% do desgaste/tempo perdido (Foco Prioritário)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
                      <strong className="text-cyan-300">Linha Ciano:</strong> Percentagem Acumulada (0% → 100%)
                    </span>
                  </div>
                  <span className="font-mono text-slate-400">
                    Perfil: {currentDivision.name} • GRP {goalPace}/km • Roxzone {roxzoneSim.secPerPassage}s
                  </span>
                </div>
              </div>

              {/* Diagnóstico Automático dos Exercícios Vital 80% */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {analyticsData.vital80Exercises.slice(0, 3).map((ex, idx) => (
                  <div
                    key={ex.id}
                    className="bg-slate-950/90 border border-yellow-500/30 rounded-xl p-3.5 flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase text-yellow-400">
                        #{idx + 1} Prioridade • {ex.name}
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {ex.sharePct}% (Acum: {Math.round(ex.cumulativePct)}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ex.actionTip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* =====================================================================
                SECÇÃO 1: EVOLUÇÃO DE DESEMPENHO E CARGA (GRÁFICO DE LINHA + GRÁFICO DE ÁREA - US2 - T008/T009)
            ===================================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* GRÁFICO 1: GRÁFICO DE LINHA (LINE CHART) */}
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        1A • Gráfico de Linha (Line Chart)
                      </span>
                      <h3 className="text-base font-black text-white uppercase mt-1">
                        Evolução de Carga, Velocidade (km/h), Força &amp; Pace
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold self-start">
                      {[
                        { id: 'SRPE', label: 'Carga (sRPE)' },
                        { id: 'SPEED_KMH', label: 'Vel. (km/h)' },
                        { id: 'STRENGTH_RM', label: 'Força (%1RM)' },
                        { id: 'PACE', label: 'Pace (/km)' }
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setEvolutionMetric(m.id)}
                          className={`px-2 py-1 rounded-lg transition-all ${
                            evolutionMetric === m.id
                              ? 'bg-cyan-400 text-slate-950 font-black'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    {evolutionMetric === 'SRPE' && 'Acompanhe a sobrecarga progressiva (M1 → M2) e o Tapering (M4) comparando a Carga Confirmada/Realizada vs. Planeada (linha tracejada).'}
                    {evolutionMetric === 'SPEED_KMH' && 'Velocidade real usada na corrida (km/h) em cada dia salvo/confirmado comparada à velocidade da Zona Prescrita (Z1–Z5).'}
                    {evolutionMetric === 'STRENGTH_RM' && 'Tendência da intensidade relativa (% de 1RM e solicitação neuromuscular) ao longo das 4 semanas.'}
                    {evolutionMetric === 'PACE' && 'Evolução do ritmo específico de corrida (min/km) por sessão face ao seu Goal Race Pace (GRP).'}
                  </p>

                  {/* SVG Line Chart */}
                  <div className="mt-4 bg-slate-950/90 border border-slate-800/80 rounded-xl p-3">
                    {(() => {
                      const pts = analyticsData.evolutionSeries;
                      const chartW = 540;
                      const chartH = 210;
                      const padL = 44;
                      const padR = 18;
                      const padT = 18;
                      const padB = 34;
                      const plotW = chartW - padL - padR;
                      const plotH = chartH - padT - padB;

                      const getVal = (p) => {
                        if (evolutionMetric === 'SRPE') return p.effectiveSRPE;
                        if (evolutionMetric === 'SPEED_KMH') return p.effectiveSpeedKmh;
                        if (evolutionMetric === 'STRENGTH_RM') return analyticsScope === 'CONFIRMED_ONLY' && !p.isCompleted ? 0 : p.strengthIntensityPct;
                        return p.targetPaceSec;
                      };
                      const getPlanVal = (p) => {
                        if (evolutionMetric === 'SPEED_KMH') return p.prescribedSpeedKmh;
                        if (evolutionMetric === 'PACE') return p.prescribedPaceSec;
                        return p.plannedSRPE;
                      };

                      const maxVal = evolutionMetric === 'SRPE'
                        ? Math.max(1500, ...pts.map((p) => Math.max(p.plannedSRPE, p.effectiveSRPE)))
                        : evolutionMetric === 'SPEED_KMH'
                        ? Math.max(18, ...pts.map((p) => Math.max(p.prescribedSpeedKmh, p.usedSpeedKmh)) + 1.5)
                        : evolutionMetric === 'STRENGTH_RM'
                        ? 100
                        : Math.max(360, ...pts.map((p) => Math.max(p.targetPaceSec, p.prescribedPaceSec)));
                      const minVal = evolutionMetric === 'PACE'
                        ? Math.min(200, ...pts.map((p) => Math.min(p.targetPaceSec, p.prescribedPaceSec))) - 10
                        : 0;

                      const toX = (idx) => padL + (idx / (pts.length - 1)) * plotW;
                      const toY = (v) => padT + plotH * (1 - (v - minVal) / Math.max(1, maxVal - minVal));

                      const primaryPoly = pts.map((p, i) => `${toX(i)},${toY(getVal(p))}`).join(' ');
                      const plannedPoly = pts.map((p, i) => `${toX(i)},${toY(getPlanVal(p))}`).join(' ');

                      return (
                        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
                          {/* Grelha horizontal */}
                          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                            const y = padT + plotH * (1 - t);
                            const rawVal = minVal + t * (maxVal - minVal);
                            const label = evolutionMetric === 'PACE'
                              ? formatTimer(Math.round(rawVal))
                              : evolutionMetric === 'SPEED_KMH'
                              ? `${rawVal.toFixed(1)}`
                              : evolutionMetric === 'STRENGTH_RM'
                              ? `${Math.round(rawVal)}%`
                              : Math.round(rawVal);
                            return (
                              <g key={i}>
                                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                                <text x={padL - 6} y={y + 3} textAnchor="end" fill="#64748b" fontSize="9.5" fontFamily="monospace">
                                  {label}
                                </text>
                              </g>
                            );
                          })}

                          {/* Divisórias verticais dos 4 Microciclos */}
                          {[5, 12, 19].map((dayIdx, idx) => {
                            const x = toX(dayIdx) + plotW / 52;
                            return (
                              <line key={idx} x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#334155" strokeDasharray="4 4" />
                            );
                          })}

                          {/* Linha Planeada / Prescrita de referência */}
                          {(evolutionMetric === 'SRPE' || evolutionMetric === 'SPEED_KMH' || evolutionMetric === 'PACE') && (
                            <polyline
                              fill="none"
                              stroke="#64748b"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                              points={plannedPoly}
                            />
                          )}

                          {/* Linha Principal de Evolução */}
                          <polyline
                            fill="none"
                            stroke={
                              evolutionMetric === 'SRPE'
                                ? '#22d3ee'
                                : evolutionMetric === 'SPEED_KMH'
                                ? '#38bdf8'
                                : evolutionMetric === 'STRENGTH_RM'
                                ? '#facc15'
                                : '#34d399'
                            }
                            strokeWidth="2.5"
                            points={primaryPoly}
                          />

                          {/* Pontos interativos para cada um dos 26 dias */}
                          {pts.map((p, i) => {
                            const cx = toX(i);
                            const cy = toY(getVal(p));
                            const isSel = p.dayNum === selectedDayNum;
                            return (
                              <g
                                key={p.dayNum}
                                className="cursor-pointer"
                                onClick={() => setSelectedDayNum(p.dayNum)}
                              >
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={isSel ? 5.5 : p.isCompleted ? 4 : 2.5}
                                  fill={isSel ? '#facc15' : p.isCompleted ? '#34d399' : '#0f172a'}
                                  stroke={
                                    evolutionMetric === 'SRPE'
                                      ? '#22d3ee'
                                      : evolutionMetric === 'SPEED_KMH'
                                      ? '#38bdf8'
                                      : evolutionMetric === 'STRENGTH_RM'
                                      ? '#facc15'
                                      : '#34d399'
                                  }
                                  strokeWidth="1.8"
                                />
                                {(i % 4 === 0 || i === 25) && (
                                  <text x={cx} y={padT + plotH + 16} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                                    D{p.dayNum}
                                  </text>
                                )}
                              </g>
                            );
                          })}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>
                    D{selectedDayNum} ({analyticsData.currentDayPoint.date}):{' '}
                    <strong className="text-yellow-400">
                      Zona {analyticsData.currentDayPoint.usedZoneKey} • {analyticsData.currentDayPoint.usedSpeedKmh} km/h
                    </strong>
                  </span>
                  <span className="font-mono text-emerald-400">
                    ● Verde = Dia Confirmado | Tracejado = Prescrito
                  </span>
                </div>
              </div>

              {/* GRÁFICO 2: GRÁFICO DE ÁREA (AREA CHART) */}
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        1B • Gráfico de Área (Area Chart)
                      </span>
                      <h3 className="text-base font-black text-white uppercase mt-1">
                        Volume Total Acumulado por Agrupamento Muscular
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 self-start">
                      Total 26d: {analyticsData.evolutionSeries[25]?.cumTotalVol} un.
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Progressão cumulativa de trabalho por sistema biomecânico, garantindo predominância do motor aeróbico sem negligenciar a cadeia anterior e posterior.
                  </p>

                  {/* SVG Stacked Area Chart */}
                  <div className="mt-4 bg-slate-950/90 border border-slate-800/80 rounded-xl p-3">
                    {(() => {
                      const pts = analyticsData.evolutionSeries;
                      const chartW = 540;
                      const chartH = 210;
                      const padL = 42;
                      const padR = 16;
                      const padT = 16;
                      const padB = 34;
                      const plotW = chartW - padL - padR;
                      const plotH = chartH - padT - padB;
                      const maxTotal = Math.max(100, pts[pts.length - 1]?.cumTotalVol || 1000);

                      const toX = (idx) => padL + (idx / (pts.length - 1)) * plotW;
                      const toY = (v) => padT + plotH * (1 - v / maxTotal);

                      const buildAreaPath = (upperFn, lowerFn) => {
                        const topPts = pts.map((p, i) => `${toX(i)},${toY(upperFn(p))}`).join(' L ');
                        const botPts = [...pts].reverse().map((p, revI) => {
                          const i = pts.length - 1 - revI;
                          return `${toX(i)},${toY(lowerFn(p))}`;
                        }).join(' L ');
                        return `M ${topPts} L ${botPts} Z`;
                      };

                      const l1 = (p) => p.cumCoreGripVol;
                      const l2 = (p) => l1(p) + p.cumUpperVol;
                      const l3 = (p) => l2(p) + p.cumPosteriorVol;
                      const l4 = (p) => l3(p) + p.cumAnteriorVol;
                      const l5 = (p) => l4(p) + p.cumAerobicVol;

                      return (
                        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
                          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                            const y = padT + plotH * (1 - t);
                            return (
                              <g key={i}>
                                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                                <text x={padL - 6} y={y + 3} textAnchor="end" fill="#64748b" fontSize="9.5" fontFamily="monospace">
                                  {Math.round(maxTotal * t)}
                                </text>
                              </g>
                            );
                          })}

                          {/* 5 Camadas Acumuladas */}
                          <path d={buildAreaPath(l5, l4)} fill="rgba(34, 211, 238, 0.45)" stroke="#22d3ee" strokeWidth="1.5" />
                          <path d={buildAreaPath(l4, l3)} fill="rgba(250, 204, 21, 0.45)" stroke="#facc15" strokeWidth="1.5" />
                          <path d={buildAreaPath(l3, l2)} fill="rgba(244, 63, 94, 0.42)" stroke="#fb7185" strokeWidth="1.5" />
                          <path d={buildAreaPath(l2, l1)} fill="rgba(168, 85, 247, 0.42)" stroke="#c084fc" strokeWidth="1.5" />
                          <path d={buildAreaPath(l1, () => 0)} fill="rgba(52, 211, 153, 0.45)" stroke="#34d399" strokeWidth="1.5" />

                          {pts.map((p, i) => (
                            (i % 4 === 0 || i === 25) && (
                              <text key={p.dayNum} x={toX(i)} y={padT + plotH + 16} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                                D{p.dayNum}
                              </text>
                            )
                          ))}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                {/* Legenda dos 5 Sistemas Musculares */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2 border-t border-slate-800/80 text-[10px]">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block shrink-0" />
                    Corrida / Aeróbico
                  </span>
                  <span className="flex items-center gap-1.5 text-yellow-300 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block shrink-0" />
                    Anterior (Quad)
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-400 inline-block shrink-0" />
                    Posterior / Anca
                  </span>
                  <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-sm bg-purple-400 inline-block shrink-0" />
                    Sup. Push/Pull
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block shrink-0" />
                    Core &amp; Grip
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================================
                SECÇÃO 2: DISTRIBUIÇÃO E COMPOSIÇÃO DO TREINO (BARRAS EMPILHADAS + RADAR - US3 - T010/T011)
            ===================================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* GRÁFICO 3: BARRAS AGRUPADAS / EMPILHADAS (STACKED BAR CHART) */}
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        2A • Barras Empilhadas (Stacked Bar Chart)
                      </span>
                      <h3 className="text-base font-black text-white uppercase mt-1">
                        Distribuição Semanal (Grupos Musculares &amp; Zonas Z1-Z5)
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold self-start">
                      <button
                        onClick={() => setCompositionMode('MUSCLE_SETS')}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          compositionMode === 'MUSCLE_SETS'
                            ? 'bg-amber-400 text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Séries Musculares
                      </button>
                      <button
                        onClick={() => setCompositionMode('HR_ZONES')}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          compositionMode === 'HR_ZONES'
                            ? 'bg-rose-400 text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Zonas FC (Z1-Z5)
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    {compositionMode === 'MUSCLE_SETS'
                      ? 'Compare o volume semanal de séries efetivas por grupo muscular nos 4 Microciclos (pico no M2 e corte de 55% no M4).'
                      : 'Distribuição do tempo semanal (minutos) nas Zonas Cardíacas Z1 a Z5, validando a base aeróbica polarizada.'}
                  </p>

                  {/* SVG Stacked Bar Chart */}
                  <div className="mt-4 bg-slate-950/90 border border-slate-800/80 rounded-xl p-3">
                    {(() => {
                      const buckets = analyticsData.microcycleComposition;
                      const chartW = 540;
                      const chartH = 215;
                      const padL = 44;
                      const padR = 20;
                      const padT = 22;
                      const padB = 36;
                      const plotW = chartW - padL - padR;
                      const plotH = chartH - padT - padB;

                      const keys = compositionMode === 'MUSCLE_SETS'
                        ? [
                            { k: 'anterior', label: 'Pernas Anterior', color: '#facc15' },
                            { k: 'posterior', label: 'Cadeia Posterior', color: '#fb7185' },
                            { k: 'costasPull', label: 'Costas / Puxada', color: '#22d3ee' },
                            { k: 'ombrosPush', label: 'Ombros / Push', color: '#c084fc' },
                            { k: 'coreGrip', label: 'Core & Grip', color: '#34d399' }
                          ]
                        : [
                            { k: 'z1', label: 'Z1 Regen.', color: '#38bdf8' },
                            { k: 'z2', label: 'Z2 Base Aeróbica', color: '#34d399' },
                            { k: 'z3', label: 'Z3 Tempo/GRP', color: '#facc15' },
                            { k: 'z4', label: 'Z4 Limiar Lactato', color: '#fb923c' },
                            { k: 'z5', label: 'Z5 VO2máx', color: '#f43f5e' }
                          ];

                      const totals = buckets.map((b) => {
                        const src = compositionMode === 'MUSCLE_SETS' ? b.muscleSets : b.hrZonesMin;
                        return keys.reduce((acc, item) => acc + (src[item.k] || 0), 0);
                      });
                      const maxTotal = Math.max(100, ...totals);
                      const slotW = plotW / buckets.length;
                      const barW = 58;

                      return (
                        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
                          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                            const y = padT + plotH * (1 - t);
                            return (
                              <g key={i}>
                                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                                <text x={padL - 6} y={y + 3} textAnchor="end" fill="#64748b" fontSize="9.5" fontFamily="monospace">
                                  {Math.round(maxTotal * t)}{compositionMode === 'HR_ZONES' ? 'm' : ''}
                                </text>
                              </g>
                            );
                          })}

                          {buckets.map((b, bIdx) => {
                            const src = compositionMode === 'MUSCLE_SETS' ? b.muscleSets : b.hrZonesMin;
                            const bx = padL + bIdx * slotW + (slotW - barW) / 2;
                            const cx = padL + bIdx * slotW + slotW / 2;
                            let cumH = 0;

                            return (
                              <g key={b.microcycleId}>
                                {keys.map((item) => {
                                  const val = src[item.k] || 0;
                                  const h = (val / maxTotal) * plotH;
                                  const y = padT + plotH - cumH - h;
                                  cumH += h;
                                  return (
                                    <rect
                                      key={item.k}
                                      x={bx}
                                      y={y}
                                      width={barW}
                                      height={Math.max(1, h)}
                                      fill={item.color}
                                      stroke="#020617"
                                      strokeWidth="1"
                                      rx="2"
                                    />
                                  );
                                })}
                                <text
                                  x={cx}
                                  y={padT + plotH - cumH - 6}
                                  textAnchor="middle"
                                  fill="#f8fafc"
                                  fontSize="10"
                                  fontWeight="bold"
                                  fontFamily="monospace"
                                >
                                  {totals[bIdx]}{compositionMode === 'HR_ZONES' ? ' min' : ' sér.'}
                                </text>
                                <text
                                  x={cx}
                                  y={padT + plotH + 16}
                                  textAnchor="middle"
                                  fill="#cbd5e1"
                                  fontSize="9.5"
                                  fontWeight="bold"
                                >
                                  {b.shortLabel}
                                </text>
                                <text
                                  x={cx}
                                  y={padT + plotH + 28}
                                  textAnchor="middle"
                                  fill="#34d399"
                                  fontSize="8.5"
                                  fontFamily="monospace"
                                >
                                  {b.confirmedDaysInMc}/{b.totalActiveDaysInMc} conf.
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                {/* Legenda Compacta */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2 border-t border-slate-800/80 text-[10px]">
                  {(compositionMode === 'MUSCLE_SETS'
                    ? [
                        { label: 'Pernas Ant.', color: 'bg-yellow-400' },
                        { label: 'Posterior', color: 'bg-rose-400' },
                        { label: 'Costas/Pull', color: 'bg-cyan-400' },
                        { label: 'Ombros/Push', color: 'bg-purple-400' },
                        { label: 'Core & Grip', color: 'bg-emerald-400' }
                      ]
                    : [
                        { label: 'Z1 Regen.', color: 'bg-sky-400' },
                        { label: 'Z2 Aeróbica', color: 'bg-emerald-400' },
                        { label: 'Z3 Ritmo GRP', color: 'bg-yellow-400' },
                        { label: 'Z4 Limiar', color: 'bg-orange-400' },
                        { label: 'Z5 VO2máx', color: 'bg-rose-500' }
                      ]
                  ).map((lg, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <span className={`w-2.5 h-2.5 rounded-sm ${lg.color} inline-block shrink-0`} />
                      {lg.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* GRÁFICO 4: GRÁFICO DE RADAR / TEIA (RADAR CHART) */}
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        2B • Gráfico de Radar / Teia (Radar Chart)
                      </span>
                      <h3 className="text-base font-black text-white uppercase mt-1">
                        Perfil Multidimensional do Atleta (5 Capacidades)
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-purple-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 self-start">
                      Ref: {currentDivision.name}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Avaliação instantânea de <strong>Força, Resistência, Mobilidade, Potência e Velocidade</strong> face ao polígono de referência da sua divisão competitiva.
                  </p>

                  {/* SVG Radar Chart */}
                  <div className="mt-4 bg-slate-950/90 border border-slate-800/80 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {(() => {
                      const axes = analyticsData.radarAxes;
                      const size = 230;
                      const cx = size / 2;
                      const cy = size / 2 + 4;
                      const maxR = 78;

                      const getCoord = (idx, valPct) => {
                        const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / axes.length;
                        const r = (valPct / 100) * maxR;
                        return {
                          x: cx + r * Math.cos(angle),
                          y: cy + r * Math.sin(angle)
                        };
                      };

                      const athletePoly = axes
                        .map((ax, i) => {
                          const pt = getCoord(i, ax.score);
                          return `${pt.x},${pt.y}`;
                        })
                        .join(' ');

                      const benchPoly = axes
                        .map((ax, i) => {
                          const pt = getCoord(i, ax.benchmark);
                          return `${pt.x},${pt.y}`;
                        })
                        .join(' ');

                      return (
                        <>
                          <svg viewBox={`0 0 ${size} ${size}`} className="w-52 h-52 shrink-0 mx-auto">
                            {/* Anéis concêntricos (25%, 50%, 75%, 100%) */}
                            {[25, 50, 75, 100].map((lvl) => {
                              const ringPts = axes
                                .map((_, i) => {
                                  const pt = getCoord(i, lvl);
                                  return `${pt.x},${pt.y}`;
                                })
                                .join(' ');
                              return (
                                <polygon
                                  key={lvl}
                                  points={ringPts}
                                  fill="none"
                                  stroke="#1e293b"
                                  strokeWidth="1"
                                />
                              );
                            })}

                            {/* Eixos radiais */}
                            {axes.map((ax, i) => {
                              const end = getCoord(i, 100);
                              const lbl = getCoord(i, 122);
                              return (
                                <g key={ax.id}>
                                  <line x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#334155" strokeWidth="1" />
                                  <text
                                    x={lbl.x}
                                    y={lbl.y + 3}
                                    textAnchor="middle"
                                    fill="#e2e8f0"
                                    fontSize="9.5"
                                    fontWeight="bold"
                                  >
                                    {ax.label}
                                  </text>
                                </g>
                              );
                            })}

                            {/* Polígono Benchmark da Divisão */}
                            <polygon
                              points={benchPoly}
                              fill="rgba(148, 163, 184, 0.12)"
                              stroke="#94a3b8"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                            />

                            {/* Polígono do Atleta */}
                            <polygon
                              points={athletePoly}
                              fill="rgba(250, 204, 21, 0.28)"
                              stroke="#facc15"
                              strokeWidth="2.4"
                            />

                            {axes.map((ax, i) => {
                              const pt = getCoord(i, ax.score);
                              return (
                                <circle
                                  key={ax.id}
                                  cx={pt.x}
                                  cy={pt.y}
                                  r="3.8"
                                  fill="#facc15"
                                  stroke="#020617"
                                  strokeWidth="1.5"
                                />
                              );
                            })}
                          </svg>

                          {/* Tabela lateral dos 5 eixos */}
                          <div className="flex-1 w-full space-y-2 text-xs">
                            {axes.map((ax) => (
                              <div key={ax.id} className="bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-slate-200">{ax.label}</span>
                                  <span className="font-mono font-bold text-yellow-400">
                                    {ax.score}/100 <span className="text-[10px] text-slate-500">(Meta {ax.benchmark})</span>
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${ax.score >= ax.benchmark ? 'bg-emerald-400' : 'bg-yellow-400'}`}
                                    style={{ width: `${ax.score}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                  <span className="text-emerald-400 font-semibold">
                    ★ Ponto Forte: <strong>{analyticsData.strongestCapability.label} ({analyticsData.strongestCapability.score}%)</strong>
                  </span>
                  <span className="text-amber-300 font-semibold">
                    ⚡ Prioridade de Evolução: <strong>{analyticsData.weakestCapability.label} ({analyticsData.weakestCapability.score}%)</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================================
                SECÇÃO 3: CORRELAÇÃO E MÉTRICAS DE RECUPERAÇÃO (DISPERSÃO + COMBINADO BARRA/LINHA - US4 - T012/T013)
            ===================================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* GRÁFICO 5: GRÁFICO DE DISPERSÃO (SCATTER PLOT) */}
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        3A • Gráfico de Dispersão (Scatter Plot)
                      </span>
                      <h3 className="text-base font-black text-white uppercase mt-1">
                        Correlação Carga Externa (Volume) vs. Carga Interna (PSE)
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-rose-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 self-start">
                      Prevenção Overtraining
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Cruza a Carga Externa (Eixo X) com a Perceção Subjetiva de Esforço Borg 6-20 (Eixo Y). Pontos na zona superior esquerda indicam fadiga desproporcional ao estímulo.
                  </p>

                  {/* SVG Scatter Plot */}
                  <div className="mt-4 bg-slate-950/90 border border-slate-800/80 rounded-xl p-3">
                    {(() => {
                      const pts = analyticsData.evolutionSeries.filter((p) =>
                        analyticsScope === 'CONFIRMED_ONLY' ? p.isCompleted && p.loadIndex > 0 : p.loadIndex > 0
                      );
                      const chartW = 540;
                      const chartH = 215;
                      const padL = 42;
                      const padR = 20;
                      const padT = 18;
                      const padB = 34;
                      const plotW = chartW - padL - padR;
                      const plotH = chartH - padT - padB;

                      const toX = (ext) => padL + (Math.min(100, Math.max(0, ext)) / 100) * plotW;
                      const toY = (rpe) => padT + plotH * (1 - (Math.min(20, Math.max(6, rpe)) - 6) / 14);

                      return (
                        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
                          {/* Zona Superior de Alerta de Fadiga Desproporcional */}
                          <polygon
                            points={`${padL},${padT} ${padL + plotW * 0.65},${padT} ${padL},${padT + plotH * 0.45}`}
                            fill="rgba(244, 63, 94, 0.12)"
                          />
                          <text x={padL + 8} y={padT + 14} fill="#fda4af" fontSize="9" fontWeight="bold">
                            ▲ ZONA ALERTA: FADIGA EXCEDENTE (PSE &gt; ESPERADO)
                          </text>

                          {/* Grelha Eixo Y (RPE Borg 6 a 20) */}
                          {[6, 10, 14, 17, 20].map((rpe) => {
                            const y = toY(rpe);
                            return (
                              <g key={rpe}>
                                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                                <text x={padL - 6} y={y + 3} textAnchor="end" fill="#64748b" fontSize="9.5" fontFamily="monospace">
                                  RPE {rpe}
                                </text>
                              </g>
                            );
                          })}

                          {/* Grelha Eixo X (Carga Externa 0 a 100%) */}
                          {[0, 25, 50, 75, 100].map((ext) => {
                            const x = toX(ext);
                            return (
                              <text key={ext} x={x} y={padT + plotH + 18} textAnchor="middle" fill="#64748b" fontSize="9.5" fontFamily="monospace">
                                {ext}% Vol
                              </text>
                            );
                          })}

                          {/* Diagonal de Acoplamento Fisiológico Ideal */}
                          <line
                            x1={toX(10)}
                            y1={toY(10)}
                            x2={toX(95)}
                            y2={toY(19)}
                            stroke="#34d399"
                            strokeWidth="1.5"
                            strokeDasharray="5 4"
                          />

                          {/* Pontos de Sessão */}
                          {pts.map((p) => {
                            const cx = toX(p.externalLoad);
                            const cy = toY(p.internalRPE);
                            const isSel = p.dayNum === selectedDayNum;
                            const fill = p.zoneStatus === 'OVERREACH_RISK'
                              ? '#f43f5e'
                              : p.zoneStatus === 'HIGH_LOAD'
                              ? '#facc15'
                              : '#34d399';
                            return (
                              <g
                                key={p.dayNum}
                                className="cursor-pointer"
                                onClick={() => setSelectedDayNum(p.dayNum)}
                              >
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={isSel ? 6.5 : p.isCompleted ? 5 : 4}
                                  fill={fill}
                                  fillOpacity={p.isCompleted ? '0.95' : '0.65'}
                                  stroke={isSel ? '#ffffff' : p.isCompleted ? '#10b981' : '#020617'}
                                  strokeWidth={isSel ? 2 : 1.2}
                                />
                                <text x={cx} y={cy - 7} textAnchor="middle" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">
                                  D{p.dayNum}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Acoplamento Ideal</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" /> Sobrecarga Alvo</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Alerta Fadiga</span>
                  </div>
                  <span className="font-mono text-slate-400">Registe o seu RPE na aba Treino</span>
                </div>
              </div>

              {/* GRÁFICO 6: GRÁFICO COMBINADO (BARRA VERTICAL + LINHA DE PRONTIDÃO/VFC) */}
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        3B • Gráfico Combinado (Barra + Linha)
                      </span>
                      <h3 className="text-base font-black text-white uppercase mt-1">
                        Volume de Treino (Barras) vs. Prontidão &amp; VFC Estimada (Linha)
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 self-start">
                      Prontidão D{selectedDayNum}: {analyticsData.currentDayPoint.readinessScore}%
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Cruza o volume diário (Barras Verticais) com a curva de recuperação autonómica / VFC estimada (Linha). Observe a supercompensação no Microciclo 4 até 05/12.
                  </p>

                  {/* SVG Combined Bar + Line Chart */}
                  <div className="mt-4 bg-slate-950/90 border border-slate-800/80 rounded-xl p-3">
                    {(() => {
                      const pts = analyticsData.evolutionSeries;
                      const chartW = 540;
                      const chartH = 215;
                      const padL = 38;
                      const padR = 38;
                      const padT = 18;
                      const padB = 34;
                      const plotW = chartW - padL - padR;
                      const plotH = chartH - padT - padB;
                      const slotW = plotW / pts.length;
                      const barW = Math.max(8, slotW * 0.62);

                      const readinessPoly = pts
                        .map((p, idx) => {
                          const cx = padL + idx * slotW + slotW / 2;
                          const cy = padT + plotH * (1 - p.readinessScore / 100);
                          return `${cx},${cy}`;
                        })
                        .join(' ');

                      return (
                        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
                          {[0, 25, 50, 75, 100].map((pct) => {
                            const y = padT + plotH * (1 - pct / 100);
                            return (
                              <g key={pct}>
                                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                                <text x={padL - 5} y={y + 3} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
                                  {Math.round(pct * 1.1)}m
                                </text>
                                <text x={chartW - padR + 5} y={y + 3} textAnchor="start" fill="#34d399" fontSize="9" fontFamily="monospace">
                                  {pct}%
                                </text>
                              </g>
                            );
                          })}

                          {/* Barras Verticais de Volume / Stress */}
                          {pts.map((p, idx) => {
                            const bh = Math.max(4, (p.externalLoad / 100) * plotH);
                            const bx = padL + idx * slotW + (slotW - barW) / 2;
                            const by = padT + plotH - bh;
                            const isSel = p.dayNum === selectedDayNum;
                            const barFill = p.category === 'RACE_DAY'
                              ? '#facc15'
                              : p.loadIndex >= 8
                              ? 'rgba(244, 63, 94, 0.65)'
                              : p.loadIndex >= 5
                              ? 'rgba(251, 191, 36, 0.55)'
                              : 'rgba(56, 189, 248, 0.45)';
                            return (
                              <g
                                key={p.dayNum}
                                className="cursor-pointer"
                                onClick={() => setSelectedDayNum(p.dayNum)}
                              >
                                <rect
                                  x={bx}
                                  y={by}
                                  width={barW}
                                  height={bh}
                                  rx="2"
                                  fill={barFill}
                                  stroke={isSel ? '#ffffff' : 'none'}
                                  strokeWidth="1.2"
                                />
                                {(idx % 4 === 0 || idx === 25) && (
                                  <text
                                    x={padL + idx * slotW + slotW / 2}
                                    y={padT + plotH + 16}
                                    textAnchor="middle"
                                    fill="#94a3b8"
                                    fontSize="9"
                                    fontFamily="monospace"
                                  >
                                    D{p.dayNum}
                                  </text>
                                )}
                              </g>
                            );
                          })}

                          {/* Linha Sobreposta de Prontidão / VFC (0% a 100%) */}
                          <polyline
                            fill="none"
                            stroke="#34d399"
                            strokeWidth="2.5"
                            points={readinessPoly}
                          />
                          {pts.map((p, idx) => {
                            const cx = padL + idx * slotW + slotW / 2;
                            const cy = padT + plotH * (1 - p.readinessScore / 100);
                            return (
                              <circle
                                key={`rd-${p.dayNum}`}
                                cx={cx}
                                cy={cy}
                                r={p.dayNum === selectedDayNum ? 4.5 : 2.5}
                                fill={p.readinessScore >= 80 ? '#34d399' : '#facc15'}
                                stroke="#020617"
                                strokeWidth="1"
                              />
                            );
                          })}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-rose-500/70 inline-block" />
                      Barras: Volume/Carga Externa Diária
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                      <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
                      Linha Verde: Prontidão &amp; VFC (Supercompensação D26: {analyticsData.evolutionSeries[25]?.readinessScore}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AUDITORIA DE PARETO 80/20: MOTOR AERÓBICO vs. PISO DE FORÇA (US1) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-emerald-400 text-slate-950">
                      Pareto Frente 1 (Regra 80/20)
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase">
                      Auditoria do Motor Aeróbico (80%) vs. Piso de Força (20%)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    A corrida representa 50-60% do tempo total de prova e apresenta o menor desvio padrão na classificação final. Proteja os 80% de volume aeróbico/híbrido.
                  </p>
                </div>
                <div className="text-right font-mono text-xs bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
                  <span className="text-slate-400 block text-[10px]">PROPORÇÃO REAL CONCLUÍDA</span>
                  <strong className="text-emerald-400 text-sm">{stats.actualAerobicRatioPct}% Aeróbico</strong>
                  <span className="text-slate-500"> / </span>
                  <strong className="text-amber-400 text-sm">{100 - stats.actualAerobicRatioPct}% Força</strong>
                </div>
              </div>

              {stats.imbalanceWarning && (
                <div className="bg-rose-950/30 border border-rose-500/60 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <strong className="text-rose-300 uppercase block font-black">
                      Alerta de Desequilíbrio de Pareto: Negligência do Motor Aeróbico Detetada!
                    </strong>
                    <p className="text-slate-200 leading-relaxed">
                      Apenas <strong>{stats.actualAerobicRatioPct}%</strong> das suas sessões ativas concluídas foram direcionadas ao motor aeróbico/corrida comprometida (meta: ~80%). Não sacrifique as rodagens de Zona 2 ou os intervalos de limiar em prol de treinar apenas força ou estações isoladas!
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300 uppercase">Arquitetura Planeada (22 Sessões Ativas)</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {stats.plannedAerobicRatioPct}% / {100 - stats.plannedAerobicRatioPct}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${stats.plannedAerobicRatioPct}%` }}
                      title="Motor Aeróbico, Limiar, Ergómetros e Compromised Running (18 sessões)"
                    />
                    <div
                      className="h-full bg-amber-500"
                      style={{ width: `${100 - stats.plannedAerobicRatioPct}%` }}
                      title="Piso de Força Composta e Trenós (4 sessões: Dias 1, 8, 15, 21)"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>• Motor Aeróbico/Híbrido: {stats.plannedAerobicSessions} sessões</span>
                    <span>• Strength Floor: {stats.plannedStrengthSessions} sessões</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300 uppercase">Aderência Real do Atleta (Sessões &amp; sRPE)</span>
                    <span className="font-mono font-bold text-cyan-400">
                      {stats.completedAerobicSessions} Aeróbicas vs. {stats.completedStrengthSessions} Força
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-cyan-400 transition-all"
                      style={{ width: `${stats.actualAerobicRatioPct}%` }}
                    />
                    <div
                      className="h-full bg-amber-400 transition-all"
                      style={{ width: `${100 - stats.actualAerobicRatioPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>• Carga Aeróbica: {stats.aerobicLoadUnits.toLocaleString()} UA</span>
                    <span>• Carga Força: {stats.strengthLoadUnits.toLocaleString()} UA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de Ondulação de Carga dos 26 Dias */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase">
                    Curva de Stress Fisiológico Diário (10/11 a 05/12)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Visualize a sobrecarga progressiva nos Microciclos 1-2 e o Tapering científico (-55% volume) até ao Simulado.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block"/> Alta Carga (8-10)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block"/> Moderada (5-7)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block"/> Regenerativo (1-4)</span>
                </div>
              </div>

              <div className="h-52 flex items-end gap-1.5 sm:gap-2 pt-6 pb-2 px-1 overflow-x-auto border-b border-slate-800">
                {WORKOUT_DAYS.map((d) => {
                  const heightPct = d.loadIndex === 0 ? 6 : d.loadIndex * 10;
                  const barColor =
                    d.category === 'RACE_DAY'
                      ? 'bg-yellow-400'
                      : d.loadIndex >= 8
                      ? 'bg-rose-500'
                      : d.loadIndex >= 5
                      ? 'bg-amber-400'
                      : d.loadIndex > 0
                      ? 'bg-emerald-400'
                      : 'bg-slate-700';

                  return (
                    <div
                      key={d.dayNum}
                      onClick={() => { setSelectedDayNum(d.dayNum); setActiveTab('TODAY'); }}
                      className="flex-1 min-w-[26px] flex flex-col items-center group cursor-pointer"
                    >
                      <span className="text-[10px] font-mono text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {d.loadIndex}/10
                      </span>
                      <div className="w-full h-36 flex items-end bg-slate-950/60 rounded-t-lg p-0.5">
                        <div
                          className={`w-full rounded-t transition-all ${barColor} ${
                            completedDays[d.dayNum] ? 'ring-2 ring-white/60' : 'opacity-85 group-hover:opacity-100'
                          }`}
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-1.5">{d.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monitorização de Prontidão & Prevenção de Overtraining */}
            <div className="bg-rose-950/20 border border-rose-800/50 rounded-2xl p-5 flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="text-sm font-black uppercase text-rose-300">
                  Protocolo de Monitorização de Prontidão e Ajuste de Carga (Pág. 26)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ao treinar 6 vezes por semana, a linha entre a supercompensação e o sobretreino funcional é ténue. Caso identifique qualquer um dos <strong>3 indicadores fisiológicos de alerta</strong> abaixo, converta imediatamente a sessão de Sexta-feira em recuperação ativa pura:
                </p>
                <ul className="text-xs text-rose-200 space-y-1 list-disc list-inside font-medium">
                  <li>Aumento da frequência cardíaca de repouso matinal em <strong>+5 a +10 bpm</strong> acima da sua linha de base;</li>
                  <li>Perturbações persistentes no padrão de sono noturno;</li>
                  <li>Dor muscular de início tardio (DOMS) persistente por mais de <strong>72 horas</strong> após os treinos de terça ou quinta-feira.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            ABA 4: MATRIZ DE CARGAS OFICIAIS & TÁTICA 05/12
        ========================================== */}
        {activeTab === 'STRATEGY' && (
          <div className="space-y-6">
            {/* Matriz Oficial de Cargas Regulamentares */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <h3 className="text-lg font-black text-white uppercase mb-1 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Matriz de Cargas Oficiais HYROX Singles (Temporada 2026/27)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Nota técnica: A divisão Women Pro utiliza exatamente as mesmas cargas externas da divisão Men Open, diferindo apenas na altura do alvo do Wall Ball (2,70m vs 3,00m).
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                      <th className="py-3 px-3">Estação Oficial</th>
                      <th className="py-3 px-3">Distância / Volume</th>
                      <th className="py-3 px-3">Women Open</th>
                      <th className="py-3 px-3">Men Open / Women Pro</th>
                      <th className="py-3 px-3">Men Pro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 font-mono">
                    <tr>
                      <td className="py-3 px-3 font-sans font-bold text-white">1. SkiErg</td>
                      <td className="py-3 px-3">1.000 m</td>
                      <td className="py-3 px-3 text-slate-300" colSpan={3}>Resistência ar (Damper livre em todas as divisões)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-sans font-bold text-white">2. Sled Push</td>
                      <td className="py-3 px-3">50 m (4x 12,5m)</td>
                      <td className="py-3 px-3 text-amber-300">102 kg</td>
                      <td className="py-3 px-3 text-yellow-400 font-bold">152 kg</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">202 kg (+50kg)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-sans font-bold text-white">3. Sled Pull</td>
                      <td className="py-3 px-3">50 m (4x 12,5m)</td>
                      <td className="py-3 px-3 text-amber-300">78 kg</td>
                      <td className="py-3 px-3 text-yellow-400 font-bold">103 kg</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">153 kg (+50kg)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-sans font-bold text-white">4. Burpee Broad Jumps</td>
                      <td className="py-3 px-3">80 m</td>
                      <td className="py-3 px-3 text-slate-300" colSpan={3}>Peso Corporal</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-sans font-bold text-white">5. Rowing (Remo)</td>
                      <td className="py-3 px-3">1.000 m</td>
                      <td className="py-3 px-3 text-slate-300" colSpan={3}>Resistência ar (Damper livre)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-sans font-bold text-white">6. Farmer's Carry</td>
                      <td className="py-3 px-3">200 m</td>
                      <td className="py-3 px-3 text-amber-300">2x 16 kg</td>
                      <td className="py-3 px-3 text-yellow-400 font-bold">2x 24 kg</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">2x 32 kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-sans font-bold text-white">7. Sandbag Lunges</td>
                      <td className="py-3 px-3">100 m</td>
                      <td className="py-3 px-3 text-amber-300">10 kg</td>
                      <td className="py-3 px-3 text-yellow-400 font-bold">20 kg</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">30 kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-sans font-bold text-white">8. Wall Balls</td>
                      <td className="py-3 px-3">100 repetições</td>
                      <td className="py-3 px-3 text-amber-300">4 kg (2,70m)</td>
                      <td className="py-3 px-3 text-yellow-400 font-bold">6 kg (2,70m F / 3,00m M)</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">9 kg (3,00m)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Estratégia de Pacing e Simulador Cirúrgico da Roxzone (US3) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-yellow-400 text-slate-950 inline-block mb-2">
                    Pacing de Corrida (8 x 1.000m)
                  </span>
                  <h4 className="text-base font-black uppercase text-yellow-400 mb-2">
                    A Regra do 1.º Quilómetro (Anti-Fade)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    O atleta típico sofre uma degradação de ritmo (<em>run fade</em>) de <strong>82 segundos</strong> entre a Corrida 1 e a Corrida 8 (~30% de perda de velocidade), com ponto de colapso na 5.ª corrida. Execute a <strong>Corrida 1 de 10 a 20 segundos mais lenta</strong> que o seu ritmo médio alvo ({calculateAdjustedPace(goalPace, 15)}/km) para poupar fosfocreatina e evitar acidose precoce.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center font-mono text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">KM 1 (CONSERVADOR)</span>
                    <strong className="text-emerald-400 text-sm">{calculateAdjustedPace(goalPace, 15)}/km</strong>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">KM 2 A 7 (META GRP)</span>
                    <strong className="text-cyan-400 text-sm">{goalPace}/km</strong>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">KM 8 (SPRINT FINAL)</span>
                    <strong className="text-rose-400 text-sm">{calculateAdjustedPace(goalPace, -5)}/km</strong>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-cyan-400 text-slate-950 inline-block mb-1">
                      Pareto Frente 3 • Ganho Marginal Gratuito
                    </span>
                    <h4 className="text-base font-black uppercase text-cyan-400">
                      Simulador Cirúrgico da Roxzone (16 Transições)
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Economia: {formatTimer(roxzoneSim.savedVsSlowSec)} (-{roxzoneSim.equivalentPaceGainSecPerKm}s/km eq.)
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Passará 16 vezes pela Roxzone. Os 10% mais rápidos gastam <strong>05:21</strong> contra <strong>11:25</strong> dos 10% mais lentos (mais de 6 minutos conquistados sem gastar energia metabólica extra na pista!).
                </p>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-300 font-semibold">
                      Seu Tempo Médio por Passagem na Roxzone (16x):
                    </label>
                    <span className="font-mono font-black text-sm text-cyan-400">
                      {roxzoneSim.secPerPassage}s / transição (Total: {formatTimer(roxzoneSim.totalRoxzoneSec)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="60"
                    value={roxzoneSim.secPerPassage}
                    onChange={(e) => setRoxzoneTargetSec(parseInt(e.target.value, 10) || 22)}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>20s (Elite 05:20)</span>
                    <span>25s (Competitivo 06:40)</span>
                    <span>43s (Passivo 11:28)</span>
                  </div>
                </div>

                <div className="bg-cyan-950/25 border border-cyan-800/40 rounded-xl p-3 text-xs space-y-1">
                  <strong className="text-cyan-300 uppercase block font-black">
                    Checklist do Protocolo dos 3 Passos (Saída de Estação):
                  </strong>
                  <p className="text-slate-200">
                    <strong>1.</strong> Concluir a última rep e dar apenas <strong>3 passos caminhando</strong>; <strong>2.</strong> Realizar 1 inspiração nasal profunda + expiração bucal forçada (hidratar em movimento); <strong>3.</strong> Iniciar trote contínuo imediato.
                  </p>
                </div>
              </div>
            </div>

            {/* PLANEADOR INTERATIVO DE FRACIONAMENTO PREVENTIVO (PARETO FRENTE 4 - US4) */}
            <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-purple-400 text-slate-950">
                      Pareto Frente 4 • Anti-Falha Concêntrica
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase">
                      Planeador de Fracionamento Preventivo (Sandbag Lunges &amp; Wall Balls)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Pequenas pausas controladas de 3 a 5 respirações antes da falha custam apenas segundos, mas evitam paragens forçadas de vários minutos nos quilómetros finais.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.values(FRACTIONATION_SCHEMES).map((scheme) => {
                  const isSelected = fractionationProfile === scheme.id;
                  return (
                    <button
                      key={scheme.id}
                      onClick={() => setFractionationProfile(scheme.id)}
                      className={`text-left rounded-xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-purple-950/40 border-purple-400 ring-1 ring-purple-400/50 shadow-lg'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-black uppercase text-white">
                            {scheme.name}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          )}
                        </div>
                        <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3">
                          {scheme.badge}
                        </span>

                        <div className="space-y-2 text-xs">
                          <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-[10px] uppercase text-rose-300 font-bold block">
                              Estação 8 • Wall Balls (100 reps):
                            </span>
                            <strong className="font-mono text-sm text-white block mt-0.5">
                              {scheme.wallBallsSets}
                            </strong>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              Pausa: {scheme.wallBallsRestBreaths}
                            </span>
                          </div>

                          <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-[10px] uppercase text-amber-300 font-bold block">
                              Estação 7 • Sandbag Lunges (100m):
                            </span>
                            <strong className="text-xs text-white block mt-0.5">
                              {scheme.lungesStrategy}
                            </strong>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              Pausa: {scheme.lungesRestBreaths}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400">
                        {scheme.estimatedTimeSaved}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guia Biomecânico Estação a Estação */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <h3 className="text-base sm:text-lg font-black text-white uppercase mb-4">
                Tática Biomecânica e Fracionamento Preventivo Estação a Estação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OFFICIAL_STATIONS_STRATEGY.map((st) => (
                  <div key={st.order} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-yellow-400">
                        Estação {st.order}: {st.name} ({st.volume})
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                        {st.role}
                      </span>
                    </div>
                    <p className="text-xs text-rose-300/90 mb-2">
                      <strong>Fator Limitante & Regras:</strong> {st.limitingFactor}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Execução Tática:</strong> {st.tactics}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            ABA 5: PERIODIZAÇÃO NUTRICIONAL E HIDRATAÇÃO
        ========================================== */}
        {activeTab === 'NUTRITION' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-emerald-400" />
                    Calculadora de Periodização Nutricional (26 Dias)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Alimente-se com a precisão energética de um corredor de fundo e recupere com o aporte proteico de um atleta de força.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Seu Peso Corporal:</span>
                  <input
                    type="number"
                    value={athleteWeight}
                    onChange={(e) => setAthleteWeight(parseFloat(e.target.value) || 70)}
                    className="w-16 bg-slate-800 text-white font-mono font-bold text-center rounded px-2 py-1"
                  />
                  <span className="text-xs text-slate-400">kg</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs font-bold uppercase text-amber-400 block mb-1">
                    1. Dias de Compromised Running, Intervalos e Simulação
                  </span>
                  <div className="text-2xl font-mono font-black text-white mb-2">
                    {Math.round(athleteWeight * 5)}g a {Math.round(athleteWeight * 7)}g <span className="text-xs font-sans font-normal text-slate-400">Carboidratos/dia (5-7 g/kg)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Proteína: <strong>{Math.round(athleteWeight * 1.6)}g a {Math.round(athleteWeight * 2.2)}g/dia</strong> (fracionada em 4 refeições de 25-40g). Lípidos: 20-30% das calorias totais.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs font-bold uppercase text-emerald-400 block mb-1">
                    2. Dias de Base Aeróbica (Zona 2) e Descanso
                  </span>
                  <div className="text-2xl font-mono font-black text-white mb-2">
                    {Math.round(athleteWeight * 4)}g a {Math.round(athleteWeight * 5)}g <span className="text-xs font-sans font-normal text-slate-400">Carboidratos/dia (4-5 g/kg)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Proibido fazer restrição calórica! As cargas do HYROX são absolutas e um défice energético degrada a força nos trenós e a imunidade.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs font-bold uppercase text-cyan-400 block mb-1">
                    3. Janela Peri-Treino (Sessões &gt; 60 minutos)
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1.5 mt-2">
                    <li>• <strong>Pré-Treino (2-3h antes):</strong> {Math.round(athleteWeight * 1.5)}g a {Math.round(athleteWeight * 2)}g carbo baixo/médio IG (aveia, banana, mel).</li>
                    <li>• <strong>Intra-Treino (Sábados):</strong> 30g a 45g/hora (1 a 2 géis isotónicos + sódio/potássio).</li>
                    <li>• <strong>Pós-Treino (&lt;45 min):</strong> 30g Whey + {Math.round(athleteWeight * 1.0)}g hidratos de carbono rápidos.</li>
                  </ul>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs font-bold uppercase text-yellow-400 block mb-1">
                    4. Últimas 48h (03/12 e 04/12) & Dia do Simulado (05/12)
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1.5 mt-2">
                    <li>• <strong>Carb-Loading (03 e 04/12):</strong> {Math.round(athleteWeight * 6)}g a {Math.round(athleteWeight * 8)}g/dia (6-8 g/kg) de arroz branco, massa e fruta, cortando fibras insolúveis (brócolos, leguminosas) e gorduras.</li>
                    <li>• <strong>Refeição Pré-Prova (2,5 a 3h antes):</strong> {Math.round(athleteWeight * 1.5)}g de fácil digestão (pão branco/aveia com mel).</li>
                    <li>• <strong>Durante o Simulado:</strong> 1 gel energético aos 35-40 min (transição para o Rowing).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            ABA 6: BANCO DE DADOS DE ALUNOS & ATLETAS + COMPARADOR LADO A LADO (FEATURE 006)
        ========================================== */}
        {activeTab === 'DATABASE' && (() => {
          const recA = athletesDatabase.find((r) => r.id === compareIdA) || athletesDatabase[0];
          const recB = athletesDatabase.find((r) => r.id === compareIdB) || athletesDatabase[1] || athletesDatabase[0];
          const metricsA = computeRecordSummaryMetrics(recA);
          const metricsB = computeRecordSummaryMetrics(recB);
          const zonesA = (recA && recA.runningZonesKmh) || buildDefaultRunningZonesKmh(recA ? recA.goalPace : '04:45');
          const zonesB = (recB && recB.runningZonesKmh) || buildDefaultRunningZonesKmh(recB ? recB.goalPace : '04:45');
          const rmsA = (recA && recA.oneRMs) || {};
          const rmsB = (recB && recB.oneRMs) || {};
          const weightA = Math.max(35, parseFloat(recA && recA.athleteWeight) || 75);
          const weightB = Math.max(35, parseFloat(recB && recB.athleteWeight) || 75);

          // Geometria do Gráfico de Radar Duplo Sobreposto (5 Capacidades)
          const rCx = 160;
          const rCy = 150;
          const rMax = 96;
          const radarAxesMeta = [
            { id: 'strength', label: 'Força (1RM)', scoreA: metricsA.radar.strength, scoreB: metricsB.radar.strength },
            { id: 'endurance', label: 'Resistência', scoreA: metricsA.radar.endurance, scoreB: metricsB.radar.endurance },
            { id: 'mobility', label: 'Mobilidade', scoreA: metricsA.radar.mobility, scoreB: metricsB.radar.mobility },
            { id: 'power', label: 'Potência', scoreA: metricsA.radar.power, scoreB: metricsB.radar.power },
            { id: 'speed', label: 'Velocidade', scoreA: metricsA.radar.speed, scoreB: metricsB.radar.speed }
          ];
          const buildPolyPoints = (key) => {
            return radarAxesMeta
              .map((ax, idx) => {
                const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
                const val = Math.max(10, Math.min(100, Number(ax[key]) || 50));
                const r = (val / 100) * rMax;
                return `${(rCx + r * Math.cos(angle)).toFixed(1)},${(rCy + r * Math.sin(angle)).toFixed(1)}`;
              })
              .join(' ');
          };

          return (
            <div className="space-y-6">
              {/* BANNER DE CONFIRMAÇÃO DO BANCO DE DADOS */}
              {dbBannerMsg && (
                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-3.5 flex items-center justify-between text-xs text-emerald-200 font-bold shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{dbBannerMsg}</span>
                  </div>
                  <button
                    onClick={() => setDbBannerMsg('')}
                    className="text-emerald-300 hover:text-white px-2 py-0.5 rounded bg-emerald-950/60"
                  >
                    Fechar
                  </button>
                </div>
              )}

              {/* SECÇÃO 1: FICHA DO ALUNO/ATLETA ATIVO + GUARDAR SNAPSHOT + CADASTRAR NOVO ALUNO */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Ficha do Perfil Ativo e Snapshot */}
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-400" />
                        <h3 className="text-base sm:text-lg font-black text-white uppercase">
                          Aluno / Atleta Ativo (Auto-Save Ativo)
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Todas as alterações de Zonas de Corrida (km/h), 1RMs, Peso e Treinos Confirmados ficam guardadas automaticamente neste registo.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 self-start">
                      ● Guardado no Banco ({athletesDatabase.length} registos)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                        Nome do Aluno / Atleta Ativo
                      </label>
                      <input
                        type="text"
                        value={activeAthleteRecord.name || ''}
                        onChange={(e) => handleUpdateActiveAthleteMeta('name', e.target.value)}
                        className="w-full bg-slate-950 text-white font-bold text-sm rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-purple-400"
                        placeholder="Ex: João Silva - Aluno HYROX"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                        Categoria / Turma / Objetivo
                      </label>
                      <input
                        type="text"
                        value={activeAthleteRecord.roleOrCategory || ''}
                        onChange={(e) => handleUpdateActiveAthleteMeta('roleOrCategory', e.target.value)}
                        className="w-full bg-slate-950 text-slate-200 font-semibold text-sm rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-purple-400"
                        placeholder="Ex: Aluno Personal • Sub-70 min"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                      Observações Técnicas do Treinador / Histórico Clínico e Físico
                    </label>
                    <input
                      type="text"
                      value={activeAthleteRecord.coachNotes || ''}
                      onChange={(e) => handleUpdateActiveAthleteMeta('coachNotes', e.target.value)}
                      className="w-full bg-slate-950 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-purple-400"
                      placeholder="Anote pontos fortes, limitações articulares, meta de pace ou evolução..."
                    />
                  </div>

                  {/* Guardar Fotografia Temporal (Snapshot Antes vs Depois) */}
                  <div className="bg-slate-950/90 border border-purple-500/30 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-purple-300 flex items-center gap-1.5">
                        <Copy className="w-4 h-4 text-purple-400" />
                        Guardar Fotografia Histórica (Snapshot para Comparar Antes vs. Depois)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Congele uma cópia exata do estado atual deste aluno (ex: <em>&quot;Avaliação Inicial Semana 1&quot;</em>) para comparar a evolução futura dele próprio lado a lado.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={snapshotCustomLabel}
                        onChange={(e) => setSnapshotCustomLabel(e.target.value)}
                        placeholder={`Ex: Avaliação Semana 1 - Dia ${selectedDayNum}`}
                        className="flex-1 bg-slate-900 text-white text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-purple-400"
                      />
                      <button
                        onClick={handleSaveHistoricalSnapshot}
                        className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-black text-xs uppercase tracking-wide transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Guardar Snapshot Histórico
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cadastrar Novo Aluno / Atleta no Banco de Dados */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3.5">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base sm:text-lg font-black text-white uppercase flex items-center gap-2">
                      <Plus className="w-5 h-5 text-yellow-400" />
                      Cadastrar Novo Aluno / Atleta
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Crie uma ficha individualizada para cada aluno ou colega de equipa e alterne entre eles com 1 clique.
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                        Nome Completo / Identificação *
                      </label>
                      <input
                        type="text"
                        value={newAthleteName}
                        onChange={(e) => setNewAthleteName(e.target.value)}
                        placeholder="Ex: Maria Oliveira (Women Open)"
                        className="w-full bg-slate-950 text-white font-bold rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-yellow-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                          Divisão Oficial
                        </label>
                        <select
                          value={newAthleteDivision}
                          onChange={(e) => setNewAthleteDivision(e.target.value)}
                          className="w-full bg-slate-950 text-white font-semibold rounded-xl px-2.5 py-2 border border-slate-700 focus:outline-none focus:border-yellow-400"
                        >
                          {Object.values(DIVISIONS).map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                          Categoria / Grupo
                        </label>
                        <input
                          type="text"
                          value={newAthleteRole}
                          onChange={(e) => setNewAthleteRole(e.target.value)}
                          placeholder="Aluno HYROX"
                          className="w-full bg-slate-950 text-slate-200 rounded-xl px-2.5 py-2 border border-slate-700 focus:outline-none focus:border-yellow-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                          Peso Corporal (kg)
                        </label>
                        <input
                          type="number"
                          min="35"
                          max="200"
                          value={newAthleteWeight}
                          onChange={(e) => setNewAthleteWeight(parseFloat(e.target.value) || 70)}
                          className="w-full bg-slate-950 text-emerald-400 font-mono font-bold rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                          Pace GRP Z3 (min/km)
                        </label>
                        <input
                          type="text"
                          value={newAthletePace}
                          onChange={(e) => setNewAthletePace(e.target.value)}
                          placeholder="04:45"
                          className="w-full bg-slate-950 text-cyan-400 font-mono font-bold rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-300">Modo de Inicialização da Planilha:</span>
                      <button
                        type="button"
                        onClick={() => setNewAthleteStartClean(!newAthleteStartClean)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border ${
                          newAthleteStartClean
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {newAthleteStartClean ? 'Ficha Limpa (0/26 dias)' : 'Clonar Cargas Atuais'}
                      </button>
                    </div>

                    <button
                      onClick={handleCreateNewAthlete}
                      className="w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black uppercase tracking-wide text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20"
                    >
                      <Plus className="w-4 h-4" />
                      Salvar Novo Aluno / Atleta no Banco de Dados
                    </button>
                  </div>
                </div>
              </div>

              {/* SECÇÃO 2: LISTA COMPLETA DE ALUNOS, ATLETAS E SNAPSHOTS GUARDADOS */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      Registos Guardados no Banco de Dados ({athletesDatabase.length})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Selecione qualquer aluno/atleta para abrir a periodização dele ou defina-o como <strong>Perfil A</strong> / <strong>Perfil B</strong> para comparar lado a lado.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={pushToCloudFirestore}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Cloud className="w-3.5 h-3.5" />
                      Guardar Todo o Banco na Nuvem (Firestore)
                    </button>
                    <button
                      onClick={handleExportBackupJson}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      Exportar Banco (.JSON)
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] uppercase text-slate-400 bg-slate-950/60">
                        <th className="py-2.5 px-3">Aluno / Atleta / Snapshot</th>
                        <th className="py-2.5 px-2">Divisão &amp; Peso</th>
                        <th className="py-2.5 px-2">Z3 GRP (Pace / km/h)</th>
                        <th className="py-2.5 px-2">Progresso &amp; Distância</th>
                        <th className="py-2.5 px-2">Força Média 1RM</th>
                        <th className="py-2.5 px-2">Score 5D</th>
                        <th className="py-2.5 px-3 text-right">Ações &amp; Comparação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {athletesDatabase.map((rec) => {
                        const m = computeRecordSummaryMetrics(rec);
                        const isCurrent = rec.id === activeAthleteId;
                        const isCompA = rec.id === compareIdA;
                        const isCompB = rec.id === compareIdB;
                        return (
                          <tr
                            key={rec.id}
                            className={`transition-colors ${
                              isCurrent ? 'bg-purple-500/10' : 'hover:bg-slate-800/40'
                            }`}
                          >
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-white text-sm">{rec.name}</span>
                                {isCurrent && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                                    ATIVO
                                  </span>
                                )}
                                {rec.recordType === 'SNAPSHOT' && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                                    SNAPSHOT
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400 block">{rec.roleOrCategory || 'Atleta HYROX'}</span>
                            </td>
                            <td className="py-3 px-2 font-mono">
                              <span className="text-slate-200 font-bold block">{DIVISIONS[rec.divisionKey]?.name || rec.divisionKey}</span>
                              <span className="text-emerald-400 text-[11px]">{rec.athleteWeight} kg</span>
                            </td>
                            <td className="py-3 px-2 font-mono">
                              <span className="text-cyan-400 font-bold">{rec.goalPace}/km</span>
                              <span className="text-yellow-400 block text-[11px]">{m.grpSpeedKmh} km/h</span>
                            </td>
                            <td className="py-3 px-2 font-mono">
                              <span className="text-white font-bold">{m.doneCount}/26 dias ({m.progressPct}%)</span>
                              <span className="text-slate-400 block text-[11px]">{m.confirmedDistanceKm} km • {m.loggedLoadUnits} UA</span>
                            </td>
                            <td className="py-3 px-2 font-mono">
                              <span className="text-amber-300 font-bold">{m.avg1RMKg} kg (média)</span>
                              <span className="text-slate-400 block text-[11px]">BS: {m.relativeBackSquat}x peso</span>
                            </td>
                            <td className="py-3 px-2 font-mono">
                              <span className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-yellow-400 font-black">
                                {m.radar.overall}/100
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex flex-wrap items-center justify-end gap-1.5">
                                {!isCurrent && (
                                  <button
                                    onClick={() => handleSelectActiveAthlete(rec.id)}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-[11px]"
                                  >
                                    Abrir Ficha
                                  </button>
                                )}
                                <button
                                  onClick={() => setCompareIdA(rec.id)}
                                  className={`px-2 py-1 rounded-lg font-bold text-[11px] border ${
                                    isCompA
                                      ? 'bg-yellow-400 text-slate-950 border-yellow-300'
                                      : 'bg-slate-800 text-yellow-300 border-slate-700 hover:border-yellow-400/50'
                                  }`}
                                >
                                  Perfil A
                                </button>
                                <button
                                  onClick={() => setCompareIdB(rec.id)}
                                  className={`px-2 py-1 rounded-lg font-bold text-[11px] border ${
                                    isCompB
                                      ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                                      : 'bg-slate-800 text-cyan-300 border-slate-700 hover:border-cyan-400/50'
                                  }`}
                                >
                                  Perfil B
                                </button>
                                {athletesDatabase.length > 1 && (
                                  <button
                                    onClick={() => handleDeleteAthleteRecord(rec.id)}
                                    className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30"
                                    title="Remover registo do Banco de Dados"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECÇÃO 3: COMPARADOR MULTIDIMENSIONAL LADO A LADO (PERFIL A vs PERFIL B) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/30">
                      Comparador Analítico de Performance (Aluno A vs. Aluno B / Antes vs. Depois)
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase mt-1.5">
                      Comparação Direta de Atletas, Zonas de Corrida (km/h) &amp; Força (1RM)
                    </h3>
                  </div>

                  {/* Seletores Diretos de Perfil A e Perfil B */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-400 shrink-0" />
                      <span className="text-yellow-400 font-black uppercase">Perfil A:</span>
                      <select
                        value={recA ? recA.id : ''}
                        onChange={(e) => setCompareIdA(e.target.value)}
                        className="bg-slate-900 text-white font-bold rounded-lg px-2.5 py-1.5 border border-yellow-400/40"
                      >
                        {athletesDatabase.map((r) => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </div>

                    <span className="text-slate-500 font-black text-center">VS</span>

                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                      <span className="text-cyan-400 font-black uppercase">Perfil B:</span>
                      <select
                        value={recB ? recB.id : ''}
                        onChange={(e) => setCompareIdB(e.target.value)}
                        className="bg-slate-900 text-white font-bold rounded-lg px-2.5 py-1.5 border border-cyan-400/40"
                      >
                        {athletesDatabase.map((r) => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* GRELHA SUPERIOR: RADAR DUPLO SOBREPOSTO + KPIS COMPARATIVOS GERAIS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Radar SVG Sobreposto (Perfil A em Amarelo vs Perfil B em Ciano) */}
                  <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
                    <span className="text-xs font-black uppercase text-slate-300 mb-2">
                      Radar Sobreposto (5 Capacidades Físicas)
                    </span>
                    <svg viewBox="0 0 320 300" className="w-full max-w-[310px] h-auto overflow-visible">
                      {[25, 50, 75, 100].map((lvl) => {
                        const pts = [0, 1, 2, 3, 4]
                          .map((idx) => {
                            const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
                            const r = (lvl / 100) * rMax;
                            return `${(rCx + r * Math.cos(angle)).toFixed(1)},${(rCy + r * Math.sin(angle)).toFixed(1)}`;
                          })
                          .join(' ');
                        return (
                          <polygon
                            key={lvl}
                            points={pts}
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="1"
                            strokeDasharray={lvl === 100 ? 'none' : '3 3'}
                          />
                        );
                      })}
                      {radarAxesMeta.map((ax, idx) => {
                        const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
                        const x2 = rCx + rMax * Math.cos(angle);
                        const y2 = rCy + rMax * Math.sin(angle);
                        const lx = rCx + (rMax + 26) * Math.cos(angle);
                        const ly = rCy + (rMax + 20) * Math.sin(angle);
                        return (
                          <g key={ax.id}>
                            <line x1={rCx} y1={rCy} x2={x2} y2={y2} stroke="#334155" strokeWidth="1" />
                            <text
                              x={lx}
                              y={ly}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-slate-300 text-[10px] font-bold"
                            >
                              {ax.label}
                            </text>
                          </g>
                        );
                      })}
                      {/* Polígono B (Ciano) */}
                      <polygon
                        points={buildPolyPoints('scoreB')}
                        fill="rgba(34, 211, 238, 0.18)"
                        stroke="#22d3ee"
                        strokeWidth="2.5"
                      />
                      {/* Polígono A (Amarelo) */}
                      <polygon
                        points={buildPolyPoints('scoreA')}
                        fill="rgba(250, 204, 21, 0.22)"
                        stroke="#facc15"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs mt-2">
                      <span className="flex items-center gap-1.5 text-yellow-300 font-bold">
                        <span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block" />
                        {recA ? recA.name : 'Perfil A'} ({metricsA.radar.overall} pts)
                      </span>
                      <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                        <span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block" />
                        {recB ? recB.name : 'Perfil B'} ({metricsB.radar.overall} pts)
                      </span>
                    </div>
                  </div>

                  {/* Tabela dos 5 Pilares + Indicadores Globais de Volume e Ritmo */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Velocidade GRP (Z3)</span>
                        <div className="flex items-baseline justify-between mt-1 font-mono">
                          <span className="text-sm font-black text-yellow-400">{metricsA.grpSpeedKmh} km/h ({metricsA.grpPaceStr})</span>
                          <span className="text-xs text-slate-500">vs</span>
                          <span className="text-sm font-black text-cyan-400">{metricsB.grpSpeedKmh} km/h ({metricsB.grpPaceStr})</span>
                        </div>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Distância Real Confirmada</span>
                        <div className="flex items-baseline justify-between mt-1 font-mono">
                          <span className="text-sm font-black text-yellow-400">{metricsA.confirmedDistanceKm} km ({metricsA.doneCount}d)</span>
                          <span className="text-xs text-slate-500">vs</span>
                          <span className="text-sm font-black text-cyan-400">{metricsB.confirmedDistanceKm} km ({metricsB.doneCount}d)</span>
                        </div>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Carga Interna Confirmada</span>
                        <div className="flex items-baseline justify-between mt-1 font-mono">
                          <span className="text-sm font-black text-yellow-400">{metricsA.loggedLoadUnits} UA</span>
                          <span className="text-xs text-slate-500">vs</span>
                          <span className="text-sm font-black text-cyan-400">{metricsB.loggedLoadUnits} UA</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                      <span className="text-xs font-black uppercase text-white block">
                        Diferencial nas 5 Capacidades Multidimensionais (Perfil A vs. Perfil B)
                      </span>
                      {radarAxesMeta.map((ax) => {
                        const diff = ax.scoreA - ax.scoreB;
                        return (
                          <div key={ax.id} className="grid grid-cols-12 items-center gap-2 text-xs">
                            <span className="col-span-4 font-bold text-slate-300">{ax.label}</span>
                            <div className="col-span-5 flex items-center gap-1.5">
                              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden flex">
                                <div className="bg-yellow-400 h-full" style={{ width: `${ax.scoreA}%` }} />
                              </div>
                              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden flex">
                                <div className="bg-cyan-400 h-full" style={{ width: `${ax.scoreB}%` }} />
                              </div>
                            </div>
                            <div className="col-span-3 text-right font-mono text-[11px]">
                              <span className="text-yellow-400 font-bold">{ax.scoreA}</span>
                              <span className="text-slate-500"> / </span>
                              <span className="text-cyan-400 font-bold">{ax.scoreB}</span>
                              <span className={`ml-1.5 font-black ${diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                                ({diff > 0 ? `+${diff}` : diff})
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* GRELHA INFERIOR: COMPARATIVO DE ZONAS DE CORRIDA (Z1-Z5) + COMPARATIVO DE FORÇA 1RM (9 EXERCÍCIOS) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Comparativo das 5 Zonas de Corrida (km/h e min/km) */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs sm:text-sm font-black uppercase text-cyan-300 flex items-center gap-2">
                      <Timer className="w-4 h-4 text-cyan-400" />
                      Comparação das Zonas de Corrida Z1 a Z5 (km/h &amp; Pace)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-[10px] uppercase text-slate-400">
                            <th className="py-2 px-2">Zona Fisiológica</th>
                            <th className="py-2 px-2 text-yellow-400">Perfil A (km/h • /km)</th>
                            <th className="py-2 px-2 text-cyan-400">Perfil B (km/h • /km)</th>
                            <th className="py-2 px-2 text-right">Delta (Δ km/h)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono">
                          {Object.values(RUNNING_ZONES_META).map((z) => {
                            const spdA = Number(zonesA[z.id]) || 11.0;
                            const spdB = Number(zonesB[z.id]) || 11.0;
                            const deltaSpd = Math.round((spdA - spdB) * 10) / 10;
                            return (
                              <tr key={z.id}>
                                <td className="py-2 px-2 font-sans">
                                  <span className="font-bold text-white">{z.id}</span>
                                  <span className="text-[10px] text-slate-400 block">{z.shortLabel}</span>
                                </td>
                                <td className="py-2 px-2 text-yellow-300 font-bold">
                                  {spdA.toFixed(1)} km/h <span className="text-slate-400 font-normal">({kmhToPaceStr(spdA)})</span>
                                </td>
                                <td className="py-2 px-2 text-cyan-300 font-bold">
                                  {spdB.toFixed(1)} km/h <span className="text-slate-400 font-normal">({kmhToPaceStr(spdB)})</span>
                                </td>
                                <td className={`py-2 px-2 text-right font-black ${
                                  deltaSpd > 0 ? 'text-emerald-400' : deltaSpd < 0 ? 'text-rose-400' : 'text-slate-400'
                                }`}>
                                  {deltaSpd > 0 ? `+${deltaSpd.toFixed(1)}` : deltaSpd.toFixed(1)} km/h
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Comparativo de Força Máxima 1RM (kg absolutos e Força Relativa kg/kg) */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs sm:text-sm font-black uppercase text-amber-300 flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-amber-400" />
                      Comparação de Força 1RM (Carga Absoluta &amp; Relativa ao Peso)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-[10px] uppercase text-slate-400">
                            <th className="py-2 px-2">Exercício Base</th>
                            <th className="py-2 px-2 text-yellow-400">Perfil A (1RM)</th>
                            <th className="py-2 px-2 text-cyan-400">Perfil B (1RM)</th>
                            <th className="py-2 px-2 text-right">Diferença (Δ kg)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono">
                          {Object.values(STRENGTH_EXERCISES).map((ex) => {
                            const valA = Number(rmsA[ex.id]) || ex.default1RM;
                            const valB = Number(rmsB[ex.id]) || ex.default1RM;
                            const diffKg = Math.round((valA - valB) * 10) / 10;
                            const relA = (valA / weightA).toFixed(2);
                            const relB = (valB / weightB).toFixed(2);
                            return (
                              <tr key={ex.id}>
                                <td className="py-1.5 px-2 font-sans font-semibold text-slate-200">
                                  {ex.name}
                                </td>
                                <td className="py-1.5 px-2 text-yellow-300 font-bold">
                                  {valA} kg <span className="text-[10px] text-slate-400 font-normal">({relA}x)</span>
                                </td>
                                <td className="py-1.5 px-2 text-cyan-300 font-bold">
                                  {valB} kg <span className="text-[10px] text-slate-400 font-normal">({relB}x)</span>
                                </td>
                                <td className={`py-1.5 px-2 text-right font-black ${
                                  diffKg > 0 ? 'text-emerald-400' : diffKg < 0 ? 'text-rose-400' : 'text-slate-400'
                                }`}>
                                  {diffKg > 0 ? `+${diffKg}` : diffKg} kg
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </main>

      {/* BARRA DE NAVEGAÇÃO INFERIOR FIXA PARA TELEMÓVEL (ERGONOMIA DE GINÁSIO - US2 - T010) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl">
        <div className="grid grid-cols-7">
          {[
            { id: 'TODAY', label: 'Treino', icon: Flame },
            { id: 'DATABASE', label: 'Alunos/DB', icon: Database },
            { id: 'LOAD', label: 'Analytics', icon: BarChart3 },
            { id: 'STRENGTH_RM', label: '1RMs', icon: Dumbbell },
            { id: 'CALENDAR', label: '26 Dias', icon: Calendar },
            { id: 'STRATEGY', label: 'Tática', icon: Compass },
            { id: 'NUTRITION', label: 'Nutrição', icon: Utensils }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-2.5 px-1 min-h-[54px] text-[10px] font-bold transition-all ${
                  active
                    ? 'text-yellow-400 bg-yellow-400/10 border-t-2 border-yellow-400'
                    : 'text-slate-400 hover:text-slate-200 border-t-2 border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="truncate max-w-full">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MODAL DE SINCRONIZAÇÃO WEB <-> MOBILE & INSTALAÇÃO PWA (US3 - T013) */}
      {syncModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-400">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase">
                    Sincronização Web ↔ Mobile &amp; App PWA
                  </h3>
                  <p className="text-xs text-slate-400">
                    Mantenha os seus 1RMs, táticas Pareto 80/20 e diário de 26 dias iguais no PC e no Telemóvel.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSyncModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Opção 1: Cloud Sync via Código de Atleta (Firebase Firestore) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-yellow-400 flex items-center gap-1.5">
                  <Cloud className="w-4 h-4" />
                  1. Sincronização na Nuvem (Firebase Cloud Firestore)
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {lastSyncedAt ? `Último sync: ${new Date(lastSyncedAt).toLocaleTimeString()}` : 'Local-First Ativo'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">
                    Seu Código de Atleta (3-40 carateres):
                  </label>
                  <input
                    type="text"
                    value={syncCode}
                    onChange={(e) => setSyncCode(e.target.value)}
                    placeholder="ex: atleta-joao-26d"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">
                    Firebase Project ID:
                  </label>
                  <input
                    type="text"
                    value={firebaseProjectId}
                    onChange={(e) => setFirebaseProjectId(e.target.value)}
                    placeholder="hyrox-simulado-26d"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={pushToCloudFirestore}
                  disabled={syncStatus === 'SYNCING'}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-slate-950 font-black text-xs transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'SYNCING' ? 'animate-spin' : ''}`} />
                  Guardar na Nuvem (Push)
                </button>
                <button
                  onClick={pullFromCloudFirestore}
                  disabled={syncStatus === 'SYNCING'}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 disabled:opacity-50 text-cyan-300 border border-cyan-500/40 font-bold text-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Carregar da Nuvem (Pull)
                </button>
              </div>
            </div>

            {/* Opção 2: Backup Direto JSON (Funciona 100% Offline / WhatsApp / AirDrop) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-xs font-extrabold uppercase text-emerald-400 flex items-center gap-1.5">
                <Download className="w-4 h-4" />
                2. Transferência Instantânea por Ficheiro JSON (Sem Conta / Offline)
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exporte todos os seus dados num ficheiro leve (<code>.json</code>) e abra-o no seu telemóvel ou computador a qualquer momento.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleExportBackupJson}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exportar Backup (.JSON)
                </button>
                <button
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Importar Backup (.JSON)
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json,.json"
                  onChange={handleImportBackupJson}
                  className="hidden"
                />
              </div>
            </div>

            {syncMessage && (
              <div className={`p-3 rounded-xl border text-xs font-medium ${
                syncStatus === 'ERROR'
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              }`}>
                {syncMessage}
              </div>
            )}

            {/* Guia de Instalação no Ecrã Principal (PWA Mobile) */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs space-y-1.5">
              <span className="font-extrabold uppercase text-cyan-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                Como instalar como App no Telemóvel (Funciona Offline no Ginásio):
              </span>
              <p className="text-slate-300">
                • <strong>Android (Chrome):</strong> Toque no menu <strong>⋮</strong> e selecione <strong>&quot;Instalar aplicação&quot;</strong> ou <strong>&quot;Adicionar ao ecrã principal&quot;</strong>.
              </p>
              <p className="text-slate-300">
                • <strong>iPhone / iOS (Safari):</strong> Toque no botão <strong>Partilhar (↑)</strong> na barra inferior e escolha <strong>&quot;Adicionar ao ecrã principal&quot;</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

class HyroxErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error && error.message ? error.message : String(error) };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-lg">
                HX
              </div>
              <div>
                <h2 className="text-base font-black uppercase text-white">HYROX Periodização</h2>
                <p className="text-xs text-rose-400 font-semibold">Auto-Recuperação de Sessão Ativa</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detetámos um estado local antigo no navegador ({this.state.errorMessage}). Clique abaixo para limpar o cache local e iniciar imediatamente.
            </p>
            <button
              onClick={() => {
                try { localStorage.clear(); } catch (_e) {}
                window.location.reload();
              }}
              className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider"
            >
              Restaurar Padrões e Iniciar Agora
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const mountHyroxApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;
  window.__HYROX_BOOTED__ = true;
  if (typeof createRoot === 'function') {
    createRoot(rootElement).render(
      <HyroxErrorBoundary>
        <App />
      </HyroxErrorBoundary>
    );
  } else if (ReactDOM && typeof ReactDOM.render === 'function') {
    ReactDOM.render(
      <HyroxErrorBoundary>
        <App />
      </HyroxErrorBoundary>,
      rootElement
    );
  }
};

mountHyroxApp();

if (
  'serviceWorker' in navigator &&
  (window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1')
) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js?v=4').catch(() => {});
  });
}
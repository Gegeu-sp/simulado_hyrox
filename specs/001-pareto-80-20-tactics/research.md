# Phase 0 Research: Motor Tático de Pareto 80/20 para Periodização HYROX (26 Dias)

**Feature**: `001-pareto-80-20-tactics`
**Date**: 2026-11-10

## 1. Quantificação da Regra do Motor Aeróbico (80/20) na Periodização de 26 Dias

- **Decision**: Classificar as 26 sessões da periodização segundo a sua contribuição para o **Motor Aeróbico & Corrida Comprometida (80% Determinante Primário)** vs. **Piso de Força & Capacidade Local (20% Suporte Neuromuscular)**, utilizando tanto a contagem de sessões ativas quanto as Unidades Arbitrárias de carga interna (`sRPE = RPE × Duração`).
  - Categorias atribuídas ao eixo **80% Motor Aeróbico / Específico de Ritmo**: `AEROBIC` (Zona 2 & Mobilidade), `COMPROMISED` (Compromised Running), `SPEED` (VO2máx & Limiar), `ERG_CAPACITY` (Ergómetros & Core Aeróbico), `SIMULATION` (Simulação HYROX) e `RACE_DAY` (Simulado Oficial) — representam 18 das 22 sessões ativas (~81,8% das sessões de treino, excluindo os 4 dias `REST`).
  - Categoria atribuída ao eixo **20% Piso de Força Estrutural**: `STRENGTH` (Dias 1, 8, 15 e 21) — exatamente 4 das 22 sessões ativas (~18,2% das sessões de treino).
- **Rationale**: A distribuição original do plano de 26 dias já reflete matematicamente uma proporção de **81,8% / 18,2%** nas sessões ativas (`18` sessões aeróbicas/híbridas vs. `4` sessões de força pura), validando cientificamente o Princípio de Pareto. Medir a aderência real do atleta contra esta proporção permite detetar imediatamente quando o atleta falta às rodagens de Zona 2 ou intervalos de limiar mas comparece apenas aos treinos de força.
- **Alternatives Considered**:
  - *Contabilizar apenas quilómetros corridos*: Rejeitado porque sessões de ergómetros (SkiErg/Row) em limiar aeróbico também desenvolvem o motor central sem impacto articular.
  - *Criar um calendário paralelo*: Rejeitado para preservar a integridade imutável dos 26 dias (Princípio I da Constituição).

## 2. Modelo de Avaliação do "Piso de Força" (Strength Floor Index)

- **Decision**: Estabelecer um modelo de **Índice de Reserva de Força Relativa (Strength Floor Ratio)** que compara os `1RMs` compostos do atleta com as cargas oficiais da divisão selecionada (`DIVISIONS[divisionKey]`) em 5 estações críticas:
  1. **Sled Push (`sledPush` kg)**: Avaliado pelo maior valor entre `Back Squat 1RM` e `Front Squat 1RM × 1.15`.
     - *Protegido (Domínio Metabólico)*: `1RM Base >= 0.85 × SledPush_RW` (ex.: >= 130 kg para Sled de 152 kg na Men Open)
     - *Limiar (Atenção Mecânica)*: `0.65 × SledPush_RW <= 1RM Base < 0.85 × SledPush_RW`
     - *Alerta SNC (Modo Sobrevivência)*: `1RM Base < 0.65 × SledPush_RW`
  2. **Sled Pull (`sledPull` kg)**: Avaliado pelo maior valor entre `Trap Bar Deadlift 1RM` e `RDL 1RM × 1.10`.
     - *Protegido*: `1RM Base >= 1.45 × SledPull_RW` (ex.: >= 150 kg para Sled Pull de 103 kg na Men Open)
     - *Limiar*: `1.15 × SledPull_RW <= 1RM Base < 1.45 × SledPull_RW`
     - *Alerta SNC*: `1RM Base < 1.15 × SledPull_RW`
  3. **Farmer's Carry (`2 × farmersCarry` kg)**: Avaliado pela combinação de tração isométrica (`Trap Bar Deadlift 1RM`) face ao peso total transportado (`2 × farmersCarry`).
     - *Protegido*: `TrapBar_1RM >= 3.0 × (2 × FarmersCarry_RW)` (ex.: >= 144 kg para 2x24 kg = 48 kg totais)
     - *Limiar*: `2.2 × Total_Carry <= TrapBar_1RM < 3.0 × Total_Carry`
     - *Alerta SNC*: `TrapBar_1RM < 2.2 × Total_Carry`
  4. **Sandbag Lunges (`sandbagLunges` kg)**: Avaliado pelo `Heavy Barbell Walking Lunges 1RM` (e `Bulgarian Split Squat 1RM`).
     - *Protegido*: `WalkingLunge_1RM >= 3.0 × Sandbag_RW` (ex.: >= 60 kg de 1RM para saco de 20 kg, operando a <= 33% de 1RM)
     - *Limiar*: `2.2 × Sandbag_RW <= WalkingLunge_1RM < 3.0 × Sandbag_RW`
     - *Alerta SNC*: `WalkingLunge_1RM < 2.2 × Sandbag_RW`
  5. **Wall Balls (`wallBallsWeight` kg, 100 reps)**: Avaliado pelo `Push Press com Halteres 1RM (por mão)` e `Goblet Squat 1RM`.
     - *Protegido*: `dbPushPress_1RM >= 3.5 × WallBall_RW` (ex.: >= 21 kg por mão para bola de 6 kg)
     - *Limiar*: `2.5 × WallBall_RW <= dbPushPress_1RM < 3.5 × WallBall_RW`
     - *Alerta SNC*: `dbPushPress_1RM < 2.5 × WallBall_RW`
- **Rationale**: Cargas em estações de resistência muscular localizada que excedem 40–50% da força máxima do indivíduo recrutam unidades motoras de alto limiar precocemente, gerando acidose severa e fadiga central. Estes multiplicadores refletem exatamente os valores padrão da aplicação (`Back Squat 130kg`, `Trap Bar 160kg`, `Walking Lunge 70kg`, `Push Press 24kg`) para um atleta competitivo de `MEN_OPEN`.
- **Alternatives Considered**:
  - *Usar apenas o peso corporal do atleta*: Insuficiente porque dois atletas de 75 kg podem ter reservas neuromusculares radicalmente distintas.

## 3. Simulação da Roxzone e Protocolo dos 3 Passos

- **Decision**: Modelar a Roxzone como 16 transições oficiais (8 entradas de estação + 8 saídas para a corrida) onde o atleta define o seu tempo médio atual/projetado por transição (padrão editável: `25s` por transição = `6m40s` totais) e o compara com o modo **Protocolo Cirúrgico dos 3 Passos** (`20s` por transição = `5m20s`, nível Top 10% Elite) e com o perfil **Passivo / Caminhada** (`43s` por transição = `11m28s`, nível Bottom 10%). Além disso, adicionar no Cronómetro Tático de Roxzone/EMOM alertas visuais para a janela de `15s / 20s` do Protocolo dos 3 Passos.
- **Rationale**: Converte um conceito abstrato ("não caminhar na Roxzone") numa métrica tangível ao segundo, mostrando quantos minutos e quantos segundos por quilómetro de corrida equivalem ao tempo ganho na transição (`Economia em seg / 8 km = equivalente em seg/km de pace`).
- **Alternatives Considered**:
  - *Cronómetro separado em outra página*: Rejeitado pelo Princípio V da Constituição (utilitários operacionais devem estar acessíveis e integrados sem fricção).

## 4. Esquemas de Fracionamento Preventivo (Sandbag Lunges & Wall Balls)

- **Decision**: Oferecer 3 perfis estruturados de quebra preventiva (*Rep-Breaking Schemes*) para as Estações 7 e 8, persistidos no `localStorage`:
  - **Perfil 1 — Conservador / Anti-Falha (`SAFE_80_20`)**:
    - *Wall Balls (100 reps)*: `20 - 15 - 15 - 15 - 15 - 10 - 10` (6 micro-pausas de 4 a 5 respirações / ~7s; tempo estimado: ~3m45s–4m10s).
    - *Sandbag Lunges (100m)*: Quebras de `12,5m` com 2 passos sem pousar o saco + 3 respirações no topo a cada viragem.
  - **Perfil 2 — Tático Equilibrado (`BALANCED_PARETO` - Padrão)**:
    - *Wall Balls (100 reps)*: `25 - 20 - 15 - 15 - 15 - 10` (5 micro-pausas de 3 a 5 respirações / ~6s; tempo estimado: ~3m15s–3m40s).
    - *Sandbag Lunges (100m)*: Segmentos de `25m` contínuos, com micro-pausa em pé de 2 a 3 respirações no meio (`12,5m`) apenas nos últimos 50m.
  - **Perfil 3 — Agressivo / Pro (`ELITE_DENSITY`)**:
    - *Wall Balls (100 reps)*: `35 - 25 - 20 - 20` (3 micro-pausas de 3 respirações / ~4s; tempo estimado: ~2m45s–3m05s).
    - *Sandbag Lunges (100m)*: Segmentos de `25m unbroken`, pausa de 3 respirações estritamente nas 3 viragens de 25m.
- **Rationale**: Cobre todos os níveis de condicionamento mantendo a regra inviolável de Pareto: pausar preventivamente por 3–5 respirações antes da falha concêntrica.
- **Alternatives Considered**:
  - *Campo de texto livre apenas*: Menos acionável sob fadiga; oferecer 3 perfis táticos pré-calculados garante seleção em 1 clique (cumprindo `SC-004`).


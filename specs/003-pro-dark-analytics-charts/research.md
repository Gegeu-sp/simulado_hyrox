# Phase 0 Research: Layout Profissional Dark Mode Responsivo (Web & Mobile) e Suite de 7 Gráficos Analíticos & Pareto HYROX

**Feature**: `003-pro-dark-analytics-charts`  
**Date**: 2026-11-10

---

## 1. Motor Gráfico Vetorial Responsivo (SVG Nativo em React vs. Bibliotecas Externas Pesadas)

- **Decision**: Construir os **7 gráficos interativos** utilizando componentes **SVG vetoriais nativos em React** (`viewBox` elástico, gradientes `<linearGradient>`, polígonos trigonométricos para o Radar, curvas suaves/polilinhas com pontos interativos e *tooltips*/legendas em Tailwind CSS) diretamente em `public/index.html` (e espelhado em `hyrox_26_day_tactical_periodization_tracker.html`).
- **Rationale**:
  1. **Zero Risco de Quebra em CDN / 100% Offline-First (Princípio III da Constituição)**: Bibliotecas externas como `Recharts` ou `Chart.js` via UMD/ESM frequentemente sofrem conflitos de dependências (`react-is`, `prop-types`, `d3-*`) em execução *browser-native* com `@babel/standalone`. O SVG nativo em React tem **zero dependências extras**, carrega instantaneamente (< 5ms) e funciona 100% *offline* no Service Worker (`public/sw.js`).
  2. **Alinhamento Pixel-Perfect para Web & Mobile**: Com `viewBox` dedicado e classes responsivas Tailwind (`w-full h-auto`), os gráficos escalam sem distorção desde ecrãs de telemóvel (`375px`) até monitores ultrawide (`1440px+`), mantendo tipografia mono-espaçada nítida.
  3. **Customização Científica HYROX**: Permite desenhar elementos específicos exigidos pelo utilizador que bibliotecas genéricas dificultam, como a **Linha de Corte de 80% no Gráfico de Pareto** com destaque cromático das barras "Vital Few", os **Quadrantes de Fadiga no Scatter Plot** e o **Polígono Duplo (Atleta vs. Benchmark da Divisão) no Gráfico de Radar**.
- **Alternatives Considered**:
  - *Recharts / Chart.js via CDN*: Rejeitado pelo peso adicional (~250KB), risco de incompatibilidade ESM no browser e menor controlo sobre o layout mobile compacto.

---

## 2. Arquitetura Visual "Pro Dark Mode" e Alinhamento Web ↔ Mobile

- **Decision**: Implementar um sistema de design *Pro Dark Mode* inspirado em plataformas de telemetria desportiva de elite (WHOOP / Garmin Connect / HYROX Pro):
  - **Paleta de Superfícies em Camadas**:
    - Fundo Base OLED/Slate: `#020617` (`bg-slate-950`) com iluminação radial subtil no topo;
    - Cartões Primários: `bg-slate-900/90 backdrop-blur-md border border-slate-800/90 shadow-xl rounded-2xl`;
    - Sub-cartões e Painéis de Gráficos: `bg-slate-950/90 border border-slate-800/80 rounded-xl`;
    - Destaques Semânticos: Amarelo Competitivo HYROX (`#facc15`), Ciano Aeróbico/Roxzone (`#22d3ee`), Esmeralda Recuperação/Zona 2 (`#34d399`), Âmbar Força/Limiar (`#fbbf24`), Rosa/Vermelho Sobrecarga/VO2 (`#fb7185`) e Roxo Pareto/Fracionamento (`#c084fc`).
  - **Barra Executiva de KPIs (Quick Telemetry Strip)**:
    - Faixa de 4 cartões alinhados logo abaixo do cabeçalho exibindo em tempo real: (1) **Progresso do Ciclo & Microciclo Ativo**, (2) **Balanço de Pareto 80/20 (Aeróbico vs. Força)**, (3) **Índice de Prontidão & Carga Acumulada (sRPE)** e (4) **Tempo Estimado Roxzone + Meta GRP**.
  - **Alinhamento Simétrico Web & Mobile**:
    - Utilização consistente de `flex flex-col justify-between h-full` em cartões lado a lado (`grid-cols-1 lg:grid-cols-2`), garantindo que os rodapés e cabeçalhos dos cartões fiquem alinhados horizontalmente em Desktop e empilhados com espaçamento uniforme (`gap-4 sm:gap-6`) em Mobile.
- **Rationale**: Atende diretamente ao pedido de *"melhorar o layout da página mais profissional, com dark mode, deixar a página configurada e alinhada para web e mobile"*, cumprindo o Princípio V da Constituição.

---

## 3. Modelagem Matemática dos 7 Gráficos Analíticos

- **Decision**: Derivar todos os 7 gráficos em tempo real (`useMemo`) a partir dos dados canónicos dos 26 dias (`WORKOUT_DAYS`), dos `1RMs` do atleta, da `divisionKey`, do `goalPace`, do `roxzoneTargetSec` e dos registos reais (`completedDays`, `dayLogs`):
  1. **Gráfico 1 — Linha (`Evolução de Desempenho e Carga`)**:
     - Modo A (*Carga sRPE*): Curva Planeada vs. Curva Realizada/Projetada ao longo dos Dias 1 a 26;
     - Modo B (*Força & Tonelagem Relativa*): Evolução da intensidade prescrita (`% 1RM`) e carga média nos levantamentos compostos;
     - Modo C (*Ritmo / Pace de Corrida*): Evolução do ritmo específico de treino (`s/km`) face à meta `GRP`.
  2. **Gráfico 2 — Área (`Volume Acumulado por Agrupamento Muscular`)**:
     - Curvas cumulativas empilhadas ao longo dos 26 dias para: (1) **Motor Aeróbico / Corrida**, (2) **Cadeia Anterior (Quadríceps / Sled Push / Wall Balls / Lunges)**, (3) **Cadeia Posterior (Glúteos / Isquiotibiais / Sled Pull / RDL)**, (4) **Core & Grip (Farmer's Carry / Estabilidade)** e (5) **Superior Push/Pull (SkiErg / Rowing / Push Press)**.
  3. **Gráfico 3 — Barras Empilhadas/Agrupadas (`Distribuição Semanal nos 4 Microciclos`)**:
     - Alternância entre: (A) **Séries Semanais Efetivas por Grupo Muscular** nas Semanas 1 a 4 e (B) **Minutos Semanais em Zonas de Frequência Cardíaca (`Z1` a `Z5`)** nas Semanas 1 a 4.
  4. **Gráfico 4 — Radar / Teia (`Perfil Multidimensional do Atleta`)**:
     - 5 Eixos (`0–100`): **Força** (média das reservas de 1RM vs. cargas da divisão), **Resistência** (ritmo GRP + conclusão de sessões aeróbicas), **Mobilidade** (adesão às sessões regenerativas/mobilidade de quarta/domingo e técnica de agachamento), **Potência** (capacidade em trenós pesados, ergómetros e VO2máx) e **Velocidade** (eficiência na Roxzone `16x` + sprint final).
  5. **Gráfico 5 — Dispersão (`Correlação Carga Externa vs. Carga Interna PSE`)**:
     - Eixo X: Carga Externa Normalizada da Sessão (`loadIndex × durationMin`); Eixo Y: Perceção Subjetiva de Esforço (Borg `6–20` real ou projetada). Destaca a diagonal de acoplamento normal e a zona superior de fadiga desproporcional.
  6. **Gráfico 6 — Combinado Barra + Linha (`Volume de Treino vs. Prontidão / VFC Estimada`)**:
     - Barras Verticais: Volume/Carga de cada dia ou semana; Linha Sobreposta: Índice de Prontidão / Estabilidade de FC Basal & VFC (`0–100%`), refletindo a carga aguda dos dias anteriores e a supercompensação no Microciclo 4.
  7. **Gráfico 7 — Diagrama de Pareto 80/20 (`Eficiência de Exercícios e Diagnóstico de Prova`)**:
     - Avalia os 10 componentes da prova (`Corrida 8x1km`, `Sled Push`, `Wall Balls`, `Sandbag Lunges`, `Sled Pull`, `Burpee Broad Jumps`, `Roxzone 16x`, `Rowing`, `SkiErg`, `Farmer's Carry`).
     - Alterna entre **"Desgaste / Fadiga Acumulada (%)"** e **"Tempo Perdido / Excedente vs. Elite (segundos)"**, ordena as barras do maior para o menor custo no Eixo X, traça a curva acumulada (`0–100%`) no Eixo Y direito e marca a linha de corte de **80%**, isolando onde o atleta deve focar o seu treino técnico.


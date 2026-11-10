# Feature Specification: Layout Profissional Dark Mode Responsivo (Web & Mobile) e Suite Completa de Gráficos Analíticos & Diagrama de Pareto HYROX

**Feature Branch**: `003-pro-dark-analytics-charts`  
**Created**: 2026-11-10  
**Status**: Draft  
**Input**: User description: "melhorar o layout da pagina mais profissional, com dark mode, deixar a pagian configurada e alinha para web e mobile. alem disso implementar grafico como 1. Evolução de Desempenho e Carga (Gráfico de Linha + Gráfico de Área), 2. Distribuição e Composição do Treino (Gráfico de Barras Agrupadas ou Empilhadas + Gráfico de Radar / Teia), 3. Correlação e Métricas de Recuperação (Gráfico de Dispersão + Gráfico Combinado Linha + Barra Vertical), e grafico de pareto (Pareto para Eficiência de Exercícios: Eixo X Exercícios do programa, Eixo Y Linha Acumulada de Percepção de Esforço/Fadiga ou Tempo Gasto na prova, Diagnóstico 80/20)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Layout Profissional Dark Mode e Alinhamento Perfeito em Web e Mobile (Priority: P1)

Como atleta de HYROX que utiliza a plataforma tanto no computador (análise detalhada de microciclos) como no telemóvel durante o treino no ginásio/pista, quero uma interface com estética profissional *Dark Mode* de alto contraste, cartões perfeitamente alinhados, hierarquia tipográfica clara, indicadores KPI no topo e grelhas responsivas sem quebras visuais para navegar e ler todos os dados e gráficos sem esforço em qualquer ecrã.

**Why this priority**: A qualidade visual, legibilidade em ambiente de ginásio (*Dark Mode* OLED/Slate) e o alinhamento rigoroso entre Web (`>= 1024px`) e Mobile (`< 768px`) são a fundação onde todos os treinos e os 7 novos gráficos analíticos são apresentados.

**Independent Test**: Abrir a aplicação em resolução Desktop (`1440x900`) e Mobile (`375x812`), verificar o alinhamento simétrico dos cabeçalhos, cartões de KPIs, seletores de filtros e grelhas de gráficos, confirmando zero transbordo horizontal (*overflow-x*) e contraste superior a `7:1` em todos os textos e rótulos de dados.

**Acceptance Scenarios**:

1. **Given** que o utilizador abre a aplicação em Desktop ou Mobile, **When** visualiza o cabeçalho de comando, os cartões de resumo executivo (KPIs) e as secções de treino/analytics, **Then** todos os cartões apresentam alturas, espaçamentos internos (*padding*), bordas subtis translúcidas e alinhamento de grelha uniformes no tema *Dark Mode* profissional (`#020617` / `#0f172a` com acentos em amarelo HYROX `#facc15`, ciano `#22d3ee`, esmeralda `#34d399` e rosa `#fb7185`).
2. **Given** que o utilizador acede à aplicação num smartphone (`375px` de largura), **When** navega entre as abas pela barra inferior fixa e visualiza os painéis gráficos, **Then** cada gráfico adapta automaticamente a sua escala, legendas e *tooltips* ao ecrã tátil sem cortar textos nem exigir zoom manual.

---

### User Story 2 - Gráficos de Evolução de Desempenho e Carga (Sobrecarga Progressiva) (Priority: P1)

Como atleta em preparação de 26 dias, quero visualizar a evolução temporal da minha carga e volume através de um **Gráfico de Linha (Line Chart)** e de um **Gráfico de Área (Area Chart)** para confirmar se estou a progredir semana após semana ou a estagnar antes do simulado de 05/12.

**Why this priority**: O controlo da sobrecarga progressiva ao longo dos 4 microciclos é essencial para validar se o estímulo planeado vs. realizado respeita a subida até ao Microciclo 2 e o polimento até ao Dia 26.

**Independent Test**: Aceder ao painel de gráficos de evolução, alternar as métricas do Gráfico de Linha (Carga/Tonelagem sRPE, Evolução de 1RM/Força e Ritmo/Pace) e inspecionar o Gráfico de Área de volume acumulado por agrupamento muscular ao longo dos 26 dias.

**Acceptance Scenarios**:

1. **Given** que o atleta visualiza a secção "1. Evolução de Desempenho e Carga", **When** interage com o **Gráfico de Linha (Line Chart)**, **Then** o sistema exibe a curva temporal ao longo dos 26 dias (4 microciclos) permitindo alternar entre: (a) Carga de Treino (sRPE Planeado vs. Realizado em UA), (b) Tonelagem / Intensidade Relativa (% 1RM), e (c) Ritmo de Corrida (Pace GRP Alvo vs. Ajustado), destacando visualmente a tendência de progressão.
2. **Given** que o atleta visualiza o **Gráfico de Área (Area Chart)** na mesma secção, **When** analisa a evolução ao longo dos dias 1 a 26, **Then** o gráfico apresenta o **Volume Total Acumulado por Agrupamento Muscular / Sistema** (Cadeia Anterior/Quadríceps, Cadeia Posterior/Glúteos, Core & Grip, Superior Empurrar/Puxar e Motor Aeróbico de Corrida), evidenciando o crescimento cumulativo de trabalho realizado.

---

### User Story 3 - Gráficos de Distribuição e Composição Multidimensional do Treino (Priority: P2)

Como atleta híbrido, quero analisar o equilíbrio da minha preparação através de um **Gráfico de Barras Empilhadas/Agrupadas (Stacked Bar Chart)** por microciclo e de um **Gráfico de Radar / Teia (Radar Chart)** de 5 dimensões para identificar imediatamente se algum grupo muscular, zona cardíaca ou capacidade física está negligenciada ou em excesso.

**Why this priority**: Evita assimetrias entre força, resistência, mobilidade, potência e velocidade que comprometem o desempenho global no HYROX.

**Independent Test**: Alterar os 1RMs, o pace alvo ou os treinos concluídos e verificar a atualização imediata do Gráfico de Barras Empilhadas (Séries por Grupo Muscular vs. Tempo em Zonas Z1–Z5 por semana) e do polígono no Gráfico de Radar (Força, Resistência, Mobilidade, Potência, Velocidade).

**Acceptance Scenarios**:

1. **Given** que o atleta visualiza a secção "2. Distribuição e Composição do Treino", **When** consulta o **Gráfico de Barras Empilhadas (Stacked Bar Chart)** dos 4 Microciclos, **Then** pode alternar entre a visualização de **Séries Semanais por Grupo Muscular** (Pernas/Anterior, Cadeia Posterior, Costas/Puxada, Ombros/Empurrar, Core/Grip) e **Tempo Semanal em Zonas de Frequência Cardíaca (`Z1` a `Z5`)**, comparando o volume total planeado e executado de cada semana.
2. **Given** que o atleta consulta o **Gráfico de Radar / Teia (Radar Chart)**, **Then** o sistema desenha o perfil multidimensional nos 5 eixos (**Força**, **Resistência**, **Mobilidade**, **Potência** e **Velocidade**) numa escala `0–100%`, comparando o polígono atual do atleta com o polígono de referência da divisão selecionada (`Women Open`, `Men Open`, `Women Pro`, `Men Pro`) e apontando o elo mais fraco.

---

### User Story 4 - Gráficos de Correlação Esforço-Fadiga e Prontidão / Recuperação (Priority: P2)

Como atleta que treina 6 vezes por semana sob risco de *overtraining*, quero cruzar a carga externa com a resposta fisiológica interna num **Gráfico de Dispersão (Scatter Plot)** e num **Gráfico Combinado (Barras Verticais + Linha)** para detetar precocemente fadiga excessiva e validar a supercompensação no *Tapering*.

**Why this priority**: Permite ajustar a carga antes que uma acumulação excessiva de fadiga central/periférica prejudique o simulado no Dia 26.

**Independent Test**: Registar valores de RPE real, duração e FC basal matinal em diferentes dias do ciclo e verificar o posicionamento dos pontos no Scatter Plot (Carga Externa vs. PSE/RPE) e a curva de Prontidão/VFC estimada sobreposta às barras de volume semanal/diário no Gráfico Combinado.

**Acceptance Scenarios**:

1. **Given** que o atleta acede à secção "3. Correlação e Métricas de Recuperação", **When** analisa o **Gráfico de Dispersão (Scatter Plot)**, **Then** cada sessão de treino é plotada com a **Carga Externa (Volume/Índice de Stress Planeado)** no eixo X e a **Carga Interna (PSE / RPE de Borg 6–20)** no eixo Y, destacando visualmente a zona de resposta normal vs. a zona de alerta de fadiga desproporcional (*overreaching*).
2. **Given** que o atleta analisa o **Gráfico Combinado (Barra Vertical + Linha)**, **Then** as **Barras Verticais** exibem o volume total de treino (por microciclo e por dia) enquanto a **Linha Sobreposta** exibe o **Índice de Prontidão / Recuperação & Estabilidade Autonómica (FC Basal / VFC estimada)** de `0` a `100%`, mostrando a queda controlada no Microciclo 2 e o pico de supercompensação no Microciclo 4.

---

### User Story 5 - Diagrama de Pareto (80/20) para Eficiência de Exercícios e Diagnóstico de Prova (Priority: P1)

Como atleta focado no Princípio de Pareto (80/20), quero um **Gráfico de Pareto (Barras Decrescentes + Curva Acumulada 0–100%)** das estações e corrida do HYROX para visualizar exatamente quais exercícios consomem **80% da minha fadiga acumulada ou do meu tempo perdido de prova**, orientando onde devo focar a minha atenção técnica.

**Why this priority**: Traduz visualmente o coração tático do projeto (Regra 80/20) num diagrama clássico de Pareto com linha de corte aos 80%, isolando os "poucos vitais" (*vital few*) específicos para o perfil fisiológico e de força do atleta.

**Independent Test**: Selecionar no Gráfico de Pareto o modo "Desgaste / Fadiga Acumulada" ou "Tempo Gasto / Perdido na Prova", alterar um 1RM (ex.: Sled Push / Squat) ou o tempo de Roxzone e confirmar que as barras se reordenam em ordem decrescente no Eixo X, a curva acumulada no Eixo Y recalcula os pontos percentuais até 100% e o cartão de diagnóstico destaca os exercícios que cruzam o limiar de 80%.

**Acceptance Scenarios**:

1. **Given** que o atleta visualiza o **Gráfico de Pareto para Eficiência de Exercícios**, **When** observa o **Eixo X (Barras)** e o **Eixo Y Direito (Linha Acumulada)**, **Then** os exercícios/segmentos do programa (`Corrida 8x1km`, `Sled Push`, `Wall Balls`, `Sandbag Lunges`, `Sled Pull`, `Burpee Broad Jumps`, `Roxzone 16x`, `Rowing`, `SkiErg`, `Farmer's Carry`) aparecem ordenados do maior para o menor impacto individual (Barras), acompanhados pela **Linha de Percentagem Acumulada (`0%` a `100%`)** e pela linha horizontal tracejada do **Limiar de Pareto (`80%`)**.
2. **Given** que o gráfico identifica as estações que compõem os primeiros 80% do impacto, **When** o atleta alterna entre **"Fadiga / Esforço Acumulado"** e **"Tempo Perdido vs. Benchmark Elite"**, **Then** o painel de **Diagnóstico Tático 80/20** lista explicitamente quais 3 a 5 exercícios representam os 80% de custo do atleta e qual ajuste técnico/tático prioritário aplicar.

---

### Edge Cases

- **Nenhum registo diário (`dayLogs`) ainda preenchido pelo utilizador**: Todos os 7 gráficos DEVEM apresentar dados imediatos e realistas combinando a linha de base prescrita dos 26 dias e os valores de perfil atuais (`1RMs`, `goalPace`, `divisionKey`, `roxzoneTargetSec`), sobrepondo os dados reais à medida que o atleta conclui e regista os treinos (nunca exibir gráficos em branco ou vazios).
- **Ecrãs pequenos de telemóvel (`320px` a `414px`)**: Os gráficos DEVEM usar contentores responsivos (`viewBox` elástico em SVG, legendas compactas em grelha e rótulos abreviados legíveis) para evitar sobreposição de textos ou *scroll* horizontal forçado.
- **Valores extremos inseridos nos inputs (ex.: 1RM = `0` ou FC Basal vazia)**: Os cálculos de Radar, Dispersão, Prontidão e Pareto DEVEM aplicar limites defensivos (*clamping* entre `0` e `100%`) para impedir divisões por zero (`NaN` / `Infinity`) nas coordenadas dos gráficos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Refinamento Visual Dark Mode Profissional)**: O sistema DEVE aplicar um layout *Dark Mode* refinado e consistente (`slate-950` / `slate-900` com superfícies translúcidas, cartões alinhados em grelha, badges semânticos e resumo de KPIs no topo) perfeitamente alinhado tanto para ecrãs Web Desktop como para ecrãs Mobile.
- **FR-002 (Gráfico de Linha — Evolução de Desempenho e Carga)**: O sistema DEVE renderizar um **Gráfico de Linha (Line Chart)** interativo ao longo dos 26 dias / 4 microciclos com seletor de métrica (Carga sRPE Planeada vs. Real, Progressão de Força/Tonelagem Relativa e Ritmo/Pace de Corrida).
- **FR-003 (Gráfico de Área — Volume Acumulado por Grupo Muscular)**: O sistema DEVE renderizar um **Gráfico de Área Empilhada/Acumulada (Area Chart)** mostrando a evolução do volume acumulado ao longo dos 26 dias por agrupamento muscular / padrão motor (Cadeia Anterior/Quadríceps, Cadeia Posterior/Anca, Superior Empurrar/Puxar, Core/Grip e Corrida Aeróbica).
- **FR-004 (Gráfico de Barras Empilhadas — Distribuição Semanal)**: O sistema DEVE renderizar um **Gráfico de Barras Empilhadas/Agrupadas (Stacked Bar Chart)** comparando os 4 Microciclos quanto à **Distribuição Semanal de Séries por Grupo Muscular** e ao **Tempo Gasto nas Zonas de Frequência Cardíaca (`Z1` a `Z5`)**.
- **FR-005 (Gráfico de Radar / Teia — Perfil Multidimensional do Atleta)**: O sistema DEVE renderizar um **Gráfico de Radar (Radar Chart)** de 5 eixos (**Força**, **Resistência**, **Mobilidade**, **Potência**, **Velocidade**) comparando a pontuação atual do atleta (`0–100`) com a meta de referência da sua divisão oficial HYROX.
- **FR-006 (Gráfico de Dispersão — Correlação Carga Externa vs. Interna)**: O sistema DEVE renderizar um **Gráfico de Dispersão (Scatter Plot)** cruzando a Carga Externa da sessão (Eixo X) com a Carga Interna / PSE de Borg `6–20` (Eixo Y), identificando visualmente sessões em zona de Eficiência, Sobrecarga Produtiva ou Alerta de Fadiga Excessiva.
- **FR-007 (Gráfico Combinado — Volume Semanal/Diário + Linha de Prontidão/VFC)**: O sistema DEVE renderizar um **Gráfico Combinado (Barras Verticais + Linha)** cruzando o Volume de Treino (Barras) com o Índice de Prontidão / Recuperação & Estabilidade de FC Basal / VFC estimada (Linha).
- **FR-008 (Gráfico de Pareto 80/20 para Eficiência de Exercícios)**: O sistema DEVE renderizar um **Diagrama de Pareto (Barras Ordenadas + Curva Acumulada 0–100% + Linha de Corte 80%)** avaliando os exercícios/estações do HYROX por **Fadiga/Esforço Acumulado** ou por **Tempo Perdido em Prova**, acompanhado de um diagnóstico automático que isola os exercícios responsáveis por 80% do desgaste/tempo perdido.
- **FR-009 (Reatividade Total e Zero Dependências Quebradas)**: Todos os 7 gráficos DEVEM atualizar instantaneamente quando o atleta altera os seus 1RMs, divisão, pace alvo, tempo de Roxzone ou registos diários de treino, funcionando 100% *offline* na PWA sem depender de servidores externos de renderização.

### Key Entities *(include if feature involves data)*

- **PerformanceEvolutionSeries**: Série temporal dos 26 dias (e agregada pelos 4 microciclos) contendo carga planeada (UA), carga real (UA), intensidade relativa (% 1RM), pace alvo/ajustado e volume acumulado por agrupamento muscular.
- **TrainingCompositionMatrix**: Matriz semanal (Microciclos 1 a 4) com contagem de séries efetivas por grupo muscular (Pernas Anterior, Cadeia Posterior, Costas/Puxada, Ombros/Empurrar, Core/Grip) e minutos por zona de frequência cardíaca (`Z1` a `Z5`).
- **AthleteRadarProfile**: Vetor multidimensional de 5 capacidades (`forca`, `resistencia`, `mobilidade`, `potencia`, `velocidade`) normalizado de `0` a `100` face ao benchmark da divisão selecionada.
- **RecoveryCorrelationPoint**: Par ordenado por sessão contendo Carga Externa (`loadIndex` / duração), Carga Interna (`rpe` Borg 6–20), FC Basal Matinal (`morningHR`) e Índice de Prontidão/VFC calculado (`0–100%`).
- **ParetoExerciseEfficiencyItem**: Registo de cada estação/segmento do HYROX contendo custo individual (Fadiga ou Segundos Perdidos), percentagem do total, percentagem acumulada (`0–100%`), flag `isVital80` (dentro do corte de 80%) e recomendação técnica prioritária.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos 7 gráficos especificados (Linha, Área, Barras Empilhadas, Radar/Teia, Dispersão, Combinado Barra+Linha e Pareto de Exercícios) são renderizados de forma interativa e legível tanto em Desktop (`>= 1024px`) como em Mobile (`375px`) sem erros de consola ou quebras de layout.
- **SC-002**: O utilizador consegue identificar em menos de 5 segundos quais os exercícios do programa que acumulam **80% do seu desgaste ou tempo perdido** através da linha de corte de 80% e do diagnóstico automático no Gráfico de Pareto.
- **SC-003**: Qualquer alteração nos parâmetros do atleta (`1RM`, `Divisão`, `Pace GRP`, `Roxzone`, ou `RPE/FC Matinal` de um dia) recalcula e atualiza visualmente os 7 gráficos em menos de 100 milissegundos.
- **SC-004**: O layout *Dark Mode* mantém alinhamento simétrico de cartões, cabeçalhos e barras de navegação em Web e Mobile, preservando 100% das funcionalidades existentes (26 dias, 1RMs, Simulador Roxzone, Fracionamento, Nutrição e Sincronização Firebase/JSON).

## Assumptions

- Os gráficos serão construídos com componentes SVG vetoriais nativos e interativos embutidos na própria aplicação React/Tailwind (`public/index.html` e `hyrox_26_day_tactical_periodization_tracker.html`), garantindo nitidez Retina em qualquer zoom, total compatibilidade com o tema *Dark Mode*, carregamento instantâneo e funcionamento 100% *offline* na PWA sem pacotes pesados que possam falhar em CDN.
- Na ausência de um sensor externo de HRV/VFC acoplado, o Índice de Prontidão / VFC no Gráfico Combinado é calculado dinamicamente a partir da variação da FC Basal Matinal registada pelo atleta (ou modelada pela curva fisiológica de carga/recuperação dos 4 microciclos) cruzada com a carga interna acumulada (sRPE).


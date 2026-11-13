# Feature Specification: Gráfico e Análise de Pareto (80/20) Dinâmico por Dia de Treino

**Feature Branch**: `009-daily-workout-pareto-analysis`  
**Created**: 2026-11-12  
**Status**: Ready for Implementation  
**Input**: User description: "Gráfico de Pareto para Eficiência de Exercícios precisa ser de acordo para cada dia de treino, a analise de Pareto precisa ser para cada treino ja. nao só para o dia da competição. mas, cada treino"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Análise de Pareto Específica para Cada Dia de Treino (Priority: P1)

Como atleta ou treinador utilizando o **HYROX Periodização**, preciso que o **Gráfico de Pareto para Eficiência de Exercícios** calcule e exiba a distribuição de esforço e fadiga dos exercícios e blocos específicos de **cada dia de treino selecionado (Dia 1 a Dia 26)** — e não apenas um gráfico genérico estático para o dia do simulado final —, para que em cada sessão individual eu visualize exatamente quais 20% dos exercícios daquele dia concentram 80% da fadiga ou do tempo da sessão, orientando onde concentrar o foco técnico e onde evitar o desperdício de energia.

**Why this priority**: Cada dia do ciclo de 26 dias possui uma estrutura e objetivo biomecânico diferente (ex.: Dia 1 foca em *Back Squat*, *RDL*, *Sled Push* e *Sled Pull*; Dia 2 foca em *Corrida Z2* e *Mobilidade*; Dia 3 foca em *Corrida GRP*, *SkiErg*, *Burpees*, *Rowing*, *Lunges* e *Wall Balls*; Dia 8 foca em *Bulgarian Split Squat*, *Walking Lunges*, *Trenós com Overload* e *Farmer's Carry*). Analisar apenas o dia da prova impede que o atleta e o treinador tomem decisões táticas de distribuição de esforço no treino diário que estão executando hoje.

**Independent Test**: Na aba **Analytics & Gráficos (7)**, selecionar qualquer dia no novo seletor de treino (ou alternar o dia no topo) e verificar que o Gráfico de Pareto renderiza imediatamente as barras decrescentes com os **exercícios e blocos exatos do dia selecionado** (com suas respectivas cargas em kg e volumes daquela sessão), a curva de porcentagem acumulada (0 a 100%) e o corte de 80%, identificando quais exercícios compõem o grupo **★ Vital 80%** daquele treino específico.

**Acceptance Scenarios**:

1. **Given** o Dia 1 selecionado (*Força Específica & Trenós*), **When** o utilizador visualiza o Gráfico de Pareto, **Then** o gráfico exibe os blocos daquele treino (*Sled Push 100% RW*, *Sled Pull*, *Back Squat 77.5% 1RM*, *Romanian Deadlift*, *Farmer's Carry*, *Aquecimento/Mobilidade*), ordenados por fadiga/tempo, com a linha acumulada isolando os exercícios de maior sobrecarga daquele dia.
2. **Given** o Dia 3 selecionado (*Compromised Running - 5 Rounds*), **When** o utilizador abre o Pareto, **Then** o gráfico decompõe a sessão em *Corrida GRP (4 km)*, *Sandbag Lunges*, *Wall Balls*, *Burpee Broad Jumps*, *SkiErg*, *Rowing* e *Aquecimento*, diagnosticando onde o atleta mais desgasta energia naquela sessão.
3. **Given** o seletor de modo do Pareto, **When** o utilizador alterna entre **"Treino do Dia (Dia X)"** e **"Simulado Completo (Prova 8x1km + 8 Estações)"**, **Then** o gráfico transita de forma fluida entre o Pareto da sessão diária e o Pareto global da prova oficial.

---

### User Story 2 - Seletor Rápido de Dias e Métricas Alternáveis no Painel de Pareto (Priority: P2)

Como utilizador, quero alternar entre os 26 dias diretamente dentro do painel do Gráfico de Pareto (através de um seletor rápido com indicação do tipo de treino e microciclo) e alternar entre duas métricas analíticas:
1. **Fadiga / Carga Interna (UA & % de Desgaste da Sessão)**: Cruzamento do volume, intensidade relativa dos 1RMs e cargas oficiais da divisão.
2. **Tempo Gasto / Duração da Estação (minutos e segundos)**: Tempo despendido em cada bloco do treino.

**Why this priority**: Permite que o treinador analise tanto o impacto cardiovascular/neuromuscular quanto a gestão de tempo em qualquer uma das 26 sessões do plano.

**Independent Test**: Alternar as métricas entre "Fadiga / Esforço Acumulado" e "Tempo Gasto no Treino" no Dia 4 (EMOM 24 min) e conferir a atualização instantânea das barras e dos textos de diagnóstico tático.

**Acceptance Scenarios**:

1. **Given** qualquer dia de descanso absoluto (Dias 6, 13, 20), **When** selecionado no Pareto, **Then** o sistema exibe um estado informativo elegante de supercompensação/regeneração do SNC com as diretivas de recuperação passiva e hidratação.
2. **Given** qualquer dia de treino com dados confirmados registrados no diário (`dayLogs`), **When** o Pareto está no modo de dados confirmados, **Then** os tempos e percepções reais registradas pelo aluno alimentam o cálculo de eficiência daquela sessão.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Motor de Extração Dinâmica de Exercícios por Dia)**: O sistema DEVE analisar os blocos, exercícios de força (`strengthPrescriptions`), estações HYROX (`usesRW`), corrida prescrita (`getDayPrescribedZoneKey`, `getDayPlannedRunDistanceKm`) e exercícios acessórios de cada um dos 26 dias de treino (`WORKOUT_DAYS`), gerando a lista de itens candidatos a Pareto específicos daquela sessão.
- **FR-002 (Cálculo Multidimensional de Impacto Diário)**: Para cada exercício/bloco do dia selecionado, o sistema DEVE calcular:
  - **Fadiga / Sobrecarga Relativa**: Considera o percentual do 1RM prescrito, carga absoluta da divisão, distância/zona de corrida e repetições totais da sessão;
  - **Tempo / Duração Estimada**: Minutos e segundos dedicados àquele exercício na sessão (ex.: corrida, estações, intervalos e descansos estruturados);
  - **Ação Tática / Recomendação de Eficiência**: Orientação prática personalizada para aquele exercício específico no contexto do treino do dia.
- **FR-003 (Ordenação Decrescente e Limiar Pareto 80%)**: Os itens DEVEM ser ordenados decrescentemente pelo valor da métrica selecionada. O sistema calcula a porcentagem individual e acumulada (0% a 100%), desenhando:
  - Barras com gradiente dourado/vermelho para os exercícios do grupo **★ Vital 80%** (os 20% de exercícios que geram 80% do impacto do dia);
  - Barras com gradiente azul/ardósia para os exercícios secundários (20% restante);
  - Linha contínua ciano de percentual acumulado com pontos demarcadores;
  - Linha tracejada horizontal indicadora do **Limiar de Corte Pareto 80%**.
- **FR-004 (Controles Interativos Integrados)**:
  - Seletor de Escopo: **"Treino do Dia (Dia X)"** vs. **"Simulado Oficial Completo (Prova 8x1km + 8 Estações)"**;
  - Seletor rápido de Dia: Menu dropdown ou botões de navegação permitindo navegar entre os Dias 1 a 26 diretamente no gráfico;
  - Alternância de Métrica: **"Fadiga / Esforço da Sessão"** vs. **"Tempo Gasto no Treino"**.
- **FR-005 (Diagnóstico Tático da Sessão)**: O painel DEVE exibir abaixo do gráfico o resumo dos **Exercícios Vitais 80% do Treino**, destacando o exercício de maior custo energético e a diretriz preventiva para não desperdiçar energia nas estações secundárias.

### Key Entities

- **DailyWorkoutParetoItem**:
  - `id`: Identificador único do exercício ou bloco no treino do dia (ex.: `day1_sledPush`, `day3_run`, `day8_walkingLunges`);
  - `name`: Nome completo do exercício/bloco;
  - `shortName`: Rótulo compacto para o Eixo X do gráfico;
  - `fatigueScore`: Pontuação ponderada de fadiga e carga interna na sessão;
  - `timeSec`: Tempo estimado ou confirmado despendido no exercício (em segundos);
  - `value`: Valor correspondente à métrica ativa;
  - `sharePct`: Porcentagem individual em relação ao total da sessão;
  - `cumulativePct`: Porcentagem acumulada até este item;
  - `isVital80`: Booleano indicando se pertence ao grupo dos 80% de impacto vital;
  - `actionTip`: Dica prática de execução e economia energética para aquele exercício.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O Gráfico de Pareto reflete com precisão os exercícios específicos de qualquer um dos 26 dias selecionados com tempo de resposta inferior a 50 milissegundos.
- **SC-002**: 100% dos dias com prescrição de exercícios geram ordenação decrescente com curva acumulada atingindo exatamente 100% no último item.
- **SC-003**: A soma das porcentagens individuais (`sharePct`) de todos os exercícios do treino do dia totaliza exatamente 100.0%.

## Assumptions

- Para dias de descanso absoluto (Dias 6, 13, 20), onde não há exercícios de sobrecarga, o gráfico apresenta um cartão de supercompensação e recuperação ativa do SNC, com opção de visualizar o Pareto do próximo treino ou a visão do Simulado Completo.
- Quando o usuário muda o dia no seletor do cabeçalho ou na aba *Treino do Dia*, o Gráfico de Pareto na aba Analytics sincroniza automaticamente com o mesmo dia selecionado, preservando a coerência visual em toda a aplicação.

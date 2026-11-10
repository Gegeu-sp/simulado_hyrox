# Feature Specification: Motor Tático de Pareto 80/20 para Periodização HYROX (26 Dias)

**Feature Branch**: `001-pareto-80-20-tactics`

**Created**: 2026-11-10

**Status**: Draft

**Input**: User description: "verificar como implementar O Princípio de Pareto (Regra 80/20) — que postula que aproximadamente 80% dos resultados vêm de 20% das causas — é uma ferramenta tática poderosa para aplicar neste projeto de 26 dias até ao seu simulado de HYROX. Como o tempo é escasso (apenas 4 microciclos) e a fadiga periférica e central precisa de ser gerida com precisão cirúrgica para evitar overtraining ou lesões, você pode aplicar o conceito de Pareto em quatro frentes principais: 1. Foco nos Determinantes Primários da Performance (A Regra do Motor Aeróbico)... 2. Identificação e Proteção do Piso de Força (Strength Floor)... 3. Gestão Cirúrgica da Roxzone (O Ganho Marginal de Maior Impacto)... 4. Fracionamento Preventivo nas Estações de Alta Fadiga..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Auditoria do Motor Aeróbico e Regra 80/20 de Volume (Priority: P1)

Como atleta em preparação de 26 dias para o simulado HYROX, preciso visualizar e auditar em tempo real a proporção de foco energético e aderência entre o trabalho aeróbico/corrida (80% do impacto no resultado final) e o trabalho complementar de força/estações (20%), recebendo orientação direta em cada sessão diária sobre qual é o "20% vital" daquele treino e alertas caso esteja a negligenciar rodagens de Zona 2, limiar ou *Compromised Running*.

**Why this priority**: A corrida representa 50% a 60% do tempo total de prova e é o preditor primário do resultado em HYROX. Garantir que o atleta proteja os treinos aeróbicos e compreenda o foco 80/20 em cada um dos 26 dias evita o erro clássico de exaurir-se apenas nas estações funcionais.

**Independent Test**: Pode ser testado de forma independente navegando pelo treino do dia e pelo painel de controlo de carga/Pareto, verificando o cálculo da distribuição 80/20 (planeada vs. concluída pelo atleta) e a exibição do selo de foco de Pareto em cada dia dos 4 microciclos.

**Acceptance Scenarios**:

1. **Given** que o atleta visualiza qualquer um dos 26 dias na aba "Treino do Dia", **When** consulta o resumo tático da sessão, **Then** o sistema destaca explicitamente o "Núcleo Vital 20% (Foco de Pareto)" daquela sessão (ex.: proteger mecânica de corrida sob fadiga, manter Zona 2 estrita sem deriva cardíaca, ou cumprir séries compostas de força sem falha).
2. **Given** que o atleta marca treinos como concluídos ao longo dos 4 microciclos, **When** acede ao painel de análise de Pareto 80/20, **Then** o sistema apresenta a distribuição percentual real entre o volume de Motor Aeróbico/Corrida Comprometida (meta ~80% da aderência/tempo energético) e Trabalho Neuromuscular/Estações Pesadas (meta ~20%), emitindo um alerta preventivo caso o atleta tenha falhado sessões de corrida enquanto cumpriu apenas sessões de força.

---

### User Story 2 - Diagnóstico do "Piso de Força" (Strength Floor) vs. Cargas da Divisão (Priority: P2)

Como atleta, quero que o sistema cruze automaticamente os meus valores de 1RM nos movimentos compostos base (Back/Front Squat, RDL, Trap Bar Deadlift, Walking Lunges, Push Press) com as cargas oficiais da minha divisão competitiva (Sled Push, Sled Pull, Farmer's Carry, Sandbag Lunges e Wall Balls), para saber se o meu "Piso de Força" transforma cada estação num esforço metabólico controlado ou num evento de sobrevivência para o Sistema Nervoso Central (SNC).

**Why this priority**: Atletas com baixa reserva de força relativa perdem tempo desproporcional nas estações pesadas e entram em fadiga central aguda. Identificar vulnerabilidades no *Strength Floor* permite focar os 20% do treino de força (Dias 1, 8, 15 e 21) exatamente nos levantamentos compostos que protegem o atleta.

**Independent Test**: Pode ser testado alterando a divisão competitiva (ex.: `MEN_OPEN` para `MEN_PRO`) ou os valores de `1RM` do atleta e verificando se o diagnóstico de Reserva de Força por estação atualiza instantaneamente o estatuto ("Protegido / Metabólico", "Atenção / Moderado" ou "Risco SNC / Sobrevivência").

**Acceptance Scenarios**:

1. **Given** um atleta com valores de 1RM registados e uma divisão selecionada, **When** consulta a matriz de Piso de Força (Strength Floor), **Then** o sistema exibe para cada estação pesada (Sled Push, Sled Pull, Farmer's Carry, Sandbag Lunges) a relação entre a capacidade máxima do atleta nos exercícios compostos correlacionados e a carga regulamentar da prova, classificando o nível de segurança neuromuscular.
2. **Given** que o atleta está num dia chave de força da periodização (Dias 1, 8, 15 ou 21), **When** visualiza os blocos de força base, **Then** o sistema identifica quais estações oficiais do HYROX são diretamente protegidas por aquele exercício composto e reforça a regra de evitar repetições lixo até à falha.

---

### User Story 3 - Simulador e Protocolo Cirúrgico da Roxzone (Ganho Marginal de 6 Minutos) (Priority: P3)

Como atleta, quero configurar e treinar o "Protocolo dos 3 Passos na Roxzone" com um simulador de economia de tempo nas 16 transições da prova e um modo de cadência de transição no cronómetro tático, para capturar até 80% do ganho marginal de transição (até 6 minutos poupados entre o perfil amador e o top 10%) sem custo metabólico extra na corrida.

**Why this priority**: A Roxzone é o maior ganho marginal "gratuito" do HYROX (diferença de 5m21s vs. 11m25s). Aplicar 20% de disciplina comportamental na saída das estações gera retorno imediato no tempo final do simulado de 05/12.

**Independent Test**: Pode ser testado utilizando a calculadora interativa de Roxzone para comparar o tempo total perdido em 16 transições sob diferentes comportamentos de saída (caminhada passiva vs. Protocolo dos 3 Passos) e acionando o guia de transição no cronómetro da sessão.

**Acceptance Scenarios**:

1. **Given** que o atleta acede à secção tática de Pareto / Estratégia, **When** ajusta o tempo médio de hesitação/caminhada por passagem na Roxzone (16 passagens no total), **Then** o sistema calcula o tempo total gasto na Roxzone, compara-o com o benchmark de elite (5m21s) e com o perfil lento (11m25s), e mostra quantos minutos líquidos serão economizados no simulado ao aplicar o Protocolo dos 3 Passos.
2. **Given** que o atleta está a realizar uma sessão de *Compromised Running* ou *Simulação*, **When** consulta o bloco de transição ou o cronómetro tático, **Then** visualiza o checklist comportamental imediato dos 3 Passos (1. Concluir última rep e dar apenas 3 passos caminhando; 2. Realizar 1 ciclo respiratório nasal profundo + expiração bucal forçada; 3. Iniciar trote imediato no ritmo alvo sem caminhar até ao arco).

---

### User Story 4 - Planeador de Fracionamento Preventivo para Estações de Alta Fadiga (Priority: P3)

Como atleta, quero dispor de planos estruturados e personalizáveis de fracionamento de séries (*Rep-Breaking Schemes*) para as estações finais de alta fadiga (Sandbag Lunges 100m e Wall Balls 100 repetições), com pausas curtas medidas em ciclos respiratórios (3 a 5 respirações) antes da falha concêntrica, para evitar paragens longas e colapso muscular nos quilómetros finais.

**Why this priority**: Atingir a falha muscular concêntrica nas estações 7 e 8 destrói a mecânica da Corrida 8 e custa vários minutos em pausas forçadas. O fracionamento preventivo aplica a lei de Pareto: pequenas pausas de 5–8 segundos preservam 80% da velocidade de execução.

**Independent Test**: Pode ser testado selecionando um perfil de fracionamento para Wall Balls (100 reps) e Sandbag Lunges (100m) e verificando se os esquemas de séries e pausas respiratórias aparecem detalhados tanto na estratégia de prova (05/12) quanto nos treinos específicos que incluem estas estações.

**Acceptance Scenarios**:

1. **Given** que o atleta consulta a tática das Estações 7 (Sandbag Lunges) e 8 (Wall Balls), **When** seleciona a sua estratégia de fracionamento (Conservadora / Preventiva, Equilibrada / 80-20 ou Agressiva / Pro), **Then** o sistema apresenta a sequência exata de blocos (ex.: `25-20-15-15-15-10` ou `20-15-15-15-15-10-10` nos Wall Balls; quebras a cada `25m` ou `12,5m` nos Lunges), o número de respirações de pausa (3 a 5 respirações = ~5–8s) e o tempo total estimado na estação.
2. **Given** que o atleta escolheu o seu esquema de fracionamento preferido, **When** recarrega a aplicação ou navega para o Dia 26 (Simulado Oficial 05/12), **Then** a escolha permanece guardada localmente e visível no plano de execução da prova.

---

### Edge Cases

- **Valores de 1RM zerados ou não preenchidos**: Quando o atleta ainda não configurou os seus 1RMs personalizados ou inseriu `0 kg`, o diagnóstico do Piso de Força (Strength Floor) não deve gerar divisões por zero nem percentagens infinitas; deve exibir um aviso claro indicando que a avaliação utiliza os valores padrão ou requer preenchimento na aba de 1RMs.
- **Nenhum treino concluído no início do ciclo (Dia 1)**: Quando `0/26` dias estão marcados como concluídos, o painel de auditoria 80/20 deve apresentar a distribuição planeada da periodização como referência base sem disparar falsos alertas de negligência aeróbica.
- **Ritmo Alvo (GRP) malformado**: Caso o utilizador digite um ritmo fora do padrão `MM:SS`, os cálculos de impacto de tempo entre corrida (80%) e Roxzone/estações devem recorrer de forma segura ao ritmo padrão (`04:45/km`).
- **Mudança de Divisão Competitiva**: Ao alternar entre `WOMEN_OPEN`, `MEN_OPEN`, `WOMEN_PRO` e `MEN_PRO`, todos os rácios do Piso de Força e recomendações de fracionamento preventivo devem recalcular-se imediatamente de acordo com as novas cargas regulamentares.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE classificar e exibir em cada um dos 26 dias de treino a diretriz específica do **Princípio de Pareto (Núcleo Vital 20%)**, indicando qual é o fator determinante único daquela sessão que garante 80% do benefício fisiológico ou tático planeado.
- **FR-002**: O sistema DEVE calcular e exibir um painel de **Auditoria da Regra do Motor Aeróbico (80/20)** que quantifique a proporção de sessões/carga dedicadas aos determinantes primários (Corrida Aeróbica Zona 2, Limiar/$\text{VO}_2\text{máx}$, *Compromised Running* e Simulações de Ritmo) face ao trabalho puramente estrutural/força máxima, tanto no plano teórico dos 26 dias quanto nos treinos efetivamente concluídos pelo atleta.
- **FR-003**: O sistema DEVE emitir um alerta visual de desequilíbrio de Pareto caso o atleta acumule falhas em sessões de corrida/motor aeróbico enquanto mantém a realização apenas de sessões de força ou estações isoladas (após pelo menos 3 dias registados).
- **FR-004**: O sistema DEVE calcular o **Índice de Piso de Força (Strength Floor)** para as estações pesadas (Sled Push, Sled Pull, Farmer's Carry, Sandbag Lunges e Wall Balls), relacionando os `1RMs` registados pelo atleta nos movimentos compostos de referência (Back Squat, Front Squat, RDL, Trap Bar Deadlift, Bulgarian Split Squat, Walking Lunges, Push Press) com as cargas oficiais da divisão selecionada.
- **FR-005**: Para cada estação avaliada no Piso de Força, o sistema DEVE atribuir um nível de prontidão neuromuscular claro:
  - **Piso Protegido (Domínio Metabólico)**: reserva de força ampla face à carga oficial da divisão;
  - **Zona Limiar (Atenção Mecânica)**: reserva moderada, exigindo rigor técnico para evitar fadiga precoce;
  - **Alerta SNC (Modo Sobrevivência)**: força máxima próxima do limite exigido pela carga oficial, sinalizando prioridade máxima para os 20% de treino de força composta nos Dias 1, 8, 15 e 21.
- **FR-006**: O sistema DEVE disponibilizar uma **Calculadora e Guia Cirúrgico da Roxzone** que permita simular o impacto de diferentes tempos de transição ao longo das 16 passagens oficiais, comparando o tempo projetado do atleta com a referência do Top 10% (5m21s) e dos 10% mais lentos (11m25s), e apresentando o **Protocolo dos 3 Passos**.
- **FR-007**: O sistema DEVE fornecer uma ferramenta de **Fracionamento Preventivo (Rep-Breaking)** para as estações de alta fadiga (Sandbag Lunges — 100m e Wall Balls — 100 reps), oferecendo pelo menos 3 perfis selecionáveis de quebra de séries com pausas pautadas por ciclos respiratórios (3 a 5 respirações antes da falha concêntrica).
- **FR-008**: O sistema DEVE refletir o esquema de fracionamento preventivo e a meta de Roxzone selecionados pelo atleta diretamente na visualização dos treinos que contêm essas estações e no resumo tático do Simulado Oficial (Dia 26 — 05/12).
- **FR-009**: Todas as preferências configuradas pelo atleta nas ferramentas de Pareto (meta de transição por passagem na Roxzone e perfil de fracionamento preventivo para Lunges e Wall Balls) DEVEM ser persistidas automaticamente no armazenamento local do navegador sob o prefixo padronizado `hyrox_`.

### Key Entities

- **Diretriz Diária de Pareto (Daily Pareto Focus)**: Atributo associado a cada um dos 26 dias de treino que define o pilar de Pareto predominante (`AEROBIC_ENGINE`, `STRENGTH_FLOOR`, `ROXZONE_MARGINAL_GAIN`, `PREVENTIVE_FRACTIONATION`) e a instrução prática de 20% de esforço que gera 80% do retorno na sessão.
- **Diagnóstico de Piso de Força (Strength Floor Assessment)**: Relação calculada entre o `1RM` do atleta num exercício composto base (ex.: Back Squat, Trap Bar Deadlift, Walking Lunges) e a carga regulamentar da estação oficial correspondente na divisão ativa, resultando num índice de segurança do SNC.
- **Simulação de Roxzone (Roxzone Transition Profile)**: Parâmetro de tempo médio por transição (em segundos, multiplicado pelas 16 passagens regulamentares) comparado às referências estatísticas oficiais (321 segundos para elite vs. 685 segundos para cauda da tabela) e vinculado ao Protocolo dos 3 Passos.
- **Plano de Fracionamento Preventivo (Preventive Rep-Breaking Plan)**: Estrutura de divisão de volume para Sandbag Lunges (100m) e Wall Balls (100 repetições) composta por sequência de séries (ex.: `25-20-15-15-15-10`), duração da micro-pausa em respirações (3–5 respirações / 5–8s) e estimativa de tempo de execução sem falha muscular.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O atleta consegue identificar em menos de 5 segundos, em qualquer um dos 26 dias do calendário, qual é a prioridade 80/20 da sessão e qual estação ou determinante fisiológico está a ser trabalhado.
- **SC-002**: 100% das alterações no perfil do atleta (divisão competitiva, `1RMs`, ritmo alvo `GRP` ou dias concluídos) atualizam instantaneamente os cálculos da Auditoria 80/20 e do Piso de Força sem necessidade de recarregar a página.
- **SC-003**: O simulador da Roxzone demonstra com precisão ao segundo a economia potencial de tempo ao longo das 16 transições, permitindo ao atleta visualizar como poupar entre 2 a 6 minutos no tempo final do simulado apenas através do Protocolo dos 3 Passos.
- **SC-004**: O atleta consegue selecionar e guardar o seu plano de fracionamento preventivo para Sandbag Lunges e Wall Balls em no máximo 2 cliques, mantendo as escolhas preservadas entre sessões de utilização offline.

## Assumptions

- **Correlação Biomecânica para o Piso de Força**: Assume-se como referência científica e prática de HYROX que o *Sled Push* e o *Sandbag Lunge* correlacionam-se primariamente com o `Back Squat`, `Front Squat` e `Heavy Barbell Walking Lunges`; o *Sled Pull* e o *Farmer's Carry* correlacionam-se com o `Trap Bar Deadlift`, `RDL` e `Remada Curvada`; e os *Wall Balls* correlacionam-se com o `Front/Goblet Squat` e `Push Press com Halteres`.
- **Estrutura de 16 Transições na Roxzone**: Segue-se o formato oficial HYROX Singles, no qual o atleta realiza 8 corridas de 1.000m intercaladas por 8 estações funcionais, totalizando 16 passagens de entrada/saída pela Roxzone.
- **Preservação dos Dados Canónicos de 26 Dias**: A introdução das análises e ferramentas táticas do Princípio de Pareto 80/20 enriquece a periodização existente (10/11 a 05/12) sem alterar as datas, cargas regulamentares oficiais ou a regra de corte de 55% de volume no *Tapering* estabelecida na Constituição do projeto.


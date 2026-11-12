# Feature Specification: Padronização Integral da Terminologia Técnica em Português do Brasil (pt-BR)

**Feature Branch**: `008-ptbr-terminology-standardization`  
**Created**: 2026-11-12  
**Status**: Ready for Implementation  
**Input**: User description: "ele esta usando alguns termo que nao são usados com rondas."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Terminologia Técnica de Educação Física e HYROX no Brasil (`Rounds`, `Séries`, `Esteira`, `Quadril`, `Celular`) (Priority: P1)

Como Personal Trainer e atleta no Brasil utilizando o **HYROX Periodização**, preciso que 100% dos textos dos 26 dias de treino, do PDF/Poster 9:16, dos gráficos e da interface utilizem a terminologia técnica consagrada no **Português do Brasil (`pt-BR`)** — substituindo termos de Portugal (`pt-PT`) como *"Ronda / Rondas"*, *"Passadeira"*, *"Anca"*, *"Paragens"*, *"Perceção"*, *"Controlo"*, *"Ergómetros"*, *"Hidratos"*, *"Telemóvel"*, *"Ecrã"*, *"Ficheiro"* e *"Registo"* pelos termos corretos usados nas academias e boxes do Brasil (*"Round / Rounds"*, *"Esteira"*, *"Quadril"*, *"Paradas"*, *"Percepção"*, *"Controle"*, *"Ergômetros"*, *"Carboidratos"*, *"Celular"*, *"Tela"*, *"Arquivo"* e *"Registro"*).

**Why this priority**: Quando o Personal Trainer envia o PDF 9:16 do Treino do Dia para o aluno no Brasil, termos como *"5 Rondas / Ronda 1"*, *"passadeira"* ou *"mobilidade de anca"* soam estranhos e fora do vocabulário técnico brasileiro de treinamento funcional/HYROX.

**Independent Test**: Abrir qualquer dia de treino (ex.: Dia 1, Dia 3, Dia 4, Dia 8, Dia 10, Dia 17, Dia 18, Dia 19, Dia 22) e gerar o **PDF 9:16**, verificando que todas as prescrições exibem **"Rounds"** (`4 Rounds`, `5 Rounds`, `Round 1`, `Round 2`...), **"Quadril"**, **"Esteira"**, **"Liberação miofascial"**, **"Controle"**, **"Percepção"**, **"Planejado"**, **"Registro"** e **"Celular"**.

**Acceptance Scenarios**:

1. **Given** qualquer treino que contenha circuitos ou blocos repetidos (ex.: Dia 1, Dia 3, Dia 4, Dia 8, Dia 10, Dia 17, Dia 18, Dia 19, Dia 22), **When** o utilizador visualiza a prescrição na tela ou no PDF 9:16, **Then** o sistema exibe **"Rounds"** (`4 Rounds`, `5 Rounds`, `Round 1`, `Round 2`, `entre rounds`) em vez de *"Rondas / Ronda"*.
2. **Given** toda a interface da aplicação (Cabeçalho, Treino do Dia, PDF 9:16, Banco de Dados de Alunos, 7 Gráficos, Meus 1RMs, Calendário, Tática e Nutrição), **When** o utilizador navega pelas abas, **Then** 100% da ortografia e vocabulário estão em **Português do Brasil (`pt-BR`)**.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Substituição de "Ronda/Rondas" por "Round/Rounds")**: Todas as ocorrências de `Ronda` e `Rondas` nos 26 dias de treino, diretrizes Pareto e PDF 9:16 DEVEM ser substituídas por **`Round`** e **`Rounds`** (padrão oficial HYROX / CrossFit Brasil).
- **FR-002 (Adequação Biomecânica e Fisiológica `pt-BR`)**:
  - `anca` → **`quadril`**;
  - `passadeira` → **`esteira`**;
  - `libertação miofascial` → **`liberação miofascial`**;
  - `travagem` → **`frenagem`**;
  - `paragens / paragem` → **`paradas / parada`**;
  - `viragens` → **`viradas`**;
  - `pousar / pouse` → **`soltar no chão / apoiar no chão`**;
  - `sapatilhas` → **`tênis de corrida`**;
  - `ergómetros / ergómetro` → **`ergômetros / ergômetro`**;
  - `perceção` → **`percepção`**;
  - `controlo` → **`controle`**;
  - `tricípites / quadricípite` → **`tríceps / quadríceps`**.
- **FR-003 (Adequação Nutricional e de Interface `pt-BR`)**:
  - `hidratos de carbono / hidratos` → **`carboidratos`**;
  - `glicogénio` → **`glicogênio`**;
  - `isotónicos / isotónica` → **`isotônicos / isotônica`**;
  - `lípidos` → **`lipídios`**;
  - `brócolos` → **`brócolis`**;
  - `planeado / planeada / planeador` → **`planejado / planejada / planejador`**;
  - `registo / registos / registar` → **`registro / registros / registrar`**;
  - `telemóvel` → **`celular`**;
  - `ecrã` → **`tela`**;
  - `ficheiro` → **`arquivo`**;
  - `partilhar / partilha` → **`compartilhar / compartilhamento`**.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `0` ocorrências restantes da palavra `ronda` ou `rondas` (case-insensitive) em todo o código-fonte (`src/App.jsx`) e no bundle de produção (`public/index.html`).
- **SC-002**: `0` ocorrências restantes de lusismos europeus (`telemóvel`, `ecrã`, `ficheiro`, `anca`, `passadeira`, `perceção`, `controlo`, `ergómetros`, `glicogénio`, `hidratos`, `brócolos`) em toda a aplicação e no PDF 9:16.


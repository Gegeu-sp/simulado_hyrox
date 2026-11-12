# Feature Specification: Exportação de PDF / Flyer Vertical 9:16 para Envio do Treino do Dia

**Feature Branch**: `007-workout-pdf-9-16`  
**Created**: 2026-11-12  
**Status**: Ready for Implementation  
**Input**: User description: "para o treino do dia crie um pdf para ser enviado no formato 9:16 com o treino do dia. fazer isso para fazer este paiser para ser enviado"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gerar e Baixar PDF / Poster Vertical 9:16 do Treino do Dia (Priority: P1)

Como Personal Trainer ou atleta utilizando o **HYROX Periodização**, preciso de um botão direto na aba **Treino do Dia** (e um modal de pré-visualização em formato vertical **9:16**, 1080×1920 px equivalente) que gere instantaneamente um ficheiro **PDF em formato 9:16** (vertical mobile / WhatsApp / Instagram Stories) com o **Treino do Dia completo e personalizado** (Nome do Aluno/Atleta, Divisão, Dia `1` a `26`, Data, Microciclo, Zona de Corrida Prescrita com Velocidade em `km/h` e `Pace /km`, Cargas Calculadas em `kg` baseadas nos `1RMs` do aluno, Todos os Blocos de Treino, Diretriz Tática Pareto 80/20, Registo Confirmado do Dia e Meta Nutricional), pronto para ser baixado ou partilhado diretamente com o aluno.

**Why this priority**: O treinador precisa enviar diariamente a prescrição individualizada para o telemóvel do aluno (via WhatsApp, Telegram ou e-mail) num formato vertical 9:16 de leitura imediata no ecrã do smartphone durante o treino no ginásio.

**Independent Test**: Na aba **Treino do Dia**, clicar em **"Gerar PDF 9:16 (Enviar Treino)"**, visualizar o poster/flyer vertical 9:16 completo e clicar em **"Baixar PDF 9:16 Agora"** ou **"Partilhar / Enviar PDF 9:16"**, verificando que o documento PDF é gerado na proporção exata **9:16** (ex.: `108mm × 192mm` / `540pt × 960pt` sem margens brancas) com tema *Pro Dark Mode* e todos os dados sincronizados do aluno ativo.

**Acceptance Scenarios**:

1. **Given** qualquer dia selecionado (`Dia 1` a `Dia 26`) e qualquer aluno/atleta ativo no Banco de Dados, **When** o utilizador clica em **"PDF 9:16 • Enviar Treino do Dia"**, **Then** o sistema exibe a pré-visualização exata em proporção **9:16** e permite descarregar um ficheiro `.pdf` nativo (`HYROX_Dia_XX_NomeAluno_9x16.pdf`) ou partilhá-lo via Web Share API no telemóvel.
2. **Given** um aluno com `1RMs`, `Peso Corporal` e `Zonas de Corrida (km/h)` personalizados, **When** o PDF 9:16 é gerado para um dia com prescrição de força e corrida, **Then** o PDF inclui automaticamente os pesos exatos calculados em `kg` para cada série/exercício e a velocidade alvo em `km/h` + `min/km` da zona prescrita.

---

### User Story 2 - Partilha Direta Mobile (WhatsApp / Sistema) & Impressão Vetorial 9:16 Sem Cortes (Priority: P1)

Como utilizador em smartphone ou computador, preciso tanto de **geração direta de ficheiro `.pdf` em 9:16** (download imediato com 1 clique e botão de partilha direta para WhatsApp/apps móveis quando suportado pelo navegador) quanto de **impressão/exportação vetorial `@page { size: 108mm 192mm; margin: 0; }`** para que o documento nunca saia cortado ou desconfigurado em folhas A4 comuns.

**Why this priority**: Garante que o envio funcione 100% em qualquer dispositivo (Android, iOS, Windows, macOS) com fidelidade visual de um poster/flyer profissional (*Pro Dark Mode*).

**Independent Test**: Clicar em **"Baixar PDF 9:16"** e verificar que o ficheiro `.pdf` transferido tem páginas exatamente na proporção vertical 9:16 com fundo escuro de alto contraste, tipografia legível e rodapé institucional do Personal Trainer.

**Acceptance Scenarios**:

1. **Given** o modal ou botão de exportação 9:16 aberto no telemóvel ou PC, **When** o utilizador aciona **"Baixar PDF 9:16"** ou **"Enviar / Partilhar PDF"**, **Then** o ficheiro PDF 9:16 é transferido imediatamente (ou aberto no menu de partilha nativo do telemóvel) com o nome do aluno e o número do dia.

---

### Edge Cases

- **Dias de treino extensos (ex.: Dia 1 Força + Trenós ou Dia 26 Simulado Oficial)**: Se os blocos de exercícios ultrapassarem a altura de um único ecrã 9:16, o gerador ajusta dinamicamente a densidade tipográfica ou pagina em lâminas 9:16 consecutivas sem nunca cortar texto ao meio.
- **Funcionamento sem internet ou falha de CDN externa**: Caso a biblioteca de geração de ficheiro binário PDF não esteja acessível offline, o sistema gera um PDF vetorial nativo via janela `@page { size: 108mm 192mm; margin: 0 }` ou exporta a lâmina 9:16 em alta definição sem perda de dados.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A aplicação DEVE disponibilizar na aba **Treino do Dia** (e no cabeçalho do cartão do treino diário) um botão de destaque **"📄 PDF 9:16 (Enviar Treino)"** e um botão de pré-visualização do **Poster/Flyer 9:16**.
- **FR-002**: O documento PDF gerado DEVE respeitar estritamente a proporção de aspeto **9:16 vertical** (ex.: `108mm × 192mm` / `540pt × 960pt` / `1080px × 1920px`), otimizado para leitura vertical em ecrã inteiro de telemóvel.
- **FR-003**: O conteúdo do PDF 9:16 do Treino do Dia DEVE incluir de forma sincronizada:
  1. **Cabeçalho Institucional & Identificação**: Logótipo `HX HYROX Periodização`, Dia (`Dia X/26`), Data, Microciclo, Nome do Aluno/Atleta Ativo, Divisão Oficial e Peso Corporal (`kg`);
  2. **Faixa de Telemetria da Sessão**: Duração (`min`), Carga Alvo/Confirmada (`sRPE` em `UA`), Zona de Corrida Prescrita (`Z1` a `Z5`) com Velocidade em `km/h` e `Pace (/km)` e Distância Prevista/Confirmada (`km`);
  3. **Diretriz Tática de Pareto 80/20 do Dia**: Pilar dominante (`80%` vs `20%`), foco tático e meta de transição *Roxzone*;
  4. **Prescrição Completa por Blocos**: Todos os blocos do treino do dia (`A`, `B`, `C`, etc.), incluindo as cargas exatas em `kg` calculadas a partir dos `1RMs` do aluno ativo e os pesos oficiais da divisão selecionada;
  5. **Protocolo Nutricional Diário & Assinatura Profissional**: Meta de hidratos de carbono (`g/dia`), proteína (`g/dia`), hidratação e rodapé profissional (*Argeu Rodrigues • Personal Trainer | CREF: 158814-G/SP*).
- **FR-004**: O modal do Poster/PDF 9:16 DEVE oferecer três ações rápidas:
  - **"⬇️ Baixar PDF 9:16 (.PDF)"**: Gera e descarrega imediatamente o ficheiro `.pdf` em formato 9:16;
  - **"📲 Partilhar / Enviar no Telemóvel"**: Utiliza a API de partilha nativa (`navigator.share` com ficheiro `.pdf` ou resumo formatado para WhatsApp) para envio imediato ao aluno;
  - **"🖨️ Imprimir / Guardar PDF Vetorial 9:16"**: Abre a folha de estilo `@page { size: 108mm 192mm; margin: 0 }` para exportação vetorial nativa do navegador.

### Key Entities

- **WorkoutPoster9x16Payload**: Estrutura derivada em tempo real combinando `activeAthleteRecord`, `currentWorkout`, `division`, `runningZonesKmh`, `oneRMs`, `customPcts`, `currentLog`, `dailyPareto` e `dailyNutrition` para renderização em canvas/PDF 9:16 (`1080×1920`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O utilizador consegue gerar e transferir o PDF vertical **9:16** de qualquer um dos 26 dias de treino em menos de 3 segundos com apenas 1 clique.
- **SC-002**: 100% dos dados personalizados do aluno ativo (Nome, Divisão, Peso, Velocidade da Zona em `km/h`, Pace em `/km` e Cargas de Força em `kg` baseadas nos `1RMs`) aparecem refletidos com precisão no PDF 9:16 gerado.
- **SC-003**: A proporção das páginas do ficheiro `.pdf` gerado é exatamente **9:16** (`0.5625`), preenchendo o ecrã vertical de smartphones sem bordas brancas laterais ou superiores.

## Assumptions

- O gerador de PDF 9:16 será executado 100% no cliente (navegador Web ou Mobile PWA), gerando um documento PDF real na proporção `9:16` (`540pt × 960pt` / `1080px × 1920px`) através de um motor de renderização Canvas HD + empacotador PDF nativo embutido (zero dependências externas que possam falhar offline), além de suportar partilha direta (`navigator.share`) e impressão vetorial `@page { size: 108mm 192mm }`.


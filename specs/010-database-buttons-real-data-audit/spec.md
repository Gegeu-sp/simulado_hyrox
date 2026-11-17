# Feature Specification: Correção dos Botões de Registros Guardados no Banco de Dados, Fidelidade a Dados Reais e Auditoria Integral de Ações

**Feature Branch**: `010-database-buttons-real-data-audit`  
**Created**: 2026-11-17  
**Status**: Ready for Implementation  
**Input**: User description: "verificar os botões Registros Guardados no Banco de Dados nao funcionam e nao esta trazendo dados reais, precisa verificar que todas as funcionalidades do site esta funcionando e esta trazendo dados real e atualizados, sempre em conformidada, analisar e verificar todas as ações do site se estão funcionando"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Funcionamento Completo dos Botões e Ações em "Registros Guardados no Banco de Dados" (Priority: P1)

Como treinador ou atleta utilizando a aba **Banco de Dados & Comparar**, preciso que todos os botões da seção **Registros Guardados no Banco de Dados** (`Guardar Todo o Banco na Nuvem (Firestore)`, `Exportar Banco (.JSON)`, `Abrir Ficha`, `Perfil A`, `Perfil B` e `Remover`) funcionem com 100% de confiabilidade, exibindo feedback visual imediato próximo à tabela e refletindo imediatamente os dados reais do perfil selecionado em toda a aplicação.

**Why this priority**: Atualmente, clicar em `Guardar Todo o Banco na Nuvem (Firestore)` falha silenciosamente porque `firestore.rules` bloqueia os campos `runningZonesKmh`, `analyticsScope`, `activeAthleteId` e `athletesDatabase` adicionados posteriormente ao snapshot, além de a mensagem de retorno ficar escondida dentro do modal fechado. Além disso, clicar em `Abrir Ficha`, `Perfil A`, `Perfil B` ou `Remover` só exibe o banner no topo da página (fora da área visível quando rolado até a tabela), e abrir um `SNAPSHOT` faz o Auto-Save sobrescrever a fotografia histórica.

**Independent Test**: Na aba **Banco de Dados & Comparar**, rolar até **Registros Guardados no Banco de Dados** e testar cada botão:
1. `Guardar Todo o Banco na Nuvem (Firestore)`: exibe feedback inline imediato de envio/sucesso ou diagnóstico claro de erro na própria seção (sem depender do modal aberto), com regras `firestore.rules` compatíveis com o schema completo do snapshot.
2. `Exportar Banco (.JSON)`: gera e baixa o arquivo `.json` atualizado com todos os registros reais e metadados.
3. `Abrir Ficha`: carrega 100% dos dados reais do registro selecionado (divisão, peso, pace, zonas, 1RMs, `customPcts` limpos sem vazar do atleta anterior, `dayLogs` e `completedDays`) e exibe banner de confirmação visível junto à tabela. Caso o registro seja um `SNAPSHOT`, o sistema protege a fotografia histórica contra sobrescrita acidental ou abre como cópia editável / modo visualização protegida.
4. `Perfil A` / `Perfil B`: atualiza imediatamente os seletores e o comparador multidimensional abaixo, com feedback visual imediato.
5. `Remover`: remove o registro do banco de dados, atualiza `localStorage` e reajusta `activeAthleteId`, `compareIdA` e `compareIdB` com segurança.

---

### User Story 2 - Fidelidade 100% a Dados Reais e Atualizados em Toda a Aplicação (Priority: P1)

Como utilizador, preciso que os indicadores exibidos na tabela **Registros Guardados no Banco de Dados**, nos KPIs do cabeçalho, no **Comparador Lado a Lado**, nos **7 Gráficos Analíticos** e no **PDF 9:16** reflitam exclusivamente dados reais, confirmados e sincronizados — sem valores sintéticos inflados ou divergência entre `stats` e `computeRecordSummaryMetrics`.

**Why this priority**: Foi identificado que:
- `stats` contabilizava apenas `completedDays`, enquanto `computeRecordSummaryMetrics` contabilizava `completedDays || hasLog`, gerando divergência de distância e carga entre o topo da página e a tabela do Banco de Dados.
- `computeRecordSummaryMetrics` aplicava pisos mínimos artificiais (`Math.max(40, ... + 12)`) no Score 5D mesmo quando o aluno tinha `0/26` dias confirmados, fazendo um perfil zerado parecer ter pontuação de resistência/velocidade inflada.
- O perfil `Atleta Principal` precisa sincronizar imediatamente os dados reais mais recentes sem perda entre abas.

**Independent Test**: Criar um novo aluno com `Ficha Limpa (0/26 dias)` e verificar que:
- A tabela exibe `0/26 dias (0%)`, `0 km • 0 UA`;
- Após confirmar e salvar um treino no **Dia 1**, tanto o cabeçalho, quanto a tabela **Registros Guardados**, quanto a aba **Analytics & Gráficos (7)** (no modo *Apenas Dados Salvos & Confirmados*) e o **PDF 9:16** exibem exatamente os mesmos números reais salvos.

---

### User Story 3 - Auditoria Completa de Todas as Ações e Abas do Site (Priority: P2)

Como responsável pelo projeto, quero garantir que todas as ações interativas de todas as 7 abas (`Treino do Dia`, `Calendário 26 Dias`, `Força & 1RM`, `Analytics & Gráficos (7)`, `Pareto 80/20 & Roxzone`, `Nutrição & Hidratação`, `Banco de Dados & Comparar`), além do cabeçalho, modal de sincronização, cronômetro EMOM e modal PDF 9:16 estejam funcionando sem erros de runtime, sem botões mortos e com persistência consistente.

**Independent Test**: Executar bateria de verificação automatizada cobrindo todos os fluxos de estado, ações `onClick`/`onChange`, geração de PDF 9:16, cálculos de Pareto por dia e regras de segurança do Firestore.

---

## Requirements *(mandatory)*

- **FR-001 (Regras Firestore Compatíveis com Banco Completo)**: Atualizar `firestore.rules` (via subagente especialista `firestore-rules-author`) para aceitar os campos `runningZonesKmh`, `analyticsScope`, `activeAthleteId` e `athletesDatabase` no documento `hyrox_profiles/{syncCode}`, mantendo validação rigorosa de tipos e limites.
- **FR-002 (Feedback Inline Visível na Seção de Registros Guardados)**: Todas as ações da tabela **Registros Guardados no Banco de Dados** (`Guardar Todo o Banco na Nuvem`, `Exportar Banco (.JSON)`, `Abrir Ficha`, `Perfil A`, `Perfil B`, `Remover`) DEVEM exibir feedback claro e imediato diretamente na barra de status da própria seção (além do banner superior).
- **FR-003 (Proteção de Snapshots Históricos)**: Ao abrir um registro do tipo `SNAPSHOT`, o Auto-Save NÃO deve sobrescrever o snapshot congelado; o sistema deve clonar/restaurar para o perfil editável ou bloquear mutação do snapshot histórico, preservando a integridade da comparação *Antes vs. Depois*.
- **FR-004 (Isolamento de `customPcts` ao Alternar Atletas)**: `handleSelectActiveAthlete` DEVE resetar `customPcts` para os padrões antes de aplicar os `customPcts` do atleta selecionado, evitando vazamento de percentagens entre alunos.
- **FR-005 (Consistência Real entre `stats`, `computeRecordSummaryMetrics` e `analyticsData`)**: Unificar a regra de sessão confirmada (`completedDays[d.dayNum]` ou log salvo confirmado) e remover bônus artificiais inflados quando não há treinos confirmados, garantindo paridade numérica exata em toda a aplicação.
- **FR-006 (Sincronização Imediata do Perfil Ativo no `athletesDatabase`)**: Garantir que `athletesDatabase` reflita em tempo real os dados reais do perfil ativo na tabela e no comparador sem atraso ou dessincronização.

## Success Criteria *(mandatory)*

- **SC-001**: 100% dos botões na seção **Registros Guardados no Banco de Dados** respondem com ação efetiva e feedback visual visível no local.
- **SC-002**: `firestore.rules` valida e aceita integralmente o payload gerado por `buildAthleteSyncSnapshot()`.
- **SC-003**: Distância confirmada, carga (`UA`), dias concluídos (`X/26`) e velocidade média são idênticos entre os KPIs do cabeçalho, a tabela do Banco de Dados e a aba Analytics.
- **SC-004**: Bateria automatizada de testes das 7 abas × 26 dias × 4 divisões + testes de manipulação do Banco de Dados passa 100% sem erros no console.

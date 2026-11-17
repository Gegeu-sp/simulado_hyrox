# Tasks: Feature 010 - Banco de Dados, Dados Reais e Auditoria

- [x] T001 Criar especificação (`spec.md`), plano (`plan.md`) e checklist em `specs/010-database-buttons-real-data-audit/`
- [x] T002 Atualizar `firestore.rules` via `firestore-rules-author` para suportar `runningZonesKmh`, `analyticsScope`, `activeAthleteId` e `athletesDatabase`
- [x] T003 Corrigir `pushToCloudFirestore` e `handleExportBackupJson` para exibir feedback inline no Banco de Dados e tratamento claro de erros
- [x] T004 Proteger `SNAPSHOT` contra sobrescrita no Auto-Save e corrigir vazamento de `customPcts` em `handleSelectActiveAthlete`
- [x] T005 Unificar regra de dados reais confirmados entre `stats` e `computeRecordSummaryMetrics` e remover inflação artificial de Score 5D em perfis zerados
- [x] T006 Adicionar feedback inline visível na seção **Registros Guardados no Banco de Dados** para `Abrir Ficha`, `Perfil A`, `Perfil B` e `Remover` (incluindo botão rápido de Importar JSON)
- [x] T007 Executar auditoria completa de compilação, testes de matriz e validação de todas as ações do site
- [x] T008 Publicar no Firebase Hosting (Hosting + Firestore Rules) e atualizar `README.md` + GitHub

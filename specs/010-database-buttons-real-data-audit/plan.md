# Implementation Plan: Correção dos Botões de Registros Guardados, Dados Reais e Auditoria Integral

**Branch**: `010-database-buttons-real-data-audit` | **Date**: 2026-11-17 | **Spec**: [spec.md](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/specs/010-database-buttons-real-data-audit/spec.md)

## Summary

Corrigir as falhas identificadas na seção **Registros Guardados no Banco de Dados** e garantir paridade absoluta de dados reais em toda a aplicação:
1. Atualizar `firestore.rules` (via `firestore-rules-author`) para incluir os campos `runningZonesKmh`, `analyticsScope`, `activeAthleteId` e `athletesDatabase`, eliminando o erro `HTTP 403` ao sincronizar na nuvem.
2. Adicionar feedback visual imediato inline diretamente no cabeçalho/topo da tabela **Registros Guardados no Banco de Dados** para todas as ações (`Guardar Todo o Banco na Nuvem`, `Exportar Banco (.JSON)`, `Abrir Ficha`, `Perfil A`, `Perfil B`, `Remover`).
3. Proteger registros do tipo `SNAPSHOT` contra sobrescrita acidental pelo Auto-Save, permitindo visualização segura e clonagem opcional para novo perfil editável.
4. Corrigir vazamento de `customPcts` ao alternar entre alunos em `handleSelectActiveAthlete`.
5. Unificar a regra de sessão confirmada entre `stats` (cabeçalho) e `computeRecordSummaryMetrics` (tabela do banco e comparador) e remover bônus artificiais de pontuação quando o perfil tem `0/26` dias confirmados.
6. Executar auditoria completa de todos os handlers, botões, abas, PDF 9:16 e gráficos, compilar e publicar no Firebase Hosting e GitHub.

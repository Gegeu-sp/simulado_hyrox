# Phase 1 Data Model: Aplicação Web e Mobile (PWA) no Firebase

**Feature**: `002-firebase-web-mobile-pwa`
**Date**: 2026-11-10

## 1. Entidades de Domínio

### 1.1 `AthleteSyncSnapshot` (Documento de Sincronização Web ↔ Mobile)
Representa o estado completo e portável do atleta entre dispositivos (armazenado localmente e sincronizado na coleção `hyrox_profiles/{syncCode}` do Cloud Firestore ou exportado via JSON):

| Campo | Tipo | Restrições / Regras de Validação |
|-------|------|----------------------------------|
| `schemaVersion` | `number` | Fixo em `1` (`1..10`) |
| `syncCode` | `string` | Identificador de sincronização do atleta (`3..40` caracteres alfanuméricos/hífens, ex.: `'atleta-hyrox-01'`) |
| `updatedAt` | `string` (ISO 8601) | Carimbo de data/hora da última modificação local ou remota |
| `selectedDayNum` | `number` | Inteiro `1..26` |
| `divisionKey` | `string` | Enum `'WOMEN_OPEN' \| 'MEN_OPEN' \| 'WOMEN_PRO' \| 'MEN_PRO'` |
| `athleteWeight` | `number` | Número positivo `35..200` (kg) |
| `goalPace` | `string` | Formato `'MM:SS'` (`02:30` a `12:00`) |
| `completedDays` | `Record<string, boolean>` | Mapa de dias concluídos (`'1'`..`'26'`) |
| `dayLogs` | `Record<string, DayLogEntry>` | Mapa de registos diários (`rpe`: `6..20`, `duration`: `0..300`, `morningHR`: `string`, `notes`: `string` max `500` chars) |
| `oneRMs` | `Record<string, number>` | Mapa dos 9 exercícios compostos de força (`0..500` kg) |
| `customPcts` | `Record<string, number>` | Mapa de percentagens customizadas (`0.20..1.00`) |
| `roxzoneTargetSec` | `number` | Inteiro `12..60` (segundos por transição na Roxzone) |
| `fractionationProfile` | `string` | Enum `'SAFE_80_20' \| 'BALANCED_PARETO' \| 'ELITE_DENSITY'` |

### 1.2 `FirebaseSyncConfig` (Configuração de Conexão Cloud no Cliente)
Persistida no `localStorage` sob a chave `hyrox_firebase_sync_config`:

| Campo | Tipo | Descrição / Regras de Validação |
|-------|------|---------------------------------|
| `syncCode` | `string` | Código do perfil do atleta (`3..40` chars, padrão `'hyrox-atleta-26d'`) |
| `projectId` | `string` | ID do projeto Firebase (ex.: `'hyrox-simulado-2026'`, opcional até configuração) |
| `apiKey` | `string` | API Key web do projeto Firebase (opcional) |
| `autoSync` | `boolean` | Se `true`, sincroniza automaticamente alterações quando `navigator.onLine === true` |
| `lastSyncedAt` | `string \| null` | Timestamp ISO da última sincronização bem-sucedida com a nuvem |
| `syncStatus` | `'LOCAL_ONLY' \| 'SYNCED' \| 'SYNCING' \| 'OFFLINE_PENDING' \| 'ERROR'` | Estado operacional da sincronização |

### 1.3 `PWAManifestConfig` (`public/manifest.json`)
| Campo | Valor |
|-------|-------|
| `name` | `"HYROX 26 Dias • Periodização Tática & Pareto 80/20"` |
| `short_name` | `"HYROX 26D"` |
| `start_url` | `"/index.html"` |
| `display` | `"standalone"` |
| `background_color` | `"#020617"` |
| `theme_color` | `"#facc15"` |
| `orientation` | `"portrait-primary"` |

## 2. Novas Chaves no `localStorage`

Mantendo o padrão constitucional `hyrox_*`:
- `hyrox_sync_code`: `string` (padrão `'hyrox-atleta-26d'`, sanitizado para `[a-zA-Z0-9_-]{3,40}`)
- `hyrox_firebase_config`: JSON stringificado contendo `{ projectId, apiKey, appId }` (opcional)
- `hyrox_last_updated_at`: ISO timestamp atualizado a cada mutação de estado do atleta
- `hyrox_last_synced_at`: ISO timestamp da última sincronização com o Firebase Firestore


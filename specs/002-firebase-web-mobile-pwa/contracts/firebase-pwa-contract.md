# Firebase Hosting, PWA & Cloud Sync Contract

**Feature**: `002-firebase-web-mobile-pwa`
**Date**: 2026-11-10

## 1. Contrato de Hospedagem (`firebase.json` & `.firebaserc`)

O ficheiro `firebase.json` na raiz do repositório DEVE configurar o **Firebase Hosting** e o **Cloud Firestore**:

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      },
      {
        "source": "/manifest.json",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/manifest+json"
          }
        ]
      }
    ],
    "cleanUrls": true,
    "trailingSlash": false
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

## 2. Contrato de Sincronização Cloud Firestore (`hyrox_profiles/{syncCode}`)

- **Endpoint / Caminho do Documento**: `hyrox_profiles/{syncCode}`
- **Operações Suportadas**:
  - **Push (Enviar Estado Local → Nuvem)**: Grava o objeto `AthleteSyncSnapshot` no documento `hyrox_profiles/{syncCode}` e atualiza `hyrox_last_synced_at`.
  - **Pull (Carregar Estado da Nuvem → Dispositivo)**: Lê `hyrox_profiles/{syncCode}`, valida as chaves do `AthleteSyncSnapshot` e hidrata imediatamente os estados React e o `localStorage` (`hyrox_*`).
- **Fallback Offline / Sem Projeto Configurado**:
  - Se o dispositivo estiver offline (`!navigator.onLine`) ou se o utilizador ainda não tiver inserido o `projectId` do Firebase, o sistema opera sem erros em modo `LOCAL_ONLY` / `OFFLINE_PENDING` e disponibiliza **Exportar Backup JSON** e **Importar Backup JSON** com 1 clique.

## 3. Contrato de Interface Mobile & PWA

1. **Barra de Navegação Inferior Mobile (`Bottom Nav`)**:
   - Visível em ecrãs `< 768px` (`md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800`).
   - Contém 6 botões compactos com ícone e rótulo curto: `Treino`, `1RMs`, `26 Dias`, `Carga`, `Tática`, `Nutrição`.
2. **Painel / Modal de Sincronização Web & Mobile (`Cloud & Backup`)**:
   - Acessível a partir de um botão no cabeçalho (`Web & Mobile Sync`).
   - Permite editar o `syncCode` (`ex.: atleta-hyrox-01`), configurar o `projectId`/`apiKey` do Firebase, executar `Enviar para Nuvem (Push)` / `Carregar da Nuvem (Pull)` e `Exportar / Importar JSON`.
   - Exibe instruções rápidas para instalar como App no iOS (Safari → Partilhar → Adicionar ao Ecrã Principal) e Android (Chrome → Instalar Aplicação).
3. **Screen Wake Lock no Cronómetro**:
   - Quando `timerRunning === true`, ativa `navigator.wakeLock.request('screen')` e mostra um indicador `Wake Lock Ativo (Ecrã Sempre Ligado)` no cartão do cronómetro.


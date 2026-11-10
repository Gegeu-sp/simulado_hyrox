# Quickstart & Validation Guide: Aplicação Web e Mobile (PWA) no Firebase

**Feature**: `002-firebase-web-mobile-pwa`
**Date**: 2026-11-10

## Pré-requisitos

- Navegador Web moderno (Chrome, Edge, Safari, Firefox) em Desktop ou Smartphone.
- Para publicação no Firebase: `npx -y firebase-tools@latest` autenticado na sua conta Google/Firebase.

## Cenários de Validação Passo a Passo

### 1. Testar a Aplicação Localmente (Modo Web & Emulador Firebase)
1. A partir da raiz do projeto, inicie um servidor local ou o emulador do Firebase Hosting:
   ```powershell
   npx -y firebase-tools@latest emulators:start --only hosting
   ```
   *(Em alternativa, abra diretamente `public/index.html` ou `hyrox_26_day_tactical_periodization_tracker.html` no navegador).*
2. Verifique que a aplicação carrega imediatamente com o tema escuro HYROX, as 6 abas funcionais e os 4 módulos do Motor de Pareto 80/20.

### 2. Validar Ergonomia Mobile e PWA (US1 & US2)
1. Abra as Ferramentas de Programador do navegador (`F12`) e ative o modo de dispositivo móvel (ex.: iPhone 14 Pro ou Pixel 7 — `390x844`).
2. Verifique que a **Barra de Navegação Inferior Fixa** aparece na base do ecrã com os 6 ícones (`Treino`, `1RMs`, `26 Dias`, `Carga`, `Tática`, `Nutrição`) e permite alternar de vista com 1 toque do polegar.
3. Na aba `Treino`, clique em **Iniciar** ou **3 Passos** no Cronómetro EMOM & Roxzone e confirme a exibição do indicador de **Ecrã Ativo (Wake Lock)**.
4. Na aba *Application* do DevTools, confirme que o `manifest.json` e o Service Worker (`sw.js`) estão registados sem erros.

### 3. Validar Sincronização Web ↔ Mobile e Backup JSON (US3)
1. Clique no botão **Web & Mobile Sync** no cabeçalho superior da aplicação.
2. Verifique o seu **Código de Sincronização do Atleta** (ex.: `hyrox-atleta-26d`).
3. Teste o botão **Exportar Backup (.json)** e confirme que um ficheiro JSON contendo todos os seus `1RMs`, dias concluídos, `sRPE` e configurações de Pareto é transferido.
4. Altere um valor na aplicação, clique em **Importar Backup (.json)** selecionando o ficheiro transferido e confirme que todo o estado é restaurado instantaneamente.
5. (Com projeto Firebase configurado): Clique em **Sincronizar Agora (Nuvem Firebase)** no computador e depois em **Carregar da Nuvem** no telemóvel usando o mesmo Código de Atleta para confirmar a sincronização remota.

### 4. Publicar no Firebase Hosting (Produção)
1. Autentique-se e selecione o seu projeto Firebase:
   ```powershell
   npx -y firebase-tools@latest login
   npx -y firebase-tools@latest use --add
   ```
2. Publique o Hosting e as regras do Firestore:
   ```powershell
   npx -y firebase-tools@latest deploy --only hosting,firestore:rules
   ```
3. Aceda ao URL público `https://<seu-projeto>.web.app` no computador e no telemóvel.


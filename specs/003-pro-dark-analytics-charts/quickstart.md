# Quickstart & Guia de Validação: Layout Pro Dark Mode e Suite de 7 Gráficos Analíticos HYROX

**Feature**: `003-pro-dark-analytics-charts`  
**Date**: 2026-11-10

---

## 1. Como Executar e Inspecionar Localmente

1. Abra diretamente [public/index.html](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/public/index.html) ou [hyrox_26_day_tactical_periodization_tracker.html](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/hyrox_26_day_tactical_periodization_tracker.html) no navegador, ou aceda à versão publicada no Firebase Hosting (`https://hyrox-simulado-26d.web.app`).
2. Navegue até à aba **"Analytics & Carga"** (ou clique nos atalhos de telemetria no topo da página).

---

## 2. Roteiro de Validação dos 7 Gráficos e do Layout Dark Mode

1. **Verificação do Layout Pro Dark Mode (Web & Mobile)**:
   - Confirme a presença da **Faixa Executiva de 4 KPIs** no topo (abaixo do cabeçalho) com alinhamento simétrico.
   - Redimensione a janela para `375px` (modo Telemóvel) e confirme que todos os cartões e gráficos se ajustam sem barra de rolagem horizontal.
2. **Secção 1 — Evolução de Desempenho e Carga**:
   - **Gráfico de Linha (Line Chart)**: Alterne os botões `Carga (sRPE)`, `Força (% 1RM)` e `Ritmo (Pace)` e verifique a mudança imediata da curva ao longo dos 26 dias.
   - **Gráfico de Área (Area Chart)**: Verifique as áreas empilhadas de volume acumulado por agrupamento muscular (Motor Aeróbico, Cadeia Anterior, Cadeia Posterior, Superior Push/Pull e Core/Grip).
3. **Secção 2 — Distribuição e Composição do Treino**:
   - **Gráfico de Barras Empilhadas (Stacked Bar Chart)**: Alterne entre `Séries por Grupo Muscular` e `Zonas de FC (Z1 a Z5)` para comparar visualmente os Microciclos 1, 2, 3 e 4.
   - **Gráfico de Radar / Teia (Radar Chart)**: Verifique o polígono de 5 pontas (`Força`, `Resistência`, `Mobilidade`, `Potência`, `Velocidade`) sobreposto ao polígono de referência da divisão oficial. Altere um 1RM ou o Pace GRP no topo e observe o Radar reagir instantaneamente.
4. **Secção 3 — Correlação e Métricas de Recuperação**:
   - **Gráfico de Dispersão (Scatter Plot)**: Verifique os pontos dos treinos distribuídos entre Carga Externa (Eixo X) e PSE/RPE (Eixo Y) sobre as faixas de eficiência e risco de fadiga.
   - **Gráfico Combinado (Barra Vertical + Linha)**: Verifique as barras verticais de volume diário/semanal cruzadas com a linha contínua de **Prontidão / Recuperação (VFC / FC Basal)**.
5. **Secção 4 — Gráfico de Pareto (80/20) para Eficiência de Exercícios**:
   - Verifique as barras ordenadas decrescentemente no Eixo X (destacando em amarelo/rosa as estações que compõem os primeiros **80%**), a **Linha Acumulada (`0%` a `100%`)**, a linha tracejada do **Limiar de 80%** e o **Diagnóstico Tático Automático** indicando onde focar a técnica.

---

## 3. Comando para Atualizar no Firebase Hosting

```powershell
npx -y firebase-tools@latest deploy --only hosting --project hyrox-simulado-26d
```


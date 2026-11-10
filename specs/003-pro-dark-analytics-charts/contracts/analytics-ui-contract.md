# UI & Visual Analytics Contract: Pro Dark Mode & Suite de 7 Gráficos HYROX

**Feature**: `003-pro-dark-analytics-charts`  
**Date**: 2026-11-10

---

## 1. Contrato de Layout Profissional Dark Mode (Web & Mobile)

1. **Superfície & Hierarquia Visual**:
   - Tema base `#020617` (`bg-slate-950`) com gradiente atmosférico de topo e cartões `bg-slate-900/90 border border-slate-800/90 rounded-2xl shadow-xl`.
   - **Faixa Executiva de Telemetria (4 KPIs)** posicionada logo no topo da área principal (`max-w-7xl mx-auto px-4`), perfeitamente alinhada em `grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4`.
2. **Alinhamento Responsivo Web ↔ Mobile**:
   - **Desktop (`>= 1024px`)**: Grelhas simétricas de 2 e 3 colunas (`items-stretch`), garantindo cartões da mesma linha com altura idêntica (`h-full flex flex-col justify-between`).
   - **Mobile (`< 768px`)**: Empilhamento vertical fluido (`grid-cols-1`), barra de navegação inferior fixa com 6 abas e gráficos SVG com `viewBox` proporcional que nunca geram barra de rolagem horizontal indesejada.

---

## 2. Contrato dos 7 Componentes Gráficos Obrigatórios

| # | Componente / Gráfico | Secção | Eixo X | Eixo Y | Controlos Interativos |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | **Gráfico de Linha (`Line Chart`)** | 1. Evolução de Desempenho e Carga | Dias `D1` a `D26` (4 Microciclos) | Carga `sRPE` (UA), `% 1RM` ou Pace (`MM:SS`) | Seletor: `Carga (sRPE)` \| `Força (% 1RM)` \| `Pace Corrida` |
| **2** | **Gráfico de Área (`Area Chart`)** | 1. Evolução de Desempenho e Carga | Dias `D1` a `D26` | Volume Acumulado (Unidades Ponderadas) | Legenda interativa dos 5 sistemas/grupos musculares |
| **3** | **Gráfico de Barras Empilhadas (`Stacked Bar Chart`)** | 2. Distribuição e Composição do Treino | Microciclos `M1`, `M2`, `M3`, `M4` | Séries Semanais ou Minutos (`Z1–Z5`) | Seletor: `Séries por Grupo Muscular` \| `Zonas Cardíacas (Z1–Z5)` |
| **4** | **Gráfico de Radar / Teia (`Radar Chart`)** | 2. Distribuição e Composição do Treino | 5 Eixos: `Força`, `Resistência`, `Mobilidade`, `Potência`, `Velocidade` | Escala Radial `0%` a `100%` | Comparação Polígono Atleta (Amarelo/Ciano) vs. Meta da Divisão |
| **5** | **Gráfico de Dispersão (`Scatter Plot`)** | 3. Correlação e Métricas de Recuperação | Carga Externa (Volume × Intensidade) | Carga Interna (`PSE / RPE Borg 6–20`) | Destaque de quadrantes (`Eficiência`, `Zona Alvo`, `Risco Fadiga`) + clique para ir ao Dia |
| **6** | **Gráfico Combinado (`Barra + Linha`)** | 3. Correlação e Métricas de Recuperação | Dias `D1` a `D26` (com divisórias `M1–M4`) | Eixo Esq: Volume (Barras) / Eixo Dir: Prontidão & VFC (`0–100%` Linha) | Indicador em tempo real de prontidão e alerta de FC Basal |
| **7** | **Gráfico de Pareto 80/20 (`Pareto Chart`)** | 4. Pareto para Eficiência de Exercícios | 10 Exercícios/Segmentos HYROX (Ordem Decrescente) | Eixo Esq: Custo Individual (Barras) / Eixo Dir: `% Acumulada` (`0–100%` Linha + Corte `80%`) | Seletor: `Fadiga / Esforço Acumulado` \| `Tempo Perdido na Prova` + Diagnóstico 80/20 |


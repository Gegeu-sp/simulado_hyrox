# Implementation Plan: Layout Profissional Dark Mode Responsivo (Web & Mobile) e Suite Completa de Gráficos Analíticos & Diagrama de Pareto HYROX

**Branch**: `003-pro-dark-analytics-charts` | **Date**: 2026-11-10 | **Spec**: [spec.md](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/specs/003-pro-dark-analytics-charts/spec.md)  
**Input**: Feature specification from `/specs/003-pro-dark-analytics-charts/spec.md`

## Summary

Elevar o design da aplicação Web & Mobile PWA (`public/index.html` e `hyrox_26_day_tactical_periodization_tracker.html`) para um padrão **Pro Dark Mode** de telemetria desportiva, perfeitamente alinhado em ecrãs Desktop e Mobile, e implementar um motor analítico interativo em SVG vetorial contendo os **7 gráficos solicitados**:
1. **Gráfico de Linha (Line Chart)** — Evolução de Carga (sRPE), Força (% 1RM) e Pace ao longo dos 26 dias;
2. **Gráfico de Área (Area Chart)** — Volume total de treino acumulado por agrupamento muscular / padrão motor;
3. **Gráfico de Barras Empilhadas (Stacked Bar Chart)** — Distribuição semanal nos 4 Microciclos por grupo muscular e por zonas de frequência cardíaca (`Z1` a `Z5`);
4. **Gráfico de Radar / Teia (Radar Chart)** — Avaliação multidimensional do atleta (`Força`, `Resistência`, `Mobilidade`, `Potência`, `Velocidade`) vs. benchmark da divisão;
5. **Gráfico de Dispersão (Scatter Plot)** — Correlação entre Carga Externa (Volume/Stress) e Carga Interna (PSE / RPE Borg `6–20`);
6. **Gráfico Combinado (Barra Vertical + Linha)** — Volume total cruzado com o Índice de Prontidão / Recuperação (VFC / FC Basal);
7. **Gráfico de Pareto 80/20 para Eficiência de Exercícios** — Barras ordenadas por estação/exercício + Curva Acumulada (`0–100%`) + Linha de corte de `80%` + Diagnóstico automático de foco técnico.

## Technical Context

**Language/Version**: HTML5 + JavaScript ES2022 + React 18.3.1 (JSX via `@babel/standalone` + Native ES Module `importmap`)  
**Primary Dependencies**: `react@18.3.1`, `react-dom@18.3.1/client`, `lucide-react@0.460.0`, Tailwind CSS CDN, Motor SVG Vetorial Nativo (zero dependências externas de gráficos)  
**Storage**: `localStorage` (`hyrox_*`) + Sincronização Cloud Firestore (`hyrox_profiles/{syncCode}`) + Backup JSON  
**Testing**: Validação interativa em Desktop (`1440x900`) e Mobile (`375x812`) conforme [quickstart.md](file:///c:/Users/MUSCULAÇÃO/Documents/Artigos/hyrox_simulado/specs/003-pro-dark-analytics-charts/quickstart.md)  
**Target Platform**: Firebase Hosting (`https://hyrox-simulado-26d.web.app`) — Web Desktop + Mobile PWA (Android & iOS)  
**Project Type**: Progressive Web Application (Single-Page Hybrid Sports Telemetry & Periodization App)  
**Performance Goals**: Recálculo e re-renderização instantânea dos 7 gráficos SVG em `< 16ms` (60fps) a cada mudança de input (`1RM`, `Pace`, `Divisão`, `Roxzone`, `RPE`)  
**Constraints**: 100% compatível com funcionamento *offline* via Service Worker, zero transbordo horizontal em ecrãs de `375px` e contraste WCAG AAA no tema *Dark Mode*  
**Scale/Scope**: 26 dias (4 microciclos), 9 levantamentos de 1RM, 8 estações oficiais + corrida + Roxzone, 7 gráficos analíticos interativos e 6 abas de navegação

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Fidelidade Científica e Regulamentar HYROX (INVIOLÁVEL)**: **PASS**. Todos os cálculos de volume por grupo muscular, zonas cardíacas (`Z1–Z5`), curvas de fadiga e Pareto respeitam fielmente os 4 microciclos (85%, 100%, 75%, 45% de volume) e as cargas oficiais das 4 divisões HYROX Singles 2026/27.
- **II. Prescrição Dinâmica e Individualizada**: **PASS**. Os 7 gráficos reagem matematicamente em tempo real ao perfil individual do atleta (`oneRMs`, `goalPace`, `athleteWeight`, `divisionKey`, `roxzoneTargetSec`, `completedDays` e `dayLogs`).
- **III. Arquitetura Offline-First e Persistência Local Imediata**: **PASS**. O motor de gráficos em SVG nativo não requer chamadas externas nem bibliotecas pesadas adicionais, mantendo 100% de autonomia *offline*.
- **IV. Monitorização de Carga Interna (sRPE) e Prontidão Fisiológica**: **PASS**. Expande diretamente a monitorização fisiológica com o Scatter Plot (Carga Externa vs. PSE) e o Gráfico Combinado (Volume vs. Prontidão/FC Basal/VFC).
- **V. Interface Tática de Alta Legibilidade e Usabilidade em Treino**: **PASS**. Aperfeiçoa o tema *Dark Mode* (`slate-950`/`slate-900`), adiciona a faixa executiva de KPIs e alinha simetricamente todos os cartões para Web e Mobile.

## Project Structure

### Documentation (this feature)

```text
specs/003-pro-dark-analytics-charts/
├── plan.md              # Este plano técnico (/speckit-plan)
├── research.md          # Decisões arquiteturais de UI Dark Mode e SVG Charts (Fase 0)
├── data-model.md        # Modelo de dados das 5 estruturas analíticas e 7 gráficos (Fase 1)
├── quickstart.md        # Guia de validação visual e deploy no Firebase Hosting (Fase 1)
├── contracts/
│   └── analytics-ui-contract.md # Contrato visual e interativo dos 7 gráficos (Fase 1)
└── tasks.md             # Lista de tarefas de implementação (/speckit-tasks - Fase 2)
```

### Source Code (repository root)

```text
public/
├── index.html           # Aplicação PWA principal (Layout Pro Dark Mode + 7 Gráficos SVG Interativos)
├── manifest.json        # Web App Manifest PWA
├── sw.js                # Service Worker Offline-First
└── icon.svg             # Ícone vetorial HYROX 26D

hyrox_26_day_tactical_periodization_tracker.html # Espelho sincronizado de public/index.html na raiz
```

**Structure Decision**: A suite de 7 gráficos e o refinamento visual *Pro Dark Mode* são integrados diretamente em `public/index.html` e sincronizados em `hyrox_26_day_tactical_periodization_tracker.html`, preservando a arquitetura *Zero-Build Single-File PWA* servida pelo Firebase Hosting.

## Complexity Tracking

Nenhuma violação à Constituição do Projeto.

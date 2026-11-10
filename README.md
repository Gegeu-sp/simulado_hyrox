# 🏋️‍♂️ HYROX Periodização • Plataforma Tática, Pareto 80/20 & Analytics (Web & Mobile PWA)

<p align="left">
  <a href="https://hyrox-simulado-26d.web.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Firebase_Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Hosting" />
  </a>
  <img src="https://img.shields.io/badge/PWA-Web_%26_Mobile_Offline-22D3EE?style=for-the-badge&logo=pwa&logoColor=black" alt="PWA Web & Mobile" />
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Pro_Dark_Mode-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Tática-Pareto_80%2F20-FACC15?style=for-the-badge" alt="Pareto 80/20" />
  <img src="https://img.shields.io/badge/Status-Em_Produção-34D399?style=for-the-badge" alt="Status" />
</p>

> **Aplicação Web & Mobile (PWA)**: [https://hyrox-simulado-26d.web.app](https://hyrox-simulado-26d.web.app)  
> **Repositório Oficial**: [https://github.com/Gegeu-sp/simulado_hyrox](https://github.com/Gegeu-sp/simulado_hyrox)

---

## 🎯 Sobre o Projeto

O **HYROX Periodização** é uma aplicação progressiva (*Progressive Web App* — Web e Mobile *Offline-First*) desenvolvida para o controlo científico, prescrição individualizada por **1RM**, gestão de carga interna (**sRPE**) e otimização tática pelo **Princípio de Pareto (Regra 80/20)** rumo ao Simulado Oficial de HYROX (ciclo de 26 dias distribuído em 4 microciclos).

A plataforma opera sob o modelo fisiológico ***Endurance-Led, Strength-Protected*** (6 sessões por semana), garantindo que o motor aeróbico e a corrida comprometida (*Compromised Running*) recebam ~80% do foco energético enquanto os 20% de trabalho de força composta protegem o Sistema Nervoso Central (SNC) nas estações pesadas da prova.

---

## 📊 Suite Completa de 7 Gráficos Analíticos & Diagrama de Pareto

A aba **Analytics & Gráficos (7)** implementa um motor vetorial interativo em *Pro Dark Mode* organizado em quatro pilares analíticos:

### 1. Evolução de Desempenho e Carga (Sobrecarga Progressiva)
- **Gráfico de Linha (*Line Chart*)**: Analisa a progressão temporal ao longo dos 26 dias com alternância instantânea entre **Carga Interna (`sRPE` Planeada vs. Realizada em UA)**, **Intensidade de Força (`% 1RM`)** e **Ritmo de Corrida (`Pace /km`)**.
- **Gráfico de Área (*Area Chart*)**: Exibe o **Volume Total de Treino Acumulado** por agrupamento muscular e sistema energético (*Motor Aeróbico/Corrida*, *Cadeia Anterior/Quadríceps*, *Cadeia Posterior/Anca*, *Superior Push/Pull* e *Core & Grip*).

### 2. Distribuição e Composição do Treino
- **Gráfico de Barras Empilhadas (*Stacked Bar Chart*)**: Compara os 4 Microciclos (`M1 Calibração`, `M2 Pico de Carga`, `M3 Especificidade/Transições`, `M4 Tapering`) alternando entre **Séries Semanais por Grupo Muscular** e **Minutos em Zonas de Frequência Cardíaca (`Z1` a `Z5`)**.
- **Gráfico de Radar / Teia (*Radar Chart*)**: Avaliação multidimensional do atleta em 5 eixos (**Força**, **Resistência**, **Mobilidade**, **Potência** e **Velocidade** de `0` a `100%`) sobreposta ao polígono de referência da divisão oficial (`Women Open`, `Men Open`, `Women Pro`, `Men Pro`).

### 3. Correlação e Métricas de Recuperação (Prevenção de Overtraining)
- **Gráfico de Dispersão (*Scatter Plot*)**: Cruza a **Carga Externa (Volume/Stress)** com a **Carga Interna (PSE / Escala de Borg `6–20`)**, isolando visualmente a zona de alerta de fadiga desproporcional.
- **Gráfico Combinado (*Barra Vertical + Linha*)**: Cruza o **Volume Diário de Treino (Barras)** com o **Índice de Prontidão / Recuperação & VFC Estimada (Linha `0–100%`)**, demonstrando a supercompensação fisiológica até ao dia da prova.

### 4. Diagrama de Pareto (80/20) para Eficiência de Exercícios
- **Eixo X (Barras Ordenadas Decrescentemente)**: Os 10 segmentos do HYROX (`Corrida 8x1km`, `Sled Push`, `Wall Balls`, `Sandbag Lunges`, `Roxzone 16x`, `Sled Pull`, `Burpee Broad Jumps`, `Farmer's Carry`, `Rowing`, `SkiErg`).
- **Eixo Y Direito (Linha Acumulada `0% → 100%` + Corte `80%`)**: Isola automaticamente quais exercícios consomem **80% da fadiga acumulada ou do tempo perdido em prova**, gerando um diagnóstico técnico prioritário personalizado para o atleta.

---

## ⚡ Funcionalidades Táticas e Operacionais

- **Prescrição Dinâmica por 1RM & Calculadora de Epley**: Cálculo automático em quilogramas (`kg`) para todos os blocos de força (`Back Squat`, `Front Squat`, `RDL`, `Trap Bar Deadlift`, `Bulgarian Split Squat`, `Walking Lunges`, `Goblet Squat`, `Push Press`, `Remada Curvada`) com percentagens editáveis.
- **Diagnóstico do Piso de Força (*Strength Floor*)**: Cruzamento dos 1RMs do atleta com as cargas oficiais da divisão selecionada nas 5 estações pesadas.
- **Simulador Cirúrgico da Roxzone (16 Transições)**: Cálculo do tempo total de transição vs. Top 10% Elite (`05:21`) e protocolo comportamental dos **3 Passos**.
- **Planeador de Fracionamento Preventivo (*Anti-Falha*)**: 3 perfis selecionáveis (`Conservador 80/20`, `Tático Equilibrado`, `Densidade Avançada`) para *Sandbag Lunges (100m)* e *Wall Balls (100 reps)*.
- **Ergonomia Mobile para Ginásio**:
  - **Barra de Navegação Inferior Fixa** para operação com uma só mão em smartphones;
  - **Screen Wake Lock API** mantendo o ecrã ligado automaticamente enquanto o **Cronómetro EMOM & Roxzone** está ativo;
  - **Sincronização Web ↔ Mobile** via *Cloud Firestore* (`hyrox_profiles/{syncCode}`) e exportação/importação instantânea de backup `.JSON`.

---

## 📝 Histórico de Atualizações (Changelog)

Todas as atualizações estruturais e evolutivas do projeto são registadas abaixo:

- **v1.3.1 (Atual) — Renomeação Oficial, Estabilização UMD/PWA & Integração GitHub**:
  - Alteração do título oficial da aplicação para **HYROX Periodização**;
  - Substituição do carregador ESM por *runtime* React 18 UMD + ícones SVG vetoriais nativos embutidos, eliminando conflitos de instâncias em CDN e garantindo abertura imediata tanto no Firebase Hosting quanto localmente (`file://`);
  - Atualização do Service Worker (`hyrox-periodizacao-pwa-v3`) para estratégia *Network-First* com fallback *Offline*;
  - Criação do `README.md` oficial com badges Shields.io e publicação no repositório GitHub.
- **v1.3.0 — Layout Profissional *Pro Dark Mode* & Suite de 7 Gráficos Analíticos (`003-pro-dark-analytics-charts`)**:
  - Implementação da Faixa Executiva de Telemetria (4 KPIs alinhados no topo para Web e Mobile);
  - Implementação dos 7 gráficos SVG interativos: *Gráfico de Linha*, *Gráfico de Área*, *Gráfico de Barras Empilhadas*, *Gráfico de Radar (5 Eixos)*, *Gráfico de Dispersão (Scatter Plot)*, *Gráfico Combinado (Barra + Linha de Prontidão/VFC)* e *Diagrama de Pareto 80/20 de Eficiência de Exercícios*.
- **v1.2.0 — Aplicação Web & Mobile PWA no Firebase (`002-firebase-web-mobile-pwa`)**:
  - Configuração do Firebase Hosting (`public/index.html`, `public/manifest.json`, `public/sw.js`, `public/icon.svg`) e regras de segurança do Cloud Firestore (`firestore.rules`);
  - Adição da Barra de Navegação Inferior Mobile, *Screen Wake Lock API* no cronómetro e modal de sincronização Web ↔ Mobile.
- **v1.1.0 — Motor Tático de Pareto 80/20 (`001-pareto-80-20-tactics`)**:
  - Implementação das 4 Frentes de Pareto: Auditoria 80/20 do Motor Aeróbico, Diagnóstico do Piso de Força (*Strength Floor*), Simulador da Roxzone (16 passagens) e Planeador de Fracionamento Preventivo.
- **v1.0.0 — Fundação & Constituição do Projeto**:
  - Estruturação dos 26 dias (4 microciclos), calculadora de 1RM (Fórmula de Epley), matriz oficial das 4 divisões HYROX Singles e calculadora de periodização nutricional (`g/kg`).

---

## 🛠️ Como Executar Localmente ou Publicar

1. **Execução Direta (Zero Build)**:
   - Basta abrir o ficheiro `public/index.html` (ou `hyrox_26_day_tactical_periodization_tracker.html`) em qualquer navegador moderno, ou servir a pasta `public/`:
     ```powershell
     npx -y firebase-tools@latest serve --only hosting
     ```
2. **Deploy no Firebase Hosting**:
   ```powershell
   npx -y firebase-tools@latest deploy --only hosting --project hyrox-simulado-26d
   ```

---

## 📬 Contato e Autor

**Contato (suporte técnico):** Projeto de uso pessoal. Para manutenção/suporte, consulte o responsável pelo repositório.

<p align="left">
  <a href="https://github.com/Gegeu-sp" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Gegeu--sp-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://br.linkedin.com/in/argeu-rodrigues-9a6b7174" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Argeu_Rodrigues-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

**Projeto desenvolvido por Argeu Rodrigues**  
🎓 4º semestre de ADS na Faculdade Anhembi Morumbi  
🏋️‍♂️ Personal Trainer | CREF: 158814-G/SP  

- **LinkedIn**: [br.linkedin.com/in/argeu-rodrigues-9a6b7174](https://br.linkedin.com/in/argeu-rodrigues-9a6b7174)
- **GitHub**: [https://github.com/Gegeu-sp](https://github.com/Gegeu-sp)

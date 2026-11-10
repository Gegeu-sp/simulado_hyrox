<!--
Sync Impact Report:
- Version change: [CONSTITUTION_VERSION] (unratified template) → 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] → I. Fidelidade Científica e Regulamentar HYROX (INVIOLÁVEL)
  - [PRINCIPLE_2_NAME] → II. Prescrição Dinâmica e Individualizada
  - [PRINCIPLE_3_NAME] → III. Arquitetura Offline-First e Persistência Local Imediata
  - [PRINCIPLE_4_NAME] → IV. Monitorização de Carga Interna (sRPE) e Prontidão Fisiológica
  - [PRINCIPLE_5_NAME] → V. Interface Tática de Alta Legibilidade e Usabilidade em Treino
- Added sections:
  - Parâmetros Técnicos e Domínio Fisiológico
  - Fluxo de Desenvolvimento e Portões de Qualidade
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (compatible with Constitution Check gates)
  - ✅ .specify/templates/spec-template.md (compatible with functional/testable requirements)
  - ✅ .specify/templates/tasks-template.md (compatible with phase structure)
- Follow-up TODOs: None
-->

# HYROX 26-Day Tactical Periodization Tracker Constitution

## Core Principles

### I. Fidelidade Científica e Regulamentar HYROX (INVIOLÁVEL)
Toda prescrição de treino, matriz de cargas e diretriz tática DEVE refletir estritamente o modelo
*Endurance-Led, Strength-Protected* (6 sessões/semana ao longo de 26 dias e 4 microciclos) e as
regras oficiais da temporada HYROX Singles 2026/27. As cargas regulamentares (*Race Weights* — RW)
para `WOMEN_OPEN`, `MEN_OPEN`, `WOMEN_PRO` e `MEN_PRO`, bem como a ondulação de volume/intensidade
(incluindo o corte de 55% de volume no Microciclo 4 de *Tapering* e a polarização *Hard/Easy* em
torno da corrida comprometida de quinta-feira), NÃO DEVEM ser alteradas de forma arbitrária sem
justificativa fisiológica documentada.

### II. Prescrição Dinâmica e Individualizada
Nenhum valor prescritivo dependente do perfil do atleta DEVE ser estático quando puder ser derivado
matematicamente. O sistema DEVE calcular em tempo real:
- Cargas de força em quilogramas a partir do perfil de `1RM` do utilizador (incluindo estimativa
  submáxima pela Fórmula Científica de Epley: `1RM = Peso × (1 + Reps / 30)`) e de percentagens
  alvo editáveis por bloco/dia;
- Ritmos de corrida (*Paces*) derivados do *Goal Race Pace* (`GRP`), aplicando automaticamente os
  deltas táticos (ex.: Regra do 1.º km anti-*fade* `+15s/km`, intervalos de $\text{VO}_2\text{máx}$
  `-7s/km`);
- Metas nutricionais diárias (hidratos de carbono, proteína e janelas pré/pós-treino) escaladas pelo
  peso corporal do atleta (kg) e pela exigência energética da sessão (`LOW`, `MODERATE`, `HIGH`,
  `CARB_LOAD`, `RACE_DAY`).

### III. Arquitetura Offline-First e Persistência Local Imediata
A aplicação DEVE funcionar de forma 100% autónoma no cliente (*client-side*), sem dependência de
servidores externos ou conectividade de rede durante o uso no ginásio ou pista. Todas as mutações
de estado do atleta — dia selecionado, divisão competitiva, peso corporal, `GRP`, tabela de `1RMs`,
percentagens customizadas, conclusão de dias e diário de carga — DEVEM ser sincronizadas
imediatamente no `localStorage` sob o prefixo padronizado `hyrox_*` e hidratadas de forma segura
com valores padrão (*fallbacks*) resilientes a falhas de leitura.

### IV. Monitorização de Carga Interna (sRPE) e Prontidão Fisiológica
O controlo da carga de treino DEVE integrar métricas planeadas e realizadas. Cada um dos 26 dias
DEVE permitir o registo da Perceção Subjetiva de Esforço na Escala de Borg (`6` a `20`), duração
real da sessão (minutos), frequência cardíaca basal matinal (`bpm`) e notas táticas de transição.
A Carga Interna Acumulada DEVE ser quantificada em Unidades Arbitrárias (`sRPE = RPE × Duração`) e
acompanhada dos alertas de prevenção de *overtraining* (elevação de `+5 a +10 bpm` na FC matinal,
insónia persistente ou DOMS > 72h).

### V. Interface Tática de Alta Legibilidade e Usabilidade em Treino
A interface do utilizador DEVE privilegiar leitura rápida sob fadiga, alto contraste visual (tema
escuro `slate-950`/`slate-900`) e codificação cromática semântica consistente para zonas de stress
fisiológico (verde para regenerativo/Zona 2, âmbar para carga moderada/força, vermelho/rosa para
alta carga/limiar e amarelo para destaques competitivos HYROX). Utilitários operacionais de sessão,
como o cronómetro integrado de *Roxzone* e *EMOM*, DEVEM estar acessíveis diretamente na vista do
treino do dia, com suporte responsivo tanto em dispositivos móveis quanto em ecrãs desktop.

## Parâmetros Técnicos e Domínio Fisiológico

- **Stack Tecnológica**: Componentes funcionais em React (`useState`, `useEffect`, `useMemo`),
  estilização utilitária via Tailwind CSS e iconografia via `lucide-react`.
- **Integridade de Dados Imutáveis**: As estruturas de dados base (`STRENGTH_EXERCISES`,
  `DIVISIONS`, `MICROCYCLES`, `WORKOUT_DAYS`, `OFFICIAL_STATIONS_STRATEGY`) constituem a fonte
  canónica de verdade do ciclo de 26 dias (10/11 a 05/12) e DEVEM manter tipagem e chaves
  consistentes em todas as vistas (`TODAY`, `STRENGTH_RM`, `CALENDAR`, `LOAD`, `STRATEGY`,
  `NUTRITION`).
- **Idioma e Terminologia**: A interface e o conteúdo técnico DEVEM manter o idioma Português,
  preservando os termos técnicos oficiais do ecossistema HYROX (*Roxzone*, *Compromised Running*,
  *Sled Push/Pull*, *Wall Balls*, *Farmer's Carry*, *Sandbag Lunges*, *Strength Floor*, *Tapering*).

## Fluxo de Desenvolvimento e Portões de Qualidade

- **Invariantes de Cálculo**: Qualquer alteração nas fórmulas de carga (`sRPE`, Epley `1RM`,
  conversão de `GRP` em `MM:SS` ou macronutrientes por `g/kg`) DEVE tratar entradas inválidas
  (`NaN`, strings malformadas, limites mínimos/máximos) sem quebrar a renderização.
- **Compatibilidade de Estado Local**: Novas funcionalidades que persistam dados no navegador DEVEM
  utilizar chaves prefixadas com `hyrox_` e preservar a compatibilidade retroativa com os dados já
  registados pelo atleta no `localStorage`.
- **Coesão Visual e Responsividade**: Qualquer novo componente ou aba DEVE respeitar a grelha
  responsiva (`max-w-7xl`), os estados de foco/hover e a hierarquia tipográfica mono-espaçada
  (`font-mono`) para métricas numéricas, cargas, tempos e percentagens.

## Governance

Esta Constituição governa todas as especificações, planos de implementação e alterações de código
do projeto **HYROX 26-Day Tactical Periodization Tracker**.

- **Procedimento de Emenda**: Qualquer proposta de alteração aos princípios ou às matrizes
  fisiológicas/regulamentares DEVE atualizar este documento em `.specify/memory/constitution.md`,
  registar o impacto no relatório de sincronização e justificar a mudança face à ciência do treino
  híbrido ou às regras oficiais da prova.
- **Política de Versionamento**: Segue o versionamento semântico (`MAJOR.MINOR.PATCH`):
  - `MAJOR`: Remoção ou redefinição incompatível de princípios fundamentais ou alteração estrutural
    do modelo de periodização;
  - `MINOR`: Adição de novos princípios, secções de governação ou expansão substancial de
    diretrizes técnicas/fisiológicas;
  - `PATCH`: Clarificações de redação, correções ortográficas ou refinamentos sem alteração
    semântica.
- **Verificação de Conformidade**: Todos os planos (`/speckit-plan`), especificações
  (`/speckit-specify`) e tarefas (`/speckit-tasks`) DEVEM validar a conformidade com os 5 Princípios
  Fundamentais antes da implementação.

**Version**: 1.0.0 | **Ratified**: 2026-11-10 | **Last Amended**: 2026-11-10

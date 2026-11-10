# UI & State Contract: Motor Tático de Pareto 80/20

**Feature**: `001-pareto-80-20-tactics`
**Date**: 2026-11-10

## 1. Contrato de Armazenamento Local (`localStorage`)

Todas as chaves DEVEM respeitar o Princípio III da Constituição (prefixo `hyrox_` e fallback resiliente):

| Chave `localStorage` | Tipo Serializado | Valor Padrão | Validação na Leitura |
|----------------------|------------------|--------------|----------------------|
| `hyrox_roxzone_sec` | `string` (number) | `'22'` | `Math.min(60, Math.max(12, parseInt(val, 10) \|\| 22))` |
| `hyrox_fractionation_profile` | `string` | `'BALANCED_PARETO'` | Deve pertencer a `['SAFE_80_20', 'BALANCED_PARETO', 'ELITE_DENSITY']`, senão `'BALANCED_PARETO'` |

As chaves existentes (`hyrox_selected_day`, `hyrox_division`, `hyrox_weight`, `hyrox_pace`, `hyrox_completed_days`, `hyrox_day_logs`, `hyrox_one_rms`, `hyrox_custom_pcts`) permanecem 100% compatíveis e alimentam os cálculos reativos das 4 frentes de Pareto.

## 2. Contrato de Interface do Utilizador (Abas e Componentes)

### 2.1 Aba `TODAY` (Treino do Dia)
- **Banner / Card do Núcleo Vital de Pareto (20% -> 80%)**:
  - Exibe a etiqueta do Pilar de Pareto do dia (`Motor Aeróbico 80%`, `Piso de Força 20%`, `Ganho Marginal Roxzone`, `Fracionamento Preventivo` ou `Supercompensação`).
  - Exibe o objetivo prioritário (`vital20Focus`) e a armadilha a evitar (`avoidTrap`).
- **Integração nos Blocos de Treino**:
  - Quando a sessão inclui `sandbagLunges` ou `wallBalls`, exibe um selo resumo com o **Plano de Fracionamento Preventivo** ativo do atleta.
  - No **Cronómetro EMOM & Roxzone**, adiciona um indicador rápido do **Protocolo dos 3 Passos** (meta configurada de `roxzoneTargetSec` segundos por transição).

### 2.2 Aba `LOAD` (Controle de Carga, Ondulação e Auditoria 80/20)
- **Painel de Auditoria da Regra do Motor Aeróbico (80/20)**:
  - Barra comparativa visual mostrando a proporção planeada (`82% Motor Aeróbico & Híbrido` vs. `18% Força Base`) e a proporção real concluída pelo atleta (`completedDays` e `sRPE`).
  - Alerta condicional de desequilíbrio caso `actualAerobicRatioPct < 65%` com 3+ treinos concluídos.

### 2.3 Aba `STRENGTH_RM` (Meus 1RMs & Diagnóstico do Piso de Força)
- **Matriz de Diagnóstico do Piso de Força (*Strength Floor vs. Race Weights*)**:
  - Lista as 5 estações de carga (`Sled Push`, `Sled Pull`, `Farmer's Carry`, `Sandbag Lunges`, `Wall Balls`) cruzando a carga oficial da divisão ativa (`WOMEN_OPEN`, `MEN_OPEN`, `WOMEN_PRO`, `MEN_PRO`) com o `1RM` correspondente do atleta.
  - Apresenta o selo semântico (`Domínio Metabólico / Protegido` em esmeralda, `Zona Limiar` em âmbar, `Alerta SNC / Sobrevivência` em rosa/vermelho) e indica quais sessões (Dias 1, 8, 15, 21) protegem aquela estação.

### 2.4 Aba `STRATEGY` (Cargas, Tática 05/12 & Simulador Pareto Roxzone/Fracionamento)
- **Simulador Interativo da Roxzone (16 Transições & Protocolo dos 3 Passos)**:
  - Controlo deslizante (`range` de `12s` a `50s` por transição) para simular o tempo total de Roxzone nas 16 passagens.
  - Comparativo visual com Top 10% (`05:21`) e Bottom 10% (`11:25`), exibindo a economia líquida de tempo e o ganho equivalente em segundos por quilómetro (`seg/km`) nos 8 km de corrida.
  - Checklist em 3 passos acionáveis do Protocolo de Transição.
- **Seletor Interativo de Fracionamento Preventivo (Estações 7 e 8)**:
  - Botões de seleção rápida entre os 3 perfis (`Conservador`, `Tático Equilibrado 80/20`, `Agressivo / Pro`), detalhando séries, pausas respiratórias (3–5 respirações) e impacto na proteção contra falha concêntrica.


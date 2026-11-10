# Quickstart & Validation Guide: Motor Tático de Pareto 80/20

**Feature**: `001-pareto-80-20-tactics`
**Date**: 2026-11-10

## Pré-requisitos

- Navegador web moderno com suporte a `localStorage` (ou ambiente de execução do componente React em `hyrox_26_day_tactical_periodization_tracker.html`).
- Nenhuma dependência de backend ou conexão com a internet é necessária (Arquitetura *Offline-First*).

## Cenários de Validação Passo a Passo

### 1. Validar Diretriz Diária de Pareto (US1)
1. Abra a aba **Treino do Dia** (`TODAY`).
2. Selecione o **Dia 1 (10/11 - Força Específica & Trenós)** e verifique a presença do bloco **Foco de Pareto 80/20**, destacando o Pilar `Piso de Força (20% Vital)` e a instrução para focar na eficiência mecânica sem chegar à falha concêntrica.
3. Selecione o **Dia 3 (12/11 - Compromised Running)** e verifique que o Pilar muda para `Motor Aeróbico & Transição (80% Determinante)`, destacando a estabilização do ritmo nos primeiros 300m pós-estação.

### 2. Validar Auditoria 80/20 de Volume e Alerta de Negligência Aeróbica (US1)
1. Abra a aba **Controle de Carga & Prontidão** (`LOAD`).
2. Verifique no painel **Auditoria de Pareto 80/20 (Motor Aeróbico vs. Força Base)** a distribuição planeada dos 26 dias (`18` sessões aeróbicas/híbridas = `82%` vs. `4` sessões de força pura = `18%`).
3. Marque como concluídos apenas os Dias `1`, `8` e `15` (todos da categoria `STRENGTH`) e verifique que o alerta de desequilíbrio é exibido, avisando que o motor aeróbico (80% do resultado) está a ser negligenciado.
4. Marque como concluídos os Dias `2`, `3`, `4` e `5` e confirme que o rácio volta ao equilíbrio saudável e o alerta desaparece.

### 3. Validar Diagnóstico do Piso de Força vs. Divisão (US2)
1. Abra a aba **Meus 1RMs (Força)** (`STRENGTH_RM`).
2. Localize a matriz **Diagnóstico do Piso de Força (Strength Floor vs. Cargas Oficiais)** com a divisão `MEN_OPEN` selecionada.
3. Reduza o `1RM` do `Back Squat` e `Front Squat` para `80 kg` e verifique que a estação **Sled Push (152 kg)** muda imediatamente para **Alerta SNC (Modo Sobrevivência)**.
4. Restaure o `Back Squat` para `140 kg` e confirme que o estatuto regressa para **Domínio Metabólico (Piso Protegido)**.
5. Mude a divisão no cabeçalho para `MEN_PRO` (Sled Push `202 kg`) e observe o recálculo instantâneo de todas as 5 estações de carga.

### 4. Validar Simulador da Roxzone e Fracionamento Preventivo (US3 & US4)
1. Abra a aba **Cargas & Tática 05/12** (`STRATEGY`).
2. No **Simulador Cirúrgico da Roxzone (16 Passagens)**, mova o seletor de tempo por transição para `20s` (Protocolo dos 3 Passos) e verifique o tempo total projetado (`05:20`) e a economia de mais de `6 minutos` face ao perfil passivo (`11:25`), bem como o ganho equivalente em `seg/km` de corrida.
3. No **Planeador de Fracionamento Preventivo (Estações 7 e 8)**, alterne entre os perfis `Conservador (20-15-15-15-15-10-10)`, `Tático Equilibrado (25-20-15-15-15-10)` e `Agressivo / Pro (35-25-20-20)`.
4. Navegue para o **Dia 26 (05/12 - Dia do Simulado)** na aba `TODAY` e confirme que o esquema de fracionamento escolhido e a meta de Roxzone estão visíveis e persistem após recarregar a página.


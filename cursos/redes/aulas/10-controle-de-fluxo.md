# Aula 10 — Controle de fluxo: Para-e-Espera e Janela Deslizante

> Base: *Aula 9 – Controle de fluxo*. Lista: [`listas/lista-10.md`](../listas/lista-10.md)

## 1. Por que controlar o fluxo na camada 2?

Um transmissor **rápido** pode enviar quadros mais depressa do que um receptor **lento** consegue processar; sem controle, os **buffers do receptor transbordam** e quadros são perdidos. O controle de fluxo **impede que o transmissor sobrecarregue o receptor**.

## 2. Evolução dos protocolos

### 2.1 Simplex ideal
Supõe: **sem erros**, uma só direção, **buffer infinito**, camada de rede sempre pronta. **Não faz controle de fluxo nem trata erros.** Só serve para entender.

### 2.2 Simplex Para-e-Espera (Stop-and-Wait) — resolve o fluxo
O receptor **confirma cada quadro**; o transmissor **só envia o próximo depois da confirmação**. O enlace precisa ser **bidirecional** (para a confirmação voltar).

### 2.3 Para-e-Espera com canal ruidoso
Quadros podem ser **danificados ou perdidos**. Então:
- o receptor **descarta** quadros com erro (sempre detectados);
- o transmissor liga um **cronômetro (timer)** ao enviar; se zerar sem confirmação, **retransmite**.

**Novo problema:** se foi o **ACK** que se perdeu, o receptor recebe o mesmo quadro **duas vezes** e repassa **duplicado** à camada de rede. **Solução:** **número de sequência** em cada quadro (o receptor descarta duplicatas).

### 2.4 Piggybacking
Em comunicação **bidirecional**, a **confirmação viaja junto com um quadro de dados** no sentido contrário, economizando quadros. Pergunta: até quando esperar dados da camada de rede para carona? Resposta: um **tempo limite**; se expirar, envia **só a confirmação**.

## 3. O problema do Para-e-Espera

**Exemplo da aula** (enlace de satélite): 50 kbps, atraso de propagação **250 ms**, quadros de **1.000 bits**.

- Tempo para pôr o quadro no enlace: 1.000 / 50.000 = **20 ms**.
- Chegada ao receptor: 250 + 20 = **270 ms**.
- Confirmação (supondo ACK minúsculo): 270 + 250 = **520 ms**.
- O transmissor ficou **bloqueado 500 ms de 520 ms** ≈ **96%** do tempo → utiliza só **~4%** da banda.

**Solução: paralelismo (pipeline) → janela deslizante.**

## 4. Janela deslizante

O transmissor pode enviar **até w quadros antes de esperar confirmação**. Com *w* bem escolhido, o envio fica **praticamente contínuo**.

**Qual w usar?** Precisamos saber quantos quadros cabem "dentro do canal" (indo do transmissor ao receptor):

$$ BD = \frac{\text{banda (bps)} \times \text{atraso (s)}}{\text{tamanho do quadro (bits)}} \quad (\text{em quadros}) $$

$$ w_{\text{ótimo}} = 2\,BD + 1 $$

- **2BD** porque conta **ida e volta**;
- **+1** porque o ACK só sai quando o quadro é recebido por completo.

**Exemplo:** BD = 50.000 × 0,25 / 1.000 = **12,5 quadros** → w = 2·12,5 + 1 = **26 quadros**.
O transmissor envia um quadro a cada 20 ms; quando terminou o 26º (t = 520 ms), chega o ACK do 1º, e os demais chegam de 20 em 20 ms — o transmissor nunca fica parado.

**Utilização do enlace:**

$$ U \le \frac{w}{1 + 2\,BD} $$

Se *w* < 26, não se aproveita 100% do enlace. Ex.: w = 13 → U = 13/26 = **50%**; w = 1 (para-e-espera) → 1/26 ≈ **3,85%**.

## 5. Retransmissão na janela deslizante — extra

Quando um quadro se perde no meio de uma janela, há duas estratégias clássicas:

| | **Go-Back-N** | **Repetição seletiva** |
|---|---|---|
| Receptor | só aceita em ordem (janela de recepção = 1) | guarda quadros fora de ordem (buffer) |
| Retransmissão | reenvia o quadro com erro **e todos os seguintes** | reenvia **só** o quadro perdido |
| Complexidade | simples | maior (buffer no receptor) |

## 6. Pratique

```bash
cd praticas
node janela_deslizante.js                 # exemplo do satélite
node janela_deslizante.js 1e6 0.01 8000   # tente outro enlace (1 Mbps, 10 ms, 1000 bytes)
```

---

## Exercícios

Lista: [`listas/lista-10.md`](../listas/lista-10.md) — respostas: [`respostas/lista-10.md`](../respostas/lista-10.md)

---

## Resumo

- Controle de fluxo = impedir que o transmissor **afogue** o receptor.
- **Para-e-Espera:** 1 quadro por vez; simples, mas **desperdiça** o enlace quando o atraso é grande.
- Canal ruidoso exige **timer** e **número de sequência** (evita duplicatas); **piggybacking** economiza ACKs.
- **Janela deslizante:** w quadros em trânsito; **w ótimo = 2·BD + 1**; **U ≤ w/(1+2·BD)**.

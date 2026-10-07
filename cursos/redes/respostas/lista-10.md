# Respostas — Lista 10: Controle de fluxo e janela deslizante

Lista: [`listas/lista-10.md`](../listas/lista-10.md) · Aula: [`aulas/10-controle-de-fluxo.md`](../aulas/10-controle-de-fluxo.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L3 q.7)*

> Por que é feito o controle de fluxo na camada 2?

Para o transmissor **não sobrecarregar o receptor** (estouro de buffers e perda de quadros).

## 2. *(P1·L3 q.14)*

> Descreva stop-and-wait e janela deslizante (do ponto de vista do controle de fluxo).

**Stop-and-wait:** 1 quadro por vez, só envia o próximo após o ACK — simples, mas ocioso quando o atraso é grande. **Janela deslizante:** até *w* quadros em trânsito sem esperar ACK, mantendo o enlace ocupado.

## 3.

> Por que, no stop-and-wait com **canal ruidoso**, é preciso um **timer** e um **número de sequência**?

O **timer** dispara a retransmissão quando o quadro ou o ACK se perde. O **número de sequência** permite ao receptor **reconhecer duplicatas** (quando o ACK é que se perdeu e o quadro foi reenviado) e não passá-las duas vezes à camada de rede.

## 4.

> O que é **piggybacking**? Qual o problema de esperar pela carona e como se resolve?

Enviar a **confirmação junto a um quadro de dados** no sentido contrário, economizando quadros. Se a camada de rede demora a ter dados, o ACK atrasaria; resolve-se com um **tempo limite**: expirou, envia **só o ACK**.

## 5.

> **Satélite:** 50 kbps, atraso de propagação 250 ms, quadros de 1.000 bits (exemplo da aula). Calcule (a) o tempo para transmitir um quadro; (b) o ciclo total do stop-and-wait; (c) a utilização do enlace; (d) o BD em quadros e a janela ótima; (e) a utilização com janela de 13.

(a) 1000/50000 = **20 ms**. (b) 20 + 250 + 250 = **520 ms**. (c) 20/520 ≈ **3,85%** (transmissor bloqueado ~96%). (d) BD = 50.000·0,25/1000 = **12,5 quadros**; w = 2·12,5 + 1 = **26**. (e) U = 13/26 = **50%**.

## 6.

> **Enlace terrestre:** 1 Mbps, 20 ms de atraso, quadros de 1.000 bytes. Calcule BD, janela ótima e a utilização do stop-and-wait.

Quadro = 8.000 bits → tx = **8 ms**. BD = 10⁶·0,02/8000 = **2,5 quadros**; w = 2·2,5 + 1 = **6**. U(stop-and-wait) = 1/6 ≈ **16,7%**.

## 7.

> **Satélite de banda larga:** 1,5 Mbps, 270 ms de atraso, quadros de 4.000 bits. Calcule a janela ótima e a utilização para w = 1 e w = 50.

tx = 2,67 ms; BD = 1,5·10⁶·0,27/4000 = **101,25**; w ótimo = 2·101,25 + 1 = **203,5** (≈ 204). U(w=1) = 1/203,5 ≈ **0,49%**; U(w=50) = 50/203,5 ≈ **24,6%**.

## 8.

> Diferencie **Go-Back-N** e **repetição seletiva**.

**Go-Back-N:** receptor só aceita em ordem; ao perder um quadro o transmissor reenvia **ele e todos os seguintes**. **Repetição seletiva:** receptor guarda fora de ordem; reenvia **só o quadro perdido** (mais buffer e complexidade).

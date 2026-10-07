# Respostas — Lista 09: Tratamento de erros: Hamming, paridade e CRC

Lista: [`listas/lista-09.md`](../listas/lista-09.md) · Aula: [`aulas/09-tratamento-de-erros.md`](../aulas/09-tratamento-de-erros.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L3 q.13)*

> Quais as possíveis estratégias do receptor ao detectar erros no fluxo de dados recebidos? Explique-as.

**Nada** (descarta; outra camada resolve — Frame Relay); **pedir retransmissão** (ARQ: stop-and-wait, janela deslizante); **corrigir** sozinho com redundância (FEC).

## 2. *(P1·L3 q.14)*

> Descreva as técnicas: (a) Stop-and-wait error control; (b) Sliding window error control.

(a) Envia **um quadro e espera**: ACK → próximo; NAK/timeout → reenvia. (b) Vários quadros em trânsito (até *w*) sem esperar confirmação; o ACK traz o número do próximo quadro esperado.

## 3. *(P1·L3 q.15)*

> Qual a diferença técnica entre correção e detecção de erros?

**Detecção:** só responde **se houve erro** (sim/não) — exige pouca redundância. **Correção:** precisa saber **quantos bits e onde** erraram — exige bem mais redundância.

## 4. *(P1·L3 q.16)*

> Quais os tipos de erros que podem ocorrer? Qual o mais comum?

**Erro de bit** (1 bit) e **erro de rajada** (2 ou mais bits). O mais comum é o de **rajada**, pois o ruído dura mais que um bit.

## 5. *(P1·L3 q.17)*

> Como se determina o comprimento de uma rajada de erro?

Do **primeiro bit errado ao último** (inclusive), mesmo que haja bits corretos no meio.

## 6. *(P1·L3 q.18)*

> Como podem ser classificadas as técnicas de correção de erro? Qual delas propicia o melhor desempenho do sistema?

**FEC** (código corretor, sem retransmissão) e **ARQ** (detecta e pede reenvio). O **melhor desempenho** vem de **combinar as duas**.

## 7. *(P1·L3 q.19)*

> Por que é inserida redundância no fluxo de dados a ser transmitido?

Sem bits extras, qualquer padrão seria uma palavra válida e o erro seria **indetectável**. A redundância cria palavras inválidas que revelam (e permitem corrigir) o erro.

## 8. *(P1·L3 q.20)*

> Explique e exemplifique a distância de Hamming.

É o **número de posições de bit diferentes** entre duas palavras. Ex.: `10001001` e `10110001` → XOR `00111000` → **distância 3**. A distância do **código** é a menor entre todas as palavras válidas.

## 9. *(P1·L3 q.21)*

> Qual a distância de Hamming necessária para detectar 3 erros? Usando um código com esta mesma distância, quantos erros podem ser corrigidos?

Detectar 3 → **D = 3 + 1 = 4**. Com D = 4 corrige ⌊(4−1)/2⌋ = **1 erro**.

## 10. *(P1·L3 q.22)*

> Qual a distância de Hamming necessária para corrigir 3 erros? Usando um código com esta mesma distância, quantos erros podem ser detectados?

Corrigir 3 → **D = 2·3 + 1 = 7**. Com D = 7 detecta D − 1 = **6 erros**.

## 11. *(P1·L3 q.23)*

> O que é bit de paridade?

Bit **extra** acrescentado para deixar o número de 1s **par ou ímpar**; detecta qualquer número **ímpar** de erros.

## 12. *(P1·L3 q.24)*

> Qual a diferença entre paridade par e paridade ímpar?

Na **par**, o total de 1s (dados + paridade) é **par**; na **ímpar**, é **ímpar**. Ex.: `1011001` (4 uns): par → bit 0; ímpar → bit 1.

## 13. *(P1·L3 q.25)*

> Como a técnica de paridade pode ser usada para blocos de dados?

**Paridade bidimensional**: calcula-se paridade de cada **linha e coluna** do bloco; um erro de 1 bit deixa **uma linha e uma coluna** erradas, cuja interseção **localiza e corrige** o bit.

## 14. *(P1·L3 q.26)*

> Como funciona o CRC (Cyclic Redundancy Check)?

Trata os dados como um número binário, **acrescenta r zeros** (r = grau do gerador), divide por **G** (módulo 2/XOR) e envia **dados + resto**. O receptor divide o quadro recebido por G: **resto 0 = sem erro detectado**.

## 15. *(P1·L3 q.27)*

> Em que situações se faz o uso intensivo de tratamento de erro?

Em meios **ruidosos/instáveis** (**sem fio, satélite**, longas distâncias) e quando o erro é inaceitável (transferência de arquivos).

## 16.

> **CRC.** Calcule o CRC e o quadro enviado: (a) d = `1101011011`, G = `10011` (exemplo da aula); (b) d = `11010011101100`, G = `1011`; (c) d = `1001`, G = `11`. O que a letra (c) lembra?

(a) resto **1110** → `11010110111110`. (b) resto **100** → `11010011101100100`. (c) resto **0** → `10010`. Com G = `11` o CRC é uma **paridade par**. Confira com `node crc.js <d> <G>`.

## 17.

> **Receptor.** Dado G = `1001`, o quadro `101110011` chegou. Está certo? E se chegar `001110011`?

Divide-se por G: `101110011` → resto **0** → **sem erro detectado**. `001110011` (1º bit trocado) → resto **≠ 0** → **erro detectado**.

## 18.

> **Hamming.** Calcule a distância do código {`00000`, `01011`, `10101`, `11110`} e diga quantos erros ele detecta e corrige.

Distâncias entre os pares: 3, 3, 4, 4, 3, 3 → **D = 3** → detecta **2**, corrige **1**.

## 19.

> **Rajada.** Foi enviado `11010110` e recebido `10011110`. Quais bits mudaram e qual o comprimento da rajada?

Mudaram as posições **2 e 5** (contando da esquerda) → rajada de comprimento **5 − 2 + 1 = 4**.

## 20.

> **Paridade 2D (paridade par).** Bloco enviado: `11000 / 10100 / 01100 / 00000` (última coluna = paridade das linhas; última linha = paridade das colunas). Chegou `11000 / 10100 / 00100 / 00000`. Localize e corrija o erro.

A **3ª linha** (`00100`) tem 1 uno → paridade ímpar → linha 3 errada; a **coluna 2** soma 1 → coluna 2 errada. Interseção: **linha 3, coluna 2** → inverter esse bit (`0`→`1`) recupera `01100`.

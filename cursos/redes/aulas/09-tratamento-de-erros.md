# Aula 09 — Tratamento de erros: detecção e correção

> Base: *Aula 8 – Tratamento de erros*. Lista: [`listas/lista-09.md`](../listas/lista-09.md)

## 1. Por que há erros e por que tratá-los na camada 2

Todo bit que flui entre dois pontos está sujeito a **alterações imprevisíveis por interferência**. A camada de enlace é a primeira com visão de *quadros*, então é onde se pode checar a integridade de cada unidade e, em alguns casos, recuperar o erro **no enlace onde ele ocorreu** (mais barato do que descobrir só de ponta a ponta).

## 2. O que o receptor pode fazer ao detectar um erro

| Estratégia | Como | Exemplo |
|---|---|---|
| **Nada** | descarta o quadro; assume que outra camada (TCP) resolve | Frame Relay |
| **Pedir retransmissão** | devolve uma mensagem ao transmissor (**ARQ**) | stop-and-wait, janela deslizante |
| **Corrigir sozinho** | usa informação redundante (**FEC**) | enlaces sem fio, satélite |

### Stop-and-wait
O transmissor envia **um quadro e para**, esperando confirmação. **ACK** → manda o próximo. **NAK** (ou timeout) → reenvia o mesmo.

### Janela deslizante (sliding window)
Vários quadros em trânsito de uma vez: o transmissor envia até **w** quadros antes de receber qualquer confirmação. Quando há falha, o ACK devolvido traz o **número do quadro esperado a seguir**. (Detalhes na aula 10.)

## 3. Tipos de erro

| Tipo | O que é |
|---|---|
| **Erro de bit** | **1** bit da unidade de dados foi invertido |
| **Erro de rajada (burst)** | **2 ou mais** bits corrompidos |

- **Comprimento da rajada:** do **primeiro bit corrompido ao último** (inclusive), mesmo que alguns bits no meio estejam corretos.
  Ex.: enviado `11010110`, recebido `10011110` → erros nas posições 2 e 5 → rajada de comprimento **5 − 2 + 1 = 4**.
- **O mais comum é o de rajada.** Um ruído dura muito mais que um bit: a 1 Mbps cada bit dura 1 µs, e ruídos duram bem mais, atingindo vários bits seguidos. Erro de bit isolado é o **menos provável**.

## 4. Detecção × correção

- **Detecção:** só responde **sim/não** (houve erro?). Bem mais simples.
- **Correção:** precisa saber **quantos** bits erraram e, principalmente, **onde**. Exige muito mais redundância.

**Por que inserir redundância?** Sem bits extras todo padrão de bits seria uma palavra válida — um erro transformaria uma palavra válida em outra e seria **indetectável**. A redundância (acrescentada pelo emissor e retirada pelo receptor) cria palavras *inválidas* que denunciam o erro (e, com mais redundância, indicam como corrigir).

### Classificação das técnicas de correção
- **FEC (Forward Error Correction):** códigos corretores; o receptor corrige sozinho, sem retransmissão.
- **ARQ (Automatic Repeat reQuest):** um código **detector** descobre o erro e pede **retransmissão**.
- **Melhor desempenho:** **combinar as duas** (híbrido).

## 5. Distância de Hamming

**Distância de Hamming** entre duas palavras = número de **posições de bit diferentes**. Se a distância é *D*, são necessários **D erros** para transformar uma na outra.

Exemplo: `10001001` e `10110001`
```
10001001
10110001
00111000   → 3 bits diferentes → distância = 3
```

A distância do **código** é a menor distância entre quaisquer duas palavras válidas.

| Objetivo | Distância necessária | Equivale a |
|---|---|---|
| **detectar** *d* erros | **d + 1** | erros detectados = D − 1 |
| **corrigir** *d* erros | **2d + 1** | erros corrigidos = ⌊(D − 1) / 2⌋ |

**Por quê?** Para corrigir, as palavras válidas precisam estar tão afastadas que, mesmo com *d* alterações, a palavra recebida ainda esteja **mais perto da original** do que de qualquer outra.

**Exemplo da aula:** código `0000000000`, `0000011111`, `1111100000`, `1111111111` → distância **5** → detecta **4**, corrige **2**.

**Resposta às perguntas da lista:**
- Detectar 3 erros → D = **4**; com D = 4 corrige ⌊3/2⌋ = **1** erro.
- Corrigir 3 erros → D = **7**; com D = 7 detecta **6** erros.

> Nota: *D − 1 detecção* e *⌊(D−1)/2⌋ correção* são os limites **de cada uso isolado**; ao usar o mesmo código para as duas coisas ao mesmo tempo os limites combinados são menores.

## 6. Paridade

Acrescenta **1 bit** para fazer o total de 1s ser par ou ímpar.

- **Paridade par:** bit escolhido para que o total de 1s (dados + paridade) seja **par**.
- **Paridade ímpar:** idem, total **ímpar**.

Ex. paridade par: `1000100` tem 2 uns → bit = **0**; `10001001` tem 3 uns → bit = **1**.

Limite: detecta **qualquer número ímpar** de erros, mas **não detecta número par** (dois bits trocados mantêm a paridade).

### Paridade em blocos (bidimensional)
Organiza os dados em linhas e colunas e calcula paridade de **cada linha** e de **cada coluna**.

```
10001001 | 1
10101100 | 0
10110001 | 0
10010100 | 1
---------+--
00000000 | 0      ← paridade das colunas
```
Se **1 bit** inverte, **uma linha e uma coluna** ficam com paridade errada: a interseção **localiza o bit** → dá para **corrigir**.

## 7. CRC (Cyclic Redundancy Check)

Ideia: tratar a mensagem como **um número binário enorme**, dividi-lo por um **gerador G** fixo (divisão **módulo 2**, usando XOR) e usar o **resto** como código. O receptor faz a mesma divisão; resto ≠ 0 → erro.

**Algoritmo (G com r+1 bits):**
1. Acrescente **r zeros** aos dados d.
2. Divida (d + r zeros) por G (módulo 2).
3. O **resto** (r bits) é o CRC. Envie **d seguido do resto**.

**Exemplo da aula:** d = `101110`, G = `1001` (r = 3)
```
101110000 ÷ 1001  →  resto = 011
enviado = 101110 011 = 101110011
```
**Exercício da aula:** G = `10011`, d = `1101011011` → resto `1110` → enviado `11010110111110`.

Receptor: divide o quadro **inteiro** por G; **resto 0** = nenhum erro detectado.

CRCs detectam **todas as rajadas de comprimento ≤ r** e quase todas as maiores; por isso são o padrão no trailer de quadros (Ethernet usa CRC-32).

## 8. Código de correção (Hamming) — extra

Uma palavra de código tem **N = M + R** bits (M de dados, R de redundância). Para corrigir **1 erro** é preciso **2^R ≥ M + R + 1**. Ex.: M = 4 → R = 3 (2³ = 8 ≥ 8) → **Hamming (7,4)**.

## 9. Quando o tratamento de erros é usado intensivamente

Em meios **ruidosos ou instáveis**: enlaces **sem fio**, **satélite**, longas distâncias, ambientes com muita interferência; e em dados em que o erro é inaceitável (transferência de arquivos). Em enlaces de baixa taxa de erro (fibra, par trançado de qualidade) o custo da redundância é evitado.

## 10. Pratique

```bash
cd praticas
node crc.js 101110 1001
node crc.js 1101011011 10011
node hamming.js
node paridade_2d.js
```

---

## Exercícios

Lista: [`listas/lista-09.md`](../listas/lista-09.md) — respostas: [`respostas/lista-09.md`](../respostas/lista-09.md)

---

## Resumo

- Receptor pode: **ignorar**, **pedir reenvio (ARQ)** ou **corrigir (FEC)**. Melhor desempenho: **ARQ + FEC**.
- Erro de bit (raro) × **rajada** (comum; comprimento = do 1º ao último bit errado).
- **Hamming:** detectar *d* → D = d+1; corrigir *d* → D = 2d+1.
- **Paridade:** 1 bit; detecta erros ímpares; **2D** corrige 1 bit.
- **CRC:** divisão módulo 2 pelo gerador; envia dados + resto; resto 0 no receptor = ok.

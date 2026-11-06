# Aula 01 — Representação de inteiros com sinal

> Base: *Notas de Aula SB*, Prof. Pedro Lara, seção 1 (Representação de Inteiros com Sinal). Respostas: [`respostas/aula-01.md`](../respostas/aula-01.md)

## 1. Por que precisamos de uma convenção

Com um número fixo de bits, é preciso decidir **como representar números negativos**. As duas convenções clássicas: **sinal e magnitude** e **complemento a dois**.

## 2. Sinal e magnitude

O **bit mais significativo (MSB)** indica o sinal (0 = positivo, 1 = negativo); os demais bits guardam o **valor absoluto**.

Exemplo: −5 com 6 bits (1 de sinal, 5 de magnitude): `1 00101`.

**Problemas:**
- **Zero duplicado:** `000000` e `100000` são ambos zero.
- É **simétrica** (mesma quantidade de positivos e negativos), mas a duplicidade do zero "desperdiça" um código.

## 3. Complemento a dois

É a convenção usada em praticamente todo hardware moderno. O MSB ainda indica o sinal, mas o valor negativo **x** com N bits é `2^N + x`.

**Método rápido** (o que se usa na prática):
1. Inverta todos os bits do número positivo (complemento de 1).
2. Some 1.

Exemplo, −5 com 6 bits:

```
+5          → 000101
inverte bits → 111010
soma 1       → 111011
```

| Decimal | Sinal e magnitude | Complemento a dois |
|---|---|---|
| +5 | 000101 | 000101 |
| −5 | 100101 | 111011 |
| +0 | 000000 | 000000 |
| −0 | 100000 | não existe |
| −1 | 100001 | 111111 |

**Vantagens sobre sinal e magnitude:** zero único, e a soma funciona com a **mesma lógica de hardware** para positivos e negativos (não precisa de um circuito separado para subtração).

## 4. Aritmética em complemento a dois

Soma-se normalmente, em binário, e **descarta-se o bit extra** que "vaza" à esquerda (carry-out além do N-ésimo bit).

Exemplo, 5 + (−5), 6 bits:

```
  000101
+ 111011
---------
 1000000   → descarta o bit extra → 000000 = 0  ✓
```

## 5. Overflow

Ocorre quando o resultado **não cabe** na faixa representável.

Exemplo, +40 + 60, 7 bits (faixa −64 a +63):

```
  0101000  (+40)
+ 0111100  (+60)
-----------
  1100100   → bit de sinal 1 = "negativo", mas 40+60=100 é positivo: OVERFLOW
```

**Como detectar:**
- **Regra prática:** se os dois operandos têm o **mesmo sinal** e o resultado tem **sinal oposto**, houve overflow.
- **Regra do hardware:** compare o **carry que entra** no bit de sinal com o **carry que sai** dele; são diferentes ⟺ overflow.

> **Pegadinha de prova:** overflow só é possível quando os operandos **têm o mesmo sinal** (positivo + positivo, ou negativo + negativo). Somar um positivo com um negativo nunca gera overflow.

---

## Exercícios

**Questão 1)** Converta para complemento a dois com 6 bits: a) −28 b) −14 c) 30 d) 15 e) −32 f) 0 g) −1 h) −16

**Questão 2)** Converta para decimal (complemento a dois): a) 110101 b) 010011 c) 110100 d) 011111 e) 100101 f) 111100 g) 100000 h) 101101

**Questão 3)** (extra) Some, em complemento a dois com 6 bits, e diga se há overflow: a) 20 + 15 b) 30 + 10 c) −20 + (−25) d) −10 + 50

**Questão 4)** (extra) Qual é a faixa de valores representáveis com N bits em complemento a dois? E com N bits em sinal e magnitude?

Respostas: [`respostas/aula-01.md`](../respostas/aula-01.md)

---

## Resumo

- **Sinal e magnitude:** MSB = sinal, resto = valor absoluto. Zero duplicado.
- **Complemento a dois:** inverte os bits e soma 1. Zero único; soma funciona igual para + e −.
- Soma: descarta o bit extra que vaza à esquerda.
- **Overflow:** operandos de mesmo sinal, resultado de sinal oposto.

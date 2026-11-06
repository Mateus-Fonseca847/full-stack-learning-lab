# Aula 02 — Ponto fixo e ponto flutuante (IEEE 754)

> Base: *Notas de Aula SB*, seções Representação de Ponto Fixo e de Ponto Flutuante. Respostas: [`respostas/aula-02.md`](../respostas/aula-02.md). Prática: [`praticas/representacao.js`](../praticas/representacao.js)

## 1. Ponto fixo

Reserva um número **fixo** de bits para a parte inteira e para a fracionária. Em `1101,1010` (4 bits + 4 bits):

```
2³ 2² 2¹ 2⁰ , 2⁻¹ 2⁻² 2⁻³ 2⁻⁴
1  1  0  1  ,  1    0    1    0
```

Valor: 2³+2²+2⁰+2⁻¹+2⁻³ = 8+4+1+0,5+0,125 = **13,625**.

### Decimal → binário (multiplicação sucessiva)

Multiplica-se a parte fracionária por 2; a parte inteira do resultado é o próximo bit.

Exemplo, 0,3 com 8 bits: 0,3×2=0,6→**0**; 0,6×2=1,2→**1**; 0,2×2=0,4→**0**; 0,4×2=0,8→**0**; 0,8×2=1,6→**1**; 0,6×2=1,2→**1**; 0,2×2=0,4→**0**; 0,4×2=0,8→**0**. Resultado: `0,01001100` (repete: a dízima não termina).

### Arredondamento com o bit n+1

Trunca-se em n bits; olha-se o bit seguinte (n+1): se **0**, mantém; se **1**, soma `2⁻ⁿ`.

Exemplo: 0,3 truncado em 4 bits = `0,0100`; o 5º bit é 1 ⟹ soma 2⁻⁴: `0,0100 + 0,0001 = 0,0101` = **0,3125**.

## 2. Ponto flutuante: estrutura

```
x = (−1)^s × 1,m × 2^e
```

- **s**: bit de sinal.
- **m**: mantissa, **normalizada** (sempre começa com 1 implícito antes da vírgula — não é armazenado).
- **e**: expoente, guardado com um **bias (viés)** para representar negativos sem bit de sinal próprio.

**IEEE 754 single precision (32 bits):** 1 bit de sinal + 8 bits de expoente + 23 de mantissa. Bias = 2⁸⁻¹ − 1 = **127**.

```
E_real = e_armazenado − 127
```

### Arredondamento

Mesma regra do ponto fixo, aplicada à mantissa: olhe o bit n+1 além dos bits disponíveis.

## 3. Conversão decimal → IEEE 754

1. Sinal s.
2. |x| em binário.
3. Normalize: `1,m × 2^e`.
4. `e_armazenado = E_real + bias`.
5. Arredonde a mantissa para os bits disponíveis.

**Exemplo:** −13,625 em single precision.

1. s = 1 (negativo).
2. 13,625₁₀ = 1101,101₂.
3. Normalizando: 1101,101₂ = 1,101101 × 2³.
4. e_armazenado = 3 + 127 = 130 = `10000010`₂.
5. Mantissa (23 bits): `10110100000000000000000`.

```
1 | 10000010 | 10110100000000000000000
sinal  expoente         mantissa
```

### Conversão IEEE 754 → decimal

```
x = (−1)^s · (1,m) · 2^(e_armazenado − bias)
```

Conferindo o exemplo: (−1)¹ · 1,101101₂ · 2^(130−127) = −1,101101₂ · 2³ = **−13,625**.

## 4. Considerações sobre precisão

- Números como 0,1 **não têm representação binária exata**: sofrem pequenas aproximações.
- O arredondamento com o bit n+1 reduz, mas não elimina, o erro.
- IEEE 754 define regras de arredondamento (para zero, para o mais próximo, para par).

**Comparação:**

| | Ponto fixo | Ponto flutuante |
|---|---|---|
| Faixa | limitada, fixa | muito maior (mantissa + expoente) |
| Precisão | constante em toda a faixa | maior perto de zero, menor em números grandes |
| Hardware | mais simples/barato | mais complexo |

> **Pegadinha de prova:** o **1 implícito** da mantissa normalizada não é armazenado — ao converter de volta, **sempre** se acrescenta esse 1 antes de multiplicar pelos bits da mantissa.

---

## Exercícios (ponto fixo)

**Questão 1)** Converta para binário em ponto fixo: a) 12,25 b) 2,28125 c) 3,296875 d) 23,25 e) 1,375 f) 0,40625 g) 9,421875 h) 15,875

**Questão 2)** Converta para decimal: a) 101,01 b) 111,101 c) 1,0101 d) 1000,1 e) 1010,11 f) 1011,011 g) 0,0011 h) 10000,10011

## Exercícios (ponto flutuante, com 1 bit de sinal, 4 bits de expoente polarizado em 7, 8 bits de mantissa)

**Questão 1)** Quais as vantagens do ponto flutuante (ex.: IEEE 754) sobre o ponto fixo?

**Questão 2)** Encontre a aproximação (1+4+8 bits, bias 7) para: a) 13,293 b) 1000,3 c) 0,20201 d) 18,026 e) 555,555 f) 1102,011 g) 0,03132 h) 0,33333...

**Questão 4)** Usando a mesma representação, encontre o valor em base 10: a) 1000100111010 b) 0111001101101 c) 0110111111101 d) 0011110001111 e) 0001010101000 f) 1111110110000 g) 1001010110001 h) 1011100101000

**Questão 5)** Quantos valores é possível representar no intervalo [0, 1] com essa representação?

**Questão 6)** Esboce um algoritmo para a multiplicação em IEEE 754 32 bits.

Respostas: [`respostas/aula-02.md`](../respostas/aula-02.md)

---

## Resumo

- Ponto fixo: bits fixos para parte inteira/fracionária; decimal → binário por multiplicação sucessiva por 2.
- Ponto flutuante: `(−1)^s × 1,m × 2^e`; IEEE 754 single: 1+8+23 bits, bias 127.
- Conversão: normalizar, calcular e_armazenado = E_real + bias, arredondar a mantissa.
- O **1 antes da vírgula** da mantissa é implícito, não armazenado.

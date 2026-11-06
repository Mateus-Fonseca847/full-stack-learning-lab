# Aula 03 — Aritmética com ponto flutuante

> Base: *Notas de Aula SB*, seção Aritmética com Ponto Flutuante. Respostas: [`respostas/aula-03.md`](../respostas/aula-03.md)

Forma normalizada: `x = (−1)^s · 2^e · m`, com **m ∈ [1, 2)**.

## 1. Soma

Para somar x e y, é preciso primeiro **alinhar os expoentes**. Supondo eₓ > e_y, a mantissa de y (o menor expoente) é **desnormalizada**, deslocada para a direita:

```
y = (−1)^sy · 2^ey · my = (−1)^sy · 2^ex · (my · 2^(ey − ex))
```

Só depois disso as mantissas (já na mesma potência de 2) podem ser somadas ou subtraídas.

### Underflow (perda total do menor termo)

Se a **diferença entre os expoentes** for maior que o número de bits da mantissa, o deslocamento "empurra" todos os bits do número menor para fora: ele simplesmente **desaparece** da soma.

Exemplo: x = 2³⁰, y = 2⁻¹⁰. A diferença de expoentes é 40; a mantissa IEEE 754 single tem só 23 bits. Todos os bits de y se perdem no deslocamento: **x + y = x**.

### Cancelamento catastrófico

Quando x e y têm valores **próximos e sinais opostos**, a subtração das mantissas cancela os dígitos mais significativos, sobrando poucos dígitos **significativos** — grande perda de precisão.

### Não comutatividade da soma

Em aritmética exata, a soma é comutativa e associativa. Em ponto flutuante, o **arredondamento a cada passo** faz com que a ordem importe:

```
(x + y) + z ≠ x + (y + z)
```

Relevante ao somar listas grandes com números de magnitudes muito diferentes (ordenar do menor para o maior reduz o erro).

## 2. Multiplicação

```
x · y = (−1)^(sx ⊕ sy) · 2^(ex + ey) · (mx · my)
```

- O sinal é o **XOR** dos sinais.
- Os expoentes **somam**.
- Como mx, my ∈ [1, 2), o produto mx·my ∈ **[1, 4)**. Se cair em [2, 4), é preciso **renormalizar**: desloca a mantissa para [1, 2) e soma 1 ao expoente.
- A mantissa final é **arredondada** para o número de bits disponível.

> **Pegadinha de prova:** multiplicação **não sofre** do problema de alinhar expoentes (eles só somam); o problema de underflow/cancelamento é específico da **soma/subtração**.

---

## Exercícios (extras, não vêm do material do professor)

1. x = 1,25 × 2⁵ e y = 1,5 × 2³. Alinhe os expoentes e calcule x + y (mostre a mantissa de y deslocada).
2. Por que a multiplicação em ponto flutuante não tem o mesmo problema de alinhamento de expoentes que a soma?
3. x = 1,8 × 2⁴ e y = 1,8 × 2⁴ com sinais opostos (x − y, mesma magnitude). O que acontece com os dígitos significativos? Dê um nome ao fenômeno.
4. Multiplique x = 1,4 × 2² por y = 1,8 × 2³ (mantissa, expoente e sinal). O produto das mantissas precisa de renormalização? Por quê?
5. Explique, com um exemplo numérico, por que (x + y) + z pode ≠ x + (y + z) em ponto flutuante.
6. Dado x = 2²⁰ e y = 2⁻⁵, com uma mantissa de 10 bits, y é perdido na soma x + y? Justifique pela diferença de expoentes.

Respostas: [`respostas/aula-03.md`](../respostas/aula-03.md)

---

## Resumo

- Soma: alinha expoentes (desnormaliza a mantissa do menor) e só então soma/subtrai.
- **Underflow da soma:** diferença de expoentes maior que os bits da mantissa ⟹ o termo menor some.
- **Cancelamento catastrófico:** x e y próximos, sinais opostos ⟹ perda de dígitos significativos.
- Soma **não é associativa** em ponto flutuante.
- Multiplicação: soma expoentes, XOR dos sinais, multiplica mantissas (pode precisar renormalizar para [1,2)).

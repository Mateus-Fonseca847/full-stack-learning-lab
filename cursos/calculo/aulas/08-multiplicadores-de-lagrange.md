# Aula 08 — Multiplicadores de Lagrange

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 8 – Multiplicadores de Lagrange* (tópicos 8.1 a 8.3 do Guia de Estudos). Respostas: [`respostas/aula-08.md`](../respostas/aula-08.md)

## 1. Extremos condicionados

Queremos o máximo/mínimo de f(x, y) **apenas sobre pontos que satisfazem uma restrição** g(x, y) = k. Geometricamente: no extremo, a curva de nível de *f* é **tangente** à curva de restrição. Tangentes iguais ⟹ **gradientes paralelos**.

## 2. Método (uma restrição, 2 ou 3 variáveis)

Resolva o sistema:

```
∇f = λ ∇g        e        g = k
```

Em R³ são 4 equações (fₓ = λgₓ, f_y = λg_y, f_z = λg_z, g = k) e 4 incógnitas (x, y, z, λ).

Passos:
1. Monte o sistema.
2. Resolva (isole λ, ou divida as equações para eliminá-lo).
3. **Calcule *f* em cada candidato** e compare: o maior é o máximo; o menor, o mínimo.

## 3. Duas restrições (3 variáveis)

Com g = k₁ e h = k₂:

```
∇f = λ ∇g + μ ∇h        g = k₁        h = k₂
```

5 equações e 5 incógnitas (x, y, z, λ, μ).

> **Pegadinha de prova:** Lagrange só fornece **candidatos**. Se a restrição é fechada e limitada (circunferência, esfera), o máximo e o mínimo existem e estão entre eles: compare os valores de *f*. Também confira o caso ∇g = 0 e não divida por uma variável que pode ser zero sem checar esse caso.

---

## Exercícios

1. Ache o máximo de f(x, y) = xy sujeito a x + y = 10.
2. Ache os extremos de f(x, y) = x + 2y sobre a circunferência x² + y² = 5.
3. Ache a menor distância da origem ao plano x + 2y + 3z = 14 e o ponto onde ocorre.
4. Minimize x² + y² + z² sujeito a x + y + z = 1 e x + 2y + 3z = 6.
5. Ache a maior área de um retângulo inscrito na circunferência x² + y² = 1 (vértices (±x, ±y)).
6. Maximize o volume xyz de uma caixa com x + y + z = 12 (x, y, z > 0).

Respostas: [`respostas/aula-08.md`](../respostas/aula-08.md)

---

## Resumo

- Condicionado: ∇f = λ∇g e g = k (uma restrição); ∇f = λ∇g + μ∇h (duas).
- Gradientes paralelos = curvas de nível tangentes.
- Resolva, calcule *f* nos candidatos e **compare**.

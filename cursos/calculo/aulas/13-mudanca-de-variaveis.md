# Aula 13 — Mudança de variáveis em integrais múltiplas

> Base: *slides 13 – Mudança de Var. em Int. Múlt.* (tópico que consta no site do professor mas **não** na tabela do Guia de Estudos; conteúdo escrito com base na ementa usual, confira com seu caderno). Respostas: [`respostas/aula-13.md`](../respostas/aula-13.md)

## 1. Ideia

Polares, cilíndricas e esféricas são casos de uma ideia geral: trocar (x, y) por novas variáveis (u, v) de modo que a **região** ou o **integrando** fique mais simples.

## 2. O Jacobiano

Para x = x(u, v), y = y(u, v):

```
∂(x, y)/∂(u, v) = | ∂x/∂u   ∂x/∂v |  =  (∂x/∂u)(∂y/∂v) − (∂x/∂v)(∂y/∂u)
                  | ∂y/∂u   ∂y/∂v |
```

Em 3 variáveis, o determinante 3 × 3 de ∂(x, y, z)/∂(u, v, w).

**Inversa:** ∂(x, y)/∂(u, v) = 1 / [ ∂(u, v)/∂(x, y) ]. É útil quando é mais fácil escrever u, v em função de x, y.

## 3. Fórmula da mudança de variáveis

```
∬_R f(x, y) dx dy = ∬_S f( x(u, v), y(u, v) ) · | ∂(x, y)/∂(u, v) | du dv
```

onde S é a região do plano uv que corresponde a R. Em 3 variáveis, o mesmo com |∂(x, y, z)/∂(u, v, w)|. Note o **valor absoluto**.

Casos já conhecidos:

| Sistema | Jacobiano |
|---|---|
| Polares | r |
| Cilíndricas | r |
| Esféricas | ρ² sen φ |

## 4. Roteiro

1. Escolha u, v para simplificar a **região** (ex.: fronteiras viram u = constante ou v = constante) ou o **integrando** (ex.: x + y, y/x).
2. Ache a região S do plano uv, transformando cada curva de contorno.
3. Calcule o Jacobiano (direto, ou pela inversa) e tome o módulo.
4. Monte e integre em u, v.

> **Pegadinha de prova:** esquecer o módulo do Jacobiano; calcular ∂(u, v)/∂(x, y) e usá-lo **sem inverter**; esquecer de transformar a região.

---

## Exercícios

1. Use x = au, y = bv para achar a área da elipse x²/a² + y²/b² ≤ 1.
2. Para u = 2x + y, v = x − y, calcule ∂(x, y)/∂(u, v).
3. Calcule ∬ e^((y − x)/(y + x)) dA sobre o triângulo de vértices (0, 0), (1, 0), (0, 1).
4. Calcule ∬ (x − y)² dA sobre a região |x| + |y| ≤ 1.
5. Ache a área da região entre as curvas xy = 1, xy = 2, y = x e y = 2x (primeiro quadrante).
6. Deduza o Jacobiano das coordenadas esféricas.

Respostas: [`respostas/aula-13.md`](../respostas/aula-13.md)

---

## Resumo

- ∬ f dA = ∬ f(x(u, v), y(u, v)) |∂(x, y)/∂(u, v)| du dv.
- Jacobiano = determinante das derivadas; da inversa, 1/∂(u, v)/∂(x, y).
- Polares: r; cilíndricas: r; esféricas: ρ² sen φ.
- Transforme a **região** também, e use o módulo.

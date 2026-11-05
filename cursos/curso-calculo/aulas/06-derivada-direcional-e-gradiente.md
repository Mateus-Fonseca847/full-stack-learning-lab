# Aula 06 — Derivada direcional e gradiente

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 6 – Derivada Direcional e Gradiente* (tópicos 6.1 a 6.4 do Guia de Estudos). Respostas: [`respostas/aula-06.md`](../respostas/aula-06.md)

## 1. Derivada direcional

Fₓ e f_y medem a variação nas direções dos eixos. A **derivada direcional** mede a variação em **qualquer direção** dada por um vetor **unitário** u = (u₁, u₂):

```
D_u f(a, b) = lim h→0  [ f(a + h u₁, b + h u₂) − f(a, b) ] / h  =  fₓ(a, b) u₁ + f_y(a, b) u₂
```

(a fórmula do meio vale para *f* diferenciável).

## 2. Operador nabla e vetor gradiente

```
∇f = (∂f/∂x, ∂f/∂y)            em R²
∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)     em R³
D_u f = ∇f · u
```

> **Pegadinha de prova:** **u precisa ser unitário.** Se o enunciado dá v = (2, 1, 2), faça primeiro u = v/|v| = (2, 1, 2)/3.

## 3. Propriedades do gradiente

Como D_u f = ∇f · u = |∇f| cos θ (θ = ângulo entre ∇f e u):

- **Máximo crescimento:** na direção de ∇f, com taxa **|∇f|**.
- **Máximo decrescimento:** na direção de −∇f, com taxa **−|∇f|**.
- **Variação nula:** direções **perpendiculares** a ∇f (θ = 90°).
- Se ∇f = 0 no ponto, D_u f = 0 em todas as direções (candidato a extremo, aula 07).

## 4. Gradiente e plano tangente

**O gradiente é perpendicular às curvas/superfícies de nível.**

- Curva de nível f(x, y) = k: ∇f(P₀) é **normal** à curva em P₀. Tangente: ∇f · (P − P₀) = 0.
- Superfície de nível F(x, y, z) = k: ∇F(P₀) é **normal** à superfície em P₀.

```
Plano tangente:  ∇F(P₀) · (x − x₀, y − y₀, z − z₀) = 0
Reta normal:     (x, y, z) = P₀ + t ∇F(P₀)
```

Para o gráfico z = f(x, y), use F(x, y, z) = f(x, y) − z (recai na fórmula da aula 04).

---

## Exercícios

1. Calcule a derivada direcional de f(x, y, z) = x²y + xz em P(1, 2, 1) na direção de v = (2, 1, 2).
2. Em que direção f do exercício 1 cresce mais rápido em P? Qual a taxa?
3. Ache o plano tangente e a reta normal à esfera x² + y² + z² = 14 em (1, 2, 3).
4. Calcule a derivada de f(x, y) = x²y em (1, 1) na direção de (1, 1).
5. Para f(x, y) = x²y em (1, 1), ache uma direção em que a derivada direcional é nula.
6. Mostre que o gradiente de f(x, y) = x² + y² em (1, 1) é perpendicular à curva de nível que passa por esse ponto.
7. A temperatura é T(x, y) = 100 − x² − 2y². Em (1, 1), em que direção ela diminui mais rápido e qual a taxa?

Respostas: [`respostas/aula-06.md`](../respostas/aula-06.md)

---

## Resumo

- D_u f = ∇f · u, com **u unitário**.
- ∇f aponta para o maior crescimento (taxa |∇f|); −∇f, o maior decrescimento; ⟂ ∇f, variação nula.
- ∇f é normal às curvas/superfícies de nível ⟹ plano tangente e reta normal.

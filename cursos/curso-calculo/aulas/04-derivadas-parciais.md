# Aula 04 — Derivadas parciais

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 4 – Derivadas Parciais* (tópicos 4.1 a 4.4 do Guia de Estudos). Respostas: [`respostas/aula-04.md`](../respostas/aula-04.md)

## 1. Definição e interpretação geométrica

A derivada parcial mede como *f* varia quando **só uma variável muda**, mantendo as outras fixas:

```
∂f/∂x (a, b) = lim h→0  [ f(a + h, b) − f(a, b) ] / h
∂f/∂y (a, b) = lim h→0  [ f(a, b + h) − f(a, b) ] / h
```

- **Regra prática:** derive em relação a uma variável tratando as outras como **constantes**.
- Notações: fₓ, f_y, ∂f/∂x, ∂f/∂y.
- **Geometria:** fₓ(a, b) é a inclinação da reta tangente à curva obtida cortando a superfície com o plano y = b (e f_y, com o plano x = a).

Exemplo: f = x²y³ + sen(xy) ⟹ fₓ = 2xy³ + y cos(xy) e f_y = 3x²y² + x cos(xy).

## 2. Plano tangente, diferencial total e aproximação linear

Se *f* é diferenciável em (x₀, y₀), o **plano tangente** ao gráfico em (x₀, y₀, z₀) é

```
z − z₀ = fₓ(x₀, y₀)(x − x₀) + f_y(x₀, y₀)(y − y₀)
```

- **Aproximação linear:** L(x, y) = z₀ + fₓ·(x − x₀) + f_y·(y − y₀). Para (x, y) perto de (x₀, y₀), f(x, y) ≈ L(x, y).
- **Diferencial total:** `dz = fₓ dx + f_y dy`. É a variação *aproximada* de *f* para pequenos dx, dy (usado em propagação de erros).

## 3. Derivadas parciais de ordem superior

```
fₓₓ = ∂²f/∂x²,   f_yy = ∂²f/∂y²,   fₓy = ∂/∂y(∂f/∂x),   f_yx = ∂/∂x(∂f/∂y)
```

**Teorema de Schwarz (Clairaut):** se fₓy e f_yx são **contínuas** numa região, então **fₓy = f_yx** ali. Ou seja, a ordem de derivação não importa (para funções "boas").

**Equação de Laplace:** fₓₓ + f_yy = 0 (funções harmônicas, como ln(x² + y²)).

## 4. Derivadas parciais, continuidade e diferenciabilidade

*f* é **diferenciável** em (a, b) se a variação se aproxima bem pelo plano tangente:

```
f(a + h, b + k) − f(a, b) = fₓ·h + f_y·k + ε₁h + ε₂k,    com ε₁, ε₂ → 0 quando (h, k) → (0, 0)
```

Hierarquia (as setas **não** voltam):

```
fₓ e f_y contínuas  ⟹  f diferenciável  ⟹  f contínua
                       f diferenciável  ⟹  existem fₓ e f_y
```

> **Pegadinha de prova:** **existirem** fₓ e f_y num ponto **não** garante continuidade nem diferenciabilidade. Exemplo: f = xy/(x² + y²), f(0, 0) = 0. As duas parciais existem na origem (valem 0), mas *f* nem é contínua ali (o limite não existe, aula 02). Logo não é diferenciável.

---

## Exercícios

1. Calcule fₓ e f_y de f(x, y) = x²y³ + sen(xy).
2. Para a mesma função, confirme que fₓy = f_yx.
3. Ache o plano tangente a z = x² + y² em (1, 2, 5).
4. Use a aproximação linear de √(x² + y²) em (3, 4) para estimar √(3,02² + 3,96²).
5. Mostre que u = ln(x² + y²) satisfaz a equação de Laplace.
6. Seja f(x, y) = xy/(x² + y²) para (x, y) ≠ (0, 0) e f(0, 0) = 0. Existem fₓ(0, 0) e f_y(0, 0)? *f* é diferenciável em (0, 0)?
7. Calcule fₓyz de f(x, y, z) = xyz + x².
8. As dimensões de um retângulo são 10 cm e 20 cm, medidas com erro de até 0,1 cm cada. Use a diferencial para estimar o erro máximo na área.

Respostas: [`respostas/aula-04.md`](../respostas/aula-04.md)

---

## Resumo

- Parcial: derive uma variável, as outras são constantes.
- Plano tangente: z − z₀ = fₓ(x − x₀) + f_y(y − y₀); diferencial dz = fₓ dx + f_y dy.
- Schwarz: fₓy = f_yx se contínuas.
- Parciais contínuas ⟹ diferenciável ⟹ contínua. A volta é falsa; só existir parciais não basta.

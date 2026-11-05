# Aula 05 — Regra da cadeia

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 5 – Regra da Cadeia* (tópicos 5.1 a 5.3 do Guia de Estudos). Respostas: [`respostas/aula-05.md`](../respostas/aula-05.md)

## 1. Duas variáveis intermediárias, uma independente

Se z = f(x, y) com x = x(t) e y = y(t):

```
dz/dt = ∂f/∂x · dx/dt + ∂f/∂y · dy/dt
```

Aqui z depende só de t, então a derivada é **ordinária** (d), enquanto as de *f* são **parciais** (∂).

## 2. Duas intermediárias, duas independentes

Se z = f(x, y) com x = x(u, v) e y = y(u, v):

```
∂z/∂u = ∂z/∂x · ∂x/∂u + ∂z/∂y · ∂y/∂u
∂z/∂v = ∂z/∂x · ∂x/∂v + ∂z/∂y · ∂y/∂v
```

## 3. Caso geral: n intermediárias, m independentes

Use o **diagrama em árvore**:

1. Coloque *z* no topo, as intermediárias (x₁, ..., xₙ) no meio e as independentes (t₁, ..., tₘ) embaixo.
2. Para ∂z/∂tⱼ, **percorra todos os caminhos** de *z* até tⱼ.
3. Multiplique as derivadas ao longo de cada caminho e **some** os caminhos.

```
∂z/∂tⱼ = Σᵢ  ∂z/∂xᵢ · ∂xᵢ/∂tⱼ
```

## 4. Derivação implícita

Se F(x, y) = 0 define y como função de x (e F_y ≠ 0):

```
dy/dx = − Fₓ / F_y
```

Se F(x, y, z) = 0 define z = z(x, y) (e F_z ≠ 0):

```
∂z/∂x = − Fₓ / F_z        ∂z/∂y = − F_y / F_z
```

> **Pegadinha de prova:** (1) não esqueça nenhum caminho do diagrama (variável que aparece "escondida" dentro de outra); (2) o sinal de menos na derivação implícita; (3) no resultado, substitua x(t), y(t) só **no final**, se pedirem em função de t.

---

## Exercícios

1. Seja z = x²y, x = t², y = t³. Calcule dz/dt (por regra da cadeia e substituindo antes).
2. Seja w = eˣʸ, x = u + v, y = u − v. Calcule ∂w/∂u e ∂w/∂v.
3. Ache dy/dx se x³ + y³ = 6xy. Calcule o valor em (3, 3).
4. Seja z = x² + y², x = uv, y = u/v. Calcule ∂z/∂u e ∂z/∂v.
5. Ache ∂z/∂x em (1, 2, 3) se x² + y² + z² = 14.
6. Seja w = xy + yz, x = t, y = t², z = t³. Calcule dw/dt.

Respostas: [`respostas/aula-05.md`](../respostas/aula-05.md)

---

## Resumo

- Multiplique ao longo de cada caminho do diagrama em árvore e **some** os caminhos.
- d para derivada ordinária (1 independente), ∂ para parcial (várias).
- Implícita: dy/dx = −Fₓ/F_y; ∂z/∂x = −Fₓ/F_z.

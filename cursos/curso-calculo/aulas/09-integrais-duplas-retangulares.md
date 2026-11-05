# Aula 09 — Integrais duplas em coordenadas retangulares

> Base: *slides 9 – Integrais Duplas em Coord. Retangulares* (tópicos 9.1 a 9.3 do Guia de Estudos). Respostas: [`respostas/aula-09.md`](../respostas/aula-09.md)

## 1. A integral dupla (9.1)

Para f(x, y) ≥ 0 numa região plana R, divida R em *n* pedaços de área ΔAₖ e escolha um ponto (xₖ, yₖ) em cada um. O volume do sólido sob o gráfico é aproximado por colunas:

```
V ≈ Σ f(xₖ, yₖ) ΔAₖ        V = lim n→∞ Σ f(xₖ, yₖ) ΔAₖ = ∬_R f(x, y) dA
```

A integral dupla é o **limite de uma soma de Riemann**. Se f = 1, ∬_R dA = **área de R**.

## 2. Propriedades operatórias (9.2)

```
i)   ∬ a·f dA = a ∬ f dA
ii)  ∬ (f ± g) dA = ∬ f dA ± ∬ g dA
iii) ∬ (a·f ± b·g) dA = a ∬ f dA ± b ∬ g dA
iv)  ∬_R f dA = ∬_R₁ f dA + ∬_R₂ f dA     (R = R₁ ∪ R₂, sem sobreposição)
```

Também: se f ≥ g em R, então ∬ f dA ≥ ∬ g dA.

## 3. Cálculo por iteração (9.3)

### Região retangular R = [a, b] × [c, d] — Teorema de Fubini

```
∬_R f dA = ∫ de c a d ( ∫ de a a b f dx ) dy = ∫ de a a b ( ∫ de c a d f dy ) dx
```

Pode integrar em **qualquer ordem**. Integre de **dentro para fora**, tratando a outra variável como constante.

### Região não retangular

- **Tipo I** (limitada por funções de x): a ≤ x ≤ b, g₁(x) ≤ y ≤ g₂(x)

```
∬_R f dA = ∫ de a a b ∫ de g₁(x) a g₂(x) f(x, y) dy dx
```

- **Tipo II** (limitada por funções de y): c ≤ y ≤ d, h₁(y) ≤ x ≤ h₂(y)

```
∬_R f dA = ∫ de c a d ∫ de h₁(y) a h₂(y) f(x, y) dx dy
```

Roteiro:
1. **Esboce a região** e ache os cruzamentos das curvas.
2. Escolha tipo I ou II (a que gera limites mais simples e integrais mais fáceis).
3. Limites **externos = constantes**; limites **internos = funções** da variável de fora.
4. Integre de dentro para fora.

### Inversão da ordem de integração

Algumas integrais **não têm primitiva elementar** na ordem dada (ex.: e^(y²), sen x / x). Desenhe a região descrita pelos limites e **reescreva com a outra ordem**.

> **Pegadinha de prova:** ao inverter, o erro típico é copiar os limites sem desenhar. Ex.: ∫₀¹ ∫ₓ¹ ... dy dx descreve a região 0 ≤ x ≤ y ≤ 1; na outra ordem fica ∫₀¹ ∫₀^y ... dx dy.

---

## Exercícios

1. Calcule ∬_R (x² + y) dA, com R = [0, 1] × [0, 2].
2. Calcule ∬_R xy dA, onde R é a região entre y = x² e y = x.
3. Calcule ∫₀¹ ∫ₓ¹ e^(y²) dy dx (inverta a ordem).
4. Calcule o volume sob z = 4 − x − y sobre o retângulo [0, 1] × [0, 2].
5. Calcule ∬_R (x + y) dA, onde R é o triângulo x ≥ 0, y ≥ 0, x + y ≤ 2.
6. Ache a área da região entre y = x² e y = 2x.
7. Calcule ∫₀¹ ∫_y¹ (sen x / x) dx dy.

Respostas: [`respostas/aula-09.md`](../respostas/aula-09.md)

---

## Resumo

- ∬ f dA = limite de somas de Riemann; com f = 1, é a área.
- Retângulo: Fubini, qualquer ordem. Região tipo I (y entre funções de x) ou tipo II (x entre funções de y).
- Limites externos constantes; internos dependem da variável de fora.
- Inverter a ordem: **desenhe** a região antes.

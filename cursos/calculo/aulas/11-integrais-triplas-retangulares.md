# Aula 11 — Integrais triplas em coordenadas retangulares

> Base: *slides 11 – Integrais Triplas em Coord. Retangulares* (tópicos 11.1 a 11.3 do Guia de Estudos). Respostas: [`respostas/aula-11.md`](../respostas/aula-11.md)

## 1. A integral tripla (11.1)

Divida um sólido G em pedaços de volume ΔVₖ:

```
∭_G f(x, y, z) dV = lim n→∞ Σ f(xₖ, yₖ, zₖ) ΔVₖ
```

Com f = 1, ∭_G dV é o **volume de G**. Com f = densidade, é a **massa**.

## 2. Propriedades operatórias (11.2)

Iguais às da integral dupla: linearidade, aditividade em G = G₁ ∪ G₂ e monotonia.

## 3. Cálculo por iteração (11.3)

### Caixa G = [a, b] × [c, d] × [e, f] — Fubini

```
∭_G f dV = ∫ de e a f ∫ de c a d ∫ de a a b  f dx dy dz
```

Vale em **qualquer uma das 6 ordens** (dx dy dz, dx dz dy, dy dx dz, ...).

### Sólido geral

Projete G num plano coordenado, ficando com uma região R **plana** (tipo I ou II). Em cada ponto de R, a variável perdida varia entre duas superfícies.

```
Projeção no plano xy:  ∭_G f dV = ∬_R [ ∫ de g₁(x,y) a g₂(x,y) f dz ] dA        (z entre duas superfícies)
Projeção no plano xz:  ∭_G f dV = ∬_R [ ∫ de g₁(x,z) a g₂(x,z) f dy ] dA        (y entre duas superfícies)
Projeção no plano yz:  ∭_G f dV = ∬_R [ ∫ de g₁(y,z) a g₂(y,z) f dx ] dA        (x entre duas superfícies)
```

Roteiro:
1. **Esboce** G (ou ao menos suas superfícies de contorno).
2. Escolha a projeção que dê a região plana R mais simples e a variável "de dentro" com limites claros (entra na superfície inferior, sai na superior).
3. Reduza a integral dupla de R como na aula 09.
4. Integre de dentro para fora.

> **Pegadinha de prova:** a região R do plano é a **sombra** de G. Para achá-la, elimine a variável de dentro igualando as duas superfícies (ex.: x + y + z = 2 e z = 0 dá x + y = 2 na sombra no plano xy). Para o **tetraedro** x + y + z ≤ 1, a sombra no plano xy é o triângulo x, y ≥ 0, x + y ≤ 1.

---

## Exercícios

1. Calcule ∭ xyz dV na caixa [0, 1] × [0, 2] × [0, 3].
2. Calcule o volume do tetraedro limitado pelos planos coordenados e pelo plano x + y + z = 1.
3. Calcule ∭ z dV sobre o mesmo tetraedro.
4. Calcule o volume do sólido no 1º octante sob o plano z = 6 − 2x − 3y.
5. Calcule ∭ (x + y + z) dV sobre o cubo [0, 1]³.
6. Calcule ∭ y dV, onde G: 0 ≤ x ≤ 1, 0 ≤ y ≤ x, 0 ≤ z ≤ x + y.
7. (slide, ex. 1) Calcule ∭ z dV, onde G é a cunha do 1º octante seccionada do cilindro y² + z² ≤ 1 pelos planos y = x e x = 0, integrando primeiro em z.
8. (slide, ex. 5) Ache o volume da região no 1º octante delimitada pelos planos coordenados e pela superfície z = 4 − x² − y.

Respostas: [`respostas/aula-11.md`](../respostas/aula-11.md)

---

## Resumo

- ∭ f dV = limite de somas; com f = 1, volume.
- Caixa: Fubini em qualquer ordem. Sólido geral: **sombra** R no plano + variável de dentro entre duas superfícies.
- Esboce o sólido; ache a sombra igualando as superfícies.

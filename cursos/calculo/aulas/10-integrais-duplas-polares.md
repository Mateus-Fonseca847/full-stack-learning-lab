# Aula 10 — Integrais duplas em coordenadas polares

> Base: *slides 10 – Integrais Duplas em Coord. Polares* (tópicos 10.1 a 10.3 do Guia de Estudos). Respostas: [`respostas/aula-10.md`](../respostas/aula-10.md)

## 1. Revisão: sistema de coordenadas polares (10.1)

O ponto P é descrito por (r, θ): distância à origem e ângulo com o eixo x.

```
Polares → cartesianas:   x = r cos θ      y = r sen θ
Cartesianas → polares:   r = √(x² + y²)   θ = arctg(y/x)  (ajuste o quadrante)
```

Curvas polares comuns:

| Equação | Curva |
|---|---|
| r = a | circunferência de raio *a*, centro na origem |
| r = 2a cos θ | circunferência de raio *a*, centro (a, 0); θ ∈ [−π/2, π/2] |
| r = 2a sen θ | circunferência de raio *a*, centro (0, a); θ ∈ [0, π] |
| r = a(1 + cos θ) | cardioide |
| r = a sen(nθ) | rosácea (n pétalas se n ímpar; 2n se n par) |
| θ = α | reta pela origem |

## 2. Regiões planas em polares (10.2)

**Região polar simples:**

```
R = { (r, θ) | r₁(θ) ≤ r ≤ r₂(θ),  α ≤ θ ≤ β }
```

O elemento de área é um "retângulo polar" de lados dr e r dθ:

```
dA = r dr dθ
```

O fator **r** é o que corrige o fato de os pedaços ficarem mais largos longe da origem.

## 3. Integrais duplas em polares (10.3)

```
∬_R f(x, y) dA = ∫ de α a β ∫ de r₁(θ) a r₂(θ)  f(r cos θ, r sen θ) · r dr dθ
```

**Quando usar:** a região é um disco, anel, setor, ou o integrando tem x² + y² (que vira r²).

Roteiro: (1) esboce a região; (2) troque x, y por r, θ no integrando e no contorno; (3) ache os limites de θ (varrendo da origem) e de r (entrada e saída); (4) **multiplique por r**.

> **Pegadinhas de prova:**
> 1. **Esquecer o r** do dA = r dr dθ.
> 2. Limites de θ: para r = 2a cos θ, use θ ∈ [−π/2, π/2] (r ≥ 0).
> 3. **Rosácea de n ímpar** é percorrida por inteiro em θ ∈ [0, π]; integrar até 2π conta a área em dobro. Ex.: r = sen 3θ tem área π/4.

---

## Exercícios

1. Use integral dupla polar para a área do círculo de raio *a*.
2. Calcule o volume de uma esfera de raio *a*.
3. Calcule ∬_(R²) e^(−(x² + y²)) dA (integral de Gauss). O que isso diz sobre ∫ e^(−x²) dx?
4. Ache a área da cardioide r = 1 + cos θ.
5. Calcule ∬ (x² + y²) dA no disco x² + y² ≤ 4.
6. Calcule o volume sob z = 4 − x² − y² e acima do plano xy.
7. Calcule ∬ √(x² + y²) dA no semianel 1 ≤ r ≤ 2, y ≥ 0.
8. Ache a área do círculo r = 2 cos θ.
9. Ache a área da rosácea de três pétalas r = sen 3θ.

Respostas: [`respostas/aula-10.md`](../respostas/aula-10.md)

---

## Resumo

- x = r cos θ, y = r sen θ; **dA = r dr dθ**.
- Use polares para discos, anéis, setores e integrandos com x² + y².
- Cuidado com o r extra, com os limites de θ e com o período das rosáceas.

# Aula 12 — Integrais triplas em coordenadas cilíndricas e esféricas

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 12 – Integrais Triplas em Coord. Cilíndricas e Esféricas* (tópicos 12.1 a 12.3 do Guia de Estudos). Respostas: [`respostas/aula-12.md`](../respostas/aula-12.md)

## 1. Revisão dos sistemas (12.1)

### Cilíndricas (r, θ, z): polares no plano xy + z

```
x = r cos θ      y = r sen θ      z = z      r² = x² + y²
```

### Esféricas (ρ, φ, θ)

- **ρ** ≥ 0: distância à origem. 
- **φ** ∈ [0, π]: ângulo **a partir do eixo z positivo** (φ = 0 é o polo norte; φ = π/2 é o plano xy).
- **θ**: o mesmo ângulo das polares (no plano xy).

```
x = ρ sen φ cos θ      y = ρ sen φ sen θ      z = ρ cos φ      ρ² = x² + y² + z²
```

| Superfície | Cartesiana | Esférica |
|---|---|---|
| esfera de raio *a* | x² + y² + z² = a² | ρ = a |
| plano xy | z = 0 | φ = π/2 |
| cone | z = √(x² + y²) | φ = π/4 |
| cilindro de raio *a* | x² + y² = a² | ρ sen φ = a |

## 2. Elementos diferenciais de volume (12.2)

```
Cilíndricas:  dV = r dz dr dθ
Esféricas:    dV = ρ² sen φ dρ dφ dθ
```

Os fatores **r** e **ρ² sen φ** são os Jacobianos (aula 13) que corrigem a forma dos pedaços.

## 3. Integrais triplas (12.3)

```
∭ f dV = ∫∫∫ f(r cos θ, r sen θ, z) · r dz dr dθ                             (cilíndricas)
∭ f dV = ∫∫∫ f(ρ sen φ cos θ, ρ sen φ sen θ, ρ cos φ) · ρ² sen φ dρ dφ dθ     (esféricas)
```

**Quando usar:**
- **Cilíndricas:** cilindros, paraboloides z = x² + y², cones com eixo z, sombra no plano xy sendo disco/anel.
- **Esféricas:** esferas, cones junto com esferas (sorvete), integrando com x² + y² + z².

> **Pegadinhas de prova:**
> 1. **Esquecer r** (cilíndricas) ou **ρ² sen φ** (esféricas).
> 2. **φ e θ trocados:** em livros de física o ângulo φ costuma ser o azimutal. Aqui (Thomas, Anton) φ é o ângulo com o eixo z. Use a convenção do professor.
> 3. O sorvete: cone z = √(x²+y²) e esfera ρ = 2 ⟹ φ ∈ [0, π/4], ρ ∈ [0, 2], θ ∈ [0, 2π].

---

## Exercícios

1. Calcule o volume de uma esfera de raio *a* em coordenadas esféricas.
2. Calcule o volume do cone limitado por z ≥ √(x² + y²) e z ≤ 1.
3. Calcule ∭ (x² + y² + z²) dV na bola de raio *a*.
4. Calcule o volume entre o paraboloide z = x² + y² e o plano z = 4.
5. Calcule ∭ z dV no hemisfério superior de raio *a*.
6. (sorvete) Calcule o volume do sólido com z ≥ √(x² + y²) e x² + y² + z² ≤ 4.
7. Calcule ∭ (x² + y²) dV no cilindro x² + y² ≤ 4, 0 ≤ z ≤ 3.
8. Calcule o volume do que resta de uma esfera de raio 3 após um furo cilíndrico de raio 1 pelo centro (eixo z).

Respostas: [`respostas/aula-12.md`](../respostas/aula-12.md)

---

## Resumo

- Cilíndricas: x = r cos θ, y = r sen θ, z = z; **dV = r dz dr dθ**.
- Esféricas: x = ρ sen φ cos θ, y = ρ sen φ sen θ, z = ρ cos φ; **dV = ρ² sen φ dρ dφ dθ**; φ é medido do eixo z.
- Cilíndricas para eixos/paraboloides; esféricas para esferas e cones com esfera.

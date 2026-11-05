# Aula 00 — Revisão de Cálculo I: derivadas, integrais e pré-requisitos

> Base: conteúdo de Cálculo I (uma variável) que as aulas 4 a 13 supõem já sabido. Não vem dos slides do professor. Respostas: [`respostas/aula-00.md`](../respostas/aula-00.md)

**Para que serve:** quase todo erro em Cálculo a Várias Variáveis é erro de **Cálculo I**. Uma derivada parcial é uma derivada comum; uma integral dupla são duas integrais comuns em sequência. Esta aula reúne só o que o curso usa.

## Parte A — Derivadas

### 1. Regras

| Regra | Fórmula |
|---|---|
| Constante / potência | (c)′ = 0 · (xⁿ)′ = n·xⁿ⁻¹ |
| Soma e múltiplo | (f ± g)′ = f′ ± g′ · (c·f)′ = c·f′ |
| **Produto** | (f·g)′ = f′g + f·g′ |
| **Quociente** | (f/g)′ = (f′g − f·g′) / g² |
| **Cadeia** | [f(g(x))]′ = f′(g(x)) · g′(x) |

A **regra da cadeia** é a mais importante: é a base da aula 05. Derive "de fora para dentro" e multiplique pela derivada de dentro.

### 2. Tabela

| f(x) | f′(x) |
|---|---|
| sen x | cos x |
| cos x | −sen x |
| tg x | sec² x |
| eˣ | eˣ |
| aˣ | aˣ ln a |
| ln x | 1/x |
| arctg x | 1/(1 + x²) |
| arcsen x | 1/√(1 − x²) |

### 3. Interpretação e extremos (uma variável)

- f′(a) é a **inclinação** da reta tangente em x = a: y − f(a) = f′(a)(x − a).
- **Ponto crítico:** f′(x) = 0 (ou f′ não existe).
- **Teste da 2ª derivada:** f″ > 0 ⟹ mínimo local; f″ < 0 ⟹ máximo local. (A aula 07 é a versão em duas variáveis disto.)

## Parte B — Integrais

### 4. Primitivas básicas e Teorema Fundamental

| ∫ f dx | Resultado |
|---|---|
| ∫ xⁿ dx (n ≠ −1) | xⁿ⁺¹/(n + 1) + C |
| ∫ 1/x dx | ln\|x\| + C |
| ∫ eˣ dx | eˣ + C |
| ∫ sen x dx | −cos x + C |
| ∫ cos x dx | sen x + C |
| ∫ 1/(1 + x²) dx | arctg x + C |

**Teorema Fundamental:** se F′ = f, então ∫ₐᵇ f(x) dx = F(b) − F(a). Trocar os limites troca o sinal: ∫ₐᵇ = −∫ᵇₐ.

### 5. Substituição

Se aparece uma função **e a sua derivada** (a menos de constante), faça u = g(x), du = g′(x) dx. **Troque também os limites** (x → u).

Exemplo: ∫₀¹ x·eˣ² dx. Com u = x², du = 2x dx: (1/2)∫₀¹ eᵘ du = (e − 1)/2.

### 6. Integração por partes

```
∫ u dv = u·v − ∫ v du
```

Escolha u pela ordem **LIATE** (Log, Inversa trig, Algébrica, Trig, Exponencial): o primeiro da lista é o u. Exemplo: ∫ x cos x dx, com u = x, dv = cos x dx ⟹ x sen x − ∫ sen x dx = x sen x + cos x + C.

### 7. Trigonometria que aparece o tempo todo

- sen²θ + cos²θ = 1
- **sen²θ = (1 − cos 2θ)/2** e **cos²θ = (1 + cos 2θ)/2** (indispensáveis em polares, aula 10)
- ∫ cosⁿ ou senⁿ de grau **ímpar**: separe um fator e use sen² = 1 − cos² (ou o contrário) com substituição.
- Valores notáveis: sen(π/6) = 1/2, sen(π/4) = cos(π/4) = √2/2, cos(π/3) = 1/2, tg(π/3) = √3.

### 8. Integral imprópria

∫₀^∞ f dx = lim b→∞ ∫₀ᵇ f dx. Exemplo: ∫₀^∞ r·e^(−r²) dr = 1/2 (aparece na integral de Gauss, aula 10).

## Parte C — Geometria que você precisa saber desenhar

- Parábola y = x², reta y = mx + b, circunferência (x − a)² + (y − b)² = R².
- **Cruzamento de curvas:** iguale as equações e resolva (limites da aula 09).
- **Completar quadrado** para reconhecer a circunferência: x² + y² − 2x = 0 ⟹ (x − 1)² + y² = 1.
- Área entre curvas: ∫ (curva de cima − curva de baixo) dx, nos pontos de cruzamento.

> **Pegadinhas de revisão:** (1) esquecer a derivada de dentro na regra da cadeia; (2) esquecer de trocar os limites ao substituir; (3) sinal ao integrar por partes; (4) integrar sen²x como se fosse (sen x)³/3: é preciso usar a identidade do ângulo duplo.

---

## Exercícios

**Derivadas**

1. Derive x³ sen x.
2. Derive (x² + 1)/(x − 1).
3. Derive sen(x² + 1).
4. Derive ln(x² + 1).
5. Derive e^(sen x).
6. Ache e classifique os pontos críticos de f(x) = x³ − 3x.
7. Ache a reta tangente a y = x² em x = 3.

**Integrais**

8. ∫₀¹ (3x² + 2x) dx
9. ∫₀¹ x·eˣ² dx
10. ∫ x cos x dx
11. ∫₀^π sen²x dx
12. ∫₀¹ x√(1 − x²) dx
13. ∫₀^(π/2) cos³x dx
14. ∫₀^∞ r·e^(−r²) dr
15. ∫₀^π x sen x dx
16. Área entre y = x² e y = 2x.

**Geometria**

17. Ache os pontos de cruzamento de y = x² e y = 2x.
18. Reconheça a curva x² + y² − 2x = 0 (centro e raio).

Respostas: [`respostas/aula-00.md`](../respostas/aula-00.md)

---

## Resumo

- Derivada: produto, quociente e, principalmente, **cadeia**.
- Integral: TFC, **substituição** (troque os limites), **partes** (LIATE).
- **sen² e cos² = (1 ∓ cos 2θ)/2** são essenciais para polares.
- Desenhe a região e ache os cruzamentos antes de montar qualquer integral.

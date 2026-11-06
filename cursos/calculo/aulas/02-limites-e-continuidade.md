# Aula 02 — Limites e continuidade

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 2 – Limites e Continuidade de Funções a Várias Variáveis* (tópicos 2.1 a 2.3 do Guia de Estudos). Respostas: [`respostas/aula-02.md`](../respostas/aula-02.md)

## 1. A ideia

Em uma variável, x só pode se aproximar de *a* por dois lados. Em duas variáveis, (x, y) pode se aproximar de (a, b) por **infinitos caminhos** (retas, parábolas, espirais...).

> O limite **existe** apenas se *f* tende ao **mesmo valor L por todos os caminhos**.

Notação: `lim f(x, y) = L` quando (x, y) → (a, b).

## 2. Definição formal (ε–δ)

`lim f(x, y) = L` significa: para todo ε > 0 existe δ > 0 tal que

```
0 < √((x − a)² + (y − b)²) < δ   ⟹   |f(x, y) − L| < ε
```

Em palavras: dado qualquer erro ε, existe um **disco** em volta de (a, b) (sem o centro) dentro do qual *f* fica a menos de ε de L.

## 3. Propriedades operatórias

Se `lim f = L` e `lim g = M`, então:

- soma/diferença: L ± M · produto: L·M · múltiplo: c·L
- quociente: L/M, **desde que M ≠ 0**
- potência/raiz: Lⁿ, ⁿ√L (raiz par exige L ≥ 0)
- composição: se *h* é contínua de uma variável, `lim h(f) = h(L)`
- `lim x = a`, `lim y = b` e `lim c = c`

## 4. Técnicas para calcular

1. **Substituição direta** (se não der 0/0 ou indeterminação).
2. **Fatorar/simplificar.** Ex.: (x² − y²)/(x − y) = x + y.
3. **Coordenadas polares** para (0, 0): troque x = r cos θ, y = r sen θ; com r → 0⁺. Se o resultado **não depende de θ**, é o limite. Ex.: x²y/(x² + y²) = r cos²θ sen θ → 0.
4. **Confronto (sanduíche):** use |x| ≤ √(x²+y²) e |y| ≤ √(x²+y²) para limitar a expressão por algo que vai a 0.
5. **Limites notáveis** com u = x² + y²: sen u / u → 1.

## 5. Como provar que o limite NÃO existe

Ache **dois caminhos** com valores diferentes.

**Exemplo:** xy/(x² + y²) em (0, 0). Pela reta y = mx:

```
xy/(x² + y²) = m x² / (x² (1 + m²)) = m / (1 + m²)
```

depende de *m* (0 para m = 0; 1/2 para m = 1) ⟹ **não existe**.

> **Pegadinha clássica:** xy²/(x² + y⁴). Por **todas as retas** y = mx o limite dá 0. Mas pela parábola x = y² dá 1/2. **Testar só retas não prova que existe**; serve apenas para provar que *não* existe.

## 6. Continuidade

*f* é contínua em (a, b) se **as três** condições valem:

1. f(a, b) está definida;
2. lim f(x, y) existe;
3. lim f(x, y) = f(a, b).

- Polinômios são contínuos em todo R².
- Funções racionais são contínuas onde o denominador ≠ 0.
- Composição de contínuas é contínua.
- Função definida por partes: o ponto "de emenda" exige checar o limite à mão.
- **Extensão contínua:** se o limite existe mas f(a, b) é outro valor (ou não existe), redefinimos f(a, b) = L para tornar *f* contínua.

Para três variáveis, tudo vale igual, com discos trocados por bolas.

---

## Exercícios

1. Calcule lim (x, y)→(1, 2) de (x²y + 3y)/(x + y).
2. Mostre que lim (x, y)→(0, 0) de (x² − y²)/(x² + y²) não existe.
3. Calcule lim (x, y)→(0, 0) de x²y/(x² + y²).
4. Mostre que lim (x, y)→(0, 0) de xy²/(x² + y⁴) não existe.
5. Calcule lim (x, y)→(0, 0) de sen(x² + y²)/(x² + y²).
6. Calcule lim (x, y)→(1, 1) de (x² − y²)/(x − y).
7. f(x, y) = x²y/(x² + y²) para (x, y) ≠ (0, 0) e f(0, 0) = 0. *f* é contínua na origem?
8. Qual valor de *c* torna contínua f(x, y) = sen(x² + y²)/(x² + y²) para (x, y) ≠ (0, 0) e f(0, 0) = c?
9. Em que região é contínua f(x, y) = ln(x² + y² − 4)?

Respostas: [`respostas/aula-02.md`](../respostas/aula-02.md)

---

## Resumo

- Limite existe ⟺ mesmo valor por **todos** os caminhos. Dois caminhos diferentes ⟹ não existe.
- Para (0, 0): tente **polares** (resultado independente de θ) ou **confronto**.
- Retas não bastam para provar existência (xy²/(x²+y⁴)).
- Contínua em (a, b): f(a, b) definida, limite existe, e são iguais.

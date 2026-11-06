# Aula 01 — Funções a várias variáveis

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 1 – Funções a Várias Variáveis* (tópicos 1.1 a 1.6 do Guia de Estudos). Respostas: [`respostas/aula-01.md`](../respostas/aula-01.md)

## 1. Função escalar de várias variáveis

Uma função escalar de *n* variáveis leva um ponto de **Rⁿ** a **um número real**:

```
f: D ⊂ R² → R      z = f(x, y)         (duas variáveis)
f: D ⊂ R³ → R      w = f(x, y, z)      (três variáveis)
```

- **Domínio** D: conjunto dos pontos onde a fórmula faz sentido.
- **Imagem**: conjunto dos valores que *f* assume.
- O **gráfico** de z = f(x, y) é uma **superfície em R³**. Para três variáveis o gráfico viveria em R⁴, então não dá para desenhar: usamos superfícies de nível (seção 5).

## 2. Domínio de funções de duas variáveis

Regra prática: procure o que **proíbe** valores.

| Aparece na fórmula | Condição |
|---|---|
| raiz de índice par, `√g` | g ≥ 0 |
| denominador, `1/g` | g ≠ 0 |
| logaritmo, `ln g` | g > 0 |
| `arcsen g` ou `arccos g` | −1 ≤ g ≤ 1 |

Quando há várias restrições, o domínio é a **interseção** de todas.

## 3. Regiões abertas, fechadas, limitadas e ilimitadas

- **Ponto interior:** existe um disco centrado nele que cabe inteiro na região.
- **Ponto de fronteira:** todo disco centrado nele contém pontos da região **e** de fora.
- **Região aberta:** só tem pontos interiores (não inclui a fronteira). Ex.: x² + y² < 4.
- **Região fechada:** inclui toda a fronteira. Ex.: x² + y² ≤ 4.
- **Limitada:** cabe dentro de algum disco. **Ilimitada:** não cabe em nenhum.
- Uma região pode não ser aberta nem fechada (inclui parte da fronteira).

Isso importa na aula 07: o teorema de extremos absolutos exige região **fechada e limitada**.

## 4. Curvas de nível

A **curva de nível** de valor *k* é o conjunto `f(x, y) = k`, desenhado **no plano xy** (é a projeção do corte horizontal z = k do gráfico).

| f(x, y) | Curva de nível f = k |
|---|---|
| x² + y² | circunferências de raio √k (k > 0); k = 0 é só a origem |
| y − x² | parábolas y = x² + k |
| xy | hipérboles xy = k (k = 0: os dois eixos) |
| x² − y² | hipérboles; k = 0: as retas y = ±x |
| y / x | retas y = kx (sem a origem) |

O conjunto de várias curvas de nível é o **mapa de contorno**. Curvas **muito próximas** indicam superfície **íngreme**; afastadas, superfície **suave**.

## 5. Funções de três variáveis e superfícies de nível

Para w = f(x, y, z), o domínio é um sólido de R³ (mesmas regras da seção 2). Em vez de curvas, temos **superfícies de nível**: `f(x, y, z) = k`.

| f(x, y, z) | Superfície f = k |
|---|---|
| x² + y² + z² | esferas de raio √k |
| x² + y² − z | paraboloides z = x² + y² − k |
| x² + y² − z² | k > 0: hiperboloide de 1 folha · k = 0: cone · k < 0: hiperboloide de 2 folhas |

> **Pegadinha de prova:** curva de nível mora em **R²** (plano xy); superfície de nível mora em **R³**. E domínio ≠ imagem: pergunte "onde posso calcular?" para o domínio e "que valores saem?" para a imagem.

---

## Exercícios

1. Determine e esboce o domínio de f(x, y) = √(9 − x² − y²). A região é aberta, fechada, limitada?
2. Mesma pergunta para f(x, y) = ln(x − y).
3. Determine o domínio de f(x, y) = √(x² + y² − 1) / y.
4. Descreva o domínio de f(x, y, z) = √(z − x² − y²).
5. Determine o domínio de f(x, y) = arcsen(y − x).
6. Esboce as curvas de nível de f(x, y) = x² + y² para k = 0, 1, 4 e as de f(x, y) = y / x.
7. Identifique as superfícies de nível de f(x, y, z) = x² + y² − z² para k = 1, k = 0 e k = −1.
8. Classifique a região 1 < x² + y² < 4 (aberta/fechada, limitada/ilimitada).

Respostas: [`respostas/aula-01.md`](../respostas/aula-01.md)

---

## Resumo

- Domínio: raiz par ≥ 0, denominador ≠ 0, log > 0, arcsen/arccos em [−1, 1]; interseção das restrições.
- Região aberta (sem fronteira), fechada (com fronteira), limitada (cabe num disco).
- **Curva de nível** f(x, y) = k vive em R²; **superfície de nível** f(x, y, z) = k vive em R³.
- Curvas de nível próximas = terreno íngreme.

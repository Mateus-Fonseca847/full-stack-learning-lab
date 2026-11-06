# Aula 07 — Máximos e mínimos de funções a duas variáveis

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 7 – Máx. e Mín. de Funções a 2 Variáveis* (tópicos 7.1 a 7.5 do Guia de Estudos). Respostas: [`respostas/aula-07.md`](../respostas/aula-07.md)

## 1. Extremos relativos e absolutos

- **Máximo (mínimo) relativo** em (a, b): f(a, b) ≥ (≤) f(x, y) para todo (x, y) num disco em volta de (a, b).
- **Máximo (mínimo) absoluto:** vale em **todo o domínio**.

## 2. Teste da 1ª derivada: pontos críticos

Se *f* tem extremo relativo em (a, b) num ponto interior e as parciais existem, então

```
fₓ(a, b) = 0   e   f_y(a, b) = 0     (∇f = 0)
```

**Ponto crítico:** onde ∇f = 0 ou onde alguma parcial não existe. Condição **necessária**, não suficiente: pode ser máximo, mínimo ou **ponto de sela**.

## 3. Teste da 2ª derivada

No ponto crítico, calcule o discriminante (hessiano):

```
D = fₓₓ · f_yy − (fₓy)²
```

| Resultado | Conclusão |
|---|---|
| D > 0 e fₓₓ > 0 | **mínimo relativo** |
| D > 0 e fₓₓ < 0 | **máximo relativo** |
| D < 0 | **ponto de sela** |
| D = 0 | **inconclusivo** (analise de outro jeito) |

## 4. Extremos absolutos em região fechada e limitada

Se *f* é contínua numa região **fechada e limitada** R, ela tem máximo e mínimo absolutos (teorema de Weierstrass). Procedimento:

1. Ache os pontos críticos **no interior** de R e calcule *f* neles.
2. Estude a **fronteira**: parametrize cada trecho (ou substitua a equação da fronteira) e ache os extremos da função de **uma variável** resultante. Inclua os **vértices/extremos** dos trechos.
3. **Compare** todos os valores: o maior é o máximo absoluto; o menor é o mínimo absoluto.

## 5. Método dos mínimos quadrados

Dados *n* pontos (xᵢ, yᵢ), a reta y = mx + b que minimiza a soma dos quadrados dos erros S = Σ(yᵢ − mxᵢ − b)² tem (ao fazer ∂S/∂m = ∂S/∂b = 0):

```
m = (n·Σxy − Σx·Σy) / (n·Σx² − (Σx)²)        b = (Σy − m·Σx) / n
```

> **Pegadinha de prova:** no exercício de absolutos, esquecer a fronteira (ou os vértices) é o erro mais comum. Também: D = 0 não quer dizer "sela" (ex.: f = x⁴ + y⁴ na origem tem D = 0 e é mínimo).

---

## Exercícios

1. Classifique os pontos críticos de f(x, y) = x³ + y³ − 3xy.
2. Ache e classifique o ponto crítico de f(x, y) = x² + xy + y² − 3x.
3. Ache os extremos absolutos de f(x, y) = x² + y² − 2x no disco x² + y² ≤ 4.
4. Ache as dimensões de uma caixa sem tampa de volume 32 com a menor área de superfície.
5. Ajuste uma reta, por mínimos quadrados, aos pontos (0, 1), (1, 3), (2, 4), (3, 4).
6. O teste da 2ª derivada é inconclusivo para f(x, y) = x⁴ + y⁴ na origem. Descreva o que acontece.

Respostas: [`respostas/aula-07.md`](../respostas/aula-07.md)

---

## Resumo

- Ponto crítico: ∇f = 0 (ou parcial inexistente).
- D = fₓₓf_yy − fₓy²: D > 0 e fₓₓ > 0 mín; D > 0 e fₓₓ < 0 máx; D < 0 sela; D = 0 inconclusivo.
- Absolutos em região fechada e limitada: interior + fronteira + comparar.
- Mínimos quadrados: m = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²).

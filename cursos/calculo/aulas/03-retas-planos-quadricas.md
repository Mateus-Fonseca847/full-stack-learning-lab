# Aula 03 — Revisão de Geometria Analítica: retas, planos e quádricas

> Base: índice do Guia de Estudos + conhecimento geral (slides não lidos na íntegra: confira com seu caderno) — tema dos *slides 3 – Revisão GA: Equações de Retas e Planos* + *Resumo de Quádricas* (tópicos 3.1 a 3.4). Respostas: [`respostas/aula-03.md`](../respostas/aula-03.md)

## 1. Retas no R³

Uma reta fica determinada por um **ponto** P₀ = (x₀, y₀, z₀) e um **vetor diretor** v = (a, b, c).

| Forma | Equação |
|---|---|
| Vetorial paramétrica | (x, y, z) = (x₀, y₀, z₀) + t(a, b, c), t ∈ R |
| Escalares paramétricas | x = x₀ + at, y = y₀ + bt, z = z₀ + ct |
| Simétrica | (x − x₀)/a = (y − y₀)/b = (z − z₀)/c (se a, b, c ≠ 0) |

Por dois pontos P e Q: v = Q − P.

## 2. Planos

Um plano fica determinado por um ponto P₀ e um **vetor normal** n = (a, b, c):

```
n · (P − P₀) = 0   ⟹   a(x − x₀) + b(y − y₀) + c(z − z₀) = 0   ⟹   ax + by + cz = d
```

- **Por três pontos A, B, C:** n = AB × AC (produto vetorial).
- **Planos paralelos:** normais paralelas. **Perpendiculares:** n₁ · n₂ = 0.
- **Ângulo entre planos** = ângulo entre normais: cos θ = |n₁ · n₂| / (|n₁||n₂|).
- **Distância de P₁ = (x₁, y₁, z₁) ao plano ax + by + cz = d:** |ax₁ + by₁ + cz₁ − d| / |n|.
- **Interseção reta × plano:** substitua x(t), y(t), z(t) na equação do plano e resolva t.

> Por que importa: o **gradiente** (aula 06) é normal à superfície de nível, e o plano tangente (aulas 04 e 06) usa exatamente esta fórmula.

## 3. Quádricas: resumo

Forma geral: equação do 2º grau em x, y, z. Para identificar, olhe os **sinais** e os **cortes** (traços) com planos coordenados.

| Superfície | Equação (centrada na origem) | Cortes típicos |
|---|---|---|
| Elipsoide | x²/a² + y²/b² + z²/c² = 1 | elipses nos 3 planos |
| Hiperboloide de 1 folha | x²/a² + y²/b² − z²/c² = 1 | elipse (z = k), hipérboles |
| Hiperboloide de 2 folhas | −x²/a² − y²/b² + z²/c² = 1 | elipses (|z| > c), hipérboles |
| Cone elíptico | z² = x²/a² + y²/b² | elipses; retas (pela origem) |
| Paraboloide elíptico | z = x²/a² + y²/b² | elipses (z = k > 0), parábolas |
| Paraboloide hiperbólico (sela) | z = x²/a² − y²/b² | hipérboles, parábolas |
| Cilindro | falta uma variável (ex.: x² + y² = 1) | a curva se repete ao longo do eixo que falta |

Truque: **uma variável no 1º grau** ⟹ paraboloide (ou sela, se os sinais forem opostos). Todos os termos ao quadrado ⟹ elipsoide, hiperboloide ou cone (olhe o termo constante: = 1 e sinais).

---

## Exercícios

1. Escreva as formas vetorial, paramétrica e simétrica da reta que passa por P(1, 2, 3) e Q(4, 0, −1).
2. Ache o plano que passa por A(1, 0, 0), B(0, 2, 0) e C(0, 0, 3).
3. Ache o ponto onde a reta do exercício 1 fura o plano 2x + y − z = 4.
4. Qual o ângulo entre os planos x + 2y − z = 0 e 2x − y + z = 3?
5. Qual a distância de P(1, 2, 3) ao plano 2x + y − z = 4?
6. Identifique: (a) 4x² + 9y² + z² = 36 · (b) x² + y² − z² = 1 · (c) z = x² − y² · (d) z² = x² + y².

Respostas: [`respostas/aula-03.md`](../respostas/aula-03.md)

---

## Resumo

- Reta = ponto + vetor diretor; plano = ponto + vetor normal.
- Plano por 3 pontos: normal = AB × AC.
- Ângulo entre planos = ângulo entre normais; distância ponto–plano = |ax₁+by₁+cz₁−d|/|n|.
- Quádricas: identifique pelos sinais e pelos cortes; uma variável de 1º grau ⟹ paraboloide.

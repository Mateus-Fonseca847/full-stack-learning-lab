# Aula 04 — Árvores binárias de busca (ABB)

> Base: *AEDI – Árvores* (slides 52 a 66) e *Hashing* (slide 2, comparação). Respostas: [`respostas/aula-04.md`](../respostas/aula-04.md). Prática: [`praticas/arvore.c`](../praticas/arvore.c)

## 1. Definição

Uma **ABB** é uma árvore binária com a regra forçada: para **cada nó**, todas as chaves da subárvore **esquerda são menores** e todas as da **direita são maiores** que a chave do nó.

## 2. Inserção (top-down)

Sempre é possível inserir uma chave nova: desça comparando e coloque-a no ponto onde a busca falhou. A chave nova entra **sempre como folha**.

Exemplo, a **árvore dos signos**, inserindo na ordem `CAP AQU PEI ARI TOU GEM CAN LEA VIR LIB ESC SAG`:

```
                 CAP
              /       \
           AQU         PEI
              \       /    \
              ARI   GEM     TOU
                 \  /  \    /  \
                CAN ESC LEA SAG VIR
                           \
                           LIB
```

Pré-ordem: `CAP AQU ARI CAN PEI GEM ESC LEA LIB TOU SAG VIR`. Altura **5** (caminho CAP–PEI–GEM–LEA–LIB).

## 3. Convenção do nó terminal (sentinela)

Em vez de `Nulo`, as subárvores vazias apontam para um nó pré-alocado **z**. Antes de buscar, copia-se a chave procurada para z (`z.chave ← k`): o laço **sempre termina**, sem testar "p ≠ Nulo" a cada volta.

```
Busca(k, p):
    z.chave ← k; p ← T
    Enquanto (p.chave ≠ k):
        Se (k < p.chave) Então p ← p.le Senão p ← p.ld
    Se (p = z) Então p ← Nulo           // não achou
```

```
Inicialização:  Alocar(z); z.le ← z; z.ld ← z; T ← z

Inserção(k):
    z.chave ← k; p ← T; f ← T
    Enquanto (p.chave ≠ k):
        f ← p
        Se (k < p.chave) Então p ← p.le Senão p ← p.ld
    Se (p = z) Então                      // não existia
        Alocar(p); p.chave ← k; p.le ← z; p.ld ← z
        Se (T = z) Então T ← p
        Senão Se (k < f.chave) Então f.le ← p
        Senão f.ld ← p
```

`f` guarda o **pai** do ponto de inserção. Complexidade: proporcional à altura da árvore.

## 4. Propriedade fundamental e TreeSort

> O percurso **in-ordem** de uma ABB devolve as chaves **em ordem crescente**.

Isso gera um método de ordenação, o **TreeSort**: insere todas as chaves em uma ABB e faz o percurso in-ordem. Custo médio O(n log n); no pior caso (entrada já ordenada, árvore degenerada) O(n²).

## 5. Altura de uma ABB

| Caso | Altura |
|---|---|
| **Mínima** (árvore completa) | h = ⌊log₂ n⌋ + 1 = ⌈log₂(n + 1)⌉ |
| **Máxima** (árvore degenerada, "linha") | h = n |
| **Média** (Knuth, 1973) | h ≈ 1,4 · log₂ n |

O formato depende da **ordem de inserção**. Chaves que chegam quase ordenadas produzem árvores quase degeneradas e a busca perde a vantagem de O(log n).

## 6. Quantas ABBs distintas existem com n chaves

T(n) = número de ABBs distintas com n chaves:

```
T(0) = 1,  T(1) = 1,  T(2) = 2,  T(3) = 5,
T(n) = Σ T(i) · T(n−1−i),   i = 0 .. n−1
```

Ideia: fixe cada chave como **raiz**; sobram i chaves menores à esquerda e n−1−i maiores à direita, e multiplica-se o número de ABBs possíveis de cada lado. Forma fechada: **T(n) = C(2n, n)/(n + 1)**, o **número de Catalão**. Valores: 1, 1, 2, 5, 14, 42, 132, 429...

## 7. Árvore de Decisão da Pesquisa Binária (ADPB)

A pesquisa binária (P1) pode ser vista como uma ABB que mostra **quais posições** são comparadas. Para o vetor `1:B 2:D 3:H 4:K 5:M 6:P 7:R 8:T 9:V`, a raiz é o índice do meio (1 + 9)/2 = 5 → M, e assim recursivamente:

```
Constroi(e, d, p):
    Se (e > d) Então p ← Nulo
    Senão
        i ← (e + d) / 2
        Alocar(p); p.chave ← V[i]
        Constroi(e, i−1, p.le)
        Constroi(i+1, d, p.ld)
Externamente:  Constroi(1, n, T)
```

Resultado: `( M ( D ( B ) ( H ( K ) ) ) ( R ( P ) ( T ( V ) ) ) )`, altura 4. A ADPB é uma árvore **completa**: o pior caso da busca binária é h = ⌊log₂ n⌋ + 1 comparações.

## 8. Remoção (complemento, **fora dos slides**)

Os slides não tratam a remoção. Para completar: (1) folha: apenas remove; (2) nó com **um filho**: o filho ocupa o lugar do nó; (3) nó com **dois filhos**: troca-se a chave pelo **sucessor in-ordem** (menor da subárvore direita) ou pelo antecessor, e remove-se esse nó (que cai em um dos casos 1 ou 2). Confira com o Jayme/Cormen se o professor cobrar.

## 9. ABB × tabela hash

| | ABB | Hash (aulas 05 e 06) |
|---|---|---|
| Busca/inserção, caso médio | O(log n) | ≈ O(1) |
| Pior caso | O(n) (degenerada) | O(n) (todas as chaves no mesmo endereço) |
| Chaves **ordenadas** (percurso) | sim (in-ordem) | **não** |

> **Pegadinha de prova:** "ABB tem busca O(log n)" só vale **na média** (ou se balanceada). Sem balanceamento o pior caso é O(n).

---

## Exercícios

1. Monte a ABB dos signos (ordem do slide 54): desenhe, dê a altura e a pré-ordem. Quantas comparações para achar LIB?
2. Monte as ABBs para as duas ordens do slide 55 e compare as alturas:
   a) `AQU ARI CAN CAP ESC VIR TOU SAG GEM PEI LEA LIB`
   b) `AQU VIR ARI TOU CAN SAG CAP PEI LIB ESC GEM LEA`
3. Quantas ABBs distintas existem para as chaves A, B, C e D **com A na raiz**? (slide 53)
4. Calcule T(4) e T(5) pela recorrência e confira pela fórmula de Catalão.
5. Construa a ADPB do vetor `B D H K M P R T V` e diga o máximo de comparações da busca binária.
6. Ordene `M C T A E R Z` por TreeSort. Qual o pior caso do método?
7. Para n = 1000, dê as alturas mínima, máxima e média (Knuth) de uma ABB.
8. **Implemente em C** (sem olhar a prática): inserção em ABB, percurso in-ordem, altura e contagem de folhas. Confira com `praticas/arvore.c`.
9. Crie a ABB do seu MIXSTRING (slide 60, sem repetições) e confira a propriedade fundamental.

Respostas: [`respostas/aula-04.md`](../respostas/aula-04.md)

---

## Resumo

- ABB: esquerda < nó < direita; inserção sempre como **folha**.
- **In-ordem = chaves ordenadas** (base do TreeSort).
- Altura: mínima ⌊log₂ n⌋ + 1; máxima n; média ≈ 1,4 log₂ n. Depende da ordem de inserção.
- T(n) = Σ T(i)T(n−1−i) = Catalão: 1, 1, 2, 5, 14, 42...
- ADPB = ABB da pesquisa binária (completa).

# Aula 03 — Percursos em árvores binárias

> Base: *AEDI – Árvores* (slides 13 a 51). Respostas: [`respostas/aula-03.md`](../respostas/aula-03.md). Prática: [`praticas/arvore.c`](../praticas/arvore.c)

Um **percurso** é uma forma sistemática de **visitar todos os nós** exatamente uma vez. Todos os percursos abaixo custam **O(n)**.

Árvore usada nos exemplos (a da expressão `(A − B) * C + D / E`):

```
          +
        /   \
       *     /
      / \   / \
     -   C D   E
    / \
   A   B
```

## 1. Resumo das quatro ordens

| Percurso | Ordem | Estrutura auxiliar (iterativo) | Resultado na árvore acima |
|---|---|---|---|
| **Em níveis** | nível por nível, da esquerda para a direita | **fila** | `+ * / - C D E A B` |
| **Pré-ordem** | Raiz, Esquerda, Direita (**RED**) | **pilha** | `+ * - A B C / D E` |
| **In-ordem** (simétrica) | Esquerda, Raiz, Direita (**ERD**) | **pilha** | `A - B * C + D / E` |
| **Pós-ordem** | Esquerda, Direita, Raiz (**EDR**) | **pilha** (com "vez") | `A B - C * D E / + ` |

Dica: a pós-ordem de uma árvore de expressão é a **notação polonesa reversa (RPN)**; a in-ordem é a notação usual (sem parênteses); a pré-ordem é a notação polonesa.

## 2. Em níveis (fila)

```
Percurso_nivel:
    Esvazia Q; Enfila(T)
    Enquanto (fila não vazia):
        p ← Desenfila(); Visita(p)
        Enfila(p.le); Enfila(p.ld)       // (só se não forem nulos)
```

Situação da fila (início → fim), a cada passo:

| Passo | Fila antes de retirar | Visita |
|---|---|---|
| 1 | `+` | + |
| 2 | `* /` | * |
| 3 | `/ - C` | / |
| 4 | `- C D E` | - |
| 5 | `C D E A B` | C |
| 6 | `D E A B` | D |
| 7 | `E A B` | E |
| 8 | `A B` | A |
| 9 | `B` | B |

## 3. Pré-ordem (pilha)

Como a pilha devolve o último que entrou, **empilha-se primeiro a direita e depois a esquerda**, para que a esquerda saia antes.

```
Pré-Ordem:
    Esvazia P; PUSH(T)
    Enquanto (pilha não vazia):
        p ← POP(); Visita(p)
        PUSH(p.ld); PUSH(p.le)
```

Pilha (base → topo) antes de cada POP:

| Pilha | Visita |
|---|---|
| `+` | + |
| `/ *` | * |
| `/ C -` | - |
| `/ C B A` | A |
| `/ C B` | B |
| `/ C` | C |
| `/` | / |
| `E D` | D |
| `E` | E |

## 4. In-ordem (pilha)

Desce sempre pela esquerda empilhando; ao não ter mais esquerda, desempilha, visita e vai para a direita.

```
In-Ordem:
    Esvazia S; p ← T
    Enquanto (p ≠ Nulo) Ou (pilha não vazia):
        Enquanto (p ≠ Nulo): PUSH(p); p ← p.le
        p ← POP(); Visita(p); p ← p.ld
```

Sequência das operações na árvore acima:

`push + * - A` → **visita A** → **visita -** → `push B` → **visita B** → **visita ***  → `push C` → **visita C** → **visita +** → `push / D` → **visita D** → **visita /** → `push E` → **visita E**.

## 5. Pós-ordem (pilha com "vez")

Cada nó entra na pilha com um marcador: **vez 1** (acabou de descer: ainda falta ir à direita) e **vez 2** (volta da direita: já pode ser visitado).

```
Pós-Ordem:
    Esvazia S; p ← T
    Enquanto (p ≠ Nulo) Ou (pilha não vazia):
        Enquanto (p ≠ Nulo): PUSH(p, 1); p ← p.le
        Enquanto (p = Nulo) E (pilha não vazia):
            (p, vez) ← POP()
            Se (vez = 1) E (p.ld ≠ Nulo) Então
                PUSH(p, 2); p ← p.ld
            Senão
                Visita(p); p ← Nulo
```

Começo da simulação na árvore acima (pilha base → topo):

| Ação | Pilha |
|---|---|
| desce pela esquerda | `(+,1) (*,1) (-,1) (A,1)` |
| POP A (vez 1, sem direita) → **visita A** | `(+,1) (*,1) (-,1)` |
| POP - (vez 1, tem direita) → `PUSH(-,2)`, vai a B | `(+,1) (*,1) (-,2)` |
| PUSH (B,1); POP B → **visita B** | `(+,1) (*,1) (-,2)` |
| POP (-,2) → **visita -** | `(+,1) (*,1)` |
| POP * (vez 1) → `PUSH(*,2)`, vai a C; **visita C**; POP (*,2) → **visita *** | `(+,1)` |
| POP + (vez 1) → `PUSH(+,2)`, vai a /; desce D; **visita D**; ... **visita E**, **visita /**, **visita +** | vazia |

## 6. Versões recursivas (muito mais curtas)

O "problema infantil" é visitar uma árvore **nula**: não se faz nada.

```
Pré-Ordem(p):                In-Ordem(p):                Pós-Ordem(p):
  Se (p ≠ Nulo):               Se (p ≠ Nulo):               Se (p ≠ Nulo):
    Visita(p)                    In-Ordem(p.le)               Pós-Ordem(p.le)
    Pré-Ordem(p.le)              Visita(p)                    Pós-Ordem(p.ld)
    Pré-Ordem(p.ld)              In-Ordem(p.ld)               Visita(p)
```

Chamada externa: `Pré-Ordem(T)`. A única diferença entre as três é **onde está o Visita**: antes, no meio ou depois das duas chamadas. A pilha das versões iterativas é a pilha de recursão feita à mão.

> **Pegadinhas de prova:**
> 1. Na versão iterativa da pré-ordem, empilha-se a **direita primeiro**.
> 2. Em um desenho de pilha ou fila, anote **antes de retirar** (é o que o professor pede: "mostrar a situação da pilha/fila").
> 3. Uma sequência de **uma só ordem** (ex.: só pré) **não** determina a árvore; pré + in, ou pós + in, determinam.

---

## Exercícios

1. Para a árvore de expressão desta aula, mostre a situação da **pilha** na pré-ordem e a da **fila** no percurso em níveis (slides 21, 28), e escreva as quatro sequências.
2. Reconstrua a árvore cujo percurso em **pré-ordem** é `A B D E C F` e em **in-ordem** é `D B E A F C`. Qual é a pós-ordem?
3. A pós-ordem é `D E B F C A` e a in-ordem é `D B E A F C`. Reconstrua a árvore.
4. Escreva funções recursivas que **contem os nós** e que calculem a **altura** de uma árvore binária.
5. Com A = 5, B = 3, C = 2, D = 8 e E = 4, calcule o valor da expressão da árvore usando a **pós-ordem** como RPN (aula de pilhas da P1).
6. Qual percurso entrega as chaves de uma **ABB** em ordem crescente? (aula 04)

Respostas: [`respostas/aula-03.md`](../respostas/aula-03.md)

---

## Resumo

- Quatro percursos, todos O(n): **níveis (fila)**, **pré RED**, **in ERD**, **pós EDR** (pilha).
- Pré iterativo: empilha **direita** e depois esquerda.
- Recursivos: mesma estrutura, só muda a posição do `Visita`.
- Árvore de expressão: pós-ordem = RPN; in-ordem = notação usual.
- Pré + in (ou pós + in) reconstroem a árvore única.

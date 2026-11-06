# Aula 02 — Árvores binárias: tipos, propriedades e representação

> Base: *AEDI – Árvores* (slides 7 a 12 e 22). Respostas: [`respostas/aula-02.md`](../respostas/aula-02.md)

## 1. Definição

Uma **árvore binária** T é:

- vazia, ou
- uma raiz r com duas subárvores, a **esquerda (Te)** e a **direita (Td)**, cada uma delas uma árvore binária.

A posição importa: uma subárvore à esquerda e uma à direita são coisas diferentes (um nó com só um filho à esquerda ≠ um nó com só um filho à direita).

## 2. Tipos (terminologia do professor)

| Tipo | Condição |
|---|---|
| **Estritamente binária** | todo nó tem **0 ou 2** filhos |
| **Completa** | as subárvores nulas estão **todas nos dois últimos níveis** |
| **Cheia** | as subárvores nulas estão **todas no último nível** (todos os níveis estão lotados) |

A **árvore de uma expressão aritmética** é estritamente binária: operandos nas folhas e operadores nos nós internos. Exemplo: `(A − B) * C + D / E`

```
          +
        /   \
       *     /
      / \   / \
     -   C D   E
    / \
   A   B
```

## 3. Propriedades

1. Uma árvore binária com **n nós** tem **n + 1 subárvores nulas** (links nulos).
   *Por quê?* São 2n links no total e n − 1 deles apontam para nós (um por nó, exceto a raiz): 2n − (n − 1) = n + 1.
2. Estritamente binária com **L folhas** tem **2L − 1** nós (L folhas e L − 1 internos).
3. **Altura de uma árvore binária completa com n nós:**

```
2^(h-1) ≤ n ≤ 2^h − 1      ⟹      h = ⌊log₂ n⌋ + 1 = ⌈log₂(n + 1)⌉
```

4. **Altura de uma binária qualquer com n nós:** `⌊log₂ n⌋ + 1 ≤ h ≤ n`. O mínimo ocorre na completa; o máximo na **degenerada** (cada nó com um só filho, uma "lista").
5. Uma árvore **cheia** de altura h tem **2^h − 1** nós.

> **Pegadinha de prova:** como a altura é contada em níveis (raiz = 1), uma árvore binária com 1 nó tem h = 1, com 3 nós completos tem h = 2, com 7 nós, h = 3.

## 4. Representação computacional

Cada nó guarda a chave e dois ponteiros (le, ld):

```
Tipo Arv = No;
     No  = Registro  chave: char;  le, ld: Arv  Fim;
```

Em C:

```c
typedef struct no *Arv;
struct no { char chave; Arv le, ld; };
```

Subárvore vazia = `NULL`.

## 5. Construção de uma árvore cheia de altura h (slide 22)

Usa uma **fila**: enfileira a raiz; a cada nó retirado, cria dois filhos (rótulos i + 1 e i + 2), liga-os e enfileira os filhos enquanto i ≤ n = 2^(h−1) − 1.

```
Constroi(h):
    Esvazia a fila; Alocar(T); Enfila(T); n ← 2^(h−1) − 1
    T.c ← 1; T.le ← Nil; T.ld ← Nil; i ← 1
    Enquanto (fila não vazia):
        p ← Desenfila()
        Alocar(q); q.c ← i+1; q.le ← Nil; q.ld ← Nil
        Alocar(r); r.c ← i+2; r.le ← Nil; r.ld ← Nil
        p.le ← q; p.ld ← r; i ← i+2
        Se (i ≤ n) Então Enfila(q); Enfila(r)
```

Os rótulos saem **por níveis** (1; 2, 3; 4, 5, 6, 7; ...), como num vetor heap.

---

## Exercícios

1. Quantos **formatos** de árvores binárias existem com 3 nós? E quantas árvores distintas usando as chaves A, B e C (cada chave num nó)? (slide 9)
2. Desenhe uma árvore **estritamente binária com 11 nós e altura 5**. (slide 9)
3. Uma árvore binária tem 7 nós. Quantos links nulos? Uma estritamente binária tem 11 nós: quantas folhas e quantos nós internos?
4. Para n = 20 nós, quais as alturas mínima e máxima de uma árvore binária?
5. Quantos nós tem uma árvore cheia de altura 4? Quantos links nulos? E a altura de uma árvore completa com 10 nós?
6. Desenhe a árvore de `(A − B) * C + D / E` e confirme que é estritamente binária.

Respostas: [`respostas/aula-02.md`](../respostas/aula-02.md)

---

## Resumo

- Binária: raiz + Te + Td (a posição importa). Tipos: **estritamente** (0 ou 2 filhos), **completa**, **cheia**.
- n nós ⟹ **n + 1** links nulos; estritamente binária com L folhas ⟹ 2L − 1 nós.
- Altura: ⌊log₂ n⌋ + 1 ≤ h ≤ n (completa = mínimo; degenerada = máximo).
- Representação: registro com chave, le, ld.

# Aula 01 — Árvores: conceitos e representações

> Base: *AEDI – Árvores* (slides 2 a 6, prof. André Monteiro, 2026/2). Respostas: [`respostas/aula-01.md`](../respostas/aula-01.md)

## 1. Para que servem

Árvores representam estruturas **hierarquizadas** (sistemas de arquivos, organogramas, expressões, índices de bancos de dados). Vetores e listas são lineares; a árvore ramifica.

## 2. Definição (recursiva)

Uma **árvore enraizada** T é um conjunto finito de nós tal que:

- T é **vazio**, ou
- existe um nó **r (raiz)** e os demais nós se dividem em m ≥ 1 conjuntos disjuntos não vazios, as **subárvores de r**, e cada um desses conjuntos é, por sua vez, uma árvore.

A definição se repete dentro dela mesma. É por isso que quase todo algoritmo em árvore é naturalmente **recursivo** (aula 03).

## 3. Quatro representações

Para a árvore em que A é pai de C, B e E, e C é pai de D:

| Representação | Como fica |
|---|---|
| **a) Diagrama de inclusão** | retângulos dentro de retângulos (os filhos ficam dentro do pai) |
| **b) Hierárquica** | o desenho usual: raiz no topo, filhos abaixo, ligados por linhas |
| **c) Diagrama de barras** | uma barra por nó; barra de filho mais curta e recuada em relação à do pai |
| **d) Parênteses aninhados** | `( A ( C ( D ) ) ( B ) ( E ) )` |

A forma de parênteses é a mais fácil de escrever em prova e de digitar em código.

## 4. Vocabulário

Usando a árvore acima:

| Termo | Exemplo |
|---|---|
| **Pai / filho** | A é pai de C, B e E; D é filho de C |
| **Irmãos** | B, C e E (mesmo pai) |
| **Avô / neto** | A é avô de D |
| **Tio / sobrinho** | B (e E) é tio de D; D é sobrinho de E |
| **Folha** | nó sem filhos: D, B, E |
| **Nó intermediário (interno)** | nó com filhos que não é a raiz: C |
| **Nível** | a raiz está no nível 1; filhos de nível k estão no nível k + 1. D está no nível 3 |
| **Altura** da árvore | maior nível. Aqui, **3** |
| **Comprimento do caminho** | número de **arestas**. Entre A e D, 2; entre D e E, 3 (D–C–A–E) |
| **Floresta** | conjunto de árvores (o que sobra ao remover a raiz) |

> **Pegadinha de prova:** a convenção do professor é **raiz = nível 1** e altura = maior nível (árvore de um nó só tem altura 1). Em vários livros a raiz é o nível 0. Use sempre a do professor.

**Fato útil:** uma árvore com n nós tem **n − 1 arestas** (cada nó, exceto a raiz, tem exatamente uma aresta ligando-o ao pai). E entre dois nós quaisquer existe **um único caminho**.

---

## Exercícios

1. Para a árvore `( A ( B ( D ) ( E ) ) ( C ( F ) ) )`, identifique: raiz, folhas, nós intermediários, altura, nível de E, pai de F e o comprimento do caminho entre D e F.
2. Escreva em parênteses aninhados a árvore com raiz R, cujos filhos são S e V, sendo T e U filhos de S.
3. Se removermos a raiz da árvore do exercício 1, que floresta sobra?
4. Explique por que uma árvore com n nós tem n − 1 arestas.
5. Na árvore do slide (A pai de C, B e E; C pai de D), diga quem é tio de D, avô de D e irmão de C.

Respostas: [`respostas/aula-01.md`](../respostas/aula-01.md)

---

## Resumo

- Árvore = vazia ou raiz + subárvores (definição **recursiva**).
- Quatro representações: inclusão, hierárquica, barras, **parênteses aninhados**.
- Raiz no **nível 1**; altura = maior nível; comprimento do caminho = nº de arestas.
- n nós ⟹ n − 1 arestas; caminho entre dois nós é único.

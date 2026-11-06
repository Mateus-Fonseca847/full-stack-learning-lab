# Revisão da P1 de AEDS (apoio ao `curso-basico.md`)

A P1 cobre os 7 blocos do [`curso-basico.md`](../curso-basico.md): ordenação e complexidade, pesquisa em vetores, merge, filas e pilhas, e listas encadeadas (1 a 3). Esta folha **não repete** o guia: ela diz **o que reler** e traz um mini-simulado com gabarito, para a revisão antes da P2. Se a P2 for cumulativa, vale tratar a P1 como pré-requisito (a aula 03 usa filas e pilhas; a aula 04 usa busca binária; as aulas 05 e 06 usam listas).

## O que reler, em ordem de prioridade

| # | Bloco | Onde (no `curso-basico.md`) | Por que importa na P2 |
|---|---|---|---|
| 1 | Filas e pilhas | Parte 4 | percursos em níveis (fila) e pré/in/pós (pilha) |
| 2 | Listas encadeadas | Partes 5 a 7 | encadeamento exterior e interior no hashing |
| 3 | Pesquisa em vetores | Parte 2 | ADPB e comparação ABB × busca binária |
| 4 | Ordenação e complexidade | Parte 1 | TreeSort e análise O(·) |
| 5 | Merge | Parte 3 | menos ligado à P2; revise só a diferença de conjuntos |

## Tabelas para decorar

| Algoritmo | Pior caso | Melhor caso | Estável? |
|---|---|---|---|
| Seleção | O(n²) | O(n²) | não |
| Inserção | O(n²) | O(n) | sim |
| Bubblesort | O(n²) | O(n) (com flag) | sim |
| Busca sequencial | O(n) | O(1) | n/a |
| Busca binária | O(log n) | O(1) | n/a (vetor ordenado) |

## Mini-simulado (resolva no papel, depois confira)

1. Para a string `EXEMPLO`, quantas comparações fazem a **seleção** e a **inserção** (contando só comparações entre elementos)? Qual o vetor final?
2. Busca binária em vetor ordenado de 15 posições: máximo de comparações? E na busca sequencial?
3. Calcule em RPN: `5 9 + 2 * 6 5 * +`.
4. Converta `( ( 3 + 4 ) * ( 5 - 2 ) )` para RPN usando a pilha (regra: número → saída; `(` ignora; operador → empilha; `)` → desempilha um operador para a saída). Calcule o valor.
5. Faça V1 − V2 por merge, com V1 = `1 3 5 7 9 11` e V2 = `3 4 7 8 11`.
6. Fila circular de 5 posições (índices f e r, `f = 0` vazia). Enfila A, B, C, D, E, F; desenfila duas vezes; enfila F. Mostre o resultado de cada operação e o estado final.
7. Lista ordenada `2 → 5 → 9` com nó cabeça. Insira 7: quem é `ant` e quais ponteiros mudam, em que ordem?
8. Cite as 3 formas de inverter uma lista encadeada e a mais eficiente.
9. Defina formalmente f(n) = O(g(n)).

## Gabarito

1. **Seleção: 21** comparações (sempre n(n−1)/2 = 21 para n = 7). **Inserção: 14** (depende da entrada). Vetor final: `E E L M O P X`.
2. Binária: ⌊log₂ 15⌋ + 1 = **4**. Sequencial: **15**.
3. `5 9 +` = 14; `14 2 *` = 28; `6 5 *` = 30; `28 30 +` = **58**.
4. Saída: `3 4 + 5 2 - *`. Valor: 7 · 3 = **21**.
5. **V1 − V2 = 1 5 9**. (3, 7 e 11 estão nos dois, não entram; 1, 5 e 9 só em V1.)
6. Enfila A, B, C, D, E: todos aceitos (f = 1, r = 5). Enfila F: prov = (5 mod 5) + 1 = 1 = f ⟹ **fila cheia**, F recusado. Desenfila → A; desenfila → B (f = 3). Enfila F: prov = 1 ≠ f ⟹ aceito em V[1]. Estado final: f = 3, r = 1, vetor `F B C D E` (posições 1 a 5; B e A já saíram e F ocupa o lugar de A).
7. `ant` = nó 5 (o último com chave < 7). Cria o novo nó p com chave 7; **primeiro** `p.prox ← ant.prox` (p aponta para 9), **depois** `ant.prox ← p`. Se fizer na ordem inversa, perde o acesso ao 9.
8. (1) só mexendo nos links; (2) empilhando os valores; (3) empilhando os nós. A mais eficiente: **(1)**, O(n) sem pilha extra.
9. f(n) = O(g(n)) se existem c > 0 e n₀ > 0 tais que **n > n₀ ⟹ f(n) ≤ c · g(n)** (g é limite superior assintótico).

# AEDS — P2: Árvores e Hashing

Complemento do [`curso-basico.md`](../curso-basico.md) (que cobre a P1: ordenação, pesquisa, merge, filas, pilhas e listas). Este curso cobre o que vem depois nos slides do professor André Monteiro (turma 2026/2, GCOM1305PE): **árvores** e **hashing**. O material foi criado com a ajuda de inteligência artificial (IA), que gerou as aulas, as listas de exercícios e os gabaritos, e serve como registro do meu processo de estudo.

## O que o curso cobre

São **6 aulas**, cada uma com teoria, exemplos, exercícios e resumo. Os gabaritos estão em `respostas/`.

| # | Aula | Base (slides) | Exercícios |
|---|------|---------------|-----------|
| 1 | [Árvores: conceitos e representações](aulas/01-arvores-conceitos.md) | Árvores, 2 a 6 | 5 · [respostas](respostas/aula-01.md) |
| 2 | [Árvores binárias: tipos e propriedades](aulas/02-arvores-binarias.md) | Árvores, 7 a 12 e 22 | 6 · [respostas](respostas/aula-02.md) |
| 3 | [Percursos: níveis, pré, in e pós-ordem](aulas/03-percursos.md) | Árvores, 13 a 51 | 6 · [respostas](respostas/aula-03.md) |
| 4 | [Árvores binárias de busca (ABB)](aulas/04-arvores-binarias-de-busca.md) | Árvores, 52 a 66 | 9 · [respostas](respostas/aula-04.md) |
| 5 | [Hashing: função hash e sinônimos](aulas/05-hashing-funcao-e-sinonimos.md) | Hashing, 2 a 9 | 5 · [respostas](respostas/aula-05.md) |
| 6 | [Hashing: tratamento de sinônimos e análise](aulas/06-hashing-tratamento-de-sinonimos.md) | Hashing, 10 a 29 | 8 · [respostas](respostas/aula-06.md) |

Além disso: [`revisao-p1.md`](revisao-p1.md) (o que reler da P1, com mini-simulado) e [`plano-p2-aeds.md`](plano-p2-aeds.md) (roteiro dia a dia até a prova de 25/11).

> **Aviso sobre a escolha do conteúdo.** Considerei a P2 como **Árvores + Hashing**, por serem os dois conjuntos de slides que não estão no `curso-basico.md`. Os slides têm 67 e 30 páginas; as animações repetidas foram agrupadas. Confira com a lista de conteúdo da prova do professor. O livro **Jayme** (Estruturas de Dados e seus Algoritmos) e o **Cormen** são as referências citadas nos slides; a **remoção em ABB** (aula 04, seção 8) **não está nos slides**: é complemento.

## Estrutura

- `aulas/`: o conteúdo de cada aula em Markdown
- `respostas/`: gabaritos, com os passos
- `praticas/`: `arvore.c` e `hash.c`, programas em C (sem bibliotecas externas)

## Como usar

1. Leia a aula, na ordem. Cada uma termina com um **Resumo**.
2. Resolva os exercícios **no papel**, antes de abrir `respostas/`. Em prova, os percursos e as tabelas hash são feitos à mão.
3. Compile e rode os exemplos em C:

```bash
cd praticas
gcc arvore.c -o arvore -Wall && ./arvore     # ABB, percursos, ADPB, Catalão
gcc hash.c   -o hash   -Wall && ./hash       # os 3 tratamentos de sinônimos
```

4. Para o exercício de implementação de cada aula, escreva o seu código **antes** de olhar `praticas/`.

## Pontos em que os slides destoam ou são ambíguos

| Onde | O que os slides dizem | Observação |
|---|---|---|
| Aula 05 (multiplicação) | tabela mostra h(9) = 440 | o cálculo dá **470** (os outros 9 valores batem) |
| Aula 06 (exterior) | NC escrito como `N(1 + α/2)` | o gráfico mostra de 1 a 1,5: é **1 + α/2** |
| Aula 06 (interior) | pseudocódigo da Busca deixa `ant` um passo atrás | para ligar ao fim da cadeia, `ant` é o **último nó**; reproduz a tabela do slide 19 |
| Aula 06 (aberto) | "NC = 4 para α = 0,75" | coincide com 1/(1 − α); as fórmulas clássicas da sondagem linear são outras (citadas na aula) |
| Aula 03 | pós-ordem iterativa usa pilha de pares (p, vez) | não é a única forma, mas é a do professor |
| Aula 02 | "completa" e "cheia" | definições do professor; em outros livros "completa" tem outro sentido |

## Checklist do que você aprendeu

- [ ] Defino árvore e uso nível, altura, pai, tio e floresta com a convenção raiz = nível 1
- [ ] Escrevo uma árvore em parênteses aninhados
- [ ] Reconheço árvores estritamente binárias, completas e cheias e uso n + 1 links nulos
- [ ] Calculo alturas mínima e máxima para n nós
- [ ] Faço os 4 percursos à mão, mostrando fila e pilha
- [ ] Escrevo os percursos recursivos e os iterativos
- [ ] Reconstruo uma árvore a partir de pré + in (ou pós + in)
- [ ] Insiro e busco em ABB e conto comparações
- [ ] Explico por que a in-ordem de uma ABB é ordenada (TreeSort)
- [ ] Conto ABBs distintas (Catalão) e construo a ADPB
- [ ] Explico por que h injetora é rara e o que são sinônimos
- [ ] Calculo h(k) pelo resto e pela multiplicação
- [ ] Monto tabelas de encadeamento exterior, interior e endereçamento aberto
- [ ] Calculo NC e comparo os três métodos em função do fator de carga
- [ ] Revisei a P1 (filas, pilhas, listas, busca, ordenação)

Marque no VS Code trocando `[ ]` por `[x]`.

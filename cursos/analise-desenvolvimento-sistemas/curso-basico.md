# Guia de Estudos – AEDI (Algoritmos e Estruturas de Dados I)

2026-09-22 · @Someone

Guia baseado nos slides e nos exercícios postados pelo professor André Monteiro (turma 2026/2, GCOM1305PE), cobrindo as 7 partes da matéria: Ordenação/Complexidade, Pesquisa em Vetores, Merge de Vetores, Filas/Pilhas e Listas Encadeadas (1 a 3).

## Visão geral — os 7 blocos da matéria

| # | Tópico | O que o professor cobrou para implementar em C |
| --- | --- | --- |
| 1 | Ordenação e Complexidade | Inserção, Seleção e Bubblesort em vetor de 15 chars; contar comparações |
| 2 | Pesquisa em Vetores | Busca sequencial e busca binária em vetor de 15 ints (existente e inexistente), 10 rodadas |
| 3 | Merge de Vetores | Diferença de conjuntos ordenados V3 = V1 − V2 |
| 4 | Filas e Pilhas | Fila circular e pilha em vetor de 10 posições, com checagem de cheio/vazio |
| 5 | Listas Encadeadas 1/3 | Criar lista de N nós (N e valores lidos do usuário) e imprimir |
| 6 | Listas Encadeadas 2/3 | Inserção ordenada em lista encadeada |
| 7 | Listas Encadeadas 3/3 | Continuação de inserção ordenada + pilha/fila/lista circular/dupla como lista encadeada |

Livros de referência usados nos slides: **Jayme** (Toshimitsu Toscano Kubo / Jayme Szwarcfiter — Estruturas de Dados) e **Cormen** (Introduction to Algorithms — só a partir da Parte 1 até listas, seção 10.x).

Como usar este guia: cada seção abaixo tem (a) a ideia e o pseudocódigo exatamente como o professor apresentou, (b) a complexidade/observações importantes para a prova teórica, e (c) o exercício de implementação correspondente, que você vai resolver no VSCode usando os arquivos `.c` que vou te entregar separadamente (esqueletos com `TODO`, não a solução pronta — o objetivo é você praticar).

## Parte 1 — Ordenação e Complexidade de Algoritmos

### Seleção

Ideia: em cada um dos n−1 passos, escolhe o **menor elemento ainda não escolhido** e o troca de posição com o início da parte não ordenada.

```
Para i de 1 a (n-1):
    m ← i
    Para j de (i+1) a n:
        Se (V[j] < V[m]) Então m ← j
    Fp
    troca(V[i], V[m])
Fp
```

### Inserção

Ideia: em cada passo, insere um novo elemento no lugar certo de um subconjunto já ordenado (como organizar cartas na mão).

```
Para i de 2 a n:
    j ← i; t ← V[i]
    Enquanto (V[j-1] > t):
        V[j] ← V[j-1]; j ← j-1
    Fe
    V[j] ← t
Fp
```

### Bubblesort (pedido no exercício, não está nos slides do prof. mas cai na implementação)

Ideia: percorre o vetor repetidas vezes trocando pares adjacentes fora de ordem, "borbulhando" o maior elemento até o fim a cada passada.

```
Para i de 1 a (n-1):
    Para j de 1 a (n-i):
        Se (V[j] > V[j+1]) Então troca(V[j], V[j+1])
    Fp
Fp
```

### Complexidade — tabela que a prova costuma cobrar

| Algoritmo | Pior caso | Melhor caso | Estável? | Memória extra |
| --- | --- | --- | --- | --- |
| Seleção | O(n²) | O(n²) | Não | Nenhuma |
| Inserção | O(n²) | O(n) (vetor quase ordenado) | Sim | Nenhuma |
| Bubblesort | O(n²) | O(n) (com flag de parada antecipada) | Sim | Nenhuma |

**Análise assintótica (definição cobrada em prova):** f é O(g) se existem c, n₀ > 0 tais que n > n₀ ⟹ f(n) ≤ c·g(n). Ou seja, O(g) é um **limite superior** para o crescimento de f.

**Como a complexidade é medida na prática:** conta-se o número de execuções da instrução mais executada (em ordenação/busca, o número de **comparações**), e expressa-se o resultado em ordem de grandeza (O grande), não em tempo exato.

Exercício de implementação (Parte 1): vetor de **caracteres**, 15 posições, valores inseridos pelo usuário. Rodar inserção, seleção e bubblesort, imprimindo o vetor inicial e o parcialmente ordenado ao final de cada passo externo do laço → arquivo `01_ordenacao/exercicio_ordenacao.c`.

**Pegadinha clássica de prova:** simular manualmente Seleção e Inserção passo a passo sobre uma palavra/string curta (ex: EXEMPLO) e contar comparações — pratique isso à mão, não só no código.

## Parte 2 — Pesquisa em Vetores

### Busca sequencial

Percorre o vetor do início ao fim comparando cada posição com a chave procurada. Funciona em vetor ordenado ou não.

```
Busca_seq(V, n, k):
    i ← 1
    Enquanto (i ≤ n) e (V[i] ≠ k):
        i ← i+1
    Fe
    Se (i ≤ n) Então retorna i
    Senão retorna "não encontrado"
```

Complexidade: pior caso O(n) (elemento no fim ou ausente); melhor caso O(1).

### Busca binária (requer vetor ordenado)

Compara a chave com o elemento do meio; descarta metade do vetor a cada passo.

```
Busca_bin(V, n, k):
    esq ← 1; dir ← n
    Enquanto (esq ≤ dir):
        m ← (esq+dir) div 2
        Se (V[m] = k) Então retorna m
        Senão Se (V[m] < k) Então esq ← m+1
        Senão dir ← m-1
    Fe
    retorna "não encontrado"
```

Complexidade: pior caso **O(log n)**, pois a cada comparação o espaço de busca é dividido por 2. É por isso que ela é tão mais rápida que a sequencial em vetores grandes (ver tabela de ordens de grandeza na Parte 1: para n = 100.000, log n ≈ 17 comparações contra até 100.000 na sequencial).

|  | Busca Sequencial | Busca Binária |
| --- | --- | --- |
| Pré-requisito | Nenhum | Vetor ordenado |
| Pior caso | O(n) | O(log n) |
| Melhor caso | O(1) | O(1) |

Exercício de implementação (Parte 2): vetor de **15 inteiros**, aleatório, sem repetição, não ordenado.

1. Busca sequencial de um valor **existente**, contando comparações.
2. Busca sequencial de um valor **inexistente**, contando comparações.
3. Repetir 1 e 2 com busca **binária** (atenção: você precisa ordenar uma cópia do vetor antes, já que o vetor original do enunciado não é ordenado).
4. Repetir tudo isso **10 vezes** com vetores/valores diferentes, comparando quantas comparações cada algoritmo gastou.

→ arquivo `02_busca/exercicio_busca.c`.

**Pegadinha de prova:** para aplicar busca binária, o vetor **tem** que estar ordenado — se a questão te dá um vetor desordenado e pede busca binária direto nele, o primeiro passo da resposta é ordenar (ou apontar que não é possível sem ordenar antes).

## Parte 3 — Merge de Vetores

### Merge clássico (com sentinela)

Dados V1 (n elementos) e V2 (m elementos), ambos ordenados, gera V3 (n+m elementos) ordenado.

```
Merge(V1, V2, n, m, V3):
    V1[n+1] ← ∞; V2[m+1] ← ∞
    i ← 1; j ← 1
    Para k de 1 a (n+m):
        Se (V1[i] ≤ V2[j]) Então
            V3[k] ← V1[i]; i ← i+1
        Senão
            V3[k] ← V2[j]; j ← j+1
    Fp
```

Complexidade: **O(n+m)** — cada elemento dos dois vetores é olhado uma única vez.

### Merge sem sentinela (versão usada dentro do Mergesort)

Quando não é possível "sujar" o vetor com um valor sentinela (ex: fazendo merge de dois pedaços do mesmo vetor), usa-se 3 laços: um enquanto os dois ponteiros não estouraram seus limites, e dois de "sobra" para escoar o que restou de cada lado.

```
Merge(V1, e1, d1, V2, e2, d2, V3):
    i ← e1; j ← e2; k ← 0
    Enquanto (i ≤ d1) e (j ≤ d2):
        k ← k+1
        Se (V1[i] ≤ V2[j]) Então V3[k] ← V1[i]; i ← i+1
        Senão V3[k] ← V2[j]; j ← j+1
    Fe
    Enquanto (i ≤ d1): k←k+1; V3[k]←V1[i]; i←i+1  Fe
    Enquanto (j ≤ d2): k←k+1; V3[k]←V2[j]; j←j+1  Fe
```

### Exercício de implementação (o que caiu no seu enunciado): diferença de conjuntos

Dados V1 e V2 ordenados (tamanhos n e m lidos e preenchidos pelo usuário), construir V3 = **V1 − V2**, ou seja, todos os elementos de V1 que **não** aparecem em V2 (não é simétrico: elementos só de V2 não entram).

**Como adaptar o merge para isso** — é a parte que costuma confundir: percorra os dois vetores com dois ponteiros i, j como no merge, mas:

- Se V1\[i\] < V2\[j\] → esse elemento de V1 não pode estar em V2 (já que V2 está ordenado e V2\[j\] é o menor candidato restante) → copia V1\[i\] para V3, avança i.
- Se V1\[i\] > V2\[j\] → avança j (esse elemento de V2 é irrelevante para achar a diferença).
- Se V1\[i\] = V2\[j\] → o elemento está nos dois conjuntos → **não copia**, avança i e j.
- No final, se sobrar "cauda" em V1 (i ainda ≤ n), esses elementos não têm mais ninguém em V2 pra comparar → **entram todos em V3** direto.

→ arquivo `03_merge/exercicio_merge.c`.

**Pegadinha de prova:** diferença de conjuntos **não é simétrica** — C1−C2 ≠ C2−C1. Confira sempre de qual vetor os elementos "sobreviventes" devem vir.

## Parte 4 — Filas e Pilhas em Vetores

### Fila (FIFO — First In, First Out)

Inserções no final, remoções no início. Implementada como **vetor circular** de tamanho m, com índices `f` (frente) e `r` (retaguarda); `f = 0` indica fila vazia.

```
Enfila(k):
    prov ← (r mod m) + 1
    Se (prov ≠ f) Então
        r ← prov; V[r] ← k
        Se (f = 0) Então f ← 1
        retorna r
    Senão retorna Nulo   // fila cheia

Desenfila(k):
    Se (f ≠ 0) Então
        k ← V[f]
        Se (f = r) Então f ← 0; r ← 0   // esvaziou
        Senão f ← (f mod m) + 1
        retorna k
    Senão retorna Nulo   // fila vazia
```

### Pilha (LIFO — Last In, First Out)

Inserções e remoções no mesmo topo, representada como vetor "em pé", índice `topo` (0 = vazia).

```
PUSH(k):
    Se (topo < m) Então topo←topo+1; V[topo]←k; retorna topo
    Senão retorna Nulo   // pilha cheia

POP(k):
    Se (topo > 0) Então k←V[topo]; topo←topo-1; retorna k
    Senão retorna Nulo   // pilha vazia
```

Exercício de implementação (Parte 4): fila circular e pilha, ambas de **10 posições**, com checagem de cheio/vazio no retorno de cada função, testando inserções e retiradas → arquivo `04_filas_pilhas/exercicio_filas_pilhas.c`.

### Aplicações clássicas (aparecem como exercício teórico/prova)

**1) Coloração de área com fila** — dado um grid com paredes marcadas por `x`, colore-se toda a área livre conectada a um ponto (p,q), enfileirando vizinhos (4 pontos cardeais) ainda não coloridos e desenfileirando para expandir — é uma busca em largura (BFS) usando fila.

**2) Cálculo de expressão em Notação Polonesa Reversa (RPN) com pilha** — percorre a expressão da esquerda pra direita: número → `PUSH`; operador → `POP` dois operandos, aplica o operador, `PUSH` do resultado. Ex: `5 9 + 2 * 6 5 * +` → empilha 5, 9; vê `+` → pop 9, pop 5 → push 14; empilha 2 → vê `*` → pop 2, pop 14 → push 28; empilha 6, 5 → vê `*` → pop 5, pop 6 → push 30; vê `+` → pop 30, pop 28 → push 58. Resultado: **58**.

**3) Conversão de notação parentizada para RPN com pilha** — percorre a expressão: número → escreve direto na saída; `(` → ignora; operador → empilha; `)` → desempilha um operador e escreve na saída.

Essas duas aplicações de pilha (calcular RPN e converter parêntese→RPN) são exatamente o tipo de questão que cai em prova teórica (a P1 de 2026/1 citada no seu material tinha uma variação de coloração de área/fila) — vale simular à mão com o vetor da pilha desenhado.

## Parte 5 — Listas Encadeadas (1/3): Conceitos e Criação

### Conceito

Numa lista encadeada, elementos consecutivos **não precisam** ocupar posições consecutivas de memória — cada nó guarda um ponteiro (`prox`) para o próximo. Vantagem sobre vetor: inserir/remover no meio não exige deslocar elementos.

### Declaração em C

```c
typedef struct node *lista;
struct node {
    char c;
    lista prox;
};
```

### Alocação e desalocação

| Pseudocódigo | C |
| --- | --- |
| `Alocar(p)` | `lista p = malloc(sizeof *p);` |
| `Desalocar(p)` | `free(p);` |
| Link nulo | `NULL` |

**Nó cabeça:** é comum usar o primeiro nó da lista como um nó especial (sentinela) que não guarda dado útil — simplifica inserção/remoção no início, pois você nunca precisa tratar "lista vazia" como caso especial separado.

### Criar uma lista com n nós (variante "Cria2", iterativa e eficiente)

```
Cria2:
    Alocar(cab); p ← cab; p.c ← 1
    Para i de 2 a n:
        Alocar(p.prox); p ← p.prox; p.c ← i
    Fp
    p.prox ← Nulo
```

### Imprimir lista com nó cabeça (cabeça não guarda dado a imprimir)

```
Imprime:
    p ← cab.prox
    Enquanto (p ≠ Nulo):
        Imprimir(p.c)
        p ← p.prox
    Fe
```

### Inverter uma lista (3 formas — pergunta clássica de prova teórica)

1. **Só mexendo em links** (a mais eficiente, O(n), sem pilha extra): percorre a lista uma vez, invertendo o ponteiro `prox` de cada nó para apontar para trás.
2. **Empilhando valores**: empilha o conteúdo de cada nó, depois percorre de novo escrevendo os valores na ordem que saem da pilha (troca conteúdo, não a estrutura).
3. **Empilhando os links (nós)**: empilha os próprios ponteiros para os nós, depois desempilha e reconecta o `prox` de cada um — resultado igual ao método 1, mas via pilha auxiliar.

Exercício de implementação (Parte 5): criar em C uma lista encadeada de **N elementos** (N e o valor de cada nó lidos do usuário) e, ao final, **imprimir toda a lista** → arquivo `05_listas_encadeadas/exercicio_lista_criar_imprimir.c`.

**Pegadinha de prova:** se pedirem para explicar o que um algoritmo de manipulação de ponteiros faz (sem rodar em código), desenhe a lista com setas e simule nó a nó, com valores concretos — é o jeito mais seguro de não errar.

## Partes 6 e 7 — Listas Encadeadas (2/3 e 3/3)

### Busca em lista ordenada (guarda `ant` = nó anterior ao ponto de inserção)

```
Busca(k, ant, pont):
    ant ← cab; p ← cab.prox; pont ← Nil
    Enquanto (p ≠ Nil):
        Se (p.c < k) Então ant ← p; p ← p.prox
        Senão
            Se (p.c = k) Então pont ← p
            p ← Nil   // encerra o laço
    Fe
    retorna (ant, pont)
```

### Inserção ordenada (o exercício das Partes 6 e 7)

```
Inserção(k, p):
    Busca(k, ant, pont)
    Se (pont = Nulo) Então          // ainda não existe -> insere
        Alocar(p); p.c ← k
        p.prox ← ant.prox; ant.prox ← p
    Senão
        p ← Nulo                    // já existe, não duplica
    retorna p
```

Ideia-chave: `ant` é o nó **antes** de onde k deveria entrar; o novo nó se encaixa entre `ant` e `ant.prox`.

### Remoção em lista ordenada

```
Remoção(k, ant):
    Busca(k, ant, pont)
    Se (pont ≠ Nulo) Então
        ant.prox ← pont.prox; Desalocar(pont)
    Senão
        ant ← Nulo
    retorna ant
```

Exercício de implementação (Partes 6 e 7): finalizar a **inserção ordenada** numa lista encadeada → arquivo `05_listas_encadeadas/exercicio_lista_insercao_ordenada.c`.

### Pilha e Fila implementadas como lista encadeada (sem limite de tamanho, ao contrário da versão em vetor)

```
// Pilha: insere/remove sempre no início (topo)
PUSH(k): Alocar(p); p.c←k; p.prox←topo; topo←p
POP(k):  Se (topo≠Nulo) Então p←topo; k←p.c; topo←topo.prox; Desalocar(p)
         Senão k←Nulo

// Fila: insere no fim (r), remove do início (f)
Enfila(k): Alocar(p); p.c←k; p.prox←Nulo
           Se (f≠Nulo) Então r.prox←p Senão f←p
           r←p
Desenfila(k): Se (f≠Nulo) Então p←f; k←p.c; f←f.prox; Desalocar(p)
              Se (f=Nulo) Então r←Nulo
              Senão k←Nulo
```

### Listas circulares

O último nó aponta de volta para o nó cabeça em vez de `Nulo`. A busca circular percorre até encontrar `k` **ou** voltar a `cab` (usa `cab.c ← k` como sentinela para não rodar em loop infinito se `k` não existir).

### Listas duplamente encadeadas (cada nó tem `prox` **e** `ante`)

Permite navegar nos dois sentidos. Inserção/remoção seguem a mesma lógica de "achar o ponto certo com Busca\_dupla", mas agora ajustando **4 ponteiros** em vez de 2 (o `prox` do nó anterior, o `ante` do nó seguinte, e os dois do novo/removido nó) — esse é o detalhe que mais derruba gente em prova: esqueça de atualizar um dos quatro links.

### Checklist de estruturas de dados representadas em lista encadeada (podem cair combinadas em prova)

- Número grande (dígito por nó) e soma de dois números grandes representados assim
- Grid encadeado (soma de todos elementos / maior elemento — travessia simples)
- Pilha e fila como lista (sem tamanho fixo)
- Lista circular e lista duplamente encadeada ordenada

**Pegadinha de prova:** ao inserir/remover numa lista **encadeada** (não em vetor), sempre pense em qual ordem você atualiza os ponteiros — atualizar o ponteiro errado primeiro pode fazer você **perder o acesso ao resto da lista**. Regra prática: sempre conecte o novo nó aos vizinhos **antes** de desconectar/religar os vizinhos entre si.

## Checklist final de revisão

- [ ] Simular Seleção e Inserção à mão numa string curta, contando comparações
- [ ] Saber de cor as complexidades da tabela da Parte 1 (pior/melhor caso, estabilidade)
- [ ] Explicar a definição formal de O(g) (limite superior, com c e n₀)
- [ ] Comparar busca sequencial vs. binária e saber por que binária exige vetor ordenado
- [ ] Fazer merge de diferença de conjuntos (V1 − V2) na mão com dois vetores pequenos
- [ ] Saber a diferença FIFO (fila) vs. LIFO (pilha) e simular fila circular com índices f/r
- [ ] Resolver uma expressão em notação polonesa reversa usando pilha
- [ ] Converter uma expressão parentizada para RPN usando pilha
- [ ] Simular a coloração de área (BFS com fila) passo a passo num grid pequeno
- [ ] Criar, imprimir e inverter (as 3 formas) uma lista encadeada no papel
- [ ] Fazer inserção e remoção ordenada numa lista encadeada, atualizando ponteiros na ordem certa
- [ ] Saber implementar pilha/fila como lista encadeada (sem limite de tamanho)
- [ ] Entender lista circular (sentinela `cab.c ← k`) e lista duplamente encadeada (4 ponteiros por operação)

## Como praticar cada tópico no VSCode

Vou te entregar uma pasta `exercicios-aedi/` com um arquivo `.c` por tópico. Cada arquivo tem:

- O enunciado exato do exercício em comentário no topo
- As assinaturas das funções já prontas
- Um `main()` com um pequeno "chicote de testes" (gera vetores aleatórios, lê do teclado, imprime resultado) já funcionando
- Blocos `// TODO:` exatamente onde você precisa completar o algoritmo

Para compilar e rodar no VSCode:

1. Abra a pasta `exercicios-aedi/` no VSCode (`File > Open Folder`)
2. Abra um terminal integrado (``` Ctrl+\`` ou  ```Terminal > New Terminal\`)
3. Compile com `gcc nome_do_arquivo.c -o programa -Wall` (o `-Wall` mostra avisos úteis)
4. Rode com `./programa` (Linux/Mac) ou `.\programa.exe` (Windows)

O `README.md` dentro da pasta detalha isso para cada exercício. Depois de resolver, você pode me colar seu código aqui que eu reviso e aponto o que ajustar.

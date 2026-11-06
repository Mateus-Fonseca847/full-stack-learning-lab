# Aula 06 — Hashing: tratamento de sinônimos e análise

> Base: *Hashing* (slides 10 a 29). Respostas: [`respostas/aula-06.md`](../respostas/aula-06.md). Prática: [`praticas/hash.c`](../praticas/hash.c)

Exemplo dos slides (M = 9):

| k | DO | RE | MI | FA | SOL | LA | SI |
|---|---|---|---|---|---|---|---|
| h(k) | 5 | 2 | 6 | 5 | 5 | 2 | 9 |

**NC** = número médio de comparações de uma busca com sucesso. **α = N/M** = fator de carga (N chaves, M posições).

## 1. Encadeamento exterior

Cada posição de V guarda o início de uma **lista encadeada** com as chaves sinônimas. Inserção **no início** da lista.

```
Busca(k, i, p):
    p ← V[i]
    Enquanto (p ≠ Nulo) E (p.c ≠ k): p ← p.prox

Inserção(k, p):
    i ← h(k); Busca(k, i, p)
    Se (p = Nulo) Então
        Alocar(p); p.c ← k
        p.prox ← V[i]; V[i] ← p
    Senão p ← Nulo                    // já existe
```

Resultado para o exemplo (inserção no início): `2: LA → RE`, `5: SOL → FA → DO`, `6: MI`, `9: SI`.

NC = (LA 1 + RE 2 + SOL 1 + FA 2 + DO 3 + MI 1 + SI 1) / 7 = **11/7 ≈ 1,57**.

**Análise:** melhor caso NC = 1; pior caso NC = N (tudo no mesmo endereço); caso médio **NC ≈ 1 + α/2** (o slide escreve `N(1 + α/2)`, mas o gráfico vai de 1 a 1,5 para α de 0 a 1: é a fórmula 1 + α/2). **Aceita N > M** (α pode passar de 1).

## 2. Encadeamento interior (listas coligadas)

As listas ficam **dentro do vetor**: cada posição tem a chave `c` e um campo `prox` (0 = fim). Um sinônimo vai para uma posição **livre** qualquer e é ligado ao fim da cadeia. `Next` escolhe a **última posição livre varrendo de M para baixo** (é o que o exemplo do slide 19 mostra).

```
Busca(k, ant, p):
    p ← h(k); ant ← p
    Enquanto (V[p].prox ≠ 0) E (V[p].c ≠ k): ant ← p; p ← V[p].prox
    Se (V[p].c ≠ k) Então p ← Nulo

Inserção(k, p):
    Busca(k, ant, p)
    Se (p = Nulo) E (n < M) Então
        Se (V[ant].c = ' ') Então p ← ant; V[p].c ← k      // endereço-base livre
        Senão j ← Next(ant); V[j].c ← k; V[ant].prox ← j; p ← j
        n ← n + 1
    Senão p ← Nulo
```

> **Atenção ao `ant`:** no pseudocódigo do slide, o laço da Busca deixa `ant` um passo atrás do último nó. Para ligar o novo nó **ao fim da cadeia**, `ant` precisa ser o **último nó visitado**. Ao implementar, use o último nó (foi assim que reproduzi a tabela do slide 19). Se o professor cobrar a versão do slide, confira com ele.

Tabela final do exemplo (posição: chave → prox):

| pos | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| c | | RE | | SI | DO | MI | LA | SOL | FA |
| prox | 0 | 7 | 0 | 0 | 9 | 0 | 0 | 4 | 8 |

Cadeias: `2: RE → LA`, `5: DO → FA → SOL → SI` (SI tem h = 9, mas o 9 já está ocupado por FA, então a busca de SI entra na cadeia de FA: as cadeias **se juntam**, daí "coligadas"), `6: MI`.

NC = (DO 1 + RE 1 + MI 1 + FA 2 + SOL 3 + LA 2 + SI 3) / 7 = 13/7 ≈ **1,86**.

**Análise:** melhor caso 1; pior caso N; caso médio **NC ≈ 1 + 0,8α** (slide: 1,8 para α = 1). Limite: **N ≤ M** (a tabela não cresce).

## 3. Endereçamento aberto

Só o vetor. Se a posição h(k) está ocupada, procura-se **circularmente a próxima livre** (`p ← p mod M + 1`).

```
Busca(k, ant, p):
    p ← h(k); ant ← p
    Enquanto (V[p] ≠ Nulo) E (V[p] ≠ k): ant ← p; p ← p mod M + 1
    Se (V[p] = Nulo) Então p ← Nulo

Inserção(k, p):
    Busca(k, ant, p)
    Se (p = Nulo) E (n < M − 1) Então V[ant] ← k; p ← ant
    Senão p ← Nulo
```

A regra `n < M − 1` deixa **sempre uma posição vazia**, garantindo que a busca circular termine.

Exemplo do slide (aqui h(LA) = 8): `DO→5, RE→2, MI→6, FA→5 ocupado→6 ocupado→7, SOL→5→6→7→8, LA→8 ocupado→9, SI→9 ocupado→1 (volta ao início)`.

Tabela: `1: SI, 2: RE, 5: DO, 6: MI, 7: FA, 8: SOL, 9: LA`.

NC = (1 + 1 + 1 + 3 + 4 + 2 + 2)/7 = 14/7 = **2** (os números são as comparações para achar DO, RE, MI, FA, SOL, LA, SI, nessa ordem).

**Análise:** melhor caso 1; pior caso N; caso médio **degrada muito quando α → 1**: o slide marca NC = 4 para α = 0,75, com a curva disparando. (Resultados clássicos da sondagem linear: ½(1 + 1/(1−α)) para busca com sucesso e ½(1 + 1/(1−α)²) sem sucesso; o valor 4 do slide corresponde a 1/(1−α) com α = 0,75.) Moral: **mantenha α baixo** (por exemplo ≤ 0,5 a 0,7).

## 4. Comparação final

| | Exterior | Interior | Aberto |
|---|---|---|---|
| Estrutura | vetor + listas fora | vetor + `prox` interno | só vetor |
| Aceita N > M? | **sim** | não (N ≤ M) | não (N ≤ M − 1) |
| NC médio | ≈ 1 + α/2 | ≈ 1 + 0,8α | cresce rápido com α |
| Memória extra | ponteiros + nós alocados | campo `prox` | nenhuma |
| Remoção | simples | cuidado com a cadeia | **delicada** (não se pode só esvaziar a posição) |

> **Pegadinhas de prova:**
> 1. Em tabelas passo a passo, **respeite a ordem de inserção** (a ordem muda onde cada sinônimo cai e o NC).
> 2. Exterior insere **no início** da lista (por isso o último inserido é o primeiro da lista).
> 3. No aberto, a busca é **circular** (de M volta a 1).
> 4. Para o NC, conte comparações **de cada chave até achá-la** e divida pelo número de chaves.

---

## Exercícios

1. Com a tabela dos slides (DO 5, RE 2, MI 6, FA 5, SOL 5, LA 2, SI 9; M = 9), monte as tabelas de **encadeamento exterior** e **interior** e calcule o NC de cada uma. Para o **endereçamento aberto**, use h(LA) = 8 e calcule o NC.
2. Use h(letra) = Pos mod 9 + 1 (M = 9) e insira, nesta ordem, as chaves **A L G O R I T M** (as 8 letras distintas de ALGORITMOS, sem a última, S). Monte as tabelas dos três métodos e calcule o NC de cada um.
3. Insira também **S** (h = 2) em cada método. O que acontece em cada um?
4. Calcule o NC médio previsto por α = 0,5, 0,75 e 1 para o encadeamento exterior (1 + α/2) e interior (1 + 0,8α).
5. Qual método suporta mais chaves que posições (N > M)? Por quê?
6. Por que, no endereçamento aberto, não se pode simplesmente esvaziar a posição de uma chave removida?
7. **Implemente em C** a inserção e a busca do encadeamento exterior (lista com inserção no início) e confira com `praticas/hash.c`.
8. Resolva o exercício do slide 24 com o **seu** MIXSTRING (M = 9, h(letra) = Pos mod 9 + 1): tabelas exterior e interior e NC de cada uma.

Respostas: [`respostas/aula-06.md`](../respostas/aula-06.md)

---

## Resumo

- **Exterior:** listas fora do vetor; insere no início; NC ≈ 1 + α/2; aceita N > M.
- **Interior:** `prox` dentro do vetor; sinônimo vai para a última posição livre; cadeias podem se juntar; NC ≈ 1 + 0,8α; N ≤ M.
- **Aberto:** só vetor, procura circular a próxima livre; n < M − 1; NC dispara quando α → 1 (slide: 4 em α = 0,75).
- NC = média das comparações para achar cada chave; α = N/M.

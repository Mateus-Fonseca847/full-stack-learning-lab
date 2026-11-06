# Aula 05 — Hashing: função hash e sinônimos

> Base: *Hashing* (slides 2 a 9). Respostas: [`respostas/aula-05.md`](../respostas/aula-05.md). Prática: [`praticas/hash.c`](../praticas/hash.c)

## 1. Motivação

Nas árvores de busca, busca e atualização custam **O(log n)** no caso médio e no pior caso (balanceadas). Dá para melhorar o primeiro **ao custo de piorar o segundo**: é o hashing.

**Ideia:** usar um **vetor** V[1..M] e uma **função** h que transforma a chave em um **endereço** do vetor, indo direto ao lugar certo.

```
U = conjunto de chaves de interesse
V = vetor[1..M]
h(k) = função hash: transforma a chave k em um endereço de V        h: U → V
```

(*to hash* = bagunçar, picar.)

## 2. Por que existem sinônimos

h poderia ser **injetora** (uma chave por endereço)? **Quase nunca.** Pense no **paradoxo do aniversário**: com apenas 23 pessoas, a chance de duas fazerem aniversário no mesmo dia, entre 365, já passa de 50%. Do mesmo modo, mesmo com M muito maior que o número de chaves, colisões aparecem cedo.

Duas chaves k₁ ≠ k₂ com h(k₁) = h(k₂) são **sinônimas**. Como colisão é inevitável, é preciso **tratar sinônimos** (aula 06).

## 3. Propriedades de uma boa função hash

1. **Cálculo rápido**.
2. Gerar endereços **na faixa 1..M** (ou 0..M−1).
3. Gerar **distribuição uniforme** de sinônimos (poucas colisões, bem espalhadas).
4. **Não preservar propriedades das chaves** (chaves parecidas não devem cair em endereços parecidos).

## 4. Funções hash

### a) Resto da divisão

```
h(k) = k mod M + 1
```

- Cálculo rápido, endereços em 1..M, distribuição uniforme (periódica com período M: k = 0, 1, ..., M−1 vão para 1, 2, ..., M e depois repete).
- **Preserva a sequência** (chaves consecutivas vão para endereços consecutivos). Pela propriedade 4, isso é um defeito.

### b) Função de multiplicação

```
h(k) = ((k · b) mod R) mod M + 1
```

Exemplo do slide: **R = 2¹⁶ = 65536, M = 613, b = 31415821.**

| k | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| h(k) | 171 | 341 | 566 | 123 | 293 | 518 | 75 | 245 | **470** | 27 |

(O slide mostra 440 para k = 9, mas o cálculo dá **470**: conferido em `praticas/hash.c`. Os demais valores batem. Provavelmente é erro de digitação do slide.)

- Cálculo rápido, faixa 1..M, **pode** ter boa uniformidade: depende de R, b e M.
- **Não preserva sequência** (as chaves 1, 2, 3 espalham-se: 171, 341, 566).

### c) Outras funções

- **Dobradura:** divide a chave em partes e soma (ou combina) as partes.
- **Seleção de partes da chave:** usa só alguns dígitos.
- **Metade do quadrado:** eleva a chave ao quadrado e pega os dígitos do meio.
- "Segredos industriais" (funções otimizadas de bibliotecas).

> **Pegadinha de prova:** a função de resto `k mod M + 1` é a mais cobrada: saiba calcular à mão e saiba dizer que ela **preserva** a sequência, enquanto a de multiplicação não preserva.

## 5. Os três métodos de tratamento de sinônimos (resumo)

| Método | Ideia |
|---|---|
| **1. Encadeamento exterior** | uma **lista encadeada** de sinônimos para cada endereço, fora do vetor |
| **2. Encadeamento interior** (listas coligadas) | listas de sinônimos **dentro do próprio vetor** (campo `prox`) |
| **3. Endereçamento aberto** | só o vetor, **sem links**; o sinônimo vai para outra posição (busca circular da próxima livre) |

Detalhes, algoritmos e análise na aula 06.

---

## Exercícios

1. Calcule h(k) = k mod 11 + 1 para as chaves 10, 22, 31, 4, 15, 28, 17, 88, 59. Quais são sinônimas?
2. Calcule h(1), h(2) e h(3) pela função de multiplicação (R = 2¹⁶, M = 613, b = 31415821) mostrando as contas de h(1).
3. Calcule a probabilidade de, em 23 pessoas, haver pelo menos duas com o mesmo aniversário (365 dias). O que isso mostra sobre funções hash injetoras?
4. Qual das duas funções (resto ou multiplicação) preserva a sequência das chaves? Por que isso pode ser ruim?
5. Calcule h(letra) = Pos(letra) mod 9 + 1 (Pos: A = 1, B = 2, ...) para as letras de **EXEMPLO**.

Respostas: [`respostas/aula-05.md`](../respostas/aula-05.md)

---

## Resumo

- Hash: vetor V[1..M] + função h(k) → busca média ≈ O(1), pior caso O(n).
- h injetora é raríssima (paradoxo do aniversário) ⟹ há **sinônimos**.
- Propriedades: rápida, faixa 1..M, uniforme, não preserva propriedades.
- Resto: `k mod M + 1` (preserva sequência). Multiplicação: `(k·b mod R) mod M + 1` (não preserva).
- Tratamentos: encadeamento exterior, interior e endereçamento aberto.

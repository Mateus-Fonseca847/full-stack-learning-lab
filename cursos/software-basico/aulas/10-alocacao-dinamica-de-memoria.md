# Aula 10 — Alocação dinâmica de memória (heap × stack)

> Base: *Notas de Aula SB*, seção Alocação Dinâmica de Memória. Respostas: [`respostas/aula-10.md`](../respostas/aula-10.md)

## 1. Heap × stack

| | Stack | Heap |
|---|---|---|
| Gerenciamento | automático, pela CPU (registrador `esp`/`rsp`) | **manual**, pelo programador (`malloc`/`free` em C) |
| Tempo de vida | até o fim do **escopo** | até ser **liberado explicitamente** |
| Tamanho | menor | muito maior, mas alocação mais lenta |
| Acesso | mais rápido, endereços relativos, amigável ao cache | pode ser mais lento, dados dispersos, fragmentação |

## 2. Funções de alocação dinâmica (C)

| Função | O que faz |
|---|---|
| `malloc(size)` | aloca um bloco de `size` bytes |
| `calloc(n, size)` | aloca um vetor de n elementos, **zerados** |
| `realloc(ptr, novo_size)` | redimensiona uma área já alocada |
| `free(ptr)` | libera a área |

Em C++: `new` e `delete`.

## 3. Por baixo dos panos

`malloc` é implementado sobre chamadas ao sistema como `brk()` ou `mmap()` (aula 09). Em Assembly x86-64:

```asm
mov rdi, 32     ; tamanho a alocar, em bytes
call malloc     ; ponteiro retornado em rax
```

A heap é inicializada pelo SO ao carregar o programa, e **cresce dinamicamente** conforme a necessidade.

## 4. Vantagens e desvantagens da heap

**Vantagens:** permite blocos grandes; o programador controla o tempo de vida; é **necessária** para estruturas dinâmicas (listas, árvores, grafos — ver AEDS).

**Desvantagens:** alocação/liberação mais lentas; sujeita a **memory leaks**; fragmentação; menor desempenho (ponteiros indiretos, localização imprevisível).

## 5. Heap e segurança

Erros clássicos: **double free** (liberar duas vezes o mesmo ponteiro), **use-after-free** (usar um ponteiro já liberado), estouro de buffer na heap. Mitigações modernas: *smart pointers* (C++), ferramentas como **Valgrind** (aula 11).

> **Pegadinha de prova:** uma variável local comum (`int x;` dentro de uma função) vive na **stack** e some ao fim da função. Se a função retornar um **ponteiro** para essa variável local, o ponteiro fica **inválido** assim que a função termina — é um bug clássico, diferente de um leak de heap.

---

## Exercícios

**Questão 1)** Por que a stack é, em geral, mais rápida que a heap para alocar/desalocar memória?

**Questão 2)** Qual a diferença entre `malloc` e `calloc`? E entre `malloc` e `realloc`?

**Questão 3)** (extra) O código abaixo tem um bug: `int *f() { int x = 10; return &x; }`. Explique por que é um erro, usando os conceitos de stack e tempo de vida.

**Questão 4)** O que é um *memory leak*? Dê um exemplo mínimo em C que vaza memória.

**Questão 5)** (extra) O que é *double free* e por que ele pode causar falha de segurança?

**Questão 6)** Por que listas encadeadas e árvores (AEDS) **precisam** de alocação dinâmica, enquanto um vetor de tamanho fixo não precisa?

Respostas: [`respostas/aula-10.md`](../respostas/aula-10.md)

---

## Resumo

- **Stack:** automática, rápida, tempo de vida = escopo. **Heap:** manual, maior, tempo de vida controlado pelo programador.
- C: `malloc`, `calloc`, `realloc`, `free`. C++: `new`/`delete`.
- `malloc` usa syscalls como `brk()`/`mmap()` por baixo.
- Riscos: memory leak, double free, use-after-free, fragmentação.

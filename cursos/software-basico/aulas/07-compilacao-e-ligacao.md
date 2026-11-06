# Aula 07 — Processo de compilação e ligação (linker)

> Base: *Notas de Aula SB*, seções Processo de Compilação e Ligação e Organização de Código. Respostas: [`respostas/aula-07.md`](../respostas/aula-07.md)

## 1. Fases da compilação

```
Código-fonte (.c)
   ↓ Pré-processamento
   ↓ Análise léxica
   ↓ Análise sintática
   ↓ Análise semântica
   ↓ Código intermediário (IR)
   ↓ Otimização
   ↓ Código alvo (Assembly/objeto)
```

| Fase | O que faz | Exemplo de erro detectado |
|---|---|---|
| **Pré-processamento** | expande `#include`, `#define`, `#ifdef` | (ainda é texto) |
| **Análise léxica** | converte o código em **tokens** (menores unidades válidas) | símbolo fora do alfabeto da linguagem (`@` em C) → **erro léxico** |
| **Análise sintática** | monta a **AST** (árvore sintática abstrata) segundo a gramática | falta um `;` → **erro sintático** |
| **Análise semântica** | verifica tipos, escopos, declarações (usa a **tabela de símbolos**) | usar uma variável não declarada → **erro semântico**. Alguns só aparecem em **execução** (ex.: acessar um array fora dos limites) |
| **Código intermediário** | traduz a AST para uma representação (IR) ainda independente da arquitetura | — |
| **Otimização** | melhora tempo/memória/instruções (loop unrolling, eliminação de subexpressões comuns, vetorização); **opcional**, mas importante na prática | — |
| **Código alvo** | gera o código para a arquitetura do processador | — |

> **Importante:** conceitualmente a **compilação termina no código alvo**. A **montagem** (assembly → binário, gera `.o`) e a **ligação** (une os `.o`, resolve símbolos) são etapas **distintas**, mesmo que `gcc main.c -o prog` faça tudo de uma vez.

## 2. Ligação (linking)

O **linker** une vários módulos objeto (e bibliotecas) em um executável, resolvendo referências externas (chamadas de função, variáveis globais declaradas em outro arquivo).

- **Ligação estática:** tudo resolvido **antes** da execução.
- **Ligação dinâmica:** referências a bibliotecas ficam no executável e são resolvidas **em tempo de execução** (aula 06).

## 3. Realocação

Cada módulo é compilado **de forma independente**, como se começasse no endereço 0. A **realocação** ajusta esses endereços para que todos os módulos coexistam corretamente na memória do executável final.

**Exemplo:** `mod1.c` define `foo()`; `mod2.c` chama `foo()` e declara `x`.

| Antes (endereços relativos, por módulo) | Depois (endereços finais, pelo linker) |
|---|---|
| foo em mod1.o: 0x0000 | foo: 0x1000 |
| x em mod2.o: 0x0000 | x: 0x2000 |
| call em mod2.o: 0x0004 | call: 0x2004 |

```asm
; antes:  CALL <foo>          (endereço indefinido)
; depois: CALL 0x1000         (endereço final, resolvido pelo linker)
```

## 4. Ligação e desempenho de cache

O posicionamento das funções/variáveis na memória afeta a **cache**:

- **Localidade temporal:** um dado usado repetidamente em pouco tempo deve ficar na cache.
- **Localidade espacial:** dados **próximos na memória** tendem a ser usados juntos — agrupar funções/dados relacionados reduz cache misses.
- Linkers avançados reorganizam o layout do código/dados para explorar isso.

> **Pegadinha de prova:** diferencie **compilador** (traduz código-fonte até o código alvo, uma unidade por vez) de **linker** (une **vários** módulos já traduzidos e resolve os símbolos entre eles). Um erro de "undefined reference" é erro do **linker**, não do compilador.

---

## Exercícios

**Questão 1)** Em que fase da compilação cada erro seria detectado: a) usar o símbolo `@` no meio de um código C; b) esquecer um `;`; c) somar um `int` com uma `struct` incompatível; d) acessar `v[100]` de um array `v[10]` (em tempo de execução)?

**Questão 2)** (extra) Explique, com suas palavras, por que a otimização é "conceitualmente opcional" mas importante na prática.

**Questão 3)** Qual a diferença entre o que o **compilador** faz e o que o **linker** faz? Em qual dos dois um "undefined reference to `foo`" seria reportado?

**Questão 4)** No exemplo de realocação, por que `mod1.o` e `mod2.o`, compilados separadamente, podem ambos ter endereços começando em `0x0000`?

**Questão 5)** Explique a diferença entre localidade temporal e localidade espacial, com um exemplo de cada.

Respostas: [`respostas/aula-07.md`](../respostas/aula-07.md)

---

## Resumo

- Fases: pré-processamento → léxica → sintática → semântica → IR → otimização → código alvo.
- Léxica pega símbolo inválido; sintática pega estrutura errada; semântica pega tipo/escopo errado.
- **Compilação** termina no código alvo; **montagem** e **ligação** são etapas separadas.
- Linker: resolve referências externas e faz a **realocação** de endereços.
- Localidade temporal (mesmo dado, pouco tempo) e espacial (dados próximos) afetam a cache.

# Aula 11 — Representação interna de dados (arrays, structs, unions) e depuração

> Base: *Notas de Aula SB*, seções Representação Interna de Dados e Depuração de Programas. Respostas: [`respostas/aula-11.md`](../respostas/aula-11.md)

## Parte A — Arrays, structs e unions

### 1. Arrays

Em C, um array é **homogêneo** e os elementos ficam **contíguos** na memória. Para `T a[n]`, o endereço de `a[i]` é:

```
end_a[i] = end_a + i × sizeof(T)
```

O **nome do array** é equivalente a um ponteiro constante para o primeiro elemento:

```c
int a[5];
int *p = a;        // p aponta para a[0]
a[3] == *(p + 3)    // equivalentes
```

### 2. Arrays multidimensionais

Também contíguos. Para `int a[3][2]`, o endereço de `a[i][j]`:

```
end_a[i][j] = end_a + i × 2 × sizeof(int) + j × sizeof(int)
```

(o "2" é o número de colunas: a linha i começa em `end_a + i × colunas × sizeof(T)`.)

### 3. Structs e alinhamento

Agrupam dados **heterogêneos**, mas sujeitos a regras de alinhamento (em 64 bits):

| Tipo | Alinhado em múltiplos de |
|---|---|
| `long`, `double`, ponteiro | 8 |
| `int`, `float` | 4 |
| `short` | 2 |
| `char` | qualquer endereço |

Regras: cada campo é alinhado ao seu próprio tamanho, e o **struct inteiro** deve ter tamanho múltiplo do seu **maior elemento**.

**Exemplo com padding:**

```c
struct s {
    int  a;   // 4 bytes
    char b;   // 1 byte (+ 3 de padding)
    int  c;   // 4 bytes
};            // total: 12 bytes
```

Layout: `a a a a b _ _ _ c c c c` (os `_` são o padding, bytes desperdiçados para alinhar `c` em um múltiplo de 4).

> **Dica prática:** reordenar os campos (do maior para o menor) costuma **reduzir o padding**. No exemplo, trocar a ordem para `int a; int c; char b;` deixaria só 1 byte de padding no fim (para completar o múltiplo de 4), em vez de 3 no meio.

### 4. Unions

Todos os membros **compartilham o mesmo espaço** de memória; só um está "ativo" por vez. O tamanho é o do **maior membro**.

```c
union U { char c; long l; } u;   // tamanho = 8 bytes (o maior, long)
```

Diferente de struct, onde cada campo tem seu próprio espaço.

## Parte B — Depuração (GDB e Valgrind)

### 5. GDB (GNU Debugger)

Compilar com símbolos de depuração: `gcc -g programa.c -o programa`.

| Comando | O que faz |
|---|---|
| `run` | executa dentro do GDB |
| `break main` / `break linha` / `break funcao` | ponto de parada |
| `next` | próxima linha, **sem** entrar em funções |
| `step` | entra na função chamada |
| `print var` | mostra o valor de `var` |
| `continue` | segue até o próximo breakpoint |
| `backtrace` | pilha de chamadas |
| `frame N` | seleciona o frame N da pilha |
| `info locals` | variáveis locais do frame atual |
| `watch var` | para quando `var` **mudar** |

### 6. Casos clássicos

- **Stack trace:** `backtrace` mostra a cadeia de chamadas (função1 → função2 → função3) até o ponto de parada.
- **Segfault:** acesso a memória inválida (ex.: `int *p = NULL; *p = 42;`). `run` + `backtrace` + `print p` localizam a causa.
- **Watchpoint:** `watch contador` interrompe quando a variável mudar — útil quando não se sabe **onde** no código algo está sendo alterado.

### 7. Valgrind

Ferramenta de **análise dinâmica**, detecta vazamentos de memória e acessos inválidos; combina bem com o GDB.

```bash
valgrind --leak-check=full ./programa
```

| Opção | Uso |
|---|---|
| `--leak-check=summary` | resumo dos vazamentos |
| `--leak-check=full` | detalhes completos (linha, tamanho) |
| `--track-origins=yes` | origem de valores indefinidos |
| `--show-leak-kinds=all` | todos os tipos de vazamento |

**Boas práticas:** compilar sempre com `-g` em desenvolvimento; evitar depurar código otimizado (`-O2`/`-O3`, a ordem das instruções muda); combinar GDB + Valgrind.

**Limitação:** Valgrind pode deixar o programa até **20× mais lento**, e só pega erros de **memória**, não de lógica.

> **Pegadinha de prova:** `next` **não entra** em chamadas de função (passa por cima); `step` **entra**. Se o bug está dentro de uma função chamada, use `step`, não `next`.

---

## Exercícios

**Questão 1)** Para `int a[4][3]`, calcule o deslocamento (em bytes, `sizeof(int) = 4`) de `a[2][1]` em relação ao início do array.

**Questão 2)** Dado `struct t { char x; double y; int z; };`, desenhe o layout com padding (double alinhado em 8, int em 4) e dê o tamanho total do struct.

**Questão 3)** Para `union U { int i; float f; char c[8]; }`, qual o tamanho de U? Por que escrever em `i` e depois ler `c[0]` dá um resultado "estranho" (não relacionado ao valor de `i` como número)?

**Questão 4)** Em uma sessão de GDB, você quer saber o valor de uma variável sem entrar nas funções chamadas na linha atual. Qual comando usar: `next` ou `step`? E se o bug estiver dentro da função chamada?

**Questão 5)** O código abaixo vaza memória. Identifique a linha e explique por que o Valgrind reportaria isso:
```c
int *v = malloc(10 * sizeof(int));
v[0] = 42;
return 0;
```

**Questão 6)** (extra) Qual comando do GDB mostra toda a cadeia de chamadas até o ponto atual? E qual mostra as variáveis locais do frame selecionado?

Respostas: [`respostas/aula-11.md`](../respostas/aula-11.md)

---

## Resumo

- Array: contíguo, `end_a[i] = end_a + i·sizeof(T)`; multidimensional: soma os deslocamentos de cada dimensão.
- Struct: alinhamento por tipo (long/double/ponteiro: 8; int/float: 4; short: 2); pode ter **padding**.
- Union: todos os membros compartilham o espaço; tamanho = maior membro.
- GDB: `break`, `run`, `next` (não entra), `step` (entra), `print`, `backtrace`, `watch`.
- Valgrind: `--leak-check=full` detecta vazamentos; combine com `-g` e com GDB.

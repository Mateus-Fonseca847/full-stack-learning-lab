# Aula 04 — Introdução ao Assembly e Assembly Intel 32 bits

> Base: *Notas de Aula SB*, seções Introdução ao Assembly e Assembly Intel 32 bits. Respostas: [`respostas/aula-04.md`](../respostas/aula-04.md)

## 1. O que é Assembly

Linguagem de baixo nível, ligada diretamente à arquitetura: cada processador tem seu próprio conjunto de instruções (**ISA**, Instruction Set Architecture).

## 2. Os quatro modelos clássicos

Para calcular `z = (x + y) · w`:

| Modelo | Como opera | Exemplo |
|---|---|---|
| **Stack Machine** | só a pilha; tudo implícito no topo | `PUSH x; PUSH y; ADD; PUSH w; MUL` |
| **Acumulador** | um registrador especial (ACC) guarda o resultado parcial | `LOAD x; ADD y; MUL w; STORE z` |
| **Register-Memory** | instruções operam entre registrador e memória | `LOAD R1,x; ADD R1,y; MUL R1,w; STORE z,R1` |
| **Load/Store (RISC)** | só registradores fazem aritmética; memória só por LOAD/STORE explícitos | `LOAD R1,x; LOAD R2,y; ADD R3,R1,R2; LOAD R4,w; MUL R5,R3,R4; STORE z,R5` |

**Trade-offs:**
- **Stack:** simples, mas gera muitas instruções de push/pop.
- **Acumulador:** poucos operandos por instrução, mas vira gargalo (um único registrador).
- **Register-Memory:** flexível, mas instruções mais complexas (usado no x86 clássico).
- **Load/Store:** separa memória e registradores; permite mais otimização e paralelismo — é o modelo de **ARM e RISC-V**.

## 3. Assembly Intel 32 bits (IA-32)

Modelo **Register-Memory**: instruções não podem ter os dois operandos em memória.

### Registradores de uso geral

| Registrador | Uso principal | Divisão 16/8 bits |
|---|---|---|
| EAX | acumulador (aritmética, retorno de função) | AX, AH, AL |
| EBX | base (endereçamento de dados) | BX, BH, BL |
| ECX | contador (loops, shifts) | CX, CH, CL |
| EDX | dados (mult/div, I/O) | DX, DH, DL |

### Ponteiro e índice

| Registrador | Função |
|---|---|
| ESI | ponteiro de origem (strings) |
| EDI | ponteiro de destino (strings) |
| EBP | base pointer (base da pilha em funções) |
| ESP | stack pointer (topo da pilha) |

### Controle

**EIP** (próxima instrução) e **EFLAGS** (zero, carry, sinal, overflow...).

### Seções do programa

- `.data`: dados **inicializados** (`msg: db "Ola Mundo", 0`).
- `.bss`: dados **não inicializados**, só reservados (`buffer: resb 64`).
- `.text`: o **código**.

### Instruções básicas

`MOV` (copia), `ADD`/`SUB`, `MUL`/`IMUL` (sem/com sinal), `DIV`/`IDIV`, `INC`/`DEC`, `CMP` (subtração "lógica" usada pelos jumps), `PUSH`/`POP`.

### Desvios (jumps)

| Instrução | Condição |
|---|---|
| JMP | incondicional |
| JE/JZ · JNE/JNZ | igual/zero · diferente/não zero |
| JG · JL · JGE · JLE | maior · menor · maior-igual · menor-igual |
| JC/JNC | carry setado/não setado |
| JO/JNO | overflow/sem overflow |

Exemplo de laço:

```asm
mov ecx, 5
loop_start:
dec ecx
jnz loop_start   ; repete até ECX = 0
```

### A pilha (stack)

LIFO; guarda variáveis locais e endereços de retorno.

```asm
; função soma(a, b)
soma:
    push ebp
    mov  ebp, esp
    mov  eax, [ebp+8]    ; 1º argumento (a)
    add  eax, [ebp+12]   ; soma o 2º argumento (b)
    pop  ebp
    ret
```

Chamada:

```asm
mov eax, 4
mov ebx, 6
push eax
push ebx
call soma
add esp, 8   ; limpa os argumentos empilhados
```

> **Pegadinha de prova:** no IA-32 os argumentos vão para a pilha **em ordem inversa** à leitura (e nessa convenção, `[ebp+8]` é o primeiro argumento porque `ebp+4` guarda o endereço de retorno, empilhado pelo próprio `call`).

---

## Exercícios

**Questão 1)** Quais as vantagens e desvantagens do modelo de Acumulador em relação ao Load/Store?

**Questão 2)** Reescreva `z = (a − b) · (c + d)` em Assembly para os quatro modelos.

**Questão 3)** Por que arquiteturas modernas como ARM e RISC-V adotaram o modelo Load/Store?

**Questão 4)** (extra) Escreva, em Assembly IA-32, um laço que soma os números de 1 a 10 usando ECX como contador e EAX como acumulador.

**Questão 5)** (extra) Para a função `soma(a, b)` do exemplo, desenhe o estado da pilha logo após o `call soma` (antes do `push ebp`).

Respostas: [`respostas/aula-04.md`](../respostas/aula-04.md)

---

## Resumo

- 4 modelos: **Stack**, **Acumulador**, **Register-Memory**, **Load/Store** (RISC — ARM, RISC-V).
- IA-32: registradores EAX–EDX (dados), ESI/EDI (índice), EBP/ESP (pilha), EIP/EFLAGS (controle).
- Seções: `.data` (inicializado), `.bss` (reservado), `.text` (código).
- Jumps usam o resultado de `CMP`; pilha LIFO guarda variáveis locais e retorno.

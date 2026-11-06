# Aula 05 — Assembly Intel 64 bits e Buffer Overflow

> Base: *Notas de Aula SB*, seções Assembly Intel 64 bits (x86-64) e Buffer Overflow. Respostas: [`respostas/aula-05.md`](../respostas/aula-05.md)

## 1. x86-64: o que muda

- Registradores de 32 bits (E-) viram **64 bits (R-)**: RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP.
- O número de registradores de uso geral **dobra**: de 8 para **16** (novos: **R8 a R15**).
- Cada um se subdivide: `R8` (64 bits), `R8D` (32), `R8W` (16), `R8B` (8).

| Registrador | Papel extra em 64 bits |
|---|---|
| RDI, RSI, RDX, RCX | 1º a 4º argumentos de função |
| R8, R9 | 5º e 6º argumentos |
| R10, R11 | temporários (*caller-saved*) |
| R12–R15 | preservados (*callee-saved*) |

## 2. Convenção de chamada (System V ABI)

A mudança mais importante: em 32 bits, os argumentos iam pela **pilha** (lento); em 64 bits, os **6 primeiros** vão direto em **registradores** (RDI, RSI, RDX, RCX, R8, R9).

**Benefícios:** menor latência (registrador é muito mais rápido que RAM/cache) e menos instruções (sem vários PUSH/POP só para passar parâmetros).

```asm
; soma(a, b) -> rdi = a, rsi = b
soma:
    mov rax, rdi   ; move o 1º argumento para o retorno
    add rax, rsi   ; soma o 2º argumento
    ret            ; resultado já está em RAX
```

## 3. Instruções vetoriais (SIMD)

Para alto desempenho (gráficos, criptografia, IA): processam **vários dados de uma vez**.

- **SSE:** registradores XMM0–XMM15, 128 bits.
- **AVX:** 256 bits (YMM) e, depois, 512 bits (ZMM).
- `MOVAPS`/`MOVUPS` (move blocos), `ADDPS` (soma 4 floats de uma vez), `MULPD` (multiplica 2 doubles em paralelo).

## 4. Buffer overflow

Um **buffer** em pilha (ex.: `char buffer[20]`) tem tamanho fixo. Se uma função como `scanf("%s", buffer)` **não limita** o que é lido, é possível escrever **além** do buffer, sobrescrevendo outras variáveis locais e, principalmente, o **endereço de retorno** (`retcode`) da função.

```c
void secretFunction() { printf("Congratulations!\n"); ... }

void echo() {
    char buffer[20];
    scanf("%s", buffer);     // sem limite: vulnerável
}
```

**Ideia do ataque:** encontrar o deslocamento até o endereço de retorno na pilha e sobrescrevê-lo com o **endereço de `secretFunction`**, fazendo o programa "pular" para uma função nunca chamada explicitamente.

**Ferramentas citadas:** compilar sem proteção para o exercício (`gcc buffer.c -o buffer -fno-stack-protector -m32`); `objdump -M intel -d buffer` para ver o Assembly; GDB (`set disassembly-flavor intel`, `ni`, `x/20x $esp`) para inspecionar a pilha byte a byte.

**Defesa (fora do material, mas cobrada na prática):** usar funções que limitam o tamanho (`fgets` em vez de `scanf("%s",...)`, `-fstack-protector`), e ASLR/canários de pilha em produção.

> **Pegadinha de prova:** o **endereço de retorno** fica logo acima das variáveis locais na pilha (que cresce para baixo); por isso um buffer que estoura "para cima" na memória alcança justamente esse endereço.

---

## Exercícios

**Questão 1)** (extra) Liste os seis primeiros argumentos de uma função em x86-64, na ordem, e diga onde vai o 7º argumento.

**Questão 2)** (extra) Reescreva, em x86-64, uma função `mult(a, b)` que retorna a·b, seguindo o padrão do exemplo `soma`.

**Questão 3)** Por que passar argumentos em registradores (64 bits) é mais rápido que pela pilha (32 bits)?

**Questão 4)** Explique, em suas palavras, como um buffer overflow pode alterar o endereço de retorno de uma função. Por que o tamanho do buffer e a posição do `retcode` na pilha importam?

**Questão 5)** (extra) Cite duas defesas contra buffer overflow e explique rapidamente cada uma.

Respostas: [`respostas/aula-05.md`](../respostas/aula-05.md)

---

## Resumo

- x86-64: registradores de 64 bits (R-), 16 no total (R8–R15 novos).
- Os 6 primeiros argumentos vão em **registradores** (RDI, RSI, RDX, RCX, R8, R9), não na pilha.
- SIMD (SSE/AVX): processa vários dados por instrução.
- Buffer overflow: escrever além de um buffer de pilha pode sobrescrever o **endereço de retorno**.

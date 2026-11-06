# Aula 06 — Programas-objeto e bibliotecas estáticas e dinâmicas

> Base: *Notas de Aula SB*, seção Programas-objeto, bibliotecas estáticas e dinâmicas. Respostas: [`respostas/aula-06.md`](../respostas/aula-06.md)

## 1. Programa-objeto

Um **programa-objeto** (`.o`) é código compilado, mas **não executável** sozinho — falta ligar com outras partes (como a `main`).

```c
// soma.c
int soma(int a, int b) { return a + b; }
```

```bash
gcc -c soma.c -o soma.o     # -c: gera só o objeto, não liga
```

Para usar `soma()` em outro arquivo, é preciso um **cabeçalho (header)**:

```c
// soma.h
int soma(int a, int b);
```

```c
// main.c
#include <stdio.h>
#include "soma.h"
int main() { printf("%d\n", soma(10, 15)); return 0; }
```

```bash
gcc main.c soma.o           # liga main.c com o objeto já compilado
```

## 2. Biblioteca de vínculo estático

Agrupa vários `.o` em um arquivo (`.a` no Unix, `.lib` no Windows).

```bash
gcc -c sub.c -o sub.o
ar -rcs libmat.a soma.o sub.o     # ar: cria a biblioteca estática
```

Uso:

```bash
gcc main.c -lmat -L.        # -lmat: procura libmat.a; -L.: procura no diretório atual
```

O código da biblioteca é **copiado para dentro** do executável final.

## 3. Biblioteca de vínculo dinâmico

Em vez de copiar, o código é **ligado em tempo de execução**.

```bash
gcc -c -fPIC soma.c -o soma.o     # -fPIC: código independente de posição
gcc -c -fPIC sub.c -o sub.o
gcc -shared -o libmat.so soma.o sub.o
gcc -L. main.c -lmat
```

Ao rodar, se a biblioteca não for encontrada:

```
./a.out: error while loading shared libraries: libmat.so: cannot open shared object file
```

Solução: apontar o caminho da biblioteca na variável de ambiente:

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/username
```

## 4. Estática × dinâmica

| | Estática (.a) | Dinâmica (.so) |
|---|---|---|
| Quando liga | na compilação | na execução |
| Tamanho do executável | maior (código copiado) | menor |
| Atualizar a biblioteca | precisa recompilar | basta trocar o `.so` |
| Várias cópias na memória | sim (uma por programa) | não (compartilhada entre processos) |

> **Pegadinha de prova:** `-fPIC` (Position Independent Code) é necessário para gerar uma biblioteca **dinâmica**, porque ela pode ser carregada em **qualquer endereço de memória**, diferente para cada processo.

---

## Exercícios

**Questão 1)** (extra) Qual a diferença entre o que `gcc -c arquivo.c` gera e o que `gcc arquivo.c -o prog` gera?

**Questão 2)** (extra) Explique o papel de cada opção no comando `ar -rcs libmat.a soma.o sub.o`.

**Questão 3)** Por que uma biblioteca dinâmica precisa ser compilada com `-fPIC`, e a estática não?

**Questão 4)** Se uma biblioteca estática for atualizada (um bug corrigido), o que é preciso fazer com os programas que a usam? E se for uma dinâmica?

**Questão 5)** (extra) Dado o erro `cannot open shared object file`, explique a causa e como resolver.

Respostas: [`respostas/aula-06.md`](../respostas/aula-06.md)

---

## Resumo

- `.o` = programa-objeto, não executável sozinho; precisa de um header (`.h`) para ser usado.
- **Biblioteca estática (.a):** `ar -rcs`; código **copiado** para o executável na ligação.
- **Biblioteca dinâmica (.so):** `-fPIC` + `-shared`; ligada **em tempo de execução**; precisa de `LD_LIBRARY_PATH`.
- Dinâmica: executável menor e biblioteca compartilhada entre processos; estática: não depende de arquivos externos depois de compilado.

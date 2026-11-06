# Aula 09 — Chamadas ao sistema operacional (syscalls) e POSIX

> Base: *Notas de Aula SB*, seções Chamadas ao Sistema Operacional e Interface POSIX. Respostas: [`respostas/aula-09.md`](../respostas/aula-09.md)

## 1. O que são syscalls

**System calls** são o mecanismo pelo qual programas em **modo usuário** acessam serviços do **kernel**: criar/finalizar processos, manipular arquivos, E/S, memória, comunicação entre processos. É uma **interface controlada**: o programa nunca acessa o disco, outro processo ou o barramento diretamente.

## 2. Modo usuário × modo kernel

| Modo | Acesso |
|---|---|
| **Usuário** | restrito; onde rodam os programas de aplicação |
| **Kernel** | total, ao hardware e aos recursos do sistema |

**Transição (user → kernel):**
1. O programa chama uma função de biblioteca (ex.: da `libc`).
2. A biblioteca prepara os parâmetros e dispara um **trap** (interrupção de software).
3. O processador muda para modo kernel.
4. O kernel executa, retorna o resultado, restaura o modo usuário.

## 3. Principais syscalls (agrupadas)

| Grupo | Chamadas |
|---|---|
| **Processos** | `fork()` (cria filho; pai recebe PID do filho, filho recebe 0) · `waitpid(pid, &statloc, opt)` (pai espera o filho) · `execv(name, argv)` (substitui a imagem do processo) · `exit(status)` |
| **Arquivos** | `open(file, flags)` → fd · `close(fd)` · `read(fd, buf, n)` · `write(fd, buf, n)` · `lseek(fd, offset, whence)` · `stat(name, &buf)` |
| **Diretórios/permissões** | `chdir`, `chmod`, `mkdir`, `rmdir` |
| **Sistema de arquivos/links** | `mount`, `umount`, `link(nome1, nome2)` (novo nome para o mesmo conteúdo), `unlink(nome)` |
| **Sinais/tempo** | `kill(pid, sinal)`, `time(&t)` |
| **Outras** | `getpid()`, `getppid()`, `dup`/`dup2` (duplica descritor), `pipe(fd[2])`, `socket/bind/listen/accept/connect` |

**Resumo das etapas de uma chamada:** biblioteca padrão → trap → modo kernel → execução → retorno ao modo usuário.

## 4. POSIX

**POSIX** (IEEE 1003.x) é uma especificação que padroniza a interface entre aplicações C e sistemas Unix-like (Linux, macOS, BSD), para que o mesmo código **compile e rode** em sistemas diferentes.

Cobre: arquivos (`open/read/write/close/stat`), processos (`fork/exec/wait/exit`), IPC (sinais, pipes, semáforos, memória compartilhada), diretórios, permissões, tempo.

**Benefícios:** portabilidade, compatibilidade, padronização.

**POSIX × implementação real:** sistemas oferecem **extensões próprias** fora do padrão (ex.: Linux tem `epoll()`, `clone()`, `inotify()`). Usar extensões ganha recursos, mas perde portabilidade — daí o uso comum de `#ifdef` para suportar as duas coisas.

> **Pegadinha de prova:** `fork()` **duplica** o processo inteiro (memória, descritores); `exec()` **substitui** o código do processo atual por outro programa, mantendo o mesmo PID. Os dois juntos (`fork` + `exec`) é como um shell cria novos processos.

---

## Exercícios

**Questão 1)** Explique, passo a passo, o que acontece entre o programa chamar `open()` e o controle voltar para o modo usuário.

**Questão 2)** Qual a diferença entre `fork()` e `execv()`? O que cada um retorna e para quem?

**Questão 3)** (extra) Um processo pai cria um filho com `fork()` e depois chama `waitpid()`. Explique, com suas palavras, o que acontece com o pai enquanto o filho não termina.

**Questão 4)** Por que uma aplicação não pode escrever diretamente no disco, sem passar por uma syscall?

**Questão 5)** O que é POSIX e por que usar `epoll()` (específico do Linux) reduz a portabilidade de um programa?

**Questão 6)** (extra) Classifique cada chamada em um dos grupos da tabela: `pipe()`, `chmod()`, `unlink()`, `lseek()`, `kill()`, `mkdir()`.

Respostas: [`respostas/aula-09.md`](../respostas/aula-09.md)

---

## Resumo

- Syscall: interface controlada entre modo usuário e kernel, via **trap**.
- `fork()` duplica o processo; `execv()` substitui o código do processo atual; `exit()`/`wait()` encerram e sincronizam.
- Arquivos: `open/read/write/close/lseek/stat`. IPC: `pipe`, sinais (`kill`).
- **POSIX** padroniza essas chamadas entre sistemas Unix-like; extensões específicas (Linux) quebram a portabilidade.

# Software Básico — P2

Curso baseado em *Notas de Aula SB*, do Prof. Pedro Carlos da Silva Lara (CEFET-RJ, campus Petrópolis), lido diretamente do projeto do Overleaf. O material é extenso (42 páginas, 16 seções); organizei em 11 aulas, do mesmo tamanho das aulas dos seus outros cursos. O conteúdo foi criado com a ajuda de inteligência artificial (IA), que gerou as aulas, os exercícios e os gabaritos, e serve como registro do meu processo de estudo.

## O que o curso cobre

São **11 aulas**, cada uma com teoria, exemplos, exercícios e resumo final. Gabaritos em `respostas/`.

| # | Aula | Seções das Notas de Aula SB | Exercícios |
|---|------|------------------------------|-----------|
| 1 | [Representação de inteiros com sinal](aulas/01-representacao-de-inteiros.md) | 1 | 4 (2 do professor + 2 extras) · [respostas](respostas/aula-01.md) |
| 2 | [Ponto fixo e ponto flutuante (IEEE 754)](aulas/02-ponto-fixo-e-flutuante.md) | 2 e 3 | 8 (todas do professor) · [respostas](respostas/aula-02.md) |
| 3 | [Aritmética com ponto flutuante](aulas/03-aritmetica-ponto-flutuante.md) | 4 | 6 extras · [respostas](respostas/aula-03.md) |
| 4 | [Introdução ao Assembly e Intel 32 bits](aulas/04-introducao-ao-assembly.md) | 5 e 6 | 5 (3 do professor + 2 extras) · [respostas](respostas/aula-04.md) |
| 5 | [Assembly 64 bits e Buffer Overflow](aulas/05-assembly-64-bits-e-buffer-overflow.md) | 7 e 8 | 5 extras · [respostas](respostas/aula-05.md) |
| 6 | [Programas-objeto e bibliotecas](aulas/06-programas-objeto-e-bibliotecas.md) | 9 | 5 extras · [respostas](respostas/aula-06.md) |
| 7 | [Compilação e ligação (linker)](aulas/07-compilacao-e-ligacao.md) | 10 e 11 | 5 extras · [respostas](respostas/aula-07.md) |
| 8 | [Interpretadores](aulas/08-interpretadores.md) | 12 | 5 extras · [respostas](respostas/aula-08.md) |
| 9 | [Syscalls e POSIX](aulas/09-syscalls-e-posix.md) | 13 | 6 extras · [respostas](respostas/aula-09.md) |
| 10 | [Alocação dinâmica de memória](aulas/10-alocacao-dinamica-de-memoria.md) | 14 | 6 extras · [respostas](respostas/aula-10.md) |
| 11 | [Representação de dados e depuração (GDB/Valgrind)](aulas/11-representacao-de-dados-e-depuracao.md) | 15 e 16 | 6 extras · [respostas](respostas/aula-11.md) |

> **Atenção à coluna "Exercícios".** As aulas 1 e 2 reaproveitam os exercícios **exatos** das Notas de Aula (incluindo as questões numeradas do professor). As demais aulas (3 e 5 a 11) **não têm** exercícios numerados no material original — são só teoria, exemplos e trechos de código — então os exercícios dessas aulas são **extras**, criados para fixar o conteúdo. Todos os valores numéricos (complemento a dois, ponto fixo, IEEE 754) foram conferidos por script.

## Estrutura

- `aulas/`: o conteúdo de cada aula em Markdown
- `respostas/`: gabaritos com passo a passo
- `praticas/representacao.js`: script Node.js para conferir complemento a dois, ponto fixo e IEEE 754

## Como usar

1. Leia a aula, na ordem. Cada aula termina com um **Resumo**.
2. Resolva os exercícios no papel antes de abrir `respostas/`.
3. Confira as contas numéricas (precisa só de Node.js):

```bash
cd praticas
node representacao.js c2 -28 6          # complemento a dois
node representacao.js fromc2 110101     # de complemento a dois para decimal
node representacao.js ponto-fixo 0.3 8  # decimal para ponto fixo
node representacao.js ieee754 -13.625   # IEEE 754 single precision
```

## Pontos de atenção

| Onde | Observação |
|---|---|
| Aula 02, ex. 2 | o enunciado do professor pula a "Questão 3" (vai de 2 para 4) — mantive a numeração original |
| Geral | o material cobre **16 seções**; a divisão em 11 aulas e os títulos são meus, para ficar no formato dos seus outros cursos |
| Escopo da P2 | assumi que a prova cobre **tudo** o que está no Overleaf (o projeto não indica divisão P1/P2); não há registro de uma P1 de Software Básico nas suas provas do Daily — se já fez P1, me diga o que caiu, que eu ajusto o plano |

## Checklist do que você aprendeu

- [ ] Converto para complemento a dois e detecto overflow
- [ ] Converto entre decimal e ponto fixo (multiplicação sucessiva)
- [ ] Converto entre decimal e IEEE 754 (normalização, bias, mantissa)
- [ ] Explico underflow, cancelamento catastrófico e não comutatividade em ponto flutuante
- [ ] Comparo os 4 modelos de Assembly (Stack, Acumulador, Register-Memory, Load/Store)
- [ ] Conheço os registradores e a pilha do IA-32 e do x86-64
- [ ] Explico como um buffer overflow altera o endereço de retorno
- [ ] Diferencio biblioteca estática de dinâmica e sei compilar as duas
- [ ] Descrevo as fases da compilação e o papel do linker (realocação)
- [ ] Comparo os tipos de interpretador (AST, bytecode, JIT) 
- [ ] Explico a transição usuário/kernel e cito as principais syscalls
- [ ] Comparo heap e stack e cito riscos (leak, double free, use-after-free)
- [ ] Calculo deslocamentos em arrays e alinhamento/padding em structs
- [ ] Uso os comandos básicos do GDB e do Valgrind

Marque no VS Code trocando `[ ]` por `[x]`.

# Aula 08 — Interpretadores

> Base: *Notas de Aula SB*, seção Interpretadores. Respostas: [`respostas/aula-08.md`](../respostas/aula-08.md)

## 1. Interpretador × compilador

Um **interpretador** executa o código diretamente (ou uma forma intermediária), sem traduzir o programa inteiro para linguagem de máquina antes. Processa de forma **incremental**.

## 2. Tipos de interpretador

| Tipo | Ideia | Exemplos |
|---|---|---|
| **AST Interpreter** | percorre a árvore sintática abstrata recursivamente, executando cada nó | Python (modo interativo), Ruby MRI |
| **Interpretação dinâmica** | modifica/gera código em execução (`eval`, `exec`, reflexão) | JavaScript, Python, Ruby |
| **Bytecode** | trabalha sobre uma forma intermediária compacta, gerada antes | JVM, CPython (`.pyc`) |
| **Stack-based / Register-based** | a VM do bytecode usa pilha ou registradores virtuais | JVM (pilha), Lua (registradores) |
| **JIT (Just-in-Time)** | compila em tempo de execução os trechos mais usados (profiling) | V8, PyPy, HotSpot |
| **Interpretação estática** | código analisado/validado antes de rodar | bytecode Java (verificação) |

### Exemplo de AST Interpreter (pseudocódigo do material)

```python
def interpret(ast):
    if ast.type == 'NUM': return ast.value
    elif ast.type == 'ADD': return interpret(ast.left) + interpret(ast.right)
    elif ast.type == 'MUL': return interpret(ast.left) * interpret(ast.right)
```

Cada nó da árvore é avaliado **recursivamente** — exatamente o mesmo padrão dos percursos de árvore (AEDS, aula 03): o "Visita" vira "aplique a operação".

## 3. Vantagens e desvantagens

| Vantagens | Desvantagens |
|---|---|
| Portabilidade (roda onde há interpretador) | Mais lento que compilado (overhead) |
| Fácil depuração (passo a passo) | Depende do interpretador presente |
| Interatividade (REPL) | Otimizações profundas (inlining) mais difíceis |
| Flexibilidade (introspecção, metaprogramação) | |

## 4. Bytecode e VMs

- **Java (JVM):** `javac` gera bytecode; a JVM interpreta e otimiza em execução.
- **Python:** CPython compila `.py` para `.pyc` (bytecode) automaticamente.
- **Lua:** bytecode compacto, VM baseada em **registradores**.

## 5. Híbridos (JIT)

- **V8 (JavaScript):** interpreta primeiro; compila para nativo os trechos "quentes" (muito executados).
- **PyPy:** usa RPython para gerar interpretadores com JIT, mais rápido que o CPython.

## 6. Segurança

- **Sandboxing:** restringe os recursos que o código pode acessar (JS no navegador, WebAssembly).
- **Gerenciamento de memória:** coletores de lixo evitam vazamentos.
- **Validação de bytecode:** confere se o bytecode segue as regras antes de rodar (ex.: verificador da JVM).

> **Pegadinha de prova:** "interpretado" e "compilado" não são mutuamente exclusivos — Python e Java **compilam para bytecode** e depois **interpretam** (ou usam JIT) esse bytecode. O que define o tipo é **onde** fica a fronteira entre tradução e execução.

---

## Exercícios

**Questão 1)** (extra) Classifique: a) um interpretador que percorre a AST de uma calculadora simples; b) a JVM; c) o V8; d) um sistema que só roda bytecode previamente verificado, sem gerar código novo em execução.

**Questão 2)** Qual a vantagem de usar **bytecode** em vez de interpretar o código-fonte diretamente?

**Questão 3)** O que é profiling, no contexto de um compilador JIT, e para que ele é usado?

**Questão 4)** (extra) Escreva, em pseudocódigo (como o exemplo da aula), um `interpret(ast)` que também trate o nó `'SUB'` (subtração) e `'NEG'` (negação unária).

**Questão 5)** Cite duas vantagens e duas desvantagens de um interpretador frente a um compilador puro.

Respostas: [`respostas/aula-08.md`](../respostas/aula-08.md)

---

## Resumo

- Interpretador executa direto (ou via forma intermediária), incrementalmente.
- Tipos: AST, dinâmico, bytecode, stack/register-based, **JIT**, estático.
- Vantagens: portabilidade, depuração fácil, interatividade. Desvantagem principal: desempenho.
- Bytecode (JVM, Lua, .pyc) é mais rápido que interpretar o fonte direto; JIT combina interpretação com compilação dos trechos quentes.

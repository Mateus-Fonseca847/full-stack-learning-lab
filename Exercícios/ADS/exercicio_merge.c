# Exercícios AEDI — Algoritmos e Estruturas de Dados I

Pasta de exercícios em C para praticar no VSCode antes da prova, cobrindo as
7 partes da matéria (2026/2). Cada arquivo `.c` tem o enunciado exato do
professor em comentário, código de apoio já pronto (leitura de dados,
impressão, testes) e blocos `// TODO:` marcando exatamente onde você precisa
programar o algoritmo.

O guia teórico completo (pseudocódigo, complexidade, pegadinhas de prova)
está no documento **"Guia de Estudos – AEDI"** que te entreguei junto com
esta pasta — use os dois lado a lado.

## Estrutura

```
exercicios-aedi/
├── 01_ordenacao/
│   └── exercicio_ordenacao.c        # Seleção, Inserção, Bubblesort
├── 02_busca/
│   └── exercicio_busca.c            # Busca sequencial e binária
├── 03_merge/
│   └── exercicio_merge.c            # Diferença de conjuntos (V1 - V2)
├── 04_filas_pilhas/
│   └── exercicio_filas_pilhas.c     # Fila circular e pilha em vetor
├── 05_listas_encadeadas/
│   ├── exercicio_lista_criar_imprimir.c      # Parte 5: criar e imprimir
│   └── exercicio_lista_insercao_ordenada.c   # Partes 6/7: inserção ordenada
└── 06_bonus_avancado/                # Extras vistos em aula (não pedidos
    ├── exercicio_rpn.c               # como implementação, mas caem em prova
    └── exercicio_coloracao_area.c    # teórica — vale treinar)
```

## Como compilar e rodar no VSCode

1. Abra esta pasta inteira no VSCode: `File > Open Folder...` → selecione
   `exercicios-aedi`.
2. Instale a extensão **C/C++** da Microsoft (opcional, mas ajuda com
   autocomplete e detecção de erros).
3. Abra um terminal integrado: `Ctrl+\`` (ou menu `Terminal > New Terminal`).
4. Navegue até a pasta do exercício e compile, por exemplo:
   ```bash
   cd 01_ordenacao
   gcc exercicio_ordenacao.c -o ordenacao -Wall
   ./ordenacao
   ```
   No Windows (se não usar WSL), troque `./ordenacao` por `.\ordenacao.exe`.
5. O `-Wall` liga avisos do compilador — preste atenção neles, costumam
   apontar exatamente onde falta implementar algo.

Todos os 8 arquivos já foram testados e **compilam sem erros** mesmo com os
`TODO`s vazios (eles só não vão imprimir o resultado certo até você
completar os algoritmos) — então se der erro de compilação depois de você
editar, o problema está no seu código, não no esqueleto original.

## Ordem sugerida de estudo

1. `01_ordenacao` e `02_busca` — mais simples, bom aquecimento
2. `03_merge` — exige pensar em dois ponteiros percorrendo dois vetores
3. `04_filas_pilhas` — atenção especial à aritmética circular da fila
4. `05_listas_encadeadas` (os dois arquivos) — o tópico que mais cai em
   prova teórica; comece só depois de já entender ponteiros em C
5. `06_bonus_avancado` — se sobrar tempo; são aplicações clássicas de
   pilha/fila que apareceram em prova anterior

## Quando terminar um exercício

Cole o código aqui no chat com o Claude e peça revisão — ele aponta bugs,
casos de borda esquecidos e se a complexidade está de acordo com o esperado
para cada algoritmo.

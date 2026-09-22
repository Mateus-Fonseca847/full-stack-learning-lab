/* ============================================================
   AEDI - Parte 1 - Ordenacao e Complexidade de Algoritmos
   ============================================================

   ENUNCIADO (conforme passado em aula):
   Implementar em C os algoritmos de ordenacao por INSERCAO,
   SELECAO e BUBBLESORT para um vetor de CARACTERES de 15
   posicoes, com os valores sendo inseridos pelo usuario.
   Imprimir na tela o vetor inicial e o vetor parcialmente
   ordenado ao final de cada passo externo do laco (ou seja,
   apos cada "i" do laco principal), para cada um dos 3
   algoritmos.

   O QUE JA ESTA PRONTO:
   - leitura dos 15 caracteres do usuario
   - impressao do vetor
   - copia do vetor original para cada algoritmo nao interferir
     no teste dos outros
   - o main() chama os 3 algoritmos, um de cada vez

   O QUE VOCE PRECISA FAZER:
   - completar o corpo das 3 funcoes de ordenacao, marcado com
     "TODO", seguindo o pseudocodigo do guia de estudos.
   - cada funcao deve chamar imprimeVetor() ao final de CADA
     passo externo do laco principal (nao so no final de tudo).
   - cada funcao deve CONTAR e IMPRIMIR o numero total de
     comparacoes feitas (variavel comparacoes).

   Compilar:  gcc exercicio_ordenacao.c -o ordenacao -Wall
   Rodar:     ./ordenacao
   ============================================================ */

#include <stdio.h>

#define N 15

void imprimeVetor(char v[], int n) {
    printf("[ ");
    for (int i = 0; i < n; i++) {
        printf("%c ", v[i]);
    }
    printf("]\n");
}

void copiaVetor(char origem[], char destino[], int n) {
    for (int i = 0; i < n; i++) {
        destino[i] = origem[i];
    }
}

/* ---------------------------------------------------------
   SELECAO
   Pseudocodigo (guia de estudos, Parte 1):
     Para i de 1 a (n-1):
         m <- i
         Para j de (i+1) a n:
             Se (V[j] < V[m]) Entao m <- j
         Fp
         troca(V[i], V[m])
     Fp
   Lembre-se: em C os indices comecam em 0, entao ajuste os
   limites dos lacos (i de 0 a n-2, j de i+1 a n-1).
   --------------------------------------------------------- */
void ordenacaoSelecao(char v[], int n) {
    int comparacoes = 0;
    printf("\n--- SELECAO ---\n");
    printf("Vetor inicial: ");
    imprimeVetor(v, n);

    // TODO: implemente o algoritmo de selecao aqui.
    // Nao esqueca de:
    //   1) incrementar 'comparacoes' a cada "Se (V[j] < V[m])"
    //   2) chamar imprimeVetor(v, n) ao final de cada passo i

    printf("Total de comparacoes (Selecao): %d\n", comparacoes);
}

/* ---------------------------------------------------------
   INSERCAO
   Pseudocodigo (guia de estudos, Parte 1):
     Para i de 2 a n:
         j <- i; t <- V[i]
         Enquanto (V[j-1] > t):
             V[j] <- V[j-1]; j <- j-1
         Fe
         V[j] <- t
     Fp
   Em C (indices de 0 a n-1): comece o laco externo em i=1.
   --------------------------------------------------------- */
void ordenacaoInsercao(char v[], int n) {
    int comparacoes = 0;
    printf("\n--- INSERCAO ---\n");
    printf("Vetor inicial: ");
    imprimeVetor(v, n);

    // TODO: implemente o algoritmo de insercao aqui.
    // Cuidado com o caso j == 0 dentro do "Enquanto" (nao pode
    // acessar v[j-1] se j for 0) -- adicione essa condicao.

    printf("Total de comparacoes (Insercao): %d\n", comparacoes);
}

/* ---------------------------------------------------------
   BUBBLESORT
   Pseudocodigo (guia de estudos, Parte 1):
     Para i de 1 a (n-1):
         Para j de 1 a (n-i):
             Se (V[j] > V[j+1]) Entao troca(V[j], V[j+1])
         Fp
     Fp
   --------------------------------------------------------- */
void ordenacaoBubble(char v[], int n) {
    int comparacoes = 0;
    printf("\n--- BUBBLESORT ---\n");
    printf("Vetor inicial: ");
    imprimeVetor(v, n);

    // TODO: implemente o bubblesort aqui.
    // Dica: use uma variavel char 'aux' para fazer a troca.

    printf("Total de comparacoes (Bubblesort): %d\n", comparacoes);
}

int main(void) {
    char original[N];
    char v1[N], v2[N], v3[N];

    printf("Digite %d caracteres (um de cada vez, aperte Enter apos cada um):\n", N);
    for (int i = 0; i < N; i++) {
        printf("Caractere %d: ", i + 1);
        scanf(" %c", &original[i]);
    }

    copiaVetor(original, v1, N);
    copiaVetor(original, v2, N);
    copiaVetor(original, v3, N);

    ordenacaoSelecao(v1, N);
    ordenacaoInsercao(v2, N);
    ordenacaoBubble(v3, N);

    return 0;
}

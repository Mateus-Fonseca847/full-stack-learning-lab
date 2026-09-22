/* ============================================================
   AEDI - Parte 2 - Pesquisa em Vetores
   ============================================================

   ENUNCIADO (conforme passado em aula):
   Passo 1: Criar um vetor de inteiros de 15 posicoes e
            preenche-lo aleatoriamente (nao ordenado e sem
            repeticao de valores).
   Passo 2: Executar a busca sequencial para um valor aleatorio
            EXISTENTE no vetor, contando o numero de comparacoes
            ate encontrar o valor.
   Passo 3: Executar a busca sequencial para um valor aleatorio
            NAO EXISTENTE no vetor, contando o numero de
            comparacoes ate descobrir que o valor nao esta
            presente.
   Passo 4 (5 no enunciado original): repetir os passos 2 e 3,
            executando a PESQUISA BINARIA para os mesmos valores.
   Passo 5 (6 no enunciado original): repetir o processo (passos
            2 a 5) por 10 vezes, com valores diferentes a cada
            rodada, e analisar a quantidade de comparacoes de
            cada algoritmo.

   O QUE JA ESTA PRONTO:
   - geracao de vetor aleatorio sem repeticao
   - escolha de um valor existente e de um valor inexistente
   - copia ordenada do vetor (necessaria para a busca binaria --
     lembre-se: busca binaria SO funciona em vetor ordenado)
   - o laco de 10 rodadas no main(), acumulando estatisticas

   O QUE VOCE PRECISA FAZER:
   - completar buscaSequencial() e buscaBinaria(), ambas
     retornando o indice encontrado (ou -1) e preenchendo o
     numero de comparacoes via ponteiro.

   Compilar:  gcc exercicio_busca.c -o busca -Wall
   Rodar:     ./busca
   ============================================================ */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 15
#define RODADAS 10

void imprimeVetor(int v[], int n) {
    printf("[ ");
    for (int i = 0; i < n; i++) printf("%d ", v[i]);
    printf("]\n");
}

/* Gera N inteiros distintos entre 0 e 999, em ordem aleatoria. */
void geraVetorAleatorio(int v[], int n) {
    int usados[1000] = {0};
    int count = 0;
    while (count < n) {
        int candidato = rand() % 1000;
        if (!usados[candidato]) {
            usados[candidato] = 1;
            v[count++] = candidato;
        }
    }
}

void copiaVetor(int origem[], int destino[], int n) {
    for (int i = 0; i < n; i++) destino[i] = origem[i];
}

/* Ordena com um algoritmo simples so para preparar a busca binaria
   (isso NAO faz parte do exercicio de ordenacao -- e apenas
   apoio para poder rodar a busca binaria). Ja esta pronto. */
void ordenaAuxiliar(int v[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (v[j] > v[j + 1]) {
                int aux = v[j];
                v[j] = v[j + 1];
                v[j + 1] = aux;
            }
        }
    }
}

/* ---------------------------------------------------------
   BUSCA SEQUENCIAL
   Pseudocodigo (guia de estudos, Parte 2):
     i <- 1
     Enquanto (i <= n) e (V[i] != k):
         i <- i+1
     Fe
     Se (i <= n) Entao retorna i  Senao retorna "nao encontrado"

   Retorne o INDICE (0..n-1) se achar, ou -1 se nao achar.
   Preencha *comparacoes com quantas comparacoes "V[i] == k"
   voce fez (conte mesmo quando nao encontrar).
   --------------------------------------------------------- */
int buscaSequencial(int v[], int n, int chave, int *comparacoes) {
    *comparacoes = 0;

    // TODO: implemente a busca sequencial aqui.

    return -1; // troque quando implementar
}

/* ---------------------------------------------------------
   BUSCA BINARIA (o vetor recebido AQUI ja esta ordenado)
   Pseudocodigo (guia de estudos, Parte 2):
     esq <- 1; dir <- n
     Enquanto (esq <= dir):
         m <- (esq+dir) div 2
         Se (V[m] = k) Entao retorna m
         Senao Se (V[m] < k) Entao esq <- m+1
         Senao dir <- m-1
     Fe
     retorna "nao encontrado"

   Retorne o INDICE (0..n-1) se achar, ou -1 se nao achar.
   Preencha *comparacoes com o numero de comparacoes "V[m] == k"
   feitas (ou combine com a comparacao de <, sua escolha -- so
   documente no relatorio o que voce contou).
   --------------------------------------------------------- */
int buscaBinaria(int v[], int n, int chave, int *comparacoes) {
    *comparacoes = 0;

    // TODO: implemente a busca binaria aqui.

    return -1; // troque quando implementar
}

int main(void) {
    srand((unsigned int) time(NULL));

    int totalCompSeqExistente = 0, totalCompSeqInexistente = 0;
    int totalCompBinExistente = 0, totalCompBinInexistente = 0;

    for (int rodada = 1; rodada <= RODADAS; rodada++) {
        int vetor[N], vetorOrdenado[N];
        geraVetorAleatorio(vetor, N);
        copiaVetor(vetor, vetorOrdenado, N);
        ordenaAuxiliar(vetorOrdenado, N);

        int valorExistente = vetor[rand() % N];
        int valorInexistente = -1; /* -1 nunca sera gerado, pois so geramos 0..999 */

        printf("\n===== Rodada %d =====\n", rodada);
        printf("Vetor (nao ordenado): ");
        imprimeVetor(vetor, N);
        printf("Valor existente sorteado: %d | Valor inexistente: %d\n",
               valorExistente, valorInexistente);

        int comp;

        buscaSequencial(vetor, N, valorExistente, &comp);
        printf("Busca sequencial (existente):   %d comparacoes\n", comp);
        totalCompSeqExistente += comp;

        buscaSequencial(vetor, N, valorInexistente, &comp);
        printf("Busca sequencial (inexistente): %d comparacoes\n", comp);
        totalCompSeqInexistente += comp;

        buscaBinaria(vetorOrdenado, N, valorExistente, &comp);
        printf("Busca binaria (existente):      %d comparacoes\n", comp);
        totalCompBinExistente += comp;

        buscaBinaria(vetorOrdenado, N, valorInexistente, &comp);
        printf("Busca binaria (inexistente):     %d comparacoes\n", comp);
        totalCompBinInexistente += comp;
    }

    printf("\n===== Medias apos %d rodadas =====\n", RODADAS);
    printf("Sequencial (existente):   %.2f comparacoes em media\n", (double) totalCompSeqExistente / RODADAS);
    printf("Sequencial (inexistente): %.2f comparacoes em media\n", (double) totalCompSeqInexistente / RODADAS);
    printf("Binaria (existente):      %.2f comparacoes em media\n", (double) totalCompBinExistente / RODADAS);
    printf("Binaria (inexistente):    %.2f comparacoes em media\n", (double) totalCompBinInexistente / RODADAS);

    return 0;
}

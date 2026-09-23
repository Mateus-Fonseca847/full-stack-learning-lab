#include <stdio.h>
#include <stdlib.h>
#include <time.h>
/* ============================================================
   AEDI - Parte 2 - Pesquisa em Vetores
   ============================================================

ENUNCIADO (conforme passado em aula):
Passo 1: Criar um vetor de inteiros de 15 posicoes e
    preenche-lo aleatoriamente (nao ordenado e sem
    repeticao de valores).

*/
int v[] = {1,15,14,7,8,9,2,4,3,6,5,11,10,12,13};
/*
Passo 2: Executar a busca sequencial para um valor aleatorio
EXISTENTE no vetor, contando o numero de comparacoes
ate encontrar o valor.
*/
int buscaSequencial (int v[], int n, int valor) {
    int comparacoes = 0;
    for (int i= 0; i < n; i++){
        comparacoes++;
        if (v[i] == valor){
            return comparacoes;
        }
    }
    return comparacoes;
}

/*
Passo 3 (5 no enunciado original): repetir o passo 2,
executando a PESQUISA BINARIA para os mesmos valores.
*/
void ordenarVetor (int v[], int n){
 for (int i = 0; i < n - 1; i++){
    for (int j = 0; j < n - 1 - i; j++){
        if(v[j] > v[j+1]){
            int sup = v[j];
            v[j] = v[j+1];
            v[j+1] = sup;
        }
    }
 }   
}

int pesquisaBinaria (int v[], int n, int valor){
    int esq = 0;
    int dir = n-1;
    int comparacoes = 0;
    while (esq <= dir){
        int meio = (esq + dir)/2;
        comparacoes++;
        if(v[meio] == valor){
            printf("Comparacoes: %d\n", comparacoes);
            return meio;
        } if(v[meio] < valor) {
            esq = meio + 1;
        } else{
            dir = meio - 1;
        }
    }
    printf("Comparacoes: %d\n", comparacoes);
    return -1;
}
int main(void) {
    int v[] = {1,15,14,7,8,9,2,4,3,6,5,11,10,12,13};
    int n = sizeof(v) / sizeof(v[0]);
    int compSeq = buscaSequencial(v, n, 12);
    printf("Sequencial: %d comparacoes\n", compSeq);
    ordenarVetor(v, n);
    printf("Vetor ordenado: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", v[i]);
    }
    printf("\n");
    int posicao = pesquisaBinaria(v, n, 12);
    printf("Binaria: encontrado na posicao %d\n", posicao);
    return 0; 
}
/*
Compilar:  gcc exercicio_busca.c -o busca -Wall
Rodar:     ./busca
============================================================ */


/*
EXERCÍCIO EXTRA: Mostrar o passo a passo que ocorre dentro de buscaSequencial() & pesquisaBinaria():
buscaSequencial():
Começa a verificar se v[i] = valor procurado
1° passo: pergunta se v[0] = 12 ? -> false, comparações soma 1 (valor atual = 1)
2° passo: pergunta se v[1] = 12 ? -> false, comparações soma 1 (valor atual = 2)
3° passo: pergunta se v[2] = 12 ? -> false, comparações soma 1 (valor atual = 3)
4° passo: pergunta se v[3] = 12 ? -> false, comparações soma 1 (valor atual = 4)
5° passo: pergunta se v[4] = 12 ? -> false, comparações soma 1 (valor atual = 5)
6° passo: pergunta se v[5] = 12 ? -> false, comparações soma 1 (valor atual = 6)
7° passo: pergunta se v[6] = 12 ? -> false, comparações soma 1 (valor atual = 7)
8° passo: pergunta se v[7] = 12 ? -> false, comparações soma 1 (valor atual = 8)
9° passo: pergunta se v[8] = 12 ? -> false, comparações soma 1 (valor atual = 9)
10° passo: pergunta se v[9] = 12 ? -> false, comparações soma 1 (valor atual = 10)
11° passo: pergunta se v[10] = 12 ? -> false, comparações soma 1 (valor atual = 11)
12° passo: pergunta se v[11] = 12 ? -> false, comparações soma 1 (valor atual = 12)
13° passo: pergunta se v[12] = 12 ? -> false, comparações soma 1 (valor atual = 13)
14° passo: pergunta se v[13] = 12 ? -> true, comparações soma 1 (valor atual = 14), encerra o programa e retorna comparacoes = 14.

pesquisaBinaria():
recebe o vetor ordenado de ordenarvetor() e começa a busca binaria:
1° passo: verifica se esq <= dir -> true, define o meio ((0 + 14)/2), contabliza essa comparação (contagem atual = 1), verifica se valor está antes, depois ou no meio definido (caso (valor no meio: 7), (valor:12)), define novo meio: esq <- meio + 1
2° passo: verifica se esq <= dir -> true, define o meio ((8 + 14)/2), contabliza essa comparação (contagem atual = 2), verifica se valor está antes, depois ou no meio definido (caso (valor no meio: 12), (valor:12)), encerra busca pois meio == valor, retorna comparações e posição do valor buscado dentro do vetor
============================================================ */
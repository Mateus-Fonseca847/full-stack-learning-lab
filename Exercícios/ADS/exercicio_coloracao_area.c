/* ============================================================
   AEDI - Parte 3 - Merge de Vetores (Diferenca de Conjuntos)
   ============================================================

   ENUNCIADO (conforme passado em aula):
   Dados dois vetores ordenados V1[n] e V2[m], onde os tamanhos
   n e m devem ser lidos do usuario, e os vetores devem ser
   preenchidos pelo usuario de forma ORDENADA, construir um
   vetor final V3 ordenado por meio da DIFERENCA entre V1 e V2,
   ou seja: V3 tera todos os elementos de V1 que NAO estejam
   presentes em V2 (a reciproca nao e verdadeira: elementos so
   de V2 nao entram em V3). Ao final, imprimir todos os
   elementos de V3.

   O QUE JA ESTA PRONTO:
   - leitura de n, m e dos elementos de V1 e V2 (o programa
     confia que o usuario digita em ordem crescente, como pede
     o enunciado)
   - impressao de V1, V2 e V3

   O QUE VOCE PRECISA FAZER:
   - completar a funcao diferencaConjuntos(), que deve percorrer
     V1 e V2 simultaneamente (como um merge) e copiar para V3
     apenas os elementos de V1 que nao aparecem em V2.

   Dica (do guia de estudos, Parte 3):
     i percorre V1, j percorre V2, k é o proximo indice livre de V3.
     Enquanto i < n e j < m:
         Se V1[i] < V2[j]  -> copia V1[i] para V3, avanca i
         Se V1[i] > V2[j]  -> avanca j (nao copia nada)
         Se V1[i] == V2[j] -> avanca i e j (nao copia nada)
     Quando o laco acabar, se sobrou "cauda" em V1 (i < n),
     copie o restante de V1 direto para V3.

   Compilar:  gcc exercicio_merge.c -o merge -Wall
   Rodar:     ./merge
   ============================================================ */

#include <stdio.h>

#define MAX 50

void imprimeVetor(const char *nome, int v[], int tam) {
    printf("%s = [ ", nome);
    for (int i = 0; i < tam; i++) printf("%d ", v[i]);
    printf("]\n");
}

int lerVetorOrdenado(int v[], const char *nomeVetor) {
    int tam;
    printf("Quantos elementos tera o vetor %s? ", nomeVetor);
    scanf("%d", &tam);
    printf("Digite os %d elementos de %s EM ORDEM CRESCENTE:\n", tam, nomeVetor);
    for (int i = 0; i < tam; i++) {
        printf("%s[%d] = ", nomeVetor, i);
        scanf("%d", &v[i]);
    }
    return tam;
}

/* ---------------------------------------------------------
   DIFERENCA DE CONJUNTOS: V3 = V1 - V2
   Preencha v3[] e retorne o tamanho final de V3.
   --------------------------------------------------------- */
int diferencaConjuntos(int v1[], int n, int v2[], int m, int v3[]) {
    int k = 0; // proximo indice livre em v3

    // TODO: implemente aqui a logica de tres casos descrita
    // no comentario no topo do arquivo (V1[i] < V2[j],
    // V1[i] > V2[j], V1[i] == V2[j]) usando dois indices i, j.

    // TODO: depois do laco principal, nao esqueca de copiar
    // para v3 o que sobrar de V1 (a "cauda"), caso i ainda
    // seja menor que n quando o laco parar.

    return k;
}

int main(void) {
    int v1[MAX], v2[MAX], v3[MAX];

    int n = lerVetorOrdenado(v1, "V1");
    int m = lerVetorOrdenado(v2, "V2");

    printf("\n--- Vetores lidos ---\n");
    imprimeVetor("V1", v1, n);
    imprimeVetor("V2", v2, m);

    int tamV3 = diferencaConjuntos(v1, n, v2, m, v3);

    printf("\n--- Resultado: V3 = V1 - V2 ---\n");
    imprimeVetor("V3", v3, tamV3);

    return 0;
}

#include <stdio.h>
#include <math.h>
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
============================================================ */
int lerVetor1(const char *nomeVetor, int v[]){
   int tamanho1;
   printf("Quantos elementos?(Máximo 50) ");
   scanf("%d", &tamanho1);
   printf("Digite os %d elementos de %s EM ORDEM CRESCENTE:\n", tamanho1, nomeVetor);
    for (int i = 0; i < tamanho1; i++) {
        scanf("%d", &v[i]);
   }
   return tamanho1;
}  
int lerVetor2(const char *nomeVetor, int v[]){
   int tamanho2;
   printf("E para o segundo vetor, qual será o tamanho?(Máximo 50) ");
   scanf("%d", &tamanho2);
   printf("Digite os %d elementos de %s EM ORDEM CRESCENTE:\n", tamanho2, nomeVetor);
    for (int i = 0; i < tamanho2; i++) {
        scanf("%d", &v[i]);
   }
   return tamanho2; 
}
int diferencaEntreVetores(int v1[],int v2[],int t1,int t2,int v3[]){
      int i = 0;
      int j = 0;
      int k = 0;
      while(i < t1 && j < t2){
         if (v1[i] < v2[j]){
            v3[k] = v1[i];
         i++;
         k++;
      } else if (v1[i] > v2[j]){
         v3[k] = v2[j];
         j++;
         k++;
      } else{
         i++;
         j++;
      }
   }
   while (i < t1){
      v3[k] = v1[i];
      k++;
      i++;
   }
   return k;
}
int main(){
int v1[50], v2[50], v3[50];
int n = lerVetor1("Vetor 1", v1);
int m = lerVetor2("Vetor 2", v2);
int t3 = diferencaEntreVetores(v1, v2, n, m, v3);
printf("V3 = [");
for (int idx = 0; idx < t3; idx++){
printf("%d, ", v3[idx]);
} 
printf("]\n");
return 0;
}

/*
Compilar:  gcc exercicio_merge.c -o merge -Wall
Rodar:     ./merge
*/

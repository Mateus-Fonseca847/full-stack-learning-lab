/* ============================================================
   AEDI - Parte 4 - Filas e Pilhas em Vetores
   ============================================================

   ENUNCIADO (conforme passado em aula):
   Implementar em C os algoritmos de ENFILA e DESENFILA (fila
   circular) e os algoritmos de PUSH e POP (pilha), para uma
   Fila e uma Pilha de 10 posicoes. Efetuar tambem os controles
   de fila/pilha cheia e vazia nos retornos das funcoes
   implementadas. Fazer a insercao e retirada de elementos
   dessas estruturas para verificar a corretude das
   implementacoes.
  ============================================================*/
  #include <stdio.h>

#define M 10 // tamanho "logico" da fila/pilha (posicoes 1..M, como no pseudocodigo do professor)

/* ---------------- FILA CIRCULAR ----------------
   Vetor declarado com M+1 posicoes: o indice 0 fica sempre vazio, sem uso.
   Assim os indices 1..M do vetor batem EXATAMENTE com o pseudocodigo do
   professor (que numera de 1 a m), sem precisar converter nada. */
int vetorFila[M + 1];
int f = 0; // frente (0 = fila vazia)
int r = 0; // retaguarda

int enfila(int k) {
    int prov = (r % M) + 1;
    if (prov != f) {
        r = prov;
        vetorFila[r] = k;
        if (f == 0) {
            f = 1;
        }
        return 0; // sucesso
    } else {
        return -1; // fila cheia
    }
}

int desenfila(int *valor) {
    if (f != 0) {
        *valor = vetorFila[f];
        if (f == r) {
            f = 0;
            r = 0; // esvaziou
        } else {
            f = (f % M) + 1;
        }
        return 0; // sucesso
    } else {
        return -1; // fila vazia
    }
}

/*
Mesma ideia: vetor com M+1 posicoes, indice 0 nunca usado, topo vai de 1 a M. */
int vetorPilha[M + 1];
int topo = 0; // 0 = pilha vazia

int push(int k) {
    if (topo < M) {
        topo = topo + 1;
        vetorPilha[topo] = k;
        return 0; // sucesso
    } else {
        return -1; // pilha cheia
    }
}

int pop(int *valor) {
    if (topo > 0) {
        *valor = vetorPilha[topo];
        topo = topo - 1;
        return 0; // sucesso
    } else {
        return -1; // pilha vazia
    }
}

int main(void) {
    printf("===== TESTE DA FILA CIRCULAR (capacidade = %d) =====\n", M);
    for (int i = 1; i <= M + 1; i++) { // tenta inserir M+1 (1 a mais do que cabe)
        int ok = enfila(i * 10);
        if (ok == 0) printf("Enfila(%d) -> OK\n", i * 10);
        else printf("Enfila(%d) -> FILA CHEIA\n", i * 10);
    }
    for (int i = 1; i <= M + 1; i++) { // tenta remover M+1 (1 a mais do que existe)
        int valor;
        int ok = desenfila(&valor);
        if (ok == 0) printf("Desenfila() -> removeu %d\n", valor);
        else printf("Desenfila() -> FILA VAZIA\n");
    }

    printf("\n===== TESTE DA PILHA (capacidade = %d) =====\n", M);
    for (int i = 1; i <= M + 1; i++) {
        int ok = push(i * 100);
        if (ok == 0) printf("Push(%d) -> OK\n", i * 100);
        else printf("Push(%d) -> PILHA CHEIA\n", i * 100);
    }
    for (int i = 1; i <= M + 1; i++) {
        int valor;
        int ok = pop(&valor);
        if (ok == 0) printf("Pop() -> removeu %d\n", valor);
        else printf("Pop() -> PILHA VAZIA\n");
    }

    return 0;
}


  /*============================================================
   Compilar:  gcc exercicio_filas_pilhas.c -o filaspilhas -Wall
   Rodar:     ./filaspilhas
   ============================================================ */


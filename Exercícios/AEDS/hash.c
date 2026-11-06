/*
 * Hashing em C (AEDS, P2): os 3 tratamentos de sinônimos do professor.
 * Compilar:  gcc hash.c -o hash -Wall
 * Rodar:     ./hash
 * Posições de 1..M (como nos slides). h(letra) = Pos(letra) mod 9 + 1.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define M 9

int h_letra(char c) { return (c - 'A' + 1) % 9 + 1; }

/* função de multiplicação do slide 8: h(k) = (k*b mod R) mod M + 1 */
long h_mult(long k, long b, long R, long mm) { return (k * b % R) % mm + 1; }

/* ============ 1) Encadeamento exterior ============ */
typedef struct nodo { char c; struct nodo *prox; } Nodo;
Nodo *Vext[M + 1];

Nodo *ext_busca(char k, int *comp) {
    Nodo *p = Vext[h_letra(k)]; *comp = 0;
    while (p) { (*comp)++; if (p->c == k) return p; p = p->prox; }
    return NULL;
}
void ext_insere(char k) {
    int c; if (ext_busca(k, &c)) return;
    Nodo *p = malloc(sizeof *p); p->c = k;
    int i = h_letra(k); p->prox = Vext[i]; Vext[i] = p;      /* insere no início da lista */
}

/* ============ 2) Encadeamento interior (listas coligadas) ============ */
char Vint[M + 1]; int Pint[M + 1]; int n_int = 0;            /* ' ' = livre; prox 0 = fim */

int proximo_livre(void) { for (int j = M; j >= 1; j--) if (Vint[j] == ' ') return j; return 0; }
int int_busca(char k, int *ant, int *comp) {                  /* devolve posição ou 0 */
    int p = h_letra(k); *comp = 0; *ant = p;
    for (;;) {
        (*comp)++;
        if (Vint[p] == k) return p;
        if (Pint[p] == 0) break;
        *ant = p; p = Pint[p];
    }
    *ant = p;                                                 /* último nó da cadeia */
    return 0;
}
void int_insere(char k) {
    int ant, c;
    if (int_busca(k, &ant, &c) || n_int >= M) return;
    if (Vint[ant] == ' ') Vint[ant] = k;                      /* endereço-base livre */
    else { int j = proximo_livre(); Vint[j] = k; Pint[ant] = j; }
    n_int++;
}

/* ============ 3) Endereçamento aberto (sondagem linear circular) ============ */
char Vab[M + 1]; int n_ab = 0;

int ab_busca(char k, int *comp) {
    int p = h_letra(k); *comp = 1;
    while (Vab[p] != ' ' && Vab[p] != k) { p = p % M + 1; (*comp)++; }
    return Vab[p] == k ? p : 0;
}
int ab_insere(char k) {
    int c, p = h_letra(k);
    if (ab_busca(k, &c)) return 1;
    if (n_ab >= M - 1) return 0;                              /* regra do slide: n < M-1 */
    while (Vab[p] != ' ') p = p % M + 1;
    Vab[p] = k; n_ab++; return 1;
}

int main(void) {
    const char *chaves = "ALGORITM";                          /* 8 chaves distintas */
    memset(Vint, ' ', sizeof Vint); memset(Vab, ' ', sizeof Vab);
    for (const char *s = chaves; *s; s++) { ext_insere(*s); int_insere(*s); ab_insere(*s); }

    int tot, c, ant;
    printf("h(letra) = Pos mod 9 + 1:"); for (const char *s = chaves; *s; s++) printf(" %c=%d", *s, h_letra(*s)); printf("\n\n");

    printf("1) Encadeamento exterior\n"); tot = 0;
    for (int i = 1; i <= M; i++) { printf("  %d:", i); for (Nodo *p = Vext[i]; p; p = p->prox) printf(" %c", p->c); printf("\n"); }
    for (const char *s = chaves; *s; s++) { ext_busca(*s, &c); tot += c; }
    printf("  NC = %d/8 = %.3f\n\n", tot, tot / 8.0);

    printf("2) Encadeamento interior\n"); tot = 0;
    for (int i = 1; i <= M; i++) printf("  %d: %c  prox=%d\n", i, Vint[i], Pint[i]);
    for (const char *s = chaves; *s; s++) { int_busca(*s, &ant, &c); tot += c; }
    printf("  NC = %d/8 = %.3f\n\n", tot, tot / 8.0);

    printf("3) Endereçamento aberto\n"); tot = 0;
    for (int i = 1; i <= M; i++) printf("  %d: %c\n", i, Vab[i]);
    for (const char *s = chaves; *s; s++) { ab_busca(*s, &c); tot += c; }
    printf("  NC = %d/8 = %.3f\n\n", tot, tot / 8.0);

    printf("Função de multiplicação (R=2^16, M=613, b=31415821), k=1..10:");
    for (long k = 1; k <= 10; k++) printf(" %ld", h_mult(k, 31415821L, 65536L, 613L));
    printf("\n");
    return 0;
}

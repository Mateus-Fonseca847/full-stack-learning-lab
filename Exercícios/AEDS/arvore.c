/*
 * Árvores binárias e ABB em C (AEDS, P2).
 * Compilar:  gcc arvore.c -o arvore -Wall
 * Rodar:     ./arvore
 * Cobre: inserção/busca em ABB, percursos (recursivos e iterativos),
 *        altura, contagem de nós, ADPB e número de ABBs (Catalão).
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct no *Arv;
struct no { char chave[8]; Arv le, ld; };

/* ---------- ABB ---------- */
Arv novo(const char *k) {
    Arv p = malloc(sizeof *p);
    strcpy(p->chave, k); p->le = p->ld = NULL;
    return p;
}

/* Inserção top-down (iterativa, como no slide, sem nó terminal) */
Arv insere(Arv t, const char *k) {
    Arv p = t, f = NULL;
    while (p && strcmp(p->chave, k) != 0) { f = p; p = strcmp(k, p->chave) < 0 ? p->le : p->ld; }
    if (p) return t;                         /* já existe: não duplica */
    p = novo(k);
    if (!t) return p;
    if (strcmp(k, f->chave) < 0) f->le = p; else f->ld = p;
    return t;
}

/* Busca devolvendo o número de comparações de chave */
Arv busca(Arv t, const char *k, int *comp) {
    *comp = 0;
    while (t) {
        (*comp)++;
        int c = strcmp(k, t->chave);
        if (c == 0) return t;
        t = c < 0 ? t->le : t->ld;
    }
    return NULL;
}

/* ---------- percursos recursivos ---------- */
void pre(Arv p)  { if (p) { printf("%s ", p->chave); pre(p->le);  pre(p->ld); } }
void in(Arv p)   { if (p) { in(p->le);  printf("%s ", p->chave); in(p->ld); } }
void pos(Arv p)  { if (p) { pos(p->le); pos(p->ld); printf("%s ", p->chave); } }

/* ---------- percursos iterativos ---------- */
#define MAX 256
void pre_iter(Arv t) {                       /* pilha: empilha direita, depois esquerda */
    Arv pilha[MAX]; int topo = 0;
    if (t) pilha[topo++] = t;
    while (topo) {
        Arv p = pilha[--topo]; printf("%s ", p->chave);
        if (p->ld) pilha[topo++] = p->ld;
        if (p->le) pilha[topo++] = p->le;
    }
}
void in_iter(Arv t) {                        /* desce pela esquerda, visita, vai à direita */
    Arv pilha[MAX]; int topo = 0; Arv p = t;
    while (p || topo) {
        while (p) { pilha[topo++] = p; p = p->le; }
        p = pilha[--topo]; printf("%s ", p->chave); p = p->ld;
    }
}
void nivel(Arv t) {                          /* fila */
    Arv fila[MAX]; int f = 0, r = 0;
    if (t) fila[r++] = t;
    while (f < r) {
        Arv p = fila[f++]; printf("%s ", p->chave);
        if (p->le) fila[r++] = p->le;
        if (p->ld) fila[r++] = p->ld;
    }
}

/* ---------- medidas ---------- */
int altura(Arv p) { if (!p) return 0; int a = altura(p->le), b = altura(p->ld); return 1 + (a > b ? a : b); }
int conta(Arv p)  { return p ? 1 + conta(p->le) + conta(p->ld) : 0; }

/* ---------- ADPB: árvore de decisão da pesquisa binária ---------- */
Arv adpb(char v[][8], int e, int d) {
    if (e > d) return NULL;
    int i = (e + d) / 2;
    Arv p = novo(v[i - 1]);
    p->le = adpb(v, e, i - 1);
    p->ld = adpb(v, i + 1, d);
    return p;
}
void parenteses(Arv p) {                     /* (raiz (esq) (dir)) */
    if (!p) return;
    printf("(%s", p->chave);
    parenteses(p->le); parenteses(p->ld);
    printf(")");
}

/* ---------- número de ABBs distintas: T(n) = soma T(i) T(n-1-i) ---------- */
long numero_abbs(int n) {
    long T[32] = {1};
    for (int m = 1; m <= n; m++) { T[m] = 0; for (int i = 0; i < m; i++) T[m] += T[i] * T[m - 1 - i]; }
    return T[n];
}

int main(void) {
    const char *signos[] = {"CAP","AQU","PEI","ARI","TOU","GEM","CAN","LEA","VIR","LIB","ESC","SAG"};
    Arv t = NULL;
    for (int i = 0; i < 12; i++) t = insere(t, signos[i]);

    printf("ABB dos signos (n=%d, altura=%d)\n", conta(t), altura(t));
    printf("pré-ordem (rec):   "); pre(t);       printf("\n");
    printf("pré-ordem (iter):  "); pre_iter(t);  printf("\n");
    printf("in-ordem  (rec):   "); in(t);        printf("\n");
    printf("in-ordem  (iter):  "); in_iter(t);   printf("  <- chaves ordenadas\n");
    printf("pós-ordem (rec):   "); pos(t);       printf("\n");
    printf("em nível:          "); nivel(t);     printf("\n");

    int c; busca(t, "LIB", &c); printf("busca LIB: %d comparações\n", c);
    printf("busca XXX: %s\n", busca(t, "XXX", &c) ? "achou" : "não achou");

    char v[9][8] = {"B","D","H","K","M","P","R","T","V"};
    Arv d = adpb(v, 1, 9);
    printf("ADPB de B D H K M P R T V: "); parenteses(d); printf("  (altura %d)\n", altura(d));

    printf("número de ABBs distintas T(n):");
    for (int n = 0; n <= 7; n++) printf(" %ld", numero_abbs(n));
    printf("\n");
    return 0;
}

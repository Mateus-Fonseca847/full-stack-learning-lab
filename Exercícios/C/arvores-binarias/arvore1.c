#include <stdio.h>
#include <stdlib.h>
#define MAX 100

typedef char Chave;

typedef struct No {
  Chave chave;
  struct No *le, *ld;
} No;

No *fila[MAX];
int inicio = 0;
int fim = 0;

void enfila(No *p) {
    fila[fim] = p;      // guarda o endereço na posição livre
    fim = fim + 1;      // o fim anda uma casa para frente
}

No *desenfila(void) {
    No *p = fila[inicio];   // pega o primeiro da fila
    inicio = inicio + 1;    // o início anda uma casa para frente
    return p;
}
int filaVazia(void) {
  return inicio == fim;            // verdadeiro quando inicio e fim são iguais
}
// função para criar um novo nó
No *novoNo(Chave c) {
  No *p = malloc(sizeof(No)); // reserva espaço para um nó
  if (p == NULL) return NULL; // se não tem memoria, desiste
  p->chave = c;              // guarda a chave recebida
  p->le = NULL;                 // ainda sem filho esquerdo
  p->ld = NULL;                 // ainda sem filho direito
  return p;                     // devolve o endereço do nó
}

void pre_ordem(No *p) {
    if (p != NULL) {
        printf("%c ", p->chave);   // 1. visita este nó
        pre_ordem(p->le);          // 2. a subárvore esquerda inteira
        pre_ordem(p->ld);          // 3. a subárvore direita inteira
    }
}

void in_ordem(No *p) {
  if(p != NULL){
    in_ordem(p->le); 
    printf("%c ", p->chave);
    in_ordem(p->ld);
}
}

void pos_ordem(No *p){
  if (p!= NULL){
  pos_ordem(p->le);
  pos_ordem(p->ld);
  printf("%c ", p->chave);
  }
}

void niveis(No *raiz) {
    enfila(raiz);
    while (!filaVazia()) {          
        No *p = desenfila();                        
        printf("%c ", p->chave);                  
        if (p->le != NULL) enfila(p->le);             
        if (p->ld != NULL) enfila(p->ld);             
    }
}


int main (void){
  //cria novos nós usando a função novo Nó
  No *a = novoNo ('A');
  No *b = novoNo('B');
  No *c = novoNo('C');
  No *d = novoNo('D');
  No *e = novoNo('E');
  No *f = novoNo('F');
  No *g = novoNo('G');


  a->le = b;
  b->le = d;
  b->ld = e;
  e->le = g;
  a->ld = c;
  c->ld = f;

  printf("%c ", a->chave);          // raiz
  printf("%c ", a->le->chave);      // filho esquerdo da raiz 
  printf("%c ", a->ld->chave);      // filho direito da raiz
  printf("%c ", a->ld->ld->chave);  // filho direito do filho direito da raiz
  printf("%c ", a->le->le->chave);  // filho direito do filho direito da raiz
  printf("%c ", a->le->ld->chave);  // filho direito do filho direito da raiz
  printf("\n");
  pre_ordem(a);
  printf("\n");
  in_ordem(a);
  printf("\n");
  pos_ordem(a);
  printf("\n");
  niveis(a);
  return 0;
}


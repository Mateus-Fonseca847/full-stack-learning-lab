# Respostas — Lista 11: Acesso ao meio: divisão de canal, aleatório e revezamento

Lista: [`listas/lista-11.md`](../listas/lista-11.md) · Aula: [`aulas/11-acesso-ao-meio.md`](../aulas/11-acesso-ao-meio.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L4 q.1)*

> O que é enlace de broadcast?

Enlace em que **vários nós transmissores e receptores compartilham o mesmo canal** (ex.: Ethernet com hub, Wi-Fi).

## 2. *(P1·L4 q.2)*

> Quais problemas os protocolos de controle de acesso buscam resolver?

**Coordenar** o acesso ao canal compartilhado, decidir **quem transmite**, e definir **o que fazer em caso de colisão**.

## 3. *(P1·L4 q.3)*

> Quais são os requisitos desejáveis em um protocolo de acesso?

Um nó sozinho usa a **vazão máxima R**; com *x* nós ativos cada um tem **R/x**; deve ser **descentralizado**; e **simples** (barato de implementar).

## 4. *(P1·L4 q.4)*

> Cite e explique as categorias de protocolos de acesso múltiplo.

**Divisão de canal** (TDM/FDM: fatias fixas de tempo ou frequência), **acesso aleatório** (transmite quando quer; colisão → espera aleatória e retransmite) e **revezamento** (seleção e passagem de permissão: só fala quem tem a vez).

## 5. *(P1·L4 q.5)*

> O que é multiplexação? E, num protocolo de divisão de canal, o que é um canal de comunicação?

Multiplexar é **compartilhar um meio** entre várias comunicações. O **canal** é a **fatia** do meio (de tempo ou de frequência) reservada a um par de nós.

## 6. *(P1·L4 q.7)*

> Explique o conceito de TDM e FDM.

**TDM** divide o **tempo** em intervalos; cada nó usa o canal inteiro no seu intervalo. **FDM** divide a **banda** em faixas de frequência; cada nó usa a sua faixa o tempo todo.

## 7. *(P1·L4 q.8)*

> Por que é necessário utilizar as técnicas de modulação e filtragem no FDM?

A **modulação** desloca cada sinal para uma **portadora diferente** (senão todos ocupariam a mesma faixa); os **filtros** separam e limitam cada faixa, evitando que uma invada a vizinha.

## 8. *(P1·L4 q.9)*

> Diferencie TDM síncrono e TDM assíncrono ou estatístico.

**Síncrono:** slot **fixo** para cada nó, mesmo sem dados (desperdício). **Assíncrono/estatístico:** slots só para quem **tem dados**, com identificação do dono (melhor aproveitamento).

## 9. *(P1·L4 q.10)*

> Qual é a filosofia dos protocolos de acesso aleatório?

Não há reserva: o nó **transmite quando quer** à taxa cheia; se há **colisão**, os nós esperam um **tempo aleatório independente** e retransmitem.

## 10. *(P1·L4 q.11)*

> Qual a principal diferença entre os protocolos Aloha e CSMA?

O **Aloha** transmite **sem olhar o canal**; o **CSMA escuta a portadora** antes e só transmite se estiver livre.

## 11. *(P1·L4 q.12)*

> Explique o funcionamento do protocolo Slotted Aloha. Qual a sua diferença em relação ao Aloha?

Quadros de tamanho L; tempo dividido em **intervalos de L/R**; os nós **só começam no início de um intervalo** (sincronizados); em colisão retransmitem depois com probabilidade/tempo aleatório. Diferença: o Aloha puro **não sincroniza**, tem o **dobro de período vulnerável** (eficiência máxima ≈ 18% no Aloha puro contra ≈ 37% no slotted).

## 12. *(P1·L4 q.13)*

> Explique o funcionamento do protocolo CSMA/CD. Qual a sua diferença em relação ao CSMA?

Escuta antes e **durante** a transmissão; ao detectar colisão, **aborta imediatamente** e espera um tempo aleatório (backoff exponencial na Ethernet). No CSMA puro, os quadros em colisão **continuam até o fim**.

## 13. *(P1·L4 q.14)*

> Quais os dois tipos de protocolos de revezamento?

**Seleção (polling)** e **passagem de permissão (token)**.

## 14. *(P1·L4 q.15)*

> Quais as vantagens e desvantagens dos protocolos de seleção?

**Vantagens:** elimina colisões e intervalos vazios. **Desvantagens:** **atraso de seleção**; um nó sozinho não atinge R; o **mestre é ponto único de falha**.

## 15. *(P1·L4 q.16)*

> Como funcionam os protocolos de passagem de permissão? Qual o seu principal problema?

Um **token** circula; **só quem o possui transmite**, depois o repassa. Problema: se um **enlace se rompe** ou o nó **dono do token falha**, o token se perde e a rede para (precisa de recuperação do token).

## 16.

> Rode `praticas/slotted_aloha.js`. Para N = 20 nós, qual valor de *p* maximiza a eficiência e qual é ela? O que acontece com *p* muito alto?

O melhor é **p = 1/N = 0,05**, com eficiência ≈ **0,37 (1/e)**. Com *p* alto quase todo intervalo tem **colisão** (eficiência → 0); com *p* baixo, muitos intervalos ficam **vazios**.

## 17.

> Num barramento de 10 Mbps, a estação A e a estação C escutam o canal livre e transmitem quase ao mesmo tempo. Descreva o que ocorre em **CSMA** e em **CSMA/CD**.

Por causa do **atraso de propagação**, nenhuma ouviu a outra: **colisão**. No **CSMA** as duas transmitem **os quadros inteiros** (desperdício) e depois esperam tempo aleatório. No **CSMA/CD** elas **detectam** a colisão enquanto transmitem, **abortam** e reenviam após **backoff aleatório**.

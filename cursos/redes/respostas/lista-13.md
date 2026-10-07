# Respostas — Lista 13: Hub, bridge, switch e domínios

Lista: [`listas/lista-13.md`](../listas/lista-13.md) · Aula: [`aulas/13-hub-bridge-switch.md`](../aulas/13-hub-bridge-switch.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L5 q.11)*

> Diferencie domínio de colisão e domínio de broadcast.

**Domínio de colisão:** segmento lógico em que quadros transmitidos podem **colidir**. **Domínio de broadcast:** conjunto de dispositivos que **recebem todo broadcast** originado em qualquer um deles.

## 2. *(P1·L5 q.12)*

> Qual a principal modificação trazida pela norma IEEE 802.1d?

O **Spanning Tree Protocol (STP)**: permite redes comutadas com **caminhos redundantes sem formar loops**, ativando/desativando caminhos automaticamente.

## 3. *(P1·L5 q.13)*

> Explique as duas formas de operação usadas por switches.

**Store-and-forward:** recebe o quadro inteiro, confere o CRC e só então encaminha (descarta com erro). **Cut-through:** começa a encaminhar assim que lê o **MAC de destino** (menor latência, pode propagar erros).

## 4. *(P1·L5 q.14)*

> Qual a diferença no funcionamento de hubs e switches?

**Hub** (camada 1) repete o sinal em **todas as portas**, único domínio de colisão, banda dividida. **Switch** (camada 2) aprende MACs e encaminha **só para a porta do destino**, com domínio de colisão por porta, banda dedicada e buffers.

## 5.

> Quantos **domínios de colisão** e **domínios de broadcast** existem em cada rede: (a) 8 PCs ligados a um hub; (b) 8 PCs ligados a um switch; (c) dois switches (8 PCs cada) ligados entre si; (d) o caso (c) com cada switch numa VLAN distinta.

(a) **1 colisão, 1 broadcast**. (b) **8 colisão** (um por porta), **1 broadcast**. (c) **17 colisão** (16 PCs + 1 enlace entre switches), **1 broadcast**. (d) mesmos domínios de colisão (17), mas **2 de broadcast** (um por VLAN).

## 6.

> Um switch com 4 portas (A na 1, B na 2, C na 3, D na 4), tabela vazia. Descreva o que ele faz e como fica a tabela após: (1) A→B, (2) B→A, (3) C→broadcast, (4) D→A.

(1) A→B: aprende **A=p1**; B desconhecido → **flooding** (p2, p3, p4). (2) B→A: aprende **B=p2**; A conhecido → envia **só pela p1**. (3) C→broadcast: aprende **C=p3**; envia a **todas** as outras. (4) D→A: aprende **D=p4**; envia **só pela p1**. Tabela final: A=1, B=2, C=3, D=4.

## 7.

> Num switch, um quadro unicast chega pela porta 2 com destino a um MAC que a tabela associa **à própria porta 2**. O que o switch faz? E se o destino não estiver na tabela?

**Descarta** (*filtragem*: o destino está do mesmo lado). Se o destino é **desconhecido**, faz **flooding** por todas as portas menos a de entrada.

## 8.

> Quando é preferível um **hub** a um switch? E por que, mesmo assim, o switch é o padrão hoje?

Hub: **baixo custo**, **baixa latência crítica**, **aplicações simples** e **analisadores de rede** (precisam ver todo o tráfego). O switch é o padrão porque **dedica banda por porta**, elimina colisões (full-duplex) e dá isolamento/segurança.

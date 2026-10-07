# Respostas — Lista 03: Modelos de referência: OSI, TCP/IP, IEEE e ITU-T

Lista: [`listas/lista-03.md`](../listas/lista-03.md) · Aula: [`aulas/03-modelos-de-referencia.md`](../aulas/03-modelos-de-referencia.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L2 q.18)*

> Explique como é a comunicação entre as diferentes camadas em um mesmo sistema e entre sistemas diferentes no modelo OSI.

**No mesmo sistema:** cada camada só conversa com a **vizinha**, por uma **interface** (serviços/primitivas, via SAP). **Entre sistemas:** a camada *n* conversa **virtualmente** com a camada *n* do outro lado, seguindo o **protocolo** da camada; fisicamente os dados **descem** a pilha (cada camada **acrescenta seu cabeçalho** — encapsulamento), cruzam o meio e **sobem** a pilha do destino (cada camada retira o seu).

## 2. *(P1·L2 q.19)*

> Quantas e quais são as camadas do modelo OSI? Quais as suas principais funções?

**7:** Física (bits no meio), Enlace (quadros, erro, fluxo, acesso ao meio), Rede (roteamento), Transporte (fim a fim), Sessão (diálogo, token, sincronização), Apresentação (sintaxe/semântica), Aplicação.

## 3. *(P1·L2 q.20)*

> Compare os modelos OSI e TCP/IP.

**Comum:** pilhas de camadas independentes; transporte e aplicação. **Diferenças:** OSI tem 7 camadas e mais encapsulamento; TCP/IP tem 4 e é mais fácil de adaptar. Na camada de **rede**, o OSI admite **com e sem conexão**, o TCP/IP só **sem conexão** (IP). No TCP/IP, **sessão e apresentação** estão dentro da aplicação. OSI foi criticado por **momento ruim, camadas vazias e implementações pesadas**.

## 4. *(P1·L2 q.21)*

> Quantas e quais são as camadas do modelo TCP/IP? Quais as suas principais funções?

**4:** **Intra-rede** (host/rede: envio de pacotes pelo meio), **Inter-rede** (IP: roteamento sem conexão), **Transporte** (TCP confiável, UDP sem conexão) e **Aplicação**. (No modelo híbrido: 5 camadas, separando Enlace e Física.)

## 5. *(P1·L2 q.22)*

> Compare os modelos OSI e IEEE.

O **IEEE (802)** cobre **apenas física e enlace**, e divide o enlace em **LLC** e **MAC**; o **OSI** descreve a pilha inteira, com enlace único. O IEEE detalha **tecnologias de LAN/MAN** (802.3, 802.5, 802.11).

## 6. *(P1·L2 q.23)*

> Quantas e quais são as camadas do modelo IEEE? Quais as suas principais funções?

**Física** e **Enlace**, esta dividida em **LLC** (multiplexação, controle de erro e de fluxo) e **MAC** (controle de acesso ao meio).

## 7. *(P1·L2 q.24)*

> Descreva a arquitetura de redes em planos do ITU-T.

Três planos: **transporte/dados** (leva os dados do usuário), **controle/sinalização** (sinalização e roteamento que controlam o plano de dados) e **gerência** (coleta falhas e desempenho dos demais).

## 8. *(P1·L3 q.2)*

> Descreva as principais funções de cada camada, no modelo OSI.

Ver tabela da aula 03: Física (transmissão de bits), Enlace (quadros, erros, fluxo, MAC), Rede (roteamento, congestionamento), Transporte (fim a fim), Sessão (diálogo/token/sincronização), Apresentação (sintaxe/semântica), Aplicação (serviços ao usuário).

## 9.

> Em que camada do modelo OSI atua cada item: (a) CRC do quadro Ethernet, (b) endereço IP, (c) hub, (d) TCP, (e) endereço MAC, (f) conector RJ-45, (g) HTTP, (h) switch.

(a) **Enlace**; (b) **Rede**; (c) **Física**; (d) **Transporte**; (e) **Enlace** (subcamada MAC); (f) **Física**; (g) **Aplicação**; (h) **Enlace**.

## 10.

> Monte a sequência de **encapsulamento** de um dado de aplicação até virar bits, indicando o nome da PDU em cada camada.

Aplicação: **dados/mensagem** → Transporte: **segmento** (TCP) ou datagrama (UDP) → Rede: **pacote** → Enlace: **quadro** (cabeçalho + trailer/CRC) → Física: **bits**.

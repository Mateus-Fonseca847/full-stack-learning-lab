# Respostas — Lista 02: Comutação de circuitos, pacotes e mensagens

Lista: [`listas/lista-02.md`](../listas/lista-02.md) · Aula: [`aulas/02-comutacao.md`](../aulas/02-comutacao.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L2 q.10)*

> O que é comutação? Por que é usada?

É o processo de estabelecer uma **conexão temporária** entre dois ou mais terminais, feito pelos **comutadores**. É usada porque ligar tudo a todos (malha) é inviável: o número de enlaces cresce com n².

## 2. *(P1·L2 q.11)*

> Compare comutação de circuitos e comutação de pacotes, indicando as principais vantagens e desvantagens.

| | Circuitos | Pacotes |
|---|---|---|
| Caminho | dedicado, reservado | compartilhado, sob demanda |
| Vantagens | recursos e taxa garantidos; sem processamento nos nós | uso eficiente do meio; ideal para dados; erro recuperado no enlace |
| Desvantagens | desperdício de banda; bloqueio; setup | sem garantia de banda/atraso/jitter; overhead; filas |

## 3. *(P1·L2 q.12)*

> Que tipo de informação é trocada durante cada uma das fases da comunicação na comutação de circuitos?

**Estabelecimento:** sinalização (endereço do destino, reserva de banda/rota/buffer). **Transferência:** os **dados** do usuário, em taxa constante. **Encerramento:** sinalização para **liberar** os recursos.

## 4. *(P1·L2 q.13)*

> Para que serve o cabeçalho dos pacotes? Que tipo de informação ele contém?

Carrega a **informação de controle** para encaminhar e tratar o pacote: **endereço de destino (e origem)**, rota ou nº do circuito virtual, número de sequência, tamanho, controle de erro. Gera **overhead**.

## 5. *(P1·L2 q.14)*

> Quais são indicadores de desempenho usados na comutação de circuitos e na comutação de pacotes? Compare-os.

**Circuitos:** tempo de estabelecimento e **probabilidade de bloqueio** (taxa é garantida). **Pacotes:** **atraso** (processamento + fila + transmissão + propagação), **jitter**, **perda** e vazão — **não há bloqueio**, mas há degradação.

## 6. *(P1·L2 q.15)*

> Explique a comutação de datagramas.

Cada pacote é roteado **independentemente** pelo **endereço de destino completo**; pode chegar fora de ordem; os nós **não guardam estado**; serviço **não orientado à conexão** (ex.: **IP**).

## 7. *(P1·L2 q.16)*

> Explique a comutação de circuitos virtuais.

Simula um circuito numa rede de pacotes: primeiro se estabelece um caminho (**não dedicado**), e os pacotes são roteados por um **número de circuito virtual** (identificador local, menor que um endereço) consultando uma **tabela de tradução**. Orientado à conexão; se um enlace falha, o circuito se desfaz (MPLS, ATM, Frame Relay).

## 8. *(P1·L2 q.17)*

> Qual a diferença entre pacotes e células?

**Células** são pacotes **pequenos e de tamanho fixo** (ex.: ATM, 53 B): permitem comutação por hardware, menor atraso e melhor gerência de buffers, ao custo de **maior overhead** de cabeçalho. Pacotes têm tamanho variável.

## 9.

> Uma mensagem de **24.000 bits** atravessa **4 enlaces** de **2 Mbps** (ignore propagação e processamento). Calcule o tempo total (a) enviando a mensagem inteira em cada salto e (b) dividindo-a em **4 pacotes de 6.000 bits**.

(a) 4 × (24.000/2.000.000) = 4 × 12 ms = **48 ms**. (b) Tempo de 1 pacote por enlace = 6.000/2.000.000 = 3 ms; total = (nº de pacotes + enlaces − 1) × 3 ms = (4 + 4 − 1) × 3 = **21 ms**. A fragmentação permite **pipeline**.

## 10.

> Dentre voz ao vivo, transferência de arquivos e e-mail, qual aplicação se beneficia mais de comutação de circuitos? Justifique e diga qual problema os circuitos virtuais tentam resolver.

**Voz ao vivo**: exige taxa constante e atraso/jitter baixos, e seus silêncios desperdiçam pouca banda. Arquivos e e-mail toleram atraso e geram rajadas (pacotes). **Circuitos virtuais** tentam dar a aplicações como voz/vídeo as **garantias de um circuito** dentro de uma rede de pacotes.

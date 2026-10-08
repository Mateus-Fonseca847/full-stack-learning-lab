# Lista 02 — Comutação de circuitos, pacotes e mensagens

Aula: [`aulas/02-comutacao.md`](../aulas/02-comutacao.md) · Respostas: [`respostas/lista-02.md`](../respostas/lista-02.md)

[← Lista 01](lista-01.md) · [Índice](../README.md) · [Lista 03 →](lista-03.md)

> Tente resolver **no papel** antes de abrir o gabarito.

## Questões das listas da professora

1. *(P1·L2 q.10)* O que é comutação? Por que é usada?

R= 
Comutação é uma decisão de arquitetura que escolhe como a informação vai viajar do remetente até o destinatário, onde a comutação de pacotes é a mais eficiente para dados e a comutação de circuitos é a mais eficiente para aúdio. Por quê esses sistemas otimizam a troca de informações entre remetentes e destinatários, o sistema de comutação possibilita a troca de informações por meios mais ágeis e seguros

2. *(P1·L2 q.11)* Compare comutação de circuitos e comutação de pacotes, indicando as principais vantagens e desvantagens.

R =
Comutação de circuitos {
- Possui 3 fases: Estabelecimentos -> Transferencia de dados -> encerramento
- Reserva um circuito todo para seu uso individual, por frequencia ou por tempo. (Frequencia assegura canais simultaneos que não se relacionam e tempo assegura o uso total do canal enquanto o usuario precisa.).
- Garante recursos e taxa constante, só você usa o circuito, não há competição durante o uso.
- Competição só na fase de conexão, caso exceda o limite, o usuário deve ter de aguardar até conseguir se conectar em um canal.
- Desperdício de banda durante o silencio
}
Comutação de pacotes {
- Quem está em silencio não o ocupa a rede, garante um uso otimizado do meio
- Erros que ocorrem durante o enlace podem ser recuperados (a mensagem percorre caminhos diferentes, por isso, se a mensagem chega incompleta, é possível refazer apenas o trecho perdido)
- Sem garantia de banda, você concorre com todos do meio pela velocidade de transmissão
- Cabeçalho da mensagem consome parte da capacidade
- Em cada roteador há uma nova fila e uma nova decisão
}

3. *(P1·L2 q.12)* Que tipo de informação é trocada durante cada uma das fases da comunicação na comutação de circuitos?

R=
Estabelecimento: sinalização, com o pedido de conexão (endereço do destino) e a reserva de banda, rota e buffer, mais a confirmação.
Transferência de dados: os dados do usuário (ex.: a voz), numa taxa constante.
Encerramento: sinalização para desfazer a conexão e liberar os recursos.

4. *(P1·L2 q.13)* Para que serve o cabeçalho dos pacotes? Que tipo de informação ele contém?

R =  
Serve para definir o id & endereço final daquele dado enviado no caso de datagramas & + o caminho todo que o pacote vai percorrer no caso de circuito virtual (itinerario de onibus)

5. *(P1·L2 q.14)* Quais são indicadores de desempenho usados na comutação de circuitos e na comutação de pacotes? Compare-os.

R = 
Comutação de pacotes{
- Taxa de perda
- Vazão
- Atraso
}
Comutação de circuitos{
- Tempo de conexão
- Quantidade de canais
- Probabilidade de bloqueio
}
6. *(P1·L2 q.15)* Explique a comutação de datagramas.

R =
Divide o pacote de mensagem em vários caminhos diferentes, cada pacote possui o endereço de destino completo em seu cabeçalho. Pode chegar fora de ordem e perder uma parte da mensagem no caminho

7. *(P1·L2 q.16)* Explique a comutação de circuitos virtuais.

R = 
Envia todos os pacotes seguidos por um só caminho, como um itinerario de onibus. O pacote sempre chega em ordem, possui um identificador de endereço unico e curto. Em caso de falha no enlace, toda a mensagem é perdida.

8. *(P1·L2 q.17)* Qual a diferença entre pacotes e células?

A célula é um pacote pequeno de tamanho fixo, otimizada para manusear e fácil de automatizar seu circuito. Células diminuem filas, facilitam a gerencia de buffer e tem menor chance de erro por unidade. Em unidades de celula pequenas, pode acontecer overhead.

## Exercícios extras de fixação

9. Uma mensagem de **24.000 bits** atravessa **4 enlaces** de **2 Mbps** (ignore propagação e processamento). Calcule o tempo total (a) enviando a mensagem inteira em cada salto e (b) dividindo-a em **4 pacotes de 6.000 bits**.

10. Dentre voz ao vivo, transferência de arquivos e e-mail, qual aplicação se beneficia mais de comutação de circuitos? Justifique e diga qual problema os circuitos virtuais tentam resolver.

R =
A  comutação de circuitos é ideal para o sistema de voz ao vivo, pois separa um canal exclusivo durante toda a comunicação, não há a possibilidade de perda de mensagem durante o tráfego entre enlaces e a única chance de espera em fila é durante a conexão
---

**Legenda das fontes:** `P1·L1`…`P1·L5` = listas da P1 (partes 1 a 5) · `extra` = exercício de fixação criado para o curso

# Lista 03 — Modelos de referência: OSI, TCP/IP, IEEE e ITU-T

Aula: [`aulas/03-modelos-de-referencia.md`](../aulas/03-modelos-de-referencia.md) · Respostas: [`respostas/lista-03.md`](../respostas/lista-03.md)

[← Lista 02](lista-02.md) · [Índice](../README.md) · [Lista 04 →](lista-04.md)

> Tente resolver **no papel** antes de abrir o gabarito.

## Questões das listas da professora

1. *(P1·L2 q.18)* Explique como é a comunicação entre as diferentes camadas em um mesmo sistema e entre sistemas diferentes no modelo OSI.

R=
No mesmo sistema: cada camada se comunica apenas com a camada adjacente (vizinha), por meio de uma interface. Entre cada par de camadas adjacentes existe uma interface, onde estão definidas as operações primitivas e os serviços que a camada inferior oferece à superior. Na interface, a entidade da camada N+1 passa uma IDU (Interface Data Unit) para a entidade da camada N, através do SAP (ponto de acesso ao serviço). Assim, a camada N é fornecedora de serviço para a N+1, que é a usuária.

Entre sistemas diferentes: a camada n de uma máquina se comunica com a camada n da outra máquina seguindo o protocolo daquela camada, que é o acordo de como se dará a comunicação entre as partes. Essa comunicação é virtual: o caminho real dos dados desce pelas camadas da máquina de origem, cruza o meio físico e sobe pelas camadas da máquina de destino. Na descida, cada camada acrescenta o seu cabeçalho (tipo uma etiqueta na header, o enlace acrescenta também um trailer[uma cauda, serve pra segurança]). Na subida, cada camada retira o seu.

2. *(P1·L2 q.19)* Quantas e quais são as camadas do modelo OSI? Quais as suas principais funções?

R =
Modelo OSI possui 7 camadas.
Modelo OSI{
  Física: trata das transmissões de bits pelo meio físico.
  Enlace: divide os dados em frames e faz controle de fluxo (impede que o emissor sobrecarregue o receptor)
  Rede: Define todo caminho dos dados, trata gargalos e congestionamento 
  Transporte: Define que a entrega vai acontecer em ordem e com confiança
  Sessão: Permite que usuários diferentes estabeleçam uma sessão. Faz gerencia das atividades deles(Gerencia de tokens, sincronização e controle de dialogo[quem transmite e quando])
  Apresentação: Trata a sintaxe dos dados e permite a comunicação inter-computadores mesmo com formas diferentes de se comunicar.
  Aplicação: São as aplicações que o usuário vai precisar
}

3. *(P1·L2 q.20)* Compare os modelos OSI e TCP/IP.

R=
Pontos em comum:
os dois são pilhas de protocolos com camadas independentes e possuem camadas de transporte e de aplicação.  
Diferenças:
- Camadas: o OSI tem 7 (física, enlace, rede, transporte, sessão, apresentação, aplicação); o TCP/IP tem 4 (intra-rede, inter-rede, transporte, aplicação), pois a aplicação engloba sessão e apresentação, e a intra-rede engloba física e enlace.
- Camada de rede: no OSI há serviço com e sem conexão; no TCP/IP é apenas sem conexão (IP).

4. *(P1·L2 q.21)* Quantas e quais são as camadas do modelo TCP/IP? Quais as suas principais funções?

R =
O modelo TCP/IP possui 4 camadas
Modelo TCP/IP{
  Intra-rede: equivale as camadas fisicas do enlace do OSI, permite o envio de pacotes pela rede local
  Inter-rede: equivale a camada de rede do modelo OSI, interliga redes sem conexão e permite inserir pacotes em qualquer rede. Usa sempre o protocolo IP e funciona semelhante aos Correios
  Transporte: Igua ao transporte do OSI, faz a comunicação fim a fim (do TCP[Transfer Control Protocol] com o UDP[User Datagram Protocol])
  Aplicação: equivale às camadas de sessão, apresentação e aplicação do OSI, e funciona de forma similar à aplicação do OSI.
}

4. *(P1·L3 q.2)* Descreva as principais funções de cada camada, no modelo OSI.

R=
O modelo OSI, baseado em uma proposta da ISO e primeiro modelo de referência, tem 7 camadas (de baixo para cima):

1. Física: trata da transmissão dos bits pelo meio físico. Garante que um bit 1 enviado pelo transmissor seja recebido como 1. Define a voltagem e o tempo de duração de um bit, e a quantidade de pinos do conector e a finalidade de cada um.
2. Enlace: transforma um canal de transmissão bruto em uma linha que parece livre de erros. Divide os dados em quadros (frames), pode ter confirmação de entrega (ACK), faz controle de fluxo (impede que o transmissor sobrecarregue o receptor) e tratamento de erros. Em redes de difusão, faz o controle de acesso ao meio.
3. Rede: controla a operação da sub-rede. Determina como os pacotes serão roteados até o destino (rotas estáticas e dinâmicas), trata gargalos e controle de congestionamento, cuida da qualidade de serviço (retardo, jitter, instabilidade), trata diferentes tipos de endereçamento entre redes e a diferença de tamanho de pacotes.
4. Transporte: é a verdadeira camada fim a fim. A entrega pode ser em ordem e com confiança.
5. Sessão: permite que usuários de máquinas diferentes estabeleçam uma sessão. Faz controle de diálogo (quem transmite e quando), gerência de token (evita que duas partes executem ao mesmo tempo uma operação crítica) e sincronização (permite que a transmissão parta de onde parou).
6. Apresentação: trata da sintaxe e da semântica dos dados e permite a comunicação entre computadores com formas diferentes de representar dados.
7. Aplicação: contém as aplicações necessárias aos usuários.

## Exercícios extras de fixação

9. Em que camada do modelo OSI atua cada item: (a) CRC do quadro Ethernet, (b) endereço IP, (c) hub, (d) TCP, (e) endereço MAC, (f) conector RJ-45, (g) HTTP, (h) switch.

10. Monte a sequência de **encapsulamento** de um dado de aplicação até virar bits, indicando o nome da PDU em cada camada.

---

**Legenda das fontes:** `P1·L1`…`P1·L5` = listas da P1 (partes 1 a 5) · `extra` = exercício de fixação criado para o curso

# Lista 08 — Superframe, IFS e quadro 802.11

Aula: [`aulas/08-ifs-e-quadro-80211.md`](../aulas/08-ifs-e-quadro-80211.md) · Respostas: [`respostas/lista-08.md`](../respostas/lista-08.md)

[← Lista 07](lista-07.md) · [Índice](../README.md) · [Lista 09 →](lista-09.md)

> Tente resolver **no papel** antes de abrir o gabarito.

## Questões das listas da professora

1. *(P2·Wi-Fi q.27)* Descreva o superframe usado nas redes wifi.

2. *(P2·Wi-Fi q.28)* O que é SIFS? Qual a sua função?

3. *(P2·Wi-Fi q.29)* O que é PIFS? Qual a sua função?

4. *(P2·Wi-Fi q.30)* O que é EIFS? Qual a sua função?

5. *(P2·Wi-Fi q.33)* Faça um esquema descrevendo o quadro IEEE802.11, identificando seus campos.

6. *(P2·Wi-Fi q.34)* Para que serve o campo duração? Exemplifique.

7. *(P2·Wi-Fi q.35)* Por que existem 4 campos de endereço? Explique cada um.

8. *(P2·Wi-Fi q.37)* Por que existe o campo de controle de quadro? Quais informações esse campo leva?

9. *(P2·Wi-Fi q.38)* Como um equipamento identifica a versão do padrão IEEE802.11 usado?

10. *(P2·Wi-Fi q.39)* Como é feita a diferenciação entre quadros de dados, controle e gerenciamento?

11. *(P2·Wi-Fi q.40)* Quais são os principais quadros de controle? Descreva-os.

12. *(P2·Wi-Fi q.41)* Como é indicado se um quadro de controle é um CTS ou RTC?

13. *(P2·Wi-Fi q.42)* Como é possível saber se o emissor do quadro é um AP ou não?

## Exercícios extras de fixação

14. Calcule os campos Duração de um RTS e de um CTS para um quadro de 1500 B a 54 Mbps, com CTS e ACK de 14 B a 6 Mbps e SIFS = 16 µs (ignore o preâmbulo).

15. Com SIFS = 16 µs e slot = 9 µs, calcule PIFS e DIFS.

16. Preencha End. 1, 2 e 3 de um quadro enviado por um notebook (SA) a um servidor cabeado (DA) via AP (BSSID), e da resposta do servidor ao notebook.

17. Qual o tamanho do cabeçalho do quadro 802.11 sem e com o 4º endereço, e o tamanho máximo do quadro?

18. Qual IFS é usado para: ACK, beacon no CFP, quadro de dados no CP e retransmissão após quadro defeituoso?

---

**Legenda das fontes:** `P2·Wi-Fi` = lista de Wi-Fi (a `lista de exercícios wifi p3`, com as mesmas 50 questões da p2) · `P2·PON` = `lista pon` · `P2·L2` = lista da P2, parte 2 (Metro Ethernet) · `P2·Óptica` = lista de redes óticas e DWDM · `extra` = exercício de fixação criado para o curso

# Lista 12 — Ethernet: MAC, ARP e o quadro

Aula: [`aulas/12-ethernet-mac-arp.md`](../aulas/12-ethernet-mac-arp.md) · Respostas: [`respostas/lista-12.md`](../respostas/lista-12.md)

[← Lista 11](lista-11.md) · [Índice](../README.md) · [Lista 13 →](lista-13.md)

> Tente resolver **no papel** antes de abrir o gabarito.

## Questões das listas da professora

1. *(P1·L5 q.1)* Qual o nome técnico das redes ethernet?

2. *(P1·L5 q.2)* Quais as camadas previstas pelo modelo de redes IEEE? Descreva as suas principais funções.

3. *(P1·L5 q.3)* O que é endereço MAC? Descubra o MAC da sua máquina.

4. *(P1·L5 q.4)* O que é o ARP? Como funciona?

5. *(P1·L5 q.5)* Desenhe um quadro ethernet e descreva cada um dos seus campos.

6. *(P1·L5 q.6)* Para que serve o preâmbulo no quadro ethernet, uma vez que seu padrão é pré-estabelecido?

7. *(P1·L5 q.7)* Por que são enviados os endereços de origem e de destino?

8. *(P1·L5 q.8)* Para que é usado o campo tipo (ToS) no quadro ethernet?

9. *(P1·L5 q.9)* Qual a MTU das redes ethernet?

10. *(P1·L5 q.10)* Qual o tamanho do campo de dados do quadro ethernet? O que deve ser feito caso o pacote a ser encapsulado não esteja dentro dos limites?

## Exercícios extras de fixação

11. Calcule o tamanho total de um quadro Ethernet (sem preâmbulo) que carrega (a) 1500 bytes de dados, (b) 20 bytes de dados. E a eficiência (dados úteis ÷ quadro) em cada caso.

12. A estação A (192.168.0.1) quer enviar dados para C (192.168.0.3) e nunca falou com ela. Escreva, em ordem, os quadros trocados no nível ARP, com MAC de destino de cada um.

13. No Wireshark (ou terminal): rode `arp -a`, faça `ping` para outro IP da rede, rode `arp -a` de novo. Que diferença aparece? Qual valor de *EtherType* identifica IPv4 e ARP?

---

**Legenda das fontes:** `P1·L1`…`P1·L5` = listas da P1 (partes 1 a 5) · `P2·L2` = lista da P2 (STP/VLAN/Metro Ethernet) · `P2·Wi-Fi`, `P2·Óptica` = listas de Wi-Fi e de redes óticas · `P2·Docx` = lista da P2 em Word (STP, TRILL, ATM, Frame Relay, PDH, SDH) · `extra` = exercício de fixação criado para o curso

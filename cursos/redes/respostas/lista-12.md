# Respostas — Lista 12: Ethernet: MAC, ARP e o quadro

Lista: [`listas/lista-12.md`](../listas/lista-12.md) · Aula: [`aulas/12-ethernet-mac-arp.md`](../aulas/12-ethernet-mac-arp.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L5 q.1)*

> Qual o nome técnico das redes ethernet?

**IEEE 802.3**.

## 2. *(P1·L5 q.2)*

> Quais as camadas previstas pelo modelo de redes IEEE? Descreva as suas principais funções.

**Física** (bits/sinais) e **Enlace**, dividida em **LLC** (multiplexação, controle de erro e fluxo) e **MAC** (controle de acesso ao meio e endereçamento físico).

## 3. *(P1·L5 q.3)*

> O que é endereço MAC? Descubra o MAC da sua máquina.

Endereço **físico de 48 bits** da interface, em hexadecimal, **único**; 24 bits identificam o **fabricante** e 24 a **placa**. Para descobrir: `ipconfig /all` (Windows) ou `ip link` / `ifconfig` (Linux). *(Resposta pessoal.)*

## 4. *(P1·L5 q.4)*

> O que é o ARP? Como funciona?

Protocolo que **traduz IP em MAC**. O nó consulta a **tabela ARP**; se não achar, envia **ARP Query em broadcast** (“quem tem o IP X?”), e quem tem responde em **unicast** com seu MAC; o resultado entra na tabela (com expiração).

## 5. *(P1·L5 q.5)*

> Desenhe um quadro ethernet e descreva cada um dos seus campos.

```
| Preâmbulo 8 | Dest 6 | Orig 6 | Tipo 2 | Dados 46–1500 | CRC 4 |
```
**Preâmbulo:** sincroniza e sinaliza o início; **Destino/Origem:** MACs; **Tipo:** protocolo de rede dos dados (multiplexação); **Dados:** pacote encapsulado; **CRC:** detecção de erro.

## 6. *(P1·L5 q.6)*

> Para que serve o preâmbulo no quadro ethernet, uma vez que seu padrão é pré-estabelecido?

Justamente por ser conhecido, serve para **alertar o receptor**, **sincronizar seu relógio** com o do transmissor e marcar (os dois últimos bits `11`) o **início do quadro**.

## 7. *(P1·L5 q.7)*

> Por que são enviados os endereços de origem e de destino?

O **destino** permite que cada placa decida se o quadro é para ela (e para os switches encaminharem); a **origem** diz a quem responder e permite que **switches aprendam** MAC → porta.

## 8. *(P1·L5 q.8)*

> Para que é usado o campo tipo (ToS) no quadro ethernet?

Para **multiplexar protocolos de rede**: indica a qual protocolo (IP, ARP, IPX...) entregar os dados. *(Nome técnico: **EtherType**; o **ToS** é um campo do cabeçalho IP.)*

## 9. *(P1·L5 q.9)*

> Qual a MTU das redes ethernet?

**1500 bytes.**

## 10. *(P1·L5 q.10)*

> Qual o tamanho do campo de dados do quadro ethernet? O que deve ser feito caso o pacote a ser encapsulado não esteja dentro dos limites?

**46 a 1500 bytes.** Maior que 1500 → **fragmentar**. Menor que 46 → **padding** (bytes de enchimento); o receptor descarta o excesso usando o **campo de comprimento do pacote**.

## 11.

> Calcule o tamanho total de um quadro Ethernet (sem preâmbulo) que carrega (a) 1500 bytes de dados, (b) 20 bytes de dados. E a eficiência (dados úteis ÷ quadro) em cada caso.

Cabeçalho (6+6+2) + CRC 4 = **18 bytes**. (a) 1500 + 18 = **1518 B**; eficiência 1500/1518 ≈ **98,8%**. (b) 20 B de dados são **completados até 46** (padding) → quadro mínimo **64 B**; eficiência 20/64 ≈ **31%**.

## 12.

> A estação A (192.168.0.1) quer enviar dados para C (192.168.0.3) e nunca falou com ela. Escreva, em ordem, os quadros trocados no nível ARP, com MAC de destino de cada um.

1) **ARP Request**: origem A, destino **FF-FF-FF-FF-FF-FF** (broadcast): “quem tem 192.168.0.3?”. 2) **ARP Reply** de C para A, destino = **MAC de A** (unicast): “192.168.0.3 está em MAC-C”. 3) A grava IP→MAC na tabela e envia o **quadro de dados** com destino MAC-C. (C também aprendeu o MAC de A pela consulta.)

## 13.

> No Wireshark (ou terminal): rode `arp -a`, faça `ping` para outro IP da rede, rode `arp -a` de novo. Que diferença aparece? Qual valor de *EtherType* identifica IPv4 e ARP?

Surge uma **nova entrada IP→MAC** (resultado do ARP). EtherType: **0x0800** = IPv4 e **0x0806** = ARP.

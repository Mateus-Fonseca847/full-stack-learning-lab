# Aula 12 — Ethernet: endereço MAC, ARP e o quadro Ethernet

> Base: *Aula 10 – Ethernet* (1ª parte). Lista: [`listas/lista-12.md`](../listas/lista-12.md)

## 1. Ethernet = IEEE 802.3

O **nome técnico** das redes Ethernet é **IEEE 802.3**. Originalmente desenvolvido por Digital, Intel e Xerox; usa **CSMA/CD** como controle de acesso ao meio.

| Nome | Taxa |
|---|---|
| Ethernet | 10 Mbps |
| Fast Ethernet | 100 Mbps |
| Gigabit Ethernet | 1 Gbps |
| 10 Gigabit Ethernet | 10 Gbps |

Mídias: coaxial (10BASE2, 10BASE5), **par trançado (10BASE-T, 100BASE-TX, 1000BASE-T)**, fibra (10BASE-F e sucessores).

### Camadas IEEE (resumo)
- **Física** (PHY): sinais e meio.
- **Enlace**, dividida em duas subcamadas:
  - **LLC (802.2):** multiplexação de protocolos de rede, **controle de erro e de fluxo** (opcionais).
  - **MAC:** **controle de acesso ao meio** (CSMA/CD no 802.3) e **endereçamento físico**.

## 2. Endereço MAC

- **MAC (Media Access Control)** é o **endereço físico de 48 bits** da interface de rede, em hexadecimal: `02-0B-CD-EC-02-26` (ou `02:0B:CD:EC:02:26`).
- **24 primeiros bits:** identificam o **fabricante** (OUI); **24 restantes:** número da placa (atribuído pelo fabricante). Identificação **única** da interface.
- **Broadcast:** `FF-FF-FF-FF-FF-FF` (todos os bits em 1).

**Descubra o MAC da sua máquina:**
```bash
# Windows
ipconfig /all          # campo "Endereço Físico"
# Linux
ip link               # ou: ifconfig
# macOS
ifconfig en0 | grep ether
```

## 3. ARP — Address Resolution Protocol

Traduz **endereço de rede (IP)** → **endereço de enlace (MAC)**. Necessário porque o quadro Ethernet precisa do MAC de destino, mas as aplicações conhecem o IP.

**Como funciona** (A quer falar com C; A só sabe o IP de C):

```
1. A consulta sua TABELA ARP (IP → MAC, com tempo de expiração). Não achou.
2. A envia um ARP Query em BROADCAST (destino FF-FF-FF-FF-FF-FF):
        "Quem tem o IP 192.168.0.3?"   (inclui o IP e o MAC de A)
3. Todos recebem; só quem tem esse IP (C) responde.
4. A resposta é UNICAST (direto para o MAC de A): "Eu tenho, meu MAC é 66-AB-F9-1A-B1".
5. A guarda IP→MAC na tabela ARP (com timer). Agora monta o quadro.
```

- A tabela ARP **expira** entradas (timeout), por isso a rede aprende de novo se algo mudar.
- Pergunta da aula: *depois dessa conversa, como estão as tabelas ARP de B e C?* **C** aprendeu o IP/MAC de A (veio na consulta); **B** viu a consulta em broadcast, mas não era o alvo, então normalmente **não** guarda nada.
- O ARP **não tem autenticação** → vulnerável a **ARP spoofing** (aula 16).

```bash
arp -a        # mostra a tabela ARP (Windows, Linux, macOS)
```

## 4. O quadro Ethernet

```
┌───────────┬─────────┬─────────┬──────┬───────────────┬─────┐
│ Preâmbulo │ End.    │ End.    │ Tipo │ Dados         │ CRC │
│  8 bytes  │ destino │ origem  │2 B   │ 46 a 1500 B   │ 4 B │
│           │  6 B    │  6 B    │      │               │     │
└───────────┴─────────┴─────────┴──────┴───────────────┴─────┘
```

| Campo | Tamanho | Função |
|---|---|---|
| **Preâmbulo** | 8 B | 7 bytes `10101010` + 1 byte `10101011`. Os 7 primeiros **alertam o receptor e sincronizam seu relógio** com o do transmissor; os **2 últimos bits (11)** avisam que **o que vem a seguir é o endereço de destino** |
| **Endereço de destino** | 6 B | MAC do adaptador destino; se não for o seu (nem broadcast/multicast), a placa **descarta** o quadro |
| **Endereço de origem** | 6 B | MAC de quem enviou |
| **Tipo** | 2 B | **multiplexa protocolos de rede**: diz a quem entregar os dados (IP, ARP, IPX, AppleTalk...) |
| **Dados** | 46–1500 B | carrega o pacote encapsulado (ex.: IP) |
| **CRC** | 4 B | detecta erro; cobre todos os campos **exceto o preâmbulo** |

> **Sobre o nome do campo Tipo:** na lista e nos slides ele aparece como "tipo (ToS)". O nome técnico do campo Ethernet é **EtherType** (ou *Length*, no 802.3 puro). **ToS (Type of Service) é outro campo, do cabeçalho IP.** Na prova, responda como a professora ensina, mas saiba a distinção.

### Perguntas clássicas

**Por que o preâmbulo existe, se o padrão é pré-estabelecido?** Justamente porque o padrão é conhecido: o receptor o usa para **detectar o início do quadro** e **sincronizar o clock** (corrigindo diferenças de velocidade entre origem e destino), e o `11` final avisa que os dados começam.

**Por que enviar os endereços de origem e de destino?** O **destino** permite que cada placa decida se o quadro é para ela (filtro) — essencial no meio compartilhado. A **origem** permite ao receptor saber **quem responder** e permite que **switches/bridges aprendam** em qual porta cada MAC está.

**MTU (Maximum Transmission Unit) da Ethernet:** **1500 bytes** (tamanho máximo do campo de dados).

**Tamanho do campo de dados e o que fazer se não couber:**
- **Máximo 1500 B** → se o pacote IP for maior, ele é **fragmentado** em partes que cabem em 1500 B.
- **Mínimo 46 B** → se for menor, são acrescentados **bytes de enchimento (padding)**. O receptor sabe distinguir pelo **campo de comprimento do pacote IP**: o excesso é descartado.
- Com cabeçalho (14 B) + CRC (4 B) o quadro vai de **64 a 1518 bytes** (sem contar o preâmbulo).

## 5. Pratique (5 minutos, com Wireshark ou terminal)

1. `arp -a` — veja sua tabela ARP.
2. `ping <IP de outra máquina da rede>` e rode `arp -a` de novo: a entrada nova aparece.
3. No Wireshark, filtre `arp` ou `eth`; identifique o *ARP Request* (destino `ff:ff:ff:ff:ff:ff`) e o *ARP Reply* (unicast). Abra um quadro e localize os campos: destino, origem, tipo (`0x0800` = IPv4, `0x0806` = ARP).

---

## Exercícios

Lista: [`listas/lista-12.md`](../listas/lista-12.md) — respostas: [`respostas/lista-12.md`](../respostas/lista-12.md)

---

## Resumo

- Ethernet = **IEEE 802.3**, CSMA/CD; enlace = **LLC + MAC**.
- **MAC:** 48 bits, 24 do fabricante + 24 da placa, único; broadcast = `FF-FF-FF-FF-FF-FF`.
- **ARP:** IP → MAC por *consulta em broadcast* e *resposta unicast*; tabela com expiração; sem autenticação.
- **Quadro:** Preâmbulo 8 | Dest 6 | Orig 6 | Tipo 2 | Dados 46–1500 | CRC 4. **MTU = 1500 B**; menos de 46 B → padding.

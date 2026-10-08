# Aula 15 — VLAN (802.1Q) e prioridade de quadros (802.1p)

> Base: *Aula 10 – Ethernet* (3ª parte). Lista: [`listas/lista-15.md`](../listas/lista-15.md)

## 1. Prioridade e QoS — IEEE 802.1p

Objetivos do 802.1p:
1. **Encaminhamento expresso de tráfego:** definir **prioridade no nível do quadro**;
2. **Filtro dinâmico multicast:** uso dinâmico de grupos de endereços MAC.

Define a **Classe de Serviço (CoS)**: um campo de **3 bits**, o **PCP (Priority Code Point)**, dentro do cabeçalho 802.1Q, com valor de **0 a 7** → **8 níveis** de prioridade. A prioridade é decidida **quadro a quadro**; cada PCP pode receber uma **disciplina de QoS** diferente. Visa melhorar a **qualidade de serviço (QoS)**.

**Mecanismos usados para implementar a priorização:**
- **filas separadas** por classe de prioridade;
- **algoritmos de filtragem/descarte** em caso de congestionamento (descartar primeiro o menos prioritário);
- **políticas de encaminhamento** específicas por prioridade (ex.: fila de prioridade estrita ou serviço ponderado).

## 2. VLAN — o que é

**VLAN (Virtual LAN)** é uma **topologia lógica** configurada sobre a topologia física: **segmenta a rede física** e controla a difusão de broadcast. Cria-se **várias LANs lógicas**, cada uma com seu **próprio domínio de broadcast**.

- Estações da **mesma VLAN** se comunicam; de **VLANs diferentes não** (a nível 2).
- Para **VLANs diferentes conversarem** é preciso um elemento que **conecte domínios de broadcast distintos**: um **roteador** (externo, "router-on-a-stick") ou um **switch de camada 3 (L3)**.

### Por que usar VLANs? (benefícios)
- **Administrar** grupos de estações por função, sem mexer em cabos (se a máquina muda de lugar, basta reconfigurar a VLAN);
- **Restringir o tráfego** entre redes virtuais (segurança/isolamento);
- **Reduzir domínios de broadcast** (desempenho);
- **Compatibilidade** com outros protocolos de acesso ao meio e fácil interoperabilidade com redes comutadas tradicionais (802.1D);
- Alternativa **econômica** a usar roteadores/sub-redes físicas.

**Por que o tráfego entre VLANs é isolado?** Cada VLAN é um domínio de broadcast separado e o switch **só encaminha quadros entre portas da mesma VLAN**. Sem uma função de camada 3 não há "ponte" entre elas.

### Contexto: por que só switch não resolve broadcast
Com switches, cada porta é um domínio de colisão de 1 nó, o que melhora o **unicast**; mas **todo o conjunto continua um único domínio de broadcast** (pode ter milhares de estações). A solução clássica seria **sub-redes + roteadores**; as VLANs oferecem o mesmo efeito dentro dos switches.

## 3. IEEE 802.1Q — a etiqueta (tag)

O 802.1Q acrescenta ao quadro Ethernet uma **tag de 32 bits (4 bytes)**, inserida entre o **endereço de origem** e o campo **Tipo**:

```
┌──────┬──────┬───────────────────────────┬──────┬───────┬─────┐
│ Dest │ Orig │ TAG 802.1Q (4 bytes)      │ Tipo │ Dados │ FCS │
└──────┴──────┴───────────────────────────┴──────┴───────┴─────┘
              │  TPID 16 bits │ PCP 3 │ CFI 1 │ VID 12 │
              │    0x8100     │ prior.│canôn. │ id VLAN│
```

| Campo | Bits | Função |
|---|---|---|
| **TPID** (Tag Protocol Identifier) | 16 | valor `0x8100`: indica que o quadro é **etiquetado** |
| **PCP** (802.1p) | 3 | **prioridade** (0–7) |
| **CFI / DEI** | 1 | indicador canônico (compatibilidade Token Ring) / elegível a descarte |
| **VID** (VLAN ID) | 12 | **identificador da VLAN**: 4096 valores (0 e 4095 reservados → 4094 VLANs úteis) |

- Só **bridges e switches** usam os campos VLAN; as **máquinas dos usuários não** precisam saber.
- Elementos de enlace trocam entre si apenas quadros com o **mesmo identificador de VLAN**.
- **Receptor:** no extremo de recepção a **tag é removida** e o quadro vai para a VLAN atribuída.
- Por ter 4 bytes a mais, o quadro etiquetado chega a **1522 bytes**.
- O 802.1Q também padroniza extensões para **Spanning Tree** (por VLAN), **QoS** e outros aspectos de redes comutadas.

### Tronco (trunk) e VLAN nativa
- **Porta de acesso:** conecta um host a **uma** VLAN; o quadro sai **sem tag**.
- **Tronco (trunk):** liga switches (ou switch–roteador) e **carrega várias VLANs** com tag.
- **VLAN nativa:** o 802.1Q **não etiqueta** os quadros da VLAN nativa; **todos os demais** quadros transmitidos e recebidos no tronco são etiquetados. **A mesma VLAN nativa deve ser configurada nos dois lados do tronco.**

## 4. Tipos de VLAN (baseadas em...)

| Baseada em | Camada | Como | Observação |
|---|---|---|---|
| **Portas** | 1 | cada porta do switch pertence a uma VLAN | simples; **reconfigura** se a máquina mudar de porta |
| **Endereço MAC** | 2 | MAC → VLAN | **não** precisa reconfigurar ao mudar de lugar; mas **difícil de escalar** (milhares de MACs a cadastrar) |
| **Protocolo** | 2 | tipo de protocolo (ex.: ARP numa VLAN, IPX em outra; o slide cita o campo "ToS") | segmenta por protocolo |
| **Sub-rede IP** | 3 | faixa de IP (ex.: 23.2.24.0/24 → VLAN 1) | roteamento em L3 é **mais lento** que encaminhar por MAC |
| **Camadas superiores** | 4+ | por aplicação/serviço (ex.: HTTP numa VLAN, FTP noutra) | |

## 5. Exemplo de configuração (Cisco IOS, só para ver a ideia)

```
vlan 10
 name VENDAS
vlan 20
 name TI
!
interface FastEthernet0/1
 switchport mode access
 switchport access vlan 10
!
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk native vlan 99
 switchport trunk allowed vlan 10,20
```

---

## Exercícios

Lista: [`listas/lista-15.md`](../listas/lista-15.md) — respostas: [`respostas/lista-15.md`](../respostas/lista-15.md)

---

## Resumo

- **802.1p:** PCP de **3 bits** → 8 classes de serviço (CoS 0–7), prioridade **quadro a quadro**.
- **VLAN:** LANs lógicas = **domínios de broadcast separados**; comunicação entre VLANs só via **roteador / switch L3**.
- **802.1Q:** tag de **4 bytes** (TPID `0x8100` + PCP 3 + CFI 1 + **VID 12**); tronco etiqueta tudo, **menos a VLAN nativa** (igual nos dois lados).
- VLAN por **porta (L1)**, **MAC (L2)**, **protocolo (L2)**, **IP (L3)**, **aplicação**.

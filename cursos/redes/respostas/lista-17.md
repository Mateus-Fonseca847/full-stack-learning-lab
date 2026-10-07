# Respostas — Lista 17: Metro Ethernet, Q-in-Q e MAC-in-MAC

Lista: [`listas/lista-17.md`](../listas/lista-17.md) · Aula: [`aulas/17-metro-ethernet.md`](../aulas/17-metro-ethernet.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P2·L2 q.7)*

> Considerando o modelo de conexão de referência, qual a utilização física e lógica das redes Metro Ethernet?

**Física:** infraestrutura (fibra, anéis, switches) da operadora que liga os sites dos clientes via **UNI**. **Lógica:** oferece **EVCs** (conexões virtuais) entre UNIs, como linhas dedicadas (E-Line) ou LAN estendida (E-LAN).

## 2. *(P2·L2 q.8)*

> Quais vantagens da Metro Ethernet em relação a outras tecnologias concorrentes?

Interface **Ethernet nativa** (sem conversão de protocolo), **custo menor**, **banda flexível e granular** (1 Mbps a 10 Gbps), provisionamento rápido, escalabilidade e suporte a **QoS/SLA**.

## 3. *(P2·L2 q.9)*

> Quais os tipos de interfaces propostas na arquitetura Metro Ethernet?

**UNI** (User-Network Interface: cliente ↔ operadora) e **NNI** (Network-Network Interface: entre redes/operadoras; E-NNI/I-NNI).

## 4. *(P2·L2 q.10)*

> O que é uma EVC?

**Ethernet Virtual Connection**: associação de **duas ou mais UNIs**; quadros só trafegam entre UNIs da mesma EVC.

## 5. *(P2·L2 q.11)*

> Quais as modalidades de EVC possíveis? Para que é usada cada uma?

**E-Line** (ponto a ponto: substitui linha dedicada/acesso à internet), **E-LAN** (multiponto: LAN virtual entre sites) e **E-Tree** (raiz + folhas, folhas não falam entre si: hub-and-spoke, IPTV).

## 6. *(P2·L2 q.12-13)*

> Em que nível de granularidade pode ser feita a caracterização do tráfego e quais parâmetros são usados?

Granularidade: por **UNI**, por **EVC** e por **EVC + CoS**. Parâmetros: **CIR, CBS, EIR, EBS** (e color mode/coupling flag).

## 7. *(P2·L2 q.14)*

> O que são classes de serviço (CoS)? Dê um exemplo de uso.

Classes de **tratamento** do tráfego. Ex.: **voz** com CoS de alta prioridade/baixo atraso, **dados críticos** em CoS intermediária e **melhor esforço** na mais baixa.

## 8. *(P2·L2 q.15)*

> Como são usados os recursos especificados nas normas IEEE 802.1q e 802.1p nas redes Metro Ethernet?

O **VID do 802.1Q** identifica a **EVC/serviço** (multiplexação de serviços por UNI); o **PCP do 802.1p** marca a **CoS** do quadro, mapeada em filas pela operadora.

## 9. *(P2·L2 q.16)*

> Quais atributos diferenciam uma rede Carrier Ethernet segundo o MEF? Explique-os resumidamente.

**Serviços padronizados**, **escalabilidade**, **confiabilidade** (proteção < 50 ms), **QoS** (SLAs) e **gerência de serviço** (OAM).

## 10. *(P2·L2 q.17-18)*

> Por que é necessário separar o tráfego dos usuários de uma rede Metro Ethernet? Quais as principais formas?

Para **privacidade/segurança**, **evitar conflito** de VLANs/MACs entre clientes e **escalar**. Formas: **VLAN 802.1Q**, **Q-in-Q (802.1ad)** com S-VLAN + C-VLAN, **MAC-in-MAC (802.1ah)** (e MPLS/VPLS).

## 11. *(P2·L2 q.19-20)*

> O que é VLAN de serviço (S-VLAN)? Como é feito o encapsulamento da C-VLAN?

**S-VLAN** é a tag **adicionada pela operadora** (TPID 0x88A8) que identifica o cliente/serviço. A **C-VLAN** é a tag **do cliente**, que **permanece intacta**: o quadro do cliente recebe a S-tag **por fora** (empilhada) e a perde na saída.

## 12. *(P2·L2 q.21)*

> Com a implementação do Q-in-Q (IEEE 802.1ad) é possível haver conflito de VLAN entre os vários usuários? Justifique.

**Não.** Vários clientes podem usar as mesmas C-VLANs porque a operadora encaminha pela **S-VLAN externa**, única por cliente/serviço.

## 13. *(P2·L2 q.22)*

> Qual problema é solucionado pela norma IEEE 802.1ah (MAC-in-MAC)?

A **explosão da tabela MAC** (no Q-in-Q a operadora aprende todos os MACs dos clientes) e o limite de **4094 serviços**. O PBB encapsula o quadro do cliente em MACs de backbone e usa **I-SID de 24 bits**.

## 14. *(P2·L2 q.23)*

> É possível implementar simultaneamente as normas IEEE 802.1ah e 802.1ad? Faça um esquema da solução.

**Sim.**
```
Cliente ──[C]──► Acesso Q-in-Q (802.1ad) ──[S|C]──► BEB ──[B-MAC|I-SID|S|C]──► Núcleo PBB (802.1ah)
```
Q-in-Q na rede de acesso e MAC-in-MAC no núcleo.

## 15. *(P2·L2 q.24)*

> Há interoperabilidade entre redes Ethernet padrão e: (a) 802.1Q, (b) Metro Ethernet, (c) 802.1ah, (d) 802.1ad?

**Sim, nos quatro casos**, por compatibilidade retroativa: a interface voltada ao cliente continua Ethernet padrão. Ressalva: as tags extras exigem suporte a **MTU maior** (1522 → 1526 B...).

## 16.

> Um cliente contrata CIR = 10 Mbps e EIR = 5 Mbps e envia 17 Mbps em regime. Como a rede trata o tráfego?

**10 Mbps verdes** (dentro do CIR, SLA garantido), **5 Mbps amarelos** (excesso até o EIR, entregues se houver folga) e **2 Mbps vermelhos** (acima do EIR, **descartados**).

# Aula 14 — Loops em redes Ethernet: STP e TRILL

> Base: *Aula 10 – Ethernet* (slides de Spanning Tree). A parte de **TRILL** não tem slides: foi escrita a partir da lista de exercícios e de conhecimento geral. Lista: [`listas/lista-14.md`](../listas/lista-14.md)

## 1. Por que loops são uma falha grave

Para dar **redundância** liga-se switches por mais de um caminho. Mas o **quadro Ethernet não tem TTL** (tempo de vida), então com um loop físico:

1. **Tempestade de broadcast:** broadcast/multicast/unicast desconhecido é **inundado** em todas as portas; num loop os quadros **circulam e se multiplicam indefinidamente**, consumindo toda a banda e CPU (rede inutilizável).
2. **Instabilidade da tabela MAC:** o mesmo MAC é "visto" chegando por portas diferentes, e a tabela fica **oscilando** (MAC flapping).
3. **Múltiplas cópias** do mesmo quadro chegam ao destino.

Solução: manter a **redundância física**, mas **desativar logicamente** os caminhos que formariam loop → **STP**.

## 2. STP — Spanning Tree Protocol (IEEE 802.1D)

Evita a formação de loops em redes comutadas e **ativa automaticamente caminhos alternativos** quando um enlace falha. Precisa estar habilitado em **todos** os switches; cada switch precisa conhecer a topologia.

### 2.1 Como funciona

**BPDU (Bridge PDU):** quadros trocados entre switches com informações como o **Bridge ID** e o **custo do caminho até a raiz**. Origem: MAC da porta; destino: **MAC multicast** da Spanning Tree.

Tipos de BPDU:
- **Configuration BPDU (CBPDU):** cálculo da árvore;
- **TCN (Topology Change Notification):** avisa mudanças de topologia;
- **TCA (TCN Acknowledgment):** confirmação.

**BID (Bridge ID)** = *prioridade* (padrão 32768) + *MAC do switch*. **Menor BID vence.**

**Três eleições:**

| # | Eleição | Critério |
|---|---|---|
| 1 | **Switch raiz (root bridge)** | o de **menor BID** |
| 2 | **Portas raiz (RP)** — uma por switch não-raiz | porta no caminho de **menor custo** até a raiz; empate → menor BID do vizinho; depois menor ID de porta |
| 3 | **Portas designadas (DP)** — uma por segmento | porta do switch com **menor custo até a raiz** naquele segmento |

As portas que **não são RP nem DP** ficam em **bloqueio** (recebem BPDUs, descartam dados, não aprendem MACs). **RP e DP** ficam em **encaminhamento**. Pronto: a árvore **convergiu**.

**Custo do segmento** depende da velocidade (padronizado pelo IEEE): em geral 10 Mbps = 100, 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2.

### 2.2 Exemplo resolvido
Três switches em triângulo, todos os enlaces de 100 Mbps (custo 19). BIDs: **A = 1**, **B = 2**, **C = 3**.

```
        A (raiz)
       /  \
   19 /    \ 19
     B ---- C
        19
```
1. **Raiz:** A (menor BID).
2. **Portas raiz:** B → link B–A (custo 19); C → link C–A (custo 19).
3. **Segmento B–C:** custo até a raiz via B = 19; via C = 19 → **empate** → vence o **menor BID (B)**: porta de B no link B–C é **designada**; a porta de C nesse link é **bloqueada**.
4. Resultado: C encaminha para B passando por A; o enlace B–C fica em **standby**. Se A–C cair, a porta bloqueada passa a encaminhar.

### 2.3 Estados das portas e tempos

| Estado | O que faz |
|---|---|
| **Blocking** | só recebe BPDUs |
| **Listening** | processa BPDUs; pode voltar ao bloqueio se surgir informação nova |
| **Learning** | começa a **aprender MACs** (monta tabela) |
| **Forwarding** | envia e recebe dados |
| **Disabled** | fora do STP (desligada pelo administrador) |

Para ir de Blocking a Forwarding passa por Listening e Learning: **20 s** (blocking→listening, max age) + **15 s** (listening→learning) + **15 s** (learning→forwarding) = até **50 segundos** para reconvergir após uma falha ou entrada de um novo dispositivo.

Se as BPDUs se perderem (timer estoura), uma porta bloqueada pode passar a encaminhar → **falha na spanning tree** (pode gerar loop).

### 2.4 Vantagens e desvantagens

| Vantagens | Desvantagens |
|---|---|
| elimina loops (evita tempestade de broadcast) | **convergência lenta** (até ~50 s); foi o motivo do **RSTP** |
| **redundância automática** (failover) | enlaces bloqueados ficam **ociosos** → desperdício de banda e **sem balanceamento** |
| simples, padronizado, "liga e funciona" | caminhos **subótimos** (tudo passa pela raiz) |
| | **sem autenticação** das BPDUs (ataque ao STP — aula 16) |

## 3. TRILL (RFC 6325) — sem slides, conteúdo complementar

**TRILL — Transparent Interconnection of Lots of Links:** protocolo que **traz roteamento (link-state) para dentro da camada 2**, mantendo a rede "transparente" para as VLANs/hosts. Foi criado para eliminar as limitações do STP.

**Alterações em relação à Ethernet tradicional:**
- Os switches viram **RBridges** (*Routing Bridges*).
- Usam um protocolo **link-state (IS-IS)** para descobrir a topologia e calcular **caminhos mais curtos**.
- O quadro original é **encapsulado** num **cabeçalho TRILL**, que contém os *nicknames* (identificadores de 16 bits) dos RBridges de **entrada (ingress)** e **saída (egress)** e um **hop count** (contador de saltos, que funciona como TTL).
- Em cada salto o quadro recebe um novo **cabeçalho Ethernet externo** (MAC de salto a salto).

**Como funciona (resumo):** o RBridge de entrada encapsula o quadro com o nickname do RBridge de saída e envia; os RBridges intermediários **roteiam pelo nickname** (decrementando o hop count); o RBridge de saída **desencapsula** e entrega o quadro original. Aprendizado de MAC só nas **bordas**.

| Vantagens | Desvantagens |
|---|---|
| **todos os enlaces ativos** (multi-caminho, ECMP) → usa toda a banda | exige **hardware/firmware** que suporte TRILL |
| **caminho mais curto** entre quaisquer dois pontos | **overhead** do cabeçalho extra |
| **hop count** evita loops infinitos | **complexidade** maior de operação |
| **convergência rápida** (link-state) | pouca adoção em relação a alternativas (ex.: SPB, VXLAN/EVPN) |
| compatível com bridges legadas nas bordas | |

**STP × TRILL:** STP **bloqueia** enlaces para formar uma árvore; TRILL **roteia** por todos eles.

---

## Exercícios

Lista: [`listas/lista-14.md`](../listas/lista-14.md) — respostas: [`respostas/lista-14.md`](../respostas/lista-14.md)

---

## Resumo

- Ethernet **não tem TTL** → loop = tempestade de broadcast + MAC flapping.
- **STP (802.1D):** elege **raiz** (menor BID), **portas raiz** (menor custo), **designadas**; o resto **bloqueia**. Estados: blocking → listening → learning → forwarding; ~**50 s**.
- Prós: sem loops + failover. Contras: lento, banda ociosa, sem autenticação.
- **TRILL:** RBridges + IS-IS + cabeçalho com **hop count** → multi-caminho, sem bloqueio.

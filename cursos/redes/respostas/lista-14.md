# Respostas — Lista 14: STP e TRILL

Lista: [`listas/lista-14.md`](../listas/lista-14.md) · Aula: [`aulas/14-stp-e-trill.md`](../aulas/14-stp-e-trill.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P2·L2 q.1)*

> Quais problemas fazem com que a criação de loops em redes Ethernet seja uma falha grave?

O quadro Ethernet **não tem TTL**: broadcasts e desconhecidos **circulam e se multiplicam** (**tempestade de broadcast**), a **tabela MAC fica instável** (flapping) e chegam **cópias duplicadas** ao destino.

## 2. *(P2·L2 q.2)*

> O que é o STP (Spanning Tree Protocol)?

Protocolo **IEEE 802.1D** que **evita loops** em redes comutadas, mantendo a redundância física e **bloqueando logicamente** os enlaces excedentes, reativando-os em caso de falha.

## 3. *(P2·L2 q.3)*

> Como funciona o STP?

Switches trocam **BPDUs** e fazem 3 eleições: **raiz** (menor BID), **portas raiz** (menor custo até a raiz) e **portas designadas** (por segmento). As demais **bloqueiam**. Estados: blocking → listening → learning → forwarding.

## 4. *(P2·L2 q.4)*

> Quais as vantagens e desvantagens do uso do STP?

**Vantagens:** elimina loops, redundância automática, simples. **Desvantagens:** convergência **lenta (até ~50 s)**, enlaces bloqueados ociosos (sem balanceamento), caminhos subótimos, **BPDUs sem autenticação**.

## 5. *(P2·Docx)*

> O que é TRILL? Quais alterações ele inclui na Ethernet tradicional e como funciona?

**TRILL** leva **roteamento link-state (IS-IS)** à camada 2. Switches viram **RBridges**; o quadro é **encapsulado** num cabeçalho TRILL com **nicknames** de ingress/egress e **hop count**, e roteado pelo caminho mais curto; só as bordas aprendem MACs.

## 6. *(P2·Docx)*

> Quais as vantagens e desvantagens do uso do TRILL?

**Vantagens:** **todos os enlaces ativos** (multi-caminho), caminho mais curto, **hop count** evita loops, convergência rápida. **Desvantagens:** exige **hardware compatível**, overhead de cabeçalho, mais complexidade e pouca adoção.

## 7.

> Quatro switches em quadrado: S1–S2, S2–S3, S3–S4, S4–S1, todos com enlaces de 100 Mbps (custo 19). Prioridades: S1 = 32768, S2 = 32768, **S3 = 4096**, S4 = 32768. Ordem dos MACs: S1 < S2 < S4. Determine a raiz, as portas raiz, as designadas e qual enlace fica bloqueado.

**Raiz:** **S3** (menor prioridade). **Portas raiz:** S2 (link S2–S3, custo 19) e S4 (link S4–S3, custo 19); S1 tem dois caminhos de custo 38 (via S2 ou via S4) → desempate pelo menor BID do vizinho: **S2** → porta raiz de S1 no link S1–S2. **Designadas:** S3 nos dois links dela; S2 no link S1–S2 (custo 19 < 38); S4 no link S1–S4. **Bloqueada: a porta de S1 no link S1–S4.**

## 8.

> Quanto tempo o STP pode levar para reconverger depois de uma falha? Que alternativa surgiu para reduzir isso?

Até **50 s**: 20 s (blocking→listening) + 15 s (listening→learning) + 15 s (learning→forwarding). A alternativa é o **RSTP (802.1w)**, de convergência rápida.

# Respostas — Lista 15: VLAN, 802.1Q e prioridade 802.1p

Lista: [`listas/lista-15.md`](../listas/lista-15.md) · Aula: [`aulas/15-vlan-e-prioridade.md`](../aulas/15-vlan-e-prioridade.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L5 q.15)*

> Como são usados os recursos especificados nas normas IEEE 802.1q e IEEE 802.1p nas redes Ethernet?

**802.1Q** cria VLANs inserindo uma **tag de 4 bytes** com o **VID** (identificador da VLAN). **802.1p** usa o campo **PCP de 3 bits** dessa tag para marcar a **prioridade (0–7)** de cada quadro, que os switches usam para escolher filas/tratamento (QoS).

## 2. *(P1·L5 q.16)*

> O que são classes de serviço (CoS)?

As **classes de tratamento** (prioridade, atraso, perda) dadas ao tráfego. No 802.1p, são **8 classes** (valores 0 a 7 do PCP).

## 3. *(P1·L5 q.17)*

> Quais os mecanismos usados para implementar a priorização de tráfego em redes Ethernet?

**Filas separadas** por prioridade, **algoritmos de descarte/filtragem** em congestionamento e **políticas de encaminhamento** distintas por classe.

## 4. *(P1·L5 q.18)*

> O que é VLAN?

**LAN virtual**: topologia **lógica** sobre a física que divide a rede em **vários domínios de broadcast** independentes.

## 5. *(P1·L5 q.19)*

> Quais os benefícios do uso de VLANs?

Facilita **administrar grupos** de estações (sem recabear), **restringe tráfego** entre redes virtuais, reduz **broadcast**, mantém compatibilidade com outras tecnologias e é uma alternativa **econômica** a roteadores/sub-redes físicas.

## 6. *(P1·L5 q.20)*

> Quais as mudanças feitas no quadro Ethernet padrão para que possam ser usadas VLANs? Qual a função de cada campo?

Inserção de uma **tag de 32 bits** entre origem e tipo: **TPID** (16 b, `0x8100`: quadro etiquetado), **PCP** (3 b: prioridade), **CFI/DEI** (1 b) e **VID** (12 b: identifica a VLAN).

## 7. *(P1·L5 q.21)*

> Por que são usadas VLANs?

Para **segmentar o broadcast** e **isolar departamentos/serviços** sem comprar roteadores nem recabear; melhoram desempenho, segurança e gerência.

## 8. *(P1·L5 q.22)*

> Por que o tráfego entre diferentes VLANs é isolado?

Cada VLAN é um **domínio de broadcast** à parte e o switch só encaminha quadros entre portas **da mesma VLAN**; sem função de camada 3, não há ponte entre elas.

## 9. *(P1·L5 q.23)*

> Como pode ser feita a comunicação entre diferentes VLANs?

Por um **roteador** (externo, “router-on-a-stick”) ou por um **switch de camada 3 (L3)** que roteia entre as VLANs.

## 10. *(P1·L5 q.24)*

> Como podem ser identificadas as estações que fazem parte de uma VLAN, ou seja, no que uma VLAN pode ser baseada?

Em **portas** (camada 1), **endereço MAC** (2), **tipo de protocolo** (2), **faixa de IP/sub-rede** (3) ou **camadas superiores** (aplicação/serviço).

## 11.

> Monte o campo **TCI** (16 bits) de uma tag 802.1Q com **prioridade 7**, CFI 0 e **VLAN 100**. Em hexadecimal, qual o valor? E decodifique `0xA00A`.

PCP = 111, CFI = 0, VID = 100 = `000001100100` → `1110 0000 0110 0100` = **0xE064**. `0xA00A` = `1010 0000 0000 1010` → **PCP 5, CFI 0, VID 10**.

## 12.

> Qual o tamanho máximo de um quadro Ethernet com tag 802.1Q? Quantas VLANs úteis cabem no VID? Qual a regra da **VLAN nativa**?

1518 + 4 = **1522 bytes**. VID de 12 bits = 4096 valores; 0 e 4095 são reservados → **4094 VLANs**. A **VLAN nativa não é etiquetada** no tronco e deve ser **a mesma nos dois lados**.

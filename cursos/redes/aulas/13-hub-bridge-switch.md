# Aula 13 — Equipamentos Ethernet: hub, bridge, switch e domínios

> Base: *Aula 10 – Ethernet* (2ª parte: equipamentos). Lista: [`listas/lista-13.md`](../listas/lista-13.md)

## 1. Hub (repetidor multiportas) — camada 1

Dispositivo de camada física que, segundo o IEEE 802.3, deve:
- **restaurar a amplitude** do sinal;
- **restaurar a simetria**;
- **re-temporizar** (re-sincronizar) o sinal;
- **remontar o preâmbulo**.

Comportamento:
- Todo sinal recebido por uma porta é **repetido em todas as outras**.
- É **transparente** para a rede e **propaga as colisões** para todas as portas.
- Fisicamente é **estrela** (cabeamento estruturado, patch panel), logicamente **barramento**.
- Equipamento antigo, mas ainda usado onde o **tempo de resposta é crítico** (ex.: automação industrial) e em **analisadores de rede**.
- **Empilhamento (stack):** interligar hubs por interface e cabo especiais, de modo que o conjunto conte como **um único hub** para as regras de cascateamento.

## 2. Domínios de colisão e de broadcast

| Conceito | Definição |
|---|---|
| **Domínio de colisão** | segmento lógico onde quadros transmitidos por seus elementos **podem colidir** entre si |
| **Domínio de broadcast** | conjunto de dispositivos que **recebem qualquer broadcast** originado por qualquer um deles |

| Equipamento | Domínios de colisão | Domínios de broadcast |
|---|---|---|
| **Hub** | **1** (todas as portas juntas) | 1 |
| **Bridge** | 1 por porta/segmento | 1 |
| **Switch** | **1 por porta** (host + porta = domínio de 1 nó) | **1** (todas as portas) |
| **Roteador** | 1 por interface | **1 por interface** (segmenta broadcast) |
| **VLAN** (switch) | idem switch | **1 por VLAN** |

## 3. Bridge ("ponte") — camada 2

Junta duas redes locais (dois barramentos) numa só, **repassando um quadro à outra interface apenas quando necessário**. **Separa domínios de colisão** (mas não o de broadcast).

> **Atenção — divergência no slide:** o slide diz que a bridge permite "que os domínios de broadcast e de colisão sejam separados". Tecnicamente a bridge separa **colisão**, mas **repassa broadcast** (por isso o próprio material diz depois que só **roteador** ou **VLAN** segmenta o domínio de broadcast). Se cair na prova, responda com o que a professora ensinou e, se puder, acrescente a nuance.

**Tabela de bridging** (por porta): lista os MACs alcançáveis a partir dela.
- **Aprendizado:** ao receber um quadro, lê o **MAC de origem** e o **associa à porta** de entrada (se ainda não estiver na tabela). Cada entrada tem **tempo de vida (aging)**.
- **Quadro unicast:**
  1. Se o destino está na tabela da **mesma porta** de entrada → **descarta** (já foi entregue localmente — *filtragem*).
  2. Se está na tabela de **outra porta** → envia **só por ela** (*encaminhamento*).
  3. Se **não está em nenhuma** → envia por **todas as portas** menos a de origem (*flooding*).
- **Quadro broadcast:** envia para **todas as portas**.

## 4. Switch — camada 2

Evolução da bridge: **várias portas**, **várias transmissões simultâneas** entre pares de portas, e **buffers** para enfileirar quadros quando a porta de destino está ocupada. Usa a mesma lógica de aprendizado/filtragem/flooding.

### Duas formas de operação

| | **Store-and-Forward** | **Cut-through** (nos slides: "cut-throw") |
|---|---|---|
| Como | recebe o **quadro inteiro**, confere CRC, depois encaminha | assim que lê o **MAC de destino**, já começa a encaminhar |
| Latência | maior | **menor (mais rápido)** |
| Erros | **descarta quadros com erro** | pode propagar quadros com erro |
| Uso | uso geral | latência crítica |

### Hub × Switch

| | Hub | Switch |
|---|---|---|
| Camada | 1 | 2 |
| Encaminha | para **todas** as portas | só para a porta do destino (após aprender) |
| Colisões | uma só zona; CSMA/CD | cada porta é um domínio; em **full-duplex** nem há colisão |
| Banda | **dividida** entre todos | **dedicada** por porta |
| Inteligência | nenhuma | tabela MAC, filtragem, buffers |

> Em enlace **full-duplex** com switch, o CSMA/CD é **desativado**: transmissão e recepção usam pares separados.

### Quando **não** usar um switch (usar hub)
- **Baixo custo**;
- **Baixa latência** crítica;
- **Aplicações simples**;
- **Analisadores de rede** (precisam enxergar todo o tráfego).

### IEEE 802.1D
Padrão de **bridges/switches (MAC bridging)** que inclui o **Spanning Tree Protocol (STP)**, a principal modificação para permitir **redes comutadas redundantes sem loops** (aula 14).

---

## Exercícios

Lista: [`listas/lista-13.md`](../listas/lista-13.md) — respostas: [`respostas/lista-13.md`](../respostas/lista-13.md)

---

## Resumo

- **Hub:** camada 1, repete tudo, **1 domínio de colisão**; propaga colisões.
- **Bridge/Switch:** camada 2; **aprendem MAC de origem**, **filtram**, **encaminham** ou fazem **flooding**; **1 domínio de colisão por porta**, **1 de broadcast**.
- **Store-and-forward** (confere CRC) × **cut-through** (mais rápido).
- Para **segmentar broadcast**: **roteador** ou **VLAN**.

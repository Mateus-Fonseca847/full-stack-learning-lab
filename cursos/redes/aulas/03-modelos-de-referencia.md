# Aula 03 — Modelos de referência: OSI, TCP/IP, IEEE e ITU-T

> Base: *Aula 3 – Modelo em camadas*. Lista: [`listas/lista-03.md`](../listas/lista-03.md)

## 1. Por que camadas?

Dividir o projeto em **camadas** simplifica o problema. Cada camada oferece **serviços** à camada de cima e usa os serviços da de baixo. A camada *n* de uma máquina conversa (virtualmente) com a camada *n* da outra, seguindo o **protocolo** daquela camada.

Analogia da aula: um executivo russo e um estrangeiro japonês conversam por meio de tradutores e secretárias — cada nível só fala com o seu par, e os níveis de baixo escondem os detalhes.

| Termo | Significa |
|---|---|
| **Protocolo** | regras da conversa entre camadas **pares** (mesma camada, máquinas diferentes) |
| **Interface** | fronteira entre camadas **adjacentes** na mesma máquina |
| **Serviço** | o que a camada de baixo oferece à de cima |
| **Primitivas** | operações definidas na interface (ex.: pedir conexão, enviar dados) |
| **SAP** | ponto de acesso ao serviço; por ele a camada *N+1* passa uma **IDU** (Interface Data Unit) para a camada *N* |

A interface deve ser **a mais simples possível**, para trocar o mínimo de informação entre camadas.

## 2. Modelo OSI (ISO) — 7 camadas

Foi o **primeiro** modelo de referência, um grande passo para a padronização.

**Regras usadas para criar as camadas:**
1. criar camada onde há necessidade de **abstração adicional**;
2. cada camada com **função bem definida**;
3. função escolhida pensando em **protocolos padronizados** internacionalmente;
4. limites escolhidos para **minimizar o fluxo** de informação nas interfaces;
5. número de camadas grande o bastante para separar funções distintas e pequeno o bastante para ser controlável.

| # | Camada | Função principal |
|---|---|---|
| 7 | **Aplicação** | aplicações necessárias aos usuários |
| 6 | **Apresentação** | **sintaxe e semântica**; permite comunicação entre sistemas com representações de dados diferentes |
| 5 | **Sessão** | sessões entre máquinas; **controle de diálogo** (quem transmite e quando), **gerência de token**, **sincronização** (retomar de onde parou) |
| 4 | **Transporte** | verdadeira camada **fim a fim**; entrega confiável e em ordem |
| 3 | **Rede** | opera a sub-rede; **roteamento** (estático/dinâmico), controle de congestionamento, QoS (retardo, jitter), endereçamento e tamanhos de pacote diferentes entre redes |
| 2 | **Enlace** | canal bruto → linha sem erros; **quadros**, ACK, **controle de fluxo**, tratamento de erros, **controle de acesso ao meio** (redes de difusão) |
| 1 | **Física** | transmissão de **bits** no meio: tensão, duração do bit, pinos do conector |

### Comunicação entre camadas

- **Na mesma máquina:** cada camada fala só com a vizinha, pela interface (serviços/primitivas).
- **Entre máquinas:** comunicação **virtual** entre camadas pares; o caminho real dos dados desce pela pilha, cruza o meio físico e sobe pela pilha do destino.
- **Encapsulamento:** ao descer, cada camada **acrescenta seu cabeçalho** (e a de enlace também um trailer); ao subir, cada camada **retira** o seu.

```
Aplicação   [ dados ]
Transporte  [H4][ dados ]
Rede        [H3][H4][ dados ]
Enlace      [H2][H3][H4][ dados ][T2]   ← quadro
Física      0101011101...               ← bits
```

## 3. Arquitetura TCP/IP

Nasceu na ARPANET (rede de pesquisa do DoD americano); o DoD queria uma rede **resistente a ataques** (guerra fria).

| Camada TCP/IP | Equivale no OSI | Observação |
|---|---|---|
| **Aplicação** | 5 + 6 + 7 | engloba sessão e apresentação |
| **Transporte** | 4 | **TCP** (confiável, orientado à conexão) e **UDP** (sem conexão) |
| **Inter-rede** | 3 | interligação de redes **sem conexão**; protocolo **IP** (analogia: correio) |
| **Intra-rede** (Host/Rede) | 1 + 2 | o modelo **não especifica** muito; só exige um protocolo que permita enviar pacotes |

**Modelo híbrido** (o mais usado para ensinar): Aplicação, Transporte, Rede, Enlace, Física (5 camadas).

### OSI × TCP/IP

- **Em comum:** pilhas de protocolos com camadas independentes; camadas de transporte e aplicação.
- **Diferenças:** o OSI tem mais camadas/encapsulamento; o TCP/IP é mais fácil de adaptar; na camada de **rede**, o OSI aceita **com e sem conexão**, o TCP/IP só **sem conexão**.

**Críticas ao OSI:** momento ruim (TCP/IP já dominava), tecnologia ruim (**sessão e apresentação quase vazias**, redundância de controle de erro/fluxo entre camadas), implementações pesadas e lentas, política ruim.

**Críticas ao TCP/IP:** não distingue bem serviço, interface e protocolo; camada host/rede confusa; alguns protocolos ruins porém difundidos (telnet); problemas de segurança; sem mecanismos nativos de gerência e QoS; só descreve redes TCP/IP (ex.: Bluetooth não se encaixa).

## 4. Arquitetura IEEE (802)

Série de padrões das camadas **física e de enlace**, em sua maioria para LANs (também MAN/WAN). A camada de enlace é dividida em **duas subcamadas**:

- **LLC (Logical Link Control):** multiplexação, controle de erro, controle de fluxo.
- **MAC (Media Access Control):** **controle de acesso ao meio**.

| Padrão | Resumo |
|---|---|
| **802.3** | Ethernet; **CSMA/CD**; coaxial (10BASE2, 10BASE5), par trançado (10BASE-T), fibra (10BASE-F); Ethernet, Fast, Gigabit, 10 Gigabit |
| **802.4** | Token Bus; automação de fábricas; passagem de ficha em barramento |
| **802.5** | Token Ring (IBM); acesso determinístico por token; anel unidirecional |
| **802.6** | redes MAN em fibra, barramento duplo (tolerante a falhas); no slide aparece associado ao FDDI |
| **802.11** | Wi-Fi (WLAN); alcance médio ~100 m |

> **Atenção às unidades:** os slides escrevem "MBps", mas as taxas de rede são em **Mbps** (megabits/s). 802.11b = 11 Mbps (2,4 GHz); 802.11g = 54 Mbps (2,4 GHz); 802.11a = 54 Mbps (5 GHz).
>
> **Nuance:** na literatura, FDDI é um padrão ANSI e o 802.6 é o DQDB. Na prova, siga o que a professora ensinou, mas saiba que existe essa diferença.

## 5. Arquitetura ITU-T (em **planos**, não camadas)

| Plano | O que faz |
|---|---|
| **Transporte / Dados** | leva os dados do usuário; todas as funções de transporte |
| **Controle / Sinalização** | sinalização e roteamento que controlam o plano de dados |
| **Gerência** | gerenciamento: coleta falhas, desempenho etc. dos outros planos |

(Essa visão aparece em telecom: ATM, SDH, redes ópticas.)

## 6. Comparação rápida

| | OSI | TCP/IP | IEEE |
|---|---|---|---|
| Camadas | 7 | 4 (ou 5 híbrido) | só 1 e 2 (enlace dividido em LLC/MAC) |
| Foco | referência/teoria | prática, Internet | LANs/MANs |
| Rede | com e sem conexão | sem conexão | — |

---

## Exercícios

Lista: [`listas/lista-03.md`](../listas/lista-03.md) — respostas: [`respostas/lista-03.md`](../respostas/lista-03.md)

---

## Resumo

- Camadas simplificam o projeto; **protocolo** = entre pares, **interface** = entre vizinhas, **serviço** = o que a de baixo oferece.
- OSI: Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação. Encapsulamento adiciona cabeçalhos na descida.
- TCP/IP: Intra-rede, Inter-rede (IP), Transporte (TCP/UDP), Aplicação.
- IEEE: enlace = **LLC + MAC**; 802.3 Ethernet, 802.11 Wi-Fi.
- ITU-T: **planos** de dados, controle e gerência.

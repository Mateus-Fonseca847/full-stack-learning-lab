# Aula 08 — Superframe, IFS e o quadro 802.11

> Base: *Wi-Fi · aula 10 – Quadro Wi-Fi* e *aula 9 (IFS)*. Lista: [`listas/lista-08.md`](../listas/lista-08.md)

## 1. Superframe

O tempo se divide em **superquadros** entre dois beacons, com dois períodos:

- **CFP** (*Contention-Free Period*): período **sem disputa** (PCF, o AP consulta);
- **CP** (*Contention Period*): período **com disputa** (DCF).

```
| Beacon | ←── CFP (PCF) ──→ | CF-End | ←──── CP (DCF) ────→ | próximo Beacon
```

Assim PCF e DCF **coexistem** na mesma rede.

## 2. Interframe Spaces (IFS) — quanto menor, maior a prioridade

| IFS | Fórmula | Para quê |
|---|---|---|
| **SIFS** (*Short*) | ≥ RxPHYDelay + MACProcessingDelay + RxTxTurnaroundTime | **ACK, CTS, fragmentos de quadro e resposta a polling**: deixa as partes de **um mesmo diálogo** transmitirem primeiro |
| **PIFS** (*PCF*) | **SIFS + SlotTime** | **beacons e quadros no CFP (PCF)**; dá ao AP a chance de **pegar o canal sem competir** |
| **DIFS** (*DCF*) | **SIFS + 2·SlotTime** | **quadros no CP (DCF)**: depois dele, qualquer estação pode tentar o canal (regras de disputa e recuo) |
| **EIFS** (*Extended*) | **SIFS + AckTxTime + DIFS** | usado por quem **acabou de receber um quadro defeituoso ou desconhecido** (não deu para ler o NAV), para não atropelar o ACK |

Ordem de prioridade: **SIFS < PIFS < DIFS < EIFS**. Exemplo numérico (802.11a): SIFS = 16 µs, slot = 9 µs → PIFS = 25 µs, DIFS = 34 µs.

## 3. As três classes de quadro

| Classe | Para que serve |
|---|---|
| **Dados** | quadros de dados e dados combinados com **polling e ACK** |
| **Controle** | **fim do CFP**, **handshaking** durante o CP (RTS/CTS) e **ACK** |
| **Gerenciamento** | **temporização, sincronização e autenticação** (beacon, probe, autenticação, associação...) |

## 4. O quadro 802.11

```
 2 B        2 B       6 B   6 B   6 B    2 B     6 B     0–2312 B   4 B
┌────────┬────────┬──────┬──────┬──────┬───────┬──────┬──────────┬─────┐
│Controle│Duração │End. 1│End. 2│End. 3│Sequên.│End. 4│  Dados   │ CRC │
│de quadro│       │      │      │      │       │(opc.)│          │     │
└────────┴────────┴──────┴──────┴──────┴───────┴──────┴──────────┴─────┘
```

### Campo Controle de quadro (16 bits)

| Campo (bits) | Função |
|---|---|
| **Versão** (2) | **versão do protocolo 802.11** |
| **Tipo** (2) | **controle, dados ou gerenciamento** (00 = gerenciamento, 01 = controle, 10 = dados) |
| **Subtipo** (4) | qual quadro é (ex.: se é **RTS ou CTS**) |
| **Para DS** (1) | o quadro **vai para o AP** (modo infraestrutura) |
| **De DS** (1) | o quadro **vem do AP** (modo infraestrutura) |
| **MF** — *More Fragments* (1) | **há mais fragmentos** a caminho |
| **Rept** (1) | é uma **retransmissão** |
| **Potência** (1) | a estação está em **modo ativo ou economia de energia** |
| **Mais** (1) | o AP **tem mais quadros** para uma estação em economia de energia |
| **W** (1) | está sendo usada **criptografia** |
| **O** (1) | os quadros devem ser processados **em ordem** |

**Por que o campo existe?** Para o receptor saber **que tipo de quadro é**, o sentido (para/do AP), e os modos em uso (fragmentos, energia, criptografia).

**Como um equipamento identifica a versão do 802.11?** *(pergunta da lista)* O campo **Versão** indica a versão **do protocolo MAC**. As variantes (a/b/g/n/ac) distinguem-se **na camada física** e nas **capacidades anunciadas** nos beacons.

### Duração
Indica o **tempo que o meio ficará ocupado** pela transmissão; é indicado inicialmente pelos **RTS e CTS** e alimenta o **NAV**. Exemplo: o RTS anuncia o tempo de **CTS + dados + ACK + 3 SIFS**; quem só ouviu o RTS já sabe quanto tempo calar.

### Endereços (por que quatro?)
Num ambiente com AP há endereços **fim a fim** e **de salto**:

| Sigla | Significado |
|---|---|
| **BSSID** | identifica o BSS; na infraestrutura é o **MAC do AP**; em ad hoc, um número aleatório gerado pela estação que iniciou |
| **DA** | **destino final** |
| **SA** | **origem** que gerou o quadro |
| **RA** | **próxima estação que receberá** o quadro (receptor imediato) |
| **TA** | estação que **transmitiu** o quadro no ar (transmissor imediato) |

| Para DS | De DS | End. 1 | End. 2 | End. 3 | End. 4 |
|---|---|---|---|---|---|
| 0 | 0 | DA | SA | BSSID | — |
| 0 | 1 | DA | BSSID | SA | — |
| 1 | 0 | BSSID | SA | DA | — |
| 1 | 1 | RA | TA | DA | SA |

(Fonte do slide: tutorial 802.11, Berkeley.) O **End. 4** só aparece quando **dois APs** se comunicam por rádio (Para DS = De DS = 1).

**O emissor é um AP?** Pelo par de bits: **De DS = 1 e Para DS = 0** → o quadro **veio de um AP**.

### Sequência, Dados e CRC
**Sequência:** número de sequência de cada quadro (e do fragmento). **Dados:** carga (0 a 2312 bytes). **CRC:** verificação do quadro.

## 5. Quadros de controle

- **RA** = endereço do receptor; **TA** = endereço do transmissor; mais o campo **Duração**:
  - **RTS:** T(pkt) + T(CTS) + T(ACK) + **3·SIFS**
  - **CTS:** T(pkt) + T(ACK) + **2·SIFS**
  > *No slide as duas fórmulas aparecem rotuladas "RTS"; a segunda é a do **CTS**.*
- **PS-Poll:** enviado quando a estação **volta do modo de economia**, pedindo os quadros guardados no AP; leva o **AID** (*association ID*, 2 bytes).
- **CF-End:** enviado pelo AP para **encerrar o CFP**.
- **Poll:** **RA** = MAC da estação consultada, **TA** = MAC do AP, **Response Offset** = tempo (em µs) para a resposta.
- **Dados:** *Data frame*.

**Como distinguir RTS de CTS?** *(a lista chama de "RTC")* Os dois têm **Tipo = controle**; diferem pelo **Subtipo** (RTS = 1011, CTS = 1100 *(complemento)*) e pelo tamanho (o RTS tem **RA e TA**; o CTS só **RA**).

## 6. Pratique

```bash
cd praticas
node nav_duracao.js 1500 54     # campo Duração (RTS/CTS) e os IFS
```

---

## Exercícios

Lista: [`listas/lista-08.md`](../listas/lista-08.md) — respostas: [`respostas/lista-08.md`](../respostas/lista-08.md)

---

## Resumo

- **Superframe** = beacon + **CFP** (PCF) + **CP** (DCF).
- **SIFS < PIFS < DIFS < EIFS**; PIFS = SIFS + slot; DIFS = SIFS + 2 slots; EIFS = SIFS + ACK + DIFS.
- Quadro: Controle (2), **Duração** (2), **End. 1–3** (+4), Sequência, Dados, CRC.
- **Para DS / De DS** definem o papel dos endereços; De DS = 1 e Para DS = 0 → veio do AP.
- Controle: **RTS, CTS, ACK, PS-Poll, CF-End, Poll**.

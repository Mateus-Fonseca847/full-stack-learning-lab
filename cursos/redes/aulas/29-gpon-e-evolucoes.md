# Aula 14 — GPON e as evoluções das PON

> Base: *aula 12 – PON* (GPON e evoluções). Lista: [`listas/lista-14.md`](../listas/lista-14.md)

## 1. GPON — Gigabit PON

- Desenvolvida pela **ITU-T G.984**. Usa o **GEM** (*GPON Encapsulation Method*) para operar **multisserviços**.
- **Encapsula dados de vários protocolos** (Ethernet, IP, TCP, UDP, **T1/E1**, **vídeo e VoIP**) e inclui **criptografia AES também no downstream**.
- Pacote de **53 a 1518 bytes**; o **dobro da divisão da EPON: 128 ONUs/ONTs por porta PON**; eficiência de informação útil de **até 93%**.

| | **EPON** | **GPON** |
|---|---|---|
| Padrão | **IEEE 802.3ah** | **ITU-T G.984** |
| Encapsulamento | **Ethernet** puro | **GEM** (multisserviço) |
| Quadro | até 1518 B | 53 a 1518 B |
| ONUs por porta | **64** | **128** |
| Eficiência | **67%** | **até 93%** |

*(Complemento)* Na transmissão, o **downstream é em broadcast** para todas as ONUs (cada uma filtra o que é seu, com criptografia) e o **upstream é em TDMA**, com a OLT alocando janelas (por **Alloc-ID**).

### Outros elementos do sistema GPON

| Sigla | O que é |
|---|---|
| **SNI** (*Service Node Interfaces*) | interfaces das operadoras para ligar à **rede de serviço** |
| **R/S e S/R** | interface **entre OLT e ODN** e **entre ONU e ODN** (os **conectores ópticos**) |
| **AF** (*Adaptation Function*) | equipamento adicional que **altera a interface da ONU/ONT** conforme a necessidade do assinante |
| **UNI** (*User Network Interface*) | interface **solicitada pelo cliente** |
| **IFPON** | interface **específica da PON** que suporta os elementos e protocolos para a transmissão OLT ↔ ONU |
| **NE** (*Network Element*) | equipamentos que usam **comprimento de onda diferente** do da OLT e ONU/ONT |

## 2. Estrutura em camadas do GPON

Tanto na OLT quanto na ONU, **duas camadas**, que correspondem à **física** e à **enlace** do OSI:

```
┌────────────────────────────────────────────┐
│ GTC  — GPON Transmission Convergence (G.984.3)   ← enlace
│   ├ subcamada Framing GTC
│   └ subcamada de Adaptação (ATM, GEM, OMCI)
├────────────────────────────────────────────┤
│ PMD  — Physical-Medium-Dependent (G.984.2)       ← física
└────────────────────────────────────────────┘
```

### PMD
É **hardware**, definido pela **ITU-T G.984.2**: **taxa**, **método de transmissão**, **comprimento de onda**, **tipo de tráfego**, **split ratio**, **alcance lógico e físico** etc.

### GTC (G.984.3), em duas subcamadas

**Framing GTC:** **multiplexa e demultiplexa** o **PLOAM** (OAM da camada física), o **ATM** e o **GEM**; **cria o cabeçalho GTC** no downstream e **decodifica** no upstream; faz **roteamento com base no Alloc-ID** dos dados ATM e GEM.

**Adaptação — três adaptadores de convergência (TC):**

| Adaptador | O que faz |
|---|---|
| **ATM TC** | com o Framing, fornece a **interface ATM** |
| **GEM TC** | configurável para várias interfaces de transporte: **TDM, Ethernet, SDH e IP** |
| **OMCI** | *ONU Management and Control Interface*: na ONU, **filtra e desencapsula** os quadros no downstream e **encapsula as PDUs** no upstream; na OLT, o processo inverso |

**Por que três?** Porque o GPON foi feito para **vários serviços** (ATM herdado, dados e multisserviço pelo GEM, e **gerência** pelo OMCI). **Relação OMCI × GEM:** o GEM é o método de encapsulamento do transporte; o OMCI é o canal de **gerência e controle da ONU**, cujas mensagens trafegam **encapsuladas pelo GEM** *(complemento)*.

### Quadro GTC
- **Downstream:** **PCBd** (*Physical Control Block downstream*), responsável pelo **controle físico** (localização do quadro, **sincronização** e **alocação de banda**), mais a seção de **payload** com os dados.
- **Upstream:** vários **bursts (rajadas)**; cada um resulta numa seção **PLOu** (*Physical Layer Overhead upstream*) e em **um ou mais intervalos de alocação de banda** associados a **ALLOC_IDs**.

## 3. As evoluções das PON

| Padrão | Pontos do slide |
|---|---|
| **10G-EPON** | **simétrico (10/10 Gb/s)** ou **assimétrico (10 down / 1 up)**; no upstream, **multiplexação no tempo** garante a **coexistência com a EPON** atual. **Downstream: 1590 nm** (curtas distâncias) ou **1577 nm** (longas); **upstream: 1310 nm**, o mesmo da E-PON; **link budget de 29 dB** |
| **XG-PON1** | vários comprimentos de onda; até **10 Gbps por porta física: 10 down e 2,5 up**; cabeçalhos menores na camada física e **maior eficiência** na MAC; **1575–1580 nm** down e **1260–1280 nm** up |
| **XG-PON2** | aumenta o **upstream de 2,5 para 10 Gbps**: **simétrico** |
| **NG-PON1** | **híbrido TDM + WDM**: muitos comprimentos de onda, cada um usado por **mais de uma ONU via TDM**; usa **AWG** (*Arrayed Waveguide Gratings*) ou splitter para distribuir as frequências, fazendo o **filtro WDM** |
| **NG-PON2** | **simetria de 10 Gbps** nos dois sentidos; **mobilidade de comprimentos de onda**; serviços de **até 40 Gbps**; **múltiplos comprimentos de onda** |
| **XGS-PON** | evolução do XG-PON1, **simétrica: 10 Gbps** up e down |

### Formas de múltiplo acesso do NG-PON2
- **TWDM PON:** agrega **mais canais PON numa mesma fibra** por comprimentos de onda adicionais (**TDM sobre WDM**).
- **WDM PON:** troca os splitters por **AWGs**, que dividem **por comprimento de onda**, **diminuindo a perda óptica**.
- **OFDM PON:** usa **modulação por divisão de frequência ortogonal**.

### Comparando
| | down / up | observação |
|---|---|---|
| 10G-EPON | 10/10 ou 10/1 | coexiste com a EPON |
| XG-PON1 | 10 / 2,5 | assimétrico |
| XG-PON2 | 10 / 10 | simétrico |
| XGS-PON | 10 / 10 | simétrico (evolução do XG-PON1) |
| NG-PON2 | 10 / 10 por canal, até 40 Gbps | TWDM, WDM, OFDM |

---

## Exercícios

Lista: [`listas/lista-14.md`](../listas/lista-14.md) — respostas: [`respostas/lista-14.md`](../respostas/lista-14.md)

---

## Resumo

- **GPON:** ITU-T G.984, **GEM**, 53–1518 B, **128 ONUs**, até **93%**, AES no downstream.
- Elementos extras: **SNI, R/S e S/R, AF, UNI, IFPON, NE**.
- Camadas: **PMD** (física, G.984.2) e **GTC** (enlace, G.984.3: **Framing** + **Adaptação ATM/GEM/OMCI**).
- Quadro: downstream **PCBd + payload**; upstream **bursts com PLOu + ALLOC_IDs**.
- Evoluções: **10G-EPON, XG-PON1 (10/2,5), XG-PON2 (10/10), NG-PON1 (TDM+WDM), NG-PON2 (até 40 Gbps; TWDM/WDM/OFDM), XGS-PON**.

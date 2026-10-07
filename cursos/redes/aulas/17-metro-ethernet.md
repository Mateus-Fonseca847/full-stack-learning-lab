# Aula 17 — Metro Ethernet / Carrier Ethernet, Q-in-Q e MAC-in-MAC

> ⚠️ **Sem slides:** o material desta aula foi montado a partir da **lista de exercícios** da P2 e de conhecimento geral (MEF, IEEE 802.1ad/802.1ah). Confira com o seu caderno/slides se a professora tratou algum ponto de forma diferente. Lista: [`listas/lista-17.md`](../listas/lista-17.md)

## 1. O que é a Metro Ethernet

Uso da tecnologia **Ethernet** em redes **metropolitanas e de operadoras** para interligar sedes de clientes e dar acesso a serviços (internet, VPNs). Padronizada pelo **MEF (Metro Ethernet Forum)**, que definiu os serviços e atributos que caracterizam o **Carrier Ethernet**.

### Modelo de referência
```
 [Cliente A, site 1]──UNI──┐                    ┌──UNI──[Cliente A, site 2]
   (CE)                    │   Rede Metro       │              (CE)
                           ├── Ethernet (MEN) ──┤
 [Cliente B]───────UNI─────┘     │      │       └──UNI──[Cliente B]
                              NNI/E-NNI│ (outra operadora)
```
- **CE (Customer Equipment)**: equipamento do cliente (switch/roteador).
- **UNI (User-Network Interface):** interface **cliente ↔ rede da operadora**. É **Ethernet padrão** (10/100/1000 Mbps, 10 Gbps).
- **NNI / E-NNI (Network-Network Interface):** interface **entre redes de operadoras** (ou entre domínios).
- **Uso físico:** as redes metro são a **infraestrutura física** (fibra, anéis, switches de operadora) que liga os sites. **Uso lógico:** oferecem **conexões virtuais (EVCs)** entre UNIs, como se os sites do cliente estivessem na mesma LAN ou ligados por linha dedicada.

**Tipos de interfaces propostas:** **UNI** e **NNI** (com variações E-NNI, I-NNI).

### Vantagens sobre tecnologias concorrentes (Frame Relay, ATM, linhas dedicadas/SDH)
- **Familiaridade:** Ethernet já domina a LAN → **sem conversão de protocolo** na borda;
- **Custo menor** de interfaces e equipamentos (escala do Ethernet);
- **Banda flexível e granular** (de 1 Mbps a 10 Gbps, ajustável em passos pequenos, provisionamento rápido);
- **Escalabilidade e simplicidade** de operação;
- Suporte a **QoS e SLA** (CIR, atraso, jitter, perda).

## 2. EVC — Ethernet Virtual Connection

**EVC** é uma **associação de duas ou mais UNIs**: quadros só trocam entre UNIs **da mesma EVC** (isolamento entre serviços). É o equivalente Ethernet do circuito virtual.

| Modalidade | Topologia lógica | Para que serve |
|---|---|---|
| **E-Line** | **ponto a ponto** (2 UNIs) | substituir **linha dedicada/PVC**; interligar 2 sites; acesso à internet |
| **E-LAN** | **multiponto a multiponto** | **LAN virtual** entre vários sites (todos falam com todos); intranet multi-sede |
| **E-Tree** | **ponto-multiponto com raiz** (root + folhas) | topologia **hub-and-spoke**: folhas falam com a raiz, **não entre si**; distribuição de vídeo/IPTV, acesso a data center |

Cada uma pode ser **privada** (EPL/EP-LAN: porta dedicada ao serviço) ou **virtual** (EVPL/EVP-LAN: várias EVCs multiplexadas na mesma UNI, separadas por VLAN).

## 3. Caracterização e modelagem do tráfego

**Granularidade** (nível em que se descreve/limita o tráfego): por **UNI (porta)**, por **EVC** e por **EVC + classe de serviço (CoS)**.

**Parâmetros do perfil de banda (bandwidth profile):**

| Parâmetro | Significa |
|---|---|
| **CIR** | Committed Information Rate — taxa **garantida** |
| **CBS** | Committed Burst Size — rajada permitida na taxa garantida |
| **EIR** | Excess Information Rate — taxa **excedente**, sem garantia |
| **EBS** | Excess Burst Size — rajada permitida no excedente |
| **CM / CF** | Color Mode (cego/consciente da cor) / Coupling Flag |

Quadros **verdes** (dentro do CIR) têm o SLA garantido; **amarelos** (excesso até EIR) são entregues se houver folga; **vermelhos** são descartados. (É um *token bucket* duplo — aula 04.)

### Classes de serviço (CoS)
**CoS** define **como a rede trata** cada tipo de tráfego (prioridade, atraso, perda). Ex.: **voz** (alta prioridade, baixo atraso), **dados críticos**, **melhor esforço**.

**Granularidade e indicadores usados para identificar a CoS:**

| Nível | Indicador |
|---|---|
| **Porta (UNI)** | toda a porta recebe a mesma CoS |
| **EVC** | pelo **VLAN ID** (identificador da EVC) |
| **Dentro da EVC** | pelos bits de prioridade **802.1p (PCP)** (camada 2) ou pelo **DSCP/IP precedence** (camada 3) |

### Uso do 802.1Q / 802.1p na Metro Ethernet
- **802.1Q (VID):** identifica a **VLAN/EVC/serviço**; permite multiplexar vários serviços numa mesma UNI.
- **802.1p (PCP, 3 bits):** carrega a **prioridade** do quadro (CoS), mapeada para filas nos switches da operadora.

## 4. Atributos do Carrier Ethernet (MEF)

| Atributo | Em resumo |
|---|---|
| **Serviços padronizados** | E-Line, E-LAN, E-Tree, sem alterar o equipamento do cliente |
| **Escalabilidade** | de milhares a milhões de clientes/serviços; larga faixa de banda |
| **Confiabilidade** | proteção/restauração rápida (alvo **< 50 ms**, como no SDH) |
| **Qualidade de serviço (QoS)** | SLAs com banda, atraso, jitter e perda |
| **Gerência de serviço (OAM)** | monitorar, detectar falhas e medir desempenho fim a fim |

## 5. Separação do tráfego dos usuários

**Por que separar?** Vários clientes dividem a mesma infraestrutura: é preciso **privacidade/segurança**, **evitar conflito** de VLANs e endereços MAC e **escalar**.

Formas principais:

| Técnica | Padrão | Ideia | Limite |
|---|---|---|---|
| **VLAN simples** | 802.1Q | 1 tag de 12 bits | só **4094** VLANs; conflito se clientes usam as mesmas IDs |
| **Q-in-Q (VLAN empilhada)** | **802.1ad** (Provider Bridges) | **2 tags**: **C-VLAN** (cliente) + **S-VLAN** (operadora) | S-VLAN também 12 bits (4094 serviços); switches da operadora aprendem **todos os MACs dos clientes** |
| **MAC-in-MAC** | **802.1ah** (Provider Backbone Bridges) | encapsula o quadro do cliente em **outro quadro Ethernet** com MACs do backbone | resolve os limites acima |

*(Também se usa MPLS/VPLS para o mesmo fim.)*

### S-VLAN e C-VLAN (802.1ad)
- **C-VLAN (Customer VLAN):** a tag **802.1Q do próprio cliente**, que **passa intacta** pela rede da operadora.
- **S-VLAN (Service VLAN):** tag **adicionada pela operadora** na entrada da rede, que **identifica o serviço/cliente** e é a usada para encaminhar. TPID `0x88A8`.
- **Encapsulamento:** o quadro do cliente (já com a C-tag) recebe uma **tag externa S-VLAN** (empilhada); na saída a S-tag é removida e o quadro volta **exatamente como o cliente enviou**.

```
Quadro do cliente:     [Dst][Src][C-tag][Tipo][Dados][FCS]
Dentro da operadora:   [Dst][Src][S-tag][C-tag][Tipo][Dados][FCS]   (+4 bytes)
```

**Há conflito de VLAN entre clientes com Q-in-Q? Não.** Dois clientes podem usar a mesma C-VLAN (ex.: VLAN 10) sem problema, porque a operadora encaminha **pela S-VLAN externa**, que é única por cliente/serviço; as C-VLANs ficam "escondidas" dentro de cada S-VLAN.

### Que problema o 802.1ah (MAC-in-MAC) resolve?
Com Q-in-Q a rede da operadora ainda aprende os **MACs de todos os clientes** (**explosão da tabela MAC**) e tem só **4094 serviços**. O **PBB (802.1ah)**:
- **Encapsula** o quadro inteiro do cliente num novo quadro com **MAC de origem e destino do backbone (B-MAC)** → os switches do núcleo aprendem **só os MACs das bordas**, não os dos clientes → **escalabilidade** e **isolamento** do domínio do cliente;
- Usa um **I-SID de 24 bits** (~16 milhões de serviços) no lugar dos 12 bits da VLAN.

### 802.1ah e 802.1ad juntos?
**Sim.** Arquitetura típica: na **rede de acesso** usa-se **Q-in-Q (S-VLAN)**; na **borda do backbone** (BEB) o quadro (com C-tag e S-tag) é encapsulado em **MAC-in-MAC**; no **núcleo**, os switches encaminham só por B-MAC/B-VLAN.

```
Cliente ──[C]──► Acesso (802.1ad) ──[S|C]──► BEB ──[B-MAC|I-SID|S|C]──► Núcleo (802.1ah)
```

### Interoperabilidade com Ethernet padrão
Todas foram projetadas com **compatibilidade retroativa**: a interface voltada ao cliente continua sendo Ethernet padrão.

| Rede | Interopera com Ethernet padrão? |
|---|---|
| **802.1Q** | **Sim** — hosts sem tag (portas de acesso) e switches 802.1Q convivem |
| **Metro Ethernet** | **Sim** — a **UNI é Ethernet padrão** (é o ponto do MEF) |
| **802.1ad** | **Sim** — o cliente usa 802.1Q/Ethernet; a operadora acrescenta/retira a S-tag |
| **802.1ah** | **Sim** — o cliente usa Ethernet/802.1Q; o encapsulamento só existe dentro da operadora |

*Ressalva prática:* as tags extras aumentam o quadro (1522 B → 1526 B → ainda mais com 802.1ah); equipamentos legados precisam suportar **MTU maior**.

---

## Exercícios

Lista: [`listas/lista-17.md`](../listas/lista-17.md) — respostas: [`respostas/lista-17.md`](../respostas/lista-17.md)

---

## Resumo

- **UNI** = cliente↔operadora (Ethernet padrão); **NNI** = operadora↔operadora; **EVC** = conexão virtual entre UNIs.
- **E-Line** (ponto a ponto), **E-LAN** (multiponto), **E-Tree** (raiz + folhas).
- Perfil de tráfego: **CIR/CBS/EIR/EBS**; CoS por porta, EVC ou **802.1p/DSCP**.
- **Q-in-Q (802.1ad):** S-VLAN + C-VLAN → sem conflito entre clientes. **MAC-in-MAC (802.1ah):** resolve explosão de MACs e limite de 4094. Os dois podem coexistir.

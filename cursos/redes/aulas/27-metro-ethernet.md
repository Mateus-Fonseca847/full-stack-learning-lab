# Aula 12 — Metro Ethernet, VLAN, Q-in-Q, MAC-in-MAC e PBT

> Base: *aula 11 – Metro Ethernet*. Lista: [`listas/lista-12.md`](../listas/lista-12.md)

## 1. O que é a Metro Ethernet

**Interconecta LANs geograficamente separadas**, podendo ligá-las a um **backbone** ou **WAN**. Implementa o conceito de **VLANs (IEEE 802.1Q)** e de **classes de serviço (IEEE 802.1p)** para criar e manter **redes virtuais logicamente distintas no mesmo meio físico**.

**Vantagens:** **redução do custo operacional e de planejamento**; **equipamentos de menor custo**; **melhor granularidade e facilidade para aumentar a banda** (do assinante, de 1 Mbps a 1 Gbps, em passos de 1 Mbps); **transmissão baseada em pacotes**; **interoperabilidade com as LANs sem protocolos de adaptação**.

## 2. Arquitetura

- **UNI** (*User Network Interface*): interface que **liga a rede do cliente à rede do provedor**. Tem dois lados: **UNI-C** (lado do cliente) e **UNI-N** (lado da rede).
- **EVC** (*Ethernet Virtual Connection*): **instância da associação de duas ou mais UNIs**. O MEF define **dois tipos** nos slides:
  - **E-LINE:** **ponto a ponto**;
  - **E-LAN:** **multiponto a multiponto**.

Uso: físico = a infraestrutura do provedor; lógico = as EVCs entre as UNIs (como linhas privadas ou uma LAN estendida).

## 3. Parâmetros de tráfego (*Bandwidth Profile*)

**Perfil de banda:** limite da **taxa média de quadros** que podem **entrar** na rede do provedor por uma UNI. O MEF define **três atributos** (a "granularidade"):

| Perfil | Aplica-se a |
|---|---|
| **Por UNI** | **todos** os quadros que entram na rede pela UNI |
| **Por EVC** | todos os quadros que passam por **uma EVC** dentro da UNI |
| **Por identificador CoS** | todos os quadros de uma EVC identificados pelos **bits de prioridade 802.1p** do tag do cliente |

**Quatro parâmetros** definem a vazão fornecida:

| Parâmetro | Significa |
|---|---|
| **CIR** | taxa média **garantida**, de acordo com os objetivos de desempenho do **SLA** (jitter, atraso etc.) |
| **CBS** | máximo de **bytes** permitidos para os quadros que entram, ainda **contados dentro do CIR** |
| **EIR** | taxa média **excedente** ao CIR, entregue **sem garantia** |
| **EBS** | máximo de bytes permitidos, ainda **contados dentro do EIR** |

## 4. Classes de serviço (CoS)

| Identificador | Como a classe é identificada |
|---|---|
| **Porta física** | **uma única** classe pode ser fornecida |
| **CE-VLAN CoS (802.1p)** | pelos **bits de prioridade** do tag de VLAN do cliente; o SLA especifica **perfil e desempenho** por classe |
| **DiffServ / IP TOS** | pelo **segundo byte do cabeçalho IP**; no TOS, até **8 classes**; no DiffServ, QoS mais robusta com os **PHBs** (*Per-Hop Behaviors*) |

Exemplo de uso: **voz** numa classe de alta prioridade e baixo atraso, **dados** em classe intermediária, **melhor esforço** na mais baixa.

## 5. Carrier Ethernet

**Objetivo:** prover serviços numa rede Metro Ethernet (MAN e WAN) com **a mesma qualidade das redes comutadas tradicionais** (ATM, frame relay) mantendo a **simplicidade e o baixo custo da Ethernet**. Os **atributos que a diferenciam de uma LAN comum (MEF)**:

| Atributo | Em resumo |
|---|---|
| **Qualidade de serviço** | desempenho comparável às redes comutadas; **vários níveis de SLA** para voz, dados e vídeo |
| **Confiabilidade** | detecta e se recupera de falhas em **menos de 50 ms**; **proteção de caminho fim a fim** |
| **Escalabilidade** | **mais de 100.000 clientes**; banda de **1 Mbps a 10 Gbps** com baixa granularidade |
| **Gerenciamento de serviços** | monitorar, diagnosticar e centralizar com **padrões independentes de fornecedor**; configuração rápida de novos serviços |
| **Serviços padronizados** | serviços globais por equipamentos padronizados; **sem alterar** os equipamentos de LAN dos usuários; conecta com redes existentes (ex.: TDM) |

## 6. Separação do tráfego

A Ethernet dá a cada usuário **acesso compartilhado** à rede. Bom numa LAN, mas os provedores precisam **separar o tráfego dos clientes em redes privadas**. Soluções: **IEEE 802.1ad (Q-in-Q)**, **IEEE 802.1ah (MAC-in-MAC)** e **PBT (802.1Qay)**.

### Base: o IEEE 802.1Q (VLAN)

- Cria **VLANs** numa rede Ethernet; **acrescenta 4 bytes (rótulo de 32 bits) ao quadro MAC** (campo **TAG**): **TPID** (valor **8100 hex**, 16 bits), **PCP** (prioridade, **802.1p**, 3 bits), **CFI** (não usado, valor 0, 1 bit) e **VID** (identificador da VLAN, **12 bits**).
- Faz os comutadores trocarem **só quadros com o mesmo identificador**; entre VLANs só passa por **equipamentos de camada de rede** (roteador, firewall).
- **VLAN por porta** (estática), **por MAC** (a estação pode mudar de porta e continua na mesma VLAN) e **de camada 3** (por IP de origem; mais flexível, mas exige mais processamento).
- **Portas untagged:** quadros **recebidos ganham o TAG**; quadros **enviados perdem o TAG**. **Portas tagged:** quadros recebidos **devem ter** TAG; os enviados **preservam** o TAG.
- Vantagens: **facilitar a administração** de grupos de estações, **restringir o tráfego** entre redes virtuais, **compatibilidade** com outros protocolos de acesso ao meio e **interoperabilidade** com redes 802.1D.

### IEEE 802.1ad — Q-in-Q (Provider Bridge, Stacked VLAN)

- Uma **C-VLAN** (*Customer VLAN*) é **encapsulada (tunelada) dentro de uma S-VLAN** (*Service VLAN*) do provedor. Permite **separação completa** do tráfego; o cliente é **livre para gerenciar suas C-VLANs**.
- O provedor tem **até 4096 S-VLANs**, atendendo até **4k clientes/serviços**.
- **Quadro:** igual ao 802.1Q, com **mais 4 bytes** para a S-VLAN; **EtherType de S-VLAN = 88A8 hex**; **TCI** de 2 bytes com **DEI** (*Drop Eligible Indicator*) e **PCP** (prioridade; junto com o DEI forma um parâmetro de descarte).

```
Cliente:    [Dst][Src][C-TAG][Tipo][Dados][FCS]
Provedor:   [Dst][Src][S-TAG][C-TAG][Tipo][Dados][FCS]      (+4 bytes)
```

**Conflito de VLANs entre clientes?** **Não**: a rede do provedor encaminha pela **S-VLAN**; os clientes podem repetir as mesmas C-VLANs.

### IEEE 802.1ah — MAC-in-MAC (Provider Backbone Bridging)

- Os pacotes da S-VLAN são **encapsulados por um novo cabeçalho com um novo MAC**, o **B-MAC** (*Backbone MAC*), **acrescentado na entrada do backbone e removido na outra ponta**. Os comutadores intermediários **só aprendem os B-MACs** do provedor.
- **Quadro:** **B-TAG** (marcação do backbone, com o **B-VID**) e **I-TAG** (marcação de serviço estendido: 3 bits de prioridade, 1 bit de elegibilidade de descarte, bits reservados e **I-SID de 24 bits**, que identifica o serviço: até **16 milhões** de usuários/serviços).
- **Vantagens:** **segurança** (o provedor só comuta endereçamento administrado por ele); **operação simplificada** (sem conflito de VLAN-IDs ou MACs de clientes); **menor custo** (menos memória e processamento); **escalabilidade** de até **16 M** usuários/serviços.

### 802.1ad e 802.1ah juntos

Sim: o slide mostra **ADSL com Q-in-Q e MinM**: na **rede de acesso** usa-se **Q-in-Q** e, na borda do **backbone**, o quadro é encapsulado em **MAC-in-MAC**.

### PBT — Provider Backbone Transport (802.1Qay)

- Atende às limitações de **escalabilidade e confiabilidade**; pode **substituir o PBB** ou rodar **em paralelo**.
- **Elimina** *learning* e *flooding* nos switches do backbone: o **VID + MAC** indica **um caminho único e pré-determinado** na rede do provedor, com **túneis ponto a ponto**; a alocação dos pares VID/MAC é feita por **gerência ou plano de controle**.
- Sem os problemas do **STP/MSTP**; permite **caminhos de proteção**; monitoração pelo **802.1ag**; **mesmo formato de cabeçalho do PBB**.
- Vantagens: bordas **não aprendem MACs dos clientes**; **robustez** (isolado de tempestades de broadcast e loops do cliente); proteção **simplificada e mais rápida**. **Não oferece E-LAN** (é ponto a ponto), mas o cliente pode separar o tráfego por VLANs.

---

## Exercícios

Lista: [`listas/lista-12.md`](../listas/lista-12.md) — respostas: [`respostas/lista-12.md`](../respostas/lista-12.md)

---

## Resumo

- **Metro Ethernet:** LANs distantes ligadas por **VLAN 802.1Q + CoS 802.1p**; **UNI** (UNI-C / UNI-N) e **EVC** (**E-LINE**, **E-LAN**).
- **Bandwidth Profile:** por **UNI**, por **EVC**, por **CoS**; **CIR, CBS, EIR, EBS**.
- **CoS:** porta física, **CE-VLAN CoS (802.1p)**, **DiffServ/IP TOS**.
- **Carrier Ethernet:** QoS, confiabilidade (< 50 ms), escalabilidade (> 100 mil clientes), gerência, serviços padronizados.
- **Q-in-Q (802.1ad):** S-VLAN + C-VLAN, EtherType 88A8, 4096 S-VLANs. **MAC-in-MAC (802.1ah):** B-MAC, I-SID de 24 bits. **PBT (802.1Qay):** caminhos pré-determinados, sem learning/flooding.

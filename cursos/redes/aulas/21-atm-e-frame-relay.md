# Aula 21 — ATM e Frame Relay

> ⚠️ **Sem slides:** conteúdo montado a partir da **lista da P2 (docx)** e de conhecimento geral. Para a base de células, circuitos virtuais e label swapping veja a [aula 02](02-comutacao.md). Lista: [`listas/lista-21.md`](../listas/lista-21.md)

# Parte A — ATM (Asynchronous Transfer Mode)

## 1. Células

**Célula ATM:** unidade de **tamanho fixo de 53 bytes = 5 de cabeçalho + 48 de dados**. (Diferença para pacote: pacote tem tamanho variável; célula, fixo e pequeno.)

**Por que células?**
- **Comutação por hardware** rápida (tamanho conhecido);
- **atraso baixo e previsível**, **jitter pequeno** (uma célula pequena não "prende" a fila);
- permite **multiplexação estatística** de voz, vídeo e dados na mesma rede;
- o 48 foi um **compromisso** entre quem queria 32 B (voz) e 64 B (dados).

Custo: **overhead de 5/53 ≈ 9,4%**.

## 2. Cabeçalho (5 bytes = 40 bits)

| Campo | Bits (UNI) | Função |
|---|---|---|
| **GFC** | 4 | controle de fluxo genérico (só na UNI; no NNI vira VPI) |
| **VPI** | 8 (12 no NNI) | identifica o **caminho virtual** |
| **VCI** | 16 | identifica o **canal virtual** |
| **PT** | 3 | tipo de carga (dados do usuário, OAM, congestionamento) |
| **CLP** | 1 | prioridade de descarte (**1 = descartável** primeiro) |
| **HEC** | 8 | CRC do cabeçalho (detecta/corrige 1 bit; delimita células) |

## 3. Conexões

**Classificação:**
- por **estabelecimento:** **PVC** × **SVC**;
- por **nível:** **VPC** (caminho virtual) × **VCC** (canal virtual);
- por **topologia:** ponto a ponto × ponto-multiponto.

| | **PVC** (Permanent) | **SVC** (Switched) |
|---|---|---|
| Como é criado | **manualmente**, pela gerência da operadora | **sob demanda**, por **sinalização** (Q.2931) |
| Duração | longa/permanente | só durante a comunicação |
| Analogia | linha privativa | ligação telefônica |

### VPI e VCI
- **VCI:** identifica um **canal virtual** (uma conexão) dentro de um caminho.
- **VPI:** identifica um **caminho virtual**, um **feixe** de VCs que seguem juntos.
- **Relação:** hierarquia **enlace → VP → VC**. Dá para comutar **só pelo VPI** (VP switch, grupo inteiro) ou por **VPI+VCI** (VC switch).

### Encaminhamento e label swapping
Cada comutador tem uma **tabela**: **(porta de entrada, VPI/VCI) → (porta de saída, novo VPI/VCI)**. Ao passar, a célula tem o **rótulo trocado**.

**Por que o label swapping é eficiente?** O rótulo é **curto e de significado local**, então a busca é uma consulta direta em tabela (**sem busca por prefixo mais longo** como no IP), feita em **hardware**; o cabeçalho continua pequeno.

## 4. Arquitetura

Modelo B-ISDN com **3 planos** (usuário, controle, gerência) e camadas:

| Camada | Funções |
|---|---|
| **Física** | transmissão de bits, **delimitação de células (HEC)**, adaptação ao meio (SDH) |
| **ATM** | geração/extração do cabeçalho, **tradução VPI/VCI**, multiplexação de células, controle de fluxo |
| **AAL** | adapta os dados da aplicação às células (**segmentação e remontagem – SAR**; convergência – CS) |
| **Camadas superiores** | aplicações do usuário |

### AAL — ATM Adaptation Layer
Serve para **adaptar** o tráfego de cada aplicação a células de 48 bytes, de acordo com o tipo de serviço.

| AAL | Tráfego |
|---|---|
| **AAL1** | CBR, orientado à conexão (emulação de circuito, voz) |
| **AAL2** | VBR de tempo real (voz/vídeo comprimidos) |
| **AAL3/4** | dados (com/sem conexão) |
| **AAL5** | dados, o mais simples e usado (**IP sobre ATM**) |

### OAM (Operation, Administration and Maintenance)
Funções de **operação e manutenção** via células especiais. Categorias:
- **Gerência de falhas:** detecção (**AIS**, **RDI/FERF**, continuidade, **loopback**);
- **Gerência de desempenho:** monitorar perda e erros de células;
- **Ativação/desativação** de funções de monitoração;
- **Gerência de sistema / configuração**.

## 5. Controle de tráfego e QoS

**Mecanismos:** **CAC** (controle de admissão: aceita a conexão só se há recursos), **UPC/NPC** (*policing* com **GCRA/leaky bucket**: marca CLP=1 ou descarta excesso), **modelagem (shaping)**, controle de prioridade (CLP), controle de congestionamento (EFCI, ABR).

**Parâmetros de QoS negociados na UNI:** **CTD** (atraso de transferência), **CDV** (variação do atraso/jitter), **CLR** (taxa de perda de células), **CER** (células com erro), **SECBR**, **CMR** (células inseridas por engano).

**Parâmetros de descrição do tráfego:** **PCR** (taxa de pico), **SCR** (taxa sustentável), **MBS** (rajada máxima), **MCR** (taxa mínima), **CDVT** (tolerância ao jitter).

**Categorias de serviço:** **CBR**, **rt-VBR**, **nrt-VBR**, **UBR**, **ABR** (e GFR).

# Parte B — Frame Relay

Tecnologia **WAN comutada por quadros**, orientada à conexão com **circuitos virtuais**, que **simplifica** o X.25: **não faz controle de erro nem de fluxo** no enlace.

## 6. Sem controle de erro/fluxo: prós e contras

| Vantagens | Desvantagens |
|---|---|
| **muito rápido**: o nó só confere o **FCS** e **descarta** se tiver erro (nenhuma retransmissão/ACK por salto) | erros e perdas só são recuperados **fim a fim**, por camadas superiores (retransmissões maiores) |
| **baixa latência** e alta vazão | **congestionamento → descartes**; não há retransmissão local |
| equipamentos simples | pressupõe **enlaces digitais confiáveis** (fibra) |

**Por que a latência é baixa, mas não constante?** Baixa porque o processamento por nó é mínimo. **Não constante** porque os **quadros têm tamanho variável** e passam por **filas** nos comutadores: o tempo depende do tamanho do quadro e do congestionamento → **jitter**. Por isso é menos adequado a voz (sem mecanismos extras).

## 7. DLCI e encaminhamento

**DLCI (Data Link Connection Identifier):** identificador do **circuito virtual** no cabeçalho do quadro (10 bits no formato básico), com **significado local** (cada enlace pode usar valores diferentes).

**Encaminhamento:** o comutador usa uma **tabela (porta de entrada, DLCI) → (porta de saída, novo DLCI)** — **troca de rótulo**, igual ao ATM. Verifica o FCS: se estiver errado, **descarta**.

## 8. Notificação explícita de congestionamento

O Frame Relay não tem controle de fluxo, mas **avisa** o congestionamento por bits do cabeçalho:
- **FECN** (*Forward ECN*): o comutador **liga o bit nos quadros que seguem para o destino**: "o caminho à frente está congestionado" — o destino/camadas superiores podem reduzir a janela.
- **BECN** (*Backward ECN*): ligado nos quadros que **voltam à origem**: "reduza a taxa" — a origem desacelera.
- **DE** (*Discard Eligible*): marca quadros **acima do CIR** como **descartáveis primeiro** em congestionamento.
- **CIR** (taxa garantida), **Bc** (rajada comprometida) e **Be** (rajada excedente) definem o contrato.

## 9. Topologia/uso típico
Interligar **filiais à matriz** por **PVCs** (topologia **estrela/hub-and-spoke**) ou **LAN-to-LAN** sobre a WAN da operadora, cobrando por CIR (hoje substituído por MPLS/Metro Ethernet).

---

## Exercícios

Lista: [`listas/lista-21.md`](../listas/lista-21.md) — respostas: [`respostas/lista-21.md`](../respostas/lista-21.md)

---

## Resumo

- **ATM:** célula fixa **53 B = 5 + 48**; cabeçalho GFC/**VPI**/**VCI**/PT/CLP/HEC; **PVC** (manual) × **SVC** (sinalização); **label swapping** por tabela; **AAL** adapta aplicações (AAL5 = dados/IP); QoS: CTD, CDV, CLR; classes CBR, VBR, UBR, ABR.
- **Frame Relay:** quadros variáveis, **sem erro/fluxo**; **DLCI** local; **FECN/BECN/DE**; rápido porém com jitter.

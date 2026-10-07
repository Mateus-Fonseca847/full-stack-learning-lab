# Respostas — Lista 21: ATM e Frame Relay

Lista: [`listas/lista-21.md`](../listas/lista-21.md) · Aula: [`aulas/21-atm-e-frame-relay.md`](../aulas/21-atm-e-frame-relay.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P2·Docx)*

> Qual a diferença entre células e pacotes? Por que são utilizadas células no ATM?

Célula = pacote **pequeno e de tamanho fixo** (ATM: 53 B). No ATM permite **comutação em hardware**, **atraso baixo e previsível**, pouco jitter e multiplexação de voz/vídeo/dados, ao custo de **overhead** (5/53 ≈ 9,4%).

## 2. *(P2·Docx)*

> Quais são os campos do cabeçalho ATM?

**GFC** (4 b, só UNI), **VPI** (8 b UNI / 12 b NNI), **VCI** (16 b), **PT** (3 b), **CLP** (1 b), **HEC** (8 b) = 5 bytes.

## 3. *(P2·Docx)*

> Como podem ser classificadas as conexões ATM? O que são PVCs e SVCs e como são estabelecidos?

Por estabelecimento (**PVC/SVC**), nível (**VPC/VCC**) e topologia (ponto a ponto/multiponto). **PVC:** criado **manualmente** pela gerência, permanente. **SVC:** criado **sob demanda por sinalização** (Q.2931) e desfeito ao final.

## 4. *(P2·Docx)*

> O que é VPI? O que é VCI? Qual a relação entre eles?

**VPI:** identifica o **caminho virtual** (feixe de canais). **VCI:** identifica o **canal virtual** dentro do caminho. Hierarquia **enlace → VP → VC**; comuta-se por VPI (grupo) ou VPI+VCI.

## 5. *(P2·Docx)*

> Como é feito o encaminhamento das células ATM? Por que o label swapping é eficiente?

Tabela **(porta, VPI/VCI) → (porta, novo VPI/VCI)**; a célula sai com o rótulo trocado. É eficiente porque o rótulo é **curto e local**, a busca é uma consulta direta em tabela feita em **hardware**, sem busca por prefixo.

## 6. *(P2·Docx)*

> Descreva resumidamente a arquitetura das redes ATM. Para que serve a AAL e quais os tipos?

Planos de usuário, controle e gerência; camadas **Física**, **ATM** e **AAL**. **AAL** adapta a aplicação a células de 48 B (**SAR/CS**): **AAL1** (CBR/voz), **AAL2** (VBR tempo real), **AAL3/4** (dados), **AAL5** (dados/IP).

## 7. *(P2·Docx)*

> O que é OAM e quais as principais categorias?

**Operação, Administração e Manutenção**: gerência de **falhas** (AIS, RDI, continuidade, loopback), de **desempenho**, ativação/desativação e gerência de sistema.

## 8. *(P2·Docx)*

> Como é feito o controle de tráfego nas redes ATM? Quais os parâmetros de QoS, de descrição de tráfego e as categorias de serviço?

**CAC**, **UPC/NPC (policing)**, shaping, prioridade por CLP e controle de congestionamento. **QoS:** CTD, CDV, CLR, CER, SECBR, CMR. **Tráfego:** PCR, SCR, MBS, MCR, CDVT. **Categorias:** CBR, rt-VBR, nrt-VBR, UBR, ABR.

## 9. *(P2·Docx)*

> Quais as vantagens e desvantagens de não fazer controle de erro ou fluxo no Frame Relay? Por que a latência é baixa, mas não constante?

**+** muito rápido (só confere FCS e descarta), baixa latência. **−** erros e perdas só são recuperados **fim a fim**; congestionamento causa descartes. A latência é baixa por haver **pouco processamento**, mas **varia** porque os quadros têm **tamanho variável** e passam por **filas**.

## 10. *(P2·Docx)*

> O que é DLCI? Como é feito o encaminhamento dos quadros no Frame Relay?

**DLCI** identifica o circuito virtual (significado **local**). O comutador consulta **(porta, DLCI) → (porta, novo DLCI)** e troca o rótulo; FCS errado → **descarta**.

## 11. *(P2·Docx)*

> Explique as notificações explícitas de congestionamento do Frame Relay e dê um exemplo de topologia/uso típico.

**FECN:** marcado nos quadros **rumo ao destino**; **BECN:** nos quadros **de volta à origem** (reduza a taxa); **DE:** quadros acima do CIR, descartáveis primeiro. Uso típico: **filiais → matriz** por PVCs (**estrela**) ou interligação de LANs.

## 12.

> Um pacote IP de **1500 bytes** é enviado por **AAL5** (trailer de 8 bytes). Quantas células são necessárias, quanto é preenchimento (padding), quantos bytes vão ao enlace e qual a eficiência?

1500 + 8 = 1508 B → ⌈1508/48⌉ = **32 células** (32·48 = 1536; **padding = 28 B**). Bytes no enlace: 32·53 = **1696 B**. Eficiência = 1500/1696 ≈ **88,4%** (a “taxa de célula” do ATM).

## 13.

> Qual o tempo para transmitir uma célula ATM a **155,52 Mbps**? Por que a rede ATM tem baixo jitter?

53·8 = 424 bits → 424/155,52·10⁶ ≈ **2,73 µs**. Com células tão curtas, nenhuma transmissão longa atrasa as demais na fila → **baixo e previsível jitter**.

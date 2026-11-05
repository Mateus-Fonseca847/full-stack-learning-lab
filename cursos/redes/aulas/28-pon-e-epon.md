# Aula 13 — Redes ópticas passivas (PON) e EPON

> Base: *aula 12 – PON* (primeira parte). Lista: [`listas/lista-13.md`](../listas/lista-13.md)

## 1. O que é uma PON

Uma **PON** (*Passive Optical Network*, rede óptica passiva) **entrega dados de uma fonte a vários pontos finais** usando **fibra óptica ligada a um divisor (splitter) sem alimentação elétrica**. Só o **divisor** é passivo: a rede ainda precisa de **energia nas pontas** (transmissão e recepção).

Analogia: a **caixa de distribuição de água** do prédio. Não tem bomba, só divide o fluxo para os apartamentos.

**Vantagens:** **menor custo operacional**, **menos equipamento e menos fibra**.

### Ativa × passiva *(complemento)*
Numa rede óptica **ativa** há **equipamentos alimentados no meio do caminho** (switches ou repetidores que convertem o sinal e o regeneram); na **passiva**, o meio do caminho **não tem eletrônica nem energia**. Em geral a **ativa** aparece em **backbone e metro** e a **passiva** no **acesso** (último trecho até o assinante).

```
Operadora ══ OLT ══ fibra ══ [ splitter ] ══ ONT (casa 1)
                                  ║══ ONT (casa 2)
                                  ╚══ ONU (meio da rede) ...
```

## 2. Os componentes

| Sigla | Nome | Função |
|---|---|---|
| **OLT** | *Optical Line Terminal* | **gerencia o sistema** e oferece a **interface de conexão ao resto da rede** (fica na operadora) |
| **ONU** | *Optical Network Unit* | recebe o sinal óptico e **converte em elétrico** (para um equipamento Ethernet); **ONU** quando está **no meio da rede** |
| **ONT** | *Optical Network Terminal* | o mesmo, mas **na casa do assinante**, em forma de modem |
| **ODN** | *Optical Distribution Network* | a rede **entre a OLT e a ONT**: **fibra óptica, splitters, conectores, cordões, extensões, caixas de emenda e de terminação óptica** |

### Splitters (elementos passivos da ODN)
Dividem o sinal óptico. Quanto à divisão de potência:

| | **Balanceado** | **Não balanceado (desbalanceado)** |
|---|---|---|
| Divisão | **simétrica** nas saídas | **assimétrica** nas saídas |
| Razões | **1:2, 1:4, 1:8, 1:16, 1:32, 1:64, 1:128** | **1:2**, em passos de **10%** (60/40, 70/30, 80/20, 90/10) ou de **5%** (65/35, 75/25, 85/15, 95/5) |
| Para quê | divisão igual para todos | atender **ramos com atenuação diferente** |

*(Complemento)* Um 1:N balanceado ideal perde **10·log₁₀ N dB** (1:2 ≈ 3 dB; 1:32 ≈ 15 dB). Num 90/10, a saída de 90% perde ~0,46 dB e a de 10%, ~10 dB.

## 3. Características de uma porta PON

| Característica | Detalhe |
|---|---|
| **Taxa de transmissão** | **downstream / upstream** |
| **Alcance lógico** | não depende dos recursos da camada física: **60 km** |
| **Alcance físico** | depende dos recursos da camada física: **20 km** |
| **Split ratio** | divisões feitas no sinal que sai de uma porta PON. **Aumentar o split ratio exige mais potência de transmissão**, para não prejudicar o alcance físico |
| **Meio** | fibra **padrão ITU-T G.652** |
| **Direção** | **full duplex** |
| **Método** | **unidirecional** (2 fibras: **1260–1360 nm** para downstream e para upstream) ou **bidirecional** (1 fibra: **1480–1500 nm** no downstream e **1260–1360 nm** no upstream) |

## 4. EPON — Ethernet PON

- Usa o **protocolo Ethernet**; especificações no **IEEE 802.3ah**; **dispensa conversão ou encapsulamento** ao ligar a redes Ethernet.
- Quadros de até **1518 bytes**; até **64 ONUs/ONTs por porta PON** da OLT.
- Eficiência de **informação útil** que chega ao usuário: **67%**.
- **FDD full duplex:** **1490 nm** no downstream e **1310 nm** no upstream.
- **Não usa CSMA/CD.** As ONUs **só enxergam o tráfego vindo da OLT**, **não veem o tráfego das outras ONUs** na fibra compartilhada. **Conexão entre duas ONUs só pela OLT.**
- **Upstream em TDMA**, com tempos de transmissão **controlados pela OLT**.

**Por que não CSMA/CD?** Porque o CSMA/CD depende de **escutar o meio e detectar colisão**, e aqui **as ONUs não ouvem umas às outras**. Por isso a **OLT concede janelas de tempo** a cada uma.

### Como ocorre a transmissão
- **Downstream:** a OLT envia os quadros Ethernet em **broadcast** para todas as ONUs; cada uma **filtra** o que é seu.
- **Upstream:** cada ONU transmite **em turnos, quando autorizada** pela OLT, na janela concedida; **fora da janela, guarda os dados em buffer**.

## 5. MPCP — Multi-Point Control Protocol

Protocolo **que controla a EPON**: permite **controlar a banda de cada usuário**, é definido **dentro da camada MAC** e usa **quadros Ethernet padrão**, na **mesma conexão dos dados**. A OLT **regula a banda upstream** de cada ONU **controlando o tamanho da janela de transmissão**.

**Funções principais:** **referência de tempo** para sincronizar as ONUs; **descoberta automática (auto-discovery)**; **atribuição de banda/timeslot** às ONUs.

**Cinco mensagens de controle MAC:**

| Mensagem | Para quê |
|---|---|
| **GATE** | OLT → ONU: **atribui banda**; leva **timestamp** (relógio global de referência) e o **tamanho da janela** |
| **REPORT** | ONU → OLT: **solicita banda** |
| **REGISTER_REQ**, **REGISTER**, **REGISTER_ACK** | usadas na **descoberta automática** |

### Descoberta automática (auto-discovery)
Serve para **determinar a distância entre ONU e OLT (*ranging*)**, **otimizar temporizações e controles** e **definir o LLID** da ONU.

**Por que medir a distância?** Cada ONU está a uma distância diferente, e a **luz leva tempo** para chegar. Sem compensar, as rajadas de ONUs diferentes **chegam fora do instante planejado e se sobrepõem**. Com o RTT medido, a ONU compensa seu atraso.

**Por que é necessário sincronismo?** Porque todo o acesso é **TDMA**: as ONUs precisam de uma **mesma referência de tempo** (o timestamp do GATE) para transmitir **exatamente na janela** concedida.

### LLID — Logical Link ID
- Etiqueta de **2 bytes**, **gerada dinamicamente pelo MPCP**, **embutida no preâmbulo** dos quadros.
- Preâmbulo da EPON: **SOP (1 byte)**, **OAM/Msg/Reservado**, **LLID (2 bytes)**, **CRC (1 byte)** (o preâmbulo continua com 8 bytes).
- **Função:** na ONU, a LLID **filtra** os quadros: se for igual à da ONU, o quadro é **aceito**; senão, **descartado**. Existe também a LLID do tipo **broadcast**, que **todas** as ONUs aceitam.
- **Por que mexer no preâmbulo não dá problema?** O preâmbulo só serve para **sincronismo**; **não carrega dado do usuário**, e o restante do quadro continua sendo **Ethernet padrão**.

### A ONU, downstream e upstream
- **Downstream:** recebe tudo em broadcast e **aceita só quadros com a sua LLID ou com a LLID de broadcast**.
- **Upstream:** espera um **GATE**, **transmite na janela** e usa o **REPORT** para pedir banda; fora da janela **guarda em buffer**.

## 6. Pratique

```bash
cd praticas
node splitter_pon.js 32 10      # perda do splitter e orçamento de potência
node epon_ranging.js            # por que o ranging evita colisão no upstream
```

---

## Exercícios

Lista: [`listas/lista-13.md`](../listas/lista-13.md) — respostas: [`respostas/lista-13.md`](../respostas/lista-13.md)

---

## Resumo

- **PON:** só o splitter é passivo; **OLT** (operadora), **ONT/ONU** (cliente/meio), **ODN** (fibra, splitters, conectores...).
- **Splitter balanceado** (1:2 a 1:128) × **não balanceado** (1:2 em passos de 10% ou 5%).
- **Porta PON:** taxa, alcance (lógico 60 km, físico 20 km), split ratio, G.652, full duplex, uni/bidirecional.
- **EPON:** 802.3ah, 1518 B, 64 ONUs, 67%, 1490/1310 nm, **sem CSMA/CD**, upstream **TDMA**.
- **MPCP:** GATE, REPORT, REGISTER_REQ/REGISTER/REGISTER_ACK; **ranging**; **LLID** no preâmbulo.

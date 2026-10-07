# Aula 02 — Comutação: circuitos, pacotes e mensagens

> Base: *Aula 2 – Circuitos × Pacotes*. Lista: [`listas/lista-02.md`](../listas/lista-02.md)

## 1. Por que comutar?

Ligar todos os dispositivos entre si (rede em **malha**) fica inviável quando a rede cresce: são n(n−1)/2 enlaces. A solução é a **comutação**: o processo pelo qual se estabelece uma **conexão temporária** entre dois ou mais terminais. O elemento que faz isso é o **comutador**; os terminais são os **dispositivos finais**.

Formas de comutação:

```
Comutação
├── de circuitos
├── de pacotes
│     ├── datagramas (não orientado à conexão)
│     └── circuitos virtuais (orientado à conexão)
└── de mensagens
```

## 2. Comutação de circuitos (ex.: telefonia clássica)

Um caminho **dedicado** é reservado entre as estações durante toda a comunicação. Cada enlace é dividido em canais por **TDM** (tempo) ou **FDM** (frequência).

**Três fases:**

1. **Estabelecimento** — reserva de recursos (banda, rota, buffer). Aqui acontece a disputa.
2. **Transferência de dados** — taxa constante garantida.
3. **Encerramento** — libera os recursos (por um dos terminais ou por um sistema de controle).

| Vantagens | Desvantagens |
|---|---|
| garantia de recursos e de taxa constante | **desperdício de banda** nos silêncios (reservado mas ocioso) |
| disputa só na fase de conexão | ruim quando o tempo de conexão é da ordem do tempo da comunicação |
| nós intermediários **não processam** dados → menor atraso | **probabilidade de bloqueio** (todos os circuitos ocupados) |

**Indicadores de desempenho:** tempo de estabelecimento da chamada, **probabilidade de bloqueio**, taxa garantida.

## 3. Comutação de pacotes (ex.: Internet)

- **Sem caminho dedicado** e **sem reserva prévia**: recursos alocados sob demanda; enlaces compartilhados.
- A informação é **quebrada em pacotes** = **cabeçalho + dados** (às vezes + trailer).
- **Cabeçalho:** informação de controle — endereço de destino (e origem), rota ou número de circuito virtual, número de sequência, tamanho, etc. Gera **overhead** (bytes que não são dado útil).
- **Nós intermediários = roteadores**, que fazem **armazena-e-reenvia (store-and-forward)**: recebem o pacote inteiro, examinam o cabeçalho, escolhem a rota, **enfileiram** (FIFO) e transmitem. **Fila cheia → pacote perdido.**

| Vantagens | Desvantagens |
|---|---|
| uso otimizado do meio | **sem garantia** de banda, atraso ou jitter |
| ideal para dados | ruim para voz e vídeo |
| erros recuperados no enlace onde ocorrem | overhead de cabeçalho |
| | disputa a cada nó; atrasos de fila e processamento |

**Indicadores de desempenho:** atraso (processamento + fila + transmissão + propagação), jitter, taxa de perda, vazão.

### Conta clássica: o benefício de fragmentar

Mensagem de **M = 12.000 bits**, caminho com **3 enlaces** (2 roteadores) de **R = 1 Mbps**, ignorando propagação:

- **Sem fragmentar** (mensagem inteira em cada salto): 3 × (12.000/1.000.000) = **36 ms**.
- **Em 3 pacotes de 4.000 bits** (pipeline): (M/P + H − 1) · P/R = (3 + 3 − 1) · 4 ms = **20 ms**.

Os pacotes seguem em "pipeline": enquanto o roteador 1 retransmite o pacote 1, a origem já envia o pacote 2.

### 3.1 Datagramas × Circuitos virtuais

| | **Datagramas** | **Circuitos virtuais (CV)** |
|---|---|---|
| Serviço | não orientado à conexão | **orientado à conexão** |
| Roteamento por | **endereço de destino completo** em cada pacote | **número do circuito virtual** (identificador local, menor que um endereço) |
| Tratamento | cada pacote é independente | pacotes seguem o mesmo caminho (não dedicado) |
| Ordem | podem chegar **fora de ordem** | chegam em ordem |
| Estado nos nós | **não mantém** | mantém **tabela de tradução** de números de CV |
| Falha de enlace | pacotes seguintes tomam outra rota | o circuito virtual **se desfaz** |
| Exemplos | **IP / Internet** | MPLS, ATM, X.25, Frame Relay |

### 3.2 Pacotes × Células

**Células** são pacotes **pequenos e de tamanho fixo**. Reduzem tempo de fila e processamento nos nós, permitem **roteamento por hardware** e melhor gerência de buffers → **menor atraso fim a fim**, menor probabilidade de erro por unidade. Custo: **maior overhead** de cabeçalho. Usadas em redes de alta velocidade, orientadas à conexão, com aplicações em tempo real (**ATM**: células de 53 bytes).

## 4. Comutação de mensagens

Parecida com pacotes, mas a unidade é a **mensagem inteira, de tamanho variável**. As mensagens sempre são aceitas. Consequências: **maior atraso fim a fim**, **maior probabilidade de erros**, **menor overhead** de cabeçalho.

## 5. Quadro-resumo

| | Circuitos | Pacotes (datagrama) | Pacotes (CV) | Mensagens |
|---|---|---|---|---|
| Caminho dedicado | sim | não | não (mas fixo) | não |
| Reserva de recursos | sim | não | opcional | não |
| Garantia de banda/atraso | sim | não | possível | não |
| Overhead | só na conexão | cabeçalho completo | cabeçalho curto | menor |
| Bom para | voz | dados | dados + tempo real | — |

**Pegadinha de prova:** "circuito virtual" **não** é circuito dedicado — os pacotes ainda são armazenados e enfileirados nó a nó; só o caminho é fixo.

---

## Exercícios

Lista: [`listas/lista-02.md`](../listas/lista-02.md) — respostas: [`respostas/lista-02.md`](../respostas/lista-02.md)

---

## Resumo

- Comutação = conexão temporária entre terminais, para evitar a malha completa.
- **Circuitos:** 3 fases, reserva de recursos, taxa constante, desperdício e bloqueio.
- **Pacotes:** cabeçalho + dados, store-and-forward, fila FIFO, sem garantias. **Datagrama** = por endereço, sem estado (IP). **CV** = por número de circuito, com estado e tabela (MPLS, ATM, Frame Relay).
- **Células** = pacotes pequenos de tamanho fixo (menor atraso, maior overhead).
- **Mensagens** = unidade grande e variável (maior atraso, menor overhead).

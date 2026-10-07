# Aula 01 — Fundamentos de redes: comunicação, classificação e topologias

> Base: *Aula 1 – Introdução*. Lista de exercícios: [`listas/lista-01.md`](../listas/lista-01.md)

## 1. Comunicação de dados

**Comunicação** é compartilhar informação (local ou remota). **Dados** são a informação em uma forma acordada entre as partes. Comunicação de dados = troca de dados entre dois dispositivos através de um meio de transmissão.

Como os dados são representados: texto (ASCII, Unicode), números (binário), imagens (pixels), áudio e vídeo.

### Modelo de um sistema de comunicação

Cinco componentes:

1. **Mensagem** — a informação.
2. **Emissor** — quem envia.
3. **Receptor** — quem recebe.
4. **Meio de transmissão** — o caminho físico (cabo, fibra, ar).
5. **Protocolo** — o conjunto de regras acordadas. Sem protocolo, dois dispositivos podem estar conectados e não se entender (como duas pessoas falando idiomas diferentes).

```
Emissor ──► [ meio de transmissão ] ──► Receptor
   └──────── mesmas regras (protocolo) ────────┘
```

## 2. O que é uma rede

Conjunto de dispositivos (**nós**: computador, impressora, estação) que fazem parte de um sistema de comunicação. Tem **hardware** (parte física) e **software** (parte lógica).

**Funções de uma rede de dados:**

- identificar os elementos da rede e suas funções;
- especificar como os componentes interoperam;
- implementar uma **arquitetura**: distribuir as funções entre os elementos de hardware e software.

### Indicadores de eficácia e desempenho

| Eficácia | Significa |
|---|---|
| **Entrega** | o dado chega ao destino certo |
| **Precisão** | chega sem alteração |
| **Sincronização** | chega a tempo de ser útil (importante para voz e vídeo) |

| Desempenho | Significa |
|---|---|
| **Vazão (throughput)** | quantos bits por segundo realmente passam |
| **Atraso (delay)** | tempo entre enviar e receber |
| **Jitter** | **variação** do atraso |

## 3. Classificação das redes

As redes podem ser classificadas por quatro critérios: modo de comunicação, modo de conexão, topologia e abrangência geográfica.

### 3.1 Modo de comunicação (direção das transmissões)

| Modo | Como funciona | Exemplo |
|---|---|---|
| **Simplex** | só um lado transmite | teclado, monitor |
| **Half-duplex** | os dois transmitem, mas **não ao mesmo tempo** | walkie-talkie |
| **Full-duplex** | os dois transmitem **simultaneamente** | telefone |

### 3.2 Modo de conexão

- **Ponto a ponto:** link dedicado entre dois dispositivos (controle remoto ↔ TV).
- **Multiponto:** mais de dois dispositivos dividem o mesmo enlace. Pode ser **broadcast** (difusão irrestrita — todos recebem) ou **multicast** (difusão restrita a um grupo). Ex.: emissora de TV → assinantes.

### 3.3 Topologia física × lógica

- **Topologia física:** a representação geométrica de como cabos, enlaces e dispositivos estão dispostos (por onde os cabos passam, onde ficam as estações).
- **Topologia lógica:** o **fluxo de dados** através da rede, independentemente de como está cabeado.

> Exemplo clássico: uma rede cabeada em estrela física (todos ligados a um hub/switch) pode se comportar logicamente como barramento (hub repete para todos).

## 4. Topologias

| Topologia | Como é | Vantagens | Desvantagens |
|---|---|---|---|
| **Malha** (completa) | cada estação ligada a todas as outras; **n(n−1)/2** enlaces | sem compartilhamento do meio, sem colisão, sem roteamento; robusta (tolera falha de enlace); privacidade | custo alto (muito cabeamento) |
| **Estrela** | nó central (hub/coordenador) gerencia tudo | sem compartilhamento nem colisão; roteamento centralizado | nó central falhou, rede parou |
| **Anel** | todos compartilham o meio; sinal anda em um sentido; acesso por **token** | sem roteamento; fácil instalar; isolamento de falhas | um enlace rompido derruba o anel (solução: anel duplo); precisa do token |
| **Barramento** | multiponto; um cabo comum | fácil de instalar; usa menos cabo | meio compartilhado → **colisões**; sinal enfraquece com a distância; precisa de roteamento |
| **Árvore** | hierarquia de redes e sub-redes ligadas por concentradores | diagnóstico, manutenção e expansão fáceis | taxa menor que em barra |
| **Híbrida** | combinação de duas ou mais | — | — |

**Conta para a prova:** malha completa com 10 nós = 10·9/2 = **45 enlaces** (e cada nó precisa de 9 portas).

### Por que compartilhar o meio?

- **Vantagem:** reduz custo (menos cabo, menos portas) e simplifica a instalação.
- **Desvantagem:** exige controle de acesso (quem fala quando), há colisões, e a banda é dividida entre os nós.
- **Onde ocorre:** barramento, anel, redes com hub, redes sem fio (o ar é compartilhado).

## 5. Abrangência geográfica

| Sigla | Nome | Alcance e exemplos |
|---|---|---|
| **PAN** | Personal Area Network | área muito reduzida; Bluetooth, computador ↔ periféricos |
| **LAN** | Local Area Network | prédio, casa, escritório; **altas taxas, baixo atraso, poucos erros**. Com fio: Ethernet (IEEE 802.3). Sem fio: WLAN/Wi-Fi (802.11) |
| **MAN** | Metropolitan Area Network | cidade; TV a cabo. Sem fio: WMAN/WiMAX (802.16) |
| **WAN** | Wide Area Network | país ou continente; taxas moderadas/baixas, erros moderados; dá acesso à Internet |
| **SAN** | Storage Area Network | liga servidores e armazenamento numa área limitada, altas taxas; Fibre Channel |

### Caminho até um servidor no Japão (esquema típico)

```
Casa (LAN/Wi-Fi) → rede de acesso (fibra/cabo/ADSL) → provedor (MAN)
   → backbone nacional (WAN) → cabo submarino intercontinental
   → backbone/provedor no Japão → rede do datacenter (LAN) → servidor
```

---

## Exercícios

Lista: [`listas/lista-01.md`](../listas/lista-01.md) — respostas: [`respostas/lista-01.md`](../respostas/lista-01.md)

---

## Resumo

- Sistema de comunicação = mensagem + emissor + receptor + meio + **protocolo**.
- Eficácia: entrega, precisão, sincronização. Desempenho: vazão, atraso, **jitter** (variação do atraso).
- Simplex (1 sentido), half-duplex (alternado), full-duplex (simultâneo).
- Ponto a ponto × multiponto (broadcast = todos; multicast = grupo).
- Topologia **física** = cabeamento; **lógica** = fluxo dos dados.
- Malha completa: **n(n−1)/2** enlaces. Barramento e anel compartilham o meio; estrela depende do nó central.
- PAN < LAN < MAN < WAN; SAN é para armazenamento.

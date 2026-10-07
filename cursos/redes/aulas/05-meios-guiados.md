# Aula 05 — Meios guiados: par trançado, coaxial e fibra óptica

> Base: *Aula 5 – Meios de transmissão* (parte guiada). Lista: [`listas/lista-05.md`](../listas/lista-05.md)

## 1. Panorama

| Guiados | Não guiados |
|---|---|
| fios de cobre (par trançado, coaxial), fibra óptica, meios magnéticos | rádio, micro-ondas, infravermelho, luz, satélite |

> **Meio magnético:** uma caixa com 1.000 fitas de 200 GB = 200 TB entregues em 24 h ≈ **19 Gbps** efetivos (400 Gbps se a entrega fosse em 1 h). Ótima vazão, péssima latência.

## 2. Par trançado

O meio **mais antigo e mais comum** (telefonia, LANs). Dois fios de cobre isolados e **trançados** (muitos pares dentro de uma capa).

**Por que são trançados?** Dois fios retos e paralelos funcionariam como **antena** (captam e irradiam interferência). O entrançamento faz com que as interferências se **cancelem**, reduzindo ruído e **diafonia (crosstalk)** entre pares.

- Serve para sinais analógicos e digitais; a banda depende da **espessura e do comprimento** do fio.
- Para longas distâncias precisa de **repetidores**.
- Comprimento: mínimo ~30 cm, **máximo 100 m** (limite onde a atenuação compromete a comunicação).

### Categorias

Em **todas** as categorias o limite é **100 m**. O que muda é a **frequência suportada** (logo a taxa) e a imunidade a interferência. Por que existem categorias diferentes? Porque a qualidade do cabo (número de tranças, pureza do cobre, isolamento) determina quão alta a frequência pode chegar sem atenuar demais.

| Categoria | Uso típico |
|---|---|
| Cat 1 | telefonia; inadequado para dados |
| Cat 2 | até 2,5 Mbps; obsoleto (Arcnet) |
| Cat 3 | até **10 Mbps**; ≥ 24 tranças/metro |
| Cat 4 | Token Ring 16 Mbps; praticamente sem fabricação |
| Cat 5 | 100 Mbps (e Gigabit em condições) |
| **Cat 5e** | **a mais comum** em LANs; menor atenuação; 100 MHz; 100 Mbps/1 Gbps |
| Cat 6 | 4 pares; Gigabit (1 Gbps até 100 m, 250 MHz); 10 Gbps até ~37 m |
| Cat 6A | **10 Gbps até 100 m** (500 MHz); backbone e data center |
| Cat 7 | conectores mais sofisticados e caros; melhor banda e atenuação |

**Categoria mais usada em LANs hoje:** Cat 5e (instalações novas costumam usar Cat 6/6A).

### UTP × STP

- **UTP** (Unshielded): sem blindagem, mais barato e comum.
- **STP** (Shielded): além do entrançamento tem **blindagem metálica externa**; usado em ambientes com **forte interferência** (grandes motores, antenas de transmissão próximas, indústria).

### Pinagem Ethernet (RJ-45)

| Pino | T568A | T568B |
|---|---|---|
| 1 | branco/verde | branco/laranja |
| 2 | verde | laranja |
| 3 | branco/laranja | branco/verde |
| 4 | azul | azul |
| 5 | branco/azul | branco/azul |
| 6 | laranja | verde |
| 7 | branco/marrom | branco/marrom |
| 8 | marrom | marrom |

- **Cabo direto:** mesmo padrão (A–A ou B–B) nas duas pontas. Liga dispositivos **diferentes** (PC ↔ switch).
- **Cabo crossover:** A numa ponta e B na outra. Liga dispositivos **iguais** (hub–hub, PC–PC, switch–switch). *(Switches modernos têm Auto-MDIX e dispensam o crossover.)*

### Certificação do cabo (o que o testador mede)

| Parâmetro | O que verifica |
|---|---|
| **Wiremap** | pinagem correta, curto, continuidade, pares trocados |
| **Retardo de propagação** | tempo do sinal de uma ponta à outra |
| **Delay skew** | diferença de retardo entre o par mais rápido e o mais lento (ideal 25–50 ns em 100 m) |
| **Cable length** | não excede 100 m |
| **Insertion loss** | **atenuação**: perda de potência entre entrada e saída |
| **NEXT** | **diafonia na ponta próxima**: interferência de um par em outro; **valor alto = cabeamento melhor** |
| **PSNEXT** | soma do NEXT dos 3 pares sobre o outro |
| **FEXT / ELFEXT / PSELFEXT** | idem, medido na ponta distante (receptor) |
| **ACR / PSACR** | quanto o sinal atenuado é mais forte que o crosstalk (relação sinal-ruído do cabo) |
| **DC loop resistance** | resistência total de um par em loop |

## 3. Cabo coaxial

Núcleo de **cobre rígido**, envolto por **isolante**, envolto por um **condutor externo cilíndrico (malha)**, coberto por **capa plástica**.

- **Por que tem boa imunidade a ruído?** A malha externa blinda o condutor central contra interferência externa e evita que o sinal irradie para fora.
- Banda possível depende do comprimento; até ~1 GHz.
- **50 Ω** → transmissão digital (**10BASE2** coaxial fino; **10BASE5** coaxial grosso). **75 Ω** → TV a cabo / internet a cabo.
- Hoje ainda usado em **TV a cabo** e em partes do backbone de telefonia.

**Dificuldades/desvantagens para LAN:** mais propenso a **mau contato**, conectores mais caros, cabo **menos flexível**, limitado a **10 Mbps** nas LANs.

**Par trançado × coaxial:** vantagem do par trançado = mais barato, flexível, fácil de instalar/manter (topologia em estrela). Desvantagem = menos imune a ruído e com menor banda/distância do que o coaxial.

## 4. Fibra óptica

Pode ultrapassar **50 Tbps** de capacidade. Hoje a sinalização é limitada a ~**10 Gbps** por canal, porque a conversão **elétrico ↔ óptico** é o gargalo (em laboratório já passa de 100 Gbps).

### Construção
- **Núcleo (core):** conduz a luz (sílica + dopante).
- **Casca (cladding):** sílica pura; mantém a luz confinada.
- **Revestimento (coating):** acrilato; protege o vidro.

### Sistema óptico: 3 componentes
1. **Fonte de luz** (LED ou laser): por convenção, **pulso de luz = 1**, ausência = 0.
2. **Meio de transmissão:** fibra de vidro ultrafina.
3. **Detector:** gera um pulso elétrico quando recebe luz.

### Como a luz se propaga
Por **reflexão interna total**: a luz que incide na fronteira núcleo/casca com ângulo **acima do crítico** é refletida de volta ao núcleo e segue guiada; abaixo do ângulo crítico é absorvida pela casca.

| | **Multimodo** | **Monomodo** |
|---|---|---|
| Raios | vários, cada um com ângulo diferente | **um** só |
| Núcleo | mais grosso (ex.: 50/62,5 µm) | bem fino (~8–10 µm) |
| Custo | menor | maior |
| Alcance | curto (LAN/prédio) | longo (ex.: **50 Gbps por 100 km sem amplificação**) |
| Dispersão | maior (pulsos se alargam) | mínima |

**Limitações:** a atenuação depende do **comprimento de onda** e do vidro; os pulsos de luz se **expandem** ao se propagar (dispersão), podendo sobrepor sinais e **reduzir a taxa de sinalização**.

**Junção:** mecânica, **fusão** ou conectores.

### Fibra × cobre

| Vantagens da fibra | Desvantagens |
|---|---|
| maior largura de banda | tecnologia mais complexa |
| imune a interferência eletromagnética | vulnerável a danos físicos |
| resistente à corrosão | transmissão **unidirecional** (um fio por sentido) |
| fina e leve | interfaces caras |
| baixa perda → poucos repetidores | |
| mais segura contra "grampo" | |

### Repetidores em longas distâncias (resposta-chave)

Todo meio **atenua** o sinal e o ruído se acumula; por isso enlaces longos precisam de regeneração. Isso vale para **par trançado, coaxial e fibra** (na fibra, a regeneração/amplificação é óptica). Para o mesmo comprimento L, a **fibra** precisa de **menos repetidores** (menor atenuação por km, sem interferência), seguida do coaxial e, por último, o par trançado.

---

## Exercícios

Lista: [`listas/lista-05.md`](../listas/lista-05.md) — respostas: [`respostas/lista-05.md`](../respostas/lista-05.md)

---

## Resumo

- **Par trançado:** trançado para cancelar interferência; 100 m; Cat 5e comum, Cat 6A para 10 Gbps; **UTP** (comum) × **STP** (blindado).
- Direto (A–A/B–B) × crossover (A–B). Certificação: wiremap, atenuação, **NEXT**, ACR, comprimento.
- **Coaxial:** malha blindada → boa imunidade; 50 Ω (digital), 75 Ω (TV a cabo).
- **Fibra:** núcleo + casca + coating; reflexão interna total; **multimodo** (curto, barato) × **monomodo** (longo, caro); maior banda, imune a EMI, menos repetidores.

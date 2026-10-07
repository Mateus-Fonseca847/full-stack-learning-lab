# Aula 20 — Redes ópticas: WDM, DWDM e seus dispositivos

> ⚠️ **Sem slides:** conteúdo montado a partir da **lista de redes óticas e DWDM** e de conhecimento geral. Pré-requisito: fibra óptica (aula 05). Lista: [`listas/lista-20.md`](../listas/lista-20.md)

## 1. WDM, CWDM e DWDM

**WDM (Wavelength Division Multiplexing):** transmitir **vários sinais ópticos, cada um num comprimento de onda (λ, "cor") diferente, na mesma fibra**. É a versão óptica do FDM.

| | **CWDM** (Coarse) | **DWDM** (Dense) |
|---|---|---|
| Espaçamento entre canais | **20 nm** (largo) | **0,8 nm (100 GHz)**, 0,4 nm (50 GHz) ou menos |
| Nº de canais | até ~18 (normalmente 8) | **40, 80, 160+** |
| Faixa | 1270–1610 nm | banda **C** (1530–1565 nm) e L |
| Lasers | sem controle de temperatura (**baratos**) | **resfriados/estabilizados** (caros) |
| Amplificação | sem EDFA (canais espalhados demais) | **EDFA** amplifica todos de uma vez |
| Distância | até ~80 km | **longa distância** (centenas/milhares de km) |
| Uso | redes metropolitanas, acesso | backbones, interurbano, submarino |

Cada λ pode carregar **10, 40, 100 Gbps ou mais** → uma fibra DWDM chega a **Tbps**.

## 2. Topologias

Ponto a ponto, **barramento**, **estrela**, **anel** e **malha (mesh)**.

### Broadcast-and-select (difusão e seleção) — estrela passiva
Um **acoplador estrela passivo** recebe todos os λ de todos os nós e **os difunde a todos**; cada nó **seleciona** o λ de interesse com um **receptor/filtro sintonizável**.

| Vantagens | Desvantagens |
|---|---|
| simples e **passiva** (sem comutação) | **perda de potência** (divide por N): limita o nº de nós |
| suporta **broadcast/multicast** naturalmente | exige **transmissores/receptores sintonizáveis** e protocolo de coordenação |
| fácil de expandir em pequena escala | sem **reuso de λ** |
| | **menos seguro**: todos recebem tudo |

### Anel
Nós ligados em anel por **WADMs**; cada um **insere/extrai** (add/drop) alguns λ e deixa passar os demais.

| Vantagens | Desvantagens |
|---|---|
| simples, barato | **capacidade compartilhada** no anel |
| **proteção** natural (caminho pelo outro sentido, ~50 ms) | escalabilidade e **latência** limitadas |
| bom para redes metropolitanas | difícil de expandir; só serve a padrões de tráfego de anel |

### Malha (mesh)
Nós **OXC** interligados de forma irregular; os caminhos (**lightpaths**) são calculados por **RWA** (*Routing and Wavelength Assignment*).

| Vantagens | Desvantagens |
|---|---|
| **uso eficiente** da capacidade (vários caminhos) | **controle complexo** (RWA) |
| **escalável** e flexível; restauração por caminhos alternativos | **restrição de continuidade de λ** (mesma cor fim a fim, sem conversor) |
| menos fibra ociosa que o anel | custo maior |

## 3. Camada de adaptação IP ↔ DWDM

**Por que é necessária?** O IP gera **pacotes de tamanho variável, em rajadas**; o DWDM entrega **canais ópticos (λ) de alta capacidade, orientados a circuito**, sem noção de pacote, endereçamento, OAM ou proteção. É preciso uma **camada intermediária** que faça **enquadramento, mapeamento, agregação (grooming), FEC, monitoração (OAM) e proteção**. Hoje: **IP/MPLS sobre Ethernet/OTN (G.709) sobre DWDM** (no passado, IP sobre ATM sobre SDH sobre WDM).

## 4. Comutação em redes ópticas

| Forma | Granularidade | Observação |
|---|---|---|
| **Comutação de circuitos ópticos / de comprimento de onda (λ)** | um **canal inteiro** | a mais usada; **OXC/ROADM** |
| **Comutação de rajadas (OBS)** | rajadas de dados | reserva por pacote de controle à frente |
| **Comutação de pacotes (OPS)** | pacote | exige buffer óptico (ainda experimental) |
| Comutação de fibra/banda | fibra inteira / grupo de λ | granularidade muito grossa |

### Comutação de comprimento de onda (λ)
Um **lightpath** é estabelecido **fim a fim**, e cada nó comuta o **λ inteiro** de uma fibra de entrada para uma de saída **sem conversão O-E-O**.

| Vantagens | Desvantagens |
|---|---|
| **transparente** a taxa e protocolo | **granularidade grossa**: gasta um λ inteiro mesmo para tráfego pequeno |
| **sem O-E-O** → baixa latência e consumo | **bloqueio** se não houver λ livre / continuidade |
| altíssima capacidade | **setup lento** (ms) |

### Controle in-band e out-of-band
- **In-band:** a informação de controle viaja **no mesmo canal/λ dos dados** (cabeçalhos/overhead embutidos no quadro, p. ex. OTN, ou *pilot tones*).
- **Out-of-band:** o controle usa um **canal separado**: um **λ dedicado** (**OSC – Optical Supervisory Channel**, ~1510 nm) ou uma **rede de controle à parte** (IP/Ethernet, GMPLS).

## 5. Dispositivos de camada física

Lasers/transmissores, fotodetectores, **acopladores**, **filtros**, **mux/demux** (AWG), **amplificadores**, **FBG**, **linhas de atraso**, **WADM/ROADM**, **OXC**, **conversores de λ**, **transponders**, isoladores/circuladores.

### Fibre Delay Line (FDL — "FBL" na lista)
Um **trecho de fibra** que **atrasa** o sinal pelo tempo de propagação (~**5 µs por km**). Como **não existe RAM óptica**, serve de **buffer óptico**.
- **Uso típico:** resolver **contenção** em comutadores ópticos (OBS/OPS) e **sincronizar/alinhar** pacotes.
- **Vantagens:** simples, passivo, mantém o sinal no domínio óptico. **Desvantagens:** atraso **fixo/discreto** (não é FIFO de verdade), **volumoso** (quilômetros de fibra), há **atenuação**, sem acesso aleatório.

### In-Fibre Bragg Grating (FBG)
Trecho da fibra cujo núcleo tem **índice de refração modulado periodicamente**; **reflete uma faixa estreita de λ** (a que satisfaz a condição de Bragg, λ_B = 2·n·Λ) e **deixa passar as demais**. Usos: **filtros**, **add/drop**, compensação de dispersão, sensores.

### Acoplador óptico
Dispositivo **passivo** que **divide** a luz de uma entrada em várias saídas (ou **combina** várias entradas). Divisão 1×N → perda ≥ 10·log₁₀N dB. Usado em **broadcast-and-select** e para tirar cópias do sinal.

### Amplificadores ópticos
Amplificam o sinal **sem converter para elétrico**:
- **EDFA (fibra dopada com érbio):** bombeado por laser (980/1480 nm); amplifica toda a **banda C** de uma vez → o "cavalo de batalha" do DWDM;
- **Raman:** amplificação **distribuída** ao longo da própria fibra de transmissão;
- **SOA (semicondutor):** compacto, usado em comutação/integrado.

### WADM (Wavelength Add/Drop Multiplexer)
Demultiplexa o sinal WDM, **extrai (drop)** alguns λ para o nó local, **insere (add)** λ locais e **deixa passar** os demais, remultiplexando. É o elemento do **anel**. (Versão reconfigurável: **ROADM**.)

### OXC (Optical Cross-Connect)
Matriz que **comuta λ entre várias fibras**: demux de cada fibra de entrada → **matriz de comutação** (ex.: MEMS) → (conversores de λ opcionais) → mux das fibras de saída. É o nó da **malha**.

### Esquema de uma rede DWDM com WADMs e OXCs
```
        Anel metro (WADMs)                    Malha de longa distância (OXCs)
   ┌──WADM────WADM──┐                       OXC ────── OXC
   │  ▲ add/drop ▲  │                        │  ╲    ╱  │
 WADM             WADM ──────fibra────────► OXC ─── OXC─┘
   │                │                        (EDFAs a cada ~80 km)
   └──WADM────WADM──┘
```

## 6. Sinal cinza × colorido; multiplexação e comutação de canais

| | **Sinal cinza** | **Sinal colorido** |
|---|---|---|
| O que é | sinal do **cliente** (roteador, SDH...) em λ **padrão** de curto alcance (1310/1550 nm), **sem λ da grade ITU** | sinal em um **λ específico da grade ITU-T** (ex.: 1550,12 nm) — **compatível com DWDM** |
| Gerado por | interface do equipamento do cliente | **transponder** (ou interface colorida) |

**É possível multiplexar canais de várias cores?** **Sim — é exatamente o WDM**: cores diferentes **não interferem** e viajam juntas na mesma fibra.

**Como se multiplexa:** cada sinal cinza entra num **transponder** (conversão **O-E-O** + laser colorido), e um **multiplexador óptico** (AWG ou filtros de película fina) **junta** os λ numa fibra; amplificam-se com **EDFA**; no destino, o **demultiplexador** separa e os **transponders** devolvem sinais cinza. (Equipamentos: transponders/muxponders, mux/demux, EDFAs, WADMs.)

**Como se comuta:** por **OXC/ROADM** (matriz **MEMS** ou **WSS — wavelength selective switch**), que direcionam **cada λ** de uma fibra de entrada a uma de saída.

---

## Exercícios

Lista: [`listas/lista-20.md`](../listas/lista-20.md) — respostas: [`respostas/lista-20.md`](../respostas/lista-20.md)

---

## Resumo

- **WDM:** vários λ numa fibra. **CWDM** (20 nm, barato, curto) × **DWDM** (0,8 nm ou menos, 40–160+ canais, EDFA, longo).
- Topologias: **broadcast-and-select** (estrela passiva), **anel** (WADM, proteção), **malha** (OXC, RWA).
- Adaptação IP↔DWDM: enquadramento, grooming, FEC, OAM (OTN).
- **Comutação de λ**: transparente, sem O-E-O, granularidade grossa.
- Dispositivos: **FDL** (buffer), **FBG** (filtro), **acoplador**, **EDFA/Raman/SOA**, **WADM**, **OXC**, transponders (cinza → colorido).

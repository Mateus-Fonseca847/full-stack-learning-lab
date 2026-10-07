# Aula 18 — Redes sem fio: rádio, propagação, antenas e modulação

> ⚠️ **Sem slides:** conteúdo montado a partir da **lista de Wi-Fi** da P2 e de conhecimento geral. Lista: [`listas/lista-18.md`](../listas/lista-18.md). Continua na [aula 19](19-wifi-802-11-mac.md).

## 1. Ondas, ISM e canais

**Onda eletromagnética:** oscilação acoplada de campos **elétrico e magnético** que se propaga no vácuo à velocidade da luz (**c = 3×10⁸ m/s**), com **f·λ = c** (aula 06).

**Faixas ISM** (*Industrial, Scientific, Medical*): faixas de uso **sem licença**, com limites de potência. Principais: **900 MHz**, **2,4 GHz**, **5 GHz**. Usos: Wi-Fi, Bluetooth, ZigBee, telefone sem fio, **forno de micro-ondas** (interfere em 2,4 GHz!), controles remotos.

### Canalização do Wi-Fi

| Faixa | Canais | Largura | Detalhes |
|---|---|---|---|
| **2,4 GHz** (2400–2483,5 MHz) | 1 a 13 no Brasil (14 só no Japão); espaçados de **5 MHz** | cada canal ocupa **~20–22 MHz** | canais vizinhos **se sobrepõem**: só **3 canais sem sobreposição: 1, 6 e 11** |
| **5 GHz** | 36, 40, 44, 48... (a cada 4 números = **20 MHz**) | 20, 40, 80 ou 160 MHz (juntando canais) | **muitos** canais sem sobreposição; alguns exigem **DFS** (evitar radar) |

Frequência central: 2,4 GHz → `2407 + 5·n` MHz (canal 1 = 2412 MHz); 5 GHz → `5000 + 5·n` MHz (canal 36 = 5180 MHz). *(O Wi-Fi 6E ainda usa a faixa de 6 GHz.)*

## 2. Polarização

**Polarização** é a **orientação do campo elétrico** da onda. Tipos:
- **Linear:** **vertical** ou **horizontal**;
- **Circular:** o campo gira (**direita** ou **esquerda**);
- **Elíptica:** caso geral.

Antenas transmissora e receptora devem ter a **mesma polarização**; se forem ortogonais (uma vertical, outra horizontal) há **grande perda** (descasamento de polarização).

## 3. Mecanismos de propagação

| Mecanismo | O que acontece |
|---|---|
| **Linha de visada (LOS)** | caminho direto; perda no espaço livre cresce com distância e frequência |
| **Reflexão** | onda bate numa superfície grande (parede, piso) e volta |
| **Refração** | muda de direção ao passar de um meio a outro |
| **Difração** | contorna obstáculos / quinas |
| **Espalhamento (scattering)** | objetos pequenos dispersam a onda em várias direções |
| **Absorção** | energia vira calor (paredes, água, corpo humano) |

Reflexão, difração e espalhamento criam **múltiplos caminhos (multipath)**: cópias do sinal chegam em instantes diferentes → interferência (desvanecimento), mas que o **MIMO** transforma em vantagem.

**Perda no espaço livre:** FSPL(dB) = 20·log₁₀(d_km) + 20·log₁₀(f_MHz) + 32,44. Dobrar a distância custa **+6 dB**; 5 GHz perde mais que 2,4 GHz (≈ +6,4 dB).

## 4. SNR, BER, perda e alcance

**SNR (Relação Sinal-Ruído)** = potência do sinal ÷ potência do ruído; em dB: **SNR = 10·log₁₀(Ps/Pn)**.
- **Importância:** define a **qualidade** do enlace, a **modulação** que dá para usar e a **capacidade** (Shannon: C = B·log₂(1+SNR)).

**BER (Bit Error Rate)** = fração de bits recebidos com erro. **Relação:** quanto **maior a SNR**, **menor a BER** (a BER cai quase exponencialmente com a SNR; depende da modulação).

**Correlação BER × perda × alcance:**
```
↑ distância / obstáculos
   → ↑ perda de transmissão (path loss)
   → ↓ potência recebida → ↓ SNR
   → ↑ BER → mais retransmissões e taxa menor
   → limite do ALCANCE útil (quando a BER passa do tolerável)
```

## 5. Antenas

**Diagrama de irradiação** (radiation pattern): gráfico (normalmente **polar**, nos planos horizontal e vertical) da **intensidade relativa irradiada em cada direção**. Informa: **direção e largura do lóbulo principal** (**beamwidth**, em −3 dB), **ganho (dBi)**, **lóbulos laterais**, **nulos** e **relação frente-costas**.

**Antena mais usada em Wi-Fi:** a **omnidirecional** (dipolo, 2–5 dBi). **Por quê?** Cobre **360° no plano horizontal** sem precisar apontar, é **barata e simples**, e os clientes estão **espalhados e se movem**. (Direcionais — painel, Yagi, parabólica — servem a enlaces ponto a ponto de longa distância.)

## 6. MIMO

**MIMO (Multiple Input, Multiple Output):** várias antenas no **transmissor e no receptor**. Aproveita o **multipath** para:
- **Multiplexação espacial:** envia **fluxos independentes** ao mesmo tempo, no mesmo canal → **mais vazão**;
- **Diversidade:** combina cópias → **mais confiabilidade/alcance**;
- **Beamforming:** direciona a energia ao cliente.

Presente desde o **802.11n**; no **ac/ax** vira **MU-MIMO** (vários clientes simultâneos).

## 7. Multiplexação e espalhamento espectral

| Técnica | Ideia |
|---|---|
| **TDM** | divide o **tempo** entre usuários |
| **FDM** | divide a **banda em faixas** de frequência, cada uma para um usuário |
| **OFDM** | divide o canal em **muitas subportadoras estreitas e ortogonais**, transmitidas **em paralelo**; "ortogonais" = espaçadas de forma que **não interferem** apesar de se sobreporem; cada uma tem símbolos lentos → **robusto ao multipath** (com intervalo de guarda). Usado no 802.11a/g/n/ac/ax (ex.: 52 subportadoras em 20 MHz: 48 dados + 4 piloto) |

**Espalhamento espectral** (usa banda **maior** que a necessária, para resistir a interferência e ganhar segurança):
- **FHSS (Frequency Hopping):** salta entre canais numa **sequência pseudoaleatória** conhecida por emissor e receptor (802.11 original, Bluetooth).
- **DSSS (Direct Sequence):** cada bit é multiplicado por uma **sequência de chips** (Barker de 11 chips), **espalhando** o sinal numa banda larga; resistente a interferência de banda estreita (802.11 original e **802.11b**).

**Duplexação:** como se obtém **comunicação nos dois sentidos**:
- **TDD (Time Division Duplex):** mesma frequência, **alternando no tempo** — **é o do Wi-Fi** (rádio half-duplex);
- **FDD (Frequency Division Duplex):** **frequências diferentes** para cada sentido — comum em celular.

## 8. Modulação

**Modulação** = variar **amplitude, frequência ou fase** de uma **portadora** para carregar bits.

| Técnica | Varia |
|---|---|
| ASK | amplitude |
| FSK | frequência |
| PSK (BPSK, QPSK) | fase |
| **QAM** (16, 64, 256, 1024, 4096-QAM) | **amplitude + fase** |

**No Wi-Fi:** DBPSK/DQPSK (802.11b), **BPSK, QPSK, 16-QAM, 64-QAM** (a/g/n), **256-QAM** (ac), **1024-QAM** (ax), 4096-QAM (be).

**Por que algumas modulações servem a ambientes ruidosos?** Num diagrama de constelação, **BPSK/QPSK** têm **poucos pontos bem afastados** → tolera mais ruído (SNR baixa), mas carrega **poucos bits/símbolo**. **256-QAM** tem **muitos pontos próximos** → mais bits/símbolo, mas **exige SNR alta**; com ruído, os pontos se confundem e a BER explode.

| Modulação | Bits/símbolo | SNR exigida |
|---|---|---|
| BPSK | 1 | baixa |
| QPSK | 2 | baixa |
| 16-QAM | 4 | média |
| 64-QAM | 6 | alta |
| 256-QAM | 8 | muito alta |

### Modulação e codificação adaptativa (AMC / adaptação de taxa)
O rádio **mede a qualidade do enlace** (SNR, erros, perdas de ACK) e **escolhe dinamicamente** a combinação **modulação + taxa de código (FEC)** — o **MCS** (*Modulation and Coding Scheme*):
- **Sinal bom** → modulação alta + pouca redundância → **taxa máxima**;
- **Sinal ruim** (longe/ruído) → modulação robusta + mais redundância → **taxa menor, mas sem perder o enlace**.

É por isso que a velocidade do Wi-Fi **cai gradualmente** ao se afastar do roteador, em vez de cair a zero de uma vez.

---

## Exercícios

Lista: [`listas/lista-18.md`](../listas/lista-18.md) — respostas: [`respostas/lista-18.md`](../respostas/lista-18.md)

---

## Resumo

- **ISM** = sem licença (900 MHz, 2,4 GHz, 5 GHz). 2,4 GHz: só **canais 1, 6, 11** sem sobreposição.
- **SNR ↑ → BER ↓**; distância ↑ → perda ↑ → SNR ↓ → BER ↑ → alcance limitado.
- **Omnidirecional** (cobertura 360°) é a mais usada; **MIMO** usa multipath para mais vazão/confiabilidade.
- **OFDM** (subportadoras ortogonais), **FHSS/DSSS** (espalhamento), **TDD** (Wi-Fi).
- Modulação alta = rápida mas frágil; **AMC** troca modulação/codificação conforme o canal.

# Respostas — Lista 18: Wi-Fi: rádio, propagação, antenas e modulação

Lista: [`listas/lista-18.md`](../listas/lista-18.md) · Aula: [`aulas/18-wifi-fundamentos-fisicos.md`](../aulas/18-wifi-fundamentos-fisicos.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P2·Wi-Fi q.3)*

> Descreva a canalização usada para o Wi-Fi nas 2 faixas de frequência mais usadas.

**2,4 GHz:** canais 1–13 espaçados de **5 MHz** e com ~20–22 MHz de largura → só **1, 6 e 11** sem sobreposição. **5 GHz:** canais de **20 MHz** (36, 40, 44, 48...), combináveis em 40/80/160 MHz; muitos canais sem sobreposição (alguns com DFS).

## 2. *(P2·Wi-Fi q.4)*

> O que é e quais os tipos de polarização existentes?

Orientação do **campo elétrico** da onda: **linear** (vertical/horizontal), **circular** (direita/esquerda) e **elíptica**. Antenas devem ter a mesma polarização para evitar perda.

## 3. *(P2·Wi-Fi q.5)*

> Explique os principais mecanismos de propagação.

**Linha de visada**, **reflexão**, **refração**, **difração**, **espalhamento** e **absorção**; reflexão/difração/espalhamento geram **multipath**.

## 4. *(P2·Wi-Fi q.6-8)*

> O que é SNR e qual sua importância? Qual a relação entre BER e SNR? Correlacione BER, perda de transmissão e alcance.

**SNR** = potência do sinal ÷ do ruído (dB); define qualidade, modulação possível e capacidade. **↑SNR → ↓BER.** Mais distância → **↑perda** → **↓SNR** → **↑BER** → menos taxa/mais retransmissão → limite de **alcance**.

## 5. *(P2·Wi-Fi q.9)*

> O que é o diagrama de irradiação? Quais informações podem ser lidas nesse tipo de diagrama?

Gráfico polar da **intensidade irradiada por direção**. Mostra **lóbulo principal e largura de feixe**, **ganho**, **lóbulos laterais**, **nulos** e relação frente-costas.

## 6. *(P2·Wi-Fi q.10)*

> Qual o tipo de antena mais usada em redes Wi-Fi? Por que esse modelo é o mais usado?

A **omnidirecional (dipolo)**: cobre **360°** horizontais sem apontar, é **barata e simples** e atende clientes móveis em posições variadas.

## 7. *(P2·Wi-Fi q.11)*

> O que é MIMO? Como funciona e por que é usado?

**Múltiplas antenas** no transmissor e no receptor, aproveitando o multipath para **multiplexação espacial** (mais vazão), **diversidade** (confiabilidade) e **beamforming**. Usado para **aumentar taxa e alcance**.

## 8. *(P2·Wi-Fi q.12)*

> Explique o TDM, FDM e OFDM.

**TDM:** divide o tempo. **FDM:** divide a banda em faixas. **OFDM:** divide o canal em **muitas subportadoras ortogonais** transmitidas em paralelo (símbolos lentos e **robustos ao multipath**); usado do 802.11a em diante.

## 9. *(P2·Wi-Fi q.13)*

> Explique FHSS e DSSS.

**FHSS:** **salta** entre canais numa sequência pseudoaleatória. **DSSS:** multiplica cada bit por uma **sequência de chips**, espalhando o sinal em banda larga. Ambos dão **resistência a interferência**.

## 10. *(P2·Wi-Fi q.14)*

> O que é duplexação? Como é feita?

Obter comunicação **bidirecional**: **TDD** (mesma frequência, alternando no tempo — Wi-Fi) ou **FDD** (frequências distintas por sentido — celular).

## 11. *(P2·Wi-Fi q.15-16)*

> O que é modulação? Quais as principais usadas no Wi-Fi? Por que algumas são mais indicadas para ambientes ruidosos?

Variar **amplitude, frequência ou fase** de uma portadora para levar bits. Wi-Fi: **BPSK, QPSK, 16/64/256/1024-QAM**. Modulações de **baixa ordem** (BPSK/QPSK) têm pontos da constelação **bem afastados**, toleram **SNR baixa**; as de alta ordem carregam mais bits mas **exigem SNR alta**.

## 12. *(P2·Wi-Fi q.17)*

> Como funciona a modulação e codificação adaptativa? Explique seu uso no Wi-Fi.

O rádio **mede a qualidade do enlace** e escolhe o **MCS** (modulação + taxa de código): sinal bom → modulação alta/pouca redundância; sinal ruim → modulação robusta/mais redundância. Por isso a velocidade **cai gradualmente** ao se afastar do AP.

## 13.

> Calcule a perda no espaço livre (FSPL = 20·log d(km) + 20·log f(MHz) + 32,44) a **100 m** para (a) 2,4 GHz e (b) 5 GHz. Qual a perda a 200 m em 2,4 GHz?

(a) 20·log(0,1) + 20·log(2400) + 32,44 = −20 + 67,6 + 32,44 ≈ **80,0 dB**. (b) −20 + 74,0 + 32,44 ≈ **86,4 dB** (5 GHz perde ~6,4 dB a mais). A 200 m em 2,4 GHz: ≈ **86,1 dB** (dobrar a distância custa **+6 dB**).

## 14.

> O sinal recebido é −60 dBm e o ruído é −90 dBm. Qual a SNR? Se a SNR for 30 dB e a banda 20 MHz, qual o limite de Shannon?

SNR = −60 − (−90) = **30 dB** (razão de 1000). C = B·log₂(1 + SNR) = 20·10⁶·log₂(1001) ≈ **199 Mbps**.

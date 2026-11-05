# Aula 04 — Camada física sem fio: espalhamento espectral, múltiplo acesso e duplexação

> Base: *Wi-Fi · aula – Camada física*. Lista: [`listas/lista-04.md`](../listas/lista-04.md)

## 1. Espalhamento espectral

**Espalhamento espectral** é usar uma banda **maior que a necessária** para ganhar **segurança**, resistir a **interferência** e combater o **esmaecimento por vários caminhos**. Há duas técnicas.

### FHSS — Frequency Hopping Spread Spectrum (salto de frequência)

- O transmissor **troca de frequência de tempos em tempos**, numa sequência **aparentemente aleatória**; o receptor **salta em sincronia** e capta o sinal.
- **Só quem conhece a sequência de saltos recebe** os dados com sucesso.
- A troca acontece a cada **Tc** segundos; o símbolo dura **Ts**:
  - **Slow FHSS:** Tc ≥ Ts. **Fast FHSS:** Tc < Ts (**melhor desempenho**).
- **Muito resistente** a ruído e interferência: uma fonte de ruído numa frequência só afeta a transmissão **enquanto o salto estiver ali**.
- A cada instante a portadora assume uma de **2^k** frequências (k = tamanho do código). O código **não modula** a portadora: determina as frequências geradas pelo **sintetizador**.
- Frequência transmitida = **f0 + fN** (f0: portadora modulada pelos dados; fN: frequência do sintetizador a cada salto).

Analogia: dois amigos que combinam de trocar de sala a cada minuto numa ordem secreta; quem não souber a ordem não os acha.

### DSSS — Direct Sequence Spread Spectrum (sequência direta)

- **Todas as estações usam a mesma frequência**; a cada usuário é dado um **código exclusivo**. Gasta **pouca energia** (menor potência possível).
- Cada bit é combinado (**XOR**) com uma **sequência pseudoaleatória** de taxa maior: **bit 0 → o código; bit 1 → o código invertido**. O sinal resultante tem **taxa muito maior** e depois modula a portadora.
- Na recepção faz-se **de novo o XOR** com a mesma sequência, recuperando o sinal original.
- Sinais de **outros códigos** (não correlacionados) ficam espalhados, como se fossem ruído, **sem se misturar** ao canal desejado.
- Uma **interferência estreita** é **diluída** ao longo da faixa espalhada pelo correlador.
- No cálculo da SNR, **ruído = interferências + os demais canais espalhados**.

Analogia: numa festa, várias pessoas falam **idiomas diferentes** ao mesmo tempo; você só entende (e destaca) quem fala o seu idioma, e o resto soa como murmúrio.

## 2. Múltiplo acesso

| Técnica | Como divide | Detalhes |
|---|---|---|
| **TDMA** | o **tempo** em *time slots*, agrupados em quadros | um canal de frequência; **um usuário por slot**; cada usuário tem um slot que **se repete a cada quadro**; **tempo de guarda** entre slots |
| **FDMA** | a **banda W em N canais não sobrepostos**, de largura Wu | canais dados **sob demanda**; durante o serviço, **ninguém mais usa** a faixa; **banda de guarda** |
| **CDMA** | por **código** (similar ao DSSS) | mais resistente a interferência e **difícil de rastrear ou ouvir escondido**; códigos **longos** são mais fáceis de identificar e **menos sensíveis a erros**; pode separar **usuários e infraestrutura** |
| **OFDMA** | em **subportadoras ortogonais** | espaçamento tal que cada subportadora cai nos **nulos espectrais** das outras; pulsos **quadrados**, espectro de cada subcanal em forma de **sinc(f)** |
| **SDMA** | no **espaço**, com **antenas inteligentes** | molda o **diagrama de irradiação**: usuários no lóbulo principal, interferentes em **nulos ou lóbulos secundários**; reduz **multipercurso**; combinado com TDMA/FDMA/CDMA |

O **código do CDMA** é uma sequência **pseudoaleatória (pseudorruído)**: determinística, mas com número **quase igual de zeros e uns**, **correlação muito baixa** entre versões deslocadas e entre duas sequências quaisquer.

### TDM, FDM e OFDM (a pergunta da lista)

- **TDM:** divide o **tempo** entre usuários. **FDM:** divide a **banda** em faixas, uma por usuário.
- **OFDM:** divide o canal em **muitas subportadoras estreitas e ortogonais**, transmitidas **em paralelo**, cada uma **lenta** (robusta a multipercurso). É a base do 802.11a/g/n/ac/ax; **OFDMA** é a versão que também reparte subportadoras **entre usuários**.

## 3. Duplexação

**Duplexação** permite **transmitir e receber ao mesmo tempo** com a estação base. O canal **direto (downlink)** leva tráfego **da base para o móvel**; o **reverso (uplink)**, **do móvel para a base**.

| | FDD (frequência) | TDD (tempo) |
|---|---|---|
| Como separa | **duas bandas** diferentes por usuário | **tempo**: canal direto e reverso alternam |
| Detalhe | cada canal duplex = **dois canais simplex**; usa **duplexador** para uma antena só | permite comunicação em **um único canal de frequência** e **simplifica o equipamento do usuário** |

O Wi-Fi usa **TDD** *(complemento)*.

---

## Exercícios

Lista: [`listas/lista-04.md`](../listas/lista-04.md) — respostas: [`respostas/lista-04.md`](../respostas/lista-04.md)

---

## Resumo

- **FHSS:** salta de frequência em sequência secreta (slow: Tc ≥ Ts; fast: Tc < Ts).
- **DSSS:** XOR com sequência pseudoaleatória; bit 0 = código, bit 1 = invertido; interferência estreita é diluída.
- **Múltiplo acesso:** TDMA (tempo), FDMA (frequência), CDMA (código), OFDMA (subportadoras ortogonais), SDMA (espaço).
- **OFDM:** subportadoras ortogonais em paralelo.
- **Duplexação:** **FDD** (duas bandas) × **TDD** (tempo).

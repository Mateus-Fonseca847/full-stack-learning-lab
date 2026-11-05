# Aula 03 — Modulação digital

> Base: *Wi-Fi · aula 3 – Modulação*. Lista: [`listas/lista-03.md`](../listas/lista-03.md)

## 1. O que é modulação

- **Modulação** é o processo de **codificar a informação** (sinal modulante em **banda base**) de um jeito adequado à transmissão (**sinal modulado em banda de passagem**).
- **Demodulação** é extrair a mensagem em banda base da portadora, para o receptor processar.

Analogia: a **portadora** é uma onda "mensageira" constante; modular é **mexer em uma característica dela** para carregar os bits: o **volume** (amplitude), o **tom** (frequência) ou o **"atraso"** (fase).

| Técnica | O que varia | Sigla |
|---|---|---|
| Amplitude | altura da onda | **ASK** |
| Frequência | quantas oscilações por segundo | **FSK** |
| Fase | deslocamento da onda | **PSK** |
| Amplitude + fase | as duas | **QAM** |

## 2. ASK — Amplitude Shift Keying

Bit 1 = portadora; bit 0 = amplitude reduzida.

- **BASK** (binário): dois níveis.
  - **OOK** (*on-off keying*): caso particular, bit 0 = **ausência** da portadora; bit 1 = **presença**. Fase e frequência não mudam.
- **MASK** (multinível): mais níveis de amplitude. **Mais variedade, mas intervalos de decisão menores → menos imunidade a ruído e interferência.**

## 3. FSK — Frequency Shift Keying

Bits representados por **frequências** da portadora; a amplitude não muda.

- **BFSK:** duas frequências, f0 e f1 (um modulador FSK pode ser feito com dois moduladores ASK).
- **MFSK:** várias frequências (vários geradores; no receptor, filtros sintonizados para cada frequência).
- **GFSK** (*Gaussian FSK*): FSK com um **filtro gaussiano** antes do modulador, que suaviza as transições e **reduz a largura espectral**. É usada no **Bluetooth** (melhor eficiência espectral que o FSK).

## 4. PSK — Phase Shift Keying

Bits representados por **fases** da portadora.

| Variante | Ideia |
|---|---|
| **QPSK** | usa a fase de **duas portadoras em quadratura (90°)** para enviar **dois fluxos de bits**; **cada mudança de fase representa dois bits** |
| **OQPSK** (offset) | como o QPSK, mas um dos fluxos é **atrasado meio bit** |
| **π/4 DQPSK** | codifica pela **variação diferencial de fase** em relação ao **estado anterior** (e não a um padrão fixo) |

## 5. QAM — Quadrature Amplitude Modulation

Combina **modulação de amplitude (AM) com fase (PSK)**, formando uma **constelação de pontos**, cada um sendo uma combinação única de bits. Duas componentes são combinadas por **modulação ortogonal** (daí "quadratura"), sem interferência entre si. Usada em TV digital e onde se precisa de **alta taxa**.

> Em geral, a QAM tem **menos sensibilidade a ruído que a ASK** e **melhor aproveitamento de banda que a PSK**.

## 6. Por que isso importa no Wi-Fi? (lista)

**Modulações usadas no Wi-Fi:** BPSK/QPSK (mais lentas, **robustas**), 16-QAM, 64-QAM, 256-QAM (11ac), 1024-QAM (11ax). *(Os slides de 802.11 citam PSK até 18 Mbps e QAM até 54 Mbps no OFDM do 802.11a; 64-QAM no 11n; 256-QAM no 11ac.)*

**Por que algumas servem a ambientes ruidosos?** Num diagrama de constelação, BPSK/QPSK têm **poucos pontos bem afastados**, então toleram **SNR baixa**, mas carregam **poucos bits por símbolo**. 256-QAM tem **muitos pontos próximos**: mais bits por símbolo, mas **exige SNR alta**. Com ruído, os pontos se confundem e a **taxa de erro de bit sobe**.

| Modulação | Bits por símbolo (log₂ M) | SNR exigida |
|---|---|---|
| BPSK | 1 | baixa |
| QPSK | 2 | baixa |
| 16-QAM | 4 | média |
| 64-QAM | 6 | alta |
| 256-QAM | 8 | muito alta |

O Wi-Fi escolhe a modulação **dinamicamente**, conforme a qualidade do canal (veja a [aula 06](06-canalizacao-e-mcs.md), MCS).

## 7. Pratique

```bash
cd praticas
node modulacao.js 20     # bits por símbolo, taxa bruta e SNR mínima teórica
```

---

## Exercícios

Lista: [`listas/lista-03.md`](../listas/lista-03.md) — respostas: [`respostas/lista-03.md`](../respostas/lista-03.md)

---

## Resumo

- **Modulação** = codificar bits em uma portadora; **ASK** (amplitude), **FSK** (frequência), **PSK** (fase), **QAM** (amplitude + fase).
- **OOK** = ASK ligado/desligado; **GFSK** = FSK suavizado (Bluetooth).
- **QPSK:** 2 bits por mudança de fase; **π/4 DQPSK:** fase diferencial.
- **MASK:** mais níveis = menos imunidade a ruído. **QAM:** melhor compromisso.
- **Alta ordem = mais taxa, mais SNR necessária.**

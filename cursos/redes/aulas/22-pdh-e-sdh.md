# Aula 22 — Hierarquias digitais: PDH e SDH

> ⚠️ **Sem slides:** conteúdo montado a partir da **lista da P2 (docx)** e de conhecimento geral (ITU-T G.702/G.704/G.707). Lista: [`listas/lista-22.md`](../listas/lista-22.md)

# Parte A — PDH (Plesiochronous Digital Hierarchy)

## 1. O que é

Hierarquia para **multiplexar vários canais digitais de 64 kbps** (voz PCM, 8 bits × 8000 amostras/s) em fluxos de maior taxa. **Plesiócrona** = "quase síncrona": cada fluxo tem **relógio próprio, ligeiramente diferente**; para combiná-los usa-se **justificação (bit stuffing)**.

| Nível | Europa/Brasil (E) | América do Norte (T) |
|---|---|---|
| 1 | **E1: 2,048 Mbps** (30 canais) | T1: 1,544 Mbps (24 canais) |
| 2 | E2: 8,448 Mbps (4×E1) | T2: 6,312 Mbps |
| 3 | E3: 34,368 Mbps (4×E2) | T3: 44,736 Mbps |
| 4 | E4: 139,264 Mbps (4×E3) | — |

## 2. O padrão E1

| Característica | Valor |
|---|---|
| Canais (timeslots) por quadro | **32** (numerados 0–31) |
| Bits por canal | 8 |
| **Bits por quadro** | 32 × 8 = **256 bits** |
| Quadros por segundo | **8.000** |
| **Duração do quadro** | **125 µs** |
| **Taxa** | 256 × 8000 = **2,048 Mbps** |
| Canais úteis de voz/dados | **30** (TS1–15 e TS17–31) |
| Multiquadro | **16 quadros** (2 ms) |

- **Canal 0 (TS0):** **enquadramento/alinhamento** — carrega a palavra de alinhamento de quadro (**FAS**, `0011011`) nos quadros pares e, nos ímpares, bits de alarme/NFAS; também o **CRC-4** e bits de serviço.
- **Canal 16 (TS16):** **sinalização** dos 30 canais (**CAS**: no multiquadro, cada quadro carrega a sinalização de 2 canais; ou **CCS**, sinalização por canal comum, como SS7).

## 3. Limitações do PDH

1. **Justificação (stuffing)** → para **extrair um canal de 64 kbps** de um E4 é preciso **demultiplexar toda a hierarquia** (E4→E3→E2→E1) → equipamentos caros, sem acesso direto (*drop/insert* difícil).
2. **Hierarquias incompatíveis** (Europa × EUA × Japão): sem padrão mundial.
3. **Pouco overhead de gerência (OAM)** → difícil monitorar/gerenciar fim a fim.
4. **Taxas limitadas** (até ~140 Mbps) e **sem interface óptica padronizada** (cada fabricante tem a sua → sem interoperabilidade entre fornecedores).
5. **Sem proteção/restauração padronizadas** e **sem sincronismo** de rede.

# Parte B — SDH (Synchronous Digital Hierarchy)

## 4. O que é e características

Padrão **ITU-T (G.707)** de transporte **síncrono** em fibra (equivalente ao **SONET** americano), criado para superar o PDH.

**Características principais:**
- **Rede síncrona:** todos os elementos seguem um **relógio de referência** comum;
- **Taxas padronizadas e globais:** STM-1 = 155,52 Mbps; STM-4 = 622,08 Mbps; STM-16 = 2,488 Gbps; STM-64 = 9,953 Gbps; STM-256 = 39,8 Gbps (múltiplos de 4);
- **Acesso direto** aos canais de baixa ordem por **ponteiros** (sem demultiplexar tudo);
- **Overhead rico** para **OAM**, gerência e **proteção**;
- **Interfaces ópticas padronizadas** (multi-fornecedor);
- Transporta **PDH (E1/E3/E4), ATM, IP/Ethernet** (via GFP).

## 5. Seções (camadas) do SDH

| Seção | Conceito | Equipamentos |
|---|---|---|
| **Seção de regeneração (RS)** | trecho **entre dois elementos adjacentes**, com **regeneração** do sinal; usa o **RSOH** (cabeçalho de seção de regeneração) | **regeneradores**; todos os NEs terminam o RS |
| **Seção de multiplexação (MS)** | trecho **entre dois multiplexadores**, **atravessando regeneradores**; usa o **MSOH** (proteção, sincronismo) | **TM, ADM, SDXC** |
| **Seção de caminho/via (path)** | **fim a fim**: onde o **container virtual (VC)** é montado e desmontado; usa o **POH** | **TM/ADM** (portas tributárias), SDXC de baixa ordem |

## 6. STM-1 (Synchronous Transport Module level 1)

Quadro de **9 linhas × 270 colunas** (de 1 byte):
```
        9 colunas       1 coluna        260 colunas
        ┌───────────┬──────────┬─────────────────────────┐
 linha1 │ RSOH (3L) │          │                         │
 linhas │───────────│  POH     │  carga útil (payload)   │
  2–3   │ ponteiro  │ (coluna) │  VC-4 = 9 × 261 bytes   │
 linha4 │ AU        │          │                         │
 linhas │───────────│          │                         │
  5–9   │ MSOH (5L) │          │                         │
        └───────────┴──────────┴─────────────────────────┘
```

| Item | Valor |
|---|---|
| Bytes por quadro | 9 × 270 = **2.430 bytes** = **19.440 bits** |
| **Overhead de seção (SOH)** | 9 colunas × 9 linhas = **81 bytes** (RSOH 3 linhas + ponteiro AU 1 linha + MSOH 5 linhas) |
| **Payload (VC-4)** | 9 × 261 = **2.349 bytes** (inclui 9 bytes de POH) |
| **Duração do quadro** | **125 µs** (8.000 quadros/s) |
| **Taxa** | 19.440 × 8.000 = **155,52 Mbps** |
| Taxa útil do VC-4 | 2.349 × 8 × 8000 = 150,336 Mbps |

### Por que o ponteiro do POH (AU/TU)?
O **VC** (contêiner virtual) **não precisa começar numa posição fixa** do quadro: pode "flutuar" porque o relógio do tributário pode diferir um pouco do da rede. O **ponteiro** (bytes H1, H2, H3 do AU) **indica onde o VC começa** (o byte J1 do POH). Assim:
- diferenças pequenas de relógio são absorvidas por **ajustes de ponteiro** (justificação positiva/negativa), sem *buffers* grandes;
- permite **acesso direto** ao VC sem demultiplexar toda a hierarquia.

## 7. Mapeamento, multiplexação e concatenação

### Estrutura de multiplexação (E1 → STM-1)
```
E1 (2 Mbps) → C-12 (+stuffing) → VC-12 (+POH) → TU-12 (+ponteiro)
   → TUG-2 (3 × TU-12) → TUG-3 (7 × TUG-2) → VC-4 (3 × TUG-3, +POH)
   → AU-4 (+ponteiro) → AUG → STM-1 (+SOH)
```
- **Mapeamento:** encaixar o sinal PDH num **contêiner (C-n)**, adicionando **bits de enchimento/justificação (stuffing)** para casar taxas;
- **Alinhamento:** acrescentar **POH** (vira VC) e **ponteiro** (vira TU/AU), registrando onde o VC começa;
- **Multiplexação:** **entrelaçamento de bytes** de vários TUs/AUs para formar o TUG/AUG e depois o **STM-N**.
- Cabem **63 E1** num VC-4 (3 × 7 × 3).

### Concatenação — o que é e por quê
Serve para transportar **um fluxo de dados maior que um VC-4** (ex.: 622 Mbps, Gigabit Ethernet) **como um único pipe**, sem quebrá-lo em partes independentes.
- **Concatenação contígua (VC-4-Xc):** X VC-4 adjacentes tratados como **uma unidade com um só POH e um só ponteiro** (ex.: **VC-4-4c** = 599 Mbps, STM-4c).
- **Concatenação virtual (VCAT):** VCs **não adjacentes** (podendo seguir rotas diferentes) são **reunidos virtualmente** no destino; mais flexível, usada em **Ethernet sobre SDH**.

## 8. Equipamentos

| Equipamento | Função |
|---|---|
| **TM (Terminal Multiplexer)** | **ponto final** de um enlace: **multiplexa tributários** (E1, E3...) em STM-N |
| **ADM (Add/Drop Multiplexer)** | insere/extrai tributários **no meio do caminho**, deixando passar o resto; base de **anéis** e cadeias |
| **SDXC (SDH Digital Cross-Connect)** | **comuta/redistribui VCs** entre muitas portas STM; usado em **malhas** e para provisionamento flexível |

## 9. Topologias típicas
**Ponto a ponto** (TM–TM), **linear/cadeia** (TM–ADM–...–TM), **anel** (ADMs; a mais usada, por causa da proteção), **estrela/hub** e **malha** (com SDXC); redes reais combinam anéis interligados.

## 10. Aprovisionamento
Processo de **configurar a capacidade da rede** para entregar um serviço: o operador (via **sistema de gerência/NMS**) define **quais VCs, em qual caminho, com quais cross-connections e proteção**, sem mexer fisicamente na rede. É o que o SDXC/ADM tornou **flexível e remoto**.

## 11. Sincronismo
Toda a rede SDH se **sincroniza a um relógio de referência primário (PRC, ex.: césio, G.811)**, distribuído de forma **hierárquica** (cada nó se "trava" no relógio recebido e repassa; as mensagens **SSM** no byte S1 informam a qualidade do relógio).
**Por que é tão importante?** Sem sincronismo, os relógios divergem → **slips** (perda/duplicação de bits), muitos **ajustes de ponteiro**, **jitter/wander** e perda de dados nos tributários (especialmente voz e circuitos E1 sensíveis a tempo).

## 12. Proteção
**Proteção** = **comutação automática** para um recurso de reserva quando há falha, tipicamente em **< 50 ms** (imperceptível à voz).

| Modalidade | Como funciona |
|---|---|
| **MSP 1+1** (linear) | o sinal é enviado **simultaneamente** por duas fibras (trabalho e proteção); o receptor escolhe a melhor |
| **MSP 1:1 / 1:N** | proteção **compartilhada**; o tráfego só migra para a reserva ao falhar (a reserva pode levar tráfego de baixa prioridade) |
| **Anel MS-SPRing (2 ou 4 fibras)** | proteção **na seção de multiplexação**: reserva **compartilhada** em todo o anel; ao falhar, o tráfego **dá a volta pelo outro lado** |
| **SNCP** (*Subnetwork Connection Protection*, ≈ UPSR) | proteção **por caminho (VC)**: tráfego enviado nos **dois sentidos do anel**; o destino escolhe o melhor — simples e rápido, mas **ocupa o dobro** |

---

## Exercícios

Lista: [`listas/lista-22.md`](../listas/lista-22.md) — respostas: [`respostas/lista-22.md`](../respostas/lista-22.md)

---

## Resumo

- **PDH:** plesiócrono, justificação por stuffing; **E1 = 32 canais × 8 bits = 256 bits/quadro, 8000 q/s, 125 µs, 2,048 Mbps**; TS0 = alinhamento, TS16 = sinalização. Limitações: sem acesso direto, hierarquias incompatíveis, pouco OAM, taxas baixas.
- **SDH:** síncrono; **STM-1 = 9×270 = 2430 B, 125 µs, 155,52 Mbps** (SOH 81 B, VC-4 2349 B); **ponteiros** dão acesso direto; seções RS/MS/path; **TM/ADM/SDXC**; sincronismo por PRC; proteção < 50 ms (MSP, MS-SPRing, SNCP).

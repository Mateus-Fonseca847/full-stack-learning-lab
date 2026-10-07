# Aula 11 — Acesso ao meio: divisão de canal, acesso aleatório e revezamento

> Base: *Aula 7 – Acesso ao meio*. Lista: [`listas/lista-11.md`](../listas/lista-11.md)

## 1. O problema

Dois tipos de enlace:

- **Ponto a ponto** (ex.: PPP): só dois nós; não há disputa.
- **Enlace de broadcast:** **vários nós transmissores e vários receptores compartilhando o mesmo canal** (ex.: Ethernet com hub, Wi-Fi).

**Problemas do acesso múltiplo** (que os protocolos de acesso resolvem):
1. **Como coordenar** o acesso ao canal compartilhado?
2. **Quem transmite** e quem recebe?
3. **O que fazer numa colisão** (dois nós transmitindo ao mesmo tempo)?

### O que seria desejável (requisitos)
1. Um nó sozinho transmite à **vazão máxima do canal, R bps**;
2. *x* nós com dados → cada um com vazão média **R/x** (divisão justa);
3. **Descentralizado** (sem nó mestre que, se falhar, derruba tudo);
4. **Simples** (implementação barata).

### Três categorias
```
Protocolos de acesso múltiplo
├── Divisão de canal       (TDM, FDM)
├── Acesso aleatório       (Aloha, Slotted Aloha, CSMA, CSMA/CD)
└── Revezamento            (Seleção/polling, Passagem de permissão/token)
```

## 2. Divisão de canal

**Multiplexação** = compartilhar um mesmo meio físico entre várias comunicações. Num protocolo de divisão de canal, o **canal de comunicação** é uma **fatia** do meio reservada a um par de nós (uma fatia de tempo ou de frequência).

| | **FDM** (Frequência) | **TDM** (Tempo) |
|---|---|---|
| Divide | a **banda** em faixas de frequência | o **tempo** em intervalos (slots) |
| Cada nó usa | sua faixa **o tempo todo** | o canal **inteiro**, só no seu slot |
| Exemplo | rádio/TV, cabo | telefonia digital (PCM) |

**Por que FDM precisa de modulação e filtragem?** Os sinais de voz/dados estão em banda básica (começam perto de 0 Hz) e todos ocupariam a mesma faixa. A **modulação** desloca cada sinal para uma **portadora diferente**, e os **filtros** separam/limitam cada faixa na recepção, evitando que uma invada a vizinha.

**TDM síncrono × assíncrono (estatístico):**

| | Síncrono | Assíncrono / estatístico |
|---|---|---|
| Slot | **fixo** para cada nó, mesmo sem dados | alocado **só a quem tem dado** |
| Eficiência | desperdiça slots ociosos | aproveita melhor o canal |
| Overhead | nenhum endereço no slot | precisa **identificar** o dono do dado |

**Vantagem geral:** sem colisão e justo (R/N para cada). **Desvantagem:** um nó sozinho **não** consegue usar R inteiro; capacidade ociosa é desperdiçada.

## 3. Acesso aleatório

**Filosofia:** não há reserva; o nó transmite quando quer, à taxa cheia R. Se há **colisão**, os nós envolvidos **esperam um tempo aleatório e independente** e **retransmitem** (o sorteio independente evita que colidam de novo).

### 3.1 Slotted Aloha
- Todos os quadros têm tamanho **L** bits; o tempo é dividido em **intervalos de L/R** (= tempo de transmitir um quadro).
- Nós só começam a transmitir **no início de um intervalo** (precisam estar **sincronizados**).
- Colisão é detectada antes do fim do intervalo. Havendo colisão, cada nó retransmite no intervalo seguinte **com probabilidade p** (ou espera um número aleatório de intervalos). Sem colisão, sucesso.
- Problemas: ainda há **colisões** e **intervalos ociosos/desperdiçados**; eficiência máxima **1/e ≈ 37%**.

### 3.2 Aloha puro
- Mais simples: **sem sincronismo** de intervalos; transmite assim que o quadro está pronto.
- **Maior probabilidade de colisão** (o período vulnerável é o dobro) → eficiência máxima **1/(2e) ≈ 18%**.

**Slotted Aloha × Aloha:** o slotted **sincroniza o início** dos quadros, reduzindo à metade o período vulnerável e **dobrando** a eficiência.

### 3.3 CSMA (Carrier Sense Multiple Access)
- **"Escute antes de falar":** o nó verifica se o canal está livre. Se **ocupado**, espera um tempo aleatório e tenta de novo.
- **Diferença principal Aloha × CSMA:** o Aloha transmite **sem olhar** o canal; o CSMA **ouve a portadora** antes.
- **Ainda há colisão:** por causa do **atraso de propagação**, dois nós podem ouvir "livre" quase ao mesmo tempo (o sinal do primeiro ainda não chegou ao segundo). Em CSMA puro, **os quadros em colisão continuam sendo transmitidos até o fim** (desperdício).

### 3.4 CSMA/CD (Collision Detection)
- Igual ao CSMA, **mais detecção de colisão:** o nó **continua escutando enquanto transmite**. Se percebe que outro também transmite, **aborta imediatamente** a transmissão e espera um tempo aleatório antes de retentar.
- **Diferença para o CSMA:** não desperdiça o quadro inteiro; para no início da colisão.
- Usado na **Ethernet** (802.3) em meio compartilhado. No Ethernet real o tempo aleatório vem do **backoff exponencial binário** (a janela de sorteio dobra a cada colisão).

> **Extra:** o quadro Ethernet tem **mínimo de 64 bytes** para que o transmissor ainda esteja transmitindo quando a notícia da colisão voltar — só assim ele consegue detectá-la.

## 4. Protocolos de revezamento (taking turns)

Combinam o melhor dos dois mundos: sem colisões e sem slots vazios.

### 4.1 Seleção (polling)
Há um **nó mestre** que diz **quem pode transmitir** e por quanto tempo (quantos quadros). Se o nó não tem nada ou termina antes, o mestre percebe e passa ao próximo.

| Vantagens | Desvantagens |
|---|---|
| **elimina colisões** e intervalos vazios | **atraso de seleção** (tempo para avisar o nó) |
| | um nó sozinho **não alcança R** (o mestre continua perguntando aos ociosos) |
| | **mestre falhou → canal para** (centralizado) |

### 4.2 Passagem de permissão (token passing)
Um quadro especial, o **token (permissão)**, circula entre os nós numa ordem. **Só quem está com o token pode transmitir**; terminando (ou não tendo nada), repassa ao próximo. Descentralizado e eficiente sob carga alta. (Ex.: Token Ring 802.5, Token Bus 802.4, FDDI.)

**Principal problema:**
- se **um enlace se rompe** (anel) a rede pode parar;
- se o **nó que está com o token falha**, o token se perde e os outros ficam em **espera eterna** (é preciso um mecanismo de recuperação/regeneração do token).

## 5. Comparativo

| Categoria | Colisões | Nó sozinho usa R? | Centralizado? | Exemplos |
|---|---|---|---|---|
| Divisão de canal | não | **não** (só R/N) | não | TDM, FDM |
| Aleatório | **sim** | sim | não | Aloha, CSMA/CD |
| Revezamento | não | selection: não; token: quase | polling sim; token não | polling, Token Ring |

## 6. Pratique

```bash
cd praticas
node slotted_aloha.js   # veja a eficiência máxima ~37% quando p = 1/N
```

---

## Exercícios

Lista: [`listas/lista-11.md`](../listas/lista-11.md) — respostas: [`respostas/lista-11.md`](../respostas/lista-11.md)

---

## Resumo

- Enlace de broadcast = meio compartilhado; protocolos de acesso resolvem **quem fala, quando e o que fazer em colisão**.
- **Divisão de canal:** TDM (tempo) e FDM (frequência; usa modulação + filtros).
- **Aleatório:** **Aloha** (sem sincronia, ~18%), **Slotted** (slots, ~37%), **CSMA** (escuta antes), **CSMA/CD** (escuta e **aborta** na colisão).
- **Revezamento:** **seleção** (mestre) e **token** (permissão circulante; problema: perda/falha do dono do token).

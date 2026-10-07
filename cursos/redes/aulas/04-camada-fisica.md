# Aula 04 — Camada física, largura de banda e traffic shaping

> Base: *Aula 4 – Camada física*. Lista: [`listas/lista-04.md`](../listas/lista-04.md)

## 1. O que a camada física faz

As camadas superiores preparam os dados; a **camada física controla como eles são colocados no meio**. Ela transmite informação por **pulsos elétricos, sinais ópticos ou radiofrequência**.

- **Transmissor:** pega o quadro da camada de enlace e o transforma em sinais (codificação), enviando-os ao meio **um bit de cada vez**.
- **Receptor:** recupera os sinais do meio, restaura os bits e entrega à camada de enlace como um quadro completo.
- Define como **criar, manter e eliminar** conexões físicas entre entidades do nível de enlace.

**Serviço prestado à camada de enlace:** transporte de **bits** pelo meio. A camada física oferece quatro serviços: (1) estabelecimento e encerramento de conexões, (2) transferência de dados, (3) sequenciação, (4) notificação de falhas.

## 2. As quatro características da interface física

| Característica | O que define | Exemplo |
|---|---|---|
| **Mecânica** | tamanho e forma de conectores, cabos, pinos | conector RJ-45 de 8 pinos |
| **Elétrica** | níveis de tensão, intervalos de sinalização → determina **taxa e distância** | 0 V / +5 V; duração do bit |
| **Funcional** | **significado** de cada sinal da interface | pino de transmissão, recepção, terra |
| **Procedural** | **sequência** de sinais para que a transmissão aconteça | handshake para iniciar a transmissão |

**Padrões de interface física:** RS-232 (serial, antigo), RS-422, RS-449, EIA/TIA-568 (cabeamento de edifícios comerciais), ITU-T V.24, V.35, X.21.

## 3. Elementos necessários para entregar quadros pelo meio

1. **Meio físico e conectores** (hardware que transporta os sinais);
2. **Representação dos bits** no meio;
3. **Codificação** de dados e de informações de controle;
4. **Circuitos transmissor e receptor** nos dispositivos de rede.

### Representação dos bits

A informação é enviada por **variação de uma propriedade física**: tensão, corrente, luz, ou **amplitude, fase e/ou frequência** de uma onda. Todo meio **perde energia** (atenuação) no caminho.

### Codificação

Converter o fluxo de bits em um **código predefinido**, um padrão previsível que emissor e receptor reconhecem. Permite:

- diferenciar **bits de dados** de **bits de controle** (ex.: marcar início e fim de quadro com padrões que não aparecem nos dados);
- **detectar melhor** erros no meio.

## 4. Equipamentos de camada física

| Equipamento | O que faz |
|---|---|
| **Repetidor** | recebe o sinal, **regenera/amplifica** e reenvia ao próximo nó; **não analisa** quadros |
| **Hub (concentrador)** | recebe por uma porta e **replica em todas as outras** (repetidor multiportas); não filtra → alto risco de **colisão** |

## 5. Largura de banda

**Largura de banda** é uma característica **física do meio** (faixa de frequências que ele transmite bem). Depende de **construção, espessura, comprimento e frequência**. Quanto mais banda, mais informação por segundo.

- Limitar a banda **limita a taxa de dados**, mesmo num canal sem ruído; esquemas de **codificação** podem aumentar a taxa.
- **Filtros reguladores de banda:** a operadora de telefonia tem linhas capazes de ~1 MHz em curta distância, mas **filtra em 3.100 Hz por cliente**: suficiente para voz, e divide a capacidade de forma justa entre usuários.

> **Extra (não está nos slides):** para um canal sem ruído com banda *B* e *V* níveis de sinal, o limite de Nyquist é **taxa = 2·B·log₂V** bps. Ex.: B = 3.100 Hz, V = 2 → 6.200 bps.

## 6. Traffic shaping (modelagem de tráfego)

Objetivo: **otimizar o uso da banda e evitar congestionamento**, limitando de forma forçada as velocidades de download/upload.

### Balde furado (leaky bucket)
Os computadores "despejam" dados num balde que tem um **furo no fundo**: a saída é um **fluxo constante**, suavizando rajadas. **Balde cheio → descarta o pacote.**

### Balde de fichas (token bucket)
Fichas entram no balde (tamanho **b**) à taxa **r**; se encher, fichas novas são descartadas. Para transmitir um pacote de tamanho **d**, retiram-se **d fichas**. Se faltar ficha, o pacote **espera** (ou é descartado). **Permite rajadas, mas as limita.**

| | Leaky bucket | Token bucket |
|---|---|---|
| Saída | constante | pode ter rajada (até b) |
| Excesso | descarta | atrasa (ou descarta) |

### Descarte antecipado
- **RED (Random Early Detection):** descarta pacotes **antes** da fila encher; a probabilidade de descarte cresce com a **ocupação da fila**. O descarte sinaliza o congestionamento.
- **WRED:** como o RED, mas **por classe**; a probabilidade também depende do **peso do pacote** e de haver reserva de recursos (RSVP).

### Shaping × Policing
Ambos **identificam** violações do contrato de tráfego do mesmo jeito; diferem na **reação**:
- **Policiamento:** **descarta** ou marca o excesso como elegível para descarte.
- **Modelagem (shaping):** **atrasa** o excesso, deixando o tráfego conforme os parâmetros.

> **Projeto Glasnost:** permite testar se há traffic shaping numa conexão (VoIP, P2P/FTP, streaming, torrent, jogos).

## 7. Pratique

```bash
cd praticas
node baldes.js     # compare: leaky DESCARTA o excesso, token ATRASA
```

---

## Exercícios

Lista: [`listas/lista-04.md`](../listas/lista-04.md) — respostas: [`respostas/lista-04.md`](../respostas/lista-04.md)

---

## Resumo

- Camada física = **bits** → sinais (elétricos, ópticos, rádio). Serviço ao enlace: transporte de bits.
- Interface: características **mecânicas, elétricas, funcionais, procedurais**.
- Equipamentos: **repetidor** e **hub** (camada 1, não olham quadros).
- Largura de banda = propriedade do meio; filtros limitam (telefonia: 3.100 Hz).
- **Leaky** = saída constante, descarta; **token** = permite rajada, atrasa. **RED/WRED** = descarte antecipado. **Policing** descarta; **shaping** atrasa.

# Aula 08 — Camada de enlace: serviços e enquadramento

> Base: *Aula 6 – Camada de enlace*. Lista: [`listas/lista-08.md`](../listas/lista-08.md)

## 1. Estrutura e necessidade

A camada de enlace é estruturada com **algoritmos para permitir comunicação eficiente e confiável entre pontos adjacentes**.

- **Adjacência:** dois elementos de rede são adjacentes quando estão **diretamente conectados pelo meio físico**, sem nenhum nó intermediário entre eles no nível 2 (ex.: PC ↔ switch; roteador ↔ roteador por um cabo).
- **A forma de fazer a adjacência varia** conforme o meio físico: ponto a ponto, barramento compartilhado, meio sem fio.

**Por que precisamos desses algoritmos?** Porque os circuitos de comunicação:
1. **produzem erros**;
2. têm **taxa de dados finita**;
3. têm **retardo** entre envio e recebimento.

## 2. Funções

1. **Interface de serviço bem definida** com a camada de rede;
2. **Enquadramento** (delimitar quadros no fluxo de bits);
3. **Tratamento de erros** (detectar e, se possível, corrigir) — a camada física entrega um fluxo bruto sem garantias; o número de bits recebidos pode ser até diferente do enviado;
4. **Controle de fluxo** (o transmissor não pode sobrecarregar o receptor);
5. **Controle de acesso ao meio** (em enlaces de difusão).

> Controle de fluxo e de erros também aparecem em outras camadas (ex.: transporte); em algumas redes **não** estão na camada de enlace (ex.: Ethernet e Frame Relay deixam para camadas superiores).

**Tarefa final:** transmitir os dados da camada de rede da **origem** para a camada de rede do **destino** — o caminho *virtual* é entre as camadas 3; o *real* desce até o meio físico.

## 3. Quadros × pacotes

O **pacote** (da camada de rede) é colocado no **campo de carga útil (payload)** do **quadro**. O quadro acrescenta **cabeçalho (header)** e **trailer** (ex.: CRC).

```
┌────────┬──────────────────────┬─────────┐
│ Header │ Payload (= o pacote) │ Trailer │   ← quadro (frame)
└────────┴──────────────────────┴─────────┘
```

Um pacote pode ocupar vários quadros se for maior que o limite do enlace (fragmentação).

## 4. Serviços da camada de enlace

| Modalidade | Como funciona | Quando usar | Exemplos |
|---|---|---|---|
| **Sem conexão, sem confirmação** | envia quadros sem esperar ACK; sem abrir/fechar conexão | meios com **poucos erros**; **tempo real** (voz); a recuperação fica nas camadas altas | **Ethernet** |
| **Sem conexão, com confirmação** | cada quadro é confirmado; sem abrir conexão | meios com **muitos erros** (sem fio) | **Wi-Fi (802.11)** |
| **Com conexão, com confirmação** | 3 fases (**estabelecer**, **transmitir**, **fechar**); quadros numerados e entregues **em ordem** (fluxo de bits confiável) | enlaces longos e/ou não confiáveis | HDLC, PPP em modo confiável, LLC tipo 2 |

**Por que a confirmação em meios ruidosos?** Exemplo da aula: um pacote = 10 quadros com **20% de perda por quadro**. Sem confirmação por quadro, a chance de o pacote chegar inteiro é 0,8¹⁰ ≈ **10,7%** — quase sempre seria preciso retransmitir o pacote **inteiro**. Confirmando e reenviando **só o quadro perdido**, o custo cai muito. (Mas há um limite: quadros muito grandes aumentam o tempo de espera pelo ACK.)

## 5. Enquadramento

A camada física envia um **fluxo bruto de bits** sem garantia. O enlace precisa **marcar onde cada quadro começa e termina** (e usa o total de verificação para ver se chegou bom). Técnicas:

### 5.1 Contagem de caracteres
Um campo no cabeçalho diz **quantos caracteres** tem o quadro; com isso o receptor sabe onde acaba.

```
5 1 2 3 4 | 5 6 7 8 9 | 8 0 1 2 3 4 5 6 | 8 7 8 9 0 1 2 3
```
**Problema:** se a contagem for **adulterada** (ex.: o 5 vira 7), o receptor perde a sincronia e **não sabe onde começa o próximo quadro** — nem o checksum ajuda a ressincronizar.

### 5.2 Flags (delimitadores)
Cada quadro começa e termina com um padrão especial (**flag**), o que **permite ressincronizar** depois de um erro: basta varrer até a próxima flag. O problema: a flag pode aparecer **dentro dos dados**. Solução: **stuffing** (inserção).

#### Inserção de **bytes** (byte stuffing)
Flag de 8 bits. Se a flag (ou o caractere de escape **ESC**) aparece nos dados, o transmissor insere um **ESC** antes. O receptor remove o ESC.

| Dados originais | Depois da inserção |
|---|---|
| A FLAG B | A **ESC** FLAG B |
| A ESC B | A **ESC** ESC B |
| A ESC FLAG B | A **ESC ESC ESC** FLAG B |
| A ESC ESC B | A **ESC ESC ESC ESC** B |

Desvantagem: depende de caracteres de **8 bits**.

#### Inserção de **bits** (bit stuffing)
Flag = **01111110**. Regra do transmissor: **depois de cinco 1s consecutivos nos dados, insira um 0**. O receptor, ao ver cinco 1s seguidos, remove o 0 seguinte. Assim a flag nunca aparece nos dados, e não depende do tamanho do caractere.

```
dados:    0110 11111 11111 11111 0010      (cinco 1s a cada grupo)
enviado:  0110 111110 111110 111110 0010   (0 inserido após cada 11111)
```

Se o receptor perder o controle, **varre a entrada procurando 01111110**.

### Byte × bit stuffing (resposta pronta)
| | Byte stuffing | Bit stuffing |
|---|---|---|
| Unidade | caractere de 8 bits | bit |
| Marcador | FLAG + ESC | flag 01111110 |
| O que insere | um byte ESC | um bit 0 após cinco 1s |
| Limitação | exige bytes de 8 bits | independe do tamanho do caractere |

## 6. Pratique

```bash
cd praticas
node bit_stuffing.js   # veja a inserção/remoção funcionando
```

---

## Exercícios

Lista: [`listas/lista-08.md`](../listas/lista-08.md) — respostas: [`respostas/lista-08.md`](../respostas/lista-08.md)

---

## Resumo

- Enlace: comunicação **entre adjacentes**; funções = interface, **enquadramento**, **erros**, **fluxo**, **acesso ao meio**.
- **Quadro = header + payload (pacote) + trailer**.
- Três serviços: sem conexão/sem ACK (Ethernet), sem conexão/com ACK (Wi-Fi), com conexão/com ACK (HDLC).
- Enquadramento: **contagem** (frágil) ou **flags** com **byte stuffing** (ESC) ou **bit stuffing** (0 após cinco 1s).

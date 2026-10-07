# Respostas — Lista 04: Camada física e traffic shaping

Lista: [`listas/lista-04.md`](../listas/lista-04.md) · Aula: [`aulas/04-camada-fisica.md`](../aulas/04-camada-fisica.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L1 q.1)*

> O que a camada física do modelo OSI fornece?

A **transmissão de bits** pelo meio físico (sinais elétricos, ópticos ou de rádio): garante que um bit 1 enviado seja recebido como 1, definindo tensões, duração do bit, conectores e pinos.

## 2. *(P1·L1 q.2)*

> Explique o que são as características mecânicas, elétricas, funcionais e procedurais. Dê exemplos.

**Mecânicas:** formato/tamanho de conectores e cabos (RJ-45). **Elétricas:** níveis de tensão e intervalos de sinalização, que fixam taxa e distância (0 V / 5 V). **Funcionais:** significado dos sinais da interface (TX, RX, terra). **Procedurais:** sequência de sinais para a transmissão acontecer (handshake).

## 3. *(P1·L1 q.3)*

> Qual é o serviço que a camada física provê à camada de enlace?

O **transporte de bits** pelo meio: estabelecimento/encerramento de conexões físicas, transferência de dados, sequenciação e notificação de falhas.

## 4. *(P1·L1 q.4)*

> O que é necessário para a entrega de quadros pelo meio físico?

**Meio físico e conectores**, **representação dos bits**, **codificação** de dados e controle, e **circuitos transmissor/receptor** nos dispositivos.

## 5. *(P1·L1 q.5)*

> Cite dois padrões de interface física.

**RS-232** (serial) e **EIA/TIA-568** (cabeamento). Também: RS-422, RS-449, ITU-T V.24, V.35, X.21.

## 6. *(P1·L1 q.6)*

> Que tipo de propriedade física pode ser variada para o envio da informação na camada física?

**Tensão, corrente, luz** ou **amplitude, fase e/ou frequência** de uma onda.

## 7. *(P1·L1 q.7)*

> Quais são os equipamentos que operam em camada física?

**Repetidores** (regeneram/amplificam o sinal) e **hubs/concentradores** (repetidores multiportas). Não analisam quadros.

## 8. *(P1·L1 q.8)*

> O que é largura de banda?

Característica **física** do meio (faixa de frequências que ele transporta bem), dependente de construção, espessura, comprimento e frequência; limita a taxa de dados.

## 9. *(P1·L1 q.9)*

> Para que são usados filtros reguladores de banda?

Para **limitar a banda** de cada usuário. Ex.: telefonia filtra em **3.100 Hz** por cliente (suficiente para voz e dividindo a capacidade de forma justa), embora a linha suporte ~1 MHz.

## 10.

> Um canal sem ruído tem banda de **4.000 Hz** e usa sinal com **4 níveis**. Qual a taxa máxima (Nyquist)? E com 2 níveis?

Taxa = 2·B·log₂V. Com V = 4: 2·4000·2 = **16.000 bps**. Com V = 2: 2·4000·1 = **8.000 bps**. Mais níveis por símbolo = mais bits (é o que a **codificação** explora).

## 11.

> Diferencie **leaky bucket** e **token bucket** e diga qual deles permite rajadas. Depois rode `praticas/baldes.js` e descreva o que aconteceu com o 3º e o 4º pacotes em cada algoritmo.

**Leaky:** saída constante; excedente é **descartado** quando o balde enche. **Token:** acumula fichas; **permite rajadas** até *b*, e o excedente **espera** por fichas. No script: no *leaky* o 3º e o 4º pacotes são **descartados**; no *token* eles **saem com atraso** (0,8 s e 2,7 s).

## 12.

> Qual a diferença entre **traffic shaping** e **policing**? E entre **RED** e **WRED**?

**Shaping atrasa** o excesso; **policing descarta** (ou marca) o excesso. **RED** descarta pacotes aleatoriamente **antes** de a fila encher, com probabilidade crescente com a ocupação; **WRED** faz o mesmo **por classe/peso** de tráfego.

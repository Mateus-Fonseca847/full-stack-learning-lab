# Respostas — Lista 05: Meios guiados: par trançado, coaxial e fibra

Lista: [`listas/lista-05.md`](../listas/lista-05.md) · Aula: [`aulas/05-meios-guiados.md`](../aulas/05-meios-guiados.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L1 q.10)*

> Quais são os tipos de meio físico guiados e não guiados?

**Guiados:** par trançado (UTP/STP), cabo coaxial, fibra óptica (e meios magnéticos). **Não guiados:** rádio, micro-ondas, infravermelho, ondas de luz (laser) e satélite.

## 2. *(P1·L1 q.11)*

> Por que são trançados os condutores do par trançado?

Para que os fios **não funcionem como antena**: o entrançamento faz as interferências se **cancelarem**, reduzindo ruído e diafonia entre pares.

## 3. *(P1·L1 q.12)*

> Por que existem diferentes categorias de cabos de par trançado? Qual é a categoria mais usada para o cabeamento de redes locais?

Porque a **qualidade construtiva** (tranças por metro, pureza do cobre, isolamento) define a **frequência** suportada e, portanto, a **taxa** e a imunidade a interferência; o limite é 100 m em todas. Mais usada: **Cat 5e** (hoje também Cat 6/6A em instalações novas).

## 4. *(P1·L1 q.13)*

> Qual a diferença do cabo STP para o UTP e quando ele é usado?

**STP** tem **blindagem metálica externa** além do entrançamento; **UTP** não. O STP é usado em ambientes com **forte interferência** eletromagnética (motores, antenas, indústria).

## 5. *(P1·L1 q.14)*

> Usando-se um cabo de par trançado como meio físico guiado para transmissões em longas distâncias é necessário o uso de repetidores. (a) Explique o motivo. (b) Isso ocorre em outros meios (coaxial ou fibra) ou só no par trançado? (c) Para um enlace de mesmo tamanho L, qual meio precisaria de menos repetidores? Por quê?

(a) O sinal sofre **atenuação** e acumula **ruído/interferência** com a distância; sem regeneração deixa de ser decodificável. (b) Ocorre em **todos** os meios (coaxial e fibra também), só que em distâncias diferentes. (c) A **fibra óptica**: menor atenuação por km, imune a interferência eletromagnética e com grande banda (monomodo chega a ~100 km sem amplificação).

## 6. *(P1·L1 q.15)*

> O que é um cabo coaxial?

Cabo com **núcleo de cobre rígido**, envolto por **isolante**, depois por um **condutor externo cilíndrico (malha)**, tudo coberto por **capa plástica**.

## 7. *(P1·L1 q.16)*

> Por que o cabo coaxial oferece boa imunidade a ruídos?

A **malha externa blinda** o condutor central contra interferências externas e impede que o sinal irradie para fora.

## 8. *(P1·L1 q.17)*

> Quais são as dificuldades para o uso do cabo coaxial?

Mais propenso a **mau contato**, **conectores caros**, cabo **pouco flexível** e, em LAN, limitado a **10 Mbps**.

## 9. *(P1·L1 q.18)*

> Explique uma vantagem e uma desvantagem do cabo par trançado em relação ao coaxial.

**Vantagem:** mais **barato, flexível** e fácil de instalar/manter (estrela). **Desvantagem:** **menos imune a ruído** e com menor banda/distância (sem blindagem).

## 10. *(P1·L1 q.19)*

> Como é construída uma fibra ótica?

**Núcleo** (conduz a luz; sílica com dopante), **casca** (sílica pura, confina a luz) e **revestimento/coating** (acrilato, protege o vidro).

## 11. *(P1·L1 q.20)*

> Quais são as vantagens da fibra ótica em relação aos outros meios físicos guiados estudados? Existe alguma desvantagem?

**Vantagens:** maior largura de banda, imunidade a EMI, resistência à corrosão, fina/leve, baixa perda, mais segura contra grampo. **Desvantagens:** tecnologia mais complexa, vulnerável a danos físicos, transmissão **unidirecional** e interfaces caras.

## 12. *(P1·L1 q.21)*

> Explique de que forma ocorre a propagação da luz em uma fibra ótica.

Por **reflexão interna total**: a luz que incide na fronteira núcleo/casca com ângulo **maior que o crítico** é refletida e continua guiada no núcleo; abaixo do ângulo crítico é absorvida pela casca.

## 13. *(P1·L1 q.22)*

> Quais são os componentes básicos de um sistema ótico?

**Fonte de luz** (LED/laser; pulso = 1, ausência = 0), **meio de transmissão** (fibra) e **detector** (gera pulso elétrico ao receber luz).

## 14. *(P1·L1 q.23)*

> O que atualmente limita a capacidade de transmissão nos sistemas óticos?

A **conversão eletro-óptica**: os dispositivos não convertem sinais elétricos↔ópticos mais rápido que ~10 Gbps por canal (a fibra comporta muito mais). Também a dispersão dos pulsos.

## 15. *(P1·L1 q.24)*

> Qual é a diferença de uma fibra monomodo para uma fibra multimodo?

**Multimodo:** núcleo mais grosso, **vários raios** (modos) com ângulos diferentes; barata, curta distância, sofre dispersão. **Monomodo:** núcleo fino, **um só raio**; cara, **longo alcance** (50 Gbps por 100 km sem amplificação).

## 16.

> Monte os cabos: (a) **direto** e (b) **crossover**, informando a sequência de cores de cada ponta (T568A/T568B). Em que casos usar cada um?

(a) **Direto:** T568B nas duas pontas (ou A–A): br/laranja, laranja, br/verde, azul, br/azul, verde, br/marrom, marrom. Liga dispositivos **diferentes** (PC↔switch). (b) **Crossover:** T568A numa ponta e T568B na outra. Liga **iguais** (PC↔PC, switch↔switch, hub↔hub).

## 17.

> O testador de cabos acusou **NEXT** baixo (reprovado) em um ponto. Cite quatro causas prováveis.

Pares **destrançados** além de 13 mm; **pares trocados**; plugue/jack **mal encaixados** ou de categorias diferentes; **abraçadeiras apertadas**; ferramenta de crimpagem/punch down deformada; patch cord de má qualidade.

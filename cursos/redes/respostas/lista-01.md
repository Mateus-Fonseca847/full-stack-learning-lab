# Respostas — Lista 01: Fundamentos de redes

Lista: [`listas/lista-01.md`](../listas/lista-01.md) · Aula: [`aulas/01-fundamentos.md`](../aulas/01-fundamentos.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L2 q.1)*

> Faça um esquema ilustrando um modelo de um sistema de comunicação.

```
Emissor ──► [ Meio de transmissão ] ──► Receptor
   ▲  mensagem                              ▲
   └────────── protocolo (regras) ──────────┘
```
Cinco componentes: **mensagem, emissor, receptor, meio de transmissão e protocolo**.

## 2. *(P1·L2 q.2)*

> Quais são as funções de uma rede de comunicação de dados?

(1) **Identificar** os elementos da rede e suas funções; (2) **especificar como interoperam** os componentes; (3) **implementar uma arquitetura**, distribuindo as funções entre os elementos de hardware e software.

## 3. *(P1·L2 q.3)*

> Quais são os principais indicadores de eficácia de uma rede de dados?

**Entrega** (chega ao destino certo), **precisão** (sem alteração) e **sincronização** (a tempo de ser útil). Para *desempenho*: vazão, atraso e jitter.

## 4. *(P1·L2 q.4)*

> Como as redes podem ser classificadas? Dê exemplos.

Por **modo de comunicação** (simplex: teclado; half-duplex: walkie-talkie; full-duplex: telefone), **modo de conexão** (ponto a ponto, multiponto), **topologia** (malha, estrela, anel, barramento, árvore, híbrida) e **abrangência** (PAN, LAN, MAN, WAN, SAN).

## 5. *(P1·L2 q.5)*

> Qual a diferença entre conexão ponto a ponto e conexão multiponto?

**Ponto a ponto:** enlace **dedicado** entre dois dispositivos (controle remoto ↔ TV). **Multiponto:** **mais de dois** dispositivos compartilham o mesmo enlace (TV aberta → assinantes), com difusão **irrestrita (broadcast)** ou **restrita a grupos (multicast)**.

## 6. *(P1·L2 q.6)*

> Qual é a diferença entre topologia física e topologia lógica?

**Física:** representação geométrica de como cabos, enlaces e dispositivos estão dispostos. **Lógica:** o **fluxo de dados** pela rede. Ex.: uma estrela física com hub funciona como barramento lógico.

## 7. *(P1·L2 q.7)*

> Explique detalhadamente a topologia em barramento, citando vantagens e desvantagens.

Topologia **multiponto**: todos os nós ligados a um **cabo comum**; o sinal enfraquece com a distância. **Vantagens:** fácil instalação, usa menos cabo que o anel, muito difundida. **Desvantagens:** **meio compartilhado → colisões**, precisa de controle de acesso/roteamento, um problema no cabo afeta todos, desempenho cai com o número de estações.

## 8. *(P1·L2 q.8)*

> Por que se usa o compartilhamento do meio físico? Quais suas vantagens e desvantagens? Dê exemplos de topologias onde o compartilhamento ocorre.

Usa-se para **reduzir custo** (menos cabos/portas) e simplificar a instalação. **Vantagem:** economia e simplicidade. **Desvantagem:** exige **controle de acesso**, há **colisões**, a **banda é dividida**, menos privacidade. **Exemplos:** barramento, anel, redes com hub, redes sem fio.

## 9. *(P1·L2 q.9)*

> Faça um esquema indicando os tipos de rede normalmente usados para acessar via internet um servidor da Sony no Japão, desde a sua casa.

```
Casa (LAN/Wi-Fi) → rede de acesso (fibra/cabo/ADSL) → provedor local (MAN)
→ backbone nacional (WAN) → cabo submarino → provedor/backbone no Japão
→ LAN do datacenter da Sony → servidor
```
Tipos de rede envolvidos: **LAN → MAN → WAN** (internacional) → **LAN**.

## 10.

> Uma rede em **malha completa** tem 8 estações. Quantos enlaces são necessários? E quantas portas em cada estação? Repita para 12 estações.

Enlaces = n(n−1)/2. **n = 8:** 8·7/2 = **28 enlaces**, **7 portas** por estação. **n = 12:** 12·11/2 = **66 enlaces**, **11 portas** por estação. Mostra por que a malha não escala.

## 11.

> Classifique cada exemplo quanto ao modo de comunicação (simplex, half ou full-duplex) e quanto à abrangência (PAN, LAN, MAN, WAN): (a) fone Bluetooth ligado ao celular, (b) rede Wi-Fi de uma casa, (c) TV a cabo de uma cidade, (d) rádio comunicador usado pela segurança do prédio, (e) ligação telefônica.

(a) PAN; (b) LAN (full-duplex lógico, rádio half-duplex); (c) MAN, **simplex** no sentido emissora→assinante; (d) **half-duplex**; (e) **full-duplex**.

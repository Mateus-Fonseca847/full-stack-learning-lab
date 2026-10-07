# Respostas — Lista 20: Redes ópticas e DWDM

Lista: [`listas/lista-20.md`](../listas/lista-20.md) · Aula: [`aulas/20-redes-opticas-dwdm.md`](../aulas/20-redes-opticas-dwdm.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P2·Óptica q.1-2)*

> O que é DWDM? Qual a diferença entre CWDM e DWDM?

**DWDM:** multiplexar **muitos λ** (40–160+) numa fibra com espaçamento **denso (0,8 nm ou menos)**, usando EDFA e lasers estabilizados. **CWDM:** espaçamento **grosso (20 nm)**, poucos canais, lasers baratos, curto alcance.

## 2. *(P2·Óptica q.3)*

> Quais as topologias comumente usadas em redes óticas?

**Ponto a ponto, barramento, estrela (broadcast-and-select), anel e malha.**

## 3. *(P2·Óptica q.4)*

> Explique o funcionamento das redes óticas de broadcast e seleção. Quais suas vantagens e desvantagens?

Acoplador estrela **difunde todos os λ a todos**; cada nó **seleciona** o seu com filtro/receptor sintonizável. **+** simples, passiva, multicast. **−** perda de potência (÷N), exige dispositivos sintonizáveis, sem reuso de λ, pouca segurança.

## 4. *(P2·Óptica q.5)*

> Explique o funcionamento das redes óticas em anel. Quais suas vantagens e desvantagens?

Nós com **WADMs** inserem/extraem λ no anel. **+** simples, barato, **proteção** natural (~50 ms). **−** capacidade compartilhada, escalabilidade e latência limitadas.

## 5. *(P2·Óptica q.6)*

> Explique o funcionamento das redes óticas em malha. Quais suas vantagens e desvantagens?

Nós **OXC** interligados, com **lightpaths** definidos por **RWA**. **+** uso eficiente e escalável, restauração por vários caminhos. **−** controle complexo, **continuidade de λ**, custo.

## 6. *(P2·Óptica q.7)*

> Por que é necessária uma camada de adaptação entre redes IP e redes DWDM?

IP gera **pacotes variáveis em rajada**; DWDM entrega **canais ópticos de circuito** sem noção de pacote/OAM/proteção. A camada de adaptação (ex.: **OTN/G.709**) faz **enquadramento, mapeamento, grooming, FEC e OAM**.

## 7. *(P2·Óptica q.8-9)*

> Quais são as formas de comutação usadas em redes óticas? Descreva a comutação de comprimento de onda e suas vantagens e desvantagens.

Comutação de **λ (circuitos ópticos)**, de **rajadas (OBS)** e de **pacotes (OPS)**. **λ:** comuta o canal inteiro **sem O-E-O**. **+** transparente, baixa latência/consumo, alta capacidade. **−** granularidade grossa, bloqueio por continuidade de λ, setup lento.

## 8. *(P2·Óptica q.10)*

> O que é controle in-band e out-of-band? Como cada forma é implementada?

**In-band:** controle no **mesmo canal** dos dados (overhead embutido no quadro, pilot tones). **Out-of-band:** controle em **canal separado** (λ dedicado — **OSC** — ou rede de controle à parte).

## 9. *(P2·Óptica q.12-13)*

> O que é um Fibre Delay Line? Qual seu uso típico, vantagens e desvantagens?

Trecho de fibra que **atrasa** o sinal (~5 µs/km): **buffer óptico**. Uso: resolver **contenção** em OBS/OPS e sincronizar. **+** passivo, simples, mantém o domínio óptico. **−** atraso fixo/discreto, volumoso, atenua, sem acesso aleatório.

## 10. *(P2·Óptica q.14-15)*

> O que é um FBG? O que é um acoplador óptico?

**FBG:** trecho de fibra com índice de refração modulado que **reflete uma faixa estreita de λ** e deixa passar o resto (filtro, add/drop). **Acoplador:** dispositivo **passivo** que **divide/combina** luz (perda ≥ 10·log N dB).

## 11. *(P2·Óptica q.16-18)*

> Quais os principais tipos de amplificadores usados em redes óticas? O que é um WADM? E um OXC?

**EDFA**, **Raman** e **SOA**. **WADM:** extrai/insere λ locais e passa os demais (anel). **OXC:** comuta λ entre várias fibras (malha), com demux → matriz (MEMS) → mux.

## 12. *(P2·Óptica q.20-23)*

> Qual a diferença entre sinal cinza e colorido? É possível multiplexar canais de várias cores? Como se multiplexa e comuta?

**Cinza:** sinal do cliente em λ padrão. **Colorido:** λ da **grade ITU** (compatível com DWDM), gerado por **transponder**. **Sim**, é o WDM. **Multiplexação:** transponders + mux óptico (AWG) + EDFAs. **Comutação:** OXC/ROADM (MEMS/WSS).

## 13.

> Um sistema DWDM tem **80 canais de 100 Gbps**. Qual a capacidade total? Um acoplador **1×16** causa quanta perda mínima? Um FDL de **2 km** atrasa quanto?

80 × 100 Gbps = **8 Tbps**. Perda 10·log₁₀(16) ≈ **12 dB**. Atraso ≈ 2 km × 5 µs/km = **10 µs**.

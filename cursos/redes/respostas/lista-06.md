# Respostas — Lista 06: Meios não guiados: espectro, rádio e satélites

Lista: [`listas/lista-06.md`](../listas/lista-06.md) · Aula: [`aulas/06-meios-nao-guiados.md`](../aulas/06-meios-nao-guiados.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P2·Wi-Fi q.1)*

> O que é onda eletromagnética?

Oscilação acoplada de **campos elétrico e magnético** que se propaga no espaço e no vácuo à velocidade da luz (3×10⁸ m/s), com f·λ = c.

## 2. *(P2·Wi-Fi q.2)*

> O que é faixa ISM? Dê exemplos de utilização.

Faixas de frequência (**Industrial, Scientific, Medical**) de uso **sem licença**, com limite de potência. Exemplos: **Wi-Fi, Bluetooth**, telefone sem fio, controle de garagem, brinquedos, forno de micro-ondas.

## 3. *(P1·L1 q.25)*

> Quais são as vantagens de se utilizar ondas de rádio em comunicações?

São **fáceis de gerar**, **atravessam estruturas** e são **omnidirecionais** (dispensam apontar), além de dar **mobilidade** e dispensar cabeamento (útil em montanhas, florestas e prédios antigos).

## 4. *(P1·L1 q.26)*

> Explique o que é uma antena omnidirecional.

Irradia/recebe com **intensidade praticamente igual em todas as direções** do plano horizontal (360°), sem precisar apontar; cobre uma área, mas com menor alcance que uma direcional.

## 5. *(P1·L1 q.27)*

> Cite uma vantagem dos satélites artificiais em relação aos naturais.

O satélite artificial **amplifica (regenera)** o sinal antes de retransmitir; o natural (Lua) só reflete/propaga. Também é possível escolher a órbita e a cobertura.

## 6. *(P1·L1 q.28)*

> Quais são as principais características dos satélites GEO, MEO e LEO?

**GEO:** 35.800 km, parece parado, cobertura enorme, **latência alta**, máx. ~180 satélites (2° de separação), VSAT. **MEO:** ~6 h por volta, cobertura menor, menor latência (**GPS**). **LEO:** órbita baixa, movimento rápido, exige **muitos satélites**, **menor latência e potência**.

## 7.

> Calcule o comprimento de onda para (a) 900 MHz, (b) 2,4 GHz, (c) 5 GHz. Qual é a frequência de uma onda com λ = 3 cm?

Use f·λ = 300 (f em MHz, λ em m). (a) 300/900 = **0,333 m (33,3 cm)**; (b) 300/2400 = **0,125 m (12,5 cm)**; (c) 300/5000 = **0,06 m (6 cm)**. λ = 0,03 m → f = 300/0,03 = 10.000 MHz = **10 GHz**.

## 8.

> Estime o atraso de **propagação** de ida e volta (RTT) de um enlace de satélite **GEO** (35.800 km), considerando velocidade 3×10⁸ m/s e ignorando processamento.

Um sentido terra→satélite→terra = 2·35.800 km ≈ 71.600 km → **≈ 239 ms**. Ida e volta (pergunta + resposta) ≈ **4·35.800 km → ≈ 477 ms**. Por isso GEO é ruim para aplicações interativas.

## 9.

> Por que ondas de baixa frequência (AM) contornam obstáculos e as de alta frequência (micro-ondas) precisam de linha de visada? Em que cada uma é usada?

Frequências baixas têm **λ grande**, atravessam/contornam obstáculos e seguem o solo (AM, longas distâncias, baixa banda). Altas frequências têm **λ pequeno**, viajam em **linha reta**, são absorvidas/refletidas pelos obstáculos, mas permitem **feixes estreitos** e muita banda (antenas parabólicas, enlaces ponto a ponto, Wi-Fi 5 GHz).

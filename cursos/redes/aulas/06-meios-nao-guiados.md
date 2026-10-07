# Aula 06 — Meios não guiados: espectro, rádio, micro-ondas e satélites

> Base: *Aula 5 – Meios de transmissão* (parte não guiada). Lista: [`listas/lista-06.md`](../listas/lista-06.md)

## 1. Por que sem fio?

Pessoas querem transferir dados de laptops, celulares e outros dispositivos com **independência de infraestrutura e mobilidade**. O meio sem fio também é a melhor opção para **montanhas, florestas, pântanos** e **prédios antigos** onde passar cabo é inviável.

## 2. Espectro eletromagnético

A movimentação de elétrons cria ondas eletromagnéticas que se propagam no espaço e no vácuo.

- **Frequência (f):** oscilações por segundo, em Hz.
- **Comprimento de onda (λ):** distância entre dois máximos (ou mínimos) consecutivos.
- No vácuo todas as ondas têm a mesma velocidade: **c = 3×10⁸ m/s**.

$$ f \cdot \lambda = c \quad\Rightarrow\quad f(\text{MHz}) \cdot \lambda(\text{m}) = 300 $$

| Frequência | λ |
|---|---|
| 100 MHz | 3 m |
| 1.000 MHz (1 GHz) | 0,3 m |
| 2,4 GHz (Wi-Fi) | 0,125 m |
| 5 GHz (Wi-Fi) | 0,06 m |

(No cobre ou na fibra a velocidade cai para ~2/3 de c.) Uma antena de **tamanho adequado** (relacionado a λ) transmite bem.

**O que serve para comunicação:** rádio, micro-ondas, infravermelho e luz visível. Ultravioleta, raios X e gama seriam melhores em banda, mas são **difíceis de produzir, perigosos e propagam mal**.

**Largura de banda × informação:** quanto maior a banda, mais informação a onda carrega. A maioria das transmissões usa banda **estreita** (melhor recepção); técnicas de **espalhamento espectral** (salto de frequência) usam banda larga para ganhar **segurança** e resistir ao **esmaecimento por múltiplos caminhos**.

### Faixa ISM
**ISM (Industrial, Scientific, Medical)** são faixas de frequência que podem ser usadas **sem licença** (respeitando limites de potência). Exemplos: **Wi-Fi, Bluetooth, telefones sem fio, controles de garagem, brinquedos**.

## 3. Ondas de rádio

Fáceis de gerar, **atravessam estruturas** e são **omnidirecionais** (propagam em todas as direções) — por isso muito usadas.

- **Antena omnidirecional:** irradia (e recebe) com praticamente a mesma intensidade em todas as direções horizontais; não precisa apontar. Ótima para cobrir uma área; a energia é espalhada, logo alcance menor que uma antena direcional.
- **Baixas frequências:** atravessam bem obstáculos, mas a potência cai rápido com a distância.
- **Altas frequências:** tendem a andar em **linha reta**, ricocheteiam e são **absorvidas** por obstáculos.
- **VLF, LF, MF** (muito baixa, baixa, média): ondas **rentes ao solo**, ultrapassam obstáculos (ex.: **rádio AM**).
- **HF e VHF:** as ondas rentes ao solo são absorvidas; usa-se a **ionosfera** para refratar.
- Grandes distâncias aumentam o risco de interferência → governos limitam frequências e potências.

## 4. Micro-ondas

Acima de ~100 MHz as ondas andam em **linha reta**: podem ser **concentradas** em feixe estreito (antena parabólica), com **menos interferência**. Como seguem reta, torres devem ser planejadas para que a curvatura da Terra e obstáculos não atrapalhem: **altitude** e **repetidores** (mais antenas).

## 5. Infravermelho e luz

| | Características |
|---|---|
| **Infravermelho** | relativamente direcional e barato (controle remoto); **não atravessa objetos** (restrição) → bom para **segurança**; **não precisa de licença** |
| **Ondas de luz (laser)** | ótima largura de banda; difícil **mirar** transmissor no receptor; sofrem com **chuva e neblina** |

## 6. Satélites

Um satélite funciona como um **repetidor no céu**. **Satélite artificial × natural:** o artificial **amplifica** o sinal (e pode regenerá-lo) antes de retransmitir; a Lua apenas reflete/propaga. **Vantagem do artificial:** amplificação (e escolha de órbita/cobertura, vida útil e uso dedicado).

O período orbital depende da altitude: a **35.800 km** é 24 h; a 384.000 km (Lua) é 1 mês.

| Órbita | Altitude / período | Características |
|---|---|---|
| **GEO** (geoestacionária) | 35.800 km, 24 h (parece parado) | cobertura enorme; **latência alta** (~250 ms de propagação); precisa ficar a **2°** de distância dos vizinhos → no máximo **180 satélites** (360°/2°); disputa política por posições e frequências; permite **VSAT** (terminais pequenos, antena ~1 m, baixo custo, uso de HUB) |
| **MEO** (média) | ~6 h por volta | área de cobertura menor; menos potência; **menor latência**; ex.: **GPS** |
| **LEO** (baixa) | movimento rápido | exige **muitos satélites** para cobrir grande área; **menor latência**, **menor potência** |

## 7. Pratique

```bash
cd praticas
node f_lambda.js 2.4e9 5e9 900e6   # comprimentos de onda
```

---

## Exercícios

Lista: [`listas/lista-06.md`](../listas/lista-06.md) — respostas: [`respostas/lista-06.md`](../respostas/lista-06.md)

---

## Resumo

- **f·λ = c** (f·λ = 300 com f em MHz e λ em metros).
- Rádio: omnidirecional, atravessa obstáculos (baixas freq.); micro-ondas: linha reta, feixe estreito; infravermelho: curto alcance, sem licença; luz: sofre com chuva/neblina.
- **ISM:** faixas sem licença (Wi-Fi, Bluetooth...).
- Satélites: **GEO** (35.800 km, latência alta, máx. 180), **MEO** (GPS), **LEO** (muitos, baixa latência).

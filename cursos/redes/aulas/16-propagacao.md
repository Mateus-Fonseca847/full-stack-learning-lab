# Aula 01 — Propagação: como o sinal de rádio viaja

> Base: *Wi-Fi · aula 2 – Propagação*. Lista: [`listas/lista-01.md`](../listas/lista-01.md)

## 1. A onda eletromagnética

Uma **onda eletromagnética** é uma perturbação formada por dois campos que andam juntos:

- o **campo elétrico (E)** e o **campo magnético (H)**;
- são **perpendiculares** entre si e **estão em fase** (máximos e mínimos acontecem ao mesmo tempo);
- o plano formado pelos dois é **transversal à direção de propagação** (a onda anda "de lado" em relação às oscilações);
- as intensidades dos campos **diminuem com a distância** da fonte.

Analogia: jogar uma pedra na água. A ondulação se espalha e fica mais fraca quanto mais longe da pedra.

**Faixa ISM** (*Industrial, Scientific and Medical*): faixas de frequência de **uso sem licença**, com limite de potência. As do Wi-Fi são **2,4 GHz** (2.400–2.483,5 MHz) e **5 GHz**. Exemplos de uso: Wi-Fi, Bluetooth, telefone sem fio, controle remoto, forno de micro-ondas. *(A definição de ISM é complemento; os slides só citam as faixas.)*

## 2. Tipos de onda, conforme o caminho

| Onda | Por onde vai |
|---|---|
| **Terrestre** | caminha **perto e paralela à superfície**; é a principal fonte de energia na cobertura primária de uma estação |
| ↳ de **superfície** | acompanha o solo |
| ↳ **espacial** | divide-se em **direta** (linha de visada) e **refletida** (bate no chão e volta) |
| **Ionosférica (celeste)** | volta à Terra depois de **refletir ou espalhar na ionosfera** |
| **Troposférica** | é **refletida ou espalhada na troposfera** |

## 3. A atmosfera

| Camada | Altura | O que importa |
|---|---|---|
| **Troposfera** | até ~**11 km** | em contato com o solo; a temperatura **cai 6,5 a 7 °C por km**; fenômenos: **refração, reflexão, difração e absorção** |
| **Estratosfera** | ~11 a 50 km | camada intermediária, **sem interesse** para rádio (não altera a propagação) |
| **Ionosfera** | ~50 a 400 km | depende do **grau de ionização**, que varia durante o dia; subcamadas: **D** (50–90 km, perda por absorção), **E** (90–150 km, baixa ionização), **F** (150–400 km, F1 e F2) |

**Atenuação por chuva e gases:** a atenuação por chuva cresce com a **intensidade da chuva** (mm/h) e com a **frequência**, saturando acima de ~100 GHz; neblina também cresce com a frequência. A absorção por **vapor d'água** tem pico perto de **23 GHz** e a do **oxigênio** perto de **60 GHz**.

**Propagação troposférica** (VHF para cima, > 30 MHz): o **índice de refração** (~1,0003) depende de pressão, temperatura e umidade e **decresce com a altura**, o que **encurva** a trajetória para baixo. Variações abruptas dão **reflexão parcial**; queda muito acentuada cria **dutos troposféricos**, que causam regiões de sombra, **multipercurso atmosférico** ou interferência em enlaces distantes. Irregularidades pequenas causam **espalhamento** (usado na tropodifusão).

## 4. Os mecanismos de propagação (a base da lista)

| Mecanismo | O que acontece | Analogia |
|---|---|---|
| **Reflexão** | a onda bate num meio diferente: parte **reflete** e parte **passa**. Em condutor perfeito, **toda** a energia reflete. Em terra plana, o sinal é a soma do **raio direto** e do **refletido**; se chegam em oposição de fase, há **atenuação por interferência** | espelho |
| **Dispersão (espalhamento)** | superfície **irregular** espalha a onda em todas as direções; a onda refletida num solo rugoso é **mais fraca** que numa superfície lisa | luz numa parede áspera |
| **Difração** | permite contornar a curvatura da Terra e **obstáculos**. Explicada pelo **princípio de Huygens**: cada ponto da frente de onda age como nova fonte | som contornando uma esquina |
| **Refração** | a onda **muda de direção** ao passar por regiões de índice de refração diferente; na atmosfera, a trajetória **curva para baixo** | canudo "quebrado" no copo d'água |
| **Absorção** | a energia vira calor (chuva, vapor d'água, oxigênio, paredes) | esponja |

### Zonas de Fresnel

Zonas de Fresnel são regiões em volta da linha reta entre transmissor e receptor. Um obstáculo dentro delas atrapalha o sinal.

- **60% da 1ª zona livre → sem perda** em relação ao espaço livre.
- Obstrução de **metade do campo** (borda do obstáculo na linha de visada): **6 dB** de perda.
- Abaixo da linha de visada (zona de sombra) a perda **aumenta continuamente**; acima dela há **oscilação** em torno do valor de espaço livre.
- Cálculo: difração por **gume de faca** (obstáculo fino, de largura infinita).

Analogia: a linha de visada é um fio, e a zona de Fresnel é o "tubo" em volta dele que precisa ficar desimpedido, não só o fio.

### Refração e raio efetivo da Terra

- Índice de refração médio ao nível do mar: **1,000315**; usa-se a **refratividade N** (que **diminui exponencialmente** com a altura): N(h) = Ns · e^(−h/H), com **Ns = 315** e **H = 7,35 km**.
- O que importa é o **gradiente** de N, não o valor absoluto. Perto da Terra ele pode ser tratado como linear.
- Com gradiente uniforme, o raio "se curva para baixo" e pode ser tratado como reto num raio de Terra **efetivo**; na atmosfera padrão, o fator é **K = 4/3**.

## 5. O canal de rádio móvel

Num canal móvel, **um único caminho direto raramente é o único**: o sinal chega por **vários caminhos (multipercurso)**, somados por reflexão, difração e dispersão. O canal é **aleatório** e difícil de modelar.

| Variação | O que descreve |
|---|---|
| **Larga escala** | prevê o nível médio local do sinal |
| **Pequena escala (fading / atenuação)** | flutuações rápidas de amplitude, fase ou atraso em pequenas distâncias ou intervalos |

**O que causa o fading de pequena escala:** propagação por **vários caminhos**, **velocidade da estação móvel**, **velocidade dos objetos ao redor** e **largura de banda do sinal**. Efeitos: modulação aleatória de frequência por **efeito Doppler** e **dispersão de tempo (eco)** por atraso entre caminhos.

| Tipos de atenuação | |
|---|---|
| Por **atraso de tempo** em vários caminhos | **uniforme** ou **seletiva em frequência** |
| Por **espalhamento Doppler** | **rápida** ou **lenta** |

## 6. Complemento: perda no espaço livre

**FSPL(dB) = 20·log₁₀(d em km) + 20·log₁₀(f em MHz) + 32,44.** Dobrar a **distância** ou a **frequência** custa **+6 dB**. Por isso 5 GHz perde mais que 2,4 GHz no mesmo trecho.

## 7. Pratique

```bash
cd praticas
node propagacao.js 2400 0.1      # FSPL, Fresnel e refratividade
```

---

## Exercícios

Lista: [`listas/lista-01.md`](../listas/lista-01.md) — respostas: [`respostas/lista-01.md`](../respostas/lista-01.md)

---

## Resumo

- Onda EM = **E e H** perpendiculares, em fase, transversais à propagação.
- Ondas: **terrestre** (superfície e espacial), **ionosférica**, **troposférica**.
- Mecanismos: **reflexão, dispersão, difração, refração, absorção**.
- **Fresnel:** 60% da 1ª zona livre = sem perda; meio campo obstruído = 6 dB.
- Refração: **K = 4/3**, Ns = 315, H = 7,35 km.
- Canal móvel: **multipercurso**; fading em **pequena escala**.

# Aula 07 — Cabeamento estruturado e boas práticas de instalação

> Base: material *Boas práticas de instalação em cabeamento estruturado* (Furukawa, rev. 02-2011). Lista: [`listas/lista-07.md`](../listas/lista-07.md)

## 1. O que é

**Rede (cabeamento) estruturada** é projetada para fornecer uma **infraestrutura que permita evolução e flexibilidade** para vários serviços: **dados, voz, imagem, controle de acesso, segurança, sonorização, sensores, controle ambiental**.

**Objetivos:** dar a empresas e pessoas soluções para tráfego de dados/voz/imagem e **interligar pontos** (estações de trabalho) entre si e aos serviços públicos de telecom.

### Normas
| Norma | Assunto |
|---|---|
| **TIA/EIA 568-C.0/.1/.2/.3** | cabeamento genérico, edifícios comerciais, par trançado balanceado, fibra óptica |
| **TIA/EIA 569-B** | caminhos e espaços (infraestrutura) |
| **TIA/EIA 570-B** | residencial |
| **TIA/EIA 606-A** | administração/identificação |
| **TIA/EIA 607-B** | aterramento |
| **TIA-942** | data centers |
| **ABNT NBR 14565** | cabeamento para edifícios comerciais (Brasil) |

## 2. Subsistemas (componentes)

```
Entrada de serviços → Sala de equipamentos → Backbone (óptico ou metálico)
   → Armário de telecomunicações → Cabeamento horizontal → Tomada → Área de trabalho
```

- **Cross-connect:** equipamento ativo ↔ patch panel 1 ↔ (cordões de manobra) ↔ patch panel 2 ↔ cabeamento horizontal ↔ tomada.
- **Interconexão:** equipamento ativo ↔ patch panel ↔ cabeamento horizontal ↔ tomada (um patch panel a menos).
- **Ponto de consolidação** e **MUTOA** (tomada de telecom multiusuário) são opcionais para áreas abertas.

### Comprimentos
- **Permanent link** (parte fixa): até **90 m**, incluindo sobras.
- **Channel** (canal): permanent link + patch cords = até **100 m**.
- Patch cords são de cabo **flexível**, que **atenua ~20% mais** que o cabo sólido.

## 3. Evolução dos cabos metálicos

| Padrão IEEE | Taxa | Cabo |
|---|---|---|
| 802.3 (10BASE-2) | 10 Mbps | coaxial |
| 802.3i (10BASE-T) | 10 Mbps | Cat 3 |
| 802.3u (100BASE-TX) | 100 Mbps | Cat 5 |
| 802.3ab (1000BASE-T) | 1 Gbps | Cat 5e/6 |
| 802.3an (10GBASE-T) | 10 Gbps | **Cat 6A** |

Para **40 e 100 Gbps** use **fibra multimodo OM3/OM4**.

**Alien crosstalk (AXT):** interferência **entre cabos vizinhos** (relevante em Cat 6A, 10 Gbps).

### Nomenclatura de blindagem: **X / X T P**
Formato `[blindagem global] / [blindagem dos pares] TP`: **U** = sem, **F** = folha (foil), **S** = malha (braid).

| Sigla | Significado |
|---|---|
| **U/UTP** | sem blindagem alguma |
| **F/UTP** | folha global, pares sem blindagem |
| **U/FTP** | cada par com folha |
| **S/FTP** | malha global + folha em cada par |
| **SF/UTP** | malha + folha globais |

## 4. Flamabilidade e materiais

| Sigla | Aplicação |
|---|---|
| **CMX** | residencial, pouca concentração de cabos, sem ar forçado |
| **CM** | uso geral (horizontal) |
| **CMR (riser)** | verticais, entre andares (shafts) |
| **CMP (plenum)** | espaços fechados, **com fluxo de ar forçado** |

- **Lead free / RoHS:** proíbe chumbo, cádmio, cromo hexavalente, mercúrio, PBB e PBDE.
- **LSZH (Low Smoke Zero Halogen):** baixa fumaça e **sem halogênios** na queima; indicado onde há **concentração de pessoas**.
- **Grau de proteção IP:** 1º número = sólidos/poeira (0–6); 2º = líquidos (0–8). Ex.: **IP67** = totalmente protegido contra poeira + imersão temporária (linha industrial).

## 5. Boas práticas — rede metálica

**Lançamento:**
- Raio mínimo de curvatura do UTP: **4× o diâmetro** do cabo.
- Tração máxima: **11,3 kgf**.
- Lançar de uma vez; não estrangular, torcer ou prensar (abraçadeira apertada altera o cabo).
- Lance máximo: **90 m** incluindo sobras. **Nunca emendar**. Não reutilizar cabos antigos.
- Não usar vaselina, sabão ou detergente para facilitar a passagem.
- Temperatura máxima de operação: **60 °C**.
- Evitar arestas vivas, umidade e intempéries; decapar **só nos pontos de conectorização**.
- Se dividir infraestrutura com **energia**, separar fisicamente; cruzar com cabos de energia em **ângulo reto**.

**Conectorização:**
- Mesmo padrão (**T568A ou T568B**) nas **duas** extremidades.
- Destrançar **no máximo 13 mm** dos pares; perder o trançamento causa **NEXT**.
- Usar a ferramenta correta (**punch down**), nunca estilete, chave de fenda ou tesoura.
- Folga: **30 cm** nas tomadas; **3 m** nas salas de telecomunicações.
- Agrupar em feixes de **até 24 cabos**, amarrar com **velcro** (não abraçadeira plástica apertada).
- Identificar todos os cabos e portas do patch panel.

**Infraestrutura:**

| Tipo | Regra |
|---|---|
| **Eletrocalha** | ocupação máxima **50%** da seção; aterrada |
| **Eletroduto/conduíte** | ocupação máxima **40%**; um ramal atende até 3 tomadas |
| **Canaleta** | 40–60% conforme raio de curvatura |
| **Piso elevado** | rotas dedicadas (não "teia de aranha") |
| **Teto** | não apoiar direto no forro: afastar **≥ 7,62 cm** |

**Cálculo de eletrocalha (exemplo do material):** cabo de 6 mm → área = π·3² ≈ 28,27 mm². Calha 150×50 mm = 7.500 mm²; a 50% = 3.750 mm² → 3.750/28,27 ≈ 132,6. O material mostra 133 (arredondando para cima); na prática use **132** para não passar de 50%.

## 6. Testes e certificação (metálico)

Parâmetros: impedância (100 Ω), atenuação, **NEXT**, ACR, PSNEXT, **Return Loss (RL)**, tempo de propagação (NVP), FEXT/PS-FEXT/EL-FEXT, **Alien** (Cat 6A).

| | **Permanent link** | **Channel (canal)** |
|---|---|---|
| Mede | só a parte fixa | tudo, incluindo patch cords |
| Uso | certificação da obra | teste mais completo (com os cordões definitivos) |

- **NEXT** é o teste **mais importante** para qualificar o cabeamento. Causas de falha: excesso de conexões, perda do trançamento, plugue/jack mal encaixados, **pares trocados**, componentes de categorias diferentes, ferramentas deformadas, compressão por abraçadeiras.
- **Atenuação** alta: categoria inadequada, NVP errado, comprimento excessivo, conexões mal feitas, patch cords rígidos.
- **Return Loss** ruim: irregularidade de construção, impedância ≠ 100 Ω, esmagamento, tração excessiva.
- Faça a **autocalibração** do scanner antes dos testes; equipamento não aferido não vale para garantia estendida.

## 7. Fibra óptica na instalação

- **Cabos:** **tight** (indoor/outdoor Fiber-LAN, puxar pelo **elemento de tração**, nunca pela capa) e **loose** (externo, com bloqueio de água).
- **Conectores:** SC, LC (duplex), FC, E2000.
- **Raio de curvatura:** **40×** o diâmetro do cabo **durante a instalação** e **20×** depois de acomodado.
- Sobras em forma de **8**; reserva técnica: 1 volta nas caixas de passagem, **3 m** em cada ponta nas emendas.
- **Emendas:** por **fusão** (baixa atenuação) ou **mecânica** (reparo emergencial).
- **DIO** (distribuidor interno óptico): fechado, limpo, sem forçar os cabos.
- **Medição:** **power meter** (fonte + medidor; indicado para **LANs**) e **OTDR** (reflectometria; indicado para **lances longos**, CATV/telecom). Medir MMF em **850 e 1300 nm**; SMF em **1310 nm**.

## 8. Data center (TIA-942)

Ambiente para sistemas críticos: segurança, performance, alta densidade, eficiência. Vai além do cabeamento: energia, telecom, HVAC (climatização), piso elevado, incêndio, controle de acesso, gestão.

Áreas: **sala de entrada** → **MDA** (distribuição principal) → **HDA** (distribuição horizontal) → **ZDA** (zona) → **EDA** (distribuição de equipamentos). Problema atual: **refrigeração (cooling)**.

---

## Exercícios

Lista: [`listas/lista-07.md`](../listas/lista-07.md) — respostas: [`respostas/lista-07.md`](../respostas/lista-07.md)

---

## Resumo

- Cabeamento estruturado = infraestrutura única e flexível (dados, voz, imagem...). Permanent link **90 m**, channel **100 m**.
- Cat 6A para 10 Gbps; 40/100 Gbps = fibra OM3/OM4.
- Regras de ouro: raio de curvatura **4×** (UTP) / **40×–20×** (fibra); destrançar **≤ 13 mm**; calha **50%**, duto **40%**; tração **11,3 kgf**; nada de emendas.
- **NEXT** é o teste-chave. Fibra: **power meter** (LAN) e **OTDR** (longo).

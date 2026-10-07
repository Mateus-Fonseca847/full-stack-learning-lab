# Respostas — Lista 07: Cabeamento estruturado e boas práticas

Lista: [`listas/lista-07.md`](../listas/lista-07.md) · Aula: [`aulas/07-cabeamento-estruturado.md`](../aulas/07-cabeamento-estruturado.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1.

> Defina **cabeamento estruturado** e cite três serviços que ele deve suportar.

Infraestrutura de cabeamento projetada para **evoluir e ser flexível**, atendendo vários serviços: **dados, voz, imagem**, controle de acesso, sensores, sonorização, controle ambiental.

## 2.

> Qual o comprimento máximo do **permanent link** e do **channel**? Por que os patch cords usam cabo flexível e o que isso implica?

**Permanent link: 90 m**; **channel: 100 m** (inclui patch cords). O cabo flexível facilita a manobra, mas **atenua ~20% mais** que o cabo sólido — por isso os cordões são curtos.

## 3.

> Qual categoria de cabo você escolheria para 10 Gbps a 100 m? E para 40/100 Gbps?

**Cat 6A** (500 MHz) para 10 Gbps/100 m. Para 40/100 Gbps, **fibra multimodo OM3/OM4**.

## 4.

> Decifre as siglas de blindagem: **U/UTP, F/UTP, U/FTP, S/FTP**.

Formato *blindagem global / blindagem dos pares*: **U/UTP** sem blindagem; **F/UTP** folha global; **U/FTP** folha em cada par; **S/FTP** malha global + folha em cada par.

## 5.

> Associe cada classe de flamabilidade à aplicação: **CMX, CM, CMR, CMP**.

**CMX:** residencial. **CM:** uso geral horizontal. **CMR (riser):** prumadas/entre andares. **CMP (plenum):** espaços fechados com fluxo de ar forçado.

## 6.

> O que significam **LSZH** e **RoHS**? Onde usar LSZH?

**RoHS:** restrição de substâncias perigosas (chumbo, cádmio, cromo hexavalente, mercúrio, PBB, PBDE). **LSZH:** *Low Smoke Zero Halogen*, baixa fumaça e sem halogênios na queima; indicado onde há **concentração de pessoas**.

## 7.

> Cite cinco regras de **lançamento** de cabos UTP (raio, tração, emendas, lance, temperatura).

Raio mínimo de **4× o diâmetro**; tração máxima **11,3 kgf**; **sem emendas**; lance de até **90 m** (com sobras); temperatura máxima **60 °C**; não usar lubrificantes químicos; evitar arestas vivas.

## 8.

> Qual o **máximo de destrançamento** dos pares ao conectorizar e por que isso importa? Qual ferramenta se usa no patch panel?

**13 mm.** Destrançar mais piora o **NEXT** (diafonia). Usa-se **punch down** — nunca estilete, chave de fenda ou tesoura.

## 9.

> Uma eletrocalha de **100 × 50 mm** deve ter ocupação máxima de **50%**. Quantos cabos de **6 mm** de diâmetro cabem?

Área da calha = 5.000 mm²; 50% = 2.500 mm². Área do cabo = π·3² ≈ 28,27 mm². 2.500 / 28,27 ≈ 88,4 → **88 cabos**.

## 10.

> Diferencie **permanent link** e **channel** nos testes de certificação e cite o teste considerado mais importante.

**Permanent link** testa só a **parte fixa**; **channel** testa o **canal completo** (inclui patch cords) — mais completo. O teste mais importante é o **NEXT** (diafonia na ponta próxima).

## 11.

> Em fibra óptica, por que se usa **OTDR** em lances longos e **power meter** em LANs? Em quais comprimentos de onda se mede MMF e SMF?

O **power meter** (fonte + medidor) mede a **perda total** e é simples/barato para lances curtos de LAN; o **OTDR** usa reflectometria e **localiza** emendas, conectores e rupturas ao longo de **lances longos**. MMF: **850 e 1300 nm**; SMF: **1310 nm**.

## 12.

> Quais as regras de **raio de curvatura** do cabo óptico e como devem ficar as sobras?

**40× o diâmetro** durante a instalação e **20×** depois de acomodado; sobras em **forma de 8**; reserva técnica de **3 m** em cada ponta de emenda.

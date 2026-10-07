# Respostas — Lista 19: Wi-Fi (802.11): MAC, quadro e economia de energia

Lista: [`listas/lista-19.md`](../listas/lista-19.md) · Aula: [`aulas/19-wifi-802-11-mac.md`](../aulas/19-wifi-802-11-mac.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P2·Wi-Fi q.18)*

> Explique os problemas da estação exposta e da estação escondida.

**Escondida:** A e C alcançam B mas não se ouvem → colidem em B. **Exposta:** B transmite para A, C o ouve e **se abstém** de transmitir para D mesmo sem interferir em A (perda de capacidade). **RTS/CTS** ajuda na escondida.

## 2. *(P2·Wi-Fi q.19-20)*

> Por que o 802.11 permite fragmentação de quadros? Como é feito o envio dos fragmentos?

O meio é ruidoso: quadros menores têm **mais chance de chegar** e custam menos para reenviar. Envio em **rajada**: fragmento → **ACK após SIFS** → próximo fragmento após SIFS (a estação mantém o canal); o campo Duração reserva o próximo fragmento + ACK.

## 3. *(P2·Wi-Fi q.21)*

> Por que o 802.11 permite agregação de quadros (A-MSDU)?

Para **reduzir overhead** quando o canal é bom: vários pacotes num só quadro (um cabeçalho, um backoff, um ACK) → **mais eficiência**.

## 4. *(P2·Wi-Fi q.22)*

> Qual a diferença entre PCF e DCF?

**DCF:** distribuído, por **disputa (CSMA/CA)**, obrigatório. **PCF:** centralizado, o **AP faz polling** em período livre de disputa (CFP), opcional.

## 5. *(P2·Wi-Fi q.23)*

> Explique o CSMA/CA.

Escuta o canal livre por **DIFS**, sorteia **backoff** (decrementa só com canal livre), transmite; o receptor responde **ACK após SIFS**; sem ACK, **dobra a CW** e tenta de novo. Evita colisão pois o rádio **não detecta colisão**.

## 6. *(P2·Wi-Fi q.25-27)*

> O que é o beacon? Uma rede pode operar PCF e DCF simultaneamente? Descreva o superframe.

**Beacon:** quadro de gerenciamento periódico do AP (~100 ms): SSID, taxas, canal, timestamp, TIM — sincroniza, anuncia a rede e delimita o superquadro. **Sim**, alternam: **superquadro = beacon + CFP (PCF) + CP (DCF)**, com CF-End no fim do CFP.

## 7. *(P2·Wi-Fi q.28-30)*

> O que são SIFS, PIFS e EIFS? Qual a função de cada um?

**SIFS** (menor): ACK, CTS, fragmentos, respostas — **maior prioridade**. **PIFS** (SIFS + 1 slot): o AP assume o canal para o **PCF**. **EIFS** (longo): após receber quadro **com erro**, evita colidir com o ACK de um diálogo que não entendeu. Ordem: SIFS < PIFS < DIFS < EIFS.

## 8. *(P2·Wi-Fi q.33-35)*

> Faça um esquema do quadro 802.11, explique o campo Duração e por que existem 4 campos de endereço.

`FC(2) | Duração(2) | A1(6) | A2(6) | A3(6) | Seq(2) | A4(6) | Corpo(0–2312) | FCS(4)`.
**Duração:** tempo em µs que o meio ficará ocupado — os outros ajustam o **NAV**. **4 endereços:** em redes com AP há endereços **fim a fim** (origem/destino) e **de salto** (transmissor/receptor); A4 só em **AP↔AP**.

## 9. *(P2·Wi-Fi q.36-39)*

> Qual a diferença entre rede ad hoc e estruturada? Para que serve o campo Controle de Quadro e como se diferenciam os quadros de dados, controle e gerenciamento?

**Ad hoc:** estações falam direto, sem AP. **Estruturada:** via AP. **Controle de Quadro:** versão, **tipo/subtipo**, To DS/From DS, More Frag, Retry, Power Mgmt, More Data, Protected, Order. **Tipo: 00 gerenciamento, 01 controle, 10 dados.**

## 10. *(P2·Wi-Fi q.40-42)*

> Quais os principais quadros de controle? Como se indica RTS ou CTS? Como saber se o emissor é um AP?

RTS, CTS, ACK, PS-Poll, CF-End. **RTS/CTS:** Tipo 01 e **subtipo 1011 (RTS)** / **1100 (CTS)**. (A lista traz “RTC”: é RTS.) **Emissor é AP** quando **From DS = 1 e To DS = 0**.

## 11. *(P2·Wi-Fi q.43-48)*

> O que é o modo de economia de energia? Explique PS-Poll, APSD e Wake-on-Wireless.

A estação **dorme** e avisa pelo bit **Power Management**; o AP **bufferiza** e indica no **TIM**. **PS-Poll:** acorda no beacon, envia PS-Poll e recebe **um quadro por vez** até More Data = 0. **APSD:** entrega em **rajada** (U-APSD por gatilho do cliente; S-APSD agendado). **WoWLAN:** a placa Wi-Fi **acorda o computador** ao receber um pacote especial.

## 12. *(P2·Wi-Fi q.49-50)*

> Explique o processo de associação e autenticação em uma rede estruturada e a diferença entre varredura ativa e passiva.

**Varredura → autenticação → associação** (Request/Response com **AID**). **Passiva:** escuta **beacons** (lenta, silenciosa). **Ativa:** envia **Probe Request** e recebe **Probe Response** (rápida, revela a estação).

## 13. *(P2·Wi-Fi q.31-32)*

> Por que as redes sem fio são mais inseguras? Explique a evolução do 802.11.

Meio **aberto e compartilhado**: escuta e injeção sem acesso físico. Evolução: **802.11 (1997, 2 Mbps)** → **b (11 Mbps, DSSS)** → **a/g (54 Mbps, OFDM)** → **n (MIMO, 600 Mbps)** → **ac (5 GHz, MU-MIMO, ~6,9 Gbps)** → **ax (OFDMA, Wi-Fi 6)** → **be (Wi-Fi 7)**.

## 14.

> Preencha A1, A2 e A3 para o quadro enviado de um **notebook (SA)** a um **servidor cabeado (DA)** através de um **AP (BSSID)**, e para a resposta do servidor ao notebook. Informe To DS/From DS.

**Notebook → AP:** To DS = 1, From DS = 0 → A1 = **BSSID**, A2 = **SA (notebook)**, A3 = **DA (servidor)**. **AP → notebook:** To DS = 0, From DS = 1 → A1 = **DA (notebook)**, A2 = **BSSID**, A3 = **SA (servidor)**.

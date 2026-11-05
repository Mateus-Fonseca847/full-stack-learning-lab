# Aula 10 — Economia de energia no Wi-Fi

> Base: *Wi-Fi · aula 10 – Canalização* (parte final: *Power Management* e *Power Save Modes*). Lista: [`listas/lista-10.md`](../listas/lista-10.md)

## 1. A ideia

O rádio de um celular gasta muita bateria. O truque é **dormir** (desligar o rádio) e acordar só quando necessário. Mas quem dorme **perde quadros**, então alguém precisa **guardá-los**. A estação informa que vai dormir pelo **bit de economia de energia** do campo de controle do quadro (**1 = em economia**, **0 = ativa**).

Analogia: um porteiro que **guarda a correspondência** de quem está viajando e entrega quando a pessoa volta.

## 2. Gerenciamento de energia em cada tipo de rede

| Rede | Como funciona |
|---|---|
| **IBSS (ad hoc)** — sem AP | a estação deve **acordar para receber cada quadro de anúncio (ATIM**, *ad hoc traffic indication message* window) transmitido na rede, e **ficar acordada** por um tempo depois dele, para as outras enviarem seus quadros. Impõe **ligeira sobrecarga** ao transmissor: ele envia **um quadro de anúncio além do quadro de dados**, e **guarda o dado** até a estação em economia acordar e reconhecer o ATIM |
| **BSS (estruturada)** — com AP | mecanismo **centralizado no AP**: o AP **armazena os quadros** e envia **quando as estações requererem**. A estação informa ao AP, **na associação**, o número de períodos de anúncio em que ficará em economia, e só acorda nos **tempos determinados pelo AP** (quando há quadros **multicast**) |

## 3. Os três modos de economia em redes estruturadas

### PS-Poll Mode (PSM)
- Usa o **período de beacon** do AP. Um **bit no campo de controle** do quadro sinaliza a economia de energia.
- O AP anuncia no **TIM** (*Traffic Indication Map*) quais estações têm dados guardados; o intervalo de escuta é o **DTIM** (*Delivery TIM*).
- A estação acorda, lê o TIM e, se há dados para ela, envia um **PS-Poll**, que **inicia a entrega**; o AP manda os quadros (um por vez, indicando se há mais).
- **Restrições:** há um **compromisso entre latência e energia**; um **DTIM muito longo** pode causar **dados descartados** e até prejudicar a **estabilidade da associação**; as condições são definidas pelo AP.

### APSD — *Automatic Power Save Delivery*
- **Não fica preso à infraestrutura** (beacon ou DTIM); é **orientado a dados** e **iniciado pelo cliente**.
- Tenta tratar a economia **conforme o uso de Wi-Fi no nível da aplicação**.
- Dois modos:
  - **Não agendado (U-APSD):** parecido com o PSM, mas a entrega é pedida por um **pacote chamado *trigger frame*** (não amarrado ao beacon ou ao DTIM). O ciclo **acorda → envia → recebe → dorme** segue o **período de dados da aplicação**.
  - **Agendado (S-APSD):** usa uma unidade de dados chamada **stream**, cujo **intervalo é pedido pelo cliente**. O ciclo acorda-envia-recebe-dorme depende do período dos dados da aplicação, **sem PS-Poll nem trigger frame**. Voltado a **comunicação em fluxo** (áudio e vídeo).

### Wake-on-Wireless (WoW)
- Permite que o **host** economize energia ficando em **baixo consumo**, enquanto a **interface WLAN continua escutando a rede** (detecta o TIM e envia PS-Poll).
- Ciclo **acorda → processa → dorme** **iniciado pela WLAN**: ela **acorda o host por uma interrupção** quando detecta um ***magic packet***.
- O *magic packet* é definido por **filtros**: pacote dirigido à estação, rotação de chave, mensagem de grupo etc.

| Modo | Quem puxa os dados | Amarrado ao beacon? | Bom para |
|---|---|---|---|
| **PS-Poll** | a estação, após ler o TIM | **sim** | uso geral |
| **APSD não agendado** | a estação, por *trigger frame* | não | tráfego por demanda |
| **APSD agendado** | agenda de *stream* | não | áudio e vídeo |
| **Wake-on-Wireless** | a WLAN acorda o **computador** | — | acordar o host por *magic packet* |

---

## Exercícios

Lista: [`listas/lista-10.md`](../listas/lista-10.md) — respostas: [`respostas/lista-10.md`](../respostas/lista-10.md)

---

## Resumo

- A estação avisa que vai dormir pelo **bit de energia** do controle de quadro; quem guarda os quadros é o **AP** (infraestrutura) ou o **transmissor**, via **ATIM** (ad hoc).
- **PS-Poll:** TIM/DTIM no beacon → PS-Poll → entrega. **Trade-off latência × energia.**
- **APSD:** não agendado (*trigger frame*) e agendado (*stream*), sem amarra ao beacon.
- **Wake-on-Wireless:** a WLAN acorda o host por *magic packet*.

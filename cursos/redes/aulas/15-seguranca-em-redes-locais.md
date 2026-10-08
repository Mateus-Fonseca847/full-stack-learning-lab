# Aula 16 — Segurança em redes locais (camada de enlace)

> Base: *Aula 10 – Ethernet* (4ª parte: segurança). Lista: [`listas/lista-16.md`](../listas/lista-16.md)

## 1. Conceitos básicos

- **Rede segura:** segurança **física, lógica e operacional** + **política de segurança**. O **usuário é o ponto mais fraco**. **Não existe segurança absoluta.**

| Tipo | Foco |
|---|---|
| **Física** | integridade física dos recursos (instalações, cabos, switches, roteadores) |
| **Lógica** | alterações/erros em recursos tecnológicos; defesa em nível de **software** |
| **Operacional** | **normas de uso** para pessoas; problemas = erros de configuração **acidentais** ou **deliberados** |

**Política de segurança:** documento que **norteia** as ações de segurança — ameaças, riscos, objetivos, **quem acessa o quê**, regras para divulgar informação a terceiros, **como reagir a violações** (limites de tolerância).

### Propriedades e serviços

| Propriedade | Significa |
|---|---|
| **Confidencialidade** | só remetente e destinatário entendem a mensagem (proteção contra revelação) |
| **Integridade** | a mensagem chega **sem modificação** (protege contra alteração, remoção ou injeção) |
| **Disponibilidade** | a informação está acessível a quem precisa, quando precisa (protege contra interrupção/saturação) |
| **Privacidade** | o remetente pode permanecer **anônimo** (não revelar a identidade fraudulentamente) |

**Serviços básicos:** **identificação** de entidade (login/senha), **autenticação**, **criptografia**, **não-repúdio** (o emissor não pode negar o envio), **auditoria** (registro de quem fez o quê com qual objeto).

### Ameaça × risco × vulnerabilidade × ataque
| Termo | Definição |
|---|---|
| **Ameaça** | potencial de violação que pode causar dano (**passiva** — só observa; **ativa** — altera; **acidental** ou **intencional**) |
| **Vulnerabilidade** | ponto fraco/falha/ausência de proteção; **sozinha não causa dano** |
| **Ataque** | **realização de uma ameaça intencional** = exploração de uma vulnerabilidade |
| **Risco** | probabilidade de a ameaça se concretizar **×** impacto |

- **Ataque passivo:** observa (análise de tráfego, leitura não autorizada).
- **Ataque ativo:** altera o sistema: retransmitir mensagens antigas, modificar/excluir mensagens, **simular outro usuário**, criar fluxo falso.

## 2. Ataques na camada de enlace

### 2.1 MAC spoofing (falsificação de MAC)
O switch aprende "MAC → porta" pelo **endereço de origem**. O atacante envia quadros com **MAC de origem falso** (o da vítima) e **sobrescreve a entrada** na tabela, fazendo o tráfego da vítima ir para a **porta do atacante**.
- Consequências: **DoS** (vítima deixa de receber) e **man-in-the-middle** (o atacante captura, altera e reenvia).
- **Defesas:** port security (fixar MACs por porta), ACLs por MAC, tabelas estáticas.

### 2.2 MAC address table overflow (MAC flooding)
O atacante manda **milhares de quadros com MACs de origem falsos**, enchendo a tabela MAC (memória limitada). Sem espaço, o switch não localiza destinos e passa a **inundar todas as portas** — **comporta-se como um hub**.
- **Fail-open:** inunda tudo (modo promíscuo) → o atacante **intercepta e analisa** o tráfego.
- **Fail-closed:** para de encaminhar → **DoS**.
- **Defesas:** **port security** (limitar o nº máximo de MACs por porta), ACLs por MAC, tabelas MAC estáticas, switches gerenciáveis.

### 2.3 ARP spoofing
Envia **pacotes ARP com IP/MAC falsos** (em broadcast). Como o ARP **não tem autenticação** e hosts aceitam respostas **não solicitadas**, a vítima passa a mandar seus dados ao atacante. Gera **DoS** e **man-in-the-middle**.
- **Defesas:** tabelas ARP estáticas, ACLs por MAC; **DAI (Dynamic ARP Inspection)** e **IP Source Guard** no switch.
  - **DAI:** portas **confiáveis (trusted)** e **não confiáveis (untrusted)**; resposta ARP numa porta untrusted é **comparada à tabela DHCP**; se inconsistente → **descartada** e a porta pode ser desativada.
  - **IP Source Guard:** filtra **IP de origem** por porta, impedindo que um host assuma o IP de outro.

### 2.4 Broadcast storm
Quantidade excessiva de broadcast ocupa **toda a capacidade da LAN**; todas as máquinas passam a processar/descartar quadros inúteis; o switch estoura a CPU → rede **inutilizável**. Causas: **loops**, erros de configuração, **placas defeituosas**, DoS.
- **Defesas:** **VLANs** (broadcast não atravessa VLAN), **STP** (evita loops), **storm control** (limiar de broadcast em um intervalo; ao exceder, bloqueia — pode bloquear também broadcast legítimo).

### 2.5 Ataque ao spanning tree
O atacante envia **BPDUs** de configuração/mudança de topologia, forçando **recálculos** e tentando **se tornar a raiz**. Como o STP leva ~**50 s** para reconvergir, causa **DoS** a cada recálculo. Explora a **ausência de autenticação** das BPDUs.
- **Defesas:** monitorar tráfego e configuração dos switches (mudanças de topologia injustificadas). *(Extra: recursos como **BPDU Guard** e **Root Guard** nas portas de acesso.)*

### 2.6 VLAN hopping
O atacante tenta alcançar hosts de **outras VLANs sem passar por roteador**.
- **Por negociação de tronco:** o modo padrão do 802.1Q/trunk permite que o atacante **crie um link tronco** com o switch e acesse todas as VLANs.
- **Double tagging:** o atacante coloca **duas tags** no quadro: a primeira é da **VLAN nativa** (removida pelo primeiro switch, pois a nativa não é etiquetada); o quadro segue ao segundo switch com a **segunda tag (falsa)**, entregando-o a uma VLAN a que o atacante **não** tinha acesso.
- **Defesas:** desativar negociação automática de tronco (portas de acesso fixas), **não usar a VLAN 1/nativa para hosts**, usar uma VLAN nativa dedicada e sem uso, permitir só as VLANs necessárias no tronco.

## 3. Tabela-resumo

| Ataque | Alvo | Efeito | Defesa-chave |
|---|---|---|---|
| MAC spoofing | tabela MAC | DoS / MITM | port security |
| MAC overflow | memória da tabela | switch vira hub (sniffing) ou DoS | port security (limite de MACs) |
| ARP spoofing | tabela ARP dos hosts | MITM / DoS | DAI + IP Source Guard |
| Broadcast storm | banda e CPU | rede parada | storm control, VLAN, STP |
| Ataque ao STP | eleição da raiz | DoS ~50 s | monitorar / BPDU guard |
| VLAN hopping | isolamento de VLANs | acesso a outras VLANs | desativar trunk automático, nativa dedicada |

---

## Exercícios

Lista: [`listas/lista-16.md`](../listas/lista-16.md) — respostas: [`respostas/lista-16.md`](../respostas/lista-16.md)

---

## Resumo

- Segurança: **física, lógica, operacional** + política; propriedades **C-I-D-P**.
- Vulnerabilidade (falha) → ameaça (potencial) → **ataque** (exploração); passivo × ativo.
- Camada 2: **MAC spoofing**, **MAC flooding** (fail-open/closed), **ARP spoofing** (DAI), **broadcast storm** (storm control), **ataque ao STP**, **VLAN hopping** (double tagging).
- Defesa-base: **port security**, VLANs bem configuradas, STP, monitoramento.

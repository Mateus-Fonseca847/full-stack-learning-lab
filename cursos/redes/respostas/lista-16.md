# Respostas — Lista 16: Segurança em redes locais

Lista: [`listas/lista-16.md`](../listas/lista-16.md) · Aula: [`aulas/16-seguranca-em-redes-locais.md`](../aulas/16-seguranca-em-redes-locais.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1.

> Diferencie segurança **física, lógica e operacional** e dê um exemplo de cada.

**Física:** integridade de cabos/switches (trancar o armário de telecom). **Lógica:** proteção em software (senhas, firewall, ACL). **Operacional:** normas de uso para pessoas (política de uso, evitar erros de configuração acidentais ou deliberados).

## 2.

> Explique **confidencialidade, integridade, disponibilidade e privacidade**.

**Confidencialidade:** só remetente e destinatário entendem. **Integridade:** a mensagem chega sem modificação. **Disponibilidade:** a informação está acessível quando necessária. **Privacidade:** o remetente pode permanecer anônimo.

## 3.

> Diferencie **ameaça, vulnerabilidade, risco e ataque**.

**Ameaça:** potencial de violação. **Vulnerabilidade:** ponto fraco/falha (sozinha não causa dano). **Risco:** probabilidade da ameaça × impacto. **Ataque:** realização intencional de uma ameaça = exploração de uma vulnerabilidade.

## 4.

> Qual a diferença entre ataque **passivo** e **ativo**? Dê um exemplo de cada.

**Passivo:** só observa (análise de tráfego, sniffing). **Ativo:** altera o sistema (replay de mensagens, modificação em trânsito, simulação de outro usuário).

## 5.

> Explique o **MAC address table overflow**. Diferencie **fail-open** e **fail-closed** e cite uma defesa.

O atacante manda muitos quadros com **MACs falsos** e lota a tabela; o switch passa a **inundar** tudo. **Fail-open:** inunda (vira hub) → o atacante **captura** o tráfego. **Fail-closed:** para de encaminhar → **DoS**. Defesa: **port security** (limitar MACs por porta).

## 6.

> Como funciona o **MAC spoofing** e que efeitos pode ter?

O atacante envia quadros com **MAC de origem falso** (o da vítima) e **sobrescreve** a entrada da tabela MAC, desviando o tráfego para sua porta. Causa **DoS** e **man-in-the-middle**.

## 7.

> Por que o **ARP spoofing** é possível? Descreva duas defesas, incluindo como o **DAI** funciona.

O ARP **não tem autenticação** e aceita respostas **não solicitadas**. Defesas: **tabelas ARP estáticas** e **DAI** — respostas ARP em portas *untrusted* são comparadas à **tabela DHCP**; se inconsistentes, são **descartadas** (e a porta pode ser desativada). Também o **IP Source Guard**.

## 8.

> O que é uma **broadcast storm**? Cite causas e três defesas.

Excesso de broadcast que satura a rede e a CPU dos switches. Causas: **loops**, erro de configuração, placa defeituosa, DoS. Defesas: **VLANs**, **STP**, **storm control**.

## 9.

> Como um atacante pode se tornar a **raiz do STP** e que dano isso causa? Por que o ataque funciona?

Enviando **BPDUs** com BID menor, forçando recálculos. Cada reconvergência pode levar ~**50 s**, causando **DoS** e permitindo desviar o tráfego. Funciona porque as **BPDUs não são autenticadas**.

## 10.

> Explique o **VLAN hopping** por **double tagging** e como mitigá-lo.

O atacante coloca **duas tags**: a 1ª (VLAN nativa) é removida pelo primeiro switch; a 2ª, falsa, leva o quadro à **VLAN alvo**. Mitigação: **não usar a VLAN nativa para hosts**, usar nativa dedicada e sem uso, **desativar negociação automática de tronco** e permitir só as VLANs necessárias.

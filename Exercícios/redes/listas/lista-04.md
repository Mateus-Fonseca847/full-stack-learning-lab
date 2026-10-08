# Lista 04 — Camada física e traffic shaping

Aula: [`aulas/04-camada-fisica.md`](../aulas/04-camada-fisica.md) · Respostas: [`respostas/lista-04.md`](../respostas/lista-04.md)

[← Lista 03](lista-03.md) · [Índice](../README.md) · [Lista 05 →](lista-05.md)

> Tente resolver **no papel** antes de abrir o gabarito.

## Questões das listas da professora

1. *(P1·L1 q.1)* O que a camada física do modelo OSI fornece?

R = 
A camada física fornece a capacidade de transmissão de bits, pelo meio fisico da rede. Esses bits formam os frames da usados pela camada enlace. Esse transporte é feito por sinais eletricos que representam 0 ou 1.

2. *(P1·L1 q.2)* Explique o que são as características mecânicas, elétricas, funcionais e procedurais. Dê exemplos.

R = 
Imagine a tomada de uma parede
Características mecanicas:
- Tamanho e formas de conectores e cabos (o formato do plugue)
Caracteristicas elétricas:
- valores dos sinais eletricos que representam bits  (A tensão[127V ou 220V])
Caracteristicas funcionais:
- significado dos sinais na interface (pino: fase, neutro ou terra)
Caracteristicas procedurais:
- combinação e sequencia de sinais que devem ocorrer para a transmissão (encaixar o plugue e ligar o interruptor)

3. *(P1·L1 q.3)* Qual é o serviço que a camada física provê à camada de enlace?

R = 
A camada física estabelece e encerra conexõews, transfere dados por enlaces, garante sequenciação (mantem os bits no formato que foram enviados) e avisa o enlace em caso de falhas

4. *(P1·L1 q.4)* O que é necessário para a entrega de quadros pelo meio físico?

R = 
circuito transmissor -> codificação e informações de controle de quadros -> Representação de bits como sinal elétrico -> Meio físico -> circuito receptor

5. *(P1·L1 q.5)* Cite dois padrões de interface física.

6. *(P1·L1 q.6)* Que tipo de propriedade física pode ser variada para o envio da informação na camada física?

R =
Voltagem, Luz ou frequencia de onda

7. *(P1·L1 q.7)* Quais são os equipamentos que operam em camada física?

R = 
Repetidor e Concentrador

8. *(P1·L1 q.8)* O que é largura de banda?

R =
Largura de banda diz sobre a taxa de dados que a camada física consegue enviar, medido em bps
Também responde a faixa de frequencia que o meio transmite (em Hz)

9. *(P1·L1 q.9)* Para que são usados filtros reguladores de banda?

R = 
São usados para racionar a largura de banda distribuída enmtre todos os usuarios, oferecendo apenas o necessario para a utilização do dia a dia

## Exercícios extras de fixação

10. Um canal sem ruído tem banda de **4.000 Hz** e usa sinal com **4 níveis**. Qual a taxa máxima (Nyquist)? E com 2 níveis?

11. Diferencie **leaky bucket** e **token bucket** e diga qual deles permite rajadas. Depois rode `praticas/baldes.js` e descreva o que aconteceu com o 3º e o 4º pacotes em cada algoritmo.

12. Qual a diferença entre **traffic shaping** e **policing**? E entre **RED** e **WRED**?

---

**Legenda das fontes:** `P1·L1`…`P1·L5` = listas da P1 (partes 1 a 5) · `P2·L2` = lista da P2 (STP/VLAN/Metro Ethernet) · `P2·Wi-Fi`, `P2·Óptica` = listas de Wi-Fi e de redes óticas · `P2·Docx` = lista da P2 em Word (STP, TRILL, ATM, Frame Relay, PDH, SDH) · `extra` = exercício de fixação criado para o curso

# Lista 09 — Tratamento de erros: Hamming, paridade e CRC

Aula: [`aulas/09-tratamento-de-erros.md`](../aulas/09-tratamento-de-erros.md) · Respostas: [`respostas/lista-09.md`](../respostas/lista-09.md)

[← Lista 08](lista-08.md) · [Índice](../README.md) · [Lista 10 →](lista-10.md)

> Tente resolver **no papel** antes de abrir o gabarito.

## Questões das listas da professora

1. *(P1·L3 q.13)* Quais as possíveis estratégias do receptor ao detectar erros no fluxo de dados recebidos? Explique-as.

2. *(P1·L3 q.14)* Descreva as técnicas: (a) Stop-and-wait error control; (b) Sliding window error control.

3. *(P1·L3 q.15)* Qual a diferença técnica entre correção e detecção de erros?

4. *(P1·L3 q.16)* Quais os tipos de erros que podem ocorrer? Qual o mais comum?

5. *(P1·L3 q.17)* Como se determina o comprimento de uma rajada de erro?

6. *(P1·L3 q.18)* Como podem ser classificadas as técnicas de correção de erro? Qual delas propicia o melhor desempenho do sistema?

7. *(P1·L3 q.19)* Por que é inserida redundância no fluxo de dados a ser transmitido?

8. *(P1·L3 q.20)* Explique e exemplifique a distância de Hamming.

9. *(P1·L3 q.21)* Qual a distância de Hamming necessária para detectar 3 erros? Usando um código com esta mesma distância, quantos erros podem ser corrigidos?

10. *(P1·L3 q.22)* Qual a distância de Hamming necessária para corrigir 3 erros? Usando um código com esta mesma distância, quantos erros podem ser detectados?

11. *(P1·L3 q.23)* O que é bit de paridade?

12. *(P1·L3 q.24)* Qual a diferença entre paridade par e paridade ímpar?

13. *(P1·L3 q.25)* Como a técnica de paridade pode ser usada para blocos de dados?

14. *(P1·L3 q.26)* Como funciona o CRC (Cyclic Redundancy Check)?

15. *(P1·L3 q.27)* Em que situações se faz o uso intensivo de tratamento de erro?

## Exercícios extras de fixação

16. **CRC.** Calcule o CRC e o quadro enviado: (a) d = `1101011011`, G = `10011` (exemplo da aula); (b) d = `11010011101100`, G = `1011`; (c) d = `1001`, G = `11`. O que a letra (c) lembra?

17. **Receptor.** Dado G = `1001`, o quadro `101110011` chegou. Está certo? E se chegar `001110011`?

18. **Hamming.** Calcule a distância do código {`00000`, `01011`, `10101`, `11110`} e diga quantos erros ele detecta e corrige.

19. **Rajada.** Foi enviado `11010110` e recebido `10011110`. Quais bits mudaram e qual o comprimento da rajada?

20. **Paridade 2D (paridade par).** Bloco enviado: `11000 / 10100 / 01100 / 00000` (última coluna = paridade das linhas; última linha = paridade das colunas). Chegou `11000 / 10100 / 00100 / 00000`. Localize e corrija o erro.

---

**Legenda das fontes:** `P1·L1`…`P1·L5` = listas da P1 (partes 1 a 5) · `P2·L2` = lista da P2 (STP/VLAN/Metro Ethernet) · `P2·Wi-Fi`, `P2·Óptica` = listas de Wi-Fi e de redes óticas · `P2·Docx` = lista da P2 em Word (STP, TRILL, ATM, Frame Relay, PDH, SDH) · `extra` = exercício de fixação criado para o curso

# Respostas — Lista 08: Camada de enlace e enquadramento

Lista: [`listas/lista-08.md`](../listas/lista-08.md) · Aula: [`aulas/08-camada-de-enlace.md`](../aulas/08-camada-de-enlace.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P1·L3 q.3)*

> Detalhe as funções da camada de enlace.

Interface de serviço com a camada de rede; **enquadramento**; **tratamento de erros**; **controle de fluxo**; **controle de acesso ao meio** (em enlaces de difusão).

## 2. *(P1·L3 q.4)*

> O que é adjacência entre dois elementos de rede?

Dois elementos são **adjacentes** quando estão **diretamente conectados pelo meio físico**, sem nó intermediário no nível de enlace.

## 3. *(P1·L3 q.5)*

> A forma de fazer adjacência pode variar?

**Sim**, depende do meio físico: ponto a ponto, barramento compartilhado, meio sem fio...

## 4. *(P1·L3 q.6)*

> Por que é feito o tratamento de erros na camada 2?

Porque o meio produz erros e a camada física entrega só um fluxo bruto de bits. Tratar no enlace permite **detectar (e às vezes corrigir) no próprio enlace onde o erro ocorreu**, sem esperar o fim a fim.

## 5. *(P1·L3 q.7)*

> Por que é feito o controle de fluxo na camada 2?

Para **impedir que um transmissor rápido sobrecarregue um receptor lento**, causando estouro de buffer e perda de quadros.

## 6. *(P1·L3 q.8)*

> Qual o serviço prestado pela camada de enlace? Quais as modalidades deste serviço? Detalhe-as e dê exemplos de tecnologias que oferecem cada modalidade.

Transmitir dados da camada de rede da origem à do destino. Modalidades: **sem conexão/sem confirmação** (sem ACK, meios confiáveis, tempo real — **Ethernet**); **sem conexão/com confirmação** (cada quadro com ACK, meios ruidosos — **Wi-Fi**); **com conexão/com confirmação** (estabelece–transmite–fecha, quadros numerados e em ordem — **HDLC/PPP confiável, LLC tipo 2**).

## 7. *(P1·L3 q.9)*

> Qual a relação entre quadros e pacotes?

O **pacote** da camada de rede vai no **payload** do **quadro**, que acrescenta **cabeçalho e trailer**. Um pacote grande pode precisar de vários quadros.

## 8. *(P1·L3 q.10)*

> O que é o enquadramento? Por que é necessário?

É **delimitar onde cada quadro começa e termina** no fluxo bruto de bits. Necessário porque a camada física não tem noção de quadros e os bits podem chegar alterados.

## 9. *(P1·L3 q.11)*

> Descreva as duas técnicas de enquadramento.

(1) **Contagem de caracteres:** um campo indica o tamanho; frágil porque um erro na contagem faz perder a sincronia. (2) **Flags:** delimitadores de início/fim que permitem **ressincronizar**; usa **stuffing** para que a flag não apareça nos dados (de bytes ou de bits).

## 10. *(P1·L3 q.12)*

> Qual a diferença entre inserção de byte e inserção de bits no uso de flags?

**Byte stuffing:** flag de 8 bits; insere um byte **ESC** antes de FLAG/ESC nos dados; exige caracteres de 8 bits. **Bit stuffing:** flag **01111110**; insere um **0 após cinco 1s** seguidos; independe do tamanho do caractere.

## 11.

> Aplique **inserção de bits** (flag 01111110) ao dado `0111110111111011111` e escreva o quadro completo. Depois mostre como o receptor recupera o dado.

Dado: `0 11111 0 111111 0 11111`. Inserindo um 0 após cada sequência de cinco 1s: **`0111110011111010111110`**. Quadro = `01111110` + dado enchido + `01111110`. O receptor, ao ver cinco 1s seguidos, **remove o 0** seguinte e recupera o original. (Confira com `praticas/bit_stuffing.js`.)

## 12.

> Aplique **inserção de bytes** (FLAG e ESC) aos dados `A FLAG B ESC C` e ao dado `ESC FLAG`.

`A FLAG B ESC C` → **`A ESC FLAG B ESC ESC C`**. `ESC FLAG` → **`ESC ESC ESC FLAG`**. O receptor remove o ESC que precede FLAG/ESC.

## 13.

> Num serviço sem confirmação, cada quadro tem **20% de chance de ser perdido** e um pacote ocupa **10 quadros**. Qual a probabilidade de o pacote chegar inteiro? O que muda com confirmação por quadro?

0,8¹⁰ ≈ **0,107 (10,7%)**. Sem ACK o pacote inteiro quase sempre precisaria ser reenviado. Com ACK por quadro retransmite-se **só o quadro perdido**, bem mais barato.

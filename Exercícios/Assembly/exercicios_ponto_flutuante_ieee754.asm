; ============================================================
; EXERCICIOS - PONTO FLUTUANTE (IEEE 754)
; Notas de Aula - Software Basico (CEFET/RJ)
; + Exercicios extras por Claude AI
; ============================================================


; ------------------------------------------------------------
; QUESTAO 1 - LIVRO (Conceitual)
; Quais as vantagens da representacao de ponto flutuante
; (e.g. IEEE 754) sobre a representacao de ponto fixo?
; ------------------------------------------------------------

; Resolucao:




; ------------------------------------------------------------
; QUESTAO 2 - LIVRO
; Encontre uma aproximacao para os seguintes valores usando:
;   1 bit para o sinal
;   4 bits para o expoente (polarizado em 7)
;   8 bits para a mantissa (normalizada)
; ------------------------------------------------------------

; a) 13,293
; Resolucao:



; b) 1000,3
; Resolucao:



; c) 0,20201
; Resolucao:



; d) 18,026
; Resolucao:



; e) 555,555
; Resolucao:



; f) 1102,011
; Resolucao:



; g) 0,03132
; Resolucao:



; h) 0,33333...
; Resolucao:




; ------------------------------------------------------------
; QUESTAO 4 - LIVRO
; Usando a mesma representacao do exercicio anterior
; (1 sinal + 4 expoente/bias 7 + 8 mantissa),
; encontre o valor na base 10:
; ------------------------------------------------------------

; a) 1000100111010
; Resolucao:



; b) 0111001101101
; Resolucao:



; c) 0110111111101
; Resolucao:



; d) 0011110001111
; Resolucao:



; e) 0001010101000
; Resolucao:



; f) 1111110110000
; Resolucao:



; g) 1001010110001
; Resolucao:



; h) 1011100101000
; Resolucao:




; ------------------------------------------------------------
; QUESTAO 5 - LIVRO
; Quantos valores e possivel representar no intervalo [0,1]
; usando a representacao de ponto flutuante do exercicio
; anterior?
; ------------------------------------------------------------

; Resolucao:




; ------------------------------------------------------------
; QUESTAO 6 - LIVRO
; Como seria a implementacao da multiplicacao usando a
; representacao IEEE 754 32 bits? Esboce um algoritmo para
; a multiplicacao.
; ------------------------------------------------------------

; Resolucao (pseudocodigo/algoritmo):




; ------------------------------------------------------------
; QUESTAO 7 - LIVRO
; Crie um grafico com o eixo X o expoente e o eixo Y as
; distancias minimas entre valores com mesmo expoente,
; usando a representacao IEEE 754 32 bits. Use escala
; logaritmica. Existe um motivo para a precisao variar
; tanto entre valores pequenos e grandes?
; ------------------------------------------------------------

; Resolucao / observacoes:




; ------------------------------------------------------------
; EXERCICIOS EXTRAS 
; ------------------------------------------------------------

; a) Converta 10,5 para IEEE 754 precisao simples (32 bits:
;    1 sinal + 8 expoente/bias 127 + 23 mantissa) completo.
; Resolucao:



; b) Decodifique o numero IEEE 754 (32 bits) abaixo para decimal:
;    0 10000010 01100000000000000000000
; Resolucao:



; c) Converta -0,75 para o formato customizado da Questao 2
;    (1 sinal + 4 expoente/bias 7 + 8 mantissa).
; Resolucao:



; d) Explique o que representa, no IEEE 754, um numero com
;    o expoente armazenado todo em 1 e a mantissa toda em 0.
; Resolucao:



; e) Calcule o menor numero positivo NORMALIZADO representavel
;    no formato customizado da Questao 2 (1+4+8 bits).
; Resolucao:


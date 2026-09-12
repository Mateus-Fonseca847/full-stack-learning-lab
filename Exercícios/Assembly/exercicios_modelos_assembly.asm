; ============================================================
; EXERCICIOS - MODELOS CLASSICOS DE ORGANIZACAO DE ASSEMBLY
; (Stack Machine, Acumulador, Register-Memory, Load/Store)
; Notas de Aula - Software Basico (CEFET/RJ)
; + Exercicios extras por Claude AI
; ============================================================


; ------------------------------------------------------------
; QUESTAO 1 - LIVRO (Conceitual)
; Quais as vantagens e desvantagens do modelo de Acumulador
; em relacao ao modelo Load/Store?
; ------------------------------------------------------------

; Resolucao:




; ------------------------------------------------------------
; QUESTAO 2 - LIVRO
; Reescreva o calculo  z = (a - b) * (c + d)  em Assembly
; para cada um dos quatro modelos apresentados.
; ------------------------------------------------------------

; --- Modelo 1: Stack Machine ---
; (nao existem registradores visiveis; tudo opera no topo da pilha)
;
; Resolucao:




; --- Modelo 2: Acumulador ---
; (um unico registrador ACC guarda o resultado parcial)
;
; Resolucao:




; --- Modelo 3: Register-Memory ---
; (instrucoes podem misturar registrador + memoria)
;
; Resolucao:




; --- Modelo 4: Load/Store (RISC) ---
; (operacoes aritmeticas so entre registradores;
;  memoria so eh acessada via LOAD/STORE explicitos)
;
; Resolucao:




; ------------------------------------------------------------
; QUESTAO 3 - LIVRO (Conceitual)
; Explique por que arquiteturas modernas como ARM e RISC-V
; adotaram o modelo Load/Store.
; ------------------------------------------------------------

; Resolucao:




; ------------------------------------------------------------
; EXERCICIOS EXTRAS 
; ------------------------------------------------------------

; a) Reescreva  y = a*b + c  no modelo Load/Store.
; Resolucao:



; b) Reescreva  w = (a + b) - (c * d)  no modelo Acumulador.
; Resolucao:



; c) Explique por que o modelo Stack Machine costuma gerar
;    MAIS instrucoes que o Register-Memory para a mesma
;    expressao aritmetica.
; Resolucao:



; d) Reescreva  x = (a + b) / (c - d)  no modelo Register-Memory.
; Resolucao:



; e) (Conceitual) Quais vantagens o modelo Load/Store oferece
;    para pipeline e paralelismo de instrucoes, em comparacao
;    com o modelo Register-Memory?
; Resolucao:


# Curso de Cálculo a Várias Variáveis do Zero

Esta pasta reúne um curso prático de **Cálculo a Várias Variáveis** (GCOM3017PE, Prof. Rafael Saraiva Campos), construído a partir do **Guia de Estudos** e dos slides publicados pelo professor. Vai de funções e limites até integrais triplas e mudança de variáveis. O material foi criado com a ajuda de inteligência artificial (IA), que gerou as aulas, as listas de exercícios e os gabaritos, e serve como registro do meu processo de estudo.

## O que o curso cobre

São **13 aulas**, cada uma com teoria, exemplos, uma lista de exercícios e um resumo final. Os gabaritos (com passo a passo) estão em `respostas/`.

| # | Aula | Exercícios | Prova (Guia) | Base do conteúdo |
|---|------|-----------|--------------|------------------|
| 1 | [Funções a várias variáveis: domínio, curvas e superfícies de nível](aulas/01-funcoes-a-varias-variaveis.md) | 8 · [respostas](respostas/aula-01.md) | P1 | índice do Guia |
| 2 | [Limites e continuidade](aulas/02-limites-e-continuidade.md) | 9 · [respostas](respostas/aula-02.md) | P1 | índice do Guia |
| 3 | [Revisão de GA: retas, planos e quádricas](aulas/03-retas-planos-quadricas.md) | 6 · [respostas](respostas/aula-03.md) | P1 | índice do Guia |
| 4 | [Derivadas parciais, plano tangente e diferenciabilidade](aulas/04-derivadas-parciais.md) | 8 · [respostas](respostas/aula-04.md) | P1 | índice do Guia |
| 5 | [Regra da cadeia](aulas/05-regra-da-cadeia.md) | 6 · [respostas](respostas/aula-05.md) | P1 | índice do Guia |
| 6 | [Derivada direcional e gradiente](aulas/06-derivada-direcional-e-gradiente.md) | 7 · [respostas](respostas/aula-06.md) | P1 | índice do Guia |
| 7 | [Máximos e mínimos de funções a 2 variáveis](aulas/07-maximos-e-minimos.md) | 6 · [respostas](respostas/aula-07.md) | P1 | índice do Guia |
| 8 | [Multiplicadores de Lagrange](aulas/08-multiplicadores-de-lagrange.md) | 6 · [respostas](respostas/aula-08.md) | P1 | índice do Guia |
| 9 | [Integrais duplas em coordenadas retangulares](aulas/09-integrais-duplas-retangulares.md) | 7 · [respostas](respostas/aula-09.md) | P2 | **slides lidos** |
| 10 | [Integrais duplas em coordenadas polares](aulas/10-integrais-duplas-polares.md) | 9 · [respostas](respostas/aula-10.md) | P2 | **slides lidos** |
| 11 | [Integrais triplas em coordenadas retangulares](aulas/11-integrais-triplas-retangulares.md) | 8 · [respostas](respostas/aula-11.md) | P2 | **slides lidos** |
| 12 | [Integrais triplas em coordenadas cilíndricas e esféricas](aulas/12-integrais-triplas-cilindricas-esfericas.md) | 8 · [respostas](respostas/aula-12.md) | P2 | índice do Guia |
| 13 | [Mudança de variáveis em integrais múltiplas](aulas/13-mudanca-de-variaveis.md) | 6 · [respostas](respostas/aula-13.md) | não está no Guia | ementa usual |

> **Atenção à coluna "Base do conteúdo".** Li por inteiro os slides das aulas 9, 10 e 11 (incluindo os exercícios deles, reaproveitados nas listas). As demais aulas foram escritas a partir do **índice do Guia de Estudos** (que lista os tópicos 1.1 a 12.3) e de conhecimento geral de Cálculo III. Elas trazem um aviso no topo. Confira com o seu caderno e com os slides antes de decorar notações.

## Estrutura

- `aulas/`: o conteúdo de cada aula em Markdown
- `respostas/`: gabaritos com passo a passo de cada lista (todos os resultados foram conferidos com sympy)
- `praticas/`: `verificar.py`, funções em Python para conferir gradiente, pontos críticos, Lagrange, integrais e Jacobiano
- `plano-p2.md`: roteiro de estudos dia a dia até a P2

## Como usar

1. Leia a aula, na ordem. Cada aula termina com um **Resumo**.
2. Resolva os exercícios **no papel**, antes de abrir `respostas/`.
3. Confira o resultado com o script (precisa só de Python 3 e `pip install sympy`):

```bash
cd praticas
python verificar.py          # demonstração das funções
```

```python
from verificar import *
gradiente("x**2*y + x*z", (1, 2, 1))                       # aula 06
classificar_criticos("x**3 + y**3 - 3*x*y")                # aula 07
integral_dupla("(4 - r**2)*r", (r, 0, 2), (th, 0, 2*pi))   # aula 10
jacobiano([rho*sin(ph)*cos(th), rho*sin(ph)*sin(th), rho*cos(ph)], [rho, ph, th])  # aula 13
```

O professor também disponibiliza scripts em **Maple** no site da disciplina; o `verificar.py` faz o papel equivalente em Python.

## Pontos de atenção sobre a prova

| Fonte | O que diz | O que fazer |
|---|---|---|
| Guia de Estudos | **P1** = tópicos 1 a 8; **P2** = tópicos 9 a 12 | O plano em `plano-p2.md` prioriza 9 a 13 e depois revisa 1 a 8, caso a P2 seja cumulativa |
| Site do professor | existe um slide **13 – Mudança de variáveis** que não aparece na tabela do Guia | Confirme com o professor se cai na P2 |
| Aula 12 | φ é o ângulo medido a partir do eixo z | Em livros de física φ e θ costumam estar trocados; vale o que o professor usa |

## Referências (do Guia de Estudos)

| | P1 (tópicos 1 a 8) | P2 (tópicos 9 a 12) |
|---|---|---|
| [1] Thomas, vol. 2, 12ª ed. | cap. 12 e 14 | cap. 11, 15 e 16 |
| [2] Munem, vol. 2, 1ª ed. | cap. 15 e 16 | cap. 15 e 17 |
| [3] Anton, vol. 2, 10ª ed. | cap. 11 e 13 | cap. 10, 11 e 14 |

## Checklist do que você aprendeu

- [ ] Determino domínios e descrevo curvas e superfícies de nível
- [ ] Mostro que um limite não existe (dois caminhos) e calculo limites com polares
- [ ] Verifico continuidade de funções definidas por partes
- [ ] Escrevo retas, planos e identifico quádricas
- [ ] Calculo derivadas parciais, plano tangente e diferencial total
- [ ] Aplico a regra da cadeia (diagrama em árvore) e derivação implícita
- [ ] Calculo derivada direcional e uso o gradiente (máximo crescimento, normal)
- [ ] Classifico pontos críticos e acho extremos absolutos em regiões fechadas
- [ ] Resolvo problemas com multiplicadores de Lagrange (1 e 2 restrições)
- [ ] Monto integrais duplas (tipo I e II) e inverto a ordem de integração
- [ ] Uso polares (dA = r dr dθ) em integrais duplas
- [ ] Monto integrais triplas em coordenadas retangulares a partir da "sombra" do sólido
- [ ] Uso cilíndricas e esféricas (dV = ρ² sen φ dρ dφ dθ) em integrais triplas
- [ ] Faço mudança de variáveis com o Jacobiano

Marque no VS Code trocando `[ ]` por `[x]`.

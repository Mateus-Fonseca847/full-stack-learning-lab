# Guia de estilo das figuras (Redes de Computadores I)

Vale para todos os SVGs em `cursos/redes/aulas/img/`. O objetivo é que as figuras de todas as aulas pareçam parte de um mesmo conjunto.

## Arquivos e referência no Markdown

- Local: `cursos/redes/aulas/img/`.
- Nome: `aula-NN-descricao-curta.svg` (minúsculas, hífens, sem acento). `NN` é o número do arquivo da aula (`07-...md` → `aula-07-...`).
- Referência com caminho relativo, texto alternativo descritivo e legenda curta em itálico logo abaixo:

```markdown
![texto alternativo descritivo](img/aula-NN-descricao-curta.svg)
*Figura NN.X: descrição curta.*
```

`X` é a ordem da figura dentro da aula. A figura entra **logo depois** do trecho que ela ilustra (e depois dos diagramas ASCII, que são mantidos).

- Diagramas de sequência (troca de mensagens entre hosts) podem ser blocos ` ```mermaid ` quando ficarem claramente mais limpos. Nesse caso não há arquivo em `img/`.

## O SVG

- Autocontido: sem JavaScript, sem fontes ou imagens externas, sem emoji.
- Inclua `<title>` e `<desc>` para acessibilidade.
- `viewBox` com largura **680** e altura ajustada ao conteúdo (maior y usado + 20).
- Fundo próprio e sólido, para ficar legível nos temas claro e escuro do GitHub: retângulo `#F8F8F6`, borda `#D3D1C7`, cantos de 8 px.
- Texto principal `#2C2C2A`.

## Tipografia

- `font-family="system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif"`.
- Só dois tamanhos: **14 px** para rótulos principais (peso 500) e **12 px** para secundários. Nunca abaixo de 12 px.
- Português, só a primeira letra maiúscula (sentence case), sem rotação.
- Subtítulos com no máximo 5 palavras. Detalhes ficam no texto da aula, não na figura.
- Largura da caixa >= largura do maior texto + 24 px (estimativa: 8 px por caractere a 14 px e 7 px a 12 px).

## Traços e setas

- 1 px nas conexões; 0,5 a 1 px nas bordas.
- Setas com marcador de ponta aberta.
- Linhas de conexão não atravessam caixas nem rótulos: use caminhos em L para contornar.
- Fluxos e sequências em uma direção só (cima para baixo ou esquerda para direita).

## Cores (fundo / borda / texto)

Significado fixo no curso inteiro.

| Cor | Fundo | Borda | Texto | Usar para |
|---|---|---|---|---|
| Roxo | `#EEEDFE` | `#534AB7` | `#3C3489` | estações, hosts, usuários |
| Coral | `#FAECE7` | `#993C1D` | `#712B13` | equipamentos de rede: switch, roteador, hub, AP |
| Verde-água | `#E1F5EE` | `#0F6E56` | `#085041` | dados, quadros, pacotes, protocolos |
| Âmbar | `#FAEEDA` | `#854F0B` | `#633806` | destaque, ponto de atenção, estado ativo |
| Cinza | `#F1EFE8` | `#5F5E5A` | `#2C2C2A` | neutro, estrutura |
| Vermelho | `#FCEBEB` | `#A32D2D` | `#791F1F` | **somente** erro, falha, ataque |

Regras:

- No máximo **3 cores por figura**.
- Se a cor carrega significado, inclua uma legenda de uma linha dentro da figura.
- Cor nunca é o único diferenciador: combine com forma, tracejado ou rótulo.

## Conteúdo

- A figura representa o que a aula afirma; não acrescenta fatos técnicos.
- Se a aula parecer errada ou ambígua, a figura segue a aula e a inconsistência é listada no relatório do lote (nunca corrigida em silêncio).
- Em figuras com números (endereçamento, enlaces, CRC, bandas), os valores são recalculados por script antes de desenhar.

## Validação antes de cada commit

1. XML válido em cada SVG (`xmllint --noout`, ou parser XML equivalente se `xmllint` não existir).
2. Renderizar cada SVG para PNG e conferir visualmente: texto dentro das caixas, sem sobreposições, sem seta atravessando caixa, fonte legível.
3. Cada `![](img/...)` aponta para um arquivo existente.

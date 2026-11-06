# Aula 06 — JOIN: juntando tabelas

Na aula 05, o resultado mostrava `categoria_id = 2`, `cliente_id = 1`... Números não dizem muito. O nome da categoria está em outra tabela. **JOIN** junta tabelas usando as chaves que as relacionam.

## 1. INNER JOIN

```sql
SELECT produtos.nome, categorias.nome
FROM produtos
INNER JOIN categorias ON produtos.categoria_id = categorias.id;
```

Como ler: "para cada produto, encontre a categoria cujo `id` é igual ao `categoria_id` do produto, e junte as duas linhas em uma".

- `ON` diz **qual coluna liga** as tabelas (quase sempre: chave estrangeira = chave primária).
- `INNER JOIN` traz **só as linhas que têm par** nas duas tabelas. `JOIN` sozinho é o mesmo que `INNER JOIN`.

### Apelidos de tabela

Escrever o nome inteiro cansa. Use apelidos curtos:

```sql
SELECT p.nome  AS produto,
       c.nome  AS categoria,
       p.preco
FROM produtos p
JOIN categorias c ON p.categoria_id = c.id
ORDER BY c.nome, p.preco;
```

Quando duas tabelas têm colunas com o mesmo nome (`nome`, `id`), você **precisa** dizer de qual tabela é: `p.nome`, `c.nome`.

## 2. LEFT JOIN

Pergunta: "liste todas as categorias com seus produtos". A categoria **Brinquedos** não tem produtos, então o `INNER JOIN` a esconde. O `LEFT JOIN` mantém **todas as linhas da tabela da esquerda** (a do `FROM`), mesmo sem par; as colunas da direita ficam `NULL`.

```sql
SELECT c.nome AS categoria, p.nome AS produto
FROM categorias c
LEFT JOIN produtos p ON p.categoria_id = c.id;
```

Brinquedos aparece com `produto = NULL`.

### O truque "quem não tem"

`LEFT JOIN` + `WHERE ... IS NULL` encontra registros **sem correspondência**:

```sql
-- Clientes que nunca fizeram pedido
SELECT cl.nome
FROM clientes cl
LEFT JOIN pedidos pe ON pe.cliente_id = cl.id
WHERE pe.id IS NULL;
```

Resultado: Henrique. Esse padrão é muito usado no trabalho.

## 3. Visualizando os tipos de JOIN

Pense em A (tabela do `FROM`) e B (tabela do `JOIN`):

| Tipo | O que retorna |
|------|---------------|
| `INNER JOIN` | só as linhas de A e B que têm par (a interseção) |
| `LEFT JOIN` | todas de A + o par em B (ou NULL) |
| `RIGHT JOIN` | todas de B + o par em A (ou NULL) |
| `FULL OUTER JOIN` | todas de A e todas de B, com NULL onde não houver par |

- `RIGHT JOIN`: espelho do LEFT (mantém tudo da direita). Quase ninguém usa: é só inverter a ordem das tabelas e usar LEFT. (SQLite suporta a partir da versão 3.39.)
- `FULL OUTER JOIN`: mantém tudo dos dois lados. Não existe no MySQL.
- `CROSS JOIN`: combina **toda** linha de A com **toda** linha de B (produto cartesiano). Raramente útil, mas é o que acontece se você esquecer o `ON`!

## 4. Juntando 3 ou mais tabelas

É só encadear. Cada `JOIN` traz uma tabela nova e diz como ela se liga às anteriores:

```sql
-- Cada item vendido: cliente, data, produto, quantidade
SELECT cl.nome        AS cliente,
       pe.data_pedido,
       pr.nome        AS produto,
       ip.quantidade,
       ip.quantidade * ip.preco_unitario AS subtotal
FROM pedidos pe
JOIN clientes cl     ON cl.id = pe.cliente_id
JOIN itens_pedido ip ON ip.pedido_id = pe.id
JOIN produtos pr     ON pr.id = ip.produto_id
ORDER BY pe.data_pedido;
```

Dica: siga as setas do diagrama do README. `clientes → pedidos → itens_pedido → produtos`.

## 5. JOIN + GROUP BY (a combinação mais comum do mundo)

```sql
-- Total gasto por cliente (sem contar cancelados)
SELECT cl.nome,
       COUNT(DISTINCT pe.id) AS pedidos,
       SUM(ip.quantidade * ip.preco_unitario) AS total_gasto
FROM clientes cl
JOIN pedidos pe      ON pe.cliente_id = cl.id
JOIN itens_pedido ip ON ip.pedido_id = pe.id
WHERE pe.status <> 'cancelado'
GROUP BY cl.id, cl.nome
ORDER BY total_gasto DESC;
```

Por que `COUNT(DISTINCT pe.id)`? Depois do join, um pedido com 2 itens vira 2 linhas. Sem o `DISTINCT` o pedido seria contado duas vezes. **Sempre pense em quantas linhas o JOIN gera.**

## 6. Self join (tabela com ela mesma)

Às vezes uma tabela se relaciona consigo mesma. Exemplo: pares de clientes da mesma cidade.

```sql
SELECT a.nome AS cliente_1, b.nome AS cliente_2, a.cidade
FROM clientes a
JOIN clientes b ON a.cidade = b.cidade AND a.id < b.id;
```

O `a.id < b.id` evita parear alguém consigo mesmo e evita pares repetidos (Ana-Gabriela e Gabriela-Ana). Uso clássico: tabela `funcionarios` com coluna `gerente_id`.

---

## Exercícios

1. Liste cada produto com o nome da sua categoria.
2. Liste cada pedido (id, data, status) com o nome do cliente.
3. Liste todas as categorias e quantos produtos cada uma tem — inclusive as que têm zero.
4. Liste os produtos que nunca foram vendidos.
5. Liste os itens do pedido 5: nome do produto, quantidade, preço unitário e subtotal.
6. Mostre o valor total de cada pedido junto com o nome do cliente e o status.
7. Mostre o faturamento por categoria (nome da categoria), considerando só pedidos com status `'entregue'`.
8. Mostre os 3 produtos mais vendidos em quantidade (nome e total vendido).
9. Liste os clientes que compraram algum produto da categoria Livros (sem repetir nomes).
10. Mostre, por estado do cliente, o número de pedidos e o valor total vendido.
11. Desafio: liste os clientes (nome) que gastaram mais de 500 no total, somando todos os pedidos que não foram cancelados.

Respostas: [`respostas/aula-06.sql`](../respostas/aula-06.sql)

---

## Resumo

```sql
SELECT a.col, b.col
FROM tabela_a a
[INNER | LEFT] JOIN tabela_b b ON b.chave_estrangeira = a.id
JOIN tabela_c c ON ...
```

- `INNER JOIN`: só linhas com par dos dois lados.
- `LEFT JOIN`: tudo da esquerda; sem par vira `NULL`.
- `LEFT JOIN ... WHERE direita.id IS NULL` = "quem não tem".
- Use apelidos (`p`, `c`) e sempre qualifique colunas ambíguas.
- JOIN multiplica linhas: atenção ao somar/contar (use `COUNT(DISTINCT ...)` quando precisar).

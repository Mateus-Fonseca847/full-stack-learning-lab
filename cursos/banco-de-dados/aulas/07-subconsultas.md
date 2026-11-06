# Aula 07 — Subconsultas e CTEs (WITH)

Uma **subconsulta** é um `SELECT` dentro de outro `SELECT`, sempre entre parênteses. Serve para usar o resultado de uma pergunta dentro de outra.

## 1. Subconsulta que retorna um valor (escalar)

"Quais produtos custam mais que a média?"

Em duas etapas, você faria:

```sql
SELECT AVG(preco) FROM produtos;   -- 198.77...
SELECT nome, preco FROM produtos WHERE preco > 198.77;
```

Com subconsulta, numa etapa só (e sempre atualizada):

```sql
SELECT nome, preco
FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos);
```

O banco executa primeiro o que está entre parênteses e usa o resultado.

Também dá para usar no `SELECT`:

```sql
SELECT nome,
       preco,
       ROUND(preco - (SELECT AVG(preco) FROM produtos), 2) AS diferenca_da_media
FROM produtos;
```

## 2. Subconsulta que retorna uma lista (IN)

```sql
-- Clientes que têm algum pedido pendente
SELECT nome
FROM clientes
WHERE id IN (SELECT cliente_id FROM pedidos WHERE status = 'pendente');

-- Produtos que nunca foram vendidos
SELECT nome
FROM produtos
WHERE id NOT IN (SELECT produto_id FROM itens_pedido);
```

> Cuidado com `NOT IN` se a subconsulta puder retornar `NULL`: o resultado vira vazio. Nesse caso prefira `NOT EXISTS` ou `LEFT JOIN ... IS NULL`.

## 3. EXISTS

`EXISTS` pergunta apenas "existe pelo menos uma linha?". É uma **subconsulta correlacionada**: ela usa uma coluna da consulta de fora e roda para cada linha.

```sql
-- Clientes que fizeram pelo menos um pedido
SELECT c.nome
FROM clientes c
WHERE EXISTS (
    SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id
);
```

`SELECT 1` porque o conteúdo não importa, só a existência.

## 4. Subconsulta no FROM (tabela derivada)

O resultado de uma consulta pode virar uma "tabela temporária":

```sql
-- Média de valor dos pedidos
SELECT ROUND(AVG(total), 2) AS ticket_medio
FROM (
    SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
    FROM itens_pedido
    GROUP BY pedido_id
) AS totais;
```

Útil para "agregar de uma agregação": primeiro soma por pedido, depois tira a média dos pedidos.

## 5. CTE com WITH: subconsultas legíveis

Uma **CTE** (*Common Table Expression*) dá nome a uma subconsulta, no começo do comando. Faz exatamente o mesmo que o item 4, só que muito mais legível:

```sql
WITH totais AS (
    SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
    FROM itens_pedido
    GROUP BY pedido_id
)
SELECT ROUND(AVG(total), 2) AS ticket_medio
FROM totais;
```

Várias CTEs, separadas por vírgula, uma usando a outra:

```sql
WITH totais AS (
    SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
    FROM itens_pedido
    GROUP BY pedido_id
),
media AS (
    SELECT AVG(total) AS valor FROM totais
)
SELECT t.pedido_id, t.total
FROM totais t, media m
WHERE t.total > m.valor
ORDER BY t.total DESC;
```

Pense nas CTEs como **passos nomeados** de um raciocínio. Em consultas grandes, elas são a melhor ferramenta para manter o código organizado.

## 6. Quando usar o quê?

| Situação | Ferramenta |
|----------|-----------|
| Comparar com um valor calculado (média, máximo) | subconsulta escalar |
| Filtrar por uma lista vinda de outra tabela | `IN` / `EXISTS` |
| "Quem não tem" | `NOT EXISTS` ou `LEFT JOIN ... IS NULL` |
| Precisa das colunas das duas tabelas no resultado | `JOIN` |
| Consulta em várias etapas | `WITH` (CTE) |

Muitas vezes JOIN e subconsulta resolvem o mesmo problema. Escolha o que ficar mais claro.

---

## Exercícios

1. Liste o(s) produto(s) com o maior preço usando subconsulta (sem `ORDER BY/LIMIT`).
2. Liste os produtos com estoque abaixo da média de estoque.
3. Liste os clientes que têm pelo menos um pedido `'entregue'` (use `IN`).
4. Liste os clientes que nunca fizeram pedido usando `NOT EXISTS`.
5. Liste as categorias que têm algum produto com preço acima de 300.
6. Mostre nome, preço e o preço do produto mais caro da mesma categoria (subconsulta correlacionada).
7. Usando uma CTE, calcule o total de cada pedido e mostre apenas os pedidos acima de 250.
8. Usando CTE, mostre qual cliente (nome) tem o maior valor total comprado (desconsidere cancelados).
9. Desafio: mostre os produtos cuja quantidade total vendida é maior que a média de quantidade vendida por produto (considerando só os produtos que venderam).

Respostas: [`respostas/aula-07.sql`](../respostas/aula-07.sql)

---

## Resumo

```sql
-- escalar
WHERE preco > (SELECT AVG(preco) FROM produtos)
-- lista
WHERE id IN (SELECT cliente_id FROM pedidos)
-- existência (correlacionada)
WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id)
-- CTE
WITH etapa1 AS (SELECT ...), etapa2 AS (SELECT ... FROM etapa1)
SELECT ... FROM etapa2;
```

- Subconsulta = `SELECT` entre parênteses dentro de outro.
- Pode aparecer no `WHERE`, no `SELECT` e no `FROM`.
- `WITH` (CTE) nomeia etapas e deixa consultas complexas legíveis.
- Cuidado com `NOT IN` + `NULL`.

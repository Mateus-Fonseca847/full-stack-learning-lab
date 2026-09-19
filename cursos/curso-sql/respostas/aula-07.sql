-- ==================== RESPOSTAS — AULA 07 ====================

-- 1. Vantagem sobre ORDER BY/LIMIT: se houver empate no maior preço, traz todos.
SELECT nome, preco
FROM produtos
WHERE preco = (SELECT MAX(preco) FROM produtos);

-- 2.
SELECT nome, estoque
FROM produtos
WHERE estoque < (SELECT AVG(estoque) FROM produtos);

-- 3.
SELECT nome
FROM clientes
WHERE id IN (SELECT cliente_id FROM pedidos WHERE status = 'entregue');

-- 4.
SELECT c.nome
FROM clientes c
WHERE NOT EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id);

-- 5.
SELECT nome
FROM categorias
WHERE id IN (SELECT categoria_id FROM produtos WHERE preco > 300);

-- 6. A subconsulta usa p.categoria_id da consulta de fora (correlacionada).
SELECT p.nome,
       p.preco,
       (SELECT MAX(p2.preco)
          FROM produtos p2
         WHERE p2.categoria_id = p.categoria_id) AS mais_caro_da_categoria
FROM produtos p;

-- 7.
WITH totais AS (
    SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
    FROM itens_pedido
    GROUP BY pedido_id
)
SELECT pedido_id, total
FROM totais
WHERE total > 250
ORDER BY total DESC;

-- 8.
WITH gasto_por_cliente AS (
    SELECT pe.cliente_id,
           SUM(ip.quantidade * ip.preco_unitario) AS total
    FROM pedidos pe
    JOIN itens_pedido ip ON ip.pedido_id = pe.id
    WHERE pe.status <> 'cancelado'
    GROUP BY pe.cliente_id
)
SELECT c.nome, g.total
FROM gasto_por_cliente g
JOIN clientes c ON c.id = g.cliente_id
WHERE g.total = (SELECT MAX(total) FROM gasto_por_cliente);

-- 9.
WITH vendas AS (
    SELECT produto_id, SUM(quantidade) AS qtd
    FROM itens_pedido
    GROUP BY produto_id
)
SELECT p.nome, v.qtd
FROM vendas v
JOIN produtos p ON p.id = v.produto_id
WHERE v.qtd > (SELECT AVG(qtd) FROM vendas)
ORDER BY v.qtd DESC;

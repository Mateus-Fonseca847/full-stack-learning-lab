-- ==================== RESPOSTAS — AULA 05 ====================

-- 1.  (10)
SELECT COUNT(*) AS total_pedidos FROM pedidos;

-- 2.
SELECT SUM(preco * estoque) AS valor_total_estoque FROM produtos;

-- 3.
SELECT ROUND(AVG(preco), 2) AS preco_medio_livros
FROM produtos
WHERE categoria_id = 2;

-- 4.
SELECT MIN(data_pedido) AS primeiro, MAX(data_pedido) AS ultimo FROM pedidos;

-- 5.  (7 — COUNT(coluna) ignora NULL)
SELECT COUNT(email) FROM clientes;

-- 6.
SELECT categoria_id, COUNT(*) AS qtd_produtos
FROM produtos
GROUP BY categoria_id;

-- 7.
SELECT cliente_id, COUNT(*) AS qtd_pedidos
FROM pedidos
GROUP BY cliente_id
ORDER BY qtd_pedidos DESC;

-- 8.
SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
FROM itens_pedido
GROUP BY pedido_id
ORDER BY total DESC;

-- 9.
SELECT produto_id, SUM(quantidade) AS total_vendido
FROM itens_pedido
GROUP BY produto_id
ORDER BY total_vendido DESC;

-- 10.
SELECT categoria_id, ROUND(AVG(preco), 2) AS preco_medio
FROM produtos
GROUP BY categoria_id
HAVING AVG(preco) > 150;

-- 11.
SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
FROM itens_pedido
GROUP BY pedido_id
HAVING SUM(quantidade * preco_unitario) > 300;

-- 12.
SELECT STRFTIME('%m', data_pedido) AS mes, COUNT(*) AS pedidos
FROM pedidos
WHERE STRFTIME('%Y', data_pedido) = '2024'
GROUP BY mes
ORDER BY mes;

-- 13.
SELECT status,
       COUNT(*) AS qtd,
       MAX(data_pedido) AS mais_recente
FROM pedidos
GROUP BY status
HAVING COUNT(*) > 1;

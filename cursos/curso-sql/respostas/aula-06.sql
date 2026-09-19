-- ==================== RESPOSTAS — AULA 06 ====================

-- 1.
SELECT p.nome AS produto, c.nome AS categoria
FROM produtos p
JOIN categorias c ON c.id = p.categoria_id;

-- 2.
SELECT pe.id, pe.data_pedido, pe.status, cl.nome AS cliente
FROM pedidos pe
JOIN clientes cl ON cl.id = pe.cliente_id;

-- 3. LEFT JOIN para manter Brinquedos; COUNT(p.id) conta 0 quando é NULL.
--    (COUNT(*) daria 1 para Brinquedos — conta a linha, mesmo sem produto!)
SELECT c.nome AS categoria, COUNT(p.id) AS qtd_produtos
FROM categorias c
LEFT JOIN produtos p ON p.categoria_id = c.id
GROUP BY c.id, c.nome;

-- 4. (Tapete de Yoga)
SELECT p.nome
FROM produtos p
LEFT JOIN itens_pedido ip ON ip.produto_id = p.id
WHERE ip.produto_id IS NULL;

-- 5.
SELECT pr.nome, ip.quantidade, ip.preco_unitario,
       ip.quantidade * ip.preco_unitario AS subtotal
FROM itens_pedido ip
JOIN produtos pr ON pr.id = ip.produto_id
WHERE ip.pedido_id = 5;

-- 6.
SELECT pe.id AS pedido, cl.nome AS cliente, pe.status,
       SUM(ip.quantidade * ip.preco_unitario) AS total
FROM pedidos pe
JOIN clientes cl     ON cl.id = pe.cliente_id
JOIN itens_pedido ip ON ip.pedido_id = pe.id
GROUP BY pe.id, cl.nome, pe.status
ORDER BY pe.id;

-- 7.
SELECT c.nome AS categoria,
       SUM(ip.quantidade * ip.preco_unitario) AS faturamento
FROM itens_pedido ip
JOIN pedidos pe    ON pe.id = ip.pedido_id
JOIN produtos pr   ON pr.id = ip.produto_id
JOIN categorias c  ON c.id = pr.categoria_id
WHERE pe.status = 'entregue'
GROUP BY c.id, c.nome
ORDER BY faturamento DESC;

-- 8.
SELECT pr.nome, SUM(ip.quantidade) AS total_vendido
FROM itens_pedido ip
JOIN produtos pr ON pr.id = ip.produto_id
GROUP BY pr.id, pr.nome
ORDER BY total_vendido DESC
LIMIT 3;
-- Obs.: há empate no 3º lugar (vários com 3 unidades). LIMIT corta arbitrariamente.

-- 9.
SELECT DISTINCT cl.nome
FROM clientes cl
JOIN pedidos pe      ON pe.cliente_id = cl.id
JOIN itens_pedido ip ON ip.pedido_id = pe.id
JOIN produtos pr     ON pr.id = ip.produto_id
WHERE pr.categoria_id = 2;

-- 10.
SELECT cl.estado,
       COUNT(DISTINCT pe.id) AS pedidos,
       SUM(ip.quantidade * ip.preco_unitario) AS valor_total
FROM clientes cl
JOIN pedidos pe      ON pe.cliente_id = cl.id
JOIN itens_pedido ip ON ip.pedido_id = pe.id
GROUP BY cl.estado
ORDER BY valor_total DESC;

-- 11.
SELECT cl.nome,
       SUM(ip.quantidade * ip.preco_unitario) AS total_gasto
FROM clientes cl
JOIN pedidos pe      ON pe.cliente_id = cl.id
JOIN itens_pedido ip ON ip.pedido_id = pe.id
WHERE pe.status <> 'cancelado'
GROUP BY cl.id, cl.nome
HAVING SUM(ip.quantidade * ip.preco_unitario) > 500
ORDER BY total_gasto DESC;

-- ==================== RESPOSTAS — AULA 03 ====================

-- 1.
SELECT nome, preco FROM produtos WHERE preco > 150;

-- 2.
SELECT * FROM clientes WHERE cidade = 'São Paulo';

-- 3.
SELECT * FROM pedidos WHERE status = 'pendente';

-- 4.
SELECT nome, estoque
FROM produtos
WHERE categoria_id = 4 AND estoque > 0;

-- 5.
SELECT nome, estado FROM clientes WHERE estado IN ('RJ', 'PR', 'BA');

-- 6.
SELECT nome, preco FROM produtos WHERE preco BETWEEN 80 AND 200;

-- 7.
SELECT * FROM pedidos
WHERE data_pedido BETWEEN '2024-07-01' AND '2024-12-31';

-- 8.
SELECT nome FROM clientes WHERE nome LIKE '%s';

-- 9.
SELECT nome FROM produtos
WHERE nome LIKE '%Mouse%' OR nome LIKE '%Teclado%';

-- 10.
SELECT nome FROM clientes WHERE email IS NULL;

-- 11.
SELECT * FROM pedidos WHERE status NOT IN ('entregue', 'cancelado');

-- 12. Os parênteses deixam a intenção explícita.
SELECT nome, categoria_id, preco, estoque
FROM produtos
WHERE (categoria_id = 2 AND preco < 100)
   OR estoque > 50;

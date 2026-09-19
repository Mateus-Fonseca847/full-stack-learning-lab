-- ==================== RESPOSTAS — AULA 04 ====================

-- 1.
SELECT nome, preco FROM produtos ORDER BY preco;

-- 2.
SELECT nome FROM clientes ORDER BY nome DESC;

-- 3.
SELECT * FROM pedidos ORDER BY data_pedido DESC;

-- 4.
SELECT nome, estoque FROM produtos ORDER BY estoque DESC LIMIT 5;

-- 5.
SELECT nome, estado, cidade FROM clientes ORDER BY estado, cidade;

-- 6.
SELECT nome, preco FROM produtos ORDER BY preco LIMIT 1;

-- 7. A ordem dos WHEN importa: o primeiro verdadeiro vence.
SELECT nome,
       estoque,
       CASE
           WHEN estoque = 0  THEN 'esgotado'
           WHEN estoque < 20 THEN 'baixo'
           ELSE 'ok'
       END AS situacao_estoque
FROM produtos;

-- 8.
SELECT UPPER(nome) AS nome, LENGTH(nome) AS letras FROM clientes;
-- (LENGTH conta também o espaço entre nome e sobrenome.)

-- 9.
SELECT nome, UPPER(SUBSTR(nome, 1, 3)) AS sigla FROM produtos;

-- 10.
SELECT id, data_pedido, STRFTIME('%m', data_pedido) AS mes FROM pedidos;

-- 11.
SELECT nome, ROUND(preco * 1.075, 2) AS preco_reajustado FROM produtos;

-- 12.
SELECT nome,
       data_cadastro,
       CAST(JULIANDAY('2024-12-31') - JULIANDAY(data_cadastro) AS INTEGER) AS dias_cadastrado
FROM clientes
ORDER BY data_cadastro;

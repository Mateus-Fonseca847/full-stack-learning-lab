-- ==================== RESPOSTAS — AULA 02 ====================

-- 1.
SELECT * FROM clientes;

-- 2.
SELECT nome, email FROM clientes;

-- 3.
SELECT nome AS produto,
       preco AS preco_atual
FROM produtos;

-- 4.
SELECT nome,
       preco,
       preco * 0.9 AS preco_promocional
FROM produtos;
-- Viu valores como 80.91000000000001? É imprecisão de números decimais (REAL).
-- Para exibir bonito: ROUND(preco * 0.9, 2)

-- 5.
SELECT DISTINCT cidade FROM clientes;

-- 6.
SELECT DISTINCT status FROM pedidos;

-- 7.
SELECT * FROM produtos LIMIT 3;

-- 8.
SELECT nome || ' custa R$ ' || preco AS descricao
FROM produtos;

-- 9. Inteiro / inteiro = divisão inteira; % = resto.
SELECT nome,
       estoque,
       estoque / 12 AS caixas,
       estoque % 12 AS sobra
FROM produtos;

-- 10.
SELECT 350 * 0.20 AS vinte_por_cento;   -- 70.0

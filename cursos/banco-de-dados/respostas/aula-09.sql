-- ==================== RESPOSTAS — AULA 09 ====================
-- Rode banco/loja.sql antes para partir do estado original.

-- 1.
INSERT INTO categorias (id, nome) VALUES (6, 'Pet');

-- 2.
INSERT INTO produtos (nome, categoria_id, preco, estoque) VALUES
    ('Ração 10kg', 6, 139.90, 20),
    ('Coleira',    6,  35.00, 40);

-- 3. (id omitido: o SQLite gera o 9)
INSERT INTO clientes (nome, email, cidade, estado, data_cadastro)
VALUES ('Isabela Freitas', 'isabela@email.com', 'Recife', 'PE', '2024-12-01');

-- 4. Erro "CHECK constraint failed": a tabela produtos tem CHECK (preco >= 0).
-- INSERT INTO produtos (nome, categoria_id, preco, estoque) VALUES ('Erro', 1, -10, 1);

-- 5.
SELECT nome, preco FROM produtos WHERE categoria_id = 2;   -- confere antes
UPDATE produtos SET preco = ROUND(preco * 1.05, 2) WHERE categoria_id = 2;

-- 6.
UPDATE pedidos SET status = 'enviado' WHERE id = 8;

-- 7.
UPDATE clientes SET email = 'diego@email.com' WHERE id = 4;

-- 8.
SELECT nome, preco, estoque FROM produtos WHERE preco > 800;   -- só o Monitor
UPDATE produtos SET estoque = 0 WHERE preco > 800;

-- 9.
DELETE FROM produtos WHERE nome = 'Coleira';

-- 10. O preço é pego da tabela na hora com uma subconsulta.
BEGIN TRANSACTION;

INSERT INTO pedidos (id, cliente_id, data_pedido, status)
VALUES (12, 3, '2024-12-10', 'pendente');

INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
VALUES (12, 6, 1, (SELECT preco FROM produtos WHERE id = 6));

UPDATE produtos SET estoque = estoque - 1 WHERE id = 6;

SELECT * FROM itens_pedido WHERE pedido_id = 12;   -- confere
COMMIT;

-- 11.
BEGIN;
DELETE FROM pedidos WHERE status = 'cancelado';
SELECT * FROM pedidos;        -- o pedido 4 sumiu
ROLLBACK;
SELECT * FROM pedidos;        -- voltou

-- 12. Os itens do pedido 4 continuariam em itens_pedido apontando para
--     um pedido que não existe mais ("registros órfãos").
--     (Com PRAGMA foreign_keys = ON, o banco nem deixaria apagar.)
--     Forma correta: apaga os filhos primeiro, depois o pai, numa transação.
BEGIN;
DELETE FROM itens_pedido
WHERE pedido_id IN (SELECT id FROM pedidos WHERE status = 'cancelado');
DELETE FROM pedidos WHERE status = 'cancelado';
COMMIT;

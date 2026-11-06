-- ==================== RESPOSTAS — AULA 01 ====================

-- 1. Chave primária: identifica cada linha da PRÓPRIA tabela (única, não nula).
--    Chave estrangeira: coluna que guarda a chave primária de OUTRA tabela,
--    criando a ligação entre elas.

-- 2. Em itens_pedido: pedido_id -> pedidos(id) e produto_id -> produtos(id).
--    (Juntas, as duas formam a chave primária composta da tabela.)

-- 3.
SELECT name FROM sqlite_master WHERE type = 'table';

-- 4. cliente_id, data_pedido e status têm notnull = 1.
--    (id é INTEGER PRIMARY KEY: no SQLite ele é gerado automaticamente.)
PRAGMA table_info(pedidos);

-- 5. Para não repetir dados: o nome fica guardado uma vez em clientes.
--    Se o cliente mudar de nome/email, altera-se em um único lugar.

-- 6. 5 categorias.
SELECT * FROM categorias;

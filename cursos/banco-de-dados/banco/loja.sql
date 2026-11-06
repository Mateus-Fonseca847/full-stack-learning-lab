-- =============================================================
-- BANCO DE DADOS DE PRÁTICA: "loja"
-- Execute este arquivo UMA vez para criar e popular as tabelas.
-- Quer recomeçar do zero? Execute de novo (ele apaga tudo antes).
-- =============================================================

DROP TABLE IF EXISTS itens_pedido;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
    id    INTEGER PRIMARY KEY,
    nome  TEXT NOT NULL UNIQUE
);

CREATE TABLE produtos (
    id            INTEGER PRIMARY KEY,
    nome          TEXT NOT NULL,
    categoria_id  INTEGER REFERENCES categorias(id),
    preco         REAL NOT NULL CHECK (preco >= 0),
    estoque       INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE clientes (
    id             INTEGER PRIMARY KEY,
    nome           TEXT NOT NULL,
    email          TEXT UNIQUE,
    cidade         TEXT,
    estado         TEXT,
    data_cadastro  TEXT            -- formato 'AAAA-MM-DD'
);

CREATE TABLE pedidos (
    id           INTEGER PRIMARY KEY,
    cliente_id   INTEGER NOT NULL REFERENCES clientes(id),
    data_pedido  TEXT NOT NULL,
    status       TEXT NOT NULL      -- pendente, enviado, entregue, cancelado
);

CREATE TABLE itens_pedido (
    pedido_id       INTEGER REFERENCES pedidos(id),
    produto_id      INTEGER REFERENCES produtos(id),
    quantidade      INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario  REAL NOT NULL,
    PRIMARY KEY (pedido_id, produto_id)
);

INSERT INTO categorias (id, nome) VALUES
 (1, 'Eletrônicos'),
 (2, 'Livros'),
 (3, 'Casa'),
 (4, 'Esportes'),
 (5, 'Brinquedos');

INSERT INTO produtos (id, nome, categoria_id, preco, estoque) VALUES
 (1,  'Fone Bluetooth',     1, 199.90, 50),
 (2,  'Teclado Mecânico',   1, 349.00, 20),
 (3,  'Mouse Sem Fio',      1,  89.90, 100),
 (4,  'Monitor 24 pol',     1, 899.00, 10),
 (5,  'O Hobbit',           2,  79.90, 30),
 (6,  'Clean Code',         2, 120.00, 15),
 (7,  'Dom Casmurro',       2,  29.90, 40),
 (8,  'Luminária LED',      3,  59.90, 25),
 (9,  'Jogo de Panelas',    3, 299.00, 8),
 (10, 'Bola de Futebol',    4,  89.00, 35),
 (11, 'Tapete de Yoga',     4, 119.90, 0),
 (12, 'Garrafa Térmica',    4,  49.90, 60);

INSERT INTO clientes (id, nome, email, cidade, estado, data_cadastro) VALUES
 (1, 'Ana Souza',      'ana@email.com',      'Rio de Janeiro', 'RJ', '2024-01-15'),
 (2, 'Bruno Lima',     'bruno@email.com',    'São Paulo',      'SP', '2024-02-20'),
 (3, 'Carla Mendes',   'carla@email.com',    'Niterói',        'RJ', '2024-03-05'),
 (4, 'Diego Rocha',    NULL,                 'Belo Horizonte', 'MG', '2024-03-18'),
 (5, 'Elisa Martins',  'elisa@email.com',    'São Paulo',      'SP', '2024-05-02'),
 (6, 'Felipe Castro',  'felipe@email.com',   'Curitiba',       'PR', '2024-06-10'),
 (7, 'Gabriela Nunes', 'gabi@email.com',     'Rio de Janeiro', 'RJ', '2024-08-25'),
 (8, 'Henrique Alves', 'henrique@email.com', 'Salvador',       'BA', '2024-11-30');

INSERT INTO pedidos (id, cliente_id, data_pedido, status) VALUES
 (1,  1, '2024-02-01', 'entregue'),
 (2,  2, '2024-02-15', 'entregue'),
 (3,  1, '2024-03-10', 'entregue'),
 (4,  3, '2024-04-02', 'cancelado'),
 (5,  4, '2024-04-20', 'entregue'),
 (6,  5, '2024-06-11', 'enviado'),
 (7,  2, '2024-07-07', 'entregue'),
 (8,  6, '2024-08-19', 'pendente'),
 (9,  7, '2024-09-01', 'enviado'),
 (10, 1, '2024-10-12', 'pendente');

INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
 (1, 1, 1, 199.90), (1, 7, 2, 29.90),
 (2, 2, 1, 349.00), (2, 3, 1, 89.90),
 (3, 5, 1, 79.90),  (3, 6, 1, 120.00),
 (4, 4, 1, 899.00),
 (5, 10, 2, 89.00), (5, 12, 3, 49.90),
 (6, 9, 1, 299.00), (6, 8, 2, 59.90),
 (7, 4, 1, 899.00), (7, 1, 1, 199.90),
 (8, 10, 1, 89.00),
 (9, 7, 3, 29.90),  (9, 3, 2, 89.90),
 (10, 12, 1, 49.90),(10, 1, 1, 199.90);

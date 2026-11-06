-- ==================== RESPOSTAS — AULA 08 ====================

-- 1. autores primeiro, porque livros tem uma chave estrangeira que aponta
--    para autores: a tabela referenciada precisa existir antes.
CREATE TABLE autores (
    id            INTEGER PRIMARY KEY,
    nome          TEXT NOT NULL,
    nacionalidade TEXT
);

CREATE TABLE livros (
    id          INTEGER PRIMARY KEY,
    titulo      TEXT NOT NULL,
    isbn        TEXT UNIQUE,
    ano         INTEGER CHECK (ano > 1400),
    paginas     INTEGER CHECK (paginas > 0),
    disponivel  INTEGER NOT NULL DEFAULT 1,
    autor_id    INTEGER NOT NULL REFERENCES autores(id)
);

-- 2.
CREATE TABLE leitores (
    id             INTEGER PRIMARY KEY,
    nome           TEXT NOT NULL,
    email          TEXT UNIQUE,
    data_cadastro  TEXT DEFAULT '2024-01-01'
);

-- 3.
CREATE TABLE emprestimos (
    id              INTEGER PRIMARY KEY,
    livro_id        INTEGER NOT NULL REFERENCES livros(id),
    leitor_id       INTEGER NOT NULL REFERENCES leitores(id),
    data_saida      TEXT NOT NULL,
    data_devolucao  TEXT                -- NULL = ainda não devolvido
);

-- 4.
ALTER TABLE leitores ADD COLUMN telefone TEXT;

-- 5. É o CHECK (ano > 1400). Teste:
--    INSERT INTO autores (id, nome) VALUES (1, 'Teste');
--    INSERT INTO livros (titulo, ano, autor_id) VALUES ('Antigo', 1200, 1);
--    -> Erro: CHECK constraint failed
ALTER TABLE livros ADD COLUMN editora TEXT;

-- 6.
CREATE VIEW vw_produtos_categoria AS
SELECT p.nome AS produto, c.nome AS categoria, p.preco
FROM produtos p
JOIN categorias c ON c.id = p.categoria_id;

SELECT * FROM vw_produtos_categoria;

-- 7.
CREATE INDEX idx_pedidos_data ON pedidos(data_pedido);

-- 8. Relação N para N -> tabela intermediária "matriculas",
--    que também é o lugar certo para a nota (ela pertence ao PAR aluno+curso).
CREATE TABLE alunos (
    id    INTEGER PRIMARY KEY,
    nome  TEXT NOT NULL
);

CREATE TABLE cursos (
    id     INTEGER PRIMARY KEY,
    nome   TEXT NOT NULL UNIQUE
);

CREATE TABLE matriculas (
    aluno_id  INTEGER REFERENCES alunos(id),
    curso_id  INTEGER REFERENCES cursos(id),
    nota      REAL CHECK (nota BETWEEN 0 AND 10),
    PRIMARY KEY (aluno_id, curso_id)
);

-- Limpeza (opcional), para deixar o banco como estava:
-- DROP VIEW vw_produtos_categoria;
-- DROP INDEX idx_pedidos_data;
-- DROP TABLE matriculas; DROP TABLE cursos; DROP TABLE alunos;
-- DROP TABLE emprestimos; DROP TABLE livros; DROP TABLE leitores; DROP TABLE autores;

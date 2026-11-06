# Aula 08 — Criando e alterando tabelas (DDL)

Até aqui você consultou tabelas prontas. Agora vai criar as suas. Para não bagunçar o banco `loja`, os exemplos desta aula criam tabelas novas de uma **biblioteca**.

## 1. CREATE TABLE

```sql
CREATE TABLE autores (
    id           INTEGER PRIMARY KEY,
    nome         TEXT NOT NULL,
    nacionalidade TEXT
);
```

Estrutura: nome da coluna, tipo, e restrições opcionais. Colunas separadas por vírgula (a última sem vírgula!).

## 2. Tipos de dados

| Tipo genérico | SQLite | MySQL | PostgreSQL |
|---------------|--------|-------|------------|
| Inteiro | `INTEGER` | `INT` | `INTEGER` |
| Decimal exato (dinheiro) | `REAL`* | `DECIMAL(10,2)` | `NUMERIC(10,2)` |
| Texto curto | `TEXT` | `VARCHAR(100)` | `VARCHAR(100)` |
| Texto longo | `TEXT` | `TEXT` | `TEXT` |
| Data | `TEXT` ('AAAA-MM-DD') | `DATE` | `DATE` |
| Data e hora | `TEXT` | `DATETIME` | `TIMESTAMP` |
| Verdadeiro/falso | `INTEGER` (0/1) | `BOOLEAN` | `BOOLEAN` |

\* O SQLite é flexível com tipos. Em bancos "de produção", use `DECIMAL`/`NUMERIC` para dinheiro — `REAL`/`FLOAT` podem gerar erros de arredondamento (tipo `0.1 + 0.2 = 0.30000000000000004`).

## 3. Restrições (constraints)

Restrições são regras que o banco garante sozinho. Elas protegem seus dados de erros.

| Restrição | Garante que... |
|-----------|----------------|
| `PRIMARY KEY` | valor único e não nulo; identifica a linha |
| `NOT NULL` | a coluna sempre tem valor |
| `UNIQUE` | não há valores repetidos |
| `DEFAULT valor` | se não informar, usa esse valor |
| `CHECK (condição)` | o valor obedece a uma regra |
| `REFERENCES tabela(coluna)` | é chave estrangeira: o valor precisa existir na outra tabela |

Exemplo completo:

```sql
CREATE TABLE livros (
    id          INTEGER PRIMARY KEY,
    titulo      TEXT NOT NULL,
    isbn        TEXT UNIQUE,
    ano         INTEGER CHECK (ano > 1400),
    paginas     INTEGER CHECK (paginas > 0),
    disponivel  INTEGER NOT NULL DEFAULT 1,
    autor_id    INTEGER NOT NULL REFERENCES autores(id)
);
```

> No SQLite, `INTEGER PRIMARY KEY` gera o id automaticamente (1, 2, 3...) se você não informar. Em MySQL use `INT AUTO_INCREMENT PRIMARY KEY`; no PostgreSQL, `SERIAL PRIMARY KEY` ou `INTEGER GENERATED ALWAYS AS IDENTITY`.

> No SQLite, chaves estrangeiras só são verificadas se você ativar: `PRAGMA foreign_keys = ON;` (vale para a conexão atual). Nos outros bancos já vêm ativadas.

Chave primária composta (duas colunas juntas formam o identificador), como em `itens_pedido`:

```sql
CREATE TABLE emprestimos (
    livro_id     INTEGER REFERENCES livros(id),
    data_saida   TEXT,
    leitor       TEXT NOT NULL,
    data_volta   TEXT,
    PRIMARY KEY (livro_id, data_saida)
);
```

## 4. IF NOT EXISTS / IF EXISTS

Evitam erro se a tabela já existe (ou não existe):

```sql
CREATE TABLE IF NOT EXISTS autores (...);
DROP TABLE IF EXISTS tabela_que_nao_existe;   -- não dá erro
```

## 5. ALTER TABLE: mudando a estrutura

```sql
-- adicionar coluna
ALTER TABLE autores ADD COLUMN ano_nascimento INTEGER;

-- renomear coluna
ALTER TABLE autores RENAME COLUMN nacionalidade TO pais;

-- renomear tabela
ALTER TABLE emprestimos RENAME TO emprestimos_antigos;

-- remover coluna (SQLite 3.35+)
ALTER TABLE autores DROP COLUMN ano_nascimento;
```

> O SQLite tem um `ALTER TABLE` limitado (não altera tipo nem adiciona restrições em colunas existentes). Em MySQL: `ALTER TABLE t MODIFY coluna tipo`; em PostgreSQL: `ALTER TABLE t ALTER COLUMN coluna TYPE tipo`.

## 6. DROP TABLE: apagando a tabela

```sql
DROP TABLE emprestimos_antigos;
```

⚠️ Apaga a tabela **inteira**, estrutura e dados, sem pedir confirmação. Não tem "desfazer".

## 7. Índices (noção básica)

Um **índice** é como o índice de um livro: acelera buscas numa coluna, ao custo de um pouco de espaço e de escritas um pouco mais lentas.

```sql
CREATE INDEX idx_livros_titulo ON livros(titulo);
DROP INDEX idx_livros_titulo;
```

Chaves primárias e colunas `UNIQUE` já ganham índice automaticamente. Crie índices em colunas muito usadas em `WHERE` e `JOIN` em tabelas grandes.

## 8. Views: consultas salvas

Uma **view** é uma consulta com nome, que você usa como se fosse uma tabela:

```sql
CREATE VIEW vw_total_pedidos AS
SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
FROM itens_pedido
GROUP BY pedido_id;

SELECT * FROM vw_total_pedidos WHERE total > 300;
```

A view não guarda dados: ela roda a consulta toda vez. Ótima para não reescrever consultas longas.

## 9. Modelagem: dicas rápidas

- Uma tabela = um assunto. Se você está repetindo o mesmo dado em várias linhas, provavelmente ele deveria estar em outra tabela (isso se chama **normalização**).
- Relação **1 para N** (um autor, muitos livros): chave estrangeira no lado "muitos" (`livros.autor_id`).
- Relação **N para N** (um livro tem vários autores E um autor tem vários livros): crie uma tabela intermediária (`livro_autor` com `livro_id` e `autor_id`). É o papel de `itens_pedido` entre `pedidos` e `produtos`.

---

## Exercícios

1. Crie as tabelas `autores` e `livros` exatamente como nos exemplos (autores primeiro — por quê?).
2. Crie uma tabela `leitores` com: id (chave primária), nome (obrigatório), email (único), data_cadastro (padrão `'2024-01-01'`).
3. Crie uma tabela `emprestimos` com id, `livro_id` e `leitor_id` (ambos chaves estrangeiras), `data_saida` (obrigatória) e `data_devolucao` (opcional).
4. Adicione na tabela `leitores` uma coluna `telefone`.
5. Qual restrição da tabela `livros` impede cadastrar um livro do ano 1200? Depois, adicione a coluna `editora` em `livros`.
6. Crie uma view `vw_produtos_categoria` no banco loja mostrando nome do produto, nome da categoria e preço.
7. Crie um índice na coluna `data_pedido` da tabela `pedidos`.
8. Desafio de modelagem: uma escola tem alunos e cursos; cada aluno pode fazer vários cursos e cada curso tem vários alunos, e queremos guardar a nota do aluno em cada curso. Escreva os `CREATE TABLE` necessários.

Respostas: [`respostas/aula-08.sql`](../respostas/aula-08.sql)

---

## Resumo

```sql
CREATE TABLE [IF NOT EXISTS] nome (
    id INTEGER PRIMARY KEY,
    coluna TIPO NOT NULL UNIQUE DEFAULT x CHECK (regra),
    outra_id INTEGER REFERENCES outra_tabela(id)
);
ALTER TABLE nome ADD COLUMN c TIPO;
ALTER TABLE nome RENAME COLUMN a TO b;
DROP TABLE [IF EXISTS] nome;
CREATE INDEX idx ON tabela(coluna);
CREATE VIEW vw AS SELECT ...;
```

- DDL define a **estrutura**; não mexe (diretamente) nos dados.
- Restrições são a primeira linha de defesa da qualidade dos dados.
- Crie as tabelas "pai" antes das "filhas" (as que têm chave estrangeira).
- `DROP` não tem volta.

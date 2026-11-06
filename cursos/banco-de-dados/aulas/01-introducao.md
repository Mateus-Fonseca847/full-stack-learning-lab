# Aula 01 — O que é SQL e banco de dados

## 1. Banco de dados

Um **banco de dados** é um lugar organizado para guardar informações. O tipo mais comum é o **banco relacional**, que guarda os dados em **tabelas** — parecidas com planilhas do Excel.

Exemplo, a tabela `clientes`:

| id | nome        | email           | cidade         | estado |
|----|-------------|-----------------|----------------|--------|
| 1  | Ana Souza   | ana@email.com   | Rio de Janeiro | RJ     |
| 2  | Bruno Lima  | bruno@email.com | São Paulo      | SP     |

Vocabulário essencial:

- **Tabela**: um conjunto de dados sobre um mesmo assunto (clientes, produtos, pedidos).
- **Coluna** (ou campo): um tipo de informação (nome, email). Toda coluna tem um **tipo** (texto, número, data).
- **Linha** (ou registro): um item completo (a cliente Ana, com todos os seus dados).
- **Chave primária** (*primary key*): coluna que identifica cada linha de forma única. Normalmente é o `id`. Não pode repetir nem ficar vazia.
- **Chave estrangeira** (*foreign key*): coluna que aponta para a chave primária de outra tabela. Em `pedidos`, a coluna `cliente_id` diz *de quem* é o pedido. É isso que torna o banco "relacional": as tabelas se relacionam.

Por que separar em várias tabelas em vez de uma planilha gigante? Para não repetir informação. Se a Ana fez 3 pedidos, o nome e o email dela ficam guardados **uma vez só** em `clientes`, e cada pedido só guarda o número `1` (o id dela). Se ela trocar de email, você altera em um lugar só.

## 2. SQL

**SQL** (*Structured Query Language*) é a linguagem usada para conversar com bancos relacionais. Você escreve um comando e o banco responde.

```sql
SELECT nome, cidade FROM clientes;
```

Lê-se quase como inglês: "selecione nome e cidade da tabela clientes".

SGBDs (sistemas de gerenciamento de banco de dados) populares: **MySQL**, **PostgreSQL**, **SQL Server**, **Oracle** e **SQLite**. Todos falam SQL, com pequenas diferenças de "sotaque". O núcleo que você vai aprender aqui funciona em todos.

## 3. Os grupos de comandos

| Grupo | Nome | Serve para | Comandos |
|-------|------|------------|----------|
| **DQL** | Data Query Language | Consultar dados | `SELECT` |
| **DML** | Data Manipulation Language | Mexer nos dados | `INSERT`, `UPDATE`, `DELETE` |
| **DDL** | Data Definition Language | Criar/alterar a estrutura | `CREATE`, `ALTER`, `DROP` |
| **DCL** | Data Control Language | Permissões | `GRANT`, `REVOKE` |
| **TCL** | Transaction Control Language | Transações | `BEGIN`, `COMMIT`, `ROLLBACK` |

No dia a dia, 80% do tempo você usa `SELECT`. Por isso começamos por ele.

## 4. Regras de escrita

```sql
-- Isto é um comentário de uma linha

/* Isto é um comentário
   de várias linhas */

SELECT nome FROM clientes;   -- o ponto e vírgula encerra o comando

select nome from clientes;   -- funciona igual: SQL não diferencia maiúsculas nos comandos
```

Convenções que profissionais usam (e você deve adotar):

- Palavras-chave em MAIÚSCULAS (`SELECT`, `FROM`, `WHERE`), nomes de tabelas e colunas em minúsculas.
- Nomes em `snake_case`: `data_pedido`, não `DataPedido`.
- Textos entre **aspas simples**: `'Rio de Janeiro'`. Aspas duplas são para nomes de colunas/tabelas, não para textos.
- Quebre linhas em consultas longas, uma cláusula por linha.

## 5. Conhecendo o banco de prática

No SQLite, para ver as tabelas existentes:

```sql
SELECT name FROM sqlite_master WHERE type = 'table';
```

Para ver as colunas de uma tabela:

```sql
PRAGMA table_info(produtos);
```

> Em MySQL seriam `SHOW TABLES;` e `DESCRIBE produtos;`. No PostgreSQL (terminal psql): `\dt` e `\d produtos`.

---

## Exercícios

1. Com suas palavras, qual a diferença entre chave primária e chave estrangeira?
2. Na tabela `itens_pedido`, quais colunas são chaves estrangeiras e para quais tabelas elas apontam?
3. Liste todas as tabelas do banco `loja` usando o comando da seção 5.
4. Veja as colunas da tabela `pedidos` com `PRAGMA table_info`. Quais colunas não aceitam valor vazio (`notnull = 1`)?
5. Por que a tabela `pedidos` guarda `cliente_id` em vez do nome do cliente?
6. Execute `SELECT * FROM categorias;`. Quantas categorias existem?

Respostas: [`respostas/aula-01.sql`](../respostas/aula-01.sql)

---

## Resumo

- Banco relacional = dados em **tabelas** (colunas + linhas) que se ligam por **chaves**.
- **Chave primária** identifica a linha; **chave estrangeira** aponta para outra tabela.
- **SQL** é a linguagem para falar com o banco. Principais grupos: consultar (`SELECT`), manipular (`INSERT/UPDATE/DELETE`), definir estrutura (`CREATE/ALTER/DROP`).
- Comandos terminam com `;`, comentários com `--`, textos entre `'aspas simples'`.

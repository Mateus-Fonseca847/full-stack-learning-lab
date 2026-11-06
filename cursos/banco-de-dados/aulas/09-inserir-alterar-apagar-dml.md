# Aula 09 — INSERT, UPDATE, DELETE e transações (DML)

Esta aula **altera dados**. Se bagunçar o banco `loja`, é só rodar `banco/loja.sql` de novo para restaurar tudo. 😉

## 1. INSERT: adicionando linhas

```sql
INSERT INTO categorias (id, nome)
VALUES (6, 'Papelaria');
```

- Liste as colunas e depois os valores **na mesma ordem**.
- Colunas omitidas recebem o `DEFAULT` ou `NULL`.
- Se a chave primária for `INTEGER PRIMARY KEY`, pode omitir o `id` que o SQLite gera o próximo número:

```sql
INSERT INTO produtos (nome, categoria_id, preco, estoque)
VALUES ('Caderno 200 folhas', 6, 24.90, 80);
```

Várias linhas de uma vez:

```sql
INSERT INTO produtos (nome, categoria_id, preco, estoque) VALUES
    ('Caneta Azul',     6,  2.50, 500),
    ('Marca-texto',     6,  6.90, 200),
    ('Mochila Escolar', 6, 159.90, 12);
```

Inserir o resultado de uma consulta:

```sql
CREATE TABLE clientes_rj AS SELECT * FROM clientes WHERE 1 = 0;  -- cria vazia, mesma estrutura

INSERT INTO clientes_rj
SELECT * FROM clientes WHERE estado = 'RJ';
```

Se violar uma restrição, o banco recusa:

```sql
INSERT INTO categorias (id, nome) VALUES (7, 'Livros');
-- Erro: UNIQUE constraint failed: categorias.nome
```

Isso é bom! É o banco protegendo os dados.

## 2. UPDATE: alterando linhas

```sql
UPDATE produtos
SET preco = 219.90
WHERE id = 1;
```

Várias colunas e cálculos com o valor atual:

```sql
UPDATE produtos
SET preco = ROUND(preco * 1.10, 2),   -- aumento de 10%
    estoque = estoque + 5
WHERE categoria_id = 6;
```

### O erro mais perigoso do SQL

```sql
UPDATE produtos SET preco = 0;    -- SEM WHERE: zera o preço de TODOS os produtos!
```

**Regra de ouro:** antes de um `UPDATE` ou `DELETE`, rode um `SELECT` com o mesmo `WHERE` para ver exatamente quais linhas serão afetadas:

```sql
SELECT * FROM produtos WHERE categoria_id = 6;   -- 1º: confira
UPDATE produtos SET estoque = 0 WHERE categoria_id = 6;   -- 2º: execute
```

## 3. DELETE: removendo linhas

```sql
DELETE FROM produtos
WHERE nome = 'Caneta Azul';
```

Com subconsulta:

```sql
-- Apaga os produtos que nunca foram vendidos e estão sem estoque
DELETE FROM produtos
WHERE estoque = 0
  AND id NOT IN (SELECT produto_id FROM itens_pedido);
```

`DELETE FROM tabela;` sem `WHERE` apaga **todas** as linhas (a tabela continua existindo, vazia).

| Comando | Apaga | Estrutura |
|---------|-------|-----------|
| `DELETE FROM t WHERE ...` | linhas escolhidas | mantém |
| `DELETE FROM t` | todas as linhas | mantém |
| `DROP TABLE t` | tudo | apaga a tabela |

> Em MySQL/PostgreSQL/SQL Server existe também `TRUNCATE TABLE t`: esvazia a tabela muito rápido.

### Chaves estrangeiras protegem contra "órfãos"

Com `PRAGMA foreign_keys = ON;`, tentar apagar um cliente que tem pedidos dá erro — senão os pedidos ficariam apontando para um cliente inexistente. Você pode definir o comportamento na criação da tabela: `REFERENCES clientes(id) ON DELETE CASCADE` (apaga os filhos junto) ou `ON DELETE SET NULL`.

## 4. UPSERT (inserir ou atualizar)

"Se não existe, insere; se já existe, atualiza":

```sql
INSERT INTO categorias (id, nome) VALUES (6, 'Papelaria e Escritório')
ON CONFLICT(id) DO UPDATE SET nome = excluded.nome;
```

`excluded` se refere aos valores que você tentou inserir. (Sintaxe do SQLite e PostgreSQL. MySQL usa `ON DUPLICATE KEY UPDATE`.)

## 5. Transações: tudo ou nada

Imagine registrar uma venda: criar o pedido, inserir os itens **e** baixar o estoque. Se der erro no meio, o banco fica inconsistente. Uma **transação** agrupa comandos: ou todos acontecem, ou nenhum.

```sql
BEGIN TRANSACTION;

INSERT INTO pedidos (id, cliente_id, data_pedido, status)
VALUES (11, 8, '2024-12-05', 'pendente');

INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
VALUES (11, 3, 2, 89.90);

UPDATE produtos SET estoque = estoque - 2 WHERE id = 3;

COMMIT;       -- confirma tudo
```

Se algo deu errado antes do `COMMIT`, use `ROLLBACK;` no lugar dele: tudo desde o `BEGIN` é desfeito.

Experimente o "botão de desfazer":

```sql
BEGIN;
DELETE FROM clientes;           -- ops!
SELECT COUNT(*) FROM clientes;  -- 0
ROLLBACK;
SELECT COUNT(*) FROM clientes;  -- de volta!
```

As propriedades garantidas pelas transações têm um nome famoso em entrevistas: **ACID** — Atomicidade (tudo ou nada), Consistência (regras respeitadas), Isolamento (transações simultâneas não se atrapalham) e Durabilidade (o que foi confirmado não se perde).

---

## Exercícios

(Rode `banco/loja.sql` antes para começar do estado original.)

1. Insira a categoria `'Pet'` com id 6.
2. Insira dois produtos na categoria Pet: `'Ração 10kg'` (R$ 139,90, estoque 20) e `'Coleira'` (R$ 35,00, estoque 40), num único `INSERT`.
3. Insira um cliente novo com seus dados (invente), deixando o id automático.
4. Tente inserir um produto com preço negativo. O que acontece e por quê?
5. Aumente em 5% o preço de todos os produtos da categoria Livros.
6. Altere o status do pedido 8 para `'enviado'`.
7. O cliente Diego (id 4) informou o email `diego@email.com`. Atualize.
8. Coloque estoque 0 em todos os produtos com preço acima de 800 (lembre-se: `SELECT` antes!).
9. Apague o produto `'Coleira'`.
10. Usando uma transação, registre um pedido novo (id 12) do cliente 3, com 1 unidade do produto 6 ao preço atual, e baixe o estoque. Confira e dê `COMMIT`.
11. Dentro de uma transação, apague todos os pedidos cancelados, confira com `SELECT` e depois desfaça com `ROLLBACK`.
12. Desafio: por que o `DELETE FROM pedidos WHERE status = 'cancelado'` deixaria "lixo" no banco se não houver `ON DELETE CASCADE`? Escreva os comandos para apagar o pedido cancelado corretamente (itens primeiro).

Respostas: [`respostas/aula-09.sql`](../respostas/aula-09.sql)

---

## Resumo

```sql
INSERT INTO t (c1, c2) VALUES (v1, v2), (v3, v4);
UPDATE t SET c1 = v1 WHERE condição;
DELETE FROM t WHERE condição;

BEGIN;  ...comandos...  COMMIT;   -- ou ROLLBACK;
```

- **Sempre** use `WHERE` em `UPDATE`/`DELETE` e teste com `SELECT` antes.
- Restrições (UNIQUE, CHECK, FK) recusam dados inválidos — isso é uma proteção.
- Transações garantem "tudo ou nada"; `ROLLBACK` desfaz até o `BEGIN`.
- `DELETE` apaga linhas; `DROP` apaga a tabela.

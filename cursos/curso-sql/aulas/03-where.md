# Aula 03 — WHERE: filtrando linhas

`SELECT` escolhe **colunas**. `WHERE` escolhe **linhas**: só entram no resultado as linhas em que a condição for verdadeira.

```sql
SELECT colunas
FROM tabela
WHERE condição;
```

## 1. Operadores de comparação

| Operador | Significado |
|----------|-------------|
| `=` | igual |
| `<>` ou `!=` | diferente |
| `>` / `<` | maior / menor |
| `>=` / `<=` | maior ou igual / menor ou igual |

```sql
SELECT nome, preco FROM produtos WHERE preco > 100;

SELECT nome, cidade FROM clientes WHERE estado = 'RJ';

SELECT * FROM pedidos WHERE status <> 'cancelado';
```

Datas guardadas como `'AAAA-MM-DD'` podem ser comparadas diretamente:

```sql
SELECT * FROM pedidos WHERE data_pedido >= '2024-06-01';
```

## 2. Combinando condições: AND, OR, NOT

- `AND`: as duas condições precisam ser verdadeiras.
- `OR`: basta uma ser verdadeira.
- `NOT`: inverte.

```sql
-- Eletrônicos que custam menos de 200
SELECT nome, preco
FROM produtos
WHERE categoria_id = 1 AND preco < 200;

-- Clientes do RJ ou de SP
SELECT nome, estado
FROM clientes
WHERE estado = 'RJ' OR estado = 'SP';
```

**Precedência**: o `AND` é avaliado antes do `OR`, como multiplicação antes de soma. Use parênteses sempre que misturar os dois:

```sql
-- ERRADO: lê-se "(categoria 1 E preço < 100) OU categoria 2"
SELECT nome FROM produtos WHERE categoria_id = 1 AND preco < 100 OR categoria_id = 2;

-- CERTO: produtos baratos (< 100) das categorias 1 ou 2
SELECT nome FROM produtos WHERE preco < 100 AND (categoria_id = 1 OR categoria_id = 2);
```

## 3. IN: lista de valores

Atalho para vários `OR` na mesma coluna:

```sql
SELECT nome, estado FROM clientes WHERE estado IN ('RJ', 'SP', 'MG');

SELECT nome, estado FROM clientes WHERE estado NOT IN ('RJ', 'SP');
```

## 4. BETWEEN: intervalo

Inclui as duas pontas:

```sql
SELECT nome, preco FROM produtos WHERE preco BETWEEN 50 AND 150;
-- equivale a: preco >= 50 AND preco <= 150

SELECT * FROM pedidos WHERE data_pedido BETWEEN '2024-03-01' AND '2024-06-30';
```

## 5. LIKE: busca por padrão de texto

Dois curingas:

- `%` = qualquer quantidade de caracteres (inclusive nenhum)
- `_` = exatamente um caractere

```sql
SELECT nome FROM clientes WHERE nome LIKE 'A%';       -- começa com A
SELECT nome FROM clientes WHERE nome LIKE '%Lima';    -- termina com Lima
SELECT nome FROM produtos WHERE nome LIKE '%de%';     -- contém "de"
SELECT estado FROM clientes WHERE estado LIKE '_J';   -- 2 letras, a segunda é J
```

> No SQLite e no MySQL, `LIKE` não diferencia maiúsculas de minúsculas (para letras sem acento). No PostgreSQL diferencia; lá se usa `ILIKE` para ignorar.

## 6. NULL: o valor ausente

`NULL` significa "não se sabe / não existe". O cliente Diego não tem email: o valor é `NULL`.

**NULL não é igual a nada, nem a outro NULL.** Por isso `= NULL` nunca funciona:

```sql
SELECT nome FROM clientes WHERE email = NULL;    -- ❌ não retorna nada
SELECT nome FROM clientes WHERE email IS NULL;   -- ✅ Diego
SELECT nome FROM clientes WHERE email IS NOT NULL;
```

Qualquer conta com NULL dá NULL: `5 + NULL` é `NULL`. Para trocar NULL por um valor padrão, use `COALESCE`:

```sql
SELECT nome, COALESCE(email, 'sem email') AS email
FROM clientes;
```

## 7. Ordem de escrita até agora

```sql
SELECT ...
FROM ...
WHERE ...
LIMIT ...;
```

---

## Exercícios

1. Liste nome e preço dos produtos que custam mais de 150.
2. Liste os clientes de São Paulo (use a coluna `cidade`).
3. Liste os pedidos com status `'pendente'`.
4. Liste produtos da categoria 4 (Esportes) com estoque maior que zero.
5. Liste clientes dos estados RJ, PR ou BA usando `IN`.
6. Liste produtos com preço entre 80 e 200 (inclusive).
7. Liste pedidos feitos no segundo semestre de 2024 (de julho a dezembro).
8. Liste clientes cujo nome termina em "s".
9. Liste produtos que tenham "Mouse" ou "Teclado" no nome.
10. Liste clientes sem email cadastrado.
11. Liste pedidos que **não** estão entregues nem cancelados.
12. Desafio: liste os produtos que são (livros com preço abaixo de 100) ou (qualquer produto com estoque acima de 50).

Respostas: [`respostas/aula-03.sql`](../respostas/aula-03.sql)

---

## Resumo

| Quero... | Use |
|----------|-----|
| comparar | `= <> > < >= <=` |
| combinar condições | `AND`, `OR`, `NOT` (+ parênteses!) |
| um de vários valores | `IN ('a', 'b')` |
| intervalo | `BETWEEN x AND y` (inclusivo) |
| padrão de texto | `LIKE 'A%'` (`%` = vários, `_` = um) |
| valor vazio | `IS NULL` / `IS NOT NULL` (nunca `= NULL`) |
| substituir NULL | `COALESCE(coluna, 'padrão')` |

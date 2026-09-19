# Aula 05 — Agregação: COUNT, SUM, AVG, GROUP BY e HAVING

Até agora cada linha da tabela virava uma linha no resultado. **Funções de agregação** fazem o contrário: juntam várias linhas em **um único valor** (um total, uma média, uma contagem).

## 1. As 5 funções de agregação

| Função | Retorna |
|--------|---------|
| `COUNT(*)` | quantidade de linhas |
| `COUNT(coluna)` | quantidade de valores **não nulos** na coluna |
| `SUM(coluna)` | soma |
| `AVG(coluna)` | média |
| `MIN(coluna)` / `MAX(coluna)` | menor / maior valor |

```sql
SELECT COUNT(*)      AS total_produtos,
       SUM(estoque)  AS unidades_em_estoque,
       AVG(preco)    AS preco_medio,
       MIN(preco)    AS mais_barato,
       MAX(preco)    AS mais_caro
FROM produtos;
```

Diferença importante:

```sql
SELECT COUNT(*) FROM clientes;       -- 8 (conta linhas)
SELECT COUNT(email) FROM clientes;   -- 7 (ignora o NULL do Diego)
SELECT COUNT(DISTINCT estado) FROM clientes;  -- 5 estados diferentes
```

Funções de agregação **ignoram NULL** (exceto `COUNT(*)`).

Combinando com `WHERE` (o filtro acontece **antes** de agregar):

```sql
SELECT COUNT(*) AS pedidos_entregues
FROM pedidos
WHERE status = 'entregue';
```

## 2. GROUP BY: agregando por grupo

E se eu quiser a contagem **de cada** status? Aí entra o `GROUP BY`: ele separa as linhas em grupos e aplica a agregação em cada grupo.

```sql
SELECT status, COUNT(*) AS quantidade
FROM pedidos
GROUP BY status;
```

Resultado:

| status | quantidade |
|--------|-----------|
| cancelado | 1 |
| entregue | 5 |
| enviado | 2 |
| pendente | 2 |

Imagine o banco fazendo pilhas: uma pilha para cada status, depois conta cada pilha.

Mais exemplos:

```sql
-- Quantos clientes por estado
SELECT estado, COUNT(*) AS clientes
FROM clientes
GROUP BY estado
ORDER BY clientes DESC;

-- Preço médio e estoque total por categoria
SELECT categoria_id,
       ROUND(AVG(preco), 2) AS preco_medio,
       SUM(estoque) AS estoque_total
FROM produtos
GROUP BY categoria_id;

-- Faturamento de cada pedido
SELECT pedido_id,
       SUM(quantidade * preco_unitario) AS total
FROM itens_pedido
GROUP BY pedido_id;
```

Agrupando por várias colunas:

```sql
SELECT estado, cidade, COUNT(*) AS clientes
FROM clientes
GROUP BY estado, cidade;
```

### A regra de ouro do GROUP BY

Toda coluna no `SELECT` precisa estar **no `GROUP BY`** ou **dentro de uma função de agregação**.

```sql
-- ❌ ERRADO: "nome" não está agrupado nem agregado.
-- Qual nome o banco deveria mostrar para o grupo RJ, que tem 3 clientes?
SELECT estado, nome, COUNT(*) FROM clientes GROUP BY estado;
```

O SQLite e o MySQL às vezes aceitam isso e mostram um valor aleatório; PostgreSQL e SQL Server dão erro. Não faça.

## 3. HAVING: filtrando grupos

`WHERE` filtra **linhas antes** de agrupar. `HAVING` filtra **grupos depois** de agregar.

```sql
-- Estados com mais de 1 cliente
SELECT estado, COUNT(*) AS clientes
FROM clientes
GROUP BY estado
HAVING COUNT(*) > 1;
```

Você **não pode** usar `WHERE COUNT(*) > 1`: quando o `WHERE` roda, as contagens ainda não existem.

Os dois juntos:

```sql
-- Entre os pedidos não cancelados, clientes com 2 ou mais pedidos
SELECT cliente_id, COUNT(*) AS pedidos
FROM pedidos
WHERE status <> 'cancelado'      -- 1º: tira as linhas canceladas
GROUP BY cliente_id              -- 2º: agrupa
HAVING COUNT(*) >= 2;            -- 3º: filtra os grupos
```

## 4. A ordem de execução (importantíssimo!)

Você **escreve** nesta ordem:

```
SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
```

Mas o banco **executa** nesta:

```
1. FROM       (pega a tabela)
2. WHERE      (filtra linhas)
3. GROUP BY   (forma grupos)
4. HAVING     (filtra grupos)
5. SELECT     (calcula colunas e apelidos)
6. ORDER BY   (ordena)
7. LIMIT      (corta)
```

Isso explica muita coisa: por exemplo, por que em muitos bancos não dá para usar no `WHERE` um apelido criado no `SELECT` (o `SELECT` ainda não rodou), mas dá para usar no `ORDER BY`.

---

## Exercícios

1. Quantos pedidos existem no total?
2. Qual o valor total em estoque da loja (soma de preço × estoque)?
3. Qual o preço médio dos produtos da categoria Livros (id 2), arredondado para 2 casas?
4. Qual a data do primeiro e do último pedido?
5. Quantos clientes têm email cadastrado?
6. Mostre quantos produtos existem em cada categoria (`categoria_id`).
7. Mostre quantos pedidos cada cliente fez (`cliente_id`), do que mais pediu para o que menos pediu.
8. Mostre o valor total de cada pedido, ordenado do maior para o menor.
9. Mostre a quantidade total vendida de cada produto (`produto_id`), considerando todos os pedidos.
10. Mostre as categorias cujo preço médio é maior que 150.
11. Mostre os pedidos cujo valor total passa de 300.
12. Mostre quantos pedidos foram feitos em cada mês de 2024 (use `STRFTIME`).
13. Desafio: por status, mostre a quantidade de pedidos e a data do pedido mais recente, apenas para status com mais de 1 pedido.

Respostas: [`respostas/aula-05.sql`](../respostas/aula-05.sql)

---

## Resumo

```sql
SELECT coluna_grupo, COUNT(*), SUM(x), AVG(x)
FROM tabela
WHERE filtro_de_linhas
GROUP BY coluna_grupo
HAVING filtro_de_grupos
ORDER BY ...;
```

- `COUNT SUM AVG MIN MAX` transformam várias linhas em um valor; ignoram NULL (menos `COUNT(*)`).
- `GROUP BY` faz a agregação para cada grupo.
- Regra de ouro: coluna no `SELECT` = está no `GROUP BY` ou numa agregação.
- `WHERE` filtra linhas (antes); `HAVING` filtra grupos (depois).
- Ordem de execução: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.

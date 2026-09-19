# Aula 04 — ORDER BY, CASE e funções

## 1. Ordenando com ORDER BY

```sql
SELECT nome, preco FROM produtos ORDER BY preco;        -- crescente (padrão)
SELECT nome, preco FROM produtos ORDER BY preco DESC;   -- decrescente
```

- `ASC` = crescente (padrão, pode omitir). `DESC` = decrescente.
- Texto é ordenado alfabeticamente; datas `'AAAA-MM-DD'`, cronologicamente.

Ordenando por mais de uma coluna (a segunda desempata a primeira):

```sql
SELECT nome, estado, cidade
FROM clientes
ORDER BY estado, nome;        -- por estado; dentro do estado, por nome
```

Pode ordenar por apelido ou cálculo:

```sql
SELECT nome, preco * estoque AS valor_estoque
FROM produtos
ORDER BY valor_estoque DESC;
```

### Top N

`ORDER BY` + `LIMIT` = "os N maiores/menores":

```sql
-- 3 produtos mais caros
SELECT nome, preco
FROM produtos
ORDER BY preco DESC
LIMIT 3;
```

## 2. CASE: "se... então..." dentro do SQL

```sql
SELECT nome,
       preco,
       CASE
           WHEN preco < 50  THEN 'barato'
           WHEN preco < 200 THEN 'médio'
           ELSE 'caro'
       END AS faixa_preco
FROM produtos;
```

O `CASE` testa os `WHEN` em ordem e para no primeiro verdadeiro. Se nenhum for verdadeiro e não houver `ELSE`, resulta `NULL`.

Forma curta, quando compara uma coluna com valores fixos:

```sql
SELECT id,
       CASE status
           WHEN 'entregue'  THEN '✅'
           WHEN 'cancelado' THEN '❌'
           ELSE '⏳'
       END AS situacao
FROM pedidos;
```

## 3. Funções de texto

| Função | Faz | Exemplo → resultado |
|--------|-----|---------------------|
| `UPPER(t)` | maiúsculas | `UPPER('ana')` → `ANA` |
| `LOWER(t)` | minúsculas | `LOWER('ANA')` → `ana` |
| `LENGTH(t)` | nº de caracteres | `LENGTH('SQL')` → `3` |
| `SUBSTR(t, início, qtd)` | pedaço do texto | `SUBSTR('Petróleo', 1, 3)` → `Pet` |
| `TRIM(t)` | tira espaços das pontas | `TRIM('  oi ')` → `oi` |
| `REPLACE(t, de, para)` | substitui | `REPLACE('a-b', '-', '/')` → `a/b` |
| `INSTR(t, busca)` | posição do trecho | `INSTR('ana@x.com', '@')` → `4` |

```sql
SELECT UPPER(nome) AS nome_maiusculo,
       SUBSTR(email, INSTR(email, '@') + 1) AS dominio
FROM clientes;
```

> Em MySQL/SQL Server `SUBSTRING` também funciona; `LENGTH` no SQL Server é `LEN`.

## 4. Funções numéricas

| Função | Faz |
|--------|-----|
| `ROUND(n, casas)` | arredonda |
| `ABS(n)` | valor absoluto |
| `CAST(x AS INTEGER)` | converte tipo (trunca decimais) |

```sql
SELECT nome, ROUND(preco * 0.85, 2) AS preco_com_15_off
FROM produtos;
```

## 5. Funções de data (SQLite)

O SQLite guarda datas como texto e tem funções para manipulá-las:

```sql
SELECT DATE('now');                          -- data de hoje
SELECT DATE('2024-01-15', '+30 days');       -- soma 30 dias
SELECT STRFTIME('%Y', '2024-01-15');         -- '2024' (ano)
SELECT STRFTIME('%m', '2024-01-15');         -- '01'  (mês)
SELECT JULIANDAY('2024-12-31') - JULIANDAY('2024-01-01');  -- dias entre datas
```

```sql
-- pedidos feitos em março
SELECT * FROM pedidos WHERE STRFTIME('%m', data_pedido) = '03';
```

> Isso varia bastante entre bancos. MySQL: `YEAR(data)`, `MONTH(data)`, `DATEDIFF(a, b)`, `CURDATE()`. PostgreSQL: `EXTRACT(YEAR FROM data)`, `CURRENT_DATE`, `data + INTERVAL '30 days'`.

---

## Exercícios

1. Liste os produtos do mais barato para o mais caro.
2. Liste os clientes em ordem alfabética decrescente.
3. Liste os pedidos do mais recente para o mais antigo.
4. Mostre os 5 produtos com maior estoque.
5. Liste clientes ordenados por estado e, dentro do estado, por cidade.
6. Mostre o produto mais barato (só 1 linha).
7. Mostre nome e uma coluna `situacao_estoque`: `'esgotado'` se estoque = 0, `'baixo'` se menor que 20, `'ok'` caso contrário.
8. Mostre o nome dos clientes em maiúsculas e a quantidade de letras do nome.
9. Mostre nome e as 3 primeiras letras do nome de cada produto (apelido `sigla`), em maiúsculas.
10. Mostre id, data_pedido e o mês do pedido (apelido `mes`).
11. Mostre nome e preço com aumento de 7,5%, arredondado para 2 casas.
12. Desafio: mostre nome, data_cadastro e há quantos dias cada cliente está cadastrado até '2024-12-31', do mais antigo para o mais novo.

Respostas: [`respostas/aula-04.sql`](../respostas/aula-04.sql)

---

## Resumo

```sql
SELECT nome,
       CASE WHEN x THEN 'a' ELSE 'b' END AS categoria,
       UPPER(nome), ROUND(preco, 2)
FROM tabela
WHERE ...
ORDER BY coluna1 DESC, coluna2
LIMIT 5;
```

- `ORDER BY` ordena (`ASC` padrão, `DESC` inverso); várias colunas = desempate.
- `ORDER BY ... LIMIT n` = top N.
- `CASE WHEN ... THEN ... ELSE ... END` cria valores condicionais.
- Funções de texto: `UPPER LOWER LENGTH SUBSTR TRIM REPLACE`. Números: `ROUND ABS CAST`.
- Datas mudam de banco para banco — no SQLite: `DATE`, `STRFTIME`, `JULIANDAY`.

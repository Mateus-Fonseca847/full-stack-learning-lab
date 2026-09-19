# Aula 02 — SELECT: consultando dados

## 1. A estrutura básica

```sql
SELECT colunas
FROM tabela;
```

`SELECT` diz **o que** você quer ver. `FROM` diz **de onde** vem.

### Todas as colunas

```sql
SELECT * FROM produtos;
```

O `*` significa "todas as colunas". É ótimo para explorar, mas em código de verdade prefira listar as colunas: fica mais claro e mais rápido.

### Colunas específicas

```sql
SELECT nome, preco
FROM produtos;
```

As colunas aparecem na ordem em que você escreveu.

## 2. Apelidos (alias) com AS

Você pode renomear uma coluna no resultado:

```sql
SELECT nome AS produto,
       preco AS valor
FROM produtos;
```

O `AS` é opcional (`SELECT nome produto`), mas usá-lo deixa mais legível. Se o apelido tiver espaço, use aspas duplas: `AS "preço em reais"`.

## 3. Cálculos nas colunas

O `SELECT` pode calcular valores na hora, sem alterar a tabela:

```sql
SELECT nome,
       preco,
       estoque,
       preco * estoque AS valor_em_estoque
FROM produtos;
```

Operadores: `+`, `-`, `*`, `/` e `%` (resto da divisão).

> Pegadinha: no SQLite (e no SQL Server/PostgreSQL), dividir inteiro por inteiro dá inteiro: `7 / 2` resulta `3`. Para ter `3.5`, use um decimal: `7 / 2.0` ou `7 * 1.0 / 2`.

Também dá para juntar textos (concatenar) com `||`:

```sql
SELECT nome || ' - ' || cidade AS cliente_cidade
FROM clientes;
```

> Em MySQL use `CONCAT(nome, ' - ', cidade)`. O `CONCAT` também existe em PostgreSQL e SQL Server.

## 4. Removendo repetições com DISTINCT

```sql
SELECT estado FROM clientes;           -- RJ aparece 3 vezes
SELECT DISTINCT estado FROM clientes;  -- cada estado aparece 1 vez
```

Com várias colunas, o `DISTINCT` considera a **combinação**:

```sql
SELECT DISTINCT cidade, estado FROM clientes;
```

## 5. Limitando a quantidade de linhas

```sql
SELECT nome, preco
FROM produtos
LIMIT 5;             -- só as 5 primeiras linhas
```

`LIMIT 5 OFFSET 5` pula 5 e traz as próximas 5 (útil para paginação).

> Em SQL Server usa-se `SELECT TOP 5 nome FROM produtos;`. Em Oracle, `FETCH FIRST 5 ROWS ONLY`.

Obs.: sem `ORDER BY` (aula 04), a ordem das linhas não é garantida. "As 5 primeiras" significa "5 quaisquer".

## 6. SELECT sem tabela

Serve como calculadora e para testar funções:

```sql
SELECT 10 + 5 * 2;         -- 20
SELECT 'Olá, SQL!';
```

---

## Exercícios

1. Mostre todas as colunas da tabela `clientes`.
2. Mostre apenas `nome` e `email` dos clientes.
3. Mostre o nome dos produtos com o apelido `produto` e o preço com o apelido `preco_atual`.
4. Mostre nome, preço e o preço com 10% de desconto (apelido `preco_promocional`).
5. Liste as cidades dos clientes sem repetição.
6. Mostre os diferentes status de pedido que existem.
7. Mostre só os 3 primeiros produtos da tabela.
8. Mostre uma coluna `descricao` no formato `Fone Bluetooth custa R$ 199.9`.
9. Mostre nome, estoque e quantas "caixas de 12" dá para montar com o estoque de cada produto (divisão inteira) e quanto sobra (`%`).
10. Desafio: calcule, sem tabela, quanto é 20% de 350.

Respostas: [`respostas/aula-02.sql`](../respostas/aula-02.sql)

---

## Resumo

```sql
SELECT coluna1, coluna2 AS apelido, coluna3 * 2 AS calculo
FROM tabela
LIMIT 10;
```

- `*` = todas as colunas. Prefira nomear as colunas.
- `AS` dá apelido; aceita cálculos (`+ - * / %`) e concatenação (`||`).
- `DISTINCT` remove linhas repetidas.
- `LIMIT n` limita o resultado; `OFFSET n` pula linhas.
- Cuidado: inteiro / inteiro = inteiro.

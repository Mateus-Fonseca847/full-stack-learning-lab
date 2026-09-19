# Aula 10 — Projeto final e próximos passos

Parabéns por chegar aqui! Agora você vai agir como analista de dados da loja. O gerente mandou uma lista de perguntas. Responda cada uma com **uma** consulta (CTEs são bem-vindas). Todas usam só o que você já aprendeu.

> Rode `banco/loja.sql` antes, para trabalhar com os dados originais.

## Relatório para o gerente

**Visão geral**

1. Qual o faturamento total da loja, desconsiderando pedidos cancelados?
2. Qual o ticket médio (valor médio por pedido), desconsiderando cancelados?
3. Quantos pedidos existem em cada status, e qual porcentagem cada status representa do total?

**Produtos**

4. Ranking de produtos por faturamento (nome, categoria, unidades vendidas, faturamento), sem cancelados.
5. Quais produtos estão com estoque baixo (menos de 20 unidades) **e** já venderam alguma vez? Eles precisam de reposição.
6. Qual categoria mais faturou?

**Clientes**

7. Para cada cliente: nome, número de pedidos, valor total gasto e data da última compra (inclua quem nunca comprou, com 0).
8. Classifique os clientes: `'VIP'` se gastaram mais de 1000, `'Regular'` se gastaram algo, `'Inativo'` se nunca compraram (sem cancelados).
9. Quais estados geram mais faturamento?

**Tempo**

10. Faturamento por mês de 2024 (sem cancelados), em ordem cronológica.
11. Quantos dias, em média, se passaram entre o cadastro do cliente e o primeiro pedido dele?

Respostas: [`respostas/aula-10.sql`](../respostas/aula-10.sql)

---

## Próximos passos (depois do básico)

Quando estiver confortável com tudo acima, estude nesta ordem:

**1. Funções de janela (window functions).** Permitem fazer cálculos "por grupo" sem juntar as linhas, como ranking e acumulados. Um gostinho:

```sql
SELECT nome,
       categoria_id,
       preco,
       RANK() OVER (PARTITION BY categoria_id ORDER BY preco DESC) AS posicao_na_categoria
FROM produtos;
```

Palavras-chave para pesquisar: `OVER`, `PARTITION BY`, `ROW_NUMBER`, `RANK`, `LAG`, `LEAD`, `SUM() OVER`.

**2. Um banco "de verdade".** Instale o **PostgreSQL** (ou MySQL) e refaça o curso lá. Você vai sentir as diferenças de tipos e funções — ótimo aprendizado.

**3. Performance.** `EXPLAIN` / `EXPLAIN QUERY PLAN` e índices.

**4. Modelagem e normalização.** Formas normais (1FN, 2FN, 3FN) e diagramas entidade-relacionamento.

**5. Pratique muito.** Sites com exercícios: HackerRank (seção SQL), LeetCode (Database), SQLZoo, e o jogo *SQL Murder Mystery*.

---

## Checklist do que você aprendeu

- [ ] Explico o que são tabela, linha, coluna, chave primária e estrangeira
- [ ] `SELECT`, `AS`, `DISTINCT`, `LIMIT`
- [ ] `WHERE` com `AND/OR`, `IN`, `BETWEEN`, `LIKE`, `IS NULL`
- [ ] `ORDER BY`, `CASE`, funções de texto, número e data
- [ ] `COUNT/SUM/AVG/MIN/MAX`, `GROUP BY`, `HAVING`
- [ ] Sei a ordem de execução de uma consulta
- [ ] `INNER JOIN`, `LEFT JOIN`, joins com 3+ tabelas
- [ ] Subconsultas, `EXISTS`, CTEs com `WITH`
- [ ] `CREATE TABLE` com restrições, `ALTER`, `DROP`, views e índices
- [ ] `INSERT`, `UPDATE`, `DELETE` com segurança, transações

Marque no VS Code trocando `[ ]` por `[x]`.

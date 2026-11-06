# Curso de SQL do Zero

Esta pasta reúne um curso prático de SQL construído para desenvolver uma base sólida na linguagem, do primeiro SELECT até consultas com várias tabelas. O material foi criado com a ajuda de inteligência artificial (IA), que gerou as aulas, os exercícios e os gabaritos, e serve como registro do meu processo de estudo.

## O que o curso cobre

São 10 aulas, cada uma com teoria, exemplos, exercícios e um resumo final:

1. Introdução a bancos de dados e SQL
2. SELECT
3. Filtros com WHERE
4. Ordenação, CASE e funções
5. Agregação com GROUP BY e HAVING
6. JOINs
7. Subconsultas e CTEs
8. Criação de tabelas (DDL)
9. Inserção, alteração e exclusão de dados (DML) e transações
10. Projeto final

## Estrutura

- `aulas/`: o conteúdo de cada aula em Markdown
- `banco/loja.sql`: script que cria o banco de prática, uma loja virtual com clientes, produtos, categorias e pedidos
- `respostas/`: gabaritos comentados dos exercícios

## Como usar

O curso usa SQLite, que não precisa de servidor. No VS Code, instale a extensão SQLite (autor alexcvzz), crie um arquivo vazio `banco/loja.db` e execute o script `banco/loja.sql` com o comando "SQLite: Run Query". Depois disso, basta seguir as aulas em ordem e tentar resolver os exercícios antes de conferir as respostas.

Tudo o que é ensinado aqui também vale para MySQL, PostgreSQL e SQL Server, com pequenas diferenças que estão anotadas nas aulas.

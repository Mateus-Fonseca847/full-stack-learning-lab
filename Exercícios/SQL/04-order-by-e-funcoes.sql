-- 1. Liste os produtos do mais barato para o mais caro.
  SELECT nome, preco FROM produtos ORDER BY preco; 
-- 2. Liste os clientes em ordem alfabética decrescente.
  SELECT nome FROM clientes ORDER BY nome DESC;
-- 3. Liste os pedidos do mais recente para o mais antigo.
  SELECT data_pedido FROM pedidos ORDER BY data_pedido DESC;
-- 4. Mostre os 5 produtos com maior estoque.
  SELECT nome, estoque FROM produtos ORDER  BY estoque DESC LIMIT 5;
-- 5. Liste clientes ordenados por estado e, dentro do estado, por cidade.
  SELECT nome, estado, cidade FROM clientes ORDER BY estado, cidade;
-- 7. Mostre nome e uma coluna `situacao_estoque`: `'esgotado'` se estoque = 0, `'baixo'` se menor que 20, `'ok'` caso contrário.
  SELECT nome, estoque, 
  CASE
    WHEN estoque = 0 THEN 'esgotado'
    WHEN estoque < 20 THEN 'baixo'
    ELSE 'ok'
  END AS situacao_estoque
  FROM produtos ORDER BY estoque DESC;
-- 8. Mostre o nome dos clientes em maiúsculas e a quantidade de letras do nome.
  SELECT UPPER(nome) AS nome_maiusculas, LENGTH(nome) AS tamanho_nome FROM clientes;
-- 9. Mostre nome e as 3 primeiras letras do nome de cada produto (apelido `sigla`), em maiúsculas.
  SELECT UPPER(SUBSTR(REPLACE(nome,' ', ''), 1, 3)) AS sigla FROM produtos;
-- 11. Mostre nome e preço com aumento de 7,5%, arredondado para 2 casas.
  SELECT nome, ROUND(preco * 107.5/100, 2) FROM produtos;
-- 12. Desafio: mostre nome, data_cadastro e há quantos dias cada cliente está cadastrado até '2024-12-31', do mais antigo para o mais novo.
  SELECT nome, data_cadastro, JULIANDAY('2026-09-20') - JULIANDAY(data_cadastro) AS dias_cadastrados FROM clientes ORDER BY dias_cadastrados DESC;
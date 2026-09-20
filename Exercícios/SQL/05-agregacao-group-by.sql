-- 1. Quantos pedidos existem no total?
  SELECT COUNT(*) AS total_de_pedidos FROM pedidos;
-- 2. Qual o valor total em estoque da loja (soma de preço × estoque)?
  SELECT SUM(estoque * preco) AS estoque_total FROM produtos;
-- 3. Qual o preço médio dos produtos da categoria Livros (id 2), arredondado para 2 casas?
  SELECT ROUND(AVG(preco), 2) AS media_livros FROM produtos WHERE categoria_id = 2 ;  
-- 4. Qual a data do primeiro e do último pedido?
  SELECT MIN(data_pedido) AS primeiro_pedido, MAX(data_pedido) AS ultimo_pedido FROM pedidos;
-- 5. Quantos clientes têm email cadastrado?
  SELECT COUNT(email) AS clientes_com_email FROM clientes WHERE email IS NOT NULL;
-- 6. Mostre quantos produtos existem em cada categoria (`categoria_id`).
  SELECT categoria_id, COUNT(nome) AS quantidade_produtos FROM produtos GROUP BY categoria_id;
-- 7. Mostre quantos pedidos cada cliente fez (`cliente_id`), do que mais pediu para o que menos pediu.
SELECT cliente_id, COUNT(id) AS numero_pedidos FROM pedidos GROUP BY cliente_id;
-- 8. Mostre o valor total de cada pedido, ordenado do maior para o menor.
SELECT pedido_id, quantidade * preco_unitario AS valor_pedido FROM itens_pedido ORDER BY valor_pedido DESC;
-- 9. Mostre a quantidade total vendida de cada produto (`produto_id`), considerando todos os pedidos.
SELECT produto_id, SUM(quantidade) FROM itens_pedido GROUP BY produto_id ORDER BY produto_id;
-- 10. Mostre as categorias cujo preço médio é maior que 150.
-- 11. Mostre os pedidos cujo valor total passa de 300.
-- 12. Mostre quantos pedidos foram feitos em cada mês de 2024 (use `STRFTIME`).
-- 13. Desafio: por status, mostre a quantidade de pedidos e a data do pedido mais recente, apenas para status com mais de 1 pedido.

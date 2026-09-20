-- 1. Liste nome e preço dos produtos que custam mais de 150.
  SELECT nome, preco FROM produtos WHERE preco > 150;
-- 2. Liste os clientes de São Paulo (use a coluna `cidade`).
  SELECT nome FROM clientes WHERE cidade = 'São Paulo';
-- 3. Liste os pedidos com status `'pendente'`.
  SELECT id FROM pedidos WHERE status = 'pendente';
-- 4. Liste produtos da categoria 4 (Esportes) com estoque maior que zero.
  SELECT nome FROM produtos WHERE categoria_id = 4 AND estoque > 0;
-- 5. Liste clientes dos estados RJ, PR ou BA usando `IN`.
  SELECT nome FROM clientes WHERE estado IN ('RJ', 'PR', 'BA');
-- 6. Liste produtos com preço entre 80 e 200 (inclusive).
  SELECT nome FROM produtos WHERE preco BETWEEN 80 AND 200;
-- 7. Liste pedidos feitos no segundo semestre de 2024 (de julho a dezembro).
  SELECT id FROM pedidos WHERE data_pedido BETWEEN '2024-07-01' AND '2024-12-31';
-- 8. Liste clientes cujo nome termina em "s".
  SELECT nome FROM clientes WHERE nome LIKE '%s';
-- 9. Liste produtos que tenham "Mouse" ou "Teclado" no nome.
  SELECT nome FROM produtos WHERE nome LIKE '%mouse%' OR nome LIKE '%teclado%';
-- 10. Liste clientes sem email cadastrado.
  SELECT * FROM clientes WHERE email IS NULL;
-- 11. Liste pedidos que **não** estão entregues nem cancelados.
  SELECT * FROM pedidos WHERE status != 'entregue' AND status != 'cancelado'; 
-- 12. Desafio: liste os produtos que são (livros com preço abaixo de 100) ou (qualquer produto com estoque acima de 50).
  SELECT nome FROM produtos WHERE preco < 100 AND categoria_id = 2 OR estoque > 50;
-- 1)Mostre todas as colunas da tabela clientes.
  SELECT * FROM clientes;
-- 2)Mostre apenas nome e email dos clientes.
  SELECT nome, email FROM clientes;
-- 3)Mostre o nome dos produtos com o apelido produto e o preço com o apelido preco_atual.
  SELECT nome AS produto, preco AS preco_atual FROM produtos;
-- 4)Mostre nome, preço e o preço com 10% de desconto (apelido preco_promocional).
  SELECT nome, preco, preco * 90/100 AS preco_promocional FROM produtos;
-- 5)Liste as cidades dos clientes sem repetição.
  SELECT DISTINCT cidade FROM clientes;
-- 6)Mostre os diferentes status de pedido que existem.
  SELECT DISTINCT status FROM pedidos;
-- 7)Mostre só os 3 primeiros produtos da tabela.
  SELECT nome FROM produtos LIMIT 3;
-- 8)Mostre uma coluna descricao no formato Fone Bluetooth custa R$ 199.9.
  SELECT nome || " custa " || preco AS descricao FROM produtos;
-- 9)Mostre nome, estoque e quantas "caixas de 12" dá para montar com o estoque de cada produto (divisão inteira) e quanto sobra (%).
  SELECT nome, estoque, estoque / 12 AS caixas_de_12, estoque % 12 AS sobra FROM produtos;
-- 10)Desafio: calcule, sem tabela, quanto é 20% de 350.
  SELECT 20.0/100 * 350;
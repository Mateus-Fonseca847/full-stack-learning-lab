-- 1) Com suas palavras, qual a diferença entre chave primária e chave estrangeira?
 
-- R: Cada tabela possui uma única chave primária, serve para identificar uma linha inteira. Uma chave estrangeira serve para identificar um outro item de outra tabela, num exemplo de uma venda em um E-commerce, o id dessa venda seria uma chave primária, os ids dos produtos seriam chaves estrangeiras.

-- 2) Na tabela itens_pedido, quais colunas são chaves estrangeiras e para quais tabelas elas apontam?

/* R: pedido_id -> chave estrangeira que aponta para a coluna id da tabela pedidos;  
      produto_id -> chave estrangeira que aponta para a coluna id da tabela produtos;
      Vale ressaltar que a união dessas duas chaves estrangeiras, formam a chave primária da tabela itens_pedido.
*/

-- 3) Liste todas as tabelas do banco loja usando o comando da seção 5.

SELECT name FROM sqlite_master WHERE type = 'table';
/* R: O banco loja possui 5 tabelas:
      categorias, produtos, clientes, pedidos e itens_pedido.
*/

-- 4) Veja as colunas da tabela pedidos com PRAGMA table_info. Quais colunas não aceitam valor vazio (notnull = 1)?

PRAGMA table_info(pedidos);
-- R: cliente_id, data_pedido & status 


-- 5) Por que a tabela pedidos guarda cliente_id em vez do nome do cliente?

/* R: O nome do cliente seria uma chave primária muito fraca, já que pode ser repetido, portanto, cliente_id se torna uma identificação muito mais forte e necessária para identificar cada  cliente */

-- 6) Execute SELECT * FROM categorias;. Quantas categorias existem?

SELECT * FROM categorias;
-- R: Existem 5 categorias, Eletrônicos, Livros, Casa, Esportes & Brinquedos
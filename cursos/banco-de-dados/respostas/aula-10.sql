-- ==================== RESPOSTAS — AULA 10 (PROJETO FINAL) ====================
-- Rode banco/loja.sql antes. Existem várias soluções corretas para cada item!

-- 1. Faturamento total (sem cancelados)
SELECT ROUND(SUM(ip.quantidade * ip.preco_unitario), 2) AS faturamento
FROM itens_pedido ip
JOIN pedidos pe ON pe.id = ip.pedido_id
WHERE pe.status <> 'cancelado';

-- 2. Ticket médio: primeiro total por pedido, depois a média
WITH totais AS (
    SELECT pe.id, SUM(ip.quantidade * ip.preco_unitario) AS total
    FROM pedidos pe
    JOIN itens_pedido ip ON ip.pedido_id = pe.id
    WHERE pe.status <> 'cancelado'
    GROUP BY pe.id
)
SELECT ROUND(AVG(total), 2) AS ticket_medio FROM totais;

-- 3. Pedidos por status com porcentagem (100.0 evita divisão inteira)
SELECT status,
       COUNT(*) AS qtd,
       ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM pedidos), 1) AS percentual
FROM pedidos
GROUP BY status
ORDER BY qtd DESC;

-- 4. Ranking de produtos por faturamento
SELECT pr.nome,
       c.nome AS categoria,
       SUM(ip.quantidade) AS unidades,
       ROUND(SUM(ip.quantidade * ip.preco_unitario), 2) AS faturamento
FROM itens_pedido ip
JOIN pedidos pe   ON pe.id = ip.pedido_id
JOIN produtos pr  ON pr.id = ip.produto_id
JOIN categorias c ON c.id = pr.categoria_id
WHERE pe.status <> 'cancelado'
GROUP BY pr.id, pr.nome, c.nome
ORDER BY faturamento DESC;

-- 5. Estoque baixo e já vendidos
SELECT nome, estoque
FROM produtos
WHERE estoque < 20
  AND id IN (SELECT produto_id FROM itens_pedido)
ORDER BY estoque;

-- 6. Categoria que mais faturou
SELECT c.nome,
       ROUND(SUM(ip.quantidade * ip.preco_unitario), 2) AS faturamento
FROM itens_pedido ip
JOIN pedidos pe   ON pe.id = ip.pedido_id
JOIN produtos pr  ON pr.id = ip.produto_id
JOIN categorias c ON c.id = pr.categoria_id
WHERE pe.status <> 'cancelado'
GROUP BY c.id, c.nome
ORDER BY faturamento DESC
LIMIT 1;

-- 7. Resumo por cliente, incluindo quem nunca comprou.
--    Truque: o filtro de status vai no ON (e não no WHERE) para não perder
--    as linhas do LEFT JOIN. COALESCE troca o NULL por 0.
WITH totais_pedido AS (
    SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
    FROM itens_pedido
    GROUP BY pedido_id
)
SELECT cl.nome,
       COUNT(pe.id)                    AS pedidos,
       COALESCE(ROUND(SUM(t.total), 2), 0) AS total_gasto,
       MAX(pe.data_pedido)             AS ultima_compra
FROM clientes cl
LEFT JOIN pedidos pe       ON pe.cliente_id = cl.id AND pe.status <> 'cancelado'
LEFT JOIN totais_pedido t  ON t.pedido_id = pe.id
GROUP BY cl.id, cl.nome
ORDER BY total_gasto DESC;

-- 8. Classificação de clientes
WITH gasto AS (
    SELECT cl.id, cl.nome,
           COALESCE(SUM(ip.quantidade * ip.preco_unitario), 0) AS total
    FROM clientes cl
    LEFT JOIN pedidos pe      ON pe.cliente_id = cl.id AND pe.status <> 'cancelado'
    LEFT JOIN itens_pedido ip ON ip.pedido_id = pe.id
    GROUP BY cl.id, cl.nome
)
SELECT nome,
       ROUND(total, 2) AS total,
       CASE
           WHEN total > 1000 THEN 'VIP'
           WHEN total > 0    THEN 'Regular'
           ELSE 'Inativo'
       END AS classificacao
FROM gasto
ORDER BY total DESC;

-- 9. Faturamento por estado
SELECT cl.estado,
       ROUND(SUM(ip.quantidade * ip.preco_unitario), 2) AS faturamento
FROM clientes cl
JOIN pedidos pe      ON pe.cliente_id = cl.id
JOIN itens_pedido ip ON ip.pedido_id = pe.id
WHERE pe.status <> 'cancelado'
GROUP BY cl.estado
ORDER BY faturamento DESC;

-- 10. Faturamento por mês
SELECT STRFTIME('%Y-%m', pe.data_pedido) AS mes,
       ROUND(SUM(ip.quantidade * ip.preco_unitario), 2) AS faturamento
FROM pedidos pe
JOIN itens_pedido ip ON ip.pedido_id = pe.id
WHERE pe.status <> 'cancelado'
  AND STRFTIME('%Y', pe.data_pedido) = '2024'
GROUP BY mes
ORDER BY mes;

-- 11. Dias entre cadastro e primeiro pedido (média)
WITH primeiro AS (
    SELECT cliente_id, MIN(data_pedido) AS primeiro_pedido
    FROM pedidos
    GROUP BY cliente_id
)
SELECT ROUND(AVG(JULIANDAY(p.primeiro_pedido) - JULIANDAY(c.data_cadastro)), 1) AS media_dias
FROM primeiro p
JOIN clientes c ON c.id = p.cliente_id;

//ex. 1 
function verificaDesconto(valorCompra) {
  if(valorCompra>100){
    console.log(`Você está apto a receber o desconto, o valor da sua compra foi de: ${valorCompra * 90/100}`)
  } else{
    console.log(`Você não está apto a receber o desconto, o valor da sua compra foi de: ${valorCompra}`)
  }

};
//verificaDesconto(90);

//ex.2 
let estoque = {
  produto: "tenis",
  quantidade: 10,
  valor: 30,
};
function verificarEstoque(){
  if(estoque.quantidade > 0){
    console.log(`O produto ainda possui ${estoque.quantidade} itens disponíveis`)
  } else{
    console.log(`O produto não está disponível`)
  }
};
//verificarEstoque();

//ex.3
let clientes = [
  {
    nome: "Mateus",
    pontuacao: 88
  },
  {
    nome: "Robson",
    pontuacao: 60
  },
  {
    nome: "Lurdinha",
    pontuacao: 27
  }
]
function categoriaclientes(){
  for(let cliente of clientes){
    if(cliente.pontuacao>=85){
      console.log(`Obrigado, ${cliente.nome}, você é um cliente premium`)
    } else if(cliente.pontuacao>=50 && cliente.pontuacao<85){
      console.log(`Obrigado, ${cliente.nome}, você é um cliente regular`)
    } else{
      console.log(`Obrigado, ${cliente.nome}, você é um cliente comum`)
    }
  }
}
//categoriaclientes();

//ex. 4
let vendedores = [
  {
    nome: "Paula",
    meta: 1200,
    vendas: 2000
  },
  {
    nome: "Michelly",
    meta: 2000,
    vendas: 1000
  },
  {
    nome: "Gracinha",
    meta: 2000,
    vendas: 1700
  },
]

function desempenhoIndividualDeVendas() {
  for(let vendedora of vendedores){
    let porcentagemDaMeta = (vendedora.vendas/ vendedora.meta) * 100
    if(porcentagemDaMeta >=90 && porcentagemDaMeta <=99){
      console.log(`Parabéns, ${vendedora.nome}!  Muito Bom Desempenho!`)
    } else if (porcentagemDaMeta >=100){
      console.log(`Parabéns, ${vendedora.nome}! Excelente Desempenho!`)
    } else if (porcentagemDaMeta >=80 && porcentagemDaMeta <=89){
      console.log(`Parabéns, ${vendedora.nome}! Bom Desempenho!`)
    } else if (porcentagemDaMeta >=61 && porcentagemDaMeta <=79){
      console.log(`Parabéns, ${vendedora.nome}! Desempenho satisfatório!`)
    } else {
      console.log(`Precisamos melhorar, ${vendedora.nome}, seu desempenho foi de apenas ${porcentagemDaMeta}% da meta estabelecida`)
    }
    
  }
}
//desempenhoIndividualDeVendas();

//ex.1 - FOR & WHILE
let listaVendas = [10, 27, 50, 21, 10, 24]
function FaturamentoSemanal() {
  let vendasDaSemana = 0
  for(i = 0; i < listaVendas.length; i++){
    vendasDaSemana += listaVendas[i]
  }
  console.log(`O valor total de vendas de hamburguer essa semana foi de: ${vendasDaSemana *10}`)
}
//FaturamentoSemanal();

//ex. 2
let cardapio = [
  {
    produto: "carne",
    preco: 24.99,
  },
  {
    produto: "macarrao",
    preco: 17.99,
  },
  {
    produto: "sopa",
    preco: 10,
  },
]

function listarCardapio(){
  for(let item of cardapio){
    console.log(`Item: ${item.produto}, Preço: ${item.preco}`)
  }
}
//listarCardapio();

//ex. 3
const pedidosPendentes = [
"Hambúrguer",
"Batata Frita",
"Refrigerante",
"Milkshake",
];
function realizarEntregas(pedidosPendentes) {
  let pedidoAtual = "";
  console.log("Iniciando entregas:");
  while (pedidosPendentes.length > 0) {
  pedidoAtual = pedidosPendentes.shift(); 
  console.log(`Entregando: ${pedidoAtual}`);
  }
  console.log("Todos os pedidos foram entregues.");
}
realizarEntregas(pedidosPendentes);
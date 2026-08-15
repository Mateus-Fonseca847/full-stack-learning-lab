//ex. 1
//let produtos = ["bola", "camisa", "chuteira"];
//console.log(produtos[1]);
//produtos[2] = "notebook"
//console.log(produtos);

//ex.2
//let clientes = ["mateus", "duda", "edu"]
//clientes[3] = "jana"
//console.log(clientes)
//delete clientes[3]
//console.log(clientes)

//ex. 3
//let produto = {
//  nome: "tenis",
//  quantidade : 3,
//  preço : 32.99,
//}
//
//console.log(produto.nome)
//produto.preço = 329.99
//console.log(produto)

//ex. 4
//let venda = {
  //produto: "shampoo",
  //cliente: "mateus",
  //valor: 20.00
//}

//venda.data = "24/09/2026"
//delete venda.produto
//console.log(venda)

//ex. 5
let Estoque = ["shampoo", "condicionador", "sabonete" ]
NovoEstoque = [...Estoque]
NovoEstoque[0] = "cadarço"
console.log(Estoque)
console.log(NovoEstoque)
//ex. 1
let vendas = {
  produto: "pijama",
  quantidade: 5,
  precoUnitario:29.99,
  desconto: 10/100,
  calcularTotal: function(){
    let valortotal = (vendas.precoUnitario * vendas.quantidade) * 90/100;
    return valortotal;
  },
}
console.log(`O valor final da compra foi de: ${vendas.calcularTotal()}`)

//ex. 2
vendas.valorDesconto = function() {
  let valor = (vendas.precoUnitario * vendas.quantidade) * 10/100;
  return valor;
}

console.log(`O valor bruto do desconto é de $${vendas.valorDesconto()}`);

//ex. 3 
vendas.atualizarQuantidade = function(entrada){
  novaquantidade = entrada + vendas.quantidade;
  return novaquantidade;
}
console.log(`A quantidade em estoque atualizada é de: ${vendas.atualizarQuantidade(15)}`);

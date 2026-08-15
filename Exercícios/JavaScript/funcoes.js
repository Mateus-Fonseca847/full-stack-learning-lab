//ex. 1
function medianotas(nota1, nota2, nota3) {
  let media = (nota1 + nota2 + nota3)/3;
  console.log(`A média do aluno foi de ${media}`);
  return(media)
}
medianotas(5, 4, 3);


//ex. 2
function mediafinal(notapf) {
  let media = medianotas(5, 4, 3);
  let notafinal = (media + notapf)/2
  console.log(`sua media final foi ${notafinal}`)
}
mediafinal(8);

//ex. 3 
function conversaotemperatura(celsius){
  let fahrenheit = ((9/5) * celsius) + 32;
  console.log(`A temperatura em fahrenheit é de: ${fahrenheit}`);
}
conversaotemperatura(30);

//ex. 4
function calculadoraimposto(valorcompra){
  let valortotal = valorcompra + (valorcompra * 8.95 /100);
  console.log(`Na verdade, sua compra teve o valor de: ${valortotal}`);
}
calculadoraimposto(400);
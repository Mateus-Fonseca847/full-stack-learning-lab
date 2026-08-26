//cronômetro de 10 minutos

let segundos = 0
let minutos = 10
const contador = setInterval(function () {
    segundos++
    console.log(`${minutos}m ${segundos}s`)
    if(segundos == 60){
      segundos = 0;
      minutos++
    }else if(minutos ==10){
      console.log("Contagem Finalizada")
      clearInterval(contador)
    }
}, 1000); 

//Função para imprimir mensagem + callback
function imprimirMensagem(mensagem, callback){
  console.log(mensagem);
  callback();
}
imprimirMensagem("Mateus", () => console.log("Esse é seu nome mesmo?"))



const { resolve } = require("dns");
//Função para ler arquivo + callback
const fs = require("fs");
const { NetworkResources } = require("inspector/promises");
const { setDefaultHighWaterMark } = require("stream");
const { promiseHooks } = require("v8");

function lerArquivo(nomeArquivo, callback){
  fs.readFile(nomeArquivo, (err, data) => {

        if (err) {
            return;
        }

        callback(data);

    });

}

lerArquivo("./arquivos_de_suporte/textoExercicio2.txt", (conteudo) => {
    console.log(conteudo.toString());
});

//Criando promise simples
async function criandoPromise(){
  return new Promise((resolve) =>{
    setTimeout(() => {
      console.log("Promise resolvida!")
      resolve();
    }, 1000)
  })
}

criandoPromise()
.then(()=> console.log("Exercício finalizado."))


//Hello, World! com promises
async function saudacao(){
  return new Promise((resolve) =>{
    setTimeout(() => {
      console.log("Hello,")
      resolve();
    }, 1000)
  })
}

async function mundo(){
  return new Promise((resolve) =>{
    setTimeout(() => {
      console.log("World!")
      resolve();
    }, 1000)
  })
}

saudacao()
.then(mundo())

//contagem usando promise all

async function um(){
  return new Promise((resolve) =>{
    setTimeout(() => {
      console.log("um")
      resolve();
    }, 1000)
  })
}

async function dois(){
  return new Promise((resolve) =>{
    setTimeout(() => {
      console.log("dois")
      resolve();
    }, 2000)
  })
}

async function tres(){
  return new Promise((resolve) =>{
    setTimeout(() => {
      console.log("tres")
      resolve();
    }, 3000)
  })
}

Promise.all([um(), dois(), tres()])


//Simular busca de dados em uma API + tratamento de erros
async function dadosAPI(nomeDoUsuario) {
  return new Promise ((resolve, reject) =>{
    setTimeout(() => {
      const buscaFalhou = Math.random() < 0.3;
        if (buscaFalhou) {
          reject("Erro ao buscar os dados da API.");
          return;
        }
      resolve(
        { 
          nome: nomeDoUsuario,
          idade: Math.floor(100 * Math.random()),
          gênero: "Masculino",

        }
      )
    }, 3000)
  })
}

async function buscarDadosAPI(nomeDoUsuario) {
    try {
        const dados = await dadosAPI(nomeDoUsuario);
        console.log(dados);

    } catch (erro) {
        console.error("A busca falhou:", erro);
    }
}
buscarDadosAPI("Mateus")


//busca de várias APIS simultaneamente com Promise.all
async function APIUsuario(nomeDoUsuario) {
  return new Promise ((resolve) =>{
    setTimeout(() => {
      resolve(
        { 
          nome: nomeDoUsuario,
          idade: Math.floor(100 * Math.random()),
          gênero: "Masculino",

        }
      )
    }, 3000)
  })
}

async function APICardapio(nomeDoPrato) {
  return new Promise ((resolve) =>{
    setTimeout(() => {
      resolve(
        { 
          nome: nomeDoPrato,
          ingredientes: "Arroz,Feijão e Bife",
          categoria: "Salgado",

        }
      )
    }, 3000)
  })
}

async function APICarro(nomeDoCarro) {
  return new Promise ((resolve) =>{
    setTimeout(() => {
      resolve(
        { 
          nome: nomeDoCarro,
          ano: 1996,
          cor: "Azul",

        }
      )
    }, 3000)
  })
}

async function impressaoResultado(){
const resultado = await Promise.all ([APIUsuario("Mateus"), APICarro("Fusca"), APICardapio("Prato básico")])
console.log(resultado)
}

impressaoResultado();
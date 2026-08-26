# JavaScript — Programação Assíncrona

> Data: 24/08/2026 & 25/08/2026
---

## 1. Conceitos básicos

Uma função assíncrona permite que o código execute varias tarefas ao mesmo tempo, sem a necessidade de esperar a conclusão de uma tarefa X para concluir uma tarefa póstuma a ela.

Elas ajudam a:

- Acelerar execuções longas;
- Previne travas (Melhor UX);
- Permite o desenvolvimento de aplicações que lidam com grande volume de dados;

Dentro desse módulo a professora explicou um pouco de como armazenar functions em variáveis, uma vez que usarei muito essa funcionalidade durante meu estudo de funções assíncronas, portanto, segue exemplos úteis:
```javascript
let multiplicar = (a, b) => return(a * b);

setTimeout(function () {
  multiplicar(5,10);
}, 1000);
```

### 1.1 Mecanismos assíncronos

**setInterval**
```javascript
setinterval(function () {
  console.log("Sintaxe setInterval");

  if(condicao){
    clearInterval(id) //interrompe a execução
  };
}, 1000); 
```
Permite a execução de uma função repetida vezes em intervalos regulares de tempo (em ms).

**setTimeout**
```javascript
setTimeout(function () {
  console.log("Sintaxe setTimeout");
}, 1000); 


```
Executa uma função DEPOIS do tempo estabelecido (em ms)

```javascript
function mostrarMensagem() {
    console.log("Passaram 2 segundos")
}

setTimeout(mostrarMensagem, 2000);
```
Função é executada após a conclusão de uma tarefa assíncrona

---

**Promises**:
Um objeto que representa o resultado futuro de uma operação assíncrona 

**Async/await**:
Sintaxe que simplifica o trabalho com Promises, facilitando a leitura do código

Async -> Avisa que a função vai trabalhar com operações assíncronas e permite a utilização do await dentro dela
Await -> Aguarda o retorno de uma promise

EXEMPLO:
```javascript
// Busca Dados de um servidor - https://jsonplaceholder.typicode.com/
async function buscarDados() {
  try {
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  } catch (error) {
    console.error("Erro:", error);
  }
}

buscarDados();
```


### 1.2 Exemplos úteis:
```javascript
//cronômetro de 10 minutos
let segundos = 0
let minutos = 0

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
```

### 2.2 Conceitos amplificados

**Callback Hell**

É um aninhamento profundo de callbacks, criando um código confuso e difícil de ler.
Exemplo básico:
```javascript
function tarefa1(callback) = {
  setTimeout(function(){
    console.log("Tarefa concluída")
    callback();
  }, 1000)
}

function tarefa2(callback) = {
  setTimeout(function(){
    console.log("Tarefa concluída")
    callback();
  }, 1000)
}

function tarefa3(callback) = {
  setTimeout(function(){
    console.log("Tarefa concluída")
    callback();
  }, 1000)
}

tarefa1(function () {
    tarefa2(function () {
        tarefa3(function () {
            console.log("Todas as tarefas concluídas!")
        })
    })
})
```

**Resolução de um callback hell**:

```javascript
async function tarefa1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Tarefa 1 concluída");
      resolve();
    }, 1000);
  });
}

async function tarefa2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Tarefa 2 concluída");
      resolve();
    }, 1000);
  });
}

async function tarefa3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Tarefa 3 concluída");
      resolve();
    }, 1000);
  });
}

tarefa1()
  .then(() => tarefa2())
  .then(() => tarefa3())
  .then(() => console.log("Todas as tarefas concluídas"));

realizarTarefas();


```



**Promises**
Promises representam resultados de operações assíncronas, como requisições em um banco de dados ou operações com um sistema de arquivos.
Promises possuem três estados:

Pendente: Aguardando o fim da operação
Concluído: Operação bem-sucedida
Rejeitada: Erro durante a operação

Criando uma promise: 
Uma promise é criada com o construtor new Promise() que recebe uma função **executor** como paramêtro

**Executor**
Recebe duas funções,**resolve** para sucesso e **reject** para erro, que são chamadas dentro do executor para determinar o estado da promise

**Tratamento para retorno da promise**
then(): Usamos depois da promise ser cumprida, funciona para receber o valor de retorno como parâmetro.
catch(): A função catch só é chamada em caso de erro, recebendo o erro gerado como parâmetro.

EXEMPLO:

```javascript
function buscarUsuario() {
    return new Promise((resolve, reject) => {
        const encontrouUsuario = true

        setTimeout(() => {
            if (encontrouUsuario) {
                resolve("Usuário encontrado com sucesso!")
            } else {
                reject("Usuário não encontrado.")
            }
        }, 2000)
    })
}
buscarUsuario()
    .then((resultado) => {
        console.log(resultado)
    })
    .catch((erro) => {
        console.log(erro)
    })
```

Uma dúvida que tive durante meus estudos é por que "resultado" está diretamente associado a "resolve" nesse caso, a explicação é:
- resolve(valor) -> envia o valor para o .then();
- reject(valor) -> envia o valor para o .catch();

---


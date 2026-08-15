# Calculadora de IMC

Esse é um projeto simples de uma **Calculadora de IMC** que desenvolvi durante meus estudos de HTML, CSS e JavaScript.

O objetivo principal desse projeto foi praticar formulários, manipulação do DOM, eventos, condicionais e armazenamento de dados com `localStorage`.

## Sobre o projeto

A aplicação permite que o usuário informe:

* Nome
* Altura
* Peso

Após clicar no botão **Calcular**, o sistema calcula o IMC e mostra na tela o resultado junto com a classificação correspondente.

Dependendo do resultado, a área onde o IMC é exibido também muda de cor.

## Funcionalidades

* Formulário para informar nome, altura e peso
* Validação do campo de nome
* Cálculo automático do IMC
* Exibição do resultado com duas casas decimais
* Classificação do IMC
* Mudança de cor de acordo com a classificação
* Armazenamento dos dados no `localStorage`

## Classificações utilizadas

O projeto utiliza as seguintes classificações:

* Abaixo de 18.5: Abaixo do peso
* Entre 18.5 e 24.9: Peso normal
* Entre 25 e 29.9: Sobrepeso
* A partir de 30: Obesidade

## Tecnologias utilizadas

* HTML
* CSS
* JavaScript
* LocalStorage

## Estrutura do projeto

```text
Calculadora-de-IMC/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Responsável pela estrutura da página e pelo formulário onde o usuário informa nome, altura e peso.

### `style.css`

Responsável pelo visual da calculadora, organização dos campos, botão e área onde o resultado é mostrado.

### `script.js`

Responsável por toda a lógica da aplicação, incluindo:

* Captura dos dados do formulário
* Validação do nome
* Cálculo do IMC
* Classificação do resultado
* Alteração da cor da área de resultado
* Exibição da mensagem final
* Armazenamento dos dados no `localStorage`

## Como o cálculo é feito

O IMC é calculado utilizando a seguinte fórmula:

```text
IMC = peso / (altura × altura)
```

No JavaScript:

```js
const imc = peso / (altura * altura);
```

Depois do cálculo, o resultado é classificado utilizando estruturas condicionais.

## Exemplo de resultado

Se o usuário informar:

```text
Nome: Mateus
Altura: 1.80
Peso: 80
```

A aplicação calcula o IMC e mostra uma mensagem parecida com:

```text
Olá Mateus, seu IMC é de 24.69,
sua classificação calculada é: Peso normal
```

## Armazenamento dos dados

Após o cálculo, os dados do formulário são percorridos utilizando `FormData` e armazenados no `localStorage`.

Com isso consegui praticar como salvar informações diretamente no navegador.

## O que aprendi com esse projeto

Durante o desenvolvimento consegui praticar principalmente:

* `getElementById()`
* `addEventListener()`
* Evento de `submit`
* `preventDefault()`
* Estruturas condicionais com `if`, `else if` e `else`
* `parseFloat()`
* Manipulação do DOM
* Alteração de estilos pelo JavaScript
* Template strings
* `toFixed()`
* `FormData`
* Loops com `for...of`
* `localStorage`

Também consegui entender melhor como os dados de um formulário podem ser capturados, processados e utilizados para atualizar a interface da página.

## Observação

Esse projeto foi desenvolvido com objetivo de estudo.

Ele não possui backend ou banco de dados. Os dados são armazenados apenas no navegador através do `localStorage`.

Projeto desenvolvido como parte dos meus estudos de desenvolvimento web.

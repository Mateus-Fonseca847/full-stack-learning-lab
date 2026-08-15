# Bingo de Futebol

Mini-projeto desenvolvido para praticar JavaScript e consumo de APIs através de um jogo de associação entre jogadores de futebol e seus respectivos clubes.

O jogador deve observar o atleta sorteado e selecionar, entre os nove clubes disponíveis na cartela, o time correspondente.

## Como funciona

Ao iniciar uma partida:

1. Os dados dos jogadores são obtidos através da API-Football.
2. O jogo identifica os clubes dos jogadores disponíveis.
3. Nove clubes são sorteados para formar uma cartela 3x3.
4. Um jogador é sorteado e exibido na tela.
5. O usuário deve selecionar o clube ao qual aquele jogador pertence.
6. Um novo jogador é sorteado e a rodada continua.
7. Ao final da partida, o jogo revela os acertos e erros e apresenta a pontuação obtida.

## Regras

* A cartela possui 9 clubes.
* Cada jogador possui um limite de 10 segundos.
* O jogador pode pular até 3 atletas.
* Jogadores já apresentados não são sorteados novamente.
* A partida possui um limite de jogadores sorteados.
* Ao selecionar um clube, a escolha fica registrada.
* No final da partida, as respostas corretas e incorretas são reveladas.
* A pontuação final é exibida em um modal.

## Funcionalidades

* Consumo de API externa com `fetch`;
* requisições assíncronas utilizando `async/await`;
* sorteio aleatório de jogadores;
* sorteio aleatório dos clubes da cartela;
* cartela 3x3;
* imagens dos jogadores;
* escudos dos clubes;
* temporizador por jogador;
* sistema de pulos;
* prevenção de jogadores repetidos;
* validação das respostas;
* cálculo da pontuação;
* indicação visual de acertos e erros;
* tela de fim de jogo;
* opção para iniciar uma nova partida.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* API-Football

## Conceitos praticados

Este projeto foi desenvolvido principalmente para praticar conceitos que estou estudando em JavaScript, como:

* variáveis;
* funções;
* arrays;
* objetos;
* `Map`;
* `Set`;
* métodos de arrays;
* eventos;
* manipulação do DOM;
* `fetch`;
* Promises;
* `async/await`;
* tratamento de erros com `try/catch`;
* temporizadores com `setInterval`;
* manipulação de classes CSS;
* controle do estado de uma aplicação.

## Estrutura

Bingo-Futebol-API/
│
├── index.html
├── style.css
├── script.js
└── README.md


### `index.html`

Responsável pela estrutura da interface do jogo. (não foi o foco do projeto)

### `style.css`

Responsável pela identidade visual, organização da cartela, estados das respostas, responsividade e estilização dos componentes. (não foi o foco do projeto)

### `script.js`

Contém a lógica principal da aplicação, incluindo:

* comunicação com a API;
* tratamento dos dados recebidos;
* montagem da cartela;
* sorteio de jogadores;
* gerenciamento das rodadas;
* temporizador;
* pulos;
* validação das escolhas;
* pontuação;
* encerramento e reinício da partida.

## API

O projeto utiliza a API-Football, da API-Sports, para obter informações sobre jogadores e clubes.

A aplicação atualmente trabalha com dados de jogadores retornados pela API e utiliza informações como:

```text
Jogador
├── ID
├── nome
└── foto

Time
├── ID
├── nome
└── escudo
```

Essas informações são tratadas pelo JavaScript antes de serem utilizadas pelo jogo.


## Executando o projeto

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd mini-projetos/Bingo-Futebol-API
```

Abra o projeto utilizando um servidor local, como a extensão Live Server do VS Code.

> Para que as funcionalidades dependentes da API funcionem, é necessário configurar o acesso à API.

## Objetivo do projeto

Mais do que desenvolver o jogo em si, o principal objetivo deste projeto é aplicar na prática os conceitos estudados em JavaScript e entender como uma aplicação front-end pode consumir, transformar e utilizar dados vindos de uma API externa.

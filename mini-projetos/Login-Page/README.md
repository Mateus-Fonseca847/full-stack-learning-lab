# Página de Login e Cadastro

Esse é um projeto simples que desenvolvi durante meus estudos de **HTML, CSS e JavaScript**.

O objetivo principal foi praticar a manipulação do DOM, eventos, formulários, validação de dados e armazenamento de informações no navegador.

## Sobre o projeto

O projeto consiste em uma página com duas áreas:

* Login
* Cadastro

É possível alternar entre os dois formulários através dos botões da própria página.

No cadastro, o usuário pode informar:

* Nome
* Email
* Senha

Os dados são validados antes do cadastro e depois são armazenados utilizando o `localStorage` do navegador.

No login, os dados informados são comparados com os dados que foram salvos anteriormente.

## Funcionalidades

* Alternância entre as telas de login e cadastro
* Validação de campos vazios
* Validação de senha
* Senha com no mínimo 8 caracteres
* Verificação de pelo menos um símbolo na senha
* Exibição de mensagens de erro
* Armazenamento dos dados com `localStorage`
* Recuperação dos dados cadastrados
* Comparação de email e senha durante o login
* Mensagem de sucesso quando o login é realizado corretamente

## Tecnologias utilizadas

* HTML
* CSS
* JavaScript
* LocalStorage

## Estrutura do projeto

```text
Login-Page/
│
├── index.html
├── style.css
└── script.js
```

### `index.html`

Responsável pela estrutura da página, formulários de cadastro e login e seus respectivos campos.

### `style.css`

Responsável pelo visual da aplicação e pela animação de troca entre as telas de login e cadastro.

### `script.js`

Responsável pela lógica do projeto, incluindo:

* Eventos dos botões
* Validação dos formulários
* Manipulação das mensagens de erro
* Cadastro dos dados no `localStorage`
* Validação do login

## Como executar

Como o projeto utiliza apenas HTML, CSS e JavaScript, não é necessário instalar nenhuma dependência.

1. Clone ou baixe o repositório.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` no navegador.

Também é possível utilizar uma extensão como o **Live Server** no VS Code.

## O que aprendi com esse projeto

Durante o desenvolvimento consegui praticar principalmente:

* `getElementById()`
* `addEventListener()`
* Eventos de `click` e `submit`
* `preventDefault()`
* Manipulação de classes com `classList`
* Manipulação de estilos pelo JavaScript
* Objetos em JavaScript
* Condicionais
* Expressões regulares
* `JSON.stringify()`
* `JSON.parse()`
* `localStorage`
* Manipulação de formulários

Também consegui entender melhor como HTML, CSS e JavaScript trabalham juntos para criar uma interface interativa.

## Observação

Esse projeto foi feito com objetivo de **estudo**.

Os dados do usuário, incluindo a senha, são armazenados no `localStorage`. Essa abordagem não é segura para uma aplicação real.

Em um projeto real, a autenticação deveria ser feita utilizando um backend, banco de dados e técnicas adequadas para armazenar senhas com segurança.

Projeto desenvolvido como parte dos meus estudos de desenvolvimento web.

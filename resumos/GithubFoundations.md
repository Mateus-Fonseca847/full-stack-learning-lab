# Estudos de Git e GitHub — GitHub Foundations

Este arquivo documenta meu progresso nos estudos de **Git e GitHub**, desenvolvidos durante minha evolução na trilha **GitHub Foundations**, estudada pela DataCamp.

O objetivo deste material não é apenas registrar comandos, mas documentar os conceitos que aprendi, as práticas realizadas e como minha compreensão sobre versionamento, colaboração e gerenciamento de projetos evoluiu ao longo dos cursos.

---

## Objetivo do estudo

Escolhi esta trilha com o objetivo de entender melhor como o Git funciona além dos comandos básicos que eu já utilizava em projetos e, aos poucos, ampliar esse conhecimento para o uso do GitHub em situações de colaboração, organização e segurança.

A intenção é me capacitar para trabalhar em grupo com mais inteligência, controlar versões, corrigir problemas com mais segurança e organizar melhor o desenvolvimento dos meus projetos.

Antes, meu contato com Git estava concentrado principalmente em operações como:

```bash
git add
git commit
git push
```

Ao longo dos cursos, passei a compreender melhor o que acontece entre essas operações, como o Git organiza as alterações de um projeto e como posso consultar, comparar, recuperar e compartilhar diferentes versões do código.

---

## Curso 1 — Introduction to Git

Nesta primeira etapa, concentrei meus estudos nos fundamentos do controle de versão e no funcionamento do Git. O principal avanço foi deixar de enxergar os comandos como uma sequência mecânica e começar a compreender o estado do projeto antes e depois de cada operação.

### 1. Entendendo controle de versão

O primeiro passo foi compreender que Git é um **sistema de controle de versão**.

Seu objetivo é registrar a evolução dos arquivos de um projeto ao longo do tempo, permitindo:

- acompanhar alterações;
- identificar versões anteriores;
- recuperar estados antigos do projeto;
- comparar modificações;
- organizar o desenvolvimento;
- colaborar com outras pessoas com maior segurança.

Passei também a diferenciar melhor:

**Git** → ferramenta responsável pelo controle de versão.

**GitHub** → plataforma que hospeda repositórios Git e oferece ferramentas adicionais para colaboração e desenvolvimento.

---

### 2. Trabalhando pelo terminal

Durante o curso também pratiquei comandos básicos do shell, importantes para utilizar Git diretamente pela linha de comando.

#### Diretório atual

```bash
pwd
```

`pwd` significa **Print Working Directory** e mostra em qual diretório estou atualmente.

#### Listar arquivos e diretórios

```bash
ls
```

#### Navegar para outro diretório

```bash
cd nome-do-diretorio
```

Exemplo:

```bash
cd Exercícios
```

#### Voltar um diretório

```bash
cd ..
```

Essa prática tornou minha navegação pelo terminal mais natural e me ajudou a compreender melhor onde os comandos Git estão sendo executados.

---

### Repositórios Git

#### Criando um repositório

Aprendi que um projeto comum pode ser transformado em um repositório Git utilizando:

```bash
git init
```

Também é possível criar uma nova pasta já inicializada como repositório:

```bash
git init nome-do-projeto
```

Exemplo utilizado durante o curso:

```bash
git init stress-performance
```

Quando um repositório é inicializado, o Git cria internamente o diretório:

```text
.git/
```

É nesse diretório que ficam armazenadas as informações necessárias para o funcionamento do versionamento.

---

### Working Tree, Staging Area e Repository

Um dos conceitos mais importantes e que mais mudaram minha compreensão sobre Git foi perceber que existe um fluxo entre a alteração de um arquivo e seu registro definitivo no histórico.

```text
Working Tree
     ↓
   git add
     ↓
Staging Area
     ↓
 git commit
     ↓
Repository
```

A **Staging Area** foi um conceito completamente novo para mim e ajudou a tornar mais claro o que realmente acontece quando utilizo `git add`.

#### Working Tree

A **Working Tree** representa os arquivos do projeto no estado em que estou trabalhando atualmente.

Quando modifico um arquivo, essa alteração existe inicialmente apenas na Working Tree.

#### Staging Area

A **Staging Area** funciona como uma área intermediária onde seleciono quais alterações deverão fazer parte do próximo commit.

Por exemplo:

```bash
git add index.html
```

Isso prepara o estado atual de `index.html` para o próximo commit.

Esse conceito me ajudou a entender que `git add` não significa simplesmente "adicionar um arquivo ao Git".

Uma interpretação melhor é:

> Preparar a versão atual dessa alteração para entrar no próximo commit.

#### Commit

Depois de selecionar as alterações desejadas, posso registrá-las no histórico através de um commit:

```bash
git commit -m "Adiciona estrutura inicial da página"
```

Passei a enxergar um commit como um **snapshot de determinado estado do projeto**.

Cada commit representa um ponto da evolução do software que pode ser consultado posteriormente.

---

### Verificando o estado do projeto

Um dos comandos mais importantes durante o desenvolvimento é:

```bash
git status
```

Ele permite verificar informações como:

- arquivos modificados;
- arquivos não rastreados;
- arquivos presentes na Staging Area;
- estado atual do repositório.

Passei a utilizar `git status` como uma forma de confirmar o que está acontecendo antes de realizar operações importantes.

---

### Histórico de versões

Outro avanço importante durante o curso foi aprender a investigar o histórico de um projeto.

#### Visualizando os commits

```bash
git log
```

O comando apresenta informações como:

- hash do commit;
- autor;
- data;
- mensagem.

#### Limitando a quantidade de commits

Para visualizar apenas os dois commits mais recentes:

```bash
git log -2
```

A mesma ideia pode ser utilizada com outras quantidades.

#### Histórico de um arquivo específico

Também é possível investigar somente os commits relacionados a determinado arquivo:

```bash
git log arquivo.md
```

Ou limitar a quantidade:

```bash
git log -2 arquivo.md
```

Com isso aprendi que o histórico pode ser utilizado não apenas para observar o projeto inteiro, mas também para investigar a evolução de arquivos individualmente.

---

### Filtrando commits por data

O Git também permite pesquisar commits realizados em determinado período.

Por exemplo:

```bash
git log --since="yesterday"
```

Também posso utilizar:

```bash
git log --since="1 week ago"
```

ou uma data específica:

```bash
git log --since="2026-08-17"
```

Esse tipo de filtro pode ser útil para investigar alterações realizadas durante determinado período de desenvolvimento.

---

### Hashes

Cada commit possui um identificador conhecido como **hash**.

Exemplo:

```text
36b761e46...
```

O hash funciona como uma identificação daquele commit.

Normalmente não é necessário utilizar todo o hash. Se os primeiros caracteres forem suficientes para identificar o commit, posso utilizar uma versão abreviada.

Exemplo:

```bash
git show 36b761e
```

---

### Investigando commits

Para visualizar informações detalhadas sobre determinado commit, posso utilizar:

```bash
git show HASH
```

Exemplo:

```bash
git show 36b761e
```

Isso permite investigar quais alterações foram realizadas naquele ponto específico do histórico.

---

### HEAD

Outro conceito importante foi o `HEAD`.

`HEAD` representa a posição atual dentro do histórico do Git.

Por exemplo:

```text
A → B → C
        ↑
       HEAD
```

O commit anterior pode ser referenciado utilizando:

```text
HEAD~1
```

E dois commits atrás:

```text
HEAD~2
```

Assim:

```text
A → B → C
↑   ↑   ↑
│   │  HEAD
│ HEAD~1
HEAD~2
```

Esse conceito facilita operações que envolvem comparação ou recuperação de versões anteriores.

---

### Comparando alterações

Aprendi também a utilizar o Git para investigar diferenças entre versões.

#### Alterações ainda não adicionadas à Staging Area

```bash
git diff
```

Esse comando permite visualizar as modificações existentes na Working Tree.

#### Alterações presentes na Staging Area

```bash
git diff --staged
```

Com isso posso visualizar exatamente quais alterações serão incluídas no próximo commit.

Esse conhecimento tornou mais claro o fluxo:

```text
Editar
  ↓
git diff
  ↓
git add
  ↓
git diff --staged
  ↓
git commit
```

---

### Desfazendo alterações

Outra parte importante do estudo foi entender que Git também fornece ferramentas para corrigir erros.

#### Removendo um arquivo da Staging Area

```bash
git restore --staged arquivo
```

Exemplo:

```bash
git restore --staged report.md
```

Isso remove o arquivo da Staging Area sem apagar as alterações realizadas nele.

#### Restaurando alterações

Também é possível utilizar:

```bash
git restore arquivo
```

para restaurar determinado arquivo para um estado anterior.

Por ser uma operação que pode eliminar alterações locais, é importante utilizá-la com atenção.

---

### Revertendo commits

Aprendi também sobre:

```bash
git revert
```

Em vez de apagar um commit antigo do histórico, o `git revert` cria **um novo commit que desfaz as alterações realizadas anteriormente**.

Exemplo:

```bash
git revert HEAD
```

Isso ajuda a preservar o histórico do projeto enquanto corrige uma alteração problemática.

---

### Comandos praticados nesta etapa

```text
pwd
ls
cd

git --version

git init
git status

git add
git commit

git log
git log -2
git log arquivo
git log --since="yesterday"

git show

git diff
git diff --staged

git restore
git restore --staged

git revert
```

---

### O que mudou na minha compreensão sobre Git

Antes deste estudo, eu enxergava o fluxo de Git principalmente como:

```text
git add
   ↓
git commit
   ↓
git push
```

Agora consigo enxergar um processo mais completo:

```text
Arquivo
   ↓
Working Tree
   ↓
git add
   ↓
Staging Area
   ↓
git commit
   ↓
Histórico
   ↓
git log / git show / git diff
   ↓
Investigar ou recuperar versões
```

Mais importante do que memorizar comandos, passei a compreender **o estado do projeto em cada momento e o efeito que cada comando provoca nesse estado**.

---

### Principais conceitos aprendidos nesta etapa

Ao longo do curso desenvolvi uma compreensão melhor sobre:

- controle de versão;
- Git e GitHub;
- terminal e shell;
- repositórios Git;
- diretório `.git`;
- Working Tree;
- Staging Area;
- commits;
- hashes;
- histórico de versões;
- `HEAD`;
- comparação entre versões;
- filtragem de commits;
- restauração de alterações;
- reversão de commits.

---

### Conclusão da etapa — Introduction to Git

**GitHub Foundations — Introduction to Git ✔**

Nesta primeira etapa, deixei de enxergar o Git apenas como uma sequência de comandos utilizados antes de enviar código ao GitHub e passei a compreender melhor **como o versionamento funciona dentro do repositório**.

O principal avanço foi entender o caminho percorrido por uma alteração entre Working Tree, Staging Area, commit e histórico, além de aprender como investigar e desfazer mudanças com mais segurança.

Essa base foi importante para que as etapas seguintes fizessem mais sentido, principalmente quando comecei a trabalhar com branches, repositórios remotos e colaboração.

---

## Curso 2 — Intermediate Git

Após concluir a parte introdutória, avancei para conceitos relacionados ao uso de **branches**, integração de diferentes linhas de desenvolvimento, resolução de conflitos e comunicação entre repositórios locais e remotos.

Essa etapa aproximou meu entendimento do Git de situações mais parecidas com as encontradas em projetos reais, principalmente quando diferentes funcionalidades ou correções precisam ser desenvolvidas simultaneamente.

---

### Branches

#### Entendendo branches

Uma **branch** representa uma linha independente de desenvolvimento dentro do repositório.

Antes deste estudo, eu entendia branches principalmente como uma forma de "separar código". Ao longo do curso, passei a compreender melhor que elas permitem desenvolver funcionalidades, realizar correções ou testar alterações sem modificar diretamente a linha principal do projeto.

Um exemplo seria:

```text
main
 │
 ├── feature-login
 │
 └── fix-search-bar
```

Cada branch pode possuir commits próprios e evoluir de maneira independente até que suas alterações sejam integradas novamente.

Isso permite que diferentes partes de um projeto sejam desenvolvidas paralelamente.

---

#### Visualizando branches

Para visualizar as branches existentes no repositório:

```bash
git branch
```

A branch atual é identificada pelo `*`.

Exemplo:

```text
- main
  feature-login
  fix-navbar
```

Esse comando passou a ser importante para confirmar em qual linha de desenvolvimento estou trabalhando antes de realizar novas alterações.

---

#### Criando uma branch

Uma nova branch pode ser criada utilizando:

```bash
git branch nome-da-branch
```

Exemplo:

```bash
git branch feature-login
```

Depois posso mudar para ela utilizando:

```bash
git switch feature-login
```

Também é possível criar uma nova branch e já mudar para ela:

```bash
git switch -c feature-login
```

O fluxo passa a ser:

```text
main
 ↓
criar branch
 ↓
feature-login
 ↓
realizar alterações
 ↓
commits
```

---

### Navegando entre branches

Para mudar de uma branch para outra:

```bash
git switch nome-da-branch
```

Exemplo:

```bash
git switch main
```

ou:

```bash
git switch feature-login
```

Com isso passei a entender melhor que o Git não está apenas trocando o "nome da branch".

Ao navegar entre branches, estou mudando a posição do meu trabalho para outra linha de desenvolvimento do repositório.

---

### Renomeando branches

Também aprendi que branches podem ser renomeadas.

Caso eu esteja em outra branch e queira alterar o nome de uma branch existente:

```bash
git branch -m nome-antigo nome-novo
```

Exemplo praticado:

```bash
git branch -m txt fw2959-text-bug
```

Nesse comando:

```text
git branch
     ↓
trabalha com branches

-m
 ↓
move / rename

txt
 ↓
nome antigo

fw2959-text-bug
 ↓
novo nome
```

Essa prática também mostrou a importância de utilizar nomes claros para identificar a finalidade de uma branch.

Por exemplo:

```text
feature-login
fix-login-button
feature-search-bar
```

é mais fácil de compreender do que nomes genéricos como:

```text
teste
nova
txt
```

---

### Deletando branches

Depois que uma branch deixa de ser necessária, ela pode ser removida.

```bash
git branch -d nome-da-branch
```

Exemplo:

```bash
git branch -d feature-login
```

Também existe a opção de forçar sua exclusão:

```bash
git branch -D nome-da-branch
```

Passei a entender que branches utilizadas para funcionalidades ou correções não precisam necessariamente permanecer para sempre no projeto depois que seu trabalho já foi incorporado.

---

### Comparando branches

Assim como é possível utilizar `git diff` para investigar alterações em arquivos, também podemos comparar o estado de diferentes branches.

Isso permite identificar quais alterações existem entre duas linhas de desenvolvimento antes de integrá-las.

Conceitualmente:

```text
main
 │
 ├── A
 ├── B
 │
 └──────── feature-login
              │
              ├── C
              └── D
```

A `feature-login` possui alterações que ainda não fazem parte da `main`.

Comparar branches permite investigar essas diferenças antes de realizar a integração.

---

### Merge

Um dos principais conceitos desta etapa foi o **merge**.

O merge permite incorporar as alterações de uma branch em outra.

Por exemplo, supondo que uma funcionalidade tenha sido desenvolvida em:

```text
feature-login
```

e eu queira incorporá-la à:

```text
main
```

primeiro devo estar na branch que receberá as alterações:

```bash
git switch main
```

Depois:

```bash
git merge feature-login
```

Passei a interpretar esse processo como:

```text
feature-login
      │
      │ desenvolvimento
      │ commits
      ↓
     merge
      ↓
     main
```

Assim, uma funcionalidade pode ser desenvolvida separadamente e posteriormente integrada à linha principal do projeto.

---

### Utilizando branches corretamente

Outro aprendizado importante foi entender que branches devem possuir uma **finalidade clara**.

Imagine que uma branch chamada:

```text
search-bar
```

foi utilizada para desenvolver uma barra de pesquisa.

Depois da funcionalidade ser concluída e incorporada à `main`, surge um bug independente no botão de login.

Em vez de reutilizar:

```text
search-bar
```

o melhor fluxo é partir novamente da `main` e criar uma branch específica para a correção:

```text
main
 │
 ├── search-bar
 │      ↓
 │    merge
 │
 └── fix-login-button
```

Isso mantém alterações não relacionadas separadas e torna o histórico do projeto mais organizado.

Foi uma mudança importante na minha compreensão, porque comecei a perceber que utilizar Git corretamente não significa apenas conhecer comandos, mas também **organizar o desenvolvimento de maneira lógica**.

---

### Trabalhando com conflitos

#### Merge conflicts

Quando diferentes branches modificam partes incompatíveis de um mesmo arquivo, o Git pode não conseguir realizar o merge automaticamente.

Nesse caso ocorre um:

**Merge Conflict**

Um exemplo simplificado seria:

```text
main
 ↓
"Entrar"

feature-login
 ↓
"Fazer login"
```

Se alterações incompatíveis forem realizadas sobre a mesma região de um arquivo, o Git precisa que o desenvolvedor determine qual versão deve permanecer.

---

### Resolvendo conflitos

Quando um conflito acontece, o Git indica no arquivo quais partes estão causando o problema.

A estrutura pode aparecer de forma semelhante a:

```text
<<<<<<< HEAD

conteúdo da branch atual

=======

conteúdo da outra branch

>>>>>>> outra-branch
```

Essas marcações permitem identificar as versões que estão em conflito.

A resolução exige analisar as alterações e decidir qual conteúdo deve permanecer.

Depois de corrigir o arquivo, ele pode novamente seguir pelo fluxo:

```text
resolver conflito
      ↓
    git add
      ↓
   git commit
```

Esse processo me mostrou que o Git consegue automatizar grande parte da integração entre alterações, mas existem situações em que uma decisão do desenvolvedor é necessária.

---

### Reduzindo o risco de conflitos

Também passei a entender que uma boa organização durante o desenvolvimento pode diminuir a ocorrência de conflitos.

Algumas ideias importantes são:

- utilizar branches para tarefas específicas;
- evitar misturar alterações sem relação em uma mesma branch;
- manter o trabalho sincronizado;
- realizar commits de maneira organizada;
- integrar alterações com frequência;
- entender o que outras pessoas estão modificando em um projeto colaborativo.

Conflitos fazem parte do desenvolvimento colaborativo, mas uma organização melhor do fluxo de trabalho pode reduzir sua frequência e complexidade.

---

### Repositórios locais e remotos

Outra grande evolução nesta etapa foi entender melhor a relação entre um repositório existente no meu computador e um repositório remoto.

Passei a visualizar aproximadamente:

```text
Repositório local
      ↕
   Internet
      ↕
Repositório remoto
```

O repositório local contém o projeto e seu histórico Git no meu computador.

Já o repositório remoto permite armazenar e compartilhar esse projeto com outros desenvolvedores através de serviços como o GitHub.

---

### Clonando um repositório

Aprendi que:

```bash
git clone
```

permite criar uma cópia local de um repositório remoto.

Exemplo:

```bash
git clone URL_DO_REPOSITORIO
```

Conceitualmente:

```text
GitHub
   ↓
git clone
   ↓
Computador
   ↓
Repositório local
```

Diferente de `git init`, que inicializa um novo repositório Git, `git clone` parte de um repositório que já existe.

---

### Remotes

Um **remote** representa uma referência para um repositório remoto.

Para visualizar os remotes configurados:

```bash
git remote
```

Também posso visualizar mais informações utilizando:

```bash
git remote -v
```

Um nome bastante comum é:

```text
origin
```

Passei a entender `origin` não como um comando ou um lugar especial do Git, mas como o nome utilizado para identificar determinado repositório remoto.

Conceitualmente:

```text
Meu repositório
      │
      │ origin
      ↓
Repositório remoto
```

---

### Fetch

O comando:

```bash
git fetch
```

permite buscar informações e alterações existentes no repositório remoto.

Exemplo:

```bash
git fetch origin
```

O conceito que mais me chamou atenção foi que **buscar alterações não significa necessariamente incorporá-las imediatamente ao meu trabalho atual**.

O `fetch` permite atualizar as informações que meu repositório local possui sobre o remoto antes de decidir como trabalhar com essas mudanças.

---

### Pull

Também pratiquei:

```bash
git pull
```

Esse comando permite obter alterações de um repositório remoto e integrá-las ao trabalho local.

Exemplo:

```bash
git pull origin main
```

Passei a diferenciar melhor:

```text
git fetch
    ↓
busca informações do remoto

git pull
    ↓
busca + integra alterações
```

Essa diferença tornou muito mais claro o que acontece quando sincronizo um projeto que também está sendo modificado remotamente.

---

### Push

Depois de realizar alterações e commits localmente, posso enviá-los para o repositório remoto utilizando:

```bash
git push
```

Exemplo:

```bash
git push origin main
```

Nesse comando:

```text
git push origin main
         │      │
         │      └── branch
         │
         └── remote
```

O fluxo que antes eu utilizava quase de maneira automática:

```text
git add
git commit
git push
```

passou a fazer mais sentido.

Agora consigo enxergar:

```text
Working Tree
      ↓
   git add
      ↓
Staging Area
      ↓
 git commit
      ↓
Repositório local
      ↓
   git push
      ↓
Repositório remoto
```

---

### Fluxo de trabalho com branches e remotes

Com os conceitos desta etapa, passei a compreender um fluxo de desenvolvimento mais completo:

```text
Atualizar main
      ↓
Criar uma branch
      ↓
Realizar alterações
      ↓
   git add
      ↓
  git commit
      ↓
   git push
      ↓
Integrar alterações
      ↓
     main
```

Um exemplo seria:

```bash
git switch main

git pull origin main

git switch -c feature-login

git add .

git commit -m "Adiciona funcionalidade de login"

git push origin feature-login
```

Esse fluxo tornou mais claro como diferentes funcionalidades podem ser desenvolvidas sem modificar diretamente a linha principal do projeto.

---

### Comandos praticados nesta etapa

```text
git branch
git branch nome-da-branch

git switch nome-da-branch
git switch -c nome-da-branch

git branch -m nome-antigo nome-novo

git branch -d nome-da-branch
git branch -D nome-da-branch

git merge nome-da-branch

git clone

git remote
git remote -v

git fetch

git pull

git push
```

---

### O que mudou na minha compreensão sobre Git

Na etapa introdutória, a principal mudança na minha compreensão foi entender o caminho percorrido pelas alterações dentro de um repositório:

```text
Working Tree
      ↓
Staging Area
      ↓
Commit
      ↓
Histórico
```

Nesta etapa, passei a enxergar uma estrutura maior:

```text
                         ┌── branch A
                         │
Histórico ─── main ──────┼── branch B
                         │
                         └── branch C
                               ↓
                             merge
                               ↓
                              main
                               ↓
                             push
                               ↓
                       Repositório remoto
```

Passei de uma visão focada apenas no meu próprio histórico local para entender como o Git permite **desenvolvimento paralelo, integração de alterações e colaboração entre diferentes repositórios**.

Mais importante do que memorizar `branch`, `merge`, `fetch`, `pull` ou `push`, passei a compreender qual problema cada um desses recursos resolve dentro do fluxo de desenvolvimento.

---

### Principais conceitos aprendidos nesta etapa

Ao longo desta etapa desenvolvi uma compreensão melhor sobre:

- branches;
- criação e navegação entre branches;
- organização de branches;
- renomeação de branches;
- exclusão de branches;
- comparação entre branches;
- merge;
- boas práticas no uso de branches;
- merge conflicts;
- resolução de conflitos;
- prevenção de conflitos;
- repositórios locais;
- repositórios remotos;
- remotes;
- `origin`;
- clonagem de repositórios;
- `fetch`;
- `pull`;
- `push`;
- sincronização entre repositórios;
- desenvolvimento colaborativo.

---

### Conclusão da etapa — Intermediate Git

**GitHub Foundations — Parte intermediária**

Nesta etapa, comecei a compreender o Git não apenas como uma ferramenta para registrar versões dos meus próprios arquivos, mas como uma ferramenta para **organizar o desenvolvimento de software em paralelo e possibilitar colaboração entre diferentes pessoas e repositórios**.

Se na etapa introdutória aprendi melhor como o Git controla a evolução de um projeto, nesta etapa comecei a entender como essa evolução pode acontecer simultaneamente em diferentes branches e ser posteriormente integrada e compartilhada.

Este README continuará sendo atualizado conforme avanço nos conteúdos de Git e GitHub.



---

## Curso 3 — Introduction to GitHub Concepts

Após consolidar os fundamentos do Git e avançar para branches, merges e repositórios remotos, comecei uma nova etapa voltada especificamente para o **GitHub** e para as ferramentas que tornam a plataforma útil no desenvolvimento colaborativo.

Até esse ponto, minha visão estava muito concentrada no funcionamento do Git: versionamento, histórico, branches, conflitos e sincronização entre repositórios. Nesta etapa, passei a entender melhor como o GitHub utiliza esses conceitos e acrescenta recursos para **organizar projetos, documentar repositórios, gerenciar colaboração e revisar alterações**.

---

### O que é GitHub

Passei a compreender o GitHub como uma **plataforma de hospedagem e colaboração para repositórios Git**.

Enquanto o Git é responsável pelo controle de versão, o GitHub oferece uma camada de recursos em torno desses repositórios, permitindo que desenvolvedores compartilhem código, acompanhem tarefas, proponham alterações e trabalhem em conjunto.

A diferença ficou mais clara para mim:

```text
Git
 ↓
controle de versão
 ↓
funciona localmente

GitHub
 ↓
hospeda repositórios Git
 ↓
adiciona colaboração, revisão e gerenciamento
```

Antes eu associava muito o GitHub apenas ao lugar onde eu enviava meus projetos com `git push`. Agora passei a enxergá-lo como uma plataforma que organiza grande parte do fluxo de desenvolvimento em equipe.

---

### Para que o GitHub é utilizado

Ao longo desta etapa, passei a identificar alguns dos principais usos do GitHub:

- hospedar repositórios Git;
- manter projetos públicos ou privados;
- compartilhar código;
- documentar projetos;
- acompanhar problemas e tarefas;
- propor alterações;
- revisar código;
- discutir mudanças;
- aprovar contribuições;
- organizar colaboração entre desenvolvedores.

Isso ampliou minha visão sobre a plataforma, porque percebi que um repositório no GitHub não serve apenas para armazenar arquivos, mas também para concentrar informações e decisões relacionadas ao desenvolvimento.

---

### Repositórios públicos e privados

Também pratiquei a criação de repositórios diretamente pelo GitHub.

Passei a diferenciar melhor:

```text
Repositório público
 ↓
o conteúdo pode ser visualizado publicamente

Repositório privado
 ↓
o acesso é restrito às pessoas autorizadas
```

A escolha entre público e privado depende do objetivo do projeto, do tipo de informação armazenada e das pessoas que precisam ter acesso ao repositório.

Para projetos de estudo e portfólio, repositórios públicos podem ajudar a demonstrar evolução e projetos desenvolvidos. Já projetos com informações sensíveis ou que ainda não devem ser compartilhados podem permanecer privados.

---

### README

Outro conceito reforçado nesta etapa foi a importância do arquivo:

```text
README.md
```

O README funciona como uma apresentação e documentação inicial do repositório.

Ele pode explicar:

- objetivo do projeto;
- tecnologias utilizadas;
- instruções de instalação;
- como executar o projeto;
- estrutura de arquivos;
- funcionalidades;
- exemplos de uso;
- informações importantes para colaboradores.

Passei a entender que um README bem construído não é apenas algo visual para o GitHub, mas uma ferramenta que facilita a compreensão do projeto por qualquer pessoa que entre no repositório.

Este próprio arquivo é uma aplicação desse aprendizado, já que estou utilizando Markdown para documentar minha evolução nos estudos.

---

### .gitignore

Também aprendi sobre o arquivo:

```text
.gitignore
```

Ele permite informar ao Git quais arquivos ou diretórios não devem ser rastreados.

Exemplos comuns incluem:

```text
node_modules/
.env
*.log
```

Esse conceito é especialmente importante porque nem todo arquivo existente em um projeto deve ser versionado.

Alguns arquivos podem ser:

- gerados automaticamente;
- muito grandes;
- específicos do ambiente local;
- temporários;
- sensíveis, como arquivos contendo credenciais ou chaves.

Passei a compreender que utilizar `.gitignore` corretamente faz parte da organização e também da segurança de um projeto.

---

### Adicionando e modificando arquivos pelo GitHub

Nesta etapa também explorei a possibilidade de criar e modificar arquivos e diretórios diretamente pela interface do GitHub.

Isso reforçou a ideia de que alterações em um repositório não precisam necessariamente acontecer apenas pelo terminal ou por um editor local.

Conceitualmente, mesmo quando uma alteração é realizada pela interface web, ela continua fazendo parte do histórico Git do repositório.

```text
Alteração pelo GitHub
        ↓
      commit
        ↓
Histórico do repositório
```

Essa prática me ajudou a relacionar a interface visual do GitHub com conceitos que eu já havia aprendido utilizando Git pela linha de comando.

---

### Branches dentro do GitHub

Depois de estudar branches diretamente no Git, passei a observar como elas também são utilizadas dentro do GitHub.

É possível criar novas branches e alternar entre elas pela própria plataforma.

O conceito continua sendo o mesmo:

```text
main
 │
 ├── feature-login
 │
 └── fix-navbar
```

Porém, no GitHub essas branches também se conectam diretamente com recursos de colaboração, principalmente **Pull Requests**.

Isso me ajudou a compreender melhor que branches não existem apenas para separar meu trabalho local, mas também servem como base para propor alterações em projetos compartilhados.

---

### Issues

Um dos novos recursos apresentados foi o sistema de **Issues**.

Issues podem ser utilizadas para registrar e acompanhar assuntos relacionados ao projeto, como:

- bugs;
- funcionalidades;
- melhorias;
- tarefas;
- dúvidas;
- discussões técnicas.

Passei a enxergar uma Issue como uma forma organizada de transformar uma necessidade do projeto em algo que pode ser acompanhado.

Exemplo:

```text
Problema encontrado
       ↓
     Issue
       ↓
 discussão
       ↓
 desenvolvimento
       ↓
 solução
```

Isso é mais organizado do que depender apenas de mensagens soltas entre pessoas trabalhando no mesmo projeto.

---

### Comentários e colaboração

O GitHub também permite utilizar comentários em diferentes partes do fluxo de desenvolvimento.

Comentários podem ser utilizados para:

- discutir uma Issue;
- esclarecer uma tarefa;
- explicar uma decisão;
- revisar alterações;
- solicitar ajustes;
- colaborar com outros desenvolvedores.

Passei a perceber que o GitHub não organiza apenas o código, mas também parte da **comunicação relacionada ao código**.

Esse registro ajuda a manter decisões e discussões próximas do contexto em que aconteceram.

---

### Pull Requests

Um dos conceitos mais importantes desta etapa foi o **Pull Request**.

Uma Pull Request permite propor que alterações realizadas em uma branch sejam analisadas antes de serem integradas em outra branch.

Um fluxo simplificado seria:

```text
main
 │
 └── feature-login
          ↓
       commits
          ↓
         push
          ↓
    Pull Request
          ↓
       revisão
          ↓
        merge
          ↓
         main
```

Antes eu enxergava o merge principalmente como um comando do Git:

```bash
git merge feature-login
```

Agora passei a compreender que, em projetos colaborativos, a integração pode ser precedida por um processo de discussão e revisão através de uma Pull Request.

Isso permite que outras pessoas avaliem as mudanças antes que elas sejam incorporadas à branch principal.

---

### Revisando alterações

Outra parte importante foi aprender que mudanças propostas em uma Pull Request podem ser revisadas antes da aprovação.

Durante uma revisão é possível analisar:

- arquivos modificados;
- linhas adicionadas;
- linhas removidas;
- diferenças entre versões;
- possíveis erros;
- qualidade da implementação.

Esse processo se conecta diretamente ao que já havia estudado com `git diff`, mas agora aplicado dentro de um fluxo colaborativo.

```text
git diff
 ↓
comparar alterações localmente

Pull Request
 ↓
comparar e discutir alterações em colaboração
```

Passei a perceber que revisar código não significa apenas procurar erros, mas também compreender se a alteração faz sentido para o projeto antes de aceitá-la.

---

### Aprovando alterações

Depois da revisão, uma Pull Request pode ser aprovada quando as mudanças estão adequadas.

O fluxo passa a ser aproximadamente:

```text
alteração
   ↓
Pull Request
   ↓
revisão
   ↓
comentários / ajustes
   ↓
aprovação
   ↓
merge
```

Esse processo mostrou como o GitHub ajuda a criar uma camada de controle antes de alterações chegarem à branch principal.

Em equipes, isso pode ajudar a melhorar a qualidade do código e reduzir a chance de mudanças problemáticas serem integradas sem revisão.

---

### Configurações do repositório

Também comecei a explorar configurações disponíveis dentro de um repositório do GitHub.

Essa parte reforçou que o GitHub permite controlar diversos aspectos relacionados ao projeto, incluindo acesso, colaboração e comportamento do repositório.

Passei a entender que gerenciar um projeto no GitHub envolve não apenas trabalhar com arquivos, commits e branches, mas também configurar corretamente o ambiente onde esse projeto será desenvolvido.

---

### Personal Access Tokens (PATs)

Outro conceito novo foi o **Personal Access Token (PAT)**.

Um PAT é uma credencial que pode ser utilizada para autenticar operações e integrações com o GitHub sem utilizar diretamente a senha da conta.

Passei a entender que tokens devem ser tratados como informações sensíveis.

Por isso:

- não devem ser adicionados ao código;
- não devem ser commitados em repositórios;
- não devem ser publicados em arquivos públicos;
- devem possuir apenas as permissões necessárias;
- devem ser armazenados de forma segura.

Esse conceito também se relaciona ao uso de arquivos como `.env` e `.gitignore`, reforçando a importância de não versionar credenciais.

---

### O que mudou na minha compreensão sobre GitHub

Antes desta etapa, minha visão sobre GitHub era principalmente:

```text
Criar repositório
      ↓
git push
      ↓
Código publicado
```

Depois desta etapa, passei a enxergar um fluxo muito maior:

```text
Planejar uma alteração
        ↓
      Issue
        ↓
Criar uma branch
        ↓
Desenvolver e realizar commits
        ↓
       Push
        ↓
  Pull Request
        ↓
     Revisão
        ↓
Comentários / ajustes
        ↓
    Aprovação
        ↓
      Merge
        ↓
       main
```

Essa foi uma evolução importante porque comecei a compreender a diferença entre **saber utilizar Git** e **saber participar de um fluxo de desenvolvimento utilizando GitHub**.

O Git controla versões e organiza o histórico. O GitHub utiliza essa base para adicionar ferramentas de comunicação, organização, revisão e colaboração.

---

### Principais conceitos aprendidos nesta etapa

Ao longo da etapa **Introduction to GitHub Concepts**, desenvolvi uma compreensão melhor sobre:

- o que é GitHub;
- para que o GitHub é utilizado;
- diferença entre Git e GitHub;
- repositórios públicos e privados;
- criação e formatação de `README.md`;
- utilização de `.gitignore`;
- criação e modificação de arquivos pelo GitHub;
- criação e navegação entre branches na plataforma;
- configurações de repositórios;
- Personal Access Tokens;
- Issues;
- comentários;
- Pull Requests;
- revisão de alterações;
- aprovação de alterações;
- colaboração através do GitHub.

---

### Conclusão da etapa — Introduction to GitHub Concepts

**GitHub Foundations — Introduction to GitHub Concepts ✔**

Nesta etapa, passei de uma visão em que o GitHub era principalmente um local para hospedar meus repositórios para uma compreensão mais ampla da plataforma como uma ferramenta de **colaboração e organização do desenvolvimento de software**.

Os estudos anteriores me ensinaram como alterações percorrem a Working Tree, Staging Area, commits, branches e repositórios remotos. Agora comecei a entender como pessoas podem trabalhar sobre esse mesmo fluxo utilizando Issues, comentários, Pull Requests, revisões e aprovações para organizar mudanças de maneira colaborativa.

Meu próximo objetivo é continuar avançando na trilha GitHub Foundations e aprofundar o uso dessas ferramentas em situações cada vez mais próximas de projetos reais.

---

## Curso 4 — Intermediate GitHub Concepts

Depois de compreender os fundamentos do GitHub e como Issues, Pull Requests, revisões e aprovações organizam a colaboração, avancei para uma etapa mais voltada ao **gerenciamento de projetos, controle de acesso, segurança e colaboração em escala**.

Nesta fase, minha visão sobre o GitHub começou a ir além do fluxo de contribuição em um único repositório. Passei a observar como a plataforma também pode ser utilizada para organizar trabalho, controlar permissões, automatizar processos, acompanhar informações do projeto e estruturar práticas de colaboração dentro de equipes e organizações.

### Capítulo 1 — Projetos, automações e Insights

O primeiro capítulo apresentou dois eixos principais: **GitHub Projects personalizados** e **workflows automatizados com Insights**.

#### GitHub Projects personalizados

Passei a compreender melhor que o GitHub também pode ser utilizado para organizar o trabalho relacionado ao desenvolvimento, e não apenas o código em si.

A ideia de personalizar um projeto me ajudou a enxergar uma camada de organização acima das Issues e Pull Requests:

```text
Trabalho a realizar
       ↓
GitHub Project
       ↓
organização e acompanhamento
       ↓
Issues / Pull Requests / atividades
```

Essa etapa ampliou minha visão sobre gerenciamento dentro do GitHub. Antes, eu pensava principalmente em Issues como registros isolados de tarefas ou problemas. Agora passei a entender que essas informações podem fazer parte de uma estrutura maior de acompanhamento do trabalho.

#### Workflows automatizados e Insights

Outro avanço foi perceber que determinadas partes do fluxo podem ser **automatizadas**, reduzindo tarefas repetitivas e ajudando a manter o projeto organizado.

Também fui apresentado ao uso de **Insights** como uma forma de observar informações e acompanhar o que acontece no projeto.

Passei a enxergar aproximadamente:

```text
Atividades do projeto
        ↓
   automações
        ↓
fluxo mais organizado
        ↓
     Insights
        ↓
acompanhamento do projeto
```

Essa parte mostrou que o GitHub não serve apenas para registrar o trabalho realizado. Ele também pode ajudar a **organizar, automatizar e acompanhar o processo de desenvolvimento**.

---

### Capítulo 2 — Acesso, permissões e autenticação

O segundo capítulo aprofundou a parte de **controle de acesso** e **autenticação segura**.

#### Gerenciamento de acesso e permissões

Passei a compreender melhor que colaborar em um projeto não significa necessariamente conceder o mesmo nível de acesso para todas as pessoas.

O gerenciamento de acesso e permissões permite estruturar quem pode participar de determinadas atividades dentro de um projeto ou organização.

Conceitualmente, passei a enxergar:

```text
Usuários e colaboradores
          ↓
acesso e permissões
          ↓
ações que cada pessoa pode realizar
```

Esse aprendizado foi importante porque conectou colaboração com responsabilidade. Quanto maior o número de pessoas envolvidas em um projeto, mais importante se torna controlar de maneira adequada **quem possui acesso e o que cada pessoa pode fazer**.

#### Autenticação segura

Também aprofundei minha compreensão sobre a importância de utilizar mecanismos seguros de autenticação ao trabalhar com o GitHub.

Na etapa anterior eu já havia estudado Personal Access Tokens e entendido que credenciais não devem ser expostas em código ou repositórios. Agora esse conhecimento passou a fazer parte de uma visão mais ampla sobre segurança de acesso.

Passei a relacionar:

```text
Identidade
   ↓
autenticação
   ↓
acesso autorizado
   ↓
recursos do GitHub
```

Essa etapa reforçou que segurança não deve ser tratada apenas depois que um problema acontece. Ela faz parte da própria configuração do ambiente de desenvolvimento e da maneira como pessoas acessam os recursos do projeto.

---

### Capítulo 3 — InnerSource e Dependabot

O terceiro capítulo trouxe dois conceitos novos para minha evolução: **InnerSource** e o uso do **Dependabot** como parte da segurança de projetos.

#### InnerSource

Passei a compreender o **InnerSource** como uma forma de aplicar práticas de colaboração conhecidas em projetos open source dentro de um ambiente organizacional.

O conceito ampliou minha visão sobre colaboração porque mostrou que o mesmo tipo de fluxo que venho estudando — repositórios, Issues, branches, Pull Requests e revisão — também pode ser utilizado para facilitar contribuições entre diferentes pessoas ou equipes dentro de uma organização.

Conceitualmente:

```text
Equipes internas
      ↓
práticas de colaboração
      ↓
contribuições entre projetos
      ↓
InnerSource
```

Antes, eu associava esse tipo de colaboração principalmente a projetos públicos. Com o InnerSource, passei a perceber que os mesmos princípios podem ajudar a compartilhar conhecimento e organizar contribuições também em contextos internos.

#### Dependabot

Outro conceito importante foi o **Dependabot**.

Passei a entendê-lo como uma ferramenta do ecossistema GitHub relacionada à manutenção e segurança das dependências utilizadas por um projeto.

Esse tema conectou o gerenciamento do repositório com uma preocupação que vai além do código escrito diretamente por mim: um projeto também depende de bibliotecas e pacotes externos, e essas dependências precisam ser acompanhadas.

Minha visão passou a incluir:

```text
Projeto
  ↓
dependências
  ↓
acompanhamento
  ↓
Dependabot
  ↓
fortalecimento da segurança
```

Essa etapa tornou mais clara a ideia de que a segurança de um software também envolve os componentes externos que fazem parte dele.

---

### O que mudou na minha compreensão sobre GitHub

Na etapa anterior, eu havia evoluído de uma visão simples:

```text
Criar repositório
      ↓
git push
      ↓
Código publicado
```

para um fluxo colaborativo:

```text
Issue
  ↓
Branch
  ↓
Desenvolvimento
  ↓
Pull Request
  ↓
Revisão
  ↓
Aprovação
  ↓
Merge
```

Com o **Intermediate GitHub Concepts**, comecei a enxergar uma camada ainda maior:

```text
                    GitHub
                      │
        ┌─────────────┼─────────────┐
        │             │             │
     Projetos      Acessos       Segurança
        │             │             │
   automações     permissões     autenticação
   e Insights                       │
                                   ├── InnerSource
                                   └── Dependabot
```

Passei de uma visão focada apenas no fluxo de código para uma compreensão em que o GitHub também participa da **organização do trabalho, gerenciamento de acesso, automação, acompanhamento e segurança do desenvolvimento**.

Mais importante do que decorar o nome de cada recurso, comecei a entender qual problema cada conceito procura resolver dentro de projetos que envolvem mais pessoas, processos e dependências.

---

### Principais conceitos aprendidos nesta etapa

Ao longo da etapa **Intermediate GitHub Concepts**, desenvolvi uma compreensão melhor sobre:

- GitHub Projects personalizados;
- organização e acompanhamento do trabalho;
- workflows automatizados;
- Insights;
- gerenciamento de acesso;
- permissões;
- autenticação segura;
- InnerSource;
- colaboração interna entre equipes;
- Dependabot;
- acompanhamento de dependências;
- segurança aplicada ao gerenciamento de projetos no GitHub.

---

### Conclusão da etapa — Intermediate GitHub Concepts

**GitHub Foundations — Intermediate GitHub Concepts ✔**

Nesta etapa, minha compreensão sobre o GitHub passou a incluir não apenas o versionamento e a colaboração sobre código, mas também aspectos relacionados à **organização, automação, controle de acesso e segurança**.

Se nas etapas anteriores eu estava aprendendo como criar alterações, organizar branches e colaborar por meio de Pull Requests, agora comecei a perceber como esses fluxos podem ser administrados em contextos maiores, envolvendo projetos estruturados, diferentes níveis de acesso, práticas internas de colaboração e cuidados com dependências.

O principal avanço foi entender que utilizar GitHub de maneira profissional não significa apenas saber hospedar código ou abrir Pull Requests. Também envolve saber **organizar o trabalho, controlar quem pode acessar recursos e tratar segurança como parte do processo de desenvolvimento**.

Este README continuará sendo atualizado conforme avanço na trilha GitHub Foundations.


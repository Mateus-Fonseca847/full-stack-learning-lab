# GitHub Foundations — Resumo do meu aprendizado

Resumo dos principais conceitos de **Git e GitHub** estudados durante a conclusão do curso GitHub Foundations.

Este arquivo funciona como material de estudo, reunindo conceitos, comandos e fluxos importantes de forma objetiva.

Irei atualizando-o conforme meus estudos avançarem

---

# 1. Git e controle de versão

## Git

**Git** é um sistema de controle de versão utilizado para acompanhar a evolução de arquivos e projetos ao longo do tempo.

Permite:

* registrar alterações;
* consultar versões anteriores;
* comparar mudanças;
* recuperar estados antigos;
* desenvolver funcionalidades em paralelo;
* colaborar com outras pessoas.

## Git x GitHub

Git
↓
Controle de versão
↓
Funciona localmente

GitHub
↓
Hospeda repositórios Git
↓
Adiciona colaboração, revisão,
organização, automação e segurança

**Git** controla o histórico.

**GitHub** utiliza essa base e adiciona recursos para colaboração e gerenciamento de projetos.

---

# 2. Terminal

## Comandos básicos

### Mostrar o diretório atual

```bash
pwd
```

### Listar arquivos e diretórios

```bash
ls
```

### Entrar em um diretório

```bash
cd nome-do-diretorio
```

### Voltar um diretório

```bash
cd ..
```

### Verificar a versão do Git

```bash
git --version
```

---

# 3. Repositórios Git

## Inicializar um repositório

```bash
git init
```

Ou:

```bash
git init nome-do-projeto
```

Ao inicializar um repositório, o Git cria:

.git/

Esse diretório contém as informações utilizadas pelo Git para controlar o versionamento. (Dúvida!)

---

# 4. Fluxo fundamental do Git

O principal fluxo que preciso lembrar é:

```text
Working Tree
     ↓
   git add
     ↓
Staging Area (!)
     ↓
 git commit
     ↓
Repository
```

## Working Tree

Representa os arquivos no estado em que estou trabalhando atualmente.

## Staging Area

Área intermediária onde seleciono quais alterações entrarão no próximo commit.

```bash
git add arquivo
```

ou:

```bash
git add .
```

## Commit

Registra um estado do projeto no histórico.

```bash
git commit -m "Mensagem do commit"
```

Um commit pode ser entendido como um **snapshot de determinado estado do projeto**.

---

# 5. Verificando o estado do repositório

```bash
git status
```

Permite verificar:

* arquivos modificados;
* arquivos não rastreados;
* arquivos na Staging Area;
* estado atual do repositório.

---

# 6. Histórico

## Visualizar commits

```bash
git log
```

Apresenta informações como:

* hash;
* autor;
* data;
* mensagem.

## Limitar a quantidade

```bash
git log -2
```
(Mostra os últimos dois commits)

## Histórico de um arquivo

```bash
git log arquivo.md
```

## Últimos commits de um arquivo

```bash
git log -2 arquivo.md
```

## Filtrar por data

```bash
git log --since="yesterday"
```

Exemplo:

```bash
git log --since="1 week ago"
```

---

# 7. Hash

Cada commit possui um identificador chamado **hash**.

Ex:

```text
36b761e46...
```

Normalmente é possível utilizar uma versão abreviada.

```bash
git show 36b761e
```

---

# 8. HEAD

`HEAD` representa minha posição atual no histórico do Git.

```text
A → B → C
        ↑
       HEAD
```

Commit anterior:

```text
HEAD~1
```

Dois commits anteriores:

```text
HEAD~2
```

---

# 9. Investigando alterações

## Exibir um commit

```bash
git show HASH
```

## Alterações na Working Tree

```bash
git diff
```

## Alterações preparadas para commit

```bash
git diff --staged
```

Fluxo útil:

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

# 10. Desfazendo alterações

## Retirar um arquivo da Staging Area

```bash
git restore --staged arquivo
```

A alteração continua na Working Tree.

## Restaurar um arquivo

```bash
git restore arquivo
```

Pode descartar alterações locais, portanto deve ser utilizado com atenção.

## Reverter um commit

```bash
git revert HEAD
```

O `revert` **não apaga o commit anterior**.

Ele cria um novo commit que desfaz suas alterações.

```text
A → B → C → D
        ↑    ↑
      erro  revert
```

---

# 11. Objetos do Git

## Blob

Um **blob** armazena o conteúdo de um arquivo.

Ele não guarda:

* nome;
* caminho;
* diretório.

```text
BLOB = conteúdo
```

Arquivos com exatamente o mesmo conteúdo podem utilizar o mesmo blob.

## Tree

Uma **tree** representa a estrutura de arquivos e diretórios.

Ela relaciona nomes de arquivos com seus objetos.

```text
TREE
├── index.html → BLOB A
├── style.css  → BLOB B
└── src        → TREE
```

## Commit

O commit representa um estado do projeto e aponta para sua estrutura.

Resumo:

```text
BLOB   = conteúdo
TREE   = estrutura
COMMIT = versão
```

---

# 12. Branches

Uma **branch** representa uma linha de desenvolvimento.

```text
main
 │
 ├── feature-login
 │
 └── fix-navbar
```

Permite trabalhar em uma funcionalidade ou correção sem modificar diretamente a linha principal.

## Visualizar branches

```bash
git branch
```

## Criar branch

```bash
git branch nome-da-branch
```

## Trocar de branch

```bash
git switch nome-da-branch
```

## Criar e trocar imediatamente

```bash
git switch -c nome-da-branch
```

## Renomear

```bash
git branch -m nome-antigo nome-novo
```

## Excluir

```bash
git branch -d nome-da-branch
```

Forçar exclusão:

```bash
git branch -D nome-da-branch
```

---

# 13. Organização de branches

Branches devem possuir uma finalidade clara.

Exemplos:

```text
feature-login
fix-login-button
feature-search
```

Evitar misturar funcionalidades não relacionadas dentro da mesma branch.

Fluxo recomendado:

```text
main
 ↓
criar branch
 ↓
desenvolver uma tarefa
 ↓
commits
 ↓
integrar
 ↓
main
```

---

# 14. Merge

O **merge** integra alterações de uma branch em outra.

Se quero trazer `feature-login` para `main`:

```bash
git switch main
git merge feature-login
```

A branch atual é quem **recebe** as alterações.

```text
feature-login
      ↓
    merge
      ↓
     main
```

---

# 15. Merge conflicts

Um **merge conflict** acontece quando o Git não consegue decidir automaticamente como combinar alterações incompatíveis.

O arquivo pode apresentar:

```text
<<<<<<< HEAD

conteúdo da branch atual

=======

conteúdo da outra branch

>>>>>>> outra-branch
```

Fluxo de resolução:

```text
identificar conflito
       ↓
decidir conteúdo correto
       ↓
editar arquivo
       ↓
git add
       ↓
git commit
```

Conflitos podem ser reduzidos com:

* branches específicas;
* commits organizados;
* integração frequente;
* sincronização do trabalho;
* comunicação entre colaboradores.

---

# 16. Repositório local x remoto

```text
Repositório local
       ↕
     Internet
       ↕
Repositório remoto
```

O repositório local está no computador.

O remoto permite compartilhar e sincronizar o projeto através de serviços como o GitHub.

---

# 17. Clone

```bash
git clone URL
```

Cria uma cópia local de um repositório existente.

```text
GitHub
  ↓
git clone
  ↓
Computador
```

Diferença:

```text
git init  → cria/inicializa um repositório

git clone → copia um repositório existente
```

---

# 18. Remote e origin

Um **remote** é uma referência para outro repositório.

## Visualizar remotes

```bash
git remote
```

Mais detalhes:

```bash
git remote -v
```

`origin` é o nome normalmente dado ao remote principal.

```text
Repositório local
       │
     origin
       │
       ↓
Repositório remoto
```

---

# 19. Fetch, Pull e Push

## Fetch

```bash
git fetch origin
```

Busca informações do remoto sem necessariamente integrá-las à branch atual.

```text
fetch = buscar
```

## Pull

```bash
git pull origin main
```

Busca alterações e as integra ao trabalho local.

```text
pull = buscar + integrar
```

## Push

```bash
git push origin main
```

Envia commits locais para o repositório remoto.

```text
push = enviar
```

Resumo:

```text
git fetch
remoto → informações locais

git pull
remoto → branch local

git push
branch local → remoto
```

---

# 20. Fluxo Git completo

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

Com branches:

```text
Atualizar main
      ↓
Criar branch
      ↓
Desenvolver
      ↓
git add
      ↓
git commit
      ↓
git push
      ↓
Pull Request
      ↓
Revisão
      ↓
Merge
      ↓
main
```

---

# 21. GitHub

GitHub é uma plataforma utilizada para:

* hospedar repositórios Git;
* compartilhar código;
* documentar projetos;
* organizar tarefas;
* acompanhar problemas;
* propor alterações;
* revisar código;
* colaborar em projetos.

---

# 22. Repositórios públicos e privados

## Público

Conteúdo pode ser visualizado publicamente.

## Privado

Acesso limitado às pessoas autorizadas.

---

# 23. README

```text
README.md
```

Funciona como documentação inicial de um repositório.

Pode apresentar:

* objetivo;
* tecnologias;
* instalação;
* execução;
* funcionalidades;
* estrutura;
* exemplos de uso.

Um bom README facilita a compreensão do projeto.

---

# 24. .gitignore

```text
.gitignore
```

Define arquivos e diretórios que não devem ser rastreados.

Exemplos:

```gitignore
node_modules/
.env
*.log
```

Útil para evitar o versionamento de:

* dependências geradas;
* arquivos temporários;
* arquivos específicos do ambiente;
* informações sensíveis.

---

# 25. Issues

**Issues** permitem registrar e acompanhar:

* bugs;
* funcionalidades;
* melhorias;
* tarefas;
* dúvidas;
* discussões.

Fluxo:

```text
Necessidade
    ↓
  Issue
    ↓
Discussão
    ↓
Desenvolvimento
    ↓
Solução
```

---

# 26. Pull Requests

Uma **Pull Request** propõe que mudanças de uma branch sejam analisadas antes de serem integradas.

```text
Branch
  ↓
commits
  ↓
push
  ↓
Pull Request
  ↓
revisão
  ↓
aprovação
  ↓
merge
```

---

# 27. Code Review

Durante uma revisão posso analisar:

* arquivos modificados;
* linhas adicionadas;
* linhas removidas;
* possíveis erros;
* qualidade da implementação;
* adequação da mudança ao projeto.

Revisar código não significa apenas encontrar erros.

Também significa verificar se a alteração faz sentido antes de integrá-la.

---

# 28. Comentários e aprovação

Comentários permitem discutir alterações, pedir ajustes e registrar decisões.

Uma Pull Request pode seguir:

```text
Alteração
   ↓
Pull Request
   ↓
Revisão
   ↓
Comentários
   ↓
Ajustes
   ↓
Aprovação
   ↓
Merge
```

---

# 29. Personal Access Tokens

Um **Personal Access Token (PAT)** pode ser utilizado como credencial para autenticar operações e integrações com o GitHub.

Tokens devem ser tratados como informações sensíveis.

Nunca devem ser:

* adicionados diretamente ao código;
* commitados;
* publicados em repositórios;
* compartilhados sem necessidade.

---

# 30. GitHub Projects

**GitHub Projects** permitem organizar e acompanhar o trabalho relacionado ao desenvolvimento.

Podem reunir informações relacionadas a:

```text
Projeto
  ↓
organização do trabalho
  ↓
Issues / Pull Requests / atividades
```

Isso adiciona uma camada de gerenciamento acima de tarefas individuais.

---

# 31. Automações e Insights

Algumas partes do fluxo de trabalho podem ser automatizadas para reduzir atividades repetitivas.

**Insights** ajudam a acompanhar informações relacionadas ao projeto.

```text
Atividades
    ↓
Automações
    ↓
Fluxo organizado
    ↓
Insights
    ↓
Acompanhamento
```

---

# 32. Acesso e permissões

Nem todas as pessoas precisam possuir o mesmo nível de acesso.

```text
Usuários
   ↓
Permissões
   ↓
Ações permitidas
```

O gerenciamento de acesso ajuda a controlar o que cada pessoa pode fazer dentro de projetos e organizações.

---

# 33. Autenticação segura

A autenticação confirma a identidade antes de conceder acesso.

```text
Identidade
   ↓
Autenticação
   ↓
Autorização
   ↓
Acesso
```

Credenciais e tokens devem ser tratados com segurança e nunca expostos desnecessariamente.

---

# 34. InnerSource

**InnerSource** utiliza práticas de colaboração conhecidas em projetos open source dentro de organizações.

Pode permitir que diferentes equipes contribuam de forma organizada entre projetos internos.

```text
Equipes internas
      ↓
Issues / branches / PRs / reviews
      ↓
colaboração
      ↓
InnerSource
```

---

# 35. Dependabot

**Dependabot** está relacionado ao acompanhamento e segurança das dependências utilizadas pelo projeto.

```text
Projeto
   ↓
Dependências
   ↓
Acompanhamento
   ↓
Dependabot
   ↓
Segurança
```

O conceito reforçou que a segurança de um projeto não depende apenas do código escrito pela equipe, mas também das bibliotecas e pacotes externos utilizados.

---

# 36. Mapa mental final

Minha visão atual pode ser resumida em quatro níveis:

```text
1. VERSIONAMENTO

Working Tree
    ↓
Staging Area
    ↓
Commit
    ↓
Histórico


2. DESENVOLVIMENTO

main
 │
 ├── feature
 └── fix
      ↓
    merge


3. COLABORAÇÃO

Issue
  ↓
Branch
  ↓
Desenvolvimento
  ↓
Pull Request
  ↓
Review
  ↓
Approval
  ↓
Merge


4. GERENCIAMENTO

                    GitHub
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   Organização     Acesso        Segurança
        │             │             │
    Projects      Permissões    Autenticação
    Insights                        │
    Automação                 Dependabot
                                  │
                              InnerSource
```

---

# 37. Comandos essenciais

```bash
# Navegação
pwd
ls
cd

# Repositório
git init
git status

# Staging e commits
git add
git commit

# Histórico
git log
git show

# Comparação
git diff
git diff --staged

# Restaurar
git restore
git restore --staged
git revert

# Branches
git branch
git switch
git switch -c
git branch -m
git branch -d

# Integração
git merge

# Remotos
git clone
git remote
git remote -v

# Sincronização
git fetch
git pull
git push
```

---
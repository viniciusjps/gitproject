# Gitproject
Esse projeto apresenta um pequeno cliente para a visualização de repositórios do GitHub.
<hr>
Projeto realizado com Angular 12.1.1

## Instruções de desenvolvimento
Após realizar o clone do repositório, basta acessar a pasta do projeto e executar os seguintes comandos:
- npm install
- ng serve --port 2000
> E com isso a aplicação será servida na porta: `http:localhost:2000`

Para o uso da api, é necessário executar o comando `node api/src/index.js` no mesmo diretório. Será necessário a integração de um banco de dados

## API
Foi produzida para a aplicação uma pequena API REST em `NodeJs` com `Express`, que faz o uso da API do GitHub em sua maior parte, para obter os dados do usuário e de seus repositórios. Há tambem a utilização de um banco de dados Mongo para prover a persistência de algumas anotações.

## Live
[Aqui](https://gitchallenge.herokuapp.com/) você encontra a versão live da aplicação. Que foi hospedada no Heroku

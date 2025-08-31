# Changelog - Back-End
Todas as alterações notáveis no back-end serão documentadas neste arquivo.

## [1.4] - 2025-08-30
### Resumo
- Post/Get/Delete de users está totalmente funcional.
- Separação de controller, services e utils para melhor manutenção.

### Adicionado
- services
    - userServices.js
        - Services faz todas as configurações do banco de dados.
- utils
    - pokemonUtils.js
        - Funções de pokemon que podem ser reutilizadas

### Alteração
- routes.js
    - Alteração de chamada (por causa dos nomes de funções alteradas).
- db.js
    - Mudança do uso de common.js para ES, alterando a exportação e importação do arquivos.
- usersController.js
    - Controller agora só orquestra chamadas e se restrinnge a chamar função e enviar resposta.



## [1.3] - 2025-08-24
### Resumo
- Adição de dependência ao back-end.
- Mudança na forma de importar e exportar arquivos (commonJS -> ES).
- Alteração de controllers, destaque para 'cadastrarNovoUsuario' que adiciona o novo usuário e o pokemon inicial, ainda não finalizado.

### Adicionado
- package.json:
    - Novo comando 'dev' em package.json que chama a api utilizando nodemon.
    - Nova dependencia adicionada: 'uuid' para geração de ids para 'pokemons' e 'users';

### Alteração
- Mudança do uso de common.js para ES, alterando a exportação e importação do arquivos.
- index.js:
    - Mudança no root da api
    - Permitindo que a aplicação do front-end faça requisições de Post, Update, Delete.
- usersController.js:
    - Comentários com etapas que quero fazer na api.
    - 'postUser' - renomeado para 'cadastrarNovoUsuario', modificado para fazer alteração nas três tabelas 'users', 'pokemons' e 'pokemon_status'. (não finalizado)
    - 'getUsers' - modificado para receber parametros de busca.
    - 'deleteUser' Tratamento de erro em exclusão de usuário. (não finalizado)
    - Alteração de chamada (por causa dos nomes de funções alteradas)
- usersRoutes:
    - Renomeado para routes.
    - Alteração de chamada (por causa dos nomes de funções alteradas).



## [1.2] - 2025-08-17
### Resumo
- Criação de um novo método 'DELETE' na rota api/users/:id que exclui o usuário passado no parametro da url.

### Adicionado
- Adicionado mais um método a rota da api:
    - api/users/:id
        - Método: 'DELETE'
        - Descrição: Exclui um usuário com a id passada.



## [1.1] - 2025-08-17
### Resumo
- Criado o método 'POST' a rota api/users, para a criação de novos usuários.


### Adicionado
- Adicionado mais um método a rota da api:
    - api/users
        - Método: 'POST'
        - Descrição: Cria um novo usuário.



## [1.0] - 2025-08-17
### Resumo
- Estrutura inicial do back-end:
    - Criação do arquivo `db.js` para a configuração da coneção do banco de dados.
    - Criação do `usersController.js` para a manipulação do banco de dados.
    - Criação do `usersRoutes.js` para a definição das rotas da API.
    - Criação do `index.js` para a configuração da API como rota principal e porta de acesso para o front-end consumir.


### Adicionado
- Criação das pastas e arquivos iniciais:
    - controllers
        - usersController.js
    - models
        - db.js
    - routes
        - usersRoutes.js
    - index.js
    - package-lock.json
    - package.json

- Primeira rota criada:
    - api/users
        - Método: 'GET'
        - Descrição: retorna todos os usuários.
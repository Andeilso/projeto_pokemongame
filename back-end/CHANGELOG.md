# Changelog - Back-End
Todas as alterações notáveis no back-end serão documentadas neste arquivo.

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
# PokemonGame v0.4.3
> Atenção! Este projeto foi criado apenas para fins de aprendizagem.

Projeto de um site onde o usário possa capturar pokémons, batalhar contra pokémons e NPCs, visualizar pokemons e ganhar insignias.

## Tecnologias e linguagens a serem utilizadas

### Database
- SQL: Linguagem de consulta utilizada no projeto.
- MySql: Sistema de gerenciamento de banco de dados(SGBD) utilizado.
    
### Back-end
- Node.js: Usei para rodar Javascript do lado do servidor.
- Express: Usei para a criação da API.
- Javascript: Usei para programar a lógica da API.
    
### Front-end
- HTML: Usei para estruturar a interface
- CSS: Usei para estilizar a interface
- JavaScript: Usei para programar eventos, funções e a interação com a API.

### Docker-compose
- Utilização de docker para contanização

## Documentação

### Versionamentos
- [MySql](https://www.mysql.com/) - v9
- [Node.js](https://nodejs.org/) - v24
- [Express](https://expressjs.com/) - v5.1.0
- Projeto:
    - Database - v1.4
    - Back-end - v1.2
    - Front-end - v1.3
    - Docker - v2

## Como inicializar o PokemonGame

> Essa versão utiliza o Docker, necessário baixar e instalar Docker.

### Instalação do Docker
- Acesse o site oficial do [Docker](https://www.docker.com/), baixe a versão para seu sistema operacional e siga os passos do instalador.

### Baixe o projeto
- Clique no botão Code.
- Depois clique na opção "Download Zip".
- Descompacte a pasta em um diretório de sua preferência.

### Rodando o projeto
- Abra o terminal na pasta do projeto:
    - Clique com botão direito em cima da pasta e selecione a opção **"Abrir no terminal"**.
    - Ou abra um terminal e navegue até a pasta do projeto usando "cd caminho/para/pasta".
- No terminal execute o comando:
    ```bash
    docker compose up
    ```
- Aguarde a construção do Docker finalizar.
- Acesse http://localhost:5000.
- Pronto! A página do PokemonGame deverá aparecer e você poderá testar.

### Parando o projeto
- Com Docker Desktop:
    - Abra o **Docker Desktop**.
    - Vá para a secção "Container" do lado esquerdo.
    - Do lado direito vai aparecer os containers que estão rodando.
    - No primeiro item, vai ter um botão em formato de quadrado, clique nele.
    - O docker irá fazer o processo de parar o projeto.
    - Pronto! O projeto não está mais rodando.
    - Dicas:
        - Para fazer o projeto rodar novamente, basta clicar no botão de "play" e aguardar o docker montar o projeto.
        - Se quiser você pode excluí-lo clicando no ícone de lixeira. Porém para iniciá-lo novamente você terá que refazer todo o processo dentro da seção  "Rodando Projeto".

- Com terminal:
    - Abra o terminal na pasta do projeto.
    - Ou abra o terminal e navegue até a pasta do projeto.
    - Execute o comando:
        ```bash
        docker compose down
        ```
    - Aguarde o Docker parar o projeto.
    - Pronto! O projeto para de funcionar.
    - Se quiser rodar novamente, execute:
        ```bash
        docker compose up
        ```

### Changelogs
- [Database](./db-init/CHANGELOG.md)
- [Back-end](./back-end/CHANGELOG.md)
- [Front-end](./front-end/CHANGELOG.md)
- [Docker-compose](./docker/CHANGELOG.md)
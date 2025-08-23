# Changelog - Docker compose
Todas as alterações notáveis no docker-compose serão documentadas neste arquivo.

## [3.0] - 2025-08-23
### Resumo
- Adicionado ao docker-compose as configurações do front-end.

### Adicionado
- configurações do front-end:
    - image: nginx:alpine
    - Arquivos a ser passado para o volume
    - Porta
    - Conexão
    - Dependencia do back-end

## [2.0] - 2025-08-18
### Resumo
- Adicionado ao docker-compose as configurações do back-end.

### Adicionado
- configurações do back-end:
    - image: node - v24
    - Criação da pasta de trabalho do back-end
    - Arquivos a ser passado para a pasta de trabalho
    - Comandos para instalar dependencias e para iniciar o banco de dados
    - Porta
    - Variaveis de ambiente
    - Volume de inicio para criação de tabelas e de persistência de dados
    - Conexão
    - Dependencia do banco de dados

## [1.0] - 2025-08-18
### Resumo
- Adicionado ao docker-compose as configurações do banco de dados.

### Adicionado
- configurações do banco de dados:
    - image: mysql - v9.0
    - Variaveis de ambiente
    - Porta
    - Volume de inicio para criação de tabelas e de persistência de dados
    - Conexão
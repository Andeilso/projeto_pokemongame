# Changelog - Database
Todas as alterações notáveis no database serão documentadas neste arquivo.

## [1.4] - 2025-08-19
### Resumo
- Exclusão das tabelas `battle_pokemons` e `pc_pokemons`.
- Alteração na tabela `pokemons` para receber um ENUM com as opções ("Battle", "PC") deixando as tabelas removidas obsoletas.
- Alteração na tabela `pokemons`, para que cada pokemon esteja apenas em um local de armazenamento e com um numero de slot criei um unique que utiliza as colunas `user_id`, `storage_location` e `slot_number`.
- Alteração na tabela `pokemon_status`, amarração maior da tabela com a tabela `pokemons` utilizando a PK `pokemon_uuid` como PK e FK da tabela `pokemon_status`.

### Alteração
- Alteração nas tabelas:
    - pokemons
    - pokemon_status

### Removido
- Tabelas removidas:
    - battle_pokemons
    - pc_pokemons

## [1.3] - 2025-08-18
### Resumo
- Criação da tabela `pokemons` para receber a criação do pokémon e para a criação e utilização da primary key pokemon_uuid.
- As tabelas `battle_pokemons` e `pc_pokemon` agora não recebem novos pokemons, apenas referências de usuario_id, pokemon_uuid e contam com a coluna order_number.

### Adicionado
- Criação da tabela:
    - pokemons

### Alteração
- Alteração nas tabelas:
    - battle_pokemons
    - pc_pokemons

## [1.2] - 2025-08-17
### Resumo
- Criação da tabela `pokemon_status` para separar os status da tabela `battle_pokemons `e `pc_pokemons`.

### Adicionado
- Criação da tabela:
    - pokemon_status

### Alteração
- Alteração nas tabelas:
    - battle_pokemons
    - pc_pokemons

## [1.1] - 2025-08-17
### Resumo
- Estrutura inicial do banco de dados com tabelas principais (`users`, `items`, `battle_pokemons`, `pc_pokemons`, `users_items`).

### Adicionado
- Criação das tabelas do projeto:
    - users
    - items
    - battle_pokemons
    - pc_pokemons
    - users_items
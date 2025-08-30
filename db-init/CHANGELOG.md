# Changelog - Database
Todas as alterações notáveis no database serão documentadas neste arquivo.

## [1.6] - 2025-08-30
### Resumo
- Criação de view para trazer rapidamente todos os pokemons de todos os usuários cadastrados.
- As tabelas 'pokemons' e 'pokemon_status' foram alterados, agora se um usuário for excluido do banco de dados, todos os pokemons e pokemons_status ligado ao usuário serão excluídos. 

### Adicionado
View
    - v_all_users_pokemons

### Alteração
Tabelas
    - pokemons
    - pokemon_status



## [1.5] - 2025-08-24
### Resumo
- Adicionado uma nova seed para que a tabela items já tenha produtos cadastrados.
- Agora a identificação do usuário e pokemon não será auto incrementado, será gerado no back-end, as tabelas foram alteradas para receber a nova indentificação.
- Tamanho da descrição aumentada para receber texto maiores.
- A tabela 'pokemon_status' estava recebendo a foreign key de forma errada, erro concertado.

### Adicionado
Seeds:
    - seed_items

### Alteração
Tabelas:
    - users
    - items
    - pokemons
    - pokemon_status
    - users_items



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
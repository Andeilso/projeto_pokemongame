/*
    Relacionamentos
    users x battle_pokemons - Um usuário pode ter no minimo 1 ou varios(6) battle_pokemons; (1:N)
    users x items - Um usuário pode ter nenhum ou vários itens em sua mochila; (0:N)
    users x pc_pokemons - Um usuário pode ter nenhum ou vários pokemons_pc; (0:N)
*/
CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    money INT NOT NULL DEFAULT 0
);

/*
    Relacionamentos
    status x battle_pokemons - Um pokemon_status sempre vai pertencer 1, e somente 1, pokemon dentro de ; (1:1)
    status x pc_pokemons - Um pokemon de pc_pokemons pode possuir nenhum ou no máximo 1 item com ele; (0:1)
*/
CREATE TABLE pokemon_status(
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    pokemon_level INT NOT NULL,
    hp INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    special_attack INT NOT NULL,
    special_defense INT NOT NULL,
    speed INT NOT NULL,
    iv INT NOT NULL
);

/*
    Relacionamentos
    items x users - Um item pode pertencer a 0 ou vários usuários; (0:N)
    items x battle_pokemons - Um item pode pertencer a nenhum ou vários pokemons dentro de battle_pokemons; (0:N)
    items x pc_pokemons - Um item pode pertencer a nenhum ou vários pokemons dentro de pokemons_pc; (0:N)
*/
CREATE TABLE items(
    item_id INT PRIMARY KEY,
    item_name varchar(30),
    item_description varchar(100)
);

/*
    Relacionamentos
    pokemons x battle_pokemons - Um pokemon só pode estar em um modo battle_pokemons ou pc_pokemons; (1:1)
    pokemons x pc_pokemons - Um pokemon só pode estar em um modo pc_pokemons ou battle_pokemons; (1:1)
*/
CREATE TABLE pokemons(
    pokemon_uuid CHAR(36) PRIMARY KEY,
    api_id VARCHAR(4) NOT NULL,
    pokemon_name VARCHAR(50) NOT NULL,
    shiny BOOLEAN NOT NULL,
    sprite_front VARCHAR(100) NOT NULL,
    sprite_back VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    status_id INT NOT NULL,
    item_id INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (status_id) REFERENCES pokemon_status(status_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);

/*
    Relacionamentos
    battle_pokemons x users - Um pokemon dentro de battle_pokemons deve possuir 1 unico usuário; (1:1)
    battle_pokemons x items - Um pokemon dentro de battle_pokemons pode ter nenhum ou no máximo 1 item com ele; (0:1)
    battle_pokemons x status - Um pokmeon sempre vai possui um, e apenas um, status; (1:1)
*/
CREATE TABLE battle_pokemons(
    order_number CHAR(1) NOT NULL,
    pokemon_uuid CHAR(36) NOT NULL,
    user_id INT NOT NULL,
    UNIQUE (user_id, order_number),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (pokemon_uuid) REFERENCES pokemons(pokemon_uuid)
);

/*
    Relacionamentos
    pc_pokemons x users - Um pokemon de pc_pokemons devem pertencer a unico usuário; (1:1)
    pc_pokemons x items - Um pokemon de pc_pokemons pode possuir nenhum ou no máximo 1 item com ele; (0:1)
    pc_pokemons x status - Um pokmeon sempre vai possui um, e apenas um, status; (1:1)
*/
CREATE TABLE pc_pokemons(
    slot_number CHAR(5) NOT NULL,
    pokemon_uuid CHAR(36) NOT NULL,
    user_id INT NOT NULL,
    UNIQUE (user_id, slot_number),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (pokemon_uuid) REFERENCES pokemons(pokemon_uuid)
);



-- Relacionamentos N:N
/*
    users x items - Usuários pode possuir nenhum ou varios items. - Items podem pertencer a nenhum ou a varios usuários. (N:N)
*/
CREATE TABLE users_items(
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);
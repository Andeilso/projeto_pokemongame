/*
    Relacionamentos
    users x pokemons - Um usuário pode ter no minimo 1 ou varios pokemons; (1:N)
    users x items - Um usuário pode ter nenhum ou vários itens em sua mochila; (0:N)
*/
CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    money INT NOT NULL DEFAULT 0
);

/*
    Relacionamentos
    items x users - Um item pode pertencer a 0 ou vários usuários; (0:N)
    items x pokemons - Um item pode pertencer a 0 ou vários pokemons; (0:N) 
*/
CREATE TABLE items(
    item_id INT PRIMARY KEY,
    item_name varchar(30),
    item_description varchar(100)
);

/*
    Relacionamentos
    pokemons x users - Um pokemon pertence a um, e somente um, unico usuário; (1:1)
    pokemons x pokemon_status - Um pokemon possui um, e somente um, unico status; (1:1)
    pokemons x items - Um pokemon pode possuir nenhum ou somente um item; (1:1)
*/
CREATE TABLE pokemons(
    pokemon_uuid CHAR(36) PRIMARY KEY,
    api_id VARCHAR(4) NOT NULL,
    pokemon_name VARCHAR(50) NOT NULL,
    shiny BOOLEAN NOT NULL,
    sprite_front VARCHAR(100) NOT NULL,
    sprite_back VARCHAR(100) NOT NULL,
    slot_number INT NOT NULL,
    storage_location ENUM('BATTLE', 'PC') NOT NULL,
    user_id INT NOT NULL,
    item_id INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    UNIQUE(user_id, storage_location, order_number)
);

/*
    Relacionamentos
    pokemon_status x pokemons - Um status pertence a um, e somente um, unico pokemon; (1,1)
*/
CREATE TABLE pokemon_status(
    pokemon_uuid CHAR(36) NOT NULL,
    pokemon_level INT NOT NULL,
    hp INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    special_attack INT NOT NULL,
    special_defense INT NOT NULL,
    speed INT NOT NULL,
    iv INT NOT NULL,
    PRIMARY KEY (pokemon_uuid) REFERENCES pokemons(pokemon_uuid)
);



-- Relacionamentos N:N
/*
    users x items - Usuários pode possuir varios items e items podem pertencer a varios usuários. (N:N)
*/
CREATE TABLE users_items(
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);
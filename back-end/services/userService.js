import { buscarPokemonNaApi, gerarSprites, ehShiny } from '../utils/pokemonUtils.js';
import { v4 as uuidv4 } from 'uuid';
import db from '../models/db.js';


export async function cadastrarUsuarioComPokemon({ name, avatar, money, pokemon_id }){
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {        
        const user_uuid = uuidv4();
        const pokemon_uuid = uuidv4();

        const pokemon = await buscarPokemonNaApi(pokemon_id);

        let shiny = ehShiny();
        let sprites = gerarSprites(pokemon, shiny);

        const [userResult] = await connection.query(
            'INSERT INTO users(user_uuid, user_name, avatar, money) VALUES(?, ?, ?, ?);',
            [
                user_uuid,
                name,
                avatar,
                money
            ]
        );

        
        const [pokemonResult] = await connection.query(
            'INSERT INTO pokemons(pokemon_uuid, api_id, pokemon_name, shiny, sprite_front, sprite_back, slot_number, storage_location, user_uuid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [
                pokemon_uuid,
                pokemon_id,
                pokemon.name,
                shiny,
                sprites.front,
                sprites.back,
                1,
                'BATTLE',
                user_uuid
            ]
        );
        
        const [pokemonStatusResult] = await connection.query(
            'INSERT INTO pokemon_status(pokemon_uuid, pokemon_level, hp, attack, defense, special_attack, special_defense, speed, iv) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [
                pokemon_uuid, 
                1, 
                pokemon.stats[0].base_stat,
                pokemon.stats[1].base_stat,
                pokemon.stats[2].base_stat,
                pokemon.stats[3].base_stat,
                pokemon.stats[4].base_stat,
                pokemon.stats[5].base_stat,
                Math.floor(Math.random()*7)
            ]
        );

        await connection.commit();
        return { user_uuid, name, avatar, money, pokemon: pokemon.name };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export async function buscarUsuarios({ user_uuid, user_name, avatar, money }){
    let params = [];
    let conditions = [];
    let query = 'SELECT * FROM users';

    if(user_uuid){
        conditions.push('user_uuid = ?');
        params.push(user_uuid);
    };

    if(user_name){
        conditions.push('user_name LIKE ?');
        params.push(user_name);
    };

    if(avatar){
        conditions.push('avatar = ?');
        params.push(avatar);
    };

    if(money){
        conditions.push('money = ?');
        params.push(money);
    };

    if(conditions.length >= 1){
        query += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(query + ';', params);
    return rows;
};

export async function deletarUsuarioEPokemons(user_uuid){
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const [deleteUserResult] = await connection.query(
            'DELETE FROM users WHERE user_uuid = ?;',
            [user_uuid]
        )
        await connection.commit();
        return "Usuário e pokemons do usário excluidos com sucesso.";
    } catch (error) {
        await connection.rollback();
        throw new Error("Erro ao excluir usuário e pokemos do usuário. error: " + error);
    } finally {
        connection.release();
    }
};
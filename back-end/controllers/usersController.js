import db from '../models/db.js';
import { v4 as uuidv4 } from 'uuid';

// Quais funçoes eu quero
// 1º cadastrar novo usuário:
    // - Cadastrar na tabela user
    // - Cadastrar na tabela pokemons
    // - Cadastrar na tabela pokemon_status
    // - Devolver ao fron um local storage:
        //  - Deve ter os dados do usuário completo
        //  - Deve conter o pokemon completo
// 2º Chamada que retorna os dados do usuário e seus 6 pokemons;
// 6º Pokedex - mostrar todos os pokemons como uma pokedex

async function cadastrarNovoUsuario(req, res){
    let connection;

    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const { name, avatar, money, pokemon_id } = req.body;
        const user_uuid = uuidv4();
        const pokemon_uuid = uuidv4();

        const pokemonPromise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`);
        const pokemonResponse = await pokemonPromise.json();

        let sprite = {};
        let shiny = Math.floor(Math.random()*11) >= 9 ? true : false;
        if(shiny){
            sprite = {
                front: pokemonResponse.sprites.front_shiny,
                back: pokemonResponse.sprites.back_shiny
            }
        } else {
            sprite = {
                front: pokemonResponse.sprites.front_default,
                back: pokemonResponse.sprites.back_default
            }
        }

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
                pokemonResponse.name,
                shiny,
                sprite.front,
                sprite.back,
                1,
                'BATTLE',
                user_uuid
            ]
        );

        await connection.query(
            'INSERT INTO pokemon_status(pokemon_uuid, pokemon_level, hp, attack, defense, special_attack, special_defense, speed, iv) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [
                pokemon_uuid, 
                1, 
                pokemonResponse.stats[0].base_stat,
                pokemonResponse.stats[1].base_stat,
                pokemonResponse.stats[2].base_stat,
                pokemonResponse.stats[3].base_stat,
                pokemonResponse.stats[4].base_stat,
                pokemonResponse.stats[5].base_stat,
                Math.floor(Math.random()*7)
            ]
        );

        await connection.commit();
        connection.release();

        res.status(201).json({ user_uuid, name, avatar, money, pokemon: pokemonResponse.name });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

async function getUser(req, res){
    try {
        const { user_uuid, user_name, avatar, money } = req.query;
        
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

        const [rows] = await db.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function deleteUser(req, res){
    try {
        console.log(req.params);
        
        throw new Error(`Usuário não cadastrado ou id de usuário inválido`);
        const {id} = req.params;
        const [result] = await db.query(
            'DELETE FROM users WHERE user_uuid = ?;',
            [id]
        );

        if(result.affectedRows > 1){
            res.json(`Usuário deletado com sucesso.`);
        } else {
            throw new Error(`Usuário não cadastrado ou id de usuário inválido`);
        };
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { cadastrarNovoUsuario, getUser, deleteUser };
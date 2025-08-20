const CriarPadraoPokemon = async function(pokemonId){
    try{
        const pokemonResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon = await pokemonResposta.json();
        
        const eh_shiny = Math.round(Math.random()*100) >= 95 ? true : false;
        const iV = Math.round( Math.random() * 6 );        
        let sprite;
        
        if(eh_shiny){
            sprite = {
                frente: pokemon.sprites.front_shiny,
                costas: pokemon.sprites.back_shiny
            }   
        } else {
            sprite = {
                frente: pokemon.sprites.front_default,
                costas: pokemon.sprites.back_default
            };
        }

        return {
            id: pokemon.id,
            nome: pokemon.name,
            eh_shiny: eh_shiny,
            sprite: sprite,
            tipo: pokemon.types.map( tipo => tipo.type.name),
            status: {
                level: 1,
                hp: pokemon.stats[0].base_stat,
                ataque: pokemon.stats[1].base_stat,
                defesa: pokemon.stats[2].base_stat,
                ataque_especial: pokemon.stats[3].base_stat,
                defesa_especial: pokemon.stats[4].base_stat,
                velocidade: pokemon.stats[5].base_stat,
                proximo_nivel: 39
            },
            iV: iV,
            segurando_item: null,
            movimentos: await listarMovimentos(pokemon.moves, '1'),
            evolucoes: await evolucoes(pokemon.species.url)
        };
    } catch(erro){
        console.error("Erro ao buscar dados do Pokémon:", pokemonId);
        throw erro;
    }
}

const listarMovimentos = async function (pokemonMoves, level) {
    let moves = pokemonMoves.filter( move => {
        if( move.version_group_details[0].level_learned_at <= level 
            && move.version_group_details[0].move_learn_method.name === 'level-up'){
                return move;
            }
    })
    
    moves = await criarPadraoMovimento(moves);

    return  moves
};

const criarPadraoMovimento = async function (moves) {
    return await Promise.all(moves.map( async (move) => {
        try {
            const moveResposta = await fetch(move.move.url);
            const moveDados = await moveResposta.json();
            
            return {
                nome: moveDados.name,
                poder: moveDados.power,
                precisao: moveDados.accuracy,
                pp: moveDados.pp
            }
            
        } catch(erro) {
            console.error("Erro ao criar objeto de movimento:", move);
            throw erro;
        }
    }));
};

const evolucoes = async function (pokemonEspecieUrl){
    let pokemonEvolucaoAtual = null;
    let evolucao = [];

    const pokemonEspecie = await fetch(pokemonEspecieUrl)
        .then( resposta => resposta.json());


    const pokemonCadeiaDeEvolucao = await fetch(pokemonEspecie.evolution_chain.url)
        .then( resposta => resposta.json());
    
    
    pokemonEvolucaoAtual = pokemonEspecie.id;

    
    if( pokemonCadeiaDeEvolucao.chain.evolves_to.length > 0) {
        if(pokemonCadeiaDeEvolucao.chain.evolves_to[0].species.url.split('/')[6] > pokemonEvolucaoAtual){
            evolucao.push({
                levelParaEvoluir: pokemonCadeiaDeEvolucao.chain.evolves_to[0].evolution_details[0].min_level,
                evoluiPara: pokemonCadeiaDeEvolucao.chain.evolves_to[0].species.url.split('/')[6]
            })
        };
        
        if(pokemonCadeiaDeEvolucao.chain.evolves_to[0].evolves_to.length > 0 
            && pokemonCadeiaDeEvolucao.chain.evolves_to[0].evolves_to[0].species.url.split('/')[6] > pokemonEvolucaoAtual){
                
            evolucao.push({
                levelParaEvoluir: pokemonCadeiaDeEvolucao.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
                evoluiPara: pokemonCadeiaDeEvolucao.chain.evolves_to[0].evolves_to[0].species.url.split('/')[6]
            });
        } else {
            return null;
        }
        console.log(evolucao);
        
        
    } else {
        return null;
    }
    
    return evolucao;
}

const aumentarNivel = function (pokemon){
    pokemon.status.level += 1;
    pokemon.status.hp += Math.floor( Math.random() * pokemon.iV ) + 5;
    pokemon.status.ataque += Math.floor( Math.random() * pokemon.iV ) + 3;
    pokemon.status.defesa += Math.floor( Math.random() * pokemon.iV ) + 3;
    pokemon.status.ataque_especial += Math.floor( Math.random() * pokemon.iV ) + 2;
    pokemon.status.defesa_especial += Math.floor( Math.random() * pokemon.iV ) + 2;
    pokemon.status.velocidade += Math.floor( Math.random() * pokemon.iV ) + 2;
    pokemon.status.proximo_nivel *= pokemon.status.level;
};

export { CriarPadraoPokemon }
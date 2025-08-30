export async function buscarPokemonNaApi(pokemon_id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`);

    if(!response.ok) throw new Error("Erro ao buscar pokemon na API");
    
    return await response.json();
};

export function ehShiny(){
    return Math.floor(Math.random()*11) >= 9 ? true : false;
};

export function gerarSprites(pokemon, shiny){
    let sprite = {};

    if(shiny){
        sprite = {
            front: pokemon.sprites.front_shiny,
            back: pokemon.sprites.back_shiny
        }
    } else {
        sprite = {
            front: pokemon.sprites.front_default,
            back: pokemon.sprites.back_default
        }
    }

    return sprite;
};
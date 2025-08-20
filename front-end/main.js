import { CriarPadraoPokemon } from "./javascript/Pokemon.js";

// CriarPadraoPokemon('6').then( pokemon => {
//     console.log(pokemon);
// });

document.addEventListener('DOMContentLoaded', () => {
    // Variáveis
    const botaoIniciarJornada = document.querySelector('.botao-iniciar-jornada');
    const novoJogador = document.querySelector('.novo-jogador');
    const boasVindas = document.querySelector('.boas-vindas');

    const cartaoJogador = JSON.parse( localStorage.getItem('cartaoJogador') );
    

    
    // Eventos
    botaoIniciarJornada.addEventListener('click', () => {
        esconderTela( [boasVindas, novoJogador] );
    })
    
    document.querySelector('#form-jogador').addEventListener( 'submit', async evento => {
        evento.preventDefault();
        
        const formNovoJogador = document.querySelector('#form-jogador');
        const dadosDoNovoJogador = new FormData(formNovoJogador);
        

        let pokemonInicial;
        await CriarPadraoPokemon( Number( dadosDoNovoJogador.get('pokemon-inicial')) ).then( pokemon => {
            pokemonInicial = pokemon;
        });
    

        const objetoNovoJogador = {
            nome: dadosDoNovoJogador.get('nome'),
            avatar: dadosDoNovoJogador.get('avatar'),
            dinheiro: 2000,
            inventario: [],
            medalhas: [],
            pokemons_de_batalha: [pokemonInicial],
            pokemons_no_pc: [],
        };
        
        localStorage.setItem( 'cartaoJogador', JSON.stringify(objetoNovoJogador) );
    
        esconderTela([novoJogador])
    })



    // Funções
    const esconderTela = (divTelaArray) => {
        if( divTelaArray instanceof Array ){
            // Esconde/Disponibiliza cada tela passada como parâmetro
            divTelaArray.map( divTela => {
                divTela.classList.toggle('esconder');
            })
        } else {
            // Esconde/Disponibiliza a tela passada como parâmetro
            divTelaArray.classList.toggle('esconder');
        }
        
    };

    // const setarDadosDoJogador = (cartaoJogador) => {
    //     esconderTela( document.querySelector('.cartao-treinador') );

    //     document.querySelector('.cartao-treinador__avatar').setAttribute('src', `./assets/img/avatar/${cartaoJogador.avatar}`);

    //     // Para cada pokemon de batalha, preenche o card de pokemon
    //     const cardsPokemonImg = document.querySelectorAll('.pokemon-imagem');

    //     cartaoJogador.pokemons_de_batalha.forEach( (pokemon, index) => {
    //         cardsPokemonImg[index].setAttribute('src', pokemon.sprite.frente);
    //         cardsPokemonImg[index].setAttribute('alt', `Uma imagem de frente do pokémon: ${pokemon.nome}`);
    //     });
    // };

    const setarDadosDoJogador = async function(){
        try {
            const response = await fetch("http://localhost:3000/api/users/");
            const responseOK = await response.json();
            console.log(responseOK);
            
        } catch (error) {
            console.log(error);
        }
    };

    

    // Carregar Telas
    if(!cartaoJogador) {
        // document.querySelector('.boas-vindas').classList.toggle('esconder');
    } else {
        setarDadosDoJogador(cartaoJogador);
        // document.querySelector('.cartao-treinador').classList.toggle('esconder');
    }

    setarDadosDoJogador(cartaoJogador);
})
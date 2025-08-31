import { cadastrarUsuarioComPokemon, buscarUsuarios, deletarUsuarioEPokemons } from "../services/userService.js";

// Boa prática controler só recebe a requisição, apenas chama a função(serviço) de tratamento/execucao e retorna a resposta 
async function cadastrarNovoUsuario(req, res){
    try {
        const resultado = await cadastrarUsuarioComPokemon(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

async function buscarUsuario(req, res){
    try {
        const resultado = await buscarUsuarios(req.query);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function deletarUsuario(req, res){
    try {        
        let {id} = req.params;
        const response = await deletarUsuarioEPokemons(id);
        res.status(200).json({message: response});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { cadastrarNovoUsuario, buscarUsuario, deletarUsuario };
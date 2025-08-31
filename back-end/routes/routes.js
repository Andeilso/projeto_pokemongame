import express from 'express';
import { cadastrarNovoUsuario, buscarUsuario, deletarUsuario } from '../controllers/usersController.js';
const router = express.Router();

// USERS
router.post('/users', cadastrarNovoUsuario);
router.get('/users', buscarUsuario);
router.delete('/users/:id', deletarUsuario);

// POKEMONS


// ITEMS


// Pokedex

export default router;
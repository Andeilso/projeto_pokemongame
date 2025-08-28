import express from 'express';
import { cadastrarNovoUsuario, getUser, deleteUser } from '../controllers/usersController.js';
const router = express.Router();

router.post('/users', cadastrarNovoUsuario);
router.get('/users', getUser);
router.delete('/users/:id', deleteUser);

export default router;
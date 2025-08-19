const express = require('express');
const {getUsers, postUser, deleteUser} = require ('../controllers/usersController.js');
const router = express.Router();

router.get('/users', getUsers);
router.post('/users', postUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
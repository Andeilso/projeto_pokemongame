const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes.js');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET'],
    //credentials: true
}))

app.use(express.json());

app.use('/api', usersRoutes);

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});
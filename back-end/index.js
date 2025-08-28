import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5000',
    methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    //credentials: true
}))

app.use(express.json());

app.use('/', routes);

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});
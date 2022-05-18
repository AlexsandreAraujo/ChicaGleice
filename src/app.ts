import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import AppError from './errors/AppError';
import ProdutosGabiqService from './services/produtos/gabiq';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log('err');

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

// atualiza o banco de dados
const delay = 60000;

setTimeout(function request() {
    const date = new Date();
    if (
        date.getHours() > 7 &&
        date.getHours() < 22 &&
        date.getMinutes() === 0
    ) {
        const produtosGabiq = new ProdutosGabiqService();
        produtosGabiq.execute();
    }
    setTimeout(request, delay);
}, delay);

export default app;

import { Router } from 'express';
import ProdutosGabiq from '../models/ProdutosGabiq';
import ProdutosGabiqService from '../services/produtos/gabiq';

const produtosRouter = Router();

produtosRouter.get('/', async (request, response) => {
    const produtos = await ProdutosGabiq.find();

    return response.json(produtos);
});

produtosRouter.post('/', async () => {
    const produtosGabiq = new ProdutosGabiqService();
    produtosGabiq.execute();
});

export default produtosRouter;

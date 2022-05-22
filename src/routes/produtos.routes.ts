import { Router } from 'express';
import { Equal, MoreThanOrEqual, ILike } from 'typeorm';
import ProdutosGabiq from '../models/ProdutosGabiq';
import ProdutosGabiqService from '../services/produtos/gabiq';

const produtosRouter = Router();

produtosRouter.get('/', async (request, response) => {
    const {
        category,
        name,
        available,
        option0,
        option1,
        // option2,
        preco,
        // stock,
    } = request.body;
    const produtos = await ProdutosGabiq.findBy({
        category: ILike(`%${category}%`),
        name: ILike(`%${name}%`),
        available: Equal(available),
        option0: ILike(`%${option0}%`),
        option1: ILike(`%${option1}%`),
        // option2: Like(`%${option2}%`),
        preco: MoreThanOrEqual(preco),
        // stock: MoreThanOrEqual(stock),
    });
    return response.json(produtos);
});

produtosRouter.post('/', async () => {
    const produtosGabiq = new ProdutosGabiqService();
    produtosGabiq.execute();
});

export default produtosRouter;

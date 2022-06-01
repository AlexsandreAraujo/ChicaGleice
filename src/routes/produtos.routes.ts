import { Router } from 'express';
import { Equal, MoreThanOrEqual, ILike } from 'typeorm';
import ProdutosGabiq from '../models/ProdutosGabiq';
import ProdutosGabiqService from '../services/produtos/gabiq';
import AppError from '../errors/AppError';

const produtosRouter = Router();
produtosRouter.get('/all', async (request, response) => {
    const produtos = await ProdutosGabiq.find();
    return response.json(produtos);
});

produtosRouter.get('/distinct', async (request, response) => {
    const allproducts = await ProdutosGabiq.find();

    const allDistinctProducts = Array.from(
        new Set(allproducts.map(s => s.product_id)),
    ).map(product_id => {
        return allproducts.find(s => s.product_id === product_id);
    });

    return response.json(allDistinctProducts);
});

produtosRouter.get('/filter', async (request, response) => {
    const {
        category,
        name,
        available,
        option0,
        option1,
        // option2,
        preco,
        stock,
    } = request.body;
    const produtos = await ProdutosGabiq.findBy({
        category: ILike(`%${category}%`),
        name: ILike(`%${name}%`),
        available: Equal(available),
        option0: ILike(`%${option0}%`),
        option1: ILike(`%${option1}%`),
        // option2: Like(`%${option2}%`),
        preco: MoreThanOrEqual(preco),
        stock: MoreThanOrEqual(stock),
    });
    return response.json(produtos);
});

produtosRouter.get('/variants', async (request, response) => {
    const { product_id } = request.body;

    let productVariants = [];

    productVariants = await ProdutosGabiq.find({ where: { product_id } });

    if (productVariants.length === 0) {
        throw new AppError('Produto não Encontrado', 401);
    }

    const productPropiets = {
        product_id: productVariants[0].product_id,
        category: productVariants[0].category,
        name: productVariants[0].name,
        available: productVariants[0].available,
        preco: productVariants[0].preco,
        stock: productVariants[0].stock,
    };

    const productSizes = productVariants
        .map(x => x.option0)
        .filter((value, index, self) => self.indexOf(value) === index);

    const productColors = productVariants
        .map(x => x.option1)
        .filter((value, index, self) => self.indexOf(value) === index);

    const productImageUrls = productVariants
        .map(x => x.image_url)
        .filter((value, index, self) => self.indexOf(value) === index);

    return response.json({
        productPropiets,
        productSizes,
        productColors,
        productImageUrls,
    });
});

produtosRouter.post('/', async () => {
    const produtosGabiq = new ProdutosGabiqService();
    produtosGabiq.execute();
});

export default produtosRouter;

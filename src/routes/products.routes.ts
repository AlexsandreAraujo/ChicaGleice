import { Router } from 'express';
import ProdutosGabiq from '../models/ProdutosGabiq';
import CaptureGabiqProdutosService from '../services/products/captureGabiqProductsService';
import DistinctProductsService from '../services/products/distinctProductsService';
import FilterProductsService from '../services/products/filterProductsService';
import InsertProductsService from '../services/products/insertProductsService';
import VariantsProductsService from '../services/products/variantsProductsService';

const produtosRouter = Router();

produtosRouter.get('/all', async (request, response) => {
    const produtos = await ProdutosGabiq.find();
    return response.json(produtos);
});

produtosRouter.post('/executecapture', async (request, response) => {
    const captureGabiqProdutosService = new CaptureGabiqProdutosService();
    captureGabiqProdutosService.execute();
    return response.json({ mensagem: 'executado com sucesso!' });
});

produtosRouter.get('/distinct', async (request, response) => {
    const distinctProductsService = new DistinctProductsService();
    const distinctProducts = await distinctProductsService.execute();

    return response.json(distinctProducts);
});

produtosRouter.get('/filter', async (request, response) => {
    const filterProductsService = new FilterProductsService();
    const filterProducts = await filterProductsService.execute(request.body);

    return response.json(filterProducts);
});

produtosRouter.post('/insertproduct', async (request, response) => {
    const product_id = request.body;
    const insertProductsService = new InsertProductsService();
    await insertProductsService.execute(product_id);
    return response.json({ mensagem: 'produto(s) inserido com sucesso!' });
});

produtosRouter.get('/variants', async (request, response) => {
    const { product_id } = request.body;
    const variantsProductsService = new VariantsProductsService();
    const variantsProducts = await variantsProductsService.execute(product_id);
    return response.json(variantsProducts);
});

export default produtosRouter;

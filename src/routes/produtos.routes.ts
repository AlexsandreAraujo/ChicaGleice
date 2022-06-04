import { Router } from 'express';
import { Equal, MoreThanOrEqual, ILike, In } from 'typeorm';
import ProdutosGabiq from '../models/ProdutosGabiq';
import ProdutosGabiqService from '../services/produtos/gabiq';
import AppError from '../errors/AppError';
import AppDataSource from '../database/db';
import ProdutosChicaGleice from '../models/ProdutosChicaGleice';

const produtosRouter = Router();
produtosRouter.get('/all', async (request, response) => {
    const produtos = await ProdutosGabiq.find();
    return response.json(produtos);
});

produtosRouter.get('/distinct', async (request, response) => {
    const allproducts = await ProdutosGabiq.findBy({
        // eslint-disable-next-line
        // @ts-ignore
        available: Equal(true),
    });

    const allDistinctProducts = Array.from(
        new Set(allproducts.map(s => s.product_id)),
    ).map(product_id => {
        return allproducts.find(s => s.product_id === product_id);
    });

    return response.json(allDistinctProducts);
});

produtosRouter.get('/filter', async (request, response) => {
    const {
        product_id,
        category,
        name,
        available,
        option0,
        option1,
        // option2,
        preco,
        stock,
    } = request.body;
    if (available === null) {
        throw new AppError('A propiedade available precisa ser boleana', 400);
    }
    if (isNaN(preco) || preco === null) {
        throw new AppError('A propiedade preco precisa conter um número', 400);
    }
    if (isNaN(stock) || stock === null) {
        throw new AppError('A propiedade stock precisa conter um número', 400);
    }
    let produtos: ProdutosGabiq[] = [];
    if (product_id === '' || product_id === null) {
        produtos = await ProdutosGabiq.findBy({
            category: ILike(`%${category}%`),
            name: ILike(`%${name}%`),
            available: Equal(available),
            option0: ILike(`%${option0}%`),
            option1: ILike(`%${option1}%`),
            // option2: Like(`%${option2}%`),
            preco: MoreThanOrEqual(preco),
            stock: MoreThanOrEqual(stock),
        });
    } else {
        produtos = await ProdutosGabiq.findBy({
            product_id: Equal(product_id),
            category: ILike(`%${category}%`),
            name: ILike(`%${name}%`),
            available: Equal(available),
            option0: ILike(`%${option0}%`),
            option1: ILike(`%${option1}%`),
            // option2: Like(`%${option2}%`),
            preco: MoreThanOrEqual(preco),
            stock: MoreThanOrEqual(stock),
        });
    }

    return response.json(produtos);
});

produtosRouter.get('/variants', async (request, response) => {
    const { product_id } = request.body;

    if (product_id === null) {
        throw new AppError('A propiedade product_id não pode ser nula', 400);
    }

    let productVariants = [];

    productVariants = await ProdutosGabiq.findBy({
        product_id: Equal(product_id),
        // eslint-disable-next-line
        // @ts-ignore
        available: Equal(true),
    });

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

produtosRouter.post('/executecapture', async (request, response) => {
    const produtosGabiq = new ProdutosGabiqService();
    produtosGabiq.execute();
    return response.json({ mensagem: 'executado com sucesso!' });
});

produtosRouter.post('/insertproduct', async (request, response) => {
    const product_id = request.body;

    if (product_id === null) {
        throw new AppError('A propiedade product_id não pode ser nula', 400);
    }

    const produtos = await ProdutosGabiq.findBy({
        product_id: In(product_id),
        // eslint-disable-next-line
        // @ts-ignore
        available: Equal(true),
    });

    if (produtos.length === 0) {
        throw new AppError('A Busca não retornou resultados', 400);
    }

    const produtosChicaGleice = await ProdutosChicaGleice.find();

    const distinctProdutos = produtos.reduce((result, x) => {
        const findproduct = result.find(
            y =>
                y.product_id === x.product_id &&
                y.option0 === x.option0 &&
                y.option1 === x.option1,
        );
        if (!findproduct) {
            result.push(x);
        }
        return result;
    }, []);

    const insertProdutos = distinctProdutos.reduce((result, x) => {
        const findproduct = produtosChicaGleice.find(
            y =>
                y.product_id === x.product_id &&
                y.option0 === x.option0 &&
                y.option1 === x.option1,
        );
        if (!findproduct) {
            result.push(x);
        }
        return result;
    }, []);

    const produtosChicaGleiceRepository =
        AppDataSource.getRepository(ProdutosChicaGleice);

    const createdCapture = produtosChicaGleiceRepository.create(
        // eslint-disable-next-line
        // @ts-ignore
        insertProdutos.map(a => ({
            category: a.category,
            name: a.name,
            available: a.available,
            image_url: a.image_url,
            option0: a.option0,
            option1: a.option1,
            option2: a.option2,
            preco: a.preco,
            product_id: a.product_id,
            stock: a.stock,
        })),
    );

    await produtosChicaGleiceRepository.save(createdCapture);

    return response.json({ mensagem: 'produto(s) inserido com sucesso!' });
});

export default produtosRouter;

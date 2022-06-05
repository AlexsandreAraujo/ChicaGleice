import { Equal, In } from 'typeorm';
import AppDataSource from '../../database/db';
import ProdutosChicaGleice from '../../models/ProdutosChicaGleice';
import ProdutosGabiq from '../../models/ProdutosGabiq';
import AppError from '../../errors/AppError';

class InsertProductsService {
    public async execute(product_id: string[]) {
        if (product_id === null) {
            throw new AppError(
                'A propiedade product_id não pode ser nula',
                400,
            );
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
    }
}

export default InsertProductsService;

import { Equal } from 'typeorm';
import ProdutosGabiq from '../../models/ProdutosGabiq';
import AppError from '../../errors/AppError';

class VariantsProductsService {
    public async execute(product_id: number) {
        if (product_id === null) {
            throw new AppError(
                'A propiedade product_id não pode ser nula',
                400,
            );
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

        return {
            productPropiets,
            productSizes,
            productColors,
            productImageUrls,
        };
    }
}

export default VariantsProductsService;

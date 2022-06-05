import { Equal } from 'typeorm';
import ProdutosGabiq from '../../models/ProdutosGabiq';

class DistinctProductsService {
    public async execute() {
        const allproducts = await ProdutosGabiq.findBy({
            // eslint-disable-next-line
            // @ts-ignore
            available: Equal(true),
        });

        const distinctProducts = Array.from(
            new Set(allproducts.map(s => s.product_id)),
        ).map(product_id => {
            return allproducts.find(s => s.product_id === product_id);
        });

        return distinctProducts;
    }
}

export default DistinctProductsService;

import { Equal, ILike, MoreThanOrEqual } from 'typeorm';
import AppError from '../../errors/AppError';
import ProdutosGabiq from '../../models/ProdutosGabiq';

interface Request {
    product_id: number;
    category: string;
    name: string;
    available: boolean;
    option0: string;
    option1: string;
    preco: number;
    stock: number;
}

class FilterProductsService {
    public async execute({
        product_id,
        category,
        name,
        available,
        option0,
        option1,
        preco,
        stock,
    }: Request) {
        if (available === null) {
            throw new AppError(
                'A propiedade available precisa ser boleana',
                400,
            );
        }
        if (isNaN(preco) || preco === null) {
            throw new AppError(
                'A propiedade preco precisa conter um número',
                400,
            );
        }
        if (isNaN(stock) || stock === null) {
            throw new AppError(
                'A propiedade stock precisa conter um número',
                400,
            );
        }
        let produtos: ProdutosGabiq[] = [];
        if (product_id === null) {
            produtos = await ProdutosGabiq.findBy({
                category: ILike(`%${category}%`),
                name: ILike(`%${name}%`),
                // eslint-disable-next-line
                // @ts-ignore
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
                // eslint-disable-next-line
                // @ts-ignore
                available: Equal(available),
                option0: ILike(`%${option0}%`),
                option1: ILike(`%${option1}%`),
                // option2: Like(`%${option2}%`),
                preco: MoreThanOrEqual(preco),
                stock: MoreThanOrEqual(stock),
            });
        }

        return produtos;
    }
}

export default FilterProductsService;

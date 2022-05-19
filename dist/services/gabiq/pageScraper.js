"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../database/db"));
const ProdutosGabiq_1 = __importDefault(require("../../models/ProdutosGabiq"));
class ScraperObject {
    scraper(browser, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const produtosGabiqRepository = db_1.default.getRepository(ProdutosGabiq_1.default);
            const mainPage = yield browser.newPage();
            console.log(`Navigating to ${url}...`);
            // Navigate to the selected page
            yield mainPage.goto(url);
            const categoriaData = yield mainPage.evaluate(() => {
                // toda essa função será executada no browser
                // pega as urls das categorias de produtos
                const categoriaList = document.querySelectorAll('.js-desktop-dropdown > .desktop-list-subitems > li a');
                // transformar em array
                const categoriaArray = [...categoriaList];
                // transformar os nodes (elementos html) em objetos JS
                return categoriaArray.map(data => ({
                    // eslint-disable-next-line
                    // @ts-ignore
                    url: `${data.href}?mpage=12`,
                    // eslint-disable-next-line
                    // @ts-ignore
                    texto: data.text,
                }));
            });
            // faz um loop para cada url, abre uma instancia de uma nova pagina e pega o conteudo
            const pagePromise = categoriaData.map((categoria) => __awaiter(this, void 0, void 0, function* () {
                const newPage = yield browser.newPage();
                console.log(`Navigating to ${categoria.url}...`);
                yield newPage.goto(categoria.url);
                yield newPage.waitForTimeout(1000);
                let produtosCategoria = yield newPage.evaluate(() => {
                    // pegar todas as informações dos produtos
                    const produtosCategoriaList = document.querySelectorAll('.js-product-table > .js-item-product > .js-product-container');
                    // transformar os nodes (elementos html) em objetos JS
                    // transformar em array
                    const produtosCategoriaArray = [...produtosCategoriaList];
                    return produtosCategoriaArray.map(pdata => {
                        // eslint-disable-next-line
                        // @ts-ignore
                        const descricao = pdata.innerText;
                        let nome = descricao.substring(0, descricao.indexOf('\n'));
                        if (nome === 'ESGOTADO' || nome.indexOf('% OFF') !== -1) {
                            nome = descricao.substring(descricao.indexOf('\n'), descricao.indexOf('\n', descricao.indexOf('\n') + 1));
                            nome = nome.replace(/(\r\n\t|\n|\r|\t|^\s|\s$|\B\s|\s\B)/gm, '');
                        }
                        const propiedadesProdutos = JSON.parse(
                        // eslint-disable-next-line
                        // @ts-ignore
                        pdata.dataset.variants);
                        // eslint-disable-next-line
                        // @ts-ignore
                        return propiedadesProdutos.map(propiedade => ({
                            // category: categoria.texto,
                            product: nome,
                            available: propiedade.available,
                            compare_at_price_long: propiedade.compare_at_price_long,
                            compare_at_price_number: propiedade.compare_at_price_number,
                            compare_at_price_short: propiedade.compare_at_price_short,
                            contact: propiedade.contact,
                            id: propiedade.id,
                            image: propiedade.image,
                            image_url: propiedade.image_url,
                            option0: propiedade.option0,
                            option1: propiedade.option1,
                            option2: propiedade.option2,
                            price_long: propiedade.price_long,
                            price_number: propiedade.price_number,
                            price_short: propiedade.price_short,
                            product_id: propiedade.product_id,
                            sku: propiedade.sku,
                            stock: propiedade.stock,
                        }));
                    });
                });
                yield newPage.close();
                produtosCategoria = produtosCategoria.flat(3);
                return produtosCategoria.map(item => ({
                    category: categoria.texto,
                    product: item.product,
                    available: item.available,
                    compare_at_price_long: item.compare_at_price_long,
                    compare_at_price_number: item.compare_at_price_number,
                    compare_at_price_short: item.compare_at_price_short,
                    contact: item.contact,
                    id: item.id,
                    image: item.image,
                    image_url: item.image_url,
                    option0: item.option0,
                    option1: item.option1,
                    option2: item.option2,
                    price_long: item.price_long,
                    price_number: item.price_number,
                    price_short: item.price_short,
                    product_id: item.product_id,
                    sku: item.sku,
                    stock: item.stock,
                }));
                return produtosCategoria;
            }));
            const produtos = yield Promise.all(pagePromise).then(results => {
                return results;
            });
            yield browser.close();
            console.log('Captura finalizada!');
            const produtoData = produtos.flat(3);
            yield produtosGabiqRepository.clear();
            const createdCapture = produtosGabiqRepository.create(produtoData.map(a => ({
                category: a.category,
                name: a.product,
                available: a.available,
                image_url: a.image_url,
                option0: a.option0,
                option1: a.option1,
                option2: a.option2,
                preco: a.price_number,
                product_id: a.product_id,
                stock: a.stock,
            })));
            yield produtosGabiqRepository.save(createdCapture);
        });
    }
}
exports.default = ScraperObject;

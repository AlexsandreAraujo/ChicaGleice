import { Browser } from 'puppeteer';
import AppDataSource from '../../database/db';
import ProdutosGabiq from '../../models/ProdutosGabiq';

class ScraperObject {
    async scraper(browser: Browser, url: string): Promise<void> {
        const produtosGabiqRepository =
            AppDataSource.getRepository(ProdutosGabiq);

        const mainPage = await browser.newPage();

        console.log(`Navigating to ${url}...`);

        // Navigate to the selected page
        await mainPage.goto(url);

        const categoriaData = await mainPage.evaluate(() => {
            // toda essa função será executada no browser
            // pega as urls das categorias de produtos
            const categoriaList = document.querySelectorAll(
                '.js-desktop-dropdown > .desktop-list-subitems > li a',
            );

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
        const pagePromise = categoriaData.map(async categoria => {
            const newPage = await browser.newPage();

            console.log(`Navigating to ${categoria.url}...`);

            await newPage.goto(categoria.url);

            await newPage.waitForTimeout(1000);

            let produtosCategoria = await newPage.evaluate(() => {
                // pegar todas as informações dos produtos
                const produtosCategoriaList = document.querySelectorAll(
                    '.js-product-table > .js-item-product > .js-product-container',
                );

                // transformar os nodes (elementos html) em objetos JS
                // transformar em array
                const produtosCategoriaArray = [...produtosCategoriaList];

                return produtosCategoriaArray.map(pdata => {
                    // eslint-disable-next-line
                        // @ts-ignore
                    const descricao = pdata.innerText;
                    let nome = descricao.substring(0, descricao.indexOf('\n'));
                    if (nome === 'ESGOTADO' || nome.indexOf('% OFF') !== -1) {
                        nome = descricao.substring(
                            descricao.indexOf('\n'),
                            descricao.indexOf(
                                '\n',
                                descricao.indexOf('\n') + 1,
                            ),
                        );
                        nome = nome.replace(
                            /(\r\n\t|\n|\r|\t|^\s|\s$|\B\s|\s\B)/gm,
                            '',
                        );
                    }
                    const propiedadesProdutos = JSON.parse(
                        // eslint-disable-next-line
                        // @ts-ignore
                        pdata.dataset.variants,
                    );
                    // eslint-disable-next-line
                    // @ts-ignore
                    return propiedadesProdutos.map(propiedade => ({
                        // category: categoria.texto,
                        product: nome,
                        available: propiedade.available,
                        compare_at_price_long: propiedade.compare_at_price_long,
                        compare_at_price_number:
                            propiedade.compare_at_price_number,
                        compare_at_price_short:
                            propiedade.compare_at_price_short,
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

            await newPage.close();
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
        });

        const produtos = await Promise.all(pagePromise).then(results => {
            return results;
        });

        await browser.close();

        console.log('Captura finalizada!');

        const produtoData = produtos.flat(3);
        await produtosGabiqRepository.clear();

        const createdCapture = produtosGabiqRepository.create(
            produtoData.map(a => ({
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
            })),
        );

        await produtosGabiqRepository.save(createdCapture);
    }
}

export default ScraperObject;

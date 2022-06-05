import Scraper from '../scraping/scraping';

class CaptureGabiqProductsService {
    public execute() {
        const url = 'https://www.gabiq.com.br/';
        const execu = new Scraper();
        execu.execute(url);
    }
}

export default CaptureGabiqProductsService;

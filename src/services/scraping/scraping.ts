import BrowserObject from './browser';
import ScraperObjectGabiq from '../gabiq/pageScraper';

class Scraper {
    public async execute(url: string): Promise<void> {
        // Start the browser and create a browser instance
        const browserObject = new BrowserObject();
        const pageScraper = new ScraperObjectGabiq();
        const browserInstance = await browserObject.startBrowser();

        let browser;
        try {
            browser = await browserInstance;
            await pageScraper.scraper(browser, url);
        } catch (err) {
            console.log('Could not resolve the browser instance => ', err);
        }
    }
}

export default Scraper;

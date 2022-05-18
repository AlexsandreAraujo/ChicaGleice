import puppeteer from 'puppeteer';

class BrowserObject {
    public async startBrowser() {
        let browser;
        try {
            console.log('Opening the browser......');
            browser = await puppeteer.launch({
                headless: true,
                args: ['--disable-setuid-sandbox'],
                ignoreHTTPSErrors: true,
            });
        } catch (err) {
            console.log('Could not create a browser instance => : ', err);
        }
        return browser;
    }
}
export default BrowserObject;

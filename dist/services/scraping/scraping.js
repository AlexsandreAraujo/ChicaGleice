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
const browser_1 = __importDefault(require("./browser"));
const pageScraper_1 = __importDefault(require("../gabiq/pageScraper"));
class Scraper {
    execute(url) {
        return __awaiter(this, void 0, void 0, function* () {
            // Start the browser and create a browser instance
            const browserObject = new browser_1.default();
            const pageScraper = new pageScraper_1.default();
            const browserInstance = yield browserObject.startBrowser();
            let browser;
            try {
                browser = yield browserInstance;
                yield pageScraper.scraper(browser, url);
            }
            catch (err) {
                console.log('Could not resolve the browser instance => ', err);
            }
        });
    }
}
exports.default = Scraper;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraping_1 = __importDefault(require("../scraping/scraping"));
class produtosGabiqService {
    execute() {
        const url = 'https://www.gabiq.com.br/';
        const execu = new scraping_1.default();
        execu.execute(url);
    }
}
exports.default = produtosGabiqService;

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
const express_1 = require("express");
const ProdutosGabiq_1 = __importDefault(require("../models/ProdutosGabiq"));
const gabiq_1 = __importDefault(require("../services/produtos/gabiq"));
const produtosRouter = (0, express_1.Router)();
produtosRouter.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const produtos = yield ProdutosGabiq_1.default.find();
    return response.json(produtos);
}));
produtosRouter.post('/', () => __awaiter(void 0, void 0, void 0, function* () {
    const produtosGabiq = new gabiq_1.default();
    produtosGabiq.execute();
}));
exports.default = produtosRouter;

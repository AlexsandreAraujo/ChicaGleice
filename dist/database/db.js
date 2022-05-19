"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ProdutosGabiq_1 = __importDefault(require("../models/ProdutosGabiq"));
require("dotenv/config");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
    migrations: [process.env.MIGRATION_PATCH],
    entities: [ProdutosGabiq_1.default],
});
exports.default = AppDataSource;

import { DataSource } from 'typeorm';
import ProdutosGabiq from '../models/ProdutosGabiq';
import ProdutosChicaGleice from '../models/ProdutosChicaGleice';
import 'dotenv/config';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
    migrations: [process.env.MIGRATION_PATCH],
    entities: [ProdutosGabiq, ProdutosChicaGleice],
});

export default AppDataSource;

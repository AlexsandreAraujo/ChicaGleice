import { DataSource } from 'typeorm';
import ProdutosGabiq from '../models/ProdutosGabiq';
import 'dotenv/config';

const AppDataSource = new DataSource({
    type: 'postgres',
    // host: 'localhost',
    // username: 'chicaroot',
    // password: 'ac9cd30b9f33c74af49dde8bd445d5a8',
    // database: 'ChicaGleice',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
    migrations: ['./src/database/migrations/**/*{.ts,.js}'],
    entities: [ProdutosGabiq],
});

export default AppDataSource;

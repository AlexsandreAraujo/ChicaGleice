import { DataSource } from 'typeorm';
import ProdutosGabiq from '../models/ProdutosGabiq';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'alexla@1',
    port: 5432,
    database: 'ChicaGleice',
    migrations: ['./src/database/migrations/**/*{.ts,.js}'],
    entities: [ProdutosGabiq],
});

export default AppDataSource;

import { DataSource } from 'typeorm';
// import Appointment from '../models/Appointment';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'alexla@1',
    port: 5432,
    database: 'gostack_gobarber',
    // migrations: ['./src/database/migrations/**/*{.ts,.js}'],
    // entities: [Appointment, User],
});

export default AppDataSource;

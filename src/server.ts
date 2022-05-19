import app from './app';
import AppDataSource from './database/db';
import 'dotenv/config';

app.listen(process.env.PORT || 3333, async () => {
    await AppDataSource.initialize();
    console.log('🚀 Server started on port 3333!');
});

import app from './app';
import AppDataSource from './database/db';

app.listen(3333, async () => {
    await AppDataSource.initialize();
    console.log('🚀 Server started on port 3333!');
});

import { Router } from 'express';
// import AppError from '../errors/AppError';

const helloWorldRouter = Router();

helloWorldRouter.get('/', (request, response) => {
    // throw new AppError('You do not have enought balance');
    return response.json({ message: 'Hello World' });
});

export default helloWorldRouter;

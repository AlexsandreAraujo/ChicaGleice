import { Router } from 'express';

import helloWorldRouter from './helloWorld.routes';

const routes = Router();

routes.use('/helloworld', helloWorldRouter);

export default routes;

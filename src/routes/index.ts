import { Router } from 'express';

import produtos from './produtos.routes';

const routes = Router();

routes.use('/produtos', produtos);

export default routes;

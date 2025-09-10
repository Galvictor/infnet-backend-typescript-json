import { Router } from 'express';
import container from './config/InversifyConfig';
import { Auth, LivrosController } from '../types';

class Routes {
    private static implementacao() {
        const routes = Router();
        const livrosController = container.get<LivrosController>('LivrosController');

        // Protege todas as rotas de livros com autenticação
        routes.use('/livros', Auth.init(), livrosController.router);

        return routes;
    }

    static init() {
        return this.implementacao();
    }
}

export default Routes;

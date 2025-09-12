import { Router } from 'express';
import container from './config/InversifyConfig';
import { Auth, LivrosController, LivrosAsyncController, LivrosAsyncMongoController } from '../types';

class Routes {
    private static implementacao() {
        const routes = Router();

        // Controller síncrono (original)
        const livrosController = container.get<LivrosController>('LivrosController');

        // Controller assíncrono para FileSystem
        const livrosAsyncController = container.get<LivrosAsyncController>('LivrosAsyncController');

        // Controller assíncrono para MongoDB
        const livrosAsyncMongoController = container.get<LivrosAsyncMongoController>('LivrosAsyncMongoController');

        // Rotas síncronas (originais)
        routes.use('/livros', Auth.init(), livrosController.router);

        // Rotas assíncronas para FileSystem
        routes.use('/livros-async', Auth.init(), livrosAsyncController.router);

        // Rotas assíncronas para MongoDB
        routes.use('/livros-mongo', Auth.init(), livrosAsyncMongoController.router);

        return routes;
    }

    static init() {
        return this.implementacao();
    }
}

export default Routes;

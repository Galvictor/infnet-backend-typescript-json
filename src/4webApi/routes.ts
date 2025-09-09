import { Router } from 'express';
import LivrosController from './controllers/LivrosController';
import { LivrosService, LivroRepositorio, Auth } from '../types';

class Routes {
    private static implementacao() {
        const routes = Router();
        const livroRepositorio = new LivroRepositorio();
        const livrosService = new LivrosService(livroRepositorio);
        const livrosController = new LivrosController(livrosService);

        // Protege todas as rotas de livros com autenticação
        routes.use('/livros', Auth.init(), livrosController.router);

        return routes;
    }

    static init() {
        return this.implementacao();
    }
}

export default Routes;

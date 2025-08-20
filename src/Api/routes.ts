import { Router } from 'express';
import LivrosController from './LivrosController';
import LivroRepositorio from '../Infra/LivroRepositorio';
import Auth from '../Infra/Auth';

class Routes {
    private static implementacao() {
        const routes = Router();
        const livroRepositorio = new LivroRepositorio();
        const livrosController = new LivrosController(livroRepositorio);

        // Protege todas as rotas de livros com autenticação
        routes.use('/livros', Auth.init(), livrosController.router);

        return routes;
    }

    static init() {
        return this.implementacao();
    }
}

export default Routes;

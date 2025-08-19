import { Router } from 'express';
import LivrosController from './LivrosController';
import LivroRepositorio from '../Infra/LivroRepositorio';

class Routes {
    private static implementacao() {
        const routes = Router();
        const livroRepositorio = new LivroRepositorio();
        const livrosController = new LivrosController(livroRepositorio);

        routes.use('/livros', livrosController.router);

        return routes;
    }

    static init() {
        return this.implementacao();
    }
}

export default Routes;

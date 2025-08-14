import { Router } from 'express';
import LivrosController from './LivrosController';
import LivroRepositorio from '../Infra/LivroRepositorio';

const routes = Router();

const livroRepositorio = new LivroRepositorio();
const livrosController = new LivrosController(livroRepositorio);

routes.use('/livros', livrosController.router);

export default routes;

import LivroRepositorio from '../Infra/LivroRepositorio';
import { Router, Request, Response } from 'express';

export default class LivrosController {
    private readonly livroRepositorio: LivroRepositorio;
    public router: Router = Router();

    constructor(livroRepositorio: LivroRepositorio) {
        this.livroRepositorio = livroRepositorio;
        this.routes();
    }

    public routes() {
        this.router.get('/livros', this.listarLivros.bind(this));
        this.router.get('/livros/:id', this.getLivroPorId.bind(this));
    }

    public listarLivros(req: Request, res: Response) {
        const livros = this.livroRepositorio.listarLivros();
        res.json(livros);
    }

    public getLivroPorId(req: Request, res: Response) {
        const id = req.params.id;
        const livro = this.livroRepositorio.getLivroPorId(id);
        if (livro) {
            res.json(livro);
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    }
}

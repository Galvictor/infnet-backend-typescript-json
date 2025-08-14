import LivroRepositorio from '../Infra/LivroRepositorio';
import { Router, Request, Response } from 'express';
import { CriarLivroDTO, Livro, ViewLivroDTO } from '../livros';

export default class LivrosController {
    private readonly livroRepositorio: LivroRepositorio;
    public router: Router = Router();

    constructor(livroRepositorio: LivroRepositorio) {
        this.livroRepositorio = livroRepositorio;
        this.routes();
    }

    public routes() {
        this.router.get('/', this.listarLivros.bind(this));
        this.router.get('/:id', this.getLivroPorId.bind(this));
        this.router.post('/', this.criarLivro.bind(this));
    }

    public listarLivros(req: Request, res: Response) {
        const livros = this.livroRepositorio.listarLivros();
        res.json(livros);
    }

    public getLivroPorId(req: Request, res: Response) {
        const id = req.params.id;
        const livro = this.livroRepositorio.getLivroPorId(+id);
        if (livro) {
            const viewLivro: ViewLivroDTO = {
                ...livro,
            };

            res.json(viewLivro);
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    }

    public criarLivro(req: Request, res: Response) {
        const dadosLivro: CriarLivroDTO = req.body;
        const livroCriado = new Livro(dadosLivro.titulo, dadosLivro.autor, dadosLivro.ano);
        this.livroRepositorio.criarLivro(livroCriado);
        const livros = this.livroRepositorio.listarLivros();
        res.json(livros);
    }
}

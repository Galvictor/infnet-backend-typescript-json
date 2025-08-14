import LivroRepositorio from '../Infra/LivroRepositorio';
import { Router, Request, Response } from 'express';
import { CriarLivroDTO, Livro, ViewLivroDTO, AtualizarLivroDTO } from '../livros';

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
        this.router.put('/:id', this.atualizarLivro.bind(this));
        this.router.delete('/:id', this.deletarLivro.bind(this));
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
        const Listarlivros = this.livroRepositorio.listarLivros();
        const novoId = Listarlivros.map((livro) => livro.id).reduce((a, b) => Math.max(a, b), 0) + 1;
        const livroCriado = new Livro(novoId, dadosLivro.titulo, dadosLivro.autor, dadosLivro.ano);
        this.livroRepositorio.criarLivro(livroCriado);
        const livros = this.livroRepositorio.listarLivros();
        res.json(livros);
    }

    public atualizarLivro(req: Request, res: Response) {
        const id = +req.params.id;
        const dadosAtualizados: AtualizarLivroDTO = req.body;

        const livroAtualizado = this.livroRepositorio.atualizarLivro(id, dadosAtualizados);

        if (livroAtualizado) {
            res.json(livroAtualizado);
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    }

    public deletarLivro(req: Request, res: Response) {
        const id = +req.params.id;
        const deletado = this.livroRepositorio.deletarLivro(id);

        if (deletado) {
            res.json({ message: 'Livro deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    }
}

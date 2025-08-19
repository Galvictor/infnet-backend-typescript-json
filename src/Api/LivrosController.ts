import LivroRepositorio from '../Infra/LivroRepositorio';
import { Router, Request, Response, NextFunction } from 'express';
import { CriarLivroDTO, Livro, ViewLivroDTO, AtualizarLivroDTO } from '../types';
import { body, param, validationResult } from 'express-validator';

export default class LivrosController {
    private readonly livroRepositorio: LivroRepositorio;
    public router: Router = Router();

    constructor(livroRepositorio: LivroRepositorio) {
        this.livroRepositorio = livroRepositorio;
        this.routes();
    }

    public routes() {
        this.router.get('/', this.listarLivros.bind(this));
        this.router.get(
            '/:id',
            [param('id').isInt().withMessage('O ID deve ser um número inteiro'), this.checkValidationErrors.bind(this)],
            this.getLivroPorId.bind(this)
        );
        this.router.post(
            '/',
            [
                body('titulo').notEmpty().withMessage('O titulo é obrigatório'),
                body('autor').notEmpty().withMessage('O autor é obrigatório'),
                body('ano').notEmpty().withMessage('O ano é obrigatório'),
                this.checkValidationErrors.bind(this),
            ],
            this.criarLivro.bind(this)
        );
        this.router.patch(
            '/:id',
            [param('id').isInt().withMessage('O ID deve ser um número inteiro'), this.checkValidationErrors.bind(this)],
            this.atualizarLivroPorId.bind(this)
        );
        this.router.delete(
            '/:id',
            [param('id').isInt().withMessage('O ID deve ser um número inteiro'), this.checkValidationErrors.bind(this)],
            this.deletarLivroPorId.bind(this)
        );
    }

    // Middleware para verificar erros de validação
    private checkValidationErrors(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Erro de validação',
                errors: errors.array(),
            });
        }
        next();
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

    public atualizarLivroPorId(req: Request, res: Response) {
        const id = +req.params.id;
        const dadosAtualizados: AtualizarLivroDTO = req.body;

        const livroAtualizado = this.livroRepositorio.atualizarLivroPorId(id, dadosAtualizados);

        if (livroAtualizado) {
            res.json(livroAtualizado);
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    }

    public deletarLivroPorId(req: Request, res: Response) {
        const id = +req.params.id;
        const deletado = this.livroRepositorio.deletarLivroPorId(id);

        if (deletado) {
            res.json({ message: 'Livro deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    }
}

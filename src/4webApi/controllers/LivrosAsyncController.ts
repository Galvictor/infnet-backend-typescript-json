import { injectable, inject } from 'inversify';
import { Router, Request, Response, NextFunction } from 'express';
import { CriarLivroDTO, AtualizarLivroDTO, LivrosAsyncServiceInterface } from '../../types';
import { body, param, validationResult } from 'express-validator';

@injectable()
export default class LivrosAsyncController {
    private readonly livrosService: LivrosAsyncServiceInterface;
    public router: Router = Router();

    constructor(@inject('LivrosAsyncService') livrosService: LivrosAsyncServiceInterface) {
        this.livrosService = livrosService;
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

    public async listarLivros(req: Request, res: Response, next: NextFunction) {
        try {
            const livros = await this.livrosService.listarLivros();
            res.json(livros);
        } catch (error) {
            next(error);
        }
    }

    public async getLivroPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            const livro = await this.livrosService.getLivroPorId(id);
            res.json(livro);
        } catch (error) {
            next(error);
        }
    }

    public async criarLivro(req: Request, res: Response, next: NextFunction) {
        try {
            const dadosLivro: CriarLivroDTO = req.body;
            const livros = await this.livrosService.criarLivro(dadosLivro);
            res.status(201).json(livros);
        } catch (error) {
            next(error);
        }
    }

    public async atualizarLivroPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            const dadosAtualizados: AtualizarLivroDTO = req.body;
            const livroAtualizado = await this.livrosService.atualizarLivroPorId(id, dadosAtualizados);
            res.json(livroAtualizado);
        } catch (error) {
            next(error);
        }
    }

    public async deletarLivroPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            await this.livrosService.deletarLivroPorId(id);
            res.json({ message: 'Livro deletado com sucesso' });
        } catch (error) {
            next(error);
        }
    }
}

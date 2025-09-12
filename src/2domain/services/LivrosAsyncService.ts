import { injectable, inject } from 'inversify';
import {
    LivroAsyncRepositorioInterface,
    CriarLivroDTO,
    Livro,
    ViewLivroDTO,
    AtualizarLivroDTO,
    LivroSchema,
    LivrosAsyncServiceInterface,
    NotFoundError,
} from '../../types';

@injectable()
export default class LivrosAsyncService implements LivrosAsyncServiceInterface {
    private readonly livroRepositorio: LivroAsyncRepositorioInterface;

    constructor(@inject('LivroAsyncRepositorio') livroRepositorio: LivroAsyncRepositorioInterface) {
        this.livroRepositorio = livroRepositorio;
    }

    public async listarLivros(): Promise<LivroSchema[]> {
        return await this.livroRepositorio.listarLivros();
    }

    public async getLivroPorId(id: number): Promise<ViewLivroDTO> {
        const livro = await this.livroRepositorio.getLivroPorId(id);
        if (!livro) {
            throw new NotFoundError('Livro não encontrado');
        }

        const viewLivro: ViewLivroDTO = {
            ...livro,
        };

        return viewLivro;
    }

    public async criarLivro(dadosLivro: CriarLivroDTO): Promise<LivroSchema[]> {
        const livrosExistentes = await this.livroRepositorio.listarLivros();
        const novoId = livrosExistentes.map((livro) => livro.id).reduce((a, b) => Math.max(a, b), 0) + 1;

        const livroCriado = new Livro(novoId, dadosLivro.titulo, dadosLivro.autor, dadosLivro.ano);
        await this.livroRepositorio.criarLivro(livroCriado);

        return await this.livroRepositorio.listarLivros();
    }

    public async atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Promise<LivroSchema> {
        const livroAtualizado = await this.livroRepositorio.atualizarLivroPorId(id, dadosAtualizados);

        if (!livroAtualizado) {
            throw new NotFoundError('Livro não encontrado');
        }

        return livroAtualizado;
    }

    public async deletarLivroPorId(id: number): Promise<void> {
        const deletado = await this.livroRepositorio.deletarLivroPorId(id);

        if (!deletado) {
            throw new NotFoundError('Livro não encontrado');
        }
    }
}

import { injectable, inject } from 'inversify';
import { LivroRepositorioInterface, CriarLivroDTO, Livro, ViewLivroDTO, AtualizarLivroDTO, LivrosServiceInterface, NotFoundError } from '../../types';

@injectable()
export default class LivrosService implements LivrosServiceInterface {
    private readonly livroRepositorio: LivroRepositorioInterface;

    constructor(@inject('LivroRepositorio') livroRepositorio: LivroRepositorioInterface) {
        this.livroRepositorio = livroRepositorio;
    }

    public listarLivros(): Livro[] {
        return this.livroRepositorio.listarLivros();
    }

    public getLivroPorId(id: number): ViewLivroDTO {
        const livro = this.livroRepositorio.getLivroPorId(id);
        if (!livro) {
            throw new NotFoundError('Livro não encontrado');
        }

        const viewLivro: ViewLivroDTO = {
            ...livro,
        };

        return viewLivro;
    }

    public criarLivro(dadosLivro: CriarLivroDTO): Livro[] {
        const livrosExistentes = this.livroRepositorio.listarLivros();
        const novoId = livrosExistentes.map((livro) => livro.id).reduce((a, b) => Math.max(a, b), 0) + 1;

        const livroCriado = new Livro(novoId, dadosLivro.titulo, dadosLivro.autor, dadosLivro.ano);
        this.livroRepositorio.criarLivro(livroCriado);

        return this.livroRepositorio.listarLivros();
    }

    public atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Livro {
        const livroAtualizado = this.livroRepositorio.atualizarLivroPorId(id, dadosAtualizados);

        if (!livroAtualizado) {
            throw new NotFoundError('Livro não encontrado');
        }

        return livroAtualizado;
    }

    public deletarLivroPorId(id: number): void {
        const deletado = this.livroRepositorio.deletarLivroPorId(id);

        if (!deletado) {
            throw new NotFoundError('Livro não encontrado');
        }
    }
}

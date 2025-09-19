import { CriarLivroDTO, ViewLivroDTO, AtualizarLivroDTO, Livro } from '../../types';

export interface LivrosAsyncServiceInterface {
    listarLivros(): Promise<Livro[]>;
    getLivroPorId(id: number): Promise<ViewLivroDTO>;
    criarLivro(dadosLivro: CriarLivroDTO): Promise<Livro[]>;
    atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Promise<Livro>;
    deletarLivroPorId(id: number): Promise<void>;
}

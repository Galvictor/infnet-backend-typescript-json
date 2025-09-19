import { AtualizarLivroDTO, Livro } from '../../types';

export interface LivroAsyncRepositorioInterface {
    listarLivros(): Promise<Livro[]>;
    getLivroPorId(id: number): Promise<Livro | null>;
    criarLivro(livro: Livro): Promise<Livro>;
    atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Promise<Livro | null>;
    deletarLivroPorId(id: number): Promise<boolean>;
}

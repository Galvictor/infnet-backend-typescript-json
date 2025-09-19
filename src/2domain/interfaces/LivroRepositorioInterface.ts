import { AtualizarLivroDTO, Livro } from '../../types';

export interface LivroRepositorioInterface {
    listarLivros(): Livro[];
    getLivroPorId(id: number): Livro | null;
    criarLivro(livro: Livro): Livro[];
    atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Livro | null;
    deletarLivroPorId(id: number): boolean;
}

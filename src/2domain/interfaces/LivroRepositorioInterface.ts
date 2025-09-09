import { LivroSchema, AtualizarLivroDTO, Livro } from '../../types';

export interface LivroRepositorioInterface {
    listarLivros(): LivroSchema[];
    getLivroPorId(id: number): LivroSchema | null;
    criarLivro(livro: Livro): LivroSchema[];
    atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): LivroSchema | null;
    deletarLivroPorId(id: number): boolean;
}

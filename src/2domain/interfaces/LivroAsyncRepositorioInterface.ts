import { LivroSchema, AtualizarLivroDTO, Livro } from '../../types';

export interface LivroAsyncRepositorioInterface {
    listarLivros(): Promise<LivroSchema[]>;
    getLivroPorId(id: number): Promise<LivroSchema | null>;
    criarLivro(livro: Livro): Promise<LivroSchema>;
    atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Promise<LivroSchema | null>;
    deletarLivroPorId(id: number): Promise<boolean>;
}

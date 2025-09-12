import { CriarLivroDTO, ViewLivroDTO, AtualizarLivroDTO, LivroSchema } from '../../types';

export interface LivrosAsyncServiceInterface {
    listarLivros(): Promise<LivroSchema[]>;
    getLivroPorId(id: number): Promise<ViewLivroDTO>;
    criarLivro(dadosLivro: CriarLivroDTO): Promise<LivroSchema[]>;
    atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Promise<LivroSchema>;
    deletarLivroPorId(id: number): Promise<void>;
}

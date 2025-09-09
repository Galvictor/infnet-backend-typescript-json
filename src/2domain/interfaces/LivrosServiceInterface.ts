import { CriarLivroDTO, ViewLivroDTO, AtualizarLivroDTO, LivroSchema } from '../../types';

export interface LivrosServiceInterface {
    listarLivros(): LivroSchema[];
    getLivroPorId(id: number): ViewLivroDTO;
    criarLivro(dadosLivro: CriarLivroDTO): LivroSchema[];
    atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): LivroSchema;
    deletarLivroPorId(id: number): void;
}

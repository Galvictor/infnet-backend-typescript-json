import { CriarLivroDTO, ViewLivroDTO, AtualizarLivroDTO, Livro } from '../../types';

export interface LivrosServiceInterface {
    listarLivros(): Livro[];
    getLivroPorId(id: number): ViewLivroDTO;
    criarLivro(dadosLivro: CriarLivroDTO): Livro[];
    atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Livro;
    deletarLivroPorId(id: number): void;
}

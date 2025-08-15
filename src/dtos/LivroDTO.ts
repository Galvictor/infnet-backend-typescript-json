import { Livro } from '../entities/Livro';

export type CriarLivroDTO = Omit<Livro, 'id'>;

export type ViewLivroDTO = {
    id: number;
    titulo: string;
    autor: string;
    ano: number;
};

export type AtualizarLivroDTO = Partial<Livro>;

// Exemplos de uso dos tipos utilitários do TypeScript:
// export type ExemploLivroDTO = Pick<Livro, 'titulo' | 'autor' | 'ano'>;
// export type ExemploLivroDTO = {
//     titulo: string;
//     autor: string;
//     ano: number;
// };

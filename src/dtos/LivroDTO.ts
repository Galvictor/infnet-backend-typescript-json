import { Livro } from '../entities/Livro';

export type CriarLivroDTO = Omit<Livro, 'id'>;

//CriarLivroDTO com omit é igual a:
//export type CriarLivroDTO = {
//    titulo: string;
//    autor: string;
//    ano: number;
//};

export type ViewLivroDTO = {
    id: number;
    titulo: string;
    autor: string;
    ano: number;
};

export type AtualizarLivroDTO = Partial<Livro>;

//AtualizarLivroDTO com partial é igual a:
//export type AtualizarLivroDTO = {
//    titulo?: string;
//    autor?: string;
//    ano?: number;
//};

// Exemplos de uso dos tipos utilitários do TypeScript:
// export type ExemploLivroDTO = Pick<Livro, 'titulo' | 'autor' | 'ano'>;
// export type ExemploLivroDTO = {
//     titulo: string;
//     autor: string;
//     ano: number;
// };

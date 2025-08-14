export class Livro {
    id: number;
    titulo: string;
    autor: string;
    ano: number;

    constructor(id: number, titulo: string, autor: string, ano: number) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }
}

export type CriarLivroDTO = Omit<Livro, 'id'>;

//para estudo isso ai é igual a omitir o id do livro:
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

export type AtualizarLivroDTO = Pick<Livro, 'titulo' | 'autor' | 'ano'>;

//para estudo isso ai é igual a pegar o titulo, autor e ano do livro:
//export type AtualizarLivroDTO = {
//    titulo?: string;
//    autor?: string;
//    ano?: number;
//};

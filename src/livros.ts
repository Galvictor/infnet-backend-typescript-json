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

export type CriarLivroDTO = {
    titulo: string;
    autor: string;
    ano: number;
};

export type ViewLivroDTO = {
    id: number;
    titulo: string;
    autor: string;
    ano: number;
};

export type AtualizarLivroDTO = {
    titulo?: string;
    autor?: string;
    ano?: number;
};

export class Livro {
    id: string;
    titulo: string;
    autor: string;
    ano: number;

    constructor(id: string, titulo: string, autor: string, ano: number) {
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
    id: string;
    titulo: string;
    autor: string;
    ano: number;
};

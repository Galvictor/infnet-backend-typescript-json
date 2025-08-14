export class Livro {
    id: number;
    titulo: string;
    autor: string;
    ano: number;

    constructor(titulo: string, autor: string, ano: number) {
        this.id = Math.round(Math.random() * 1000000);
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

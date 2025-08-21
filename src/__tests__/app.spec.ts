import { Livro } from '../types';

function soma(a: number, b: number): number {
    return a + b;
}

describe('Soma', () => {
    it('deve retornar a soma de dois números', () => {
        expect(soma(1, 2)).toBe(3);
    });
});

describe('Livro.criar', () => {
    it('deve criar livro com dados válidos', () => {
        const livro = new Livro(1, 'Título', 'Autor', 2024);
        expect(livro.titulo).toBe('Título');
    });
});

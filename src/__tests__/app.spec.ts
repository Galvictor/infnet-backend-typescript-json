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

// Exemplos de TDD (Test Driven Development)

/*
TDD significa Test-Driven Development (Desenvolvimento Orientado a Testes),
que é uma metodologia de desenvolvimento de software que segue o ciclo conhecido como Red-Green-Refactor.

Ciclo TDD
🔴 Red (Vermelho)
Escrever um teste que falha
O teste define o comportamento esperado
Garante que o teste está testando algo real

🟢 Green (Verde)
Implementar o código mínimo necessário para o teste passar
Foco apenas em fazer o teste funcionar
Não se preocupa com código limpo ainda

🔄 Refactor (Refatoração)
Melhorar o código sem alterar o comportamento
Aplicar princípios de clean code
Garantir que todos os testes continuem passando
*/

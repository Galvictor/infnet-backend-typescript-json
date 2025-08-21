function soma(a: number, b: number): number {
    return a + b;
}

describe('Soma', () => {
    it('deve retornar a soma de dois números', () => {
        expect(soma(1, 2)).toBe(3);
    });
});

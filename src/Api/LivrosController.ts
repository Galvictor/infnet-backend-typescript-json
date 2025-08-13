import LivroRepositorio from '../Infra/LivroRepositorio';

export default class LivrosController {
    private readonly livroRepositorio: LivroRepositorio;

    constructor(livroRepositorio: LivroRepositorio) {
        this.livroRepositorio = livroRepositorio;
    }
}

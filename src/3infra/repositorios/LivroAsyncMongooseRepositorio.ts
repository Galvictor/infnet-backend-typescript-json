import { injectable } from 'inversify';
import { AtualizarLivroDTO, Livro, LivroSchema, LivroAsyncRepositorioInterface } from '../../types';
import { LivroModel } from './LivroSchema';

@injectable()
export default class LivroAsyncMongooseRepositorio implements LivroAsyncRepositorioInterface {
    constructor() {}

    async listarLivros(): Promise<Livro[]> {
        return await LivroModel.find();
    }

    async getLivroPorId(id: number): Promise<Livro | null> {
        return await LivroModel.findById(id);
    }
    async criarLivro(livro: Livro): Promise<Livro> {
        return await LivroModel.create(livro);
    }
    async atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Promise<LivroSchema | null> {
        return await LivroModel.findByIdAndUpdate(id, dadosAtualizados);
    }
    async deletarLivroPorId(id: number): Promise<boolean> {
        const result = await LivroModel.findByIdAndDelete(id);
        return result !== null;
    }
}

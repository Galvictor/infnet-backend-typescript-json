import { injectable } from 'inversify';
import { LivroSchema, AtualizarLivroDTO, Livro } from '../../types';
import { LivroAsyncRepositorioInterface } from '../../2domain/interfaces/LivroAsyncRepositorioInterface';
import path from 'path';
import fs from 'fs/promises';
import { DBSchema } from './DBSchema';
import { ObjectId } from 'mongodb';

@injectable()
export default class LivroAsyncRepositorio implements LivroAsyncRepositorioInterface {
    dbPath: string;

    constructor(caminho: string = process.env.DB_PATH || 'fakeDB.json') {
        this.dbPath = path.join(__dirname, caminho);
    }

    private async acessarDB(): Promise<DBSchema> {
        const db = await fs.readFile(this.dbPath, 'utf8');
        return JSON.parse(db);
    }

    private async salvarDB(db: DBSchema): Promise<boolean> {
        try {
            await fs.writeFile(this.dbPath, JSON.stringify(db, null, 2));
            return true;
        } catch (error) {
            console.error('Erro ao salvar o banco de dados:', error);
            return false;
        }
    }

    public async listarLivros(): Promise<LivroSchema[]> {
        const db = await this.acessarDB();
        return db.livros;
    }

    public async getLivroPorId(id: number): Promise<LivroSchema | null> {
        const db = await this.acessarDB();
        return db.livros.find((livro: LivroSchema) => livro.id === id) || null;
    }

    public async criarLivro(livro: Livro): Promise<LivroSchema> {
        const livros = await this.listarLivros();
        const novoLivro: LivroSchema = {
            ...livro,
            _id: new ObjectId(),
        };
        livros.push(novoLivro);
        const dbUpdated = await this.acessarDB();
        dbUpdated.livros = livros;
        await this.salvarDB(dbUpdated);
        return novoLivro;
    }

    public async atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): Promise<LivroSchema | null> {
        const db = await this.acessarDB();
        const index = db.livros.findIndex((livro: LivroSchema) => livro.id === id);

        if (index === -1) {
            return null;
        }

        db.livros[index] = {
            ...db.livros[index],
            ...dadosAtualizados,
            id,
        };

        await this.salvarDB(db);
        return db.livros[index];
    }

    public async deletarLivroPorId(id: number): Promise<boolean> {
        const db = await this.acessarDB();
        const index = db.livros.findIndex((livro: LivroSchema) => livro.id === id);

        if (index === -1) {
            return false;
        }

        db.livros.splice(index, 1);
        await this.salvarDB(db);
        return true;
    }
}

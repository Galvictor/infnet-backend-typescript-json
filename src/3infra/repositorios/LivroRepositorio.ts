import { injectable } from 'inversify';
import { LivroSchema, AtualizarLivroDTO, Livro, LivroRepositorioInterface } from '../../types';
import path from 'path';
import fs from 'fs';
import { DBSchema } from './DBSchema';
import { ObjectId } from 'mongodb';

@injectable()
export default class LivroRepositorio implements LivroRepositorioInterface {
    dbPath: string;

    constructor(caminho: string = process.env.DB_PATH || 'fakeDB.json') {
        this.dbPath = path.join(__dirname, caminho);
    }

    private acessarDB(): DBSchema {
        const db = fs.readFileSync(this.dbPath, 'utf8');
        return JSON.parse(db);
    }

    private salvarDB(db: DBSchema): boolean {
        try {
            fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
            return true;
        } catch (error) {
            console.error('Erro ao salvar o banco de dados:', error);
            return false;
        }
    }

    public listarLivros(): LivroSchema[] {
        const db = this.acessarDB();
        return db.livros;
    }

    public getLivroPorId(id: number): LivroSchema | null {
        const db = this.acessarDB();
        return db.livros.find((livro: LivroSchema) => livro.id === id) || null;
    }

    public criarLivro(livro: Livro): LivroSchema[] {
        const livros = this.listarLivros();
        livros.push({
            ...livro,
            _id: new ObjectId(),
        });
        const dbUpdated = this.acessarDB();
        dbUpdated.livros = livros;
        this.salvarDB(dbUpdated);
        return livros;
    }

    public atualizarLivroPorId(id: number, dadosAtualizados: AtualizarLivroDTO): LivroSchema | null {
        const db = this.acessarDB();
        const index = db.livros.findIndex((livro: LivroSchema) => livro.id === id);

        if (index === -1) {
            return null;
        }

        db.livros[index] = {
            ...db.livros[index],
            ...dadosAtualizados,
            id,
        };

        this.salvarDB(db);
        return db.livros[index];
    }

    public deletarLivroPorId(id: number): boolean {
        const db = this.acessarDB();
        const index = db.livros.findIndex((livro: LivroSchema) => livro.id === id);

        if (index === -1) {
            return false;
        }

        db.livros.splice(index, 1);
        this.salvarDB(db);
        return true;
    }
}

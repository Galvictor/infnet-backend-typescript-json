import { DBSchema } from './DBSchema';
import path from 'path';
import fs from 'fs';

export default class LivroRepositorio {
    dbPath: string;

    constructor(caminho: string = 'fakeDB.json') {
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
}

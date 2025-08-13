import { DBSchema } from './DBSchema';
import path from 'path';
import fs from 'fs';

export default class LivroRepositorio {
    dbPath: string;

    constructor(caminho: string = 'fakeDB.json') {
        this.dbPath = path.join(__dirname, caminho);
    }

    acessarDB(): DBSchema {
        const db = fs.readFileSync(this.dbPath, 'utf8');
        return JSON.parse(db);
    }
}

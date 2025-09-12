import { injectable } from 'inversify';
import { LivroAsyncRepositorioInterface } from '../../2domain/interfaces/LivroAsyncRepositorioInterface';
import dotenv from 'dotenv';
import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { AtualizarLivroDTO, Livro, LivroSchema } from '../../types';

dotenv.config();

@injectable()
export default class LivroAsyncMongoRepositorio implements LivroAsyncRepositorioInterface {
    constructor(private uri: string, private dbName: string, private collectionName: string) {
        this.uri = process.env.MONGO_URI || '';
        this.dbName = process.env.MONGO_DB_NAME || '';
        this.collectionName = process.env.MONGO_COLLECTION_NAME || '';
    }

    private async getCollectionAndCLient(): Promise<{ collection: Collection<LivroSchema>; client: MongoClient }> {
        const client = new MongoClient(this.uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });

        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection<LivroSchema>(this.collectionName);

            return { collection, client };
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            await client.close();
            throw error;
        }
    }

    public async listarLivros(): Promise<LivroSchema[]> {
        const { collection, client } = await this.getCollectionAndCLient();
        try {
            const livros = await collection.find({}).toArray();
            return livros;
        } catch (error) {
            console.error('Erro ao listar livros:', error);
            throw error;
        } finally {
            await client.close();
        }
    }

    public async getLivroPorId(id: number): Promise<LivroSchema | null> {
        const { collection, client } = await this.getCollectionAndCLient();

        try {
            const livro = await collection.findOne({ id });
            return livro;
        } catch (error) {
            console.error('Erro ao buscar livro por id:', error);
            throw error;
        } finally {
            await client.close();
        }
    }

    public async criarLivro(livro: Livro): Promise<LivroSchema> {
        const { collection, client } = await this.getCollectionAndCLient();
        const maiorId = await collection.find({}).sort({ id: -1 }).limit(1).toArray();

        try {
            const novoLivro = {
                _id: new ObjectId(),
                id: maiorId[0].id + 1,
                titulo: livro.titulo,
                autor: livro.autor,
                ano: livro.ano,
            } as LivroSchema;

            await collection.insertOne(novoLivro);
            return novoLivro;
        } catch (error) {
            console.error('Erro ao criar livro:', error);
            throw error;
        } finally {
            await client.close();
        }
    }

    public async atualizarLivroPorId(id: number, livro: AtualizarLivroDTO): Promise<LivroSchema | null> {
        const { collection, client } = await this.getCollectionAndCLient();
        try {
            const livroAtualizado = await collection.updateOne({ id }, { $set: livro });

            if (livroAtualizado.matchedCount === 0) {
                return null;
            } else {
                return await collection.findOne({ id });
            }
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            throw error;
        } finally {
            await client.close();
        }
    }

    public async deletarLivroPorId(id: number): Promise<boolean> {
        const { collection, client } = await this.getCollectionAndCLient();
        try {
            const livroDeletado = await collection.deleteOne({ id });
            return livroDeletado.deletedCount === 1;
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
            throw error;
        } finally {
            await client.close();
        }
    }
}

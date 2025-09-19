import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { Livro } from '../../types';

export type LivroSchema = {
    _id: ObjectId;
    id: number;
    titulo: string;
    autor: string;
    ano: number;
};

const LivroSchemaMongoose: Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    ano: { type: Number, required: true },
});

export const LivroModel = mongoose.model<Livro>('Livro', LivroSchemaMongoose);

import { ObjectId } from 'mongodb';

export type LivroSchema = {
    _id: ObjectId;
    id: number;
    titulo: string;
    autor: string;
    ano: number;
};

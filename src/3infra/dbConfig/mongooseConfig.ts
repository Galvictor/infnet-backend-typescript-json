import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
dotenv.config();
class MoongoseConfig {
    static async connect(): Promise<void> {
        try {
            const CHAVEMONGO = `${process.env.MONGO_URI}${process.env.MONGO_DB_NAME}?${process.env.DB_OPTIONS}`;
            if (!CHAVEMONGO) throw new Error('Chave do DB não encontrada');
            const connectOptions: ConnectOptions = { connectTimeoutMS: 5000, maxPoolSize: 10 };
            await mongoose.connect(CHAVEMONGO, connectOptions);
            console.log('Connected to MongoDB using Mongoose');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }
}
export default MoongoseConfig;

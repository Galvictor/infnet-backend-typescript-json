import 'dotenv/config';
import express, { Request, Response } from 'express';
import Routes from './4webApi/routes';
import Logger from './3infra/middlewares/Logger';
import ErrorHandler from './3infra/middlewares/ErrorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

app.use(Logger.init());

// Rota básica
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Backend TypeScript funcionando!',
        timestamp: new Date().toISOString(),
    });
});

app.use('/api', Routes.init());

// Rota de exemplo
app.get('/api/status', (req: Request, res: Response) => {
    res.json({
        status: 'online',
        uptime: process.uptime(),
    });
});

// ⚠️ IMPORTANTE: Middleware de erro deve ser o ÚLTIMO
app.use(ErrorHandler.init());

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
});

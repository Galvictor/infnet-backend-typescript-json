import express, { Request, Response } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rota básica
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Backend TypeScript funcionando!',
        timestamp: new Date().toISOString(),
    });
});

// Rota de exemplo
app.get('/api/status', (req: Request, res: Response) => {
    res.json({
        status: 'online',
        uptime: process.uptime(),
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
});

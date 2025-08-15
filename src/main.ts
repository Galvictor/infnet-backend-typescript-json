import express, { NextFunction, Request, Response } from 'express';
import routes from './Api/routes';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

function logRequest(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    next();
}

app.use(logRequest);

// Rota básica
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Backend TypeScript funcionando!',
        timestamp: new Date().toISOString(),
    });
});

app.use('/api', routes);

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

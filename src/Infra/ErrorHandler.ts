import { Request, Response } from 'express';

class ErrorHandler {
    private static tratarErro(err: Error, req: Request, res: Response) {
        // Log do erro
        console.error('🚨 Erro 500:', {
            message: err.message,
            url: req.url,
            method: req.method,
            timestamp: new Date().toISOString(),
        });

        // Retorna erro 500 simples
        res.status(500).json({
            message: 'Erro interno do servidor',
            error: 'INTERNAL_SERVER_ERROR',
        });
    }

    static init() {
        return this.tratarErro;
    }
}

export default ErrorHandler;

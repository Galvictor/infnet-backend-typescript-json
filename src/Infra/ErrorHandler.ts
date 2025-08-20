import { Request, Response, NextFunction } from 'express';
import CustomError from '../Api/Exceptions/CustomErros';

class ErrorHandler {
    private static tratarErro(err: Error, req: Request, res: Response, next: NextFunction) {
        // Log do erro
        console.error('🚨 Erro:', {
            message: err.message,
            statusCode: err instanceof CustomError ? err.statusCode : 500,
            errorCode: err instanceof CustomError ? err.errorCode : 'INTERNAL_SERVER_ERROR',
            url: req.url,
            method: req.method,
            timestamp: new Date().toISOString(),
        });

        // Se for CustomError, usa o statusCode personalizado
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({
                message: err.message,
                error: err.errorCode,
            });
        }

        // Erro padrão (500)
        res.status(500).json({
            message: 'Erro interno do servidor',
            error: 'INTERNAL_SERVER_ERROR',
        });

        // ✅ Usar o next para satisfazer a IDE
        next(); // Chama o próximo middleware (que não existe, mas satisfaz a IDE)
    }

    static init() {
        return this.tratarErro;
    }
}

export default ErrorHandler;

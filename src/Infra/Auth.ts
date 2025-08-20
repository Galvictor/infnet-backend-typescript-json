import { Request, Response, NextFunction } from 'express';

class Auth {
    private static readonly API_KEY = process.env.API_KEY || 'infnet-2024-secret-key';

    private static verificarApiKey(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.headers['x-api-key'] || req.headers['authorization'];

        if (!apiKey) {
            return res.status(401).json({
                message: 'API Key não fornecida',
                error: 'UNAUTHORIZED',
            });
        }

        // Remove 'Bearer ' se estiver presente
        const key = apiKey.toString().replace('Bearer ', '');

        if (key !== Auth.API_KEY) {
            return res.status(403).json({
                message: 'API Key inválida',
                error: 'FORBIDDEN',
            });
        }

        next();
    }

    static init() {
        return this.verificarApiKey;
    }
}

export default Auth;

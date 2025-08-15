import { Request, Response, NextFunction } from 'express';

export function logRequest(req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} ${req.method} ${req.url}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    console.log('--------------------------------');
    next();
}

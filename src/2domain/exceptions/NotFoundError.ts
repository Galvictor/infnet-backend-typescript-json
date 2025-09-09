import CustomError from './CustomErros';

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404, 'NOT_FOUND');
    }
}

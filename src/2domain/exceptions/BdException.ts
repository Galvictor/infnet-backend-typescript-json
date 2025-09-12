import CustomError from './CustomErros';

export class BdException extends CustomError {
    constructor(message: string) {
        super(message, 500, 'BD_EXCEPTION');
    }
}

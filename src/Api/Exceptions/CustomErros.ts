abstract class CustomError extends Error {
    public statusCode: number;
    public errorCode: string;

    constructor(message: string, statusCode: number = 500, errorCode: string = 'CUSTOM_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;

        // Importante: Define o prototype corretamente
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export default CustomError;

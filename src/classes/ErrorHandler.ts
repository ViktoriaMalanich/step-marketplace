export class ErrorHendler extends Error {

    public statusCode: number = 500;

    constructor(statusCode: number, message?: string) {
        super(message);
        this.statusCode = statusCode;
    }

}
export class ErrorHendler extends Error {

    public statusCode: number = 500;
    public message: string = "";

    constructor(statusCode: number, message?: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message || "";

        Object.setPrototypeOf(this, ErrorHendler.prototype);
    }

}
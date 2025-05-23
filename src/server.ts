import express, { Request, Response, NextFunction } from "express";
import { router } from "./components";
import { ErrorHendler } from "./classes/ErrorHandler";

export const app = express();

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // console.log("TYPEOFerr", typeof err);
    const errObject = (typeof err == "string") ? JSON.parse(err) : err;

    // console.error("err.message", errObject.errors, Array.isArray(errObject.errors));
    let statusCode = errObject.statusCode;
    let message = errObject.message;
    // console.error(typeof err);
    if (Array.isArray(errObject.errors)) {
        // console.log("Array.isArray(err)");
        statusCode = 400;
        message = errObject.errors.map((item: any) => item.message).join('; ');
    }

    res.status(statusCode || 500).send(message);
});
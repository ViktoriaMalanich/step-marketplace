import express, { Request, Response, NextFunction } from "express";
import { router } from "./components";
import { ErrorHendler } from "./classes/ErrorHandler";
import { ZodError } from "zod";

export const app = express();

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    
    let statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
    let message = err.message;

    if (Array.isArray(err.errors)) {
        statusCode = 400;
        message = err.errors.map((item: any) => item.message).join('; ');
    }

    res.status(statusCode || 500).json({ message });
});
import express, { Request, Response, NextFunction } from "express";
import { router } from "./components";
import { ErrorHendler } from "./classes/ErrorHandler";
import { ZodError } from "zod";
import path from 'path';

export const app = express();

app.use(express.json()); 

app.use(router);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    
    let statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
    let message = err.message;

    if (Array.isArray(err.errors)) {
        statusCode = 400;
        message = err.errors.map((item: any) => item.message).join('; ');
    }

    res.status(statusCode || 500).json({ message });
});
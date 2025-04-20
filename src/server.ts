import express, { Request, Response, NextFunction } from "express";
import { router } from "./components";
import { ErrorHendler } from "./classes/ErrorHandler";

export const app = express();

app.use(router);

app.use((err: ErrorHendler, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});
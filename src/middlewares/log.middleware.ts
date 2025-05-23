import { Request, Response, NextFunction } from "express";

export const printLog = (req: Request, res: Response, next: NextFunction)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
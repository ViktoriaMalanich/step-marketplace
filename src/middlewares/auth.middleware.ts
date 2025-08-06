import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jwt.helper";
import { RequestWithUser } from "../types";
import { User } from "../entities/User";


export const setUserPayload = (req: RequestWithUser, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1];

    let payload: Partial<User> | null = null;

    if (token) {
        payload = verifyToken(token);
    }

    req.user = payload;
    next();
};
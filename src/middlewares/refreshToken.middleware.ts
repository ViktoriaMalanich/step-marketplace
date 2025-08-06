import { NextFunction, Request, Response } from "express";
import { signToken } from "../helpers/jwt.helper";
import { IUserPayload } from "../types";
import { ErrorHendler } from "../classes/ErrorHandler";
import { RequestWithUser } from "../types";
import { User } from "../entities/User";


export const newToken = (req: Request, res: Response, next: NextFunction) => {
    
    const user = (req as unknown as RequestWithUser).user as Partial<User>;

    if (!user) {
        throw new ErrorHendler(401, "You are not authentificated");
    }

    res.setHeader("Authorization", `Bearer ${signToken(user)}`);

    next();
}


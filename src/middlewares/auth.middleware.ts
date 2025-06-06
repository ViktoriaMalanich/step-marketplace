import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jwt.helper";
import { RequestWithUser } from "../types";

import { TokenPayload } from "../types";
import { ErrorHendler } from "../classes/ErrorHandler";




// export const setUserPayload = (req: Request, res: Response, next: NextFunction) => {

//     const token = req.headers.authorization?.split(" ")[1] || "";
//     const payload = verifyToken(token);

//     delete payload?.iat;    
//     delete payload?.exp;

//     (req as unknown as RequestWithUser).user = payload;
//     next();
// }

export const setUserPayload = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        const payload = verifyToken(token);
        req.user = payload;
    }

    next();
};
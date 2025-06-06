import { NextFunction, Request, Response } from "express";
import { setUserPayload } from "./auth.middleware";
import { ErrorHendler } from "../classes/ErrorHandler";
import { IUserPayload, RequestWithUser, USER_ROLES } from "../types";
import { User } from "../entities/User";
import { verifyToken } from "../helpers/jwt.helper";


export const isAuth = (req: Request, res: Response, next: NextFunction) => {

    const user = (req as RequestWithUser).user as Partial<User>;
    if (!user) {
        throw new ErrorHendler(401, "You are not authentificated");
    }

    next();
}

export const isRoot = (req: Request, res: Response, next: NextFunction) => {

    const user = (req as RequestWithUser).user as Partial<User>;

    if (user.role !== "ROOT") {
        throw new ErrorHendler(403, "You do not have required permitions");
    }

    next();
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    const user = (req as RequestWithUser).user as Partial<User>;

    if (user.role !== "ADMIN") {
        throw new ErrorHendler(403, "You do not have required permitions");
    }

    next();
}

export const isCustomer = (req: Request, res: Response, next: NextFunction) => {

    const user = (req as RequestWithUser).user as Partial<User>;

    if (user.role !== "CUSTOMER") {
        throw new ErrorHendler(403, "You do not have required permitions");
    }

    next();
}

//Root or Admin
export const checAdminOrRoot = (req: Request, res: Response, next: NextFunction) => {

    const user = (req  as RequestWithUser).user as Partial<User>;

    if (user.role !== "ADMIN" || "ROOT") {
        throw new ErrorHendler(403, "You do not have required permitions");
    }

}

// export function checkRoles(allowedRoles: string[] = []) {
//   return function (req: Request, res: Response, next: NextFunction) {
//     const user = req.user as UserPayload | undefined;

//     if (!user) {
//       return res.status(401).json({ message: 'Пользователь не аутентифицирован' });
//     }

//     if (!allowedRoles.includes(user.role)) {
//       return res.status(403).json({ message: 'У вас недостаточно прав' });
//     }

//     next();
//   };
// }




// export type USER_ROLES = "CUSTOMER" | "ADMIN" | "ROOT";


/**import { verifyToken } from "../helpers/jwt.helper";

export const setUserPayload = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1] || "";
    const payload = verifyToken(token);

    delete payload?.iat;
    delete payload?.exp;

    req.user = payload;
    
    next();
} */
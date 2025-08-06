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

    if (user.role !== "ADMIN" && user.role !== "ROOT") {
        throw new ErrorHendler(403, "You do not have required permitions");
    }

}

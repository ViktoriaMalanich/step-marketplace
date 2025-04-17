import { Request, Response, NextFunction } from "express";
import { findUserList } from "./user.services";

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
    const users = await findUserList();
    res.status(200).json(users);
}
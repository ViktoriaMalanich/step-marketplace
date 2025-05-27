import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../users/user.services";
import { ErrorHendler } from "../../classes/ErrorHandler";
import { verifyPassword } from "../../helpers/hash.helper";
import { signToken } from "../../helpers/jwt.helper";
import { User } from "../../entities/User";
import { userCredentialsValidator } from "./auth.validator";

export const createAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validCredentials = userCredentialsValidator.parse(req.body);
        
        const { email, password } = validCredentials;
        const user = await getUserByEmail(email);
        console.log("!!! My user", user);

        if (!user) {
            throw new ErrorHendler(400, "Invalid login or password");
        }

        const isPasswordVerified = verifyPassword(password, user.password as string);

        if (!isPasswordVerified) {
            throw new ErrorHendler(400, "Invalid login or password");
        }
        
        delete user.password;

        const token = signToken<Partial<User>>(user);

        res.status(201).json({
            user,
            token
        });

    } catch (error) {
        next(error);
    }
}
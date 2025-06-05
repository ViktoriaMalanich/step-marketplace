import { Request, Response, NextFunction } from "express";
import {
    getOneUser,
    findUserList,
    updateUser,
    createUser,
    getUserByEmail
} from "./user.services";
import {
    changePassword,
    createUserValidator,
    updateUserValidator
} from "./users.validation";
import { createHash } from "../../helpers/hash.helper";
import { ErrorHendler } from "../../classes/ErrorHandler";
import { sendEmail } from "../../services/send-email.services";
import { signToken, verifyToken } from "../../helpers/jwt.helper";
import { userEmailValidator } from "../auth/auth.validator";


export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query;
        // console.log(queryParams);
        const users = await findUserList();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {

    const userId = Number(req.params.id);
    try {
        const userResult = await getOneUser(userId);
        res.status(200).json(userResult)

    } catch (error) {
        next(error);
    }
}


export const putUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getOneUser(Number(req.params.id));
        if (!user) {
            throw new ErrorHendler(404, "User not found");
        }
        // console.log("req.body", req.body);
        const validatedData = updateUserValidator.parse(req.body);
        //  console.log("Валидэйтед дата", validatedData);s
        const userId = req.params.id; //из url
        // console.log("userId, req.params.id", userId, req.params.id);

        const updatedUser = await updateUser(Number(userId), validatedData);
        res.status(200).json({ ...updatedUser });
    } catch (error) {
        console.log("My error", error);
        next(error);
    }
};


//res.status(200).json({});
/**
 * 0) Проверка прав доступа к этому эндпоинт!!!
 * 1) Сопоставить данные с полями юзера -  Валидация
 * 2) Обновить те данные, которые хочет обновить пользователь
 * 3) Если все успешно, вернуть результат клиенту.
 * 4) В случае ошибки сделать исключение
 */
//}

export const postUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body;
        const parseResult = createUserValidator.parse(userData);

        parseResult.password = createHash(parseResult.password);
        //console.log("parseResult", parseResult);
        const user = await createUser(parseResult);
        if (user) {
            delete user.password;
        }

        // const sendEmailResult = await sendEmail(
        //     "VERIFY_EMAIL",
        //     {
        //         email: user.email,
        //         name: user.firstName + ` ` + user.lastName
        //     },
        //     {
        //         token: signToken(user),
        //         expairedIn: "24 h"
        //     }
        // );

        // console.log("sendEmailResult", sendEmailResult);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const postPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.body.token;

        //console.log("token", token);

        if (!token) {
            throw new ErrorHendler(400, "Missing token");
        }


        const payload = verifyToken(token) as { email: string };

        if (!payload) {
            throw new ErrorHendler(401, "Invalid or expired token");
        }

        //console.log("payload!!!!!!!!!!!!!!!!", payload);

        const user = await getUserByEmail(payload.email);

        // const user = await getUserByEmail(req.body.email);
        if (!user) {
            throw new ErrorHendler(404, "User not found");
        }
        //const userPassword = req.body.password;
        const parsePassword = changePassword.parse({password: req.body.password});

        //parsePassword.password = createHash(parsePassword.password);

        const userId = user.id;

        // console.log("userId, req.params.id", userId, req.params.id);

        const updatedUser = await updateUser(Number(userId), parsePassword);

        res.status(201).json({ ...updatedUser, msg: "password changed" });//нужен ли спред
    } catch (error) {
        next(error);
    }
}

export const confirmAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = req.params.token;
        const userData = verifyToken(userToken);
        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
}

export const requestResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const validEmail = userEmailValidator.parse({ email });
        const user = await getUserByEmail(validEmail.email);

        if (!user) {
            throw new ErrorHendler(400, "User not found "); //обсудить
        }

        await sendEmail(
            "RECOVER_PASSWORD",
            {
                email: validEmail.email,
                name: user.firstName + ` ` + user.lastName
            },
            {
                token: signToken(user),
                expairedIn: "15 min"
            }
        )

        res.status(200).json({ message: "Email was send" });
    } catch (error) {
        next(error);
    }
}
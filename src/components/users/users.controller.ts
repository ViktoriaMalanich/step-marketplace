import { Request, Response, NextFunction } from "express";
import { z as validation } from "zod";
import {
    getOneUser,
    findUserList,
    updateUser,
    createUser
} from "./user.services";
import {
    changePassword,
    createUserValidator,
    updateUserValidator,
    // validation

} from "./users.validation";
import { ZodError } from "zod";
import { createHash } from "../../helpers/hash.helper";




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
        console.log("req.body", req.body);
        const validatedData = updateUserValidator.parse(req.body);
        //  console.log("Валидэйтед дата", validatedData)
        const userId = req.params.id; //из url
        console.log("userId, req.params.id", userId, req.params.id);

        const updatedUser = await updateUser(Number(userId), validatedData);
        res.status(200).json({ ...updatedUser });
    } catch (error) {
        // if (error instanceof ZodError) {
        //     const formattedErrors = error.errors.map(err => ({
        //         field: err.path.join("."),
        //         message: err.message,
        //     }));

        //     return res.status(400).json({
        //         message: "Validation error",
        //         errors: formattedErrors,
        //         input: req.body,
        //     });
        // }

        // console.error("Error updating user:", error);
        // return res.status(500).json({ message: "Internal server error" });
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

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }


    /**
     * 1) Провалидировать данные
     * 2)Сохранить данные в таблицу в БД
     * 3)Если все успешно, вернуть результат клиенту.
     * 4)В случае ошибки сделать исключение
     */

}

export const postPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userPassword = req.body;
        const parsePassword = changePassword.parse(userPassword);

        res.status(201).json({ msg: "password changed" });
    } catch (error) {
        next(error);
    }
}
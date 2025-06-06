import { z as validation } from "zod";
import { userRolesArray } from "../../types";


export const createUserValidator = validation.object({
    firstName: validation.string().min(1).max(100).nonempty(),
    lastName: validation.string().min(1).max(100).nonempty(),
    email: validation.string().email().nonempty(),
    phone: validation.string()
        .regex(/^\+?[1-9]\d{7,14}$/, {
            message: "Phone number is incorrect. Format: +1234567890",
        }),

    role: validation.enum(userRolesArray).default("CUSTOMER"),
    password: validation.string().nonempty()
});

export const updateUserValidator = validation.object({
    firstName: validation.string().min(1).max(100).optional(),
    lastName: validation.string().min(1).max(100).optional(),
    email: validation.string().email().optional(),

    phone: validation.string()
        .regex(/^\+?[1-9]\d{7,14}$/, {
            message: "Phone number is incorrect. Format: +1234567890",
        })
        .optional(),

    role: validation.enum(userRolesArray).default("CUSTOMER").optional(),
});

export const changePassword = validation.object({
    password: validation.string().nonempty()
});
// export const changePassword = validation.object({
//   password: validation
//     .string()
//     .min(8, "Пароль должен содержать минимум 8 символов")
//     .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
//     .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
//     .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
//     .regex(/[^A-Za-z0-9]/, "Пароль должен содержать хотя бы один специальный символ")
// });

import { User } from "./entities/User";
import { Request } from "express";

export type USER_ROLES = "CUSTOMER" | "ADMIN" | "ROOT";
export const userRolesArray = ["CUSTOMER", "ADMIN", "ROOT"] as const;

export interface IUserPayload {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export type LETTER_TYPE = "VERIFY_EMAIL" | "RECOVER_PASSWORD";

interface ModifyHeaders extends Headers {
    authorization: string
}

export interface RequestWithUser extends Request {
    user?: Partial<User> | null;
    //headers: ModifyHeaders
    headers: Request["headers"] & { authorization?: string };
}

export interface TokenPayload {
    [key: string]: string;
}

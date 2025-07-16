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

export type PRODUCT_STATUS = "IN STOKE" | "ORDER" | "OUT OF STOK";
export const productStatusArray = ["IN STOKE", "ORDER", "OUT"] as const;

export type STRIPE_METHODS_TYPES = "card";

export interface StripeCardDetailsDto {
    type: STRIPE_METHODS_TYPES; // card
    card: {
        number: string;
        exp_month: number;
        exp_year: number;
        cvc: string;
    }
}

export type DELIVERY_STATUS = "NONE" | "PROCESSING" | "IN_TRANSIT" | "DELIVERED" | "COMPLETED";
export const diliveryStatusArray = ["NONE", "PROCESSING", "IN_TRANSIT", "DELIVERED", "COMPLETED"] as const;

export type PAYMENT_STATUS = "NONE" | "UNPAID" | "PAID" | "PENDING" | "FAILED" | "REFUNDED";
export const paymentStatusArray = ["NONE", "UNPAID", "PAID", "PENDING", "FAILED", "REFUNDED"] as const;
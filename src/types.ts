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


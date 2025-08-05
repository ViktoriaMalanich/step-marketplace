import { z as validation } from "zod";

export const userCredentialsValidator = validation.object({
    email: validation.string().email().nonempty("Required field \"email\" is empty or is not exist"),
    password: validation.string().nonempty("Required field \"password\" is empty or is not exist").min(3)
});

export const userEmailValidator = validation.object({
    email: validation.string().email().nonempty("Required field \"email\" is empty or is not exist")
});
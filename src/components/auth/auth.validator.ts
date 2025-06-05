import { z as validation } from "zod";

export const userCredentialsValidator = validation.object({
    email: validation.string().email().nonempty(),
    password: validation.string().nonempty().min(3)
});

export const userEmailValidator = validation.object({
    email: validation.string().email().nonempty()
});
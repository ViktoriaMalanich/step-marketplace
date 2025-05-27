import { z as validation } from "zod";

export const userCredentialsValidator = validation.object({
    email: validation.string().email().nonempty(),
    password: validation.string().nonempty().min(3)
});
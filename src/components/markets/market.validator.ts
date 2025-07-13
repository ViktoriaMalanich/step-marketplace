import { z as validation, ZodIssueCode } from "zod";

export const imagesValidator = validation.preprocess(
    (val) => {
        if (val === undefined || val === null) return "";
        return val;
    },
    validation
        .string()
        .min(1, { message: "Images array can not be empty" })
);
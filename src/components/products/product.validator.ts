import { z as validation, ZodIssueCode } from "zod";

export const imagesValidator = validation.preprocess(
  (val) => {
    // Если значение undefined или null, возвращаем пустую строку, чтобы сработала проверка min(1)
    if (val === undefined || val === null) return "";
    // Иначе возвращаем как есть
    return val;
  },
  validation
    .string()
    .min(1, { message: "Images array can not be empty" })
);

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

export const productListQueryValidation = validation.object({

  categoryId: validation.preprocess(
    val => Number(val),
    validation
      .number({ message: "CategoryId must be a number" })
      .min(1, { message: "Number must be positive" })
  ).optional(),

  marketId: validation.preprocess(
    val => Number(val),
    validation
      .number({ message: "MarketId must be a number" })
      .min(1, { message: "MarketId number must be positive" })
  ).optional(),

  page: validation.preprocess(
    val => Number(val),
    validation
      .number({ message: "Page must be a number" })
      .min(1, { message: "Page number must be positive" })
  ).optional(),

  limit: validation.preprocess(
    val => Number(val),
    validation
      .number({ message: "Limit must be a number" })
      .min(1, { message: "Limit number must be positive" })
  ).optional(),

  //обсудить какие поля используем для сортировки TODO заменить стринг на энам
  orderBy: validation.string().optional(),

  order: validation.enum(["ASC", "DESC"]).default("ASC").optional(),

  specifications: validation.preprocess(
    val => !val ? [] : val.toString().split(",").map(item => Number(item)),
    validation.array(validation.number(), {
      message: "Specification has to be a number array"
    })
  ).optional(),

  specValues: validation.preprocess(
    val => !val ? [] : val.toString().split(","),
    validation.array(validation.string()),
    {
      message: "It should be array with specification's value"
    }
  ).optional()
});
//TODO колличество значений спецификаций и колличество айди должно совпадать
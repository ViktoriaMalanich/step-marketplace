import { Request, Response, NextFunction } from "express";
import { createOrder } from "./order.service";
import { ErrorHendler } from "../../classes/ErrorHandler";

export const postCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.body.userId);
        const items = req.body.items;

        //сделать валидатор
        if (!userId || !Array.isArray(items) || items.length === 0) {
            throw new ErrorHendler(400, "Invalid data");
        }

        const newOrder = await createOrder(userId, items);
       
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
};

export const postPayForOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /**
         * 1) Проверим, зарегистрирован ди юзер в страйпе,
         * 2) Если его нет выдаем ошибку ()
         * 3) Определяем пеймент метод, если нету - ошибка
         * 4) Получить ордер 
         * 5) Сделать транзакцию платежа
         * 6) Обновить статус ордера
         * 7) Вернуть ответ (модифицированный объект)
         * 
         */


    } catch (error) {

    }
}


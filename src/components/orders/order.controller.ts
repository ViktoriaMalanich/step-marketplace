import { Request, Response, NextFunction } from "express";
import { createOrder, getOrderById, modifyOrder } from "./order.service";
import { ErrorHendler } from "../../classes/ErrorHandler";
import { findUserPaymentData } from "../payment/payment.service";
import { createPaymentIntent } from "../../services/stripe.service";

export const postCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
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
       
         * 5) Сделать транзакцию платежа
         * 6) Обновить статус ордера
         * 7) Вернуть ответ (модифицированный объектзаказа)
         * 
         */

        const paymentData = await findUserPaymentData(req.body.userId);

        if (!paymentData) {
            throw new ErrorHendler(400, "The user is not registered with Stripe");
        }


        const orderId = Number(req.params.orderId);

        if (!orderId) {
            throw new ErrorHendler(400, "Wrong id");
        }

        const order = await getOrderById(orderId);

        if(order.paymentStatus != "NONE" && order.paymentStatus != "PENDING"){
            throw new ErrorHendler(400, "The order has already been paid")
        }

        const charge = await createPaymentIntent(
            paymentData.pmStripeId,
            paymentData.stripeId,
            order.amount as number
        );

        console.log(charge);

        order.paymentStatus = "PAID";

        const newOrder = await modifyOrder(order);

        res.status(201).json(newOrder);

    } catch (error) {
        next(error)
    }
}


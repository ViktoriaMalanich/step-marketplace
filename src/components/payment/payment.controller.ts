import { Request, Response, NextFunction } from "express";
import { getOneUser } from "../users/user.services";
import { ErrorHendler } from "../../classes/ErrorHandler";
import { addCard, customerDelete, customerRegistration } from "../../services/stripe.service";
import { createUserPaymentData, findUserPaymentData, removeUserPayment, removeUserPaymentMethods, savePaymentMethod } from "./payment.service";
import { STRIPE_METHODS_TYPES } from "../../types";
import { stripe } from "../../config/stripe";

export const registerStripeCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const user = await getOneUser(userId);
        console.log("user", user);
        if (!user) {
            throw new ErrorHendler(400, "User not found");
        }

        const stripeCustomer = await customerRegistration(user);
        console.log("stripeCustomer", stripeCustomer);

        const payment = await createUserPaymentData({
            userId,
            name: stripeCustomer.name || null,
            stripeId: stripeCustomer.id,
            created: new Date(stripeCustomer.created * 1000),
            invoice_prefix: stripeCustomer.invoice_prefix || null
        });

        res.status(201).json(payment);
    } catch (error) {
        next(error);
    }
}

export const deleteStripeCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const paymentData = await findUserPaymentData(userId);

        await customerDelete(paymentData.stripeId);

        await removeUserPaymentMethods(userId);

        await removeUserPayment(userId);

        res.status(204).send();
       
    } catch (error) {
        next(error);
    }
}

export const createStripeCard = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = Number(req.params.userId);

        const { paymentMethodId } = req.body;

        const payment = await findUserPaymentData(userId);
        if (!payment) {
            throw new ErrorHendler(400, "User payment data not found");
        }

        const paymentMethod = await addCard(payment.stripeId, paymentMethodId);

        await savePaymentMethod(userId, {
            id: paymentMethod.id,
            brand: paymentMethod.card!.brand,
            last4: paymentMethod.card!.last4,
            exp_month: paymentMethod.card!.exp_month,
            exp_year: paymentMethod.card!.exp_year
        });

        res.status(201).json(paymentMethodId);

    } catch (error) {
        next(error);
    }
}


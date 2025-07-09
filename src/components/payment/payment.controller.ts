import { Request, Response, NextFunction } from "express";
import { getOneUser } from "../users/user.services";
import { ErrorHendler } from "../../classes/ErrorHandler";
import { addCard, customerDelete, customerRegistration } from "../../services/stripe.service";
import { createUserPaymentData, findUserPaymentData, savePaymentMethod } from "./payment.service";
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

        const deletedCustomer = await customerDelete(paymentData.stripeId);

        res.status(204).send();
        //.status(200).json({ deletedCustomer });
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

        // const card = {
        //     type: 'card' as STRIPE_METHODS_TYPES,
        //     card: {
        //         number: "42424242424242424",
        //         exp_month: 12,
        //         exp_year: 2035,
        //         cvc: "000"
        //     }
        // }

        // await stripe.paymentMethods.attach(paymentMethodId, {
        //     customer: payment.stripeId,
        // });

        
        // await stripe.customers.update(payment.stripeId, {
        //     invoice_settings: {
        //         default_payment_method: paymentMethodId,
        //     },
        // });

        //const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

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


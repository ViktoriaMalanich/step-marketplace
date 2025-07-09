import { ErrorHendler } from "../classes/ErrorHandler";
import { stripe } from "../config/stripe";
import { User } from "../entities/User";
import { StripeCardDetailsDto } from "../types";

export const customerRegistration = async (user: User) => {
    try {
        const customer = await stripe.customers.create({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
        });

        return customer;
    } catch (error: any) {
        console.log(error);
        throw new ErrorHendler(500, error.message);
    }
}

export const customerDelete = async (stripeId: string) => {
    try {

        const deleted = await stripe.customers.del(stripeId);
        return deleted;

    } catch (error: any) {
        console.log(error);
        throw new ErrorHendler(500, error.message);
    }
}

export const addCard = async (
    customerStripeId: string,
    paymentMethodId: string) => {
    try {
        await stripe.paymentMethods
            .attach(paymentMethodId, { customer: customerStripeId });

        // Назначаем как способ по умолчанию
        await stripe.customers.update(customerStripeId, {
            invoice_settings: {
                default_payment_method: paymentMethodId
            }
        });

        const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

        return paymentMethod;

    } catch (error: any) {
        console.log(error);
        throw new ErrorHendler(500, error.message);
    }
}

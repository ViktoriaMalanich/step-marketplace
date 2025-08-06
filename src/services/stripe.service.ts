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

export const createPaymentIntent = async (
    paymentMethodId: string,
    stripeId: string,
    amount: number
) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, 
            currency: 'gbp',
            payment_method: paymentMethodId,
            confirm: true,                  
            customer: stripeId,
            description: 'Online purchase',
            receipt_email: 'vmalanich290806@gmail.com', 
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
        }
        );

        console.log(paymentIntent);

        return paymentIntent;

    } catch (error: any) {
        console.log(error);
        throw new ErrorHendler(500, error?.message || 'Stripe payment error');
    }

}

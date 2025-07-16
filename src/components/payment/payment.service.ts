import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Payment } from "../../entities/Payment";
import { PaymentDto } from "./payment.dto";
import { PaymentMethod } from "../../entities/PaymentMethod";


export const createUserPaymentData = async (stripeData: PaymentDto): Promise<Payment> => {

    const paymentRepo = DBconnection.getRepository(Payment);
    const stripeCustomerData = await paymentRepo.save(stripeData);

    if (!stripeCustomerData) {
        throw new ErrorHendler(500, "Can not save data");
    }

    return stripeCustomerData;
}

export const findUserPaymentData = async (userId: number): Promise<any> => {

    const paymentRepo = DBconnection.getRepository(Payment);
    const payment = await paymentRepo
        .createQueryBuilder('payment')
        .leftJoinAndSelect(
            'payment_methods',
            'payment_methods',
            'payment.userId = payment_methods.user_id'
        )
        .select([
            'payment.userId AS userId',
            'payment.stripeId AS stripeId',
            'payment_methods.id AS pmId',
            'payment_methods.stripe_payment_method_id AS pmStripeId'
        ])
        .where('payment.userId = :userId', { userId })
        .getRawOne();

    if (!payment) {
        throw new ErrorHendler(400, "Data not found");
    }

    return payment;
}
///////////////////////////////////////////////////////


export const savePaymentMethod = async (
    user_id: number,
    cardData: {
        id: string,
        brand: string,
        last4: string,
        exp_month: number,
        exp_year: number
    }
): Promise<PaymentMethod> => {

    const paymentMethodRepo = DBconnection.getRepository(PaymentMethod);
    //for cards only. Should be modified to other payment methods
    const paymentMethodEntity = paymentMethodRepo.create({
        user_id,
        stripe_payment_method_id: cardData.id,
        brand: cardData.brand,
        last4: cardData.last4,
        exp_month: cardData.exp_month,
        exp_year: cardData.exp_year,
    });

    const saved = await paymentMethodRepo.save(paymentMethodEntity);

    if (!saved) {
        throw new ErrorHendler(500, "Can not save payment method");
    }

    return saved;
}

/**
 * post /payment/:userId - добавить платежные реквизиты
 * 
 *  post /payment/:userId/subscription - создать подписку (пока хард код) 
 * и в этот же момент обноввить роль пользователя
 * 
 * 
 * 
 */
import { json, Router } from "express";
import { createStripeCard, deleteStripeCustomer, registerStripeCustomer } from "./payment.controller";

const router = Router();
router.post('/:userId', registerStripeCustomer);

router.post('/:userId/addcard', createStripeCard);

router.delete('/:userId', deleteStripeCustomer);

export const PaymentRouter = router;
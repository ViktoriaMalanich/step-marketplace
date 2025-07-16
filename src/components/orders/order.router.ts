import { json, Router } from "express";
import { postCart, postPayForOrder } from "./order.controller";

const router: Router = Router();

router.post('/:userId', json(), postCart);

router.post('/:orderId/buy', json(), postPayForOrder);

export const OrderRouter = router;

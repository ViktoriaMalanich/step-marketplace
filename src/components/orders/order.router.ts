import { json, Router } from "express";
import { postCart } from "./oreder.controller";

const router: Router = Router();

router.post('/', json(), postCart);

//router.post('/:orderId/buy', json(), postAddPriceToOrder);

export const OrderRouter = router;

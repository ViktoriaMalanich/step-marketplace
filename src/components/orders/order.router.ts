import { json, Router } from "express";
import {
    getOneOrder,
    getOrderList,
    getUserOrderList,
    postCart,
    postPayForOrder
} from "./order.controller";

const router: Router = Router();

router.get("/",
    //newToken, 
    getOrderList);
    

router.get("/:id", getOneOrder);

router.get("/user/:userId", getUserOrderList);

router.post('/:userId', json(), postCart);

router.post('/:orderId/buy', json(), postPayForOrder);

export const OrderRouter = router;

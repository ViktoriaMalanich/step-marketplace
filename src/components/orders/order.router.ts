import { json, Router } from "express";
import {
    getOneOrder,
    getOrderList,
    getUserOrderList,
    postCart,
    postPayForOrder,
    updateDeliveryStatus
} from "./order.controller";

const router: Router = Router();

router.get("/",
    //newToken, 
    getOrderList);


router.get("/:id", getOneOrder);

router.get("/user/:userId", getUserOrderList);

router.post("/:userId", json(), postCart);

router.post("/:orderId/buy", json(), postPayForOrder);

router.put("/:orderId/delivery-status", json(), updateDeliveryStatus);

export const OrderRouter = router;

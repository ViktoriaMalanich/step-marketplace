import { json, Router } from "express";
import {
    getMarketList,
    getOneMarket,
    addNewMarket,
    modifyMarket,
    deleteMarket,
    getOwnerMarket
} from "./markets.controller";
import { checAdminOrRoot, isAuth, isRoot } from "../../middlewares/authorization.middleware";
import { newToken } from "../../middlewares/refreshToken.middleware";

const router = Router();

router.get("/",
    //newToken, 
    getMarketList);

router.get("/:idOrName", getOneMarket);

router.get("/owner/:ownerId", getOwnerMarket);



router.post("/",
    json(),
    // isRoot,
    //checAdminOrRoot,
    addNewMarket
);

router.put("/:id", json(),
    //isAuth, 
    modifyMarket);

router.delete("/:id",
    //isAuth, 
    // isRoot, 
    deleteMarket);

export const MarketRouter = router;
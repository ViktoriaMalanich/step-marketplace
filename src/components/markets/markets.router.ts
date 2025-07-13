import { json, Router } from "express";
import {
    getMarketList,
    getOneMarket,
    addNewMarket,
    modifyMarket,
    deleteMarket,
    getOwnerMarket,
    uploadMarketPhoto
} from "./markets.controller";
import { checAdminOrRoot, isAuth, isRoot } from "../../middlewares/authorization.middleware";
import { newToken } from "../../middlewares/refreshToken.middleware";
import upload from "../../middlewares/upload.middleware";

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

router.post(
    '/:marketId/image', 
    upload.single('file'), 
    uploadMarketPhoto);


router.put("/:id", json(),
    //isAuth, 
    modifyMarket
);


router.delete("/:id",
    //isAuth, 
    // isRoot, 
    deleteMarket
);

export const MarketRouter = router;
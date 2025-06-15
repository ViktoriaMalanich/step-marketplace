import { json, Router } from "express";
import {
    getProductList,
    getOneProduct,
    addNewProduct,
    modifyProduct,
    deleteProduct
} from "./products.controller";
import { checAdminOrRoot, isAuth, isRoot } from "../../middlewares/authorization.middleware";
import { newToken } from "../../middlewares/refreshToken.middleware";

const router = Router();

router.get("/",
    //newToken, 
    getProductList);

router.get("/:idOrName", getOneProduct);

router.post("/",
    json(),
    // isRoot,
    //checAdminOrRoot,
    addNewProduct
);

router.put("/:id", json(),
    //isAuth, 
    modifyProduct);

router.delete("/:id",
    //isAuth, 
    // isRoot, 
    deleteProduct);

export const ProductRouter = router;
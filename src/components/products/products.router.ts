import { json, Router } from "express";
import {
    getProductList,
    getOneProduct,
    addNewProduct,
    modifyProduct,
    deleteProduct,
    uploadPhotos
} from "./products.controller";
import { checAdminOrRoot, isAuth, isRoot } from "../../middlewares/authorization.middleware";
import { newToken } from "../../middlewares/refreshToken.middleware";
import upload from "../../middlewares/upload.middleware";

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


router.post('/:id/images', upload.array('files', 10), uploadPhotos);
///products/:productId/images

export const ProductRouter = router;
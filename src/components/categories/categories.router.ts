import { json, Router } from "express";
import {
    getCategoryList,
    getOneCategory,
    addNewCategory,
    modifyCategory,
    deleteCategory,
    modifyCategorySpecs,
    uploadCategoryPhoto
} from "./categories.controller";
import { printLog } from "../../middlewares/log.middleware";
import { checAdminOrRoot, isAuth, isRoot } from "../../middlewares/authorization.middleware";
import { newToken } from "../../middlewares/refreshToken.middleware";
import upload from "../../middlewares/upload.middleware";

const router = Router();

router.get("/", getCategoryList);
router.get("/:idOrName", getOneCategory);

router.post("/",
    json(),
    // isRoot,
   // checAdminOrRoot,
    addNewCategory
);

router.post("/:id",
    json(),
    // isRoot,
   // checAdminOrRoot,
    modifyCategorySpecs
);

router.post(
    '/:categoryId/image', 
    upload.single('file'), 
    uploadCategoryPhoto);

router.put("/:id", json(), isAuth, modifyCategory);

router.delete("/:id", isAuth, isRoot, deleteCategory);

export const CategoryRouter = router;
import { json, Router } from "express";
import {
    getCategoryList,
    getOneCategory,
    addNewCategory,
    modifyCategory,
    deleteCategory,
    modifyCategorySpecs
} from "./categories.controller";
import { printLog } from "../../middlewares/log.middleware";
import { checAdminOrRoot, isAuth, isRoot } from "../../middlewares/authorization.middleware";
import { newToken } from "../../middlewares/refreshToken.middleware";

const router = Router();

router.get("/", newToken, getCategoryList);
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

router.put("/:id", json(), isAuth, modifyCategory);

router.delete("/:id", isAuth, isRoot, deleteCategory);

export const CategoryRouter = router;
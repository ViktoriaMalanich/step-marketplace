import { json, Router } from "express";
import {
    getCategoryList,
    getOneCategory,
    addNewCategory,
    modifyCategory,
    deleteCategory
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
    checAdminOrRoot,
    addNewCategory
);

router.put("/:id", json(), modifyCategory);

router.delete("/:id", isAuth, isRoot, deleteCategory);

export const CategoryRouter = router;
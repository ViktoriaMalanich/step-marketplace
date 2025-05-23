import { json, Router } from "express";
import {
    getCategoryList,
    getOneCategory,
    addNewCategory,
    modifyCategory,
    deleteCategory
} from "./categories.controller";
import { printLog } from "../../middlewares/log.middleware";

const router = Router();

router.get("/", printLog, getCategoryList);
router.get("/:idOrName", getOneCategory);

router.post("/", json(), addNewCategory);
router.put("/:id", json(), modifyCategory);

router.delete("/:id", deleteCategory);

export const CategoryRouter = router;
import { json, Router } from "express";
import {
    getCategoryList,
    getOneCategory,
    addNewCategory,
    modifyCategory,
    deleteCategory
} from "./categories.controller";

const router = Router();

router.get("/", getCategoryList);
router.get("/:idOrName", getOneCategory);

router.post("/", json(), addNewCategory);
router.put("/:id", json(), modifyCategory);

router.delete("/:id", deleteCategory);

export const CategoryRouter = router;
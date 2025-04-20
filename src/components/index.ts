import { Router } from "express";
import { CategoryRouter } from "./categories/categories.router";

export const router = Router();

router.use("/categories", CategoryRouter);
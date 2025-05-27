import { Router } from "express";
import { CategoryRouter } from "./categories/categories.router";
import { UserRouter } from "./users/users.router";
import { AuthRouter } from "./auth/auth.router";

export const router = Router();

router.use("/categories", CategoryRouter);

router.use("/users", UserRouter);

router.use("/auth", AuthRouter);
import { Router } from "express";
import { CategoryRouter } from "./categories/categories.router";
import { UserRouter } from "./users/users.router";
import { AuthRouter } from "./auth/auth.router";
import { setUserPayload } from "../middlewares/auth.middleware";
import { RequestHandler } from "express";

export const router = Router();

router.use(setUserPayload as unknown as RequestHandler );

router.use("/categories", CategoryRouter);

router.use("/users", UserRouter);

router.use("/auth", AuthRouter);
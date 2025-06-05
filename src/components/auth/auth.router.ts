import { json, Router } from "express";
import { createAuth, recreateToken } from "./auth.controller";
import { isAuth } from "../../middlewares/authorization.middleware";
import { RequestWithUser } from "../../types";

const router: Router = Router();

router.post('/', json(), createAuth);

router.post('/refresh', isAuth, recreateToken);//?

export const AuthRouter = router;
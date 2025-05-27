import { json, Router } from "express";
import { createAuth } from "./auth.controller";

const router: Router = Router();

router.post('/', json(), createAuth);

export const AuthRouter = router;
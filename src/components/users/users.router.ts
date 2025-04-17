import { Router } from "express";
import { getUserList } from "./users.controller";

const router = Router();

router.get("/", getUserList);

export const UserRouter = router;
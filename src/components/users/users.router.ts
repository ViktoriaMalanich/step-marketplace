import { json, Router } from "express";

import {
    getUserList,
    getUserById,
    putUserData,
    postUserData,
    postPassword,
    confirmAccount,
    requestResetPassword
} from "./users.controller";
import { isAuth } from "../../middlewares/authorization.middleware";

const router = Router();

router.get("/", getUserList);

router.get('/:id', getUserById);

router.get('/confirm/:token', confirmAccount);

router.post('/reset-password', json(), requestResetPassword);

router.post('/', json(), postUserData);

router.put('/:id', json(), putUserData);

router.post("/change-password", json(), isAuth, postPassword);

export const UserRouter = router;
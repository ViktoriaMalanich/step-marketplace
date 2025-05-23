import { json, Router } from "express";

import {
    getUserList,
    getUserById,
    putUserData,
    postUserData,
    postPassword
} from "./users.controller";

const router = Router();

router.get("/", getUserList);

router.get('/:id', getUserById);

router.post('/', json(), postUserData);

router.put('/:id', json(), putUserData);

router.post("/:id/change-password", json(), postPassword);

export const UserRouter = router;
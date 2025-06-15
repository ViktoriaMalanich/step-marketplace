import { json, Router } from "express";
import {
    getSpecificationList,
    getOneSpecification,
    addNewSpecification,
    modifySpecification,
    deleteSpecification
} from "./specifications.controller";
import { checAdminOrRoot, isAuth, isRoot } from "../../middlewares/authorization.middleware";
import { newToken } from "../../middlewares/refreshToken.middleware";

const router = Router();

router.get("/",
    //newToken, 
    getSpecificationList);

router.get("/:idOrName", getOneSpecification);

router.post("/",
    json(),
    // isRoot,
    //checAdminOrRoot,
    addNewSpecification
);

router.put("/:id", json(),
    //isAuth, 
    modifySpecification);

router.delete("/:id",
    //isAuth, 
    // isRoot, 
    deleteSpecification);

export const SpecificationRouter = router;
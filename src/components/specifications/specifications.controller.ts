import { Request, Response, NextFunction } from "express";
import {
    findSpecificationList,
    findOneSpecification,
    createSpecification,
    updateSpecification,
    removeSpecification
} from "./specification.service";
import { ErrorHendler } from "../../classes/ErrorHandler";


export const getSpecificationList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = Number(req.query.categoryId);

        if (!categoryId || isNaN(categoryId)) {
            res.status(400).json({ message: "Invalid or missing categoryId" });
        }

        const specification = await findSpecificationList(categoryId);
        res.status(200).json(specification);
    } catch (error) {
        next(error);
    }
};


export const getOneSpecification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("req.params.idOrName", req.params.idOrName);
        const specification = await findOneSpecification(req.params.idOrName);
        res.status(200).json(specification);
    }
    catch (error) {
        next(error);
    }
}


export const addNewSpecification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newSpecification = await createSpecification(req.body);
        res.status(201).json(newSpecification);

    } catch (error) {
        next(error);
    }
}


export const modifySpecification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const specification = await findOneSpecification(req.params.id);
        if (!specification) {
            throw new ErrorHendler(404, "Specification not found");
        }
        const modifyedSpecification = await updateSpecification(Number(req.params.id), { ...specification, ...req.body });
        res.status(200).json(modifyedSpecification);

    } catch (error) {
        next(error);
    }
}


export const deleteSpecification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removeSpecification(Number(req.params.id));
        res.status(204).send();

    } catch (error) {
        next(error);
    }
}
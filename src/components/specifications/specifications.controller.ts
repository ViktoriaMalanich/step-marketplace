import { Request, Response, NextFunction } from "express";
import {
    findSpecificationList,
    findOneSpecification,
    createSpecification,
    updateSpecification,
    removeSpecification
} from "./specifications.service";
import { ErrorHendler } from "../../classes/ErrorHandler";


export const getSpecificationList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.query;

        if (categoryId !== undefined) {

            const parsed = Number(categoryId);

            if (isNaN(parsed)) {
                res.status(400).json({ message: "Invalid or missing categoryId" });
                return;
            }
            const specification = await findSpecificationList(parsed);
            res.status(200).json(specification);
            return;
        }

        const specification = await findSpecificationList();
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
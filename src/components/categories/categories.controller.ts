import { Request, Response, NextFunction } from "express";
import {
    findCategoryList,
    findOneCategory,
    createCategory,
    updateCategory,
    removeCategory
} from "./categories.service";

export const getCategoryList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await findCategoryList();
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
}


export const getOneCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await findOneCategory(req.params.idOrName);
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
}


export const addNewCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req.body);
        const newCategory = await createCategory(req.body);
        res.status(201).json(newCategory);

    } catch (error) {
        next(error);
    }
}

export const modifyCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const modifyedCategory = await updateCategory(Number(req.params.id), req.body );
        res.status(200).json(modifyedCategory);

    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
       await removeCategory(Number(req.params.id));
       res.status(204).send();

    } catch (error) {
        next(error);
    }
}

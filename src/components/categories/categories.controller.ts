import { Request, Response, NextFunction } from "express";
import {
    findCategoryList,
    findOneCategory,
    createCategory,
    updateCategory,
    removeCategory
} from "./categories.service";
import { ErrorHendler } from "../../classes/ErrorHandler";

export const getCategoryList = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
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
        console.log("req.params.idOrName", req.params.idOrName);
        const categories = await findOneCategory(req.params.idOrName);
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
}


export const addNewCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCategory = await createCategory(req.body);
        res.status(201).json(newCategory);

    } catch (error) {
        next(error);
    }
}

export const modifyCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await findOneCategory(req.params.id);
        if (!category) {
            throw new ErrorHendler(404, "Category not found");
        }        
        const modifyedCategory = await updateCategory(Number(req.params.id), { ...category, ...req.body });
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

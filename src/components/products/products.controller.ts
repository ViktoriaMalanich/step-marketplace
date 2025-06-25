import { Request, Response, NextFunction } from "express";
import {
    findProductList,
    findOneProduct,
    createProduct,
    updateProduct,
    removeProduct
} from "./products.service";
import { ErrorHendler } from "../../classes/ErrorHandler";

export const getProductList = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const product = await findProductList();
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
}

export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("req.params.idOrName", req.params.idOrName);
        const product = await findOneProduct(req.params.idOrName);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
}


export const addNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Body!!!!!!!!!!!!!!!!!!!!:', req.body);
    try {
        const newProduct = await createProduct(req.body);// req.body должен быть CreateProductDto
        console.log('New product created!!!!!!!!!!:', newProduct);
        res.status(201).json(newProduct);

    } catch (error) {
        console.error('Error creating product!!!!!!!!!!!:', error);
        next(error);
    }
}


export const modifyProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await findOneProduct(req.params.id);
        if (!product) {
            throw new ErrorHendler(404, "Product not found");
        }
        const modifyedProduct = await updateProduct(Number(req.params.id), { ...product, ...req.body });
        res.status(200).json(modifyedProduct);

    } catch (error) {
        next(error);
    }
}


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removeProduct(Number(req.params.id));
        res.status(204).send();

    } catch (error) {
        next(error);
    }
}
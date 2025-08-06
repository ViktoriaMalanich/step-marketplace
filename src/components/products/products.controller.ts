import { Request, Response, NextFunction } from "express";
import {
    findProductList,
    findOneProduct,
    createProduct,
    updateProduct,
    removeProduct,
    updateProductPhotoes,
    deleteProductPhoto
} from "./products.service";
import { ErrorHendler } from "../../classes/ErrorHandler";
import { uploadImage } from "../../services/cloudinary.service";
import { deleteTempFiles } from "../../services/file.service";
import {
    imagesValidator,
    productListQueryValidation
} from "./product.validator";
import { ProductListDto } from "./product.dto";


export const getProductList = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const validatedQueryParams = productListQueryValidation.parse(req.query);
        console.log("validatedQueryParams", validatedQueryParams);
        const product = await findProductList(validatedQueryParams);
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
    try {
        const newProduct = await createProduct(req.body);       
        res.status(201).json(newProduct);

    } catch (error) {
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


export const uploadPhotos = async (req: Request, res: Response, next: NextFunction
): Promise<void> => {
    try {        
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({ message: 'Files not transferred in the request' });
            return;
        }

        const uploadResults = [];

        for (const file of files) {
            const result = await uploadImage(file.path);
            uploadResults.push(result);
        }
 
        const imageObjects = uploadResults.map(result => ({
            public_id: result.public_id,
            secure_url: result.secure_url
        }));

        const productId = Number(req.params.id);

        const newProduct = await updateProductPhotoes(productId, imageObjects);

        await deleteTempFiles(files);
        res.status(200).json(newProduct);
    }
    catch (error) {
        next(error);
    }
};

export const deletePhotos = async (req: Request, res: Response, next: NextFunction
): Promise<void> => {
    try {
        const productId = Number(req.params.productId);

        console.log("productId", productId);
        const { images } = req.query;
        const validatedImages = imagesValidator.parse(images);
        console.log(validatedImages);

        const imagesArray = validatedImages.split(",");

        const updatedProduct = await deleteProductPhoto(productId, imagesArray);

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log("error", error)
        next(error);
    }
}





import { Request, Response, NextFunction } from "express";
import { Product } from "../../entities/Product";
import { ErrorHendler } from "../../classes/ErrorHandler";
import { addProductToWishlist, findWishlist, findWishlistIds, removeProductFromWishlist } from "./wishlist.services";

export const getUsersWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        if (!userId) {
            throw new ErrorHendler(404, "Wrong userId");
        }
        const wishlist = await findWishlist(userId);
        res.status(200).json(wishlist);

    } catch (error) {
        next(error);
    }
}

export const getUsersWishlistIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        if (!userId) {
            throw new ErrorHendler(404, "Wrong userId");
        }

        const ids = await findWishlistIds(userId);
        res.status(200).json(ids);

    } catch (error) {
        next(error);
    }
}

export const addProductToMyWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const productId = Number(req.params.productId);

        if (!userId && !productId) {
            throw new ErrorHendler(404, "Wrong userId or productId");
        }
        const wishlist = await addProductToWishlist(userId, productId);
        res.status(200).json(wishlist);

    } catch (error) {
        next(error);
    }
}

export const deleteProductFromWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const productId = Number(req.params.productId);

        if (!userId && !productId) {
            throw new ErrorHendler(404, "Wrong userId or productId");
        }
        const wishlist = await removeProductFromWishlist(userId, productId);
        res.status(204).send();

    } catch (error) {
        next(error);
    }
}



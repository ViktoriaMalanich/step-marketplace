
import { Request, Response, NextFunction } from 'express';
import { DBconnection } from '../dbconnection';
import { Wishlist } from '../entities/Wishlist';
import { findWishlist, findWishlistIds } from '../components/wishlists/wishlist.services';
import { ErrorHendler } from '../classes/ErrorHandler';

export const checkWishlistDuplicate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = Number(req.params.userId);
    const productId = Number(req.params.productId);

    const productIds = await findWishlistIds(userId);

    if (productIds.includes(productId)) {

        next(new ErrorHendler(400, "Product is already in the wishlist."))
    }

    next();
};


import { Request, Response, NextFunction } from 'express';
import { DBconnection } from '../dbconnection';
import { Wishlist } from '../entities/Wishlist';

export const checkWishlistDuplicate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId, productId } = req.params;
    // const userId = Number(req.params.userId);
    // const productId = Number(req.params.productId);

    console.log("userId, productId", userId, " - !!!!!!!!!!!!!", productId)
    const wishlistRepo = DBconnection.getRepository(Wishlist);

    const exists = await wishlistRepo
        .createQueryBuilder("wishlist")
        .where("wishlist.userId = :userId", { userId })
        .andWhere("wishlist.productId = :productId", { productId })
        .getOne();


    if (exists) {
        res.status(409).json({ message: 'Product is already in the wishlist.' });
        return;
    }

    return next();
};

import { json, Router } from "express";
import { addProductToMyWishlist, deleteProductFromWishlist, getUsersWishlist, getUsersWishlistIds } from "./wishlist.controller";
import { newToken } from "../../middlewares/refreshToken.middleware";
import { checkWishlistDuplicate } from "../../middlewares/wishlist.middleware";


const router: Router = Router();

router.get("/:userId", getUsersWishlist);

router.get("/:userId/ids", getUsersWishlistIds);

router.post('/:userId/:productId',
    checkWishlistDuplicate,
    json(),
    addProductToMyWishlist);

router.delete('/:userId/:productId', deleteProductFromWishlist);

export const WishlistRouter = router;
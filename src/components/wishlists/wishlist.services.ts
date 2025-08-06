import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Product } from "../../entities/Product";
import { Wishlist } from "../../entities/Wishlist";


export const findWishlist = async (userId: number): Promise<Product[]> => {

    const wishlistRepo = DBconnection.getRepository(Wishlist);

    const wishlist = await wishlistRepo
        .createQueryBuilder("wishlist")
        .leftJoinAndSelect("wishlist.product", "product")
        .where("wishlist.userId = :userId", { userId })
        .orderBy("wishlist.createdAt", "DESC")
        .getMany();

    const products: Product[] = [];

    for (const item of wishlist) {
        products.push(item.product);
    }

    return products;
};


export const findWishlistIds = async (userId: number): Promise<number[]> => {

    const wishlistRepo = DBconnection.getRepository(Wishlist);

    const wishlist = await wishlistRepo
        .createQueryBuilder("wishlist")
        .where("wishlist.userId = :userId", { userId: userId })
        .select(["wishlist.productId AS productId"])
        .getRawMany();

    return wishlist.map(item => item.productId);
}


export const addProductToWishlist = async (userId: number, productId: number): Promise<Product[]> => {

    const wishlistRepo = DBconnection.getRepository(Wishlist);

    await wishlistRepo
        .createQueryBuilder("wishlist")
        .insert()
        .values({
            user: { id: userId },
            product: { id: productId }
        })
        .execute();

    const usersWislist = await findWishlist(userId);

    return usersWislist;
}


export const removeProductFromWishlist = async (userId: number, productId: number): Promise<void> => {
    const wishlistRepo = DBconnection.getRepository(Wishlist);
    const wishlist = await wishlistRepo
        .createQueryBuilder()
        .delete()
        .from(Wishlist)
        .where("userId = :userId AND productId = :productId ", { userId, productId })
        .execute();
}

import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Product } from "../../entities/Product";

export const findProductList = async () => {
    const productRepo = DBconnection.getRepository(Product);
    const productList = await productRepo
        .find();
    // .createQueryBuilder("Product")
    // .getMany();

    return productList;
}

export const findOneProduct = async (productIdOrName: number | string): Promise<Product> => {

    console.log("ProductIdOrName", productIdOrName);
    const productRepo = DBconnection.getRepository(Product);
    const product: Product | null = await productRepo
        .createQueryBuilder("product")
        .where("product.id = :productIdOrName OR product.name = :productIdOrName", { productIdOrName })
        .getOne();

    if (!product) {
        throw new ErrorHendler(404, 'Product not found');
    }

    return product;
}


export const createProduct = async (product: Product): Promise<Product> => {

    const productRepo = DBconnection.getRepository(Product);
    const newProduct = await productRepo.save(product);
    return newProduct;
}

export const updateProduct = async (productId: number, data: Partial<Product>): Promise<Product> => {
    const productRepo = DBconnection.getRepository(Product);
    const product = await productRepo
        .save({
            id: productId,
            ...data
        });
    return product;
}

export const removeProduct = async (productId: number) => {
    const productRepo = DBconnection.getRepository(Product);
    // await productRepo
    //     .createQueryBuilder()
    //     .delete()
    //     .from(Product)
    //     .where("id = :id", { id: productId })
    //     .execute();

    const product = await productRepo.findOneBy({ id: productId });

    if (!product) {
        throw new ErrorHendler(404, "Product not found");
    }

    await productRepo.delete(productId);
}
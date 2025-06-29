import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
// import { CategorySpecificationUniqValue } from "../../entities/CategorySpecificationUniqValue";
import { Product } from "../../entities/Product";
import { ProductSpecificationValue } from "../../entities/ProductSpecificationValue";
// import { Specification } from "../../entities/Specification";
// import { updateCategorySpecValues } from "../categories/categories.service";
// import { getCategorySpecIds } from "../specifications/specification.service";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { createProductSpecValues, updateProductSpecValues } from "./product-spec-values.service";

// const PRODUCT_RELATIONS = [
//   "category",
//   "market",
//   "specificationValues",
//   "specificationValues.specification"
// ];


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


// export const createProduct = async (product: Product): Promise<Product> => {

//     const productRepo = DBconnection.getRepository(Product);
//     const newProduct = await productRepo.save(product);
//     return newProduct;
// }


export const createProduct = async (productData: CreateProductDto): Promise<Product> => {
    const {
        name, description, img, price, status,
        marketId, categoryId, specValues
    } = productData;

    return await DBconnection.transaction(async manager => {
        const product = await manager.save(Product, {
            name, description, img, price, status, marketId, categoryId
        });

        const specValueEntities = await createProductSpecValues(
            manager,
            specValues,
            categoryId,
            product.id
        );

        if (specValueEntities.length > 0) {
            await manager.save(ProductSpecificationValue, specValueEntities);
        }

        const productWithSpecs = await manager.findOne(Product, {
            where: { id: product.id },
            relations: [
                "category",
                "market",
                "specificationValues",
                "specificationValues.specification"
            ]
        });

        return productWithSpecs!;
    });
};


export const updateProductBasic = async (productId: number, data: Partial<Product>): Promise<Product> => {
    const productRepo = DBconnection.getRepository(Product);

    //Спросить!!!  проверка, что продукт с таким id существует:
    const existingProduct = await productRepo.findOneBy({ id: productId });
    if (!existingProduct) {
        throw new Error('Product not found');
    }

    const product = await productRepo
        .save({
            id: productId,
            ...data
        });
    return product;
}

export const updateProduct = async (
    productId: number,
    data: UpdateProductDto
): Promise<Product> => {
    return await DBconnection.transaction(async manager => {
        const productRepo = manager.getRepository(Product);

        const existingProduct = await productRepo.findOneByOrFail({ id: productId });

        console.log("existingProduct!!!", existingProduct);
        console.log("data!!!", data);

        // Обновляем сам продукт
        // await productRepo.save({
        //   ...existingProduct,
        //   ...data
        // });

        // Обновляем сам продукт
        await productRepo.save({
            id: productId,
            ...{ price: data.price }
        });


        // Спецификации
        if (data.specValues || data.specIdsToDelete) {
            const finalCategoryId =
                data.categoryId ?? existingProduct.categoryId;

            await updateProductSpecValues(
                manager,
                productId,
                finalCategoryId,
                data.specValues ?? [],
                data.specIdsToDelete ?? []
            );
        }

        // Возвращаем с подгруженными связями
        return await manager.findOneOrFail(Product, {
            where: { id: productId },
            relations: [
                "category",
                "market",
                "specificationValues",
                "specificationValues.specification"
            ]
        });
    });
};


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

export const updateProductImages = async (
    productId: number, 
    imageObjects: { public_id: string; secure_url: string }[]) => {
    const productRepo = DBconnection.getRepository(Product);
    const updateResult = await productRepo.update(productId, { img: imageObjects });

    if (updateResult.affected === 0) {
        throw new Error('Product not found');
    }
};



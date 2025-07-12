import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
// import { CategorySpecificationUniqValue } from "../../entities/CategorySpecificationUniqValue";
import { Product } from "../../entities/Product";
import { ProductSpecificationValue } from "../../entities/ProductSpecificationValue";
// import { Specification } from "../../entities/Specification";
// import { updateCategorySpecValues } from "../categories/categories.service";
// import { getCategorySpecIds } from "../specifications/specification.service";
import { CreateProductDto, ProductListDto, UpdateProductDto } from "./product.dto";
import { createProductSpecValues, updateProductSpecValues } from "./product-spec-values.service";
import { deletePhotoes } from "../../services/cloudinary.service";
import { Brackets } from "typeorm/query-builder/Brackets";


//параметры приходятв ф-цию, обязат. или нет
//валидация в контроллере
export const findProductList = async (params: any) => {
    const {
        page = 1,
        limit = 10,
        orderBy = "id",
        order = "ASC",
        categoryId,
        marketId,
        specifications = [],
        specValues = [],
    } = params;

    const criterias: any[] = [];

    specifications.forEach((item: any, index: number) => {
        criterias.push([item, specValues[index]]);
    });

    console.log("criterias!!!", criterias);

    const subQuery = DBconnection
        .createQueryBuilder()
        .select('sv.productId')
        .from('product_specifications_values', 'sv')
        .innerJoin('specification', 's', 'sv.specId = s.id');

    if (criterias.length > 0) {

        const conditions = criterias.map(
            (item, index) => `(s.id = :spec${index} AND sv.value = :val${index})`
        ).join(" OR ");

        const params = criterias.reduce((acc, [specId, value], index) => {
            acc[`spec${index}`] = specId;
            acc[`val${index}`] = value;
            return acc;
        }, {} as Record<string, any>);

        console.log("params", params);

        subQuery.andWhere(`(${conditions})`, params);
    }

    subQuery
        .groupBy('sv.productId')
        .having('COUNT(DISTINCT s.id) = :count', { count: criterias.length });



    const productRepo = DBconnection.getRepository(Product);

    const query = productRepo
        .createQueryBuilder('p');

    if (categoryId) {
        query.where('p.categoryId = :categoryId', { categoryId })
    }

    query
        .andWhere(new Brackets(qb => {
            qb.where(':criteriasLength = 0', { criteriasLength: criterias.length })
                .orWhere(`p.id IN (${subQuery.getQuery()})`);
        }))
        .setParameters(subQuery.getParameters());


    if (marketId) {
        query.andWhere("p.marketId = :marketId", { marketId });
    }

    query
        .limit(limit)
        .offset(limit * (page - 1));

    if (orderBy && order) {

        query.orderBy(orderBy, order);
    }


    console.log(query.getQuery());

    const [productList, rowNumber] = await query.getManyAndCount();
    return { productList, rowNumber };
}

export const findOneProduct = async (productIdOrName: number | string): Promise<Product> => {

    console.log("ProductIdOrName", productIdOrName);
    const productRepo = DBconnection.getRepository(Product);
    const product: Product | null = await productRepo
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.specificationValues", "specificationValues")
        .leftJoinAndSelect("specificationValues.specification", "specification")
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
            name,
            description,
            img: [],
            price,
            status,
            marketId,
            categoryId
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


export const updateProductPhotoes = async (productId: number, images: any[]): Promise<Product> => {
    const productRepo = DBconnection.getRepository(Product);

    //Спросить!!!  проверка, что продукт с таким id существует:
    const existingProduct = await productRepo.findOneBy({ id: productId });
    if (!existingProduct) {
        throw new ErrorHendler(404, 'Product not found');
    }

    const imgArray = [
        ...existingProduct.img, ...images
    ];

    const product = await productRepo
        .save({
            ...existingProduct,
            img: imgArray
        });
    return product;
}

export const deleteProductPhoto = async (productId: number, photoesIds: string[]) => {
    /**
     * Принимает айди продукта из урла
     * Принимаем массив айди фотографий, которіе надо удалить ?из квери параметров(обязательній параметр)
     * По айди продукта достаем продукт (если существует)
     * Тянемся к полю фотографий
     * По айди фотографий находим те, которые надо удалить из бд
     * По ним же удаляем фото из облака
     * сохраняем обновленный продукт
     * возвращаем модифицированный продукт//делит вернет - редкий случай
     */

    const productRepo = DBconnection.getRepository(Product);
    const existingProduct = await productRepo.findOneBy({ id: productId });
    if (!existingProduct) {
        throw new ErrorHendler(404, 'Product not found');
    }

    const productImg = [...existingProduct.img];

    const imagesToDelete = productImg.filter(item => photoesIds.includes(item.public_id));

    await deletePhotoes(imagesToDelete.map(item => item.public_id));

    const newArrayImages = productImg.filter(item => !photoesIds.includes(item.public_id));

    const product = await productRepo
        .save({
            ...existingProduct,
            img: newArrayImages
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



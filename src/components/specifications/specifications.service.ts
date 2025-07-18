import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { CategorySpecificationUniqValue } from "../../entities/CategorySpecificationUniqValue";
import { Specification } from "../../entities/Specification";
import { In, EntityManager } from "typeorm";
import { CreateProductDto } from "../products/product.dto";
import { ProductSpecificationValue } from "../../entities/ProductSpecificationValue";
import { updateCategorySpecValues } from "../categories/categories.service";

//export const findSpecificationList = async () => {
// const specificationRepo = DBconnection.getRepository(Specification);
// const specificationList = await specificationRepo
//     //.find();
//     .createQueryBuilder("specification")
//     .getMany();

// return specificationList;}

export const findSpecificationList = async (categoryId?: number) => {
    const specs = await DBconnection
        .getRepository(Specification)
        .createQueryBuilder("spec")
        .select([
            "spec.id AS id",
            "spec.name AS name",
            "spec.measurement AS measurement"
        ]);

    if (categoryId) {
        specs
            .innerJoin(CategorySpecificationUniqValue, "csuv", "csuv.specId = spec.id")
            .where("csuv.categoryId = :categoryId", { categoryId })
    }

    const result = await specs.getRawMany();

    return result;
};



export const findOneSpecification = async (specificationIdOrName: number | string): Promise<Specification> => {

    console.log("specificationIdOrName", specificationIdOrName);
    const specificationRepo = DBconnection.getRepository(Specification);
    const specification: Specification | null = await specificationRepo
        .createQueryBuilder("specification")
        .where("specification.id = :specificationIdOrName OR specification.name = :specificationIdOrName", { specificationIdOrName })
        .getOne();

    if (!specification) {
        throw new ErrorHendler(404, 'Specification not found');
    }

    return specification;
}


export const createSpecification = async (specification: Specification): Promise<Specification> => {

    const specificationRepo = DBconnection.getRepository(Specification);
    const newSpecification = await specificationRepo.save(specification);
    return newSpecification;
}

export const updateSpecification = async (specificationId: number, data: Partial<Specification>): Promise<Specification> => {
    const specificationRepo = DBconnection.getRepository(Specification);
    const specification = await specificationRepo
        .save({
            id: specificationId,
            ...data
        });
    return specification;
}

// export const updateCategorySpecifications = async (categoryId: number, newSpecIds: number[]) => {

//   const specLinkRepo = DBconnection.getRepository(CategorySpecificationUniqValue);

//   const existingLinks = await specLinkRepo.find({
//     where: { category: { id: categoryId } },
//     relations: ['specification'],
//   });

//   const existingSpecIds = existingLinks.map(link => link.specification.id);

//   const toAdd = newSpecIds.filter(id => !existingSpecIds.includes(id));
//   const toRemove = existingSpecIds.filter(id => !newSpecIds.includes(id));

//   for (const id of toRemove) {
//     await specLinkRepo.delete({
//       category: { id: categoryId },
//       specification: { id },
//     });
//   }

//   for (const id of toAdd) {
//     await specLinkRepo.save({
//       category: { id: categoryId },
//       specification: { id },
//       uniqValues: [],
//     });
//   }
// };


export const removeSpecification = async (specificationId: number) => {
    const specificationRepo = DBconnection.getRepository(Specification);
    await specificationRepo
        .createQueryBuilder()
        .delete()
        .from(Specification)
        .where("id = :id", { id: specificationId })
        .execute();
}

/////////////////////////////////////////////////////////////////////////////////////////



export const getCategorySpecIds = async (categoryId: number): Promise<number[]> => {

    const specLinkRepo = DBconnection.getRepository(CategorySpecificationUniqValue);

    const existingLinks = await specLinkRepo.find({
        where: { category: { id: categoryId } },
        relations: ['specification'],
    });
    return existingLinks.map(link => link.specification.id);
};

export const addCategorySpecifications = async (categoryId: number, specIds: number[]) => {

    const specLinkRepo = DBconnection.getRepository(CategorySpecificationUniqValue);
    if (specIds.length === 0) return;
    const newLinks = specIds.map(id => ({
        category: { id: categoryId },
        specification: { id },
    }));
    await specLinkRepo.save(newLinks);
};

export const removeCategorySpecifications = async (categoryId: number, specIds: number[]) => {

    const specLinkRepo = DBconnection.getRepository(CategorySpecificationUniqValue);

    if (specIds.length === 0) return;
    await specLinkRepo.delete({
        category: { id: categoryId },
        specification: In(specIds),
    });
};

export const updateCategorySpecifications = async (categoryId: number, newSpecIds: number[]) => {
    const existingSpecIds = await getCategorySpecIds(categoryId);

    const toAdd = newSpecIds.filter(id => !existingSpecIds.includes(id));
    const toRemove = existingSpecIds.filter(id => !newSpecIds.includes(id));

    try {
        // await removeCategorySpecifications(categoryId, toRemove);
        // await addCategorySpecifications(categoryId, toAdd);

        await DBconnection.transaction(async (manager) => {
            if (toRemove.length > 0) {
                await manager.delete(CategorySpecificationUniqValue, {
                    category: { id: categoryId },
                    specification: In(toRemove),
                });
            }
            if (toAdd.length > 0) {
                const newLinks = toAdd.map(id => manager.create(CategorySpecificationUniqValue, ({
                    category: { id: categoryId },
                    specification: { id }
                    // uniqValues: [],
                })));
                await manager.save(CategorySpecificationUniqValue, newLinks);
            }
        });


    } catch (error) {
        throw new ErrorHendler(500, 'Error updating category specifications');
    }
};

//дописать контроллер
export const findSpecUniqValueByCategory = async (categoryId: number) => {
    const specs = await DBconnection
        .getRepository(Specification)
        .createQueryBuilder("spec")
        .innerJoin(CategorySpecificationUniqValue, "csuv", "csuv.specId = spec.id")
        .where("csuv.categoryId = :categoryId", { categoryId })
        .select([
            "spec.title AS name",
            "csuv.uniqueValues AS uniqueValues"
        ])
        .getRawMany();

    return specs.map(spec => ({
        name: spec.name,
        uniqueValues: JSON.parse(spec.uniqueValues) // если строка
    }));
};






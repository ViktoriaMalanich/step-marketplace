import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Category } from "../../entities/Category";
import { CategorySpecificationUniqValue } from "../../entities/CategorySpecificationUniqValue";
import { updateCategorySpecifications } from "../specifications/specification.service";
import { UpdateCategoryDto } from "./update-category.dto";

export const findCategoryList = async () => {
    const categoryRepo = DBconnection.getRepository(Category);
    const categorylist = await categoryRepo
        .createQueryBuilder("category")
        .getMany();

    const categoryMap = new Map<number, any>();
    const result: any[] = [];

    categorylist.forEach((category) => {
        category.subcategories = [];
        categoryMap.set(category.id, category);
    });

    categorylist.forEach((category) => {
        if (category.parentId) {
            const parent = categoryMap.get(category.parentId);
            if (parent) {
                parent.subcategories.push(category);
            }
        } else {
            result.push(category);
        }
    });

    return result;
}

export const findOneCategory = async (categoryIdOrName: number | string): Promise<Category> => {

    console.log("categoryIdOrName", categoryIdOrName);
    const categoryRepo = DBconnection.getRepository(Category);
    const category: Category | null = await categoryRepo
        .createQueryBuilder("category")
        .where("category.id = :categoryIdOrName OR category.name = :categoryIdOrName", { categoryIdOrName })
        .getOne();

    if (!category) {
        console.log("!categry");
        throw new ErrorHendler(404, 'Category not found');
    }

    return category;
}

export const createCategory = async (category: Category): Promise<Category> => {

    const categoryRepo = DBconnection.getRepository(Category);
    const newCategory = await categoryRepo.save(category);
    return newCategory;
}


export const updateCategory = async (categoryId: number, data: Partial<Category>): Promise<Category> => {
    const categoryRepo = DBconnection.getRepository(Category);
    const category = await categoryRepo
        .save({
            id: categoryId,
            ...data
        });
    return category;
}


export const updateCategorySpecsList = async (
    categoryId: number,
    data: UpdateCategoryDto & { categorySpecifications?: number[] }
): Promise<Category> => {
   // console.log('Входные данные для обновления:', data);

    const categoryRepo = DBconnection.getRepository(Category);

    const existingCategory = await categoryRepo.findOne({
        where: { id: categoryId },
        relations: ['parent'],
    });

    if (!existingCategory) {
        throw new ErrorHendler(404, 'Category not found');
    }

    if (data.categorySpecifications && !existingCategory.parent) {
        throw new ErrorHendler(400, 'Specifications can only be assigned to subcategories (categories that have a parent).');
    }

    // Удаляем поля, не относящиеся к сущности Category напрямую
    const {
        categorySpecifications,
        addSpecifications,
        removeSpecifications,
        ...updateData
    } = data;

   // console.log('до обновления updateData:', updateData);

    // Обновляем поля категории
    //await categoryRepo.update(categoryId, data);

    if (Object.keys(updateData).length > 0) {
        await categoryRepo.save({ id: categoryId, ...updateData });
    }

    //console.log('после обновления updateData:', updateData);

    // Обновляем привязку спецификаций, если переданы
    if (categorySpecifications) {
        await updateCategorySpecifications(categoryId, categorySpecifications);
    }

    const updatedCategory = await categoryRepo.findOne({
        where: { id: categoryId },
        relations: ['categorySpecifications', 'categorySpecifications.specification']
    });

    if (!updatedCategory) {
        throw new ErrorHendler(404, 'Category not found after update');
    }

    return updatedCategory;
};

export const removeCategory = async (categoryId: number) => {
    const categoryRepo = DBconnection.getRepository(Category);
    await categoryRepo
        .createQueryBuilder()
        .delete()
        .from(Category)
        .where("id = :id", { id: categoryId })
        .execute();
}


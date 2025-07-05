import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Category } from "../../entities/Category";
import { CategorySpecificationUniqValue } from "../../entities/CategorySpecificationUniqValue";
import { updateCategorySpecifications } from "../specifications/specification.service";
import { CategorySpecificationDto, SpecificationDto, UpdateCategoryDto } from "./category.dto";
import { Specification } from "../../entities/Specification";
import { EntityManager } from "typeorm";



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

export const findOneCategory = async (categoryIdOrName: number | string): Promise<CategorySpecificationDto> => {
    const categoryRepo = DBconnection.getRepository(Category);

    const category = await categoryRepo
        .createQueryBuilder("category")
        .leftJoinAndSelect("category.categorySpecifications", "csv")
        .leftJoinAndSelect("csv.specification", "spec")
        .where("category.id = :val OR category.name = :val", { val: categoryIdOrName })
        .getOne();

    if (!category) {
        throw new ErrorHendler(404, "Category not found");
    }

    console.log("category", category);
    const transformedSpecs: SpecificationDto[] = category.categorySpecifications.map(csv => ({
        id: csv.specification.id,
        name: csv.specification.name,
        measurement: csv.specification.measurement,
        uniqValue: csv.uniqValue
    }));

    const result = {
        id: category.id,
        name: category.name,
        description: category.description,
        img: category.img,
        parentId: category.parent?.id ?? null,
        categorySpecifications: transformedSpecs
    };

    console.log("result", result);

    return result;
};

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




/**
 * Обновляет массив уникальных значений для пары категория-спецификация.
 * Если пары не существует — создаёт новую запись.
 */
export const updateCategorySpecValues = async (
    manager: EntityManager,
    categoryId: number,
    specId: number,
    value: string
): Promise<void> => {
    if (!value) return;

    let record = await manager.findOne(CategorySpecificationUniqValue, {
        where: {
            category: { id: categoryId },
            specification: { id: specId }
        }
    });

    if (!record) {
        // создаём новую пару, если не существует
        record = manager.create(CategorySpecificationUniqValue, {
            category: { id: categoryId } as Category,
            specification: { id: specId } as Specification,
            uniqValue: [value]
        });
        await manager.save(record);
        return;
    }

    // если значение уже есть — ничего не делаем
    if (record.uniqValue?.includes(value)) return;

    // добавляем новое значение
    record.uniqValue = [...(record.uniqValue || []), value];
    await manager.save(record);
};

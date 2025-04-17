import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Category } from "../../entities/Category";

export const findCategoryList = async () => {
    const categoryRepo = DBconnection.getRepository(Category);
    const categorylist = await categoryRepo.find();
    return categorylist;
}

export const findOneCategory = async (categoryIdOrName: number | string): Promise<Category> => {

    const categoryRepo = DBconnection.getRepository(Category);
    const category: Category | null = await categoryRepo
        .createQueryBuilder()
        .where("category.id = :categoryIdOrName OR category.name = :categoryIdOrName", { categoryIdOrName })
        .getOne();
    if (!category) {
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
    await categoryRepo
        .createQueryBuilder()
        .update(Category)
        .set(data)
        .where("id = :id", { id: categoryId })
        .execute();
       
    const category = await categoryRepo.findOne({ where: { id: categoryId } });
    if (!category) {
        throw new ErrorHendler(500, 'Cann\'t return modified category');
    }

    return category;

}

export const removeCategory = async (categoryId: number) => {
    const categoryRepo = DBconnection.getRepository(Category);
    await categoryRepo
        .createQueryBuilder()
        .delete()
        .from(Category)
        .where("id = :id", { id: categoryId })
        .execute();
}


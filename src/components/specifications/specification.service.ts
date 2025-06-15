import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { Specification } from "../../entities/Specification";

export const findSpecificationList = async () => {
    const specificationRepo = DBconnection.getRepository(Specification);
    const specificationList = await specificationRepo
    //.find();
        .createQueryBuilder("specification")
        .getMany();

    return specificationList;
}

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

export const removeSpecification = async (specificationId: number) => {
    const specificationRepo = DBconnection.getRepository(Specification);
    await specificationRepo
        .createQueryBuilder()
        .delete()
        .from(Specification)
        .where("id = :id", { id: specificationId })
        .execute();
}
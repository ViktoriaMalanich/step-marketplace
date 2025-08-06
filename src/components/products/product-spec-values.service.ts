import { EntityManager, In } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { ProductSpecificationValue } from "../../entities/ProductSpecificationValue";
import { getCategorySpecIds } from "../specifications/specifications.service";
import { Specification } from "../../entities/Specification";
import { CategorySpecificationUniqValue } from "../../entities/CategorySpecificationUniqValue";
import { updateCategorySpecValues } from "../categories/categories.service";

//TODO has to be changed
export const createProductSpecValues = async (
    manager: EntityManager,
    specValues: CreateProductDto["specValues"],
    categoryId: number,
    productId: number
): Promise<ProductSpecificationValue[]> => {
    
    const categorySpecIds = await getCategorySpecIds(categoryId);
    const result: ProductSpecificationValue[] = [];

    for (const sv of specValues || []) {
        let specId = sv.specId;

        if (!specId && sv.title && sv.measurement) {
            let existingSpec = await manager.findOne(Specification, { where: { name: sv.title } });

            if (existingSpec) {
                specId = existingSpec.id;
            } else {
                const newSpec = await manager.save(Specification, {
                    name: sv.title,
                    measurement: sv.measurement
                });

                await manager.save(CategorySpecificationUniqValue, {
                    category: { id: categoryId },
                    specification: { id: newSpec.id }
                });

                specId = newSpec.id;
            }
        }

        if (specId && (categorySpecIds.includes(specId) || sv.title)) {
            result.push(manager.create(ProductSpecificationValue, {
                product: { id: productId },
                specification: { id: specId },
                value: sv.value
            }));
            await updateCategorySpecValues(manager, categoryId, specId, sv.value);
        }
    }
    return result;
};

export const updateProductSpecValues = async (
  manager: EntityManager,
  productId: number,
  categoryId: number,
  specValues: UpdateProductDto["specValues"] = [],
  specIdsToDelete: number[] = []
): Promise<void> => {
  if (specIdsToDelete.length > 0) {
    await manager.delete(ProductSpecificationValue, {
      product: { id: productId },
      specification: In(specIdsToDelete)
    });
  }

  const existing = specValues.filter(sv => sv.specId);
  const newOnes = specValues.filter(sv => !sv.specId && sv.title && sv.measurement);

  for (const sv of existing) {
    const current = await manager.findOne(ProductSpecificationValue, {
      where: {
        product: { id: productId },
        specification: { id: sv.specId }
      }
    });

    if (current && current.value !== sv.value) {
      await manager.update(
        ProductSpecificationValue,
        { id: current.id },
        { value: sv.value }
      );
    }

    if (sv.specId && sv.value) {
      await updateCategorySpecValues(manager, categoryId, sv.specId, sv.value);
    }
  }

  if (newOnes.length > 0) {
    const created = await createProductSpecValues(
      manager,
      newOnes,
      categoryId,
      productId
    );
    if (created.length > 0) {
      await manager.save(ProductSpecificationValue, created);
    }
  }
};

export const updateProductSpecifications = async (
  manager: EntityManager,
  productId: number,
  categoryId: number,
  dto: UpdateProductDto
) => {
  await updateProductSpecValues(
    manager,
    productId,
    categoryId,
    dto.specValues ?? [],
    dto.specIdsToDelete ?? []
  );
};
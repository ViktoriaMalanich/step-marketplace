import { EntityManager, In } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { ProductSpecificationValue } from "../../entities/ProductSpecificationValue";
import { getCategorySpecIds } from "../specifications/specification.service";
import { Specification } from "../../entities/Specification";
import { CategorySpecificationUniqValue } from "../../entities/CategorySpecificationUniqValue";
import { updateCategorySpecValues } from "../categories/categories.service";

// НАЙТИ ВОЗМОЖНОСТЬ ПЕРЕПИСАТЬ ЭТУ ФИГНЮ, ЧТОБ СОКРАТИТЬ КОЛ-ВО ЗАПРОСОВ К БД
/**
 * Обрабатывает массив характеристик товара:
 * - Создаёт новую спецификацию, если она не найдена по названию
 * - Привязывает новую спецификацию к категории
 * - Создаёт значения характеристик товара
 * - Обновляет список уникальных значений для пары категория-спецификация
 */
export const createProductSpecValues = async (
    manager: EntityManager,
    specValues: CreateProductDto["specValues"],
    categoryId: number,
    productId: number
): Promise<ProductSpecificationValue[]> => {
    // Получаем все ID спецификаций, привязанных к данной категории
    const categorySpecIds = await getCategorySpecIds(categoryId);

    const result: ProductSpecificationValue[] = [];

    for (const sv of specValues || []) {
        let specId = sv.specId;

        // Если спецификация не передана по ID, но есть название и измерение —
        // пытаемся найти существующую спецификацию по названию
        if (!specId && sv.title && sv.measurement) {
            let existingSpec = await manager.findOne(Specification, { where: { name: sv.title } });

            if (existingSpec) {
                // Если нашли — используем её ID
                specId = existingSpec.id;
            } else {
                // Если не нашли — создаём новую спецификацию
                const newSpec = await manager.save(Specification, {
                    name: sv.title,
                    measurement: sv.measurement
                });

                // И сразу привязываем её к категории в таблице уникальных пар
                await manager.save(CategorySpecificationUniqValue, {
                    category: { id: categoryId },
                    specification: { id: newSpec.id }
                });

                specId = newSpec.id;
            }
        }

        // Если спецификация валидна (по ID) и принадлежит категории или только что создана
        if (specId && (categorySpecIds.includes(specId) || sv.title)) {
            // Создаём сущность значения характеристики
            result.push(manager.create(ProductSpecificationValue, {
                product: { id: productId },
                specification: { id: specId },
                value: sv.value
            }));

            // Обновляем список уникальных значений в таблице CategorySpecificationUniqValue
            await updateCategorySpecValues(manager, categoryId, specId, sv.value);
        }
    }

    // Возвращаем список сущностей характеристик для сохранения
    return result;
};


/**
 * Обновляет спецификации (характеристики) товара:
 * - Удаляет указанные значения
 * - Обновляет существующие
 * - Добавляет новые (если они не существуют)
 */
export const updateProductSpecValues = async (
  manager: EntityManager,
  productId: number,
  categoryId: number,
  specValues: UpdateProductDto["specValues"] = [],
  specIdsToDelete: number[] = []
): Promise<void> => {
  // 1. Удаляем значения, явно указанные для удаления
  if (specIdsToDelete.length > 0) {
    await manager.delete(ProductSpecificationValue, {
      product: { id: productId },
      specification: In(specIdsToDelete)
    });
  }

  // 2. Разделяем: какие спецификации нужно обновить, какие создать
  const existing = specValues.filter(sv => sv.specId);
  const newOnes = specValues.filter(sv => !sv.specId && sv.title && sv.measurement);

  // 2а. Обновляем существующие значения
  for (const sv of existing) {
    const current = await manager.findOne(ProductSpecificationValue, {
      where: {
        product: { id: productId },
        specification: { id: sv.specId }
      }
    });

    // Обновляем только если значение изменилось
    if (current && current.value !== sv.value) {
      await manager.update(
        ProductSpecificationValue,
        { id: current.id },
        { value: sv.value }
      );
    }

    // Обновляем список уникальных значений в CategorySpecificationUniqValue
    if (sv.specId && sv.value) {
      await updateCategorySpecValues(manager, categoryId, sv.specId, sv.value);
    }
  }

  // 2б. Добавляем новые спецификации и их значения
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
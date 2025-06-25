export class UpdateCategoryDto {
  name?: string;
  description?: string;
  img?: string;
  parentId?: number;
  categorySpecifications?: number[];
  addSpecifications?: string;
  removeSpecifications?: string;
}

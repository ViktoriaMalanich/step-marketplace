export class UpdateCategoryDto {
  name?: string;
  description?: string;
  img?: string;
  parentId?: number;
  categorySpecifications?: number[];
  addSpecifications?: string;
  removeSpecifications?: string;
}

export interface CategorySpecificationDto {
  id: number;
  name?: string;
  description?: string;
  img?: string;
  parentId?: number | null;
  categorySpecifications?: SpecificationDto[];
}

export interface SpecificationDto {
  id: number;
  name: string;                     
  measurement: string;              
  uniqValue: string[] | null;      
}
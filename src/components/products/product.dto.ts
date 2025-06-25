import { PRODUCT_STATUS } from "../../types";

export interface CreateProductDto {
  name: string;
  description?: string;
  img?: string[]; // изображения — массив строк (ссылок)
  price: number;
  status?: PRODUCT_STATUS;
  marketId: number;
  categoryId: number;
  specValues: {
    specId?: number;    // если спецификация уже существует
    title?: string;     // если нужно создать новую
    measurement?: string;
    value: string;      // значение для этой спецификации
  }[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  img?: string[];
  price?: number;
  status?: PRODUCT_STATUS;
  marketId?: number;
  categoryId?: number;
  specValues?: {
    specId?: number;      
    title?: string;       
    measurement?: string;
    value: string;        
  }[];
  specIdsToDelete?: number[]; //что явно удалить
}
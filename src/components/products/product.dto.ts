import { PRODUCT_STATUS } from "../../types";
import { z } from "zod";

export interface CreateProductDto {
  name: string;
  description?: string;
  img?: { public_id: string; secure_url: string }[];
  price: number;
  status?: PRODUCT_STATUS;
  marketId: number;
  categoryId: number;
  specValues: {
    specId?: number;    
    title?: string;     
    measurement?: string;
    value: string;  
  }[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  img?: { public_id: string; secure_url: string }[];
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
  specIdsToDelete?: number[]; 
}

 export interface ProductListDto{
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "ASC" | "DESC";
  categoryId?: number;
  marketId?: number;  
  specifications?: number[];
  specValues?: string[];
 }


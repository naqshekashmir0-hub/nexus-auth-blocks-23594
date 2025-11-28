import { apiClient } from '@/core/api/axios';
import { PRODUCT_ENDPOINTS } from '@/core/api/endpoints';

export interface CreateProductData {
  product_name: string;
  product_description: string;
  product_quantity: number;
  product_price: number;
  discount_percentage: number;
  avatar: File;
  cover_images: File[];
  dimensions: string;
  sales: boolean;
  featured: boolean;
  manufacturer: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  product: {
    _id: string;
    product_name: string;
    product_description: string;
    product_quantity: number;
    product_price: number;
    discount_precentage: number;
    final_price: number;
    product_brand: string;
    product_category: string;
    product_sub_category: string;
    avatar: string;
    cover_images: Array<{
      url: string;
      _id: string;
    }>;
    dimensions: string;
    manufacturer: string;
    sales: boolean;
    featured: boolean;
    created_by: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const productService = {
  createProduct: async (
    data: FormData,
    brandId: string,
    categoryId: string,
    subCategoryId: string
  ): Promise<ProductResponse> => {
    const response = await apiClient.post<ProductResponse>(
      `${PRODUCT_ENDPOINTS.CREATE}?brand_id=${brandId}&category_id=${categoryId}&sub_category_id=${subCategoryId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};

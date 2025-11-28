import { apiClient } from '@/core/api/axios';
import { SUBCATEGORY_ENDPOINTS } from '@/core/api/endpoints';

export interface CreateSubcategoryData {
  sub_category_name: string;
  sub_category_logo: string;
  parent_category: string;
}

export interface SubcategoryResponse {
  success: boolean;
  message: string;
  category: {
    _id: string;
    sub_category_name: string;
    sub_category_logo: string;
    parent_category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface SubcategoriesListResponse {
  success: boolean;
  message: string;
  Subcategories: Array<{
    _id: string;
    sub_category_name: string;
    sub_category_logo: string;
    parent_category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
}

export const subcategoryService = {
  createSubcategory: async (data: FormData, categoryId: string): Promise<SubcategoryResponse> => {
    const response = await apiClient.post<SubcategoryResponse>(
      `${SUBCATEGORY_ENDPOINTS.CREATE}?C_ID=${categoryId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  listSubcategories: async (): Promise<SubcategoriesListResponse> => {
    const response = await apiClient.get<SubcategoriesListResponse>(
      SUBCATEGORY_ENDPOINTS.LIST
    );
    return response.data;
  },
};

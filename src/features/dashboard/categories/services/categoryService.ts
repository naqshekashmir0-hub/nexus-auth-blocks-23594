import { apiClient } from '@/core/api/axios';
import { CATEGORY_ENDPOINTS } from '@/core/api/endpoints';

export interface CreateCategoryData {
  category_name: string;
  category_logo: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  category: {
    _id: string;
    category_name: string;
    category_logo: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const categoryService = {
  createCategory: async (data: CreateCategoryData | FormData): Promise<CategoryResponse> => {
    const response = await apiClient.post<CategoryResponse>(
      CATEGORY_ENDPOINTS.CREATE,
      data,
      data instanceof FormData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : undefined
    );
    return response.data;
  },
};

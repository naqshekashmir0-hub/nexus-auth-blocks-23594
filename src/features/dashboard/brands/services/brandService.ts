import { apiClient } from '@/core/api/axios';
import { BRAND_ENDPOINTS } from '@/core/api/endpoints';

export interface CreateBrandData {
  brand_name: string;
  brand_logo: string;
}

export interface BrandResponse {
  success: boolean;
  message: string;
  Brand: {
    _id: string;
    brand_name: string;
    brand_logo: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface BrandsListResponse {
  success: boolean;
  message: string;
  allBrands: Array<{
    _id: string;
    brand_name: string;
    brand_logo: string;
  }>;
}

export const brandService = {
  createBrand: async (data: CreateBrandData | FormData): Promise<BrandResponse> => {
    const response = await apiClient.post<BrandResponse>(
      BRAND_ENDPOINTS.CREATE,
      data,
      data instanceof FormData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : undefined
    );
    return response.data;
  },

  listBrands: async (): Promise<BrandsListResponse> => {
    const response = await apiClient.get<BrandsListResponse>(
      BRAND_ENDPOINTS.LIST
    );
    return response.data;
  },
};

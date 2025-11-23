// Product-specific TypeScript types and interfaces

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  subCategoryId?: string;
  brandId?: string;
  images: string[];
  tags: string[];
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  subCategoryId?: string;
  brandId?: string;
  images: File[];
  tags: string[];
  status: "active" | "inactive" | "draft";
}

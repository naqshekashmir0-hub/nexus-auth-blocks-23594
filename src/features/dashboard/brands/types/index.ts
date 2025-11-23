// Brand-specific TypeScript types and interfaces

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface BrandFormData {
  name: string;
  description: string;
  logo?: File;
  status: "active" | "inactive";
}

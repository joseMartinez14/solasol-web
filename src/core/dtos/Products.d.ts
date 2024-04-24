export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    discount: number;
    created_at?: Date;
    updated_at?: Date;
    stock: number;
    productImages?: ProductImages[];
    categories?: CompanyCategory[];
};

export type ProductImages = {
    id: number;
    url: string;
};

export type CompanyCategory = {
    id: number;
    name: string;
};

export interface MutationResponse {
  success: boolean;
  message: string;
  data?: UserData; // Optional in case mutation returns user data
}

export type createOrUpdateDto = {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    discount: number;
    created_at?: Date;
    updated_at?: Date;
    stock: number;
    productNewImages: File[];
    productImagesIDToDelete: number[];
    addCategories: CompanyCategory[];
    deleteCategories: CompanyCategory[];
}


export interface Product {
  id?: string;
  categories: string[];
  createdAt: number;
  description: string;
  images: string[];
  isActive: boolean;
  name: string;
  price: number;
}

export interface ProductDictionary {
  [key: string]: Omit<Product, 'id'>;
}
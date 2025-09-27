// backend/shared/types/products.ts

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  created_at: string; // stored as TIMESTAMP in D1
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  image_url?: string;
}
export interface Env {
  DB: D1Database;
}
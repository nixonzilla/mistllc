// backend/shared/types/db.ts

// --- Core DB interfaces (shared with Cloudflare D1) ---
export interface DB {
  prepare(query: string): {
    all<T = any>(...params: any[]): Promise<{ results: T[] }>;
    get<T = any>(...params: any[]): Promise<T | null>;
    run(...params: any[]): Promise<{ lastRowId: number; changes: number }>;
  };
}

export type D1Database = DB;
export type D1PreparedStatement = ReturnType<DB['prepare']>;
export type D1Result<T = any> = Promise<{ results: T[] }>;
export type D1RunResult = Promise<{ lastRowId: number; changes: number }>;

// --- Tables / Rows ---
export interface SongRow {
  id: number;
  title: string;
  artist: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  created_at: string; // ISO date string
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string; // ISO date string
}

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string; // ISO date string
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number; // e.g., 1 to 5
  comment: string | null;
  created_at: string; // ISO date string
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
}

export interface ProductCategory {
  product_id: number;
  category_id: number;
}

export interface Inventory {
  product_id: number;
  quantity: number;
  last_updated: string; // ISO date string
}

export interface Address {
  id: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  payment_method: string; // e.g., 'credit_card', 'paypal'
  status: 'pending' | 'completed' | 'failed';
  created_at: string; // ISO date string
}

export interface Shipment {
  id: number;
  order_id: number;
  shipment_method: string; // e.g., 'standard', 'express'
  tracking_number: string | null;
  status: 'pending' | 'shipped' | 'delivered' | 'returned';
  shipped_at: string | null; // ISO date string
  delivered_at: string | null; // ISO date string
}

export interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  added_at: string; // ISO date string
}

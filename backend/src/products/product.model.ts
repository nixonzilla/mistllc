import {  } from "../shared/types";

export async function getProducts(env: Env) {
  return await env.DB.prepare("SELECT * FROM products").all();
}

export async function getProductById(env: Env, id: number) {
  return await env.DB.prepare("SELECT * FROM products WHERE id = ?")
    .bind(id)
    .first();
}

export async function createProduct(env: Env, data: { name: string; description?: string; price: number; image_url?: string }) {
  return await env.DB.prepare(
    "INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)"
  )
    .bind(data.name, data.description ?? null, data.price, data.image_url ?? null)
    .run();
}

export async function updateProduct(env: Env, id: number, data: { name?: string; description?: string; price?: number; image_url?: string }) {
  const existingProduct = await getProductById(env, id);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const updatedProduct = {
    name: data.name ?? existingProduct.name,
    description: data.description ?? existingProduct.description,
    price: data.price ?? existingProduct.price,
    image_url: data.image_url ?? existingProduct.image_url,
  };

  await env.DB.prepare(
    "UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?"
  )
    .bind(updatedProduct.name, updatedProduct.description, updatedProduct.price, updatedProduct.image_url, id)
    .run();

  return await getProductById(env, id);
}

export async function deleteProduct(env: Env, id: number) {
  return await env.DB.prepare("DELETE FROM products WHERE id = ?")
    .bind(id)
    .run();
}

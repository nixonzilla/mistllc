import { Env, Product, CreateProductInput, UpdateProductInput } from "../shared/types/product";

export async function getProducts(env: Env): Promise<Product[]> {
  const result = await env.DB.prepare("SELECT * FROM products").all<Product>();
  return result.results ?? [];
}

export async function getProductById(env: Env, id: number): Promise<Product | null> {
  const result = await env.DB.prepare("SELECT * FROM products WHERE id = ?")
    .bind(id)
    .first<Product>();
  return result ?? null;
}

export async function createProduct(env: Env, data: CreateProductInput): Promise<void> {
  await env.DB.prepare(
    "INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)"
  )
    .bind(data.name, data.description ?? null, data.price, data.image_url ?? null)
    .run();
}

export async function updateProduct(env: Env, id: number, data: UpdateProductInput): Promise<Product> {
  const existingProduct = await getProductById(env, id);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const updatedProduct: Product = {
    ...existingProduct,
    ...data,
  };

  await env.DB.prepare(
    "UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?"
  )
    .bind(
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.image_url,
      id
    )
    .run();

  return (await getProductById(env, id)) as Product;
}

export async function deleteProduct(env: Env, id: number): Promise<void> {
  await env.DB.prepare("DELETE FROM products WHERE id = ?")
    .bind(id)
    .run();
}

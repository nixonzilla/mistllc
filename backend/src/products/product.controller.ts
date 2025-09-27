import { Context } from "hono";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./product.model";
import { CreateProductInput, UpdateProductInput } from "../shared/types/product";

export const productController = {
  list: async (c: Context) => {
    const products = await getProducts(c.env);
    return c.json(products);
  },

  get: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const product = await getProductById(c.env, id);
    if (!product) return c.text("Not Found", 404);
    return c.json(product);
  },

  create: async (c: Context) => {
    const body = (await c.req.json()) as CreateProductInput;
    await createProduct(c.env, body);
    return c.text("Created", 201);
  },

  update: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const body = (await c.req.json()) as UpdateProductInput;
    try {
      const product = await updateProduct(c.env, id, body);
      return c.json(product);
    } catch (e: any) {
      return c.text(e.message, 404);
    }
  },

  remove: async (c: Context) => {
    const id = Number(c.req.param("id"));
    await deleteProduct(c.env, id);
    return c.text("Deleted", 200);
  },
};

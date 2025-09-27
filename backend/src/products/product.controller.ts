import { Context } from "hono";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./product.model";

export const productController = {
  list: async (c: Context) => {
    const result = await getProducts(c.env);
    return c.json(result);
  },

  get: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const product = await getProductById(c.env, id);
    if (!product) return c.text("Not Found", 404);
    return c.json(product);
  },

  create: async (c: Context) => {
    const body = await c.req.json();
    const { name, description, price, image_url } = body;
    await createProduct(c.env, { name, description, price, image_url });
    return c.text("Created", 201);
  },

  update: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
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

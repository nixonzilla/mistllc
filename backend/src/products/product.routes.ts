import { Hono } from "hono";
import { productController } from "./product.controller";

export const productRoutes = new Hono();

productRoutes.get("/", productController.list);
productRoutes.get("/:id", productController.get);
productRoutes.post("/", productController.create);
productRoutes.put("/:id", productController.update);
productRoutes.delete("/:id", productController.remove);

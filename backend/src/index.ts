// backend/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { D1Database } from "@cloudflare/workers-types";
import { productRoutes } from "./products/product.routes";

const app = new Hono<{ Bindings: { DB: D1Database } }>();
app.route("/products", productRoutes);

// Enable CORS for frontend
app.use("*", cors());

// ------------------ ROOT ------------------
app.get("/", (c) => c.text("🎵 MISTLLC backend is running"));

// ------------------ SONGS ------------------
app.get("/songs", async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT id, title, artist, created_at FROM songs ORDER BY created_at DESC"
    ).all();

    return c.json(results);
  } catch (err: any) {
    console.error("DB error (songs):", err);
    return c.json({ error: "Failed to fetch songs" }, 500);
  }
});

// ------------------ PRODUCTS ------------------
app.get("/products", async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT id, name, price, created_at FROM products ORDER BY created_at DESC"
    ).all();

    return c.json(results);
  } catch (err: any) {
    console.error("DB error (products):", err);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

// ------------------ CHECKOUT ------------------
app.post("/checkout", async (c) => {
  try {
    const body = await c.req.json<{
      cart: { id: number; qty: number }[];
    }>();

    if (!body.cart || body.cart.length === 0) {
      return c.json({ error: "Cart is empty" }, 400);
    }

    let total = 0;
    const receipt: Array<{
      id: number;
      name: string;
      price: number;
      qty: number;
    }> = [];

    for (const item of body.cart) {
      const product = await c.env.DB.prepare(
        "SELECT name, price FROM products WHERE id = ?"
      )
        .bind(item.id)
        .first<{ name: string; price: number }>();

      if (product) {
        total += product.price * item.qty;
        receipt.push({
          id: item.id,
          name: product.name,
          price: product.price,
          qty: item.qty,
        });
      }
    }

    // Store order in DB
    await c.env.DB.prepare(
      "INSERT INTO orders (cart_json, total, created_at) VALUES (?, ?, datetime('now'))"
    )
      .bind(JSON.stringify(receipt), total)
      .run();

    return c.json({
      message: "Checkout successful 🎉",
      total,
      items: receipt,
    });
  } catch (err: any) {
    console.error("DB error (checkout):", err);
    return c.json({ error: "Checkout failed" }, 500);
  }
});

export default app;

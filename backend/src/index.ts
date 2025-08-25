// backend/src/index.ts
import { Hono } from "hono";
import songs from "./routes/songs";

const app = new Hono();

// health check route
app.get("/", (c) => c.text("MISTLLC Backend is running 🚀"));

// mount songs router
app.route("/api/songs", songs);

export default app;

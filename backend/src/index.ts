import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security
app.use(helmet());

// Enable CORS
app.use(cors());

// HTTP request logging
app.use(morgan("dev"));

// JSON body parsing
app.use(express.json());

// Root route
app.get("/", (_req, res) => {
  res.json({ message: "MISTLLC Backend API running 🚀" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

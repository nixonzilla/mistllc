import express from "express";
import songsRouter from "./routes/songs";

const app = express();
app.use("/api/songs", songsRouter);
const PORT = process.env.PORT || 3001;

// Root route (so you don’t just see "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 MISTLLC Backend is running perfectly!");
});

// Example API endpoint
app.get("/api/songs", (req, res) => {
  res.json([
    { id: 1, title: "Song A", artist: "Artist X" },
    { id: 2, title: "Song B", artist: "Artist Y" }
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

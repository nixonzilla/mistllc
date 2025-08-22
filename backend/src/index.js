import express from "express"
const app = express()
import songsRouter from "./routes/songs";
app.use("/api/songs", songsRouter);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the MISTLLC backend! 🚀" })
})

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001")
})

import express from "express"
const app = express()

app.get("/api/hello", (_req, res) => {
    res.json({ message: "Hello from the MISTLLC backend! 🚀" })
  })

app.listen(4000, () => {
  console.log("Backend running on http://localhost:8787")
})

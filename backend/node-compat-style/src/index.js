import express from "express"
const app = express()

app.get("/api/hello", (_req, res) => {
    res.json({ message: "Hello from the MISTLLC backend! 🚀" })
  })

app.listen(8787, () => {
  console.log("Backend running on http://localhost:8787")
})

import { Hono } from "hono"

const auth = new Hono()

auth.post("/login", async (c) => {
  const body = await c.req.json<{ email: string; password: string }>()
  if (body.email === "test@mistllc.org" && body.password === "1234") {
    return c.json({ token: "mock-jwt-token" })
  }
  return c.json({ message: "Invalid credentials" }, 401)
})

auth.post("/signup", async (c) => {
  const body = await c.req.json()
  return c.json({ message: "User registered successfully", user: body })
})

export default auth

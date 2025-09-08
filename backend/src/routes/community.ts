import { Hono } from "hono"

const community = new Hono()

let posts = [
  { id: 1, user: "John", text: "Loving the vibes!" },
  { id: 2, user: "Sarah", text: "Can’t wait for more releases." }
]

community.get("/", (c) => c.json(posts))

community.post("/", async (c) => {
  const body = await c.req.json<{ user: string; text: string }>()
  const newPost = { id: posts.length + 1, ...body }
  posts.push(newPost)
  return c.json(newPost)
})

export default community

import { Hono } from "hono"

const shop = new Hono()

const items = [
  { id: 1, name: "Vinyl - Dreamy Vibes", price: 29.99 },
  { id: 2, name: "MISTLLC Hoodie", price: 59.99 }
]

shop.get("/", (c) => c.json(items))

export default shop

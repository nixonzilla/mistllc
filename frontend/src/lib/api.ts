// frontend/src/lib/api.ts

export type Product = {
  _id: string;
  name: string;
  price: number;
};

export type Song = {
  id: number;
  title: string;
  artist: string;
  created_at: string;
};

export type Post = {
  _id: string;
  content: string;
  author?: { email: string };
};

// ------------------- SONGS -------------------
export const fetchSongs = async (): Promise<Song[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
};

// ------------------- PRODUCTS -------------------
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const checkout = async (cart: Product[], token: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ cart }),
  });
  if (!res.ok) throw new Error("Checkout failed");
  return res.json();
};

// ------------------- COMMUNITY POSTS -------------------
export const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const addPost = async (
  content: string,
  token: string
): Promise<Post> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to add post");
  return res.json();
};

// ------------------- AUTH -------------------
export const login = async (email: string, password: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

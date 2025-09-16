// frontend/src/lib/api.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

// ------------------ SONGS ------------------
export async function fetchSongs() {
  const res = await fetch(`${API_URL}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

// ------------------ PRODUCTS ------------------
export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function checkout(
  cart: { id: number; qty: number }[],
  token?: string
) {
  const res = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ cart }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Checkout failed");
  }

  return res.json();
}

// ------------------ COMMUNITY (example) ------------------
export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function addPost(content: string, token?: string) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to add post");
  }

  return res.json();
}

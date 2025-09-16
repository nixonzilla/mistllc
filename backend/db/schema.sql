-- Songs table (music library)
CREATE TABLE songs (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Products table (merch, music for sale, etc.)
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Orders table (checkout receipts, stores cart JSON + total)
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  cart_json TEXT NOT NULL, -- JSON snapshot of purchased items
  total REAL NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
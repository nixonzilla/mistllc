-- ===================================================
-- Seed core demo data
-- ===================================================

-- Songs (music library)
INSERT INTO songs (title, artist, created_at) VALUES
  ('Dreamy Vibes', 'Mist Artist', CURRENT_TIMESTAMP),
  ('Bold Beats', 'Mist Artist', CURRENT_TIMESTAMP),
  ('Sultry Flow', 'Mist Artist', CURRENT_TIMESTAMP),
  ('Unapologetic Sound', 'Mist Artist', CURRENT_TIMESTAMP),
  ('Golden Hour Jam', 'Mist Artist', CURRENT_TIMESTAMP);

-- Users
INSERT INTO users (username, email, password_hash, created_at) VALUES
  ('mistfan1', 'fan1@example.com', 'hashed_password_123', CURRENT_TIMESTAMP),
  ('mistfan2', 'fan2@example.com', 'hashed_password_456', CURRENT_TIMESTAMP),
  ('testuser', 'test@example.com', 'hashed_password_test', CURRENT_TIMESTAMP);

-- Categories
INSERT INTO categories (name, description) VALUES
  ('Clothing', 'T-shirts, hoodies, and other apparel'),
  ('Accessories', 'Stickers and smaller items'),
  ('Music', 'Vinyls, cassettes, and digital albums');

-- Products
INSERT INTO products (name, description, price, image_url, created_at) VALUES
  ('Mist T-Shirt', 'Classic Mist logo tee, 100% cotton', 20.00, '/images/products/mist_tshirt.jpg', CURRENT_TIMESTAMP),
  ('Mist Hoodie', 'Warm hoodie with embroidered Mist logo', 40.00, '/images/products/mist_hoodie.jpg', CURRENT_TIMESTAMP),
  ('Mist Sticker Pack', 'Set of 5 exclusive Mist logo stickers', 5.00, '/images/products/mist_stickers.jpg', CURRENT_TIMESTAMP),
  ('Mist Album Download', 'Digital download of Mist debut album', 10.00, '/images/products/mist_album.jpg', CURRENT_TIMESTAMP),
  ('Mist Vinyl Record', 'Limited edition Mist vinyl pressing', 25.00, '/images/products/mist_vinyl.jpg', CURRENT_TIMESTAMP),
  ('Vinyl: Drippy', 'Vinyl single of "Drippy"', 25.00, '/images/products/drippy_vinyl.jpg', CURRENT_TIMESTAMP),
  ('Cassette: Dreamscape', 'Retro cassette edition of "Dreamscape"', 15.00, '/images/products/dreamscape_cassette.jpg', CURRENT_TIMESTAMP),
  ('T-Shirt: Island Vibez Edition', 'Special edition tee inspired by Island Vibez', 30.00, '/images/products/island_vibez_tshirt.jpg', CURRENT_TIMESTAMP);

-- Product-Category relationships
INSERT INTO product_categories (product_id, category_id) VALUES
  (1, 1), (2, 1), (3, 2),
  (4, 3), (5, 3), (6, 3),
  (7, 3), (8, 1);

-- Inventory
INSERT INTO inventory (product_id, quantity, last_updated) VALUES
  (1, 50, CURRENT_TIMESTAMP),
  (2, 30, CURRENT_TIMESTAMP),
  (3, 200, CURRENT_TIMESTAMP),
  (4, 999, CURRENT_TIMESTAMP),
  (5, 25, CURRENT_TIMESTAMP),
  (6, 20, CURRENT_TIMESTAMP),
  (7, 15, CURRENT_TIMESTAMP),
  (8, 40, CURRENT_TIMESTAMP);

-- Orders
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
  (1, 20.00, 'completed', CURRENT_TIMESTAMP),
  (2, 50.00, 'completed', CURRENT_TIMESTAMP),
  (3, 65.00, 'pending', CURRENT_TIMESTAMP);

-- Order Items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
  (1, 1, 1, 20.00),
  (2, 2, 1, 40.00),
  (2, 3, 2, 5.00),
  (3, 8, 2, 30.00),
  (3, 7, 1, 15.00);

-- Reviews
INSERT INTO reviews (product_id, user_id, rating, comment, created_at) VALUES
  (1, 1, 5, 'Amazing quality, super comfy!', CURRENT_TIMESTAMP),
  (2, 2, 4, 'Warm and stylish, but a bit pricey.', CURRENT_TIMESTAMP),
  (3, 1, 5, 'Stickers are fire!', CURRENT_TIMESTAMP),
  (5, 3, 5, 'Vinyl pressing sounds incredible.', CURRENT_TIMESTAMP);

-- Addresses
INSERT INTO addresses (user_id, street, city, state, zip_code, country) VALUES
  (1, '123 Mist Lane', 'Lagos', 'LA', '100001', 'Nigeria'),
  (2, '456 Groove St', 'New York', 'NY', '10001', 'USA'),
  (3, '789 Rhythm Ave', 'London', 'LDN', 'E1 6AN', 'UK');

-- Payments
INSERT INTO payments (order_id, amount, payment_method, status, created_at) VALUES
  (1, 20.00, 'credit_card', 'completed', CURRENT_TIMESTAMP),
  (2, 50.00, 'paypal', 'completed', CURRENT_TIMESTAMP),
  (3, 65.00, 'credit_card', 'pending', CURRENT_TIMESTAMP);

-- Shipments
INSERT INTO shipments (order_id, shipment_method, tracking_number, status, shipped_at, delivered_at) VALUES
  (1, 'standard', 'TRACK12345', 'delivered', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'express', 'TRACK67890', 'shipped', CURRENT_TIMESTAMP, NULL);

-- Wishlist Items
INSERT INTO wishlist_items (user_id, product_id, added_at) VALUES
  (1, 2, CURRENT_TIMESTAMP), -- Hoodie
  (2, 5, CURRENT_TIMESTAMP), -- Vinyl Record
  (3, 8, CURRENT_TIMESTAMP); -- Island Vibez T-Shirt


-- ===================================================
-- Test Data Helpers for Development
-- ===================================================

-- Generate 5 fake users
INSERT INTO users (username, email, password_hash, created_at)
SELECT 'devuser' i,
       'devuser' i, '@example.com',
       'hashed_password_' i,
       CURRENT_TIMESTAMP
FROM generate_series(1, 5);

-- Generate 5 fake orders for test users
INSERT INTO orders (user_id, total_amount, status, created_at)
SELECT u.id,
       (RANDOM() % 100) + 10, -- random total between 10–110
       CASE (RANDOM() % 3)
         WHEN 0 THEN 'pending'
         WHEN 1 THEN 'completed'
         ELSE 'cancelled'
       END,
       CURRENT_TIMESTAMP
FROM users u
WHERE u.username LIKE 'devuser%';

-- Generate wishlist items for dev users
INSERT INTO wishlist_items (user_id, product_id, added_at)
SELECT u.id, (RANDOM() % 8) + 1, CURRENT_TIMESTAMP
FROM users u
WHERE u.username LIKE 'devuser%';

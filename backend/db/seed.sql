INSERT INTO songs (title, artist, created_at) VALUES
('Dreamy Vibes', 'Mist Artist', CURRENT_TIMESTAMP),
('Bold Beats', 'Mist Artist', CURRENT_TIMESTAMP),
('Sultry Flow', 'Mist Artist', CURRENT_TIMESTAMP),
('Unapologetic Sound', 'Mist Artist', CURRENT_TIMESTAMP),
('Golden Hour Jam', 'Mist Artist', CURRENT_TIMESTAMP);

INSERT INTO products (name, price, created_at) VALUES
('Mist T-Shirt', 20.00, CURRENT_TIMESTAMP),
('Mist Hoodie', 40.00, CURRENT_TIMESTAMP),
('Mist Sticker Pack', 5.00, CURRENT_TIMESTAMP),
('Mist Album Download', 10.00, CURRENT_TIMESTAMP),
('Mist Vinyl Record', 25.00, CURRENT_TIMESTAMP),
('Vinyl: Drippy', 25.00, CURRENT_TIMESTAMP),
('Cassette: Dreamscape', 15.00, CURRENT_TIMESTAMP),
('T-Shirt: Island Vibez Edition', 30.00, CURRENT_TIMESTAMP);

INSERT INTO orders (cart_json, total, created_at) VALUES
('{"items":[{"id":1,"name":"Mist T-Shirt","price":20.00,"quantity":1}],"total":20.00}', 20.00, CURRENT_TIMESTAMP),
('{"items":[{"id":2,"name":"Mist Hoodie","price":40.00,"quantity":1},{"id":3,"name":"Mist Sticker Pack","price":5.00,"quantity":2}],"total":50.00}', 50.00, CURRENT_TIMESTAMP);

-- Note: Orders will be created dynamically via the application when users make purchases.
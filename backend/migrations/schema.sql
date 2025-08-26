DROP TABLE IF EXISTS songs;

-- Create songs table
CREATE TABLE songs (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL
);

-- Seed with sample data
INSERT INTO songs (title, artist) VALUES
  ('Drippy', 'MISTLLC'),
  ('Dreams of Fire', 'MISTLLC'),
  ('Unapologetic Vibes', 'MISTLLC');

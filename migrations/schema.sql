
CREATE TABLE Tracks (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL
);

-- Seed with sample data
INSERT INTO Tracks (title, artist) VALUES
  ('Drippy', 'MISTLLC'),
  ('Dreams of Fire', 'MISTLLC'),
  ('Unapologetic Vibes', 'MISTLLC');

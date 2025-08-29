DROP TABLE IF EXISTS songs;

-- Create songs table
CREATE TABLE songs (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL
);
CREATE INDEX idx_artist ON songs(artist);
CREATE INDEX idx_title ON songs(title);
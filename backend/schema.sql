-- backend/schema.sql
DROP TABLE IF EXISTS songs;

-- Create songs table
CREATE TABLE songs (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL
);

-- Seed with sample data
INSERT INTO songs (title, artist, album) VALUES
('Who Am I', 'Beenie Man', 'Blessed'),
('Murder She Wrote', 'Chaka Demus & Pliers', 'Tease Me'),
('Bam Bam', 'Sister Nancy', 'One Two'),
('Temperature', 'Sean Paul', 'The Trinity'),
('Pull Up To The Bumper', 'Grace Jones', 'Nightclubbing');

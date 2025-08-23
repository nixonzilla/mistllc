const router = router();

// Temporary in-memory "database"
let songs = [
  { id: 1, title: "Dream Flow", artist: "MISTLLC", duration: "3:45" },
  { id: 2, title: "Bold Steps", artist: "MISTLLC", duration: "4:02" },
  { id: 3, title: "Drippy", artist: "MISTLLC", duration: "2:58" },
];

// GET all songs
router.get("/", (req, res) => {
  res.json(songs);
});

// POST new song
router.post("/", (req, res) => {
  const { title, artist, duration } = req.body;
  if (!title || !artist || !duration) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newSong = {
    id: songs.length + 1,
    title,
    artist,
    duration,
  };

  songs.push(newSong);
  res.status(201).json(newSong);
});

export default router;

// backend/src/routes/songs.ts
import { Router } from "express";

const router = Router();

// Example static songs (replace with DB later)
const songs = [
  { id: 1, title: "Dream Flow", artist: "MISTLLC", duration: "3:45" },
  { id: 2, title: "Bold Steps", artist: "MISTLLC", duration: "4:02" },
  { id: 3, title: "Drippy", artist: "MISTLLC", duration: "2:58" },
];

router.get("/", (req, res) => {
  res.json(songs);
});

export default router;

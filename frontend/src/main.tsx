import axios from "axios";
import './index.css';

const app = document.getElementById("app");

if (app) {
  app.innerHTML = `
    <h1 class="text-3xl font-bold mb-4">MISTLLC Songs</h1>
    <div id="songs" class="grid gap-4"></div>
  `;
}

const songsContainer = document.getElementById("songs");

async function fetchSongs() {
  try {
    const response = await axios.get("http://127.0.0.1:8787/songs");
    const songs = response.data;

    if (songsContainer) {
      songsContainer.innerHTML = songs
        .map(
          (song: { title: string; artist: string; duration: string }) => `
            <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition">
              <h2 class="text-xl font-semibold">${song.title}</h2>
              <p class="text-gray-600">${song.artist}</p>
              <p class="text-gray-500 text-sm">${song.duration}</p>
            </div>
          `
        )
        .join("");
    }
  } catch (err) {
    if (songsContainer) {
      songsContainer.innerHTML = `<p class="text-red-500">Failed to load songs.</p>`;
    }
    console.error(err);
  }
}

fetchSongs();

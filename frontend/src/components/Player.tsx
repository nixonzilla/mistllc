import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/GlobalContext";

export default function Player() {
  const { currentSong, playNext, playPrev } = useGlobal();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!currentSong) {
    return (
      <div className="bg-mist-gray text-center py-3">
        🎶 No song playing
      </div>
    );
  }

  return (
    <div className="bg-mist-gray p-4 flex justify-between items-center shadow-lg">
      {/* Song Info */}
      <div>
        <h3 className="font-bold">{currentSong.title}</h3>
        <p className="text-sm text-gray-400">{currentSong.artist}</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 items-center">
        <button onClick={playPrev} className="hover:text-mist-pink">⏮</button>
        <button onClick={togglePlay} className="hover:text-mist-gold">
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={playNext} className="hover:text-mist-pink">⏭</button>
      </div>

      {/* Hidden Audio */}
      <audio ref={audioRef} onEnded={playNext} />
    </div>
  );
}

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Song } from "../../hooks/useSongs";

type PlayerProps = {
  songs: Song[];
  currentIndex: number;
  onChangeTrack: (index: number) => void;
};

function Player({ songs, currentIndex, onChangeTrack }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const percent =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percent || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
    }
  };

  const handleEnded = () => {
    if (currentIndex < songs.length - 1) {
      onChangeTrack(currentIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[600px] bg-white/10 dark:bg-black/30 backdrop-blur-xl shadow-xl rounded-2xl p-4 flex flex-col"
    >
      {/* Song Info */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-white font-semibold truncate">{currentSong.title}</h4>
          <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full accent-accent"
      />

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-3">
        <button
          onClick={() =>
            onChangeTrack(currentIndex > 0 ? currentIndex - 1 : songs.length - 1)
          }
          className="p-2 text-gray-300 hover:text-white transition"
        >
          <SkipBack size={22} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full bg-accent text-white hover:opacity-90 transition"
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </button>

        <button
          onClick={() =>
            onChangeTrack((currentIndex + 1) % songs.length)
          }
          className="p-2 text-gray-300 hover:text-white transition"
        >
          <SkipForward size={22} />
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </motion.div>
  );
}

export default Player;

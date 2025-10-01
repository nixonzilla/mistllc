// frontend/src/components/ui/SongsCard.tsx
import { Song } from "../../hooks/useSongs";

interface SongsCardProps {
  song: Song;
}

function SongsCard({ song }: SongsCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200/20 dark:border-gray-700/20 hover:scale-105 transition-transform duration-300">
      {/* Cover placeholder (later you can replace with real album art) */}
      <div className="h-48 w-full bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center text-4xl text-white font-bold">
        🎵
      </div>

      {/* Song Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary dark:text-white group-hover:text-accent transition">
          {song.title}
        </h3>
        <p className="text-sm text-secondary dark:text-gray-400">{song.artist}</p>
      </div>
    </div>
  );
}

export default SongsCard;

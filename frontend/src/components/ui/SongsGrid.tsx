import SongCard from "./Songscard";
import SongSkeleton from "./SongSkeleton";
import { Song } from "../../hooks/useSongs";

type SongsGridProps = {
  songs: Song[];
  loading: boolean;
  onPlay: (index: number) => void;
};

function SongsGrid({ songs, loading, onPlay }: SongsGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SongSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!songs.length) {
    return <p className="text-gray-500 dark:text-gray-400">No songs available</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {songs.map((song, index) => (
        <SongCard key={song.id} song={song} index={index} onPlay={onPlay} />
      ))}
    </div>
  );
}

export default SongsGrid;

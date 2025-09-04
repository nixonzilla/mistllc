import SongCard from "../features/songs/SongCard";
import Loader from "./layout/Loader";

type Song = {
  id: string;
  title: string;
  artist: string;
};

interface Props {
  songs: Song[];
  loading: boolean;
}

export default function SongList({ songs, loading }: Props) {
  if (loading) return <Loader />;

  if (!songs || songs.length === 0) {
    return <p className="text-gray-400 text-center mt-10">🎶 No songs available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    </div>
  );
}


interface SongCardProps {
  title: string;
  artist: string;
}

export default function SongCard({ title, artist }: SongCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600">{artist}</p>
    </div>
  );
}

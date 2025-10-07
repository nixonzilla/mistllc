// src/components/ui/SongsCard.tsx
import React from "react";
import type { Song } from "../../lib/types";

type SongsCardProps = {
  songs: Song[];
};

const SongsCard: React.FC<SongsCardProps> = ({ songs }) => {
  if (!songs.length) return <p className="text-gray-400">No songs available</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            src={song.coverUrl || "/placeholder.png"}
            alt={song.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-white">{song.title}</h3>
          <p className="text-gray-400">{song.artist}</p>
          <p className="text-gray-500 text-sm mt-1">
            {new Date(song.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SongsCard;

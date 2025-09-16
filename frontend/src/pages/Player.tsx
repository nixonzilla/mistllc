import { useGlobalContext } from "../context/GlobalContext";

export default function PlayerPage() {
  const { currentSong } = useGlobalContext();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Now Playing</h1>

      {currentSong ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{currentSong.title}</h2>
          <p className="text-gray-500">{currentSong.artist}</p>
          <audio
            src={currentSong.url}
            controls
            autoPlay
            className="w-full mt-4"
          />
        </div>
      ) : (
        <p className="text-gray-500">No song selected.</p>
      )}
    </div>
  );
}

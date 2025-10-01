// frontend/src/pages/Releases.tsx
import SongsGrid from "../components/ui/SongsGrid";
import { useSongs } from "../hooks/useSongs";

function Releases() {
  const { songs, loading, error } = useSongs();

  return (
    <div className="px-6 py-12 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-primary dark:text-white mb-4">
          Latest Releases
        </h1>
        <p className="text-lg text-secondary dark:text-gray-300 max-w-xl mx-auto">
          Discover the freshest drops from MISTLLC — music made with authenticity and creativity.
        </p>
      </header>

      <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/40 rounded-2xl shadow-lg p-6">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <SongsGrid songs={songs} loading={loading} onPlay={function (): void {
              throw new Error("Function not implemented.");
            } } />
        )}
      </div>
    </div>
  );
}

export default Releases;

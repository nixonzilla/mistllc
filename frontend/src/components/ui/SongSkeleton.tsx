// frontend/src/components/ui/SongsSkeleton.tsx
function SongsSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/10 dark:border-gray-700/10">
      <div className="h-48 w-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default SongsSkeleton;

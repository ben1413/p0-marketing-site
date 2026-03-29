export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 bg-zinc-800 rounded-lg" />
        <div className="h-4 w-72 bg-zinc-900 rounded" />
      </div>

      {/* Card skeletons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-zinc-900 border border-zinc-800 rounded-xl" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 bg-zinc-900 border border-zinc-800 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

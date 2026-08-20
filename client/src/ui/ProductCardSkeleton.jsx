export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-4/5.5 rounded-lg bg-gray-200" />
      <div className="pt-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="flex gap-2 mt-3">
          <div className="h-8 bg-gray-200 rounded flex-1" />
          <div className="h-8 bg-gray-200 rounded flex-1" />
        </div>
      </div>
    </div>
  );
}
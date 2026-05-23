const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-secondary rounded-lg ${className}`} />
  )
}

export const ProductSkeleton = () => (
  <div className="card space-y-3">
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="flex gap-2">
      <Skeleton className="h-10 flex-1" />
      <Skeleton className="h-10 flex-1" />
    </div>
  </div>
)

export default Skeleton

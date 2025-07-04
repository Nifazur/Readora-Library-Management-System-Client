import { Skeleton } from "@/components/ui/skeleton";

const BookCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-sm mx-auto">
      {/* Book Image Skeleton */}
      <div className="relative">
        <Skeleton className="w-[380px] h-64" />
        
        {/* Availability Badge Skeleton */}
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      <div className="p-4">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        
        {/* Author Skeleton */}
        <div className="flex items-center mb-2">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        {/* Genre Skeleton */}
        <div className="flex items-center mb-3">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        
        {/* Description Skeleton */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Copy Count Skeleton */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        
        {/* Borrow Button Skeleton */}
        <div className="mt-4">
          <Skeleton className="w-full h-10 rounded-md" />
        </div>
        
        {/* Edit and Delete Buttons Skeleton */}
        <div className="flex gap-2 mt-3">
          <Skeleton className="flex-1 h-10 rounded-md" />
          <Skeleton className="flex-1 h-10 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
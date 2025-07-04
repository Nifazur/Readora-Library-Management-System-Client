import { Skeleton } from "@/components/ui/skeleton";

export const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {/* Title Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-24" />
      </td>
      
      {/* Author Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-20" />
      </td>
      
      {/* Genre Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-28" />
      </td>
      
      {/* ISBN Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-32" />
      </td>
      
      {/* Copies Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-8" />
      </td>
      
      {/* Availability Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      
      {/* Actions Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </td>
    </tr>
  );
};
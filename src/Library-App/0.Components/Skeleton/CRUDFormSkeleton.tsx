
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CRUDFormSkeleton = () => {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <Card className='px-8'>
                <CardHeader className='-ml-5'>
                    <CardTitle className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 text-blue-600" />
                        <Skeleton className="h-6 w-24" />
                    </CardTitle>
                </CardHeader>
                
                <div className="space-y-6">
                    {/* Title Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Author Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Genre Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-14" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-24 w-full" />
                    </div>

                    {/* Copies Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* ISBN Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Image URL Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex pt-4">
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CRUDFormSkeleton;
import { ArrowLeft, X, BookPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const BorrowBookSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <div className="">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="font-medium">Back to Library</span>
                            </div>
                        </div>
                        <button className="p-2 text-gray-500">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Book Information */}
                    <div className="space-y-6">
                        {/* Book Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookPlus className="h-5 w-5 text-indigo-600" />
                                    Borrow Book
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-4">
                                    {/* Book Image Skeleton */}
                                    <Skeleton className="w-24 h-36 rounded-lg" />
                                    
                                    {/* Book Info Skeleton */}
                                    <div className="flex-1 space-y-3">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-8 w-32 rounded-full" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Borrowing Guidelines Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Borrowing Guidelines</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Guideline Items */}
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-indigo-600 text-sm font-semibold">{item}</span>
                                        </div>
                                        <Skeleton className="h-4 flex-1" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Borrow Form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Borrow Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Quantity Section */}
                                <div className="space-y-3">
                                    <Skeleton className="h-5 w-16" />
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-10 w-10 rounded-md" />
                                        <Skeleton className="h-10 w-20 rounded-md" />
                                        <Skeleton className="h-10 w-10 rounded-md" />
                                    </div>
                                    <Skeleton className="h-4 w-48" />
                                </div>

                                {/* Due Date Section */}
                                <div className="space-y-3">
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>

                                {/* Submit Button */}
                                <Skeleton className="h-12 w-full rounded-md" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowBookSkeleton;
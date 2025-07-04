import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';

const FullDetailsCardSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Floating Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-all duration-200 group">
                            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-indigo-100 transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                            </div>
                            <span className="font-medium">Back to Library</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <button className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200">
                                <Heart className="h-5 w-5" />
                            </button>
                            <button className="p-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200">
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Book Image Skeleton */}
                        <div className="lg:col-span-2">
                            <div className="relative group">
                                <Skeleton className="w-full h-[600px] rounded-2xl" />
                                
                                {/* Floating Availability Badge Skeleton */}
                                <div className="absolute top-6 right-6">
                                    <Skeleton className="w-24 h-8 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Book Details Skeleton */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Title and Author */}
                            <div>
                                <Skeleton className="h-14 w-3/4 mb-4" />
                                <Skeleton className="h-7 w-1/2 mb-6" />
                                <Skeleton className="h-8 w-24 rounded-full" />
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <Skeleton className="h-8 w-48 mb-4" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-3/4" />
                                </div>
                            </div>

                            {/* Book Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-2 shadow-lg rounded-full">
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                        </div>
                                        <div className="flex-1">
                                            <Skeleton className="h-5 w-16 mb-2" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-2 shadow-lg rounded-full">
                                            <Skeleton className='h-6 w-6 rounded-full'></Skeleton>
                                        </div>
                                        <div className="flex-1">
                                            <Skeleton className="h-5 w-20 mb-2" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default FullDetailsCardSkeleton;
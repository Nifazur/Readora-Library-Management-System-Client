
import { useGetBookQuery } from '@/Redux/api/booksApi';
import { skipToken } from '@reduxjs/toolkit/query';
import {
    Copy,
    CheckCircle,
    XCircle,
    Edit,
    Trash2,
    BookPlus,
    ArrowLeft,
    Hash,
    Heart,
    Share2,
} from 'lucide-react';

import { Link, useParams } from 'react-router-dom';
import FullDetailsCardSkeleton from '../Skeleton/FullDetailsCardSkeleton';

const FullDetailsCard = () => {
    const { id } = useParams();
    

    const { data: book, isError, error, isLoading } = useGetBookQuery(id ?? skipToken);
    if(isLoading) return <FullDetailsCardSkeleton></FullDetailsCardSkeleton>
    if (isError) return <p>Error: {JSON.stringify(error)}</p>

    if (!book) return <p>No book found</p>; 

    const { image, title, author, genre, isbn, description, copies, available } = book;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Floating Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to={'/'} className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-all duration-200 group">
                            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-indigo-100 transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                            </div>
                            <span className="font-medium">Back to Library</span>
                        </Link>

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
                        {/* Book Image - More Prominent */}
                        <div className="lg:col-span-2">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                                <img
                                    src={image}
                                    alt={`${title} cover`}
                                    className="w-full h-[600px] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                                />

                                {/* Floating Availability Badge */}
                                <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${available ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                                    }`}>
                                    {available ? (
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Available
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <XCircle className="h-4 w-4" />
                                            Out of Stock
                                        </div>
                                    )}
                                </div>


                            </div>
                        </div>


                        <div className="lg:col-span-3 space-y-8">

                            <div>
                                <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                    {title}
                                </h1>
                                <p className="text-xl text-gray-600 mb-6">by {author}</p>

                                <div className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium w-fit">
                                    {genre}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this book</h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {description}
                                </p>
                            </div>

                            {/* Book Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-full">
                                            <Hash className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">ISBN</h3>
                                            <p className="text-gray-600">{isbn}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-orange-100 rounded-full">
                                            <Copy className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Availability</h3>
                                            <p className="text-gray-600">{available ? `${copies} available` : 'All borrowed'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200/50 p-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                            <h3 className="font-semibold text-gray-900">{title}</h3>
                            <p className="text-sm text-gray-600">{author}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
                            <Edit className="h-4 w-4 inline mr-2" />
                            Edit
                        </button>
                        <button className="px-6 py-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium">
                            <Trash2 className="h-4 w-4 inline mr-2" />
                            Delete
                        </button>
                        <button
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${available
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={!available}
                        >
                            <BookPlus className="h-5 w-5 inline mr-2" />
                            {available ? 'Borrow Now' : 'Not Available'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullDetailsCard;
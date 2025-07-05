import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useDeleteBookMutation, useGetBooksQuery } from "@/Redux/api/booksApi";
import { Book, BookOpen, Edit, Plus, Trash2 } from "lucide-react";
import type { IBook } from "@/Interfaces/IBook";
import { TableRowSkeleton } from "@/Library-App/0.Components/Skeleton/TableRowSkeleton";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";



export default function BooksPage() {
    const location = useLocation();
    const [deleteBook,] = useDeleteBookMutation();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useGetBooksQuery({
        page,
        limit: 10,
    });

    const books = data?.data || [];
    const totalPages = data?.totalPages || 1;

    const handleDelete = async (id: string) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This book will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await deleteBook(id).unwrap();

                Swal.fire({
                    icon: 'success',
                    title: 'Book deleted!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Delete failed!',
                    text: 'Something went wrong.',
                });
                console.error('Delete error:', error);
            }
        }
    };

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>AllBooks | READORA</title>
            </Helmet>
            <div className="p-6 mx-auto">
                <div className="min-h-screen bg-gray-50 p-2 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-col sm:flex-row">
                                    <Book className="h-8 w-8 text-blue-600 hidden sm:flex" />
                                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Book Management</h1>
                                </div>
                                <Link
                                    to={'/create-book'}

                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 transition-colors"
                                >
                                    <Plus size={20} />
                                    <span className="hidden sm:flex">Add New Book</span>
                                </Link>
                            </div>
                        </div>

                        {/* Books Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Author
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Genre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ISBN
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Copies
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Availability
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {isLoading
                                            ? Array.from({ length: limit }).map((_, i) => (
                                                <TableRowSkeleton key={i}></TableRowSkeleton>
                                            ))
                                            : books.map((book: IBook) => (
                                                <tr key={book._id} className="hover:bg-gray-50">
                                                    <Link to={`/books/${book._id}`} state={{ from: location.pathname }}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                        </td>
                                                    </Link>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{book.author}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{book.genre}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{book.isbn}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{book.copies}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${book.available
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {book.available ? 'Available' : 'Unavailable'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                to={`/edit-book/${book._id}`}

                                                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                                                                title="Edit Book"
                                                            >
                                                                <Edit size={16} />
                                                            </Link>
                                                            <Link to={`/edit-book/${book._id}`}>
                                                                <button
                                                                    disabled={!book.available}
                                                                    className={`p-1 rounded transition-colors ${book.available
                                                                        ? 'text-green-600 hover:text-green-800 hover:bg-green-50'
                                                                        : 'text-gray-400 cursor-not-allowed'
                                                                        }`}
                                                                    title="Borrow Book"
                                                                >
                                                                    <BookOpen size={16} />
                                                                </button>
                                                            </Link>
                                                            <button

                                                                onClick={() => handleDelete(book._id)}

                                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                                                                title="Delete Book"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Pagination className="mt-6 justify-center">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>


                            {[...Array(totalPages)].map((_, idx) => (
                                <PaginationItem key={idx}>
                                    <button
                                        className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-blue-600 text-white" : "text-gray-700"
                                            }`}
                                        onClick={() => setPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </button>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>


            </div>
        </div>
    );
}





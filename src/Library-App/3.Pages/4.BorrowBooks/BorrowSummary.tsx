import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { BookOpen, FileText } from "lucide-react";
import { useGetBorrowSummaryQuery } from "@/Redux/api/borrowApi";
import { TableRowSkeleton } from "@/Library-App/0.Components/Skeleton/TableRowSkeleton";
import { Helmet } from "react-helmet";



export default function BorrowSummaryPage() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useGetBorrowSummaryQuery({
        page,
        limit: 5,
    });

    const borrowSummary = data?.data || [];
    console.log(borrowSummary)
    const totalPages = data?.totalPages || 1;

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BorrowSummary | READORA</title>
            </Helmet>
            <div className="p-6 mx-auto">
                <div className="min-h-screen bg-gray-50 p-2 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-col sm:flex-row">
                                    <FileText className="h-8 w-8 text-green-600 hidden sm:flex" />
                                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Borrow Summary</h1>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Total Records: {data?.totalItems || 0}
                                </div>
                            </div>
                        </div>

                        {/* Borrow Summary Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Book Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ISBN
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Quantity Borrowed
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {isLoading
                                            ? Array.from({ length: limit }).map((_, i) => (
                                                <TableRowSkeleton key={i} />
                                            ))
                                            : borrowSummary.map((item) => (
                                                <tr key={item._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-2">
                                                            <BookOpen className="h-4 w-4 text-blue-600" />
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {item.book.title}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-mono">
                                                            {item.book.isbn}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-semibold">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {item.totalQuantity}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
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
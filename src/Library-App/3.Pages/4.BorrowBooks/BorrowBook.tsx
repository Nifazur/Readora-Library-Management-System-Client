import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookPlus, CheckCircle, AlertCircle, Minus, Plus, ArrowLeft, X } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetBookQuery } from '@/Redux/api/booksApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useBorrowBookMutation, type BorrowInput} from '@/Redux/api/borrowApi';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import BorrowBookSkeleton from '@/Library-App/0.Components/Skeleton/BorrowBookSkeleton';

const BorrowBook = () => {
    const location = useLocation()
    useEffect(() => {
        window.scroll(0,0)
    },[])

    const { bookId } = useParams();
    const [borrowBook] = useBorrowBookMutation()

    const { data: book, isError, isLoading } = useGetBookQuery(bookId ?? skipToken);

    const [quantity, setQuantity] = useState(1);
    const [dueDate, setDueDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (isLoading) return <BorrowBookSkeleton></BorrowBookSkeleton>;
    if (isError) return <p>Error loading book data.</p>;
    if (!book) return <p>No book found.</p>;


    const redirectTo = location.state?.from || '/';

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= book.copies) {
            setQuantity(newQuantity);
            setError('');
        } else if (newQuantity > book.copies) {
            setError(`Only ${book.copies} copies available`);
        }
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        // Validation
        if (!dueDate) {
            setError('Please select a due date');
            return;
        }

        if (quantity > book.copies) {
            setError(`Only ${book.copies} copies available`);
            return;
        }

        if (dueDate && new Date(dueDate) < new Date()) {
            setError('Due date must be in the future');
            return;
        }

        setIsSubmitting(true);
        const borrowData: BorrowInput = {
            book: book._id,
            quantity,
            dueDate: dueDate,
        };
        console.log(borrowData);

        try {
            console.log("Sending data to API:", borrowData);
            await borrowBook(borrowData).unwrap();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Book added successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            console.error("Failed to borrow book:", error);
        }
    };

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BorrowBook | READORA</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                {/* Header */}
                <div className="">
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link to={redirectTo} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                                    <ArrowLeft className="h-5 w-5" />
                                    <span className="font-medium">Back to Library</span>
                                </Link>
                            </div>
                            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
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
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookPlus className="h-5 w-5 text-indigo-600" />
                                        Borrow Book
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-24 h-36 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h2>
                                            <p className="text-gray-600 mb-3">{book.author}</p>
                                            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                {book.copies} copies available
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Borrowing Guidelines */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Borrowing Guidelines</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-indigo-600 text-sm font-semibold">1</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Maximum borrowing period is 14 days</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-indigo-600 text-sm font-semibold">2</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Late returns may incur fines</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-indigo-600 text-sm font-semibold">3</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Books must be returned in good condition</p>
                                    </div>
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
                                    {/* Quantity */}
                                    <div className="space-y-3">
                                        <Label htmlFor="quantity" className="text-base font-medium">Quantity</Label>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                                disabled={quantity <= 1}
                                                className="h-10 w-10 p-0"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>

                                            <Input
                                                id="quantity"
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                                min="1"
                                                max={book.copies}
                                                className="w-20 text-center text-lg font-medium"
                                            />

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                                disabled={quantity >= book.copies}
                                                className="h-10 w-10 p-0"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Maximum {book.copies} copies available
                                        </p>
                                    </div>

                                    {/* Due Date */}
                                    <div className="space-y-3">
                                        <Label htmlFor="dueDate" className="text-base font-medium">Due Date</Label>
                                        <Input
                                            id="dueDate"
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Error Alert */}
                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Success Alert */}
                                    {success && (
                                        <Alert className="border-green-200 bg-green-50">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <AlertDescription className="text-green-800">
                                                {success}
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        onClick={handleSubmit}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base font-medium"
                                        disabled={isSubmitting || !dueDate || quantity > book.copies}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <BookPlus className="h-5 w-5 mr-2" />
                                                Borrow {quantity} {quantity === 1 ? 'Copy' : 'Copies'}
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowBook;
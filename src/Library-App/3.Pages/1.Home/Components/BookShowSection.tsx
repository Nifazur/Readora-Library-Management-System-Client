
import { Button } from '@/components/ui/button';
import type { IBook } from '@/Interfaces/IBook';
import BookCard from '@/Library-App/0.Components/Card/BookCard';
import BookCardSkeleton from '@/Library-App/0.Components/Skeleton/BookCardSkeleton';
import { useGetBooksQuery } from '@/Redux/api/booksApi';
import { Link } from 'react-router-dom';

const BookShowSection = () => {

    const { data: books, isLoading, isError, error } = useGetBooksQuery({ page: 1, limit: 6 })
    if (isError) return <p>Error: {JSON.stringify(error)}</p>

    const data = books as { data: IBook[] }


    const allBooks: IBook[] = data?.data || [];
    return (
        <div>
            <div className='px-5 xl:px-0 max-w-[1140px] mx-auto mt-[100px] flex flex-col items-center gap-y-5'>
                <h1 className="text-primary text-[40px] font-bold mb-[30px] text-center">Books</h1>
                <div className='mt-[30px] place-items-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mx-auto'>
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <BookCardSkeleton key={i}></BookCardSkeleton>
                        )) :
                
                        allBooks.map(book => <BookCard key={book._id} book={book}></BookCard>)
                    }
                </div>
                <Link to={'/books'}><Button className='bg-blue-700 text-white px-8 py-6 my-10' variant="outline">See More</Button></Link>
            </div>
        </div>
    );
};

export default BookShowSection;
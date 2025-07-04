import { Button } from '@/components/ui/button';
import type { IBook } from '@/Interfaces/IBook';
import { useDeleteBookMutation } from '@/Redux/api/booksApi';
import { User, BookOpen, Copy, CheckCircle, XCircle, Edit, Trash2, BookPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

interface BookCardProps {
  book: IBook;
}
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [deleteBook,] = useDeleteBookMutation();


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

  const { _id, image, title, author, genre, description, copies, available } = book
  return (
    <div className="bg-white rounded-lg shadow-2xl hover:shadow-lg group transition-shadow duration-300 overflow-hidden max-w-sm mx-auto pt-5 w-[380px] h-[600px]">
      {/* Book Image */}
      <Link to={`/books/${_id}`}>
        <div className="relative ">
          <img src={image} alt={`${title} cover`} className="w-[380px] h-64 object-contain transform transition-transform duration-300 group-hover:scale-110" />

          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {available ? (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Available
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 ">

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>

        <div className="flex items-center text-gray-600 mb-2">
          <User className="h-4 w-4 mr-2" />
          <span className="text-sm">{author}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <BookOpen className="h-4 w-4 mr-2" />
          <span className="text-sm">{genre}</span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center text-gray-600">
            <Copy className="h-4 w-4 mr-2" />
            <span className="text-sm">Total: <span className="font-semibold">{copies}</span></span>
          </div>

        </div>


        <div className="flex gap-2 mt-4">
          <Link to={`/borrow/${_id}`}><Button className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${available ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!available}>
            <BookPlus className="h-4 w-4" />
            Borrow Book

          </Button>
          </Link>
        </div>

        <div className="flex gap-2 mt-3 bottom-0">
          <Link to={`/edit-book/${book._id}`} className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200" title="Edit Book">
            <Edit className="h-4 w-4" />
            Edit
          </Link>
          <button onClick={() => handleDelete(_id)} className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200" title="Delete Book">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};



export default BookCard;
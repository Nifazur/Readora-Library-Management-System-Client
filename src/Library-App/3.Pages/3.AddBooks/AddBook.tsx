import { BookOpen, User, Tag, FileText, Copy, Upload, Plus } from 'lucide-react';
import Swal from 'sweetalert2'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddBookMutation } from '@/Redux/api/booksApi';
import { useState } from 'react';
import type { Genre } from '@/Interfaces/IBook';
import { Helmet } from 'react-helmet';



const AddBook = () => {
    const [addBook, { isLoading }] = useAddBookMutation()
    const [genreValue, setGenre] = useState<Genre>();

    const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
    const getValue = (form: HTMLFormElement, name: string) =>
        (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value;

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const title = getValue(form, "title");
        const author = getValue(form, "author");
        const description = getValue(form, "description");
        const copies = Number(getValue(form, "copies"));
        const isbn = getValue(form, "isbn")
        const image = getValue(form, "image");
        if (!genreValue) {
            alert("Please select a genre");
            return;
        }
        const book = {
            title,
            author,
            genre: genreValue,
            description,
            copies,
            image,
            isbn,
            available: true,
        }
        try {
            await addBook(book).unwrap();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Book added successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            form.reset();
            setGenre(undefined);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            console.error("Failed to add book:", error);
        }


    };
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>AddBook | READORA</title>
            </Helmet>
            <div className="max-w-2xl mx-auto p-6">
                <Card className='px-8'>
                    <CardHeader className='-ml-5'>
                        <CardTitle className="flex items-center gap-3">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            Create New Book
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={handleOnSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Book Title *
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter book title"
                                required
                            />
                        </div>

                        {/* Author */}
                        <div className="space-y-2">
                            <Label htmlFor="author" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Author *
                            </Label>
                            <Input id="author" name="author" placeholder="Enter author name" required />

                        </div>

                        {/* Genre */}
                        <div className="space-y-2">
                            <Label htmlFor="genre" className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                Genre *
                            </Label>

                            <Select required onValueChange={(value: Genre) => setGenre(value)}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Select a genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genres.map(genre => (
                                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Description *
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Enter book description"
                                required
                            />
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="copies" className="flex items-center gap-2">
                                <Copy className="h-4 w-4" />
                                Total Copies *
                            </Label>
                            <Input
                                type="number"
                                id="copies"
                                name="copies"
                                min="1"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="isbn" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                ISBN *
                            </Label>
                            <Input
                                type="text"
                                id="isbn"
                                name="isbn"
                                placeholder="978-0-000-00000-0"
                                required
                            />
                        </div>



                        {/* Image URL */}
                        <div className="space-y-2">
                            <Label htmlFor="image" className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                Book Cover Image URL
                            </Label>
                            <Input
                                type="url"
                                id="image"
                                name="image"
                                required
                                placeholder="https://example.com/book-cover.jpg"
                            />
                        </div>


                        {/* Action Buttons */}
                        <div className="flex  pt-4">
                            <Button
                                type="submit"
                                className="flex-1"
                            >

                                <Plus className="h-4 w-4 mr-2" />
                                {isLoading ? 'Creating....' : 'Create Book'}


                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddBook;


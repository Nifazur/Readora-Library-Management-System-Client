import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { BookOpen, User, Tag, FileText, Copy, Upload, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetBookQuery, useUpdateBookMutation } from '@/Redux/api/booksApi';
import type { Genre, IBook } from '@/Interfaces/IBook';
import { skipToken } from '@reduxjs/toolkit/query';
import CRUDFormSkeleton from '@/Library-App/0.Components/Skeleton/CRUDFormSkeleton';
import { Helmet } from 'react-helmet';

const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: book, isLoading } = useGetBookQuery(id ?? skipToken);
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();



    const [formState, setFormState] = useState<Partial<IBook>>({
        title: '',
        author: '',
        genre: book?.genre,
        description: '',
        copies: 1,
        image: '',
        isbn: ''
    });

    useEffect(() => {
        if (book) {
            setFormState(book);
        }
    }, [book]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: name === 'copies' ? Number(value) : value,
        }));
    };

    const handleGenreChange = (value: Genre) => {
        setFormState(prev => ({
            ...prev,
            genre: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await updateBook({ id: id, data: formState }).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Book updated!',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/books'); // or wherever your book list is
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update failed!',
                text: 'Something went wrong.',
            });
            console.log(error)
        }
    };

    if (isLoading) return <CRUDFormSkeleton></CRUDFormSkeleton>
    if (!book) return <p>No book found</p>;

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>UpdateBook | READORA</title>
            </Helmet>
            <div className="max-w-2xl mx-auto p-6">
                <Card className="px-8">
                    <CardHeader className="-ml-5">
                        <CardTitle className="flex items-center gap-3">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            Update Book
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Book Title *
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                value={formState.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Author */}
                        <div className="space-y-2">
                            <Label htmlFor="author" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Author *
                            </Label>
                            <Input
                                id="author"
                                name="author"
                                value={formState.author}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Genre */}
                        <div className="space-y-2">
                            <Label htmlFor="genre" className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                Genre *
                            </Label>
                            <Select value={formState.genre} onValueChange={handleGenreChange}>
                                <SelectTrigger className="w-full">
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
                                value={formState.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Copies */}
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
                                value={formState.copies}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* ISBN */}
                        <div className="space-y-2">
                            <Label htmlFor="isbn" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                ISBN *
                            </Label>
                            <Input
                                type="text"
                                id="isbn"
                                name="isbn"
                                value={formState.isbn}
                                onChange={handleChange}
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
                                value={formState.image}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                {isUpdating ? 'Updating...' : 'Update Book'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default UpdateBook;
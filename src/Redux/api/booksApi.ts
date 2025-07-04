import type { IBook } from '@/Interfaces/IBook';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface GetBooksResponse {
    data: IBook[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

interface GetBooksParams {
    page?: number;
    limit?: number;
    filter?: string;
    sortBy?: string;
    sort?: 'asc' | 'desc';
}


export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-server-eta.vercel.app/api/' }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getBooks: builder.query<GetBooksResponse, GetBooksParams>({
            query: ({ page = 1, limit = 10, filter, sortBy = 'createdAt', sort = 'desc' }) => {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(limit),
                    sortBy,
                    sort,
                    ...(filter ? { filter } : {}),
                });

                return `books?${params.toString()}`;
            },
            providesTags: ['Books'],
        }),
        getBook: builder.query<IBook, string>({
            query: (id) => `books/${id}`,
            transformResponse: (response: { data: IBook }) => response.data,
        }),
        addBook: builder.mutation<void, Partial<IBook>>({
            query: (book) => ({
                url: 'books',
                method: 'POST',
                body: book
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: builder.mutation<void, { id: string; data: Partial<IBook> }>({
            query: ({ id, data }) => ({
                url: `books/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: builder.mutation<void, string>({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Books']
        })
    })
})

export const {
    useGetBooksQuery,
    useGetBookQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi
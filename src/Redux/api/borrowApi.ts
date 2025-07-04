import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface BorrowInput {
  book: string
  quantity: number
  dueDate: string
}

interface BorrowSummaryItem {
  _id: string;
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface BorrowSummaryResponse {
  data: BorrowSummaryItem[];
  totalPages: number;
  totalItems: number;
}

export interface BorrowSummaryResponse2 {
  book: string; 
  quantity: number; 
  dueDate: string;
};

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-server-eta.vercel.app/api/' }),
  tagTypes: ['Borrow', 'Books'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<void, BorrowInput>({
      query: (borrowData) => ({
        url: `borrow`,
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow', 'Books']
    }),
    getBorrowSummary: builder.query<BorrowSummaryResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `borrow?limit=${limit}&page=${page}`,
      providesTags: ['Borrow'],
    }),
  }),
})

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi


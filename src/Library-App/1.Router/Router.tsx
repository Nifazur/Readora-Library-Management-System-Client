import {createBrowserRouter} from 'react-router-dom'
import Root from '../3.Pages/0.Root/Root'
import AllBooks from '../3.Pages/2.AllBooks/AllBooks.tsx'
import AddBook from '../3.Pages/3.AddBooks/AddBook.tsx'
import UpdateBook from '../3.Pages/3.AddBooks/UpdateBook.tsx'
import BorrowBook from '../3.Pages/4.BorrowBooks/BorrowBook.tsx'
import BorrowSummary from '../3.Pages/4.BorrowBooks/BorrowSummary.tsx'
import Home from '../3.Pages/1.Home/Home.tsx'
import FullDetailsCard from '../0.Components/Card/FullDetailsCard.tsx'

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/books',
                element:<AllBooks></AllBooks>,
            },
            {
                path: '/create-book',
                element:<AddBook></AddBook>
            },
            {
                path: '/books/:id',
                element:<FullDetailsCard></FullDetailsCard>
            },
            {
                path: '/edit-book/:id',
                element:<UpdateBook></UpdateBook>
            },
            {
                path: '/borrow/:bookId',
                element:<BorrowBook></BorrowBook>
            },
            {
                path: '/borrow-summary',
                element:<BorrowSummary></BorrowSummary>
            },
        ]
    }
])

export default Router
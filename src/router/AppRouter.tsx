import { createBrowserRouter, type RouteObject } from "react-router";
import MainLayout from "../layout/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/TodoPage.tsx";
import CoinPage from "../pages/Coin/CoinPage.tsx";
import MovieHome from "../pages/Movie/MoviePages/MovieHome.tsx";
import MovieSearch from "../pages/Movie/MoviePages/MovieSearch.tsx";
import MovieDetail from "../pages/Movie/MoviePages/MovieDetail.tsx";
import ProductList from "../pages/Product/ProductList.tsx";
import ProductDetail from "../pages/Product/ProductDetail.tsx";
import BookPage from "../pages/Book/BookPage.tsx";
import BookSearch from "../pages/Book/BookSearch.tsx";
import BookDetail from "../pages/Book/BookDetail.tsx";
import BoardPage from "../pages/Board/BoardPage.tsx";
import BoardDetail from "../pages/Board/BoardDetail.tsx";

function AppRouter() {
    const routes: RouteObject[] = [
        {
            element: <MainLayout />,
            path: "/",
            children: [
                { index: true, element: <Home /> },
                { path: "todo", element: <TodoPage /> },
                { path: "coin", element: <CoinPage /> },
                {
                    path: "movie",
                    children: [
                        { index: true, element: <MovieHome /> },
                        { path: "MovieSearch", element: <MovieSearch /> },
                        { path: "MovieDetail/:id", element: <MovieDetail /> },
                    ],
                },
                {
                    path: "product",
                    children: [
                        { index: true, element: <ProductList /> },
                        { path: "productDetail/:id", element: <ProductDetail /> },
                    ],
                },
                {
                    path: "book",
                    children: [
                        { index: true, element: <BookPage /> },
                        { path: "bookSearch", element: <BookSearch /> },
                        { path: `bookDetail/:id`, element: <BookDetail /> },
                    ],
                },
                {
                    path: "board",
                    children: [
                        { index: true, element: <BoardPage /> },
                        { path: "boardDetail/:id", element: <BoardDetail /> },
                    ],
                }
            ],
        },
    ];
    return createBrowserRouter(routes);
}

export default AppRouter;

import { createBrowserRouter, type RouteObject } from "react-router";
import MainLayout from "../layout/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/TodoPage.tsx";
import CoinPage from "../pages/Coin/CoinPage.tsx";
import MovieHome from "../pages/Movie/MoviePages/MovieHome.tsx";
import MovieSearch from "../pages/Movie/MoviePages/MovieSearch.tsx";
import MovieDetail from "../pages/Movie/MoviePages/MovieDetail.tsx";

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
                        { index: true, element: <MovieHome /> }, // /movie
                        { path: "MovieSearch", element: <MovieSearch /> }, // /movie/MovieSearch
                        { path: "MovieDetail/:id", element: <MovieDetail /> }, // /movie/MovieDetail/:id
                    ],
                },
                // { path: "rocket", element: <ProductPage /> },
                // { path: "book", element: <BookPage /> }
            ],
        },
    ];
    return createBrowserRouter(routes);
}

export default AppRouter;

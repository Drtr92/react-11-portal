import { createBrowserRouter, type RouteObject } from "react-router";
import MainLayout from "../layout/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/Todo/TodoPage.tsx";

function AppRouter() {
    const routes: RouteObject[] = [
        {
            element: <MainLayout />,
            path: "/",
            children: [
                { index: true, element: <Home /> },
                { path: "todo", element: <TodoPage /> },
                // { path: "coin", element: <CoinPage /> },
                // { path: "movie", element: <MoviePage /> },
                // { path: "rocket", element: <ProductPage /> },
                // { path: "book", element: <BookPage /> }
            ],
        },
    ];
        return createBrowserRouter(routes);
};

export default AppRouter;
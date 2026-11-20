import GlobalStyle from "./styles/GlobalStyle.ts";
import { RouterProvider } from "react-router";
import AppRouter from "./router/AppRouter.tsx";
import { ThemeContextProvider } from "./contexts/theme/ThemeContexts.tsx";

function App() {
    return (
        <ThemeContextProvider>
            <GlobalStyle />
            <RouterProvider router={AppRouter()} />
        </ThemeContextProvider>
    );
}

export default App;

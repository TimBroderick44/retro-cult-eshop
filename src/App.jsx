import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import GameDetailsPage from "./pages/GameDetailsPage/GameDetailsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import GamesPage from "./pages/GamesPage/GamesPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import StarsCanvas from "./components/Stars/Stars.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";

function App() {
    return (
        <DataProvider>
            <SearchProvider>
                <CartProvider>
                    <BrowserRouter>
                        <StarsCanvas />
                        <NavBar />
                        <Routes>
                            <Route path="/RetroCult/" element={<LandingPage />} />
                            <Route path="/RetroCult/cart" element={<CartPage />} />
                            <Route path="/RetroCult/games" element={<GamesPage />} />
                            <Route
                                path="/RetroCult/games/:slug"
                                element={<GameDetailsPage />}
                            />
                            <Route path="/RetroCult/login" element={<LoginPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </SearchProvider>
        </DataProvider>
    );
}

export default App;

// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchSection from "./sections/SearchSection";
import MoviesPage from "./pages/MoviesPage";
import NotFound from "./pages/NotFound";
import CommentPage from "./pages/CommentPage";

import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";   // ← добавили

import { MoviesProvider } from "./context/MoviesContext.tsx";
import {useThemeStore} from "./themeStore";

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <MoviesProvider>
      <BrowserRouter>
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<SearchSection />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/comments" element={<CommentPage />} />

            {/* Защищённая страница */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </MoviesProvider>
  );
}

export default App;
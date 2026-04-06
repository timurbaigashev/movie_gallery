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

import { MoviesProvider } from "./context/MoviesContext";

function App() {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    return prefersLight ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navbarProps = useMemo(
    () => ({ theme, onToggleTheme: toggleTheme }),
    [theme]
  );

  return (
    <MoviesProvider>
      <BrowserRouter>
        <Navbar {...navbarProps} />

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
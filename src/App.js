import { useEffect, useState } from "react";
import "./App.css";

import { Navbar, Footer, IntroOverlay, ControlCenter } from "./components";
import { MovieSection } from "./sections";


export default function App() {
  // Task 6: global theme
  const [theme, setTheme] = useState(() => localStorage.getItem("mg_theme") || "dark");

  // Intro overlay state
  const [introDone, setIntroDone] = useState(false);

  // Control Center
  const [ccOpen, setCcOpen] = useState(false);

  // Task 1: counter (watchlist)
  const [watchCount, setWatchCount] = useState(0);

  // Task 3: prefs
  const [prefs, setPrefs] = useState({
    autoplay: true,
    subtitles: false,
    hd: true,
    notifications: false,
  });

  // Task 4: profile editor
  const [profile, setProfile] = useState({
    name: "Timur",
    role: "Movie Explorer",
    about: "Building a cinematic movie gallery.",
  });

  const LS_REVIEWS = "mg_reviews_by_movie_v1";

  const [reviewsByMovie, setReviewsByMovie] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_REVIEWS)) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_REVIEWS, JSON.stringify(reviewsByMovie));
    } catch { }
  }, [reviewsByMovie]);

  useEffect(() => {
    localStorage.setItem("mg_theme", theme);
  }, [theme]);


  return (
    <div className="appContainer" data-theme={theme}>

      {/* Intro Overlay plays first, site mounts underneath */}
      <IntroOverlay open={!introDone} onDone={() => setIntroDone(true)} />

      <Navbar
        onOpenControl={() => setCcOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
      />

      <main className={`appMain ${introDone ? "ready" : "preloading"}`}>

        <MovieSection
          theme={theme}
          prefs={prefs}
          setPrefs={setPrefs}
          watchCount={watchCount}
          setWatchCount={setWatchCount}
          profile={profile}
          setProfile={setProfile}
          reviewsByMovie={reviewsByMovie}
          setReviewsByMovie={setReviewsByMovie}
        />
      </main>

      <Footer />

      <ControlCenter
        open={ccOpen}
        onClose={() => setCcOpen(false)}
        profile={profile}
        reviewsByMovie={reviewsByMovie}
      />

    </div>
  );
}

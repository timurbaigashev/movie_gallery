import { useEffect, useRef, useState } from "react";
import styles from "./movies.module.css";

import { MovieCard } from "../../components";
import { fetchAllMovies, fetchMovieDetails } from "../../api/moviesApi";

async function mapLimit(arr, limit, fn) {
  const res = [];
  let i = 0;
  const workers = new Array(Math.min(limit, arr.length)).fill(0).map(async () => {
    while (i < arr.length) {
      const idx = i++;
      res[idx] = await fn(arr[idx], idx);
    }
  });
  await Promise.all(workers);
  return res;
}



export default function MovieSection({
  prefs,
  setPrefs,
  watchCount,
  setWatchCount,
  profile,
  setProfile,
  reviewsByMovie,
  setReviewsByMovie,
}) {
  const [q, setQ] = useState("interstellar");
  const [query, setQuery] = useState("interstellar");
  const [page, setPage] = useState(1);

  const [minRating, setMinRating] = useState(7.5);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);


  // Task 7 mock
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trending, setTrending] = useState([]);

  // Task 9 timer
  const [sec, setSec] = useState(60);

  // Task 10 window size
  const [win, setWin] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));

  // details cache
  const detailsCacheRef = useRef(new Map());

  // inline composer state
  const [activeMovie, setActiveMovie] = useState(null); // {id, title}
  const [reviewText, setReviewText] = useState("");
  const inputRef = useRef(null);


  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setErr(null);

      try {
        const res = await fetchAllMovies(query, { maxPages: 20, signal: controller.signal });
        if (cancelled) return;

        const searchItems = res.items;

        const normalized = await mapLimit(searchItems, 4, async (m) => {
          const id = m?.imdbID;
          if (!id) return null;

          const cached = detailsCacheRef.current.get(id);
          if (cached) return cached;

          // детали, чтобы получить imdbRating
          let d;
          try {
            d = await fetchMovieDetails(id);
          } catch {
            d = null;
          }

          const n = {
            id,
            title: d?.Title || m?.Title || "Untitled",
            poster: (d?.Poster && d.Poster !== "N/A")
              ? d.Poster
              : (m?.Poster && m.Poster !== "N/A" ? m.Poster : ""),
            releaseDate: d?.Released || d?.Year || m?.Year || "—",
            rating: Number(d?.imdbRating) ? Number(d.imdbRating) : 0,
          };

          detailsCacheRef.current.set(id, n);
          return n;
        });

        if (cancelled) return;

        const filtered = normalized
          .filter(Boolean)
          .filter((x) => x.rating >= Number(minRating || 0));

        setItems(filtered);

        if (res.capped) {
          setErr(`Loaded first ${res.loadedPages * 10} results (cap). Narrow the query for more.`);
        }
      } catch (e) {
        if (cancelled) return;
        const msg = String(e?.message || "Failed to load");
        if (msg.toLowerCase().includes("too many results")) {
          setErr("Too many results. Please type a more specific query.");
        } else if (msg !== "Aborted") {
          setErr(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [query, minRating]);

  // Task 7 mock feed
  useEffect(() => {
    const t = setTimeout(() => {
      setTrending(["Trending: Sci-Fi night", "Trending: Nolan", "Trending: Mind-benders"]);
      setTrendingLoading(false);
    }, 850);
    return () => clearTimeout(t);
  }, []);

  // Task 9 countdown
  useEffect(() => {
    const id = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  // Task 10 resize
  useEffect(() => {
    const onResize = () => setWin({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function submit(e) {
    e.preventDefault();
    const v = q.trim();
    if (!v) return;
    setPage(1);
    setQuery(v);
  }

  function openInlineReview(movie) {
    setActiveMovie({ id: movie.id, title: movie.title });
    setReviewText("");
    setTimeout(() => inputRef.current?.focus(), 0);
    setTimeout(() => {
      document
        .getElementById("inline-review")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function addInlineReview() {
    const text = reviewText.trim();
    if (!text || !activeMovie?.id) return;

    const author = profile?.name?.trim() || "Guest";
    const entry = {
      id: `${Date.now()}_${Math.random()}`,
      author,
      text,
      ts: Date.now(),
      movieTitle: activeMovie.title,
    };

    setReviewsByMovie((prev) => {
      const current = Array.isArray(prev?.[activeMovie.id]) ? prev[activeMovie.id] : [];
      return { ...(prev || {}), [activeMovie.id]: [entry, ...current].slice(0, 50) };
    });

    setReviewText("");
  }

  const activeList = activeMovie?.id ? reviewsByMovie?.[activeMovie.id] || [] : [];

  return (
    <section id="movies" className={styles.section}>
      <div className={styles.topRow}>
        <div>
          <h2 className={styles.h2}>Now Showing</h2>
          <div className={styles.sub}>
            {prefs.hd ? "HD" : "SD"} • {prefs.subtitles ? "Subtitles" : "No subs"} • Auto-play{" "}
            {prefs.autoplay ? "On" : "Off"}
          </div>
        </div>

        <div className={styles.telemetry}>
          <div className={styles.teleCard}>
            <div className={styles.teleK}>Session</div>
            <div className={styles.teleV}>{sec}s</div>
          </div>
          <div className={styles.teleCard}>
            <div className={styles.teleK}>Viewport</div>
            <div className={styles.teleV}>
              {win.w}×{win.h}
            </div>
          </div>
          <div className={styles.teleCard}>
            <div className={styles.teleK}>Watchlist</div>
            <div className={styles.teleV}>{watchCount}</div>
          </div>
        </div>
      </div>

      <form className={styles.search} onSubmit={submit}>
        <input
          className={styles.input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search movies… (OMDb)"
        />

        <button
          type="button"
          className={styles.pill}
          onClick={() => setPrefs({ ...prefs, autoplay: !prefs.autoplay })}
        >
          Auto {prefs.autoplay ? "On" : "Off"}
        </button>

        <button
          type="button"
          className={styles.pill}
          onClick={() => setPrefs({ ...prefs, subtitles: !prefs.subtitles })}
        >
          Subs {prefs.subtitles ? "On" : "Off"}
        </button>

        <button
          type="button"
          className={styles.pill}
          onClick={() => setPrefs({ ...prefs, hd: !prefs.hd })}
        >
          HD {prefs.hd ? "On" : "Off"}
        </button>

        <div className={styles.ratingBox} title="Min IMDb rating">
          <span className={styles.ratingLabel}>Min ★</span>
          <input
            className={styles.range}
            type="range"
            min="0"
            max="9.5"
            step="0.5"
            value={minRating}
            onChange={(e) => {
              setPage(1);
              setMinRating(Number(e.target.value));
            }}
          />
          <span className={styles.ratingValue}>{minRating.toFixed(1)}</span>
        </div>

        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>

      <div className={styles.metaRow}>
        <div className={styles.status}>
          {loading ? "Loading…" : err ? `Info: ${err}` : `Found: ${items.length}`}
        </div>
      </div>


      <div className={styles.grid}>
        {items.map((movie) => {
          const count = (reviewsByMovie?.[movie.id] || []).length;

          return (
            <div key={movie.id} className={styles.cardWrap}>
              <MovieCard
                title={movie.title}
                poster={movie.poster}
                releaseDate={movie.releaseDate}
                rating={movie.rating}
                onOpen={() => openInlineReview(movie)}
              />
              <div className={styles.cardActions}>
                <button
                  className={styles.smallBtn}
                  type="button"
                  onClick={() => setWatchCount((c) => c + 1)}
                >
                  + Watchlist
                </button>

                <button
                  className={styles.smallBtn}
                  type="button"
                  onClick={() => openInlineReview(movie)}
                >
                  + Review {count ? `(${count})` : ""}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div id="inline-review" className={styles.inlineReview}>
        <div className={styles.inlineHeader}>
          <div>
            <div className={styles.inlineTitle}>Write a review</div>
            <div className={styles.inlineSub}>
              {activeMovie ? `For: ${activeMovie.title}` : "Pick a movie and press “+ Review”"}
            </div>
          </div>

          <div className={styles.profileChip}>
            <div className={styles.avatar}>{(profile?.name?.trim()?.[0] || "G").toUpperCase()}</div>
            <div className={styles.profileMeta}>
              <div className={styles.profileName}>{profile?.name || "Guest"}</div>
              <div className={styles.profileRole}>{profile?.role || "Movie Explorer"}</div>
            </div>
          </div>
        </div>

        <div className={styles.inlineRow}>
          <textarea
            ref={inputRef}
            className={styles.textarea}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder={activeMovie ? "Type your review…" : "Select a movie first…"}
            disabled={!activeMovie}
          />
          <button
            className={styles.primaryBtn}
            type="button"
            onClick={addInlineReview}
            disabled={!activeMovie || !reviewText.trim()}
          >
            Post
          </button>
        </div>

        {activeMovie ? (
          <div className={styles.inlineList}>
            {activeList.length ? (
              activeList.map((r) => (
                <div key={r.id} className={styles.reviewItem}>
                  <div className={styles.reviewMeta}>
                    <span className={styles.reviewAuthor}>{r.author}</span>
                    <span className={styles.reviewTime}>{new Date(r.ts).toLocaleString()}</span>
                  </div>
                  <div className={styles.reviewText}>{r.text}</div>
                </div>
              ))
            ) : (
              <div className={styles.reviewEmpty}>No reviews yet.</div>
            )}
          </div>
        ) : null}
      </div>

      <div className={styles.trending}>
        <div className={styles.trTitle}>Trending (mock feed)</div>
        {trendingLoading ? (
          <div className={styles.trItem}>Loading…</div>
        ) : (
          trending.map((t) => (
            <div key={t} className={styles.trItem}>
              {t}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

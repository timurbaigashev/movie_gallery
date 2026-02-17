import styles from "./controlCenter.module.css";
function pickTitle(list) {
    return (
        list?.[0]?.movieTitle ||
        list?.find((x) => x?.movieTitle)?.movieTitle ||
        "Unknown title"
    );
}
export default function ControlCenter({ open, onClose, profile, reviewsByMovie }) {

    if (!open) return null;

    const groups = Object.entries(reviewsByMovie || {}).map(([movieId, list]) => {
        const safeList = Array.isArray(list) ? list : [];
        const movieTitle = pickTitle(safeList);
        const latestTs = safeList.length ? Math.max(...safeList.map((x) => x?.ts || 0)) : 0;

        return { movieId, movieTitle, list: safeList, latestTs };
    }).sort((a, b) => b.latestTs - a.latestTs);



    return (
        <div className={styles.overlay} onMouseDown={onClose} role="presentation">
            <div className={styles.panel} onMouseDown={(e) => e.stopPropagation()} role="presentation">
                <div className={styles.top}>
                    <div className={styles.title}>Control Center</div>
                    <button className={styles.close} type="button" onClick={onClose}>✕</button>
                </div>

                <div className={styles.block}>
                    <div className={styles.blockTitle}>Profile</div>
                    <div className={styles.kv}>
                        <div className={styles.k}>Name</div><div className={styles.v}>{profile?.name || "Guest"}</div>
                        <div className={styles.k}>Role</div><div className={styles.v}>{profile?.role || "—"}</div>
                        <div className={styles.k}>About</div><div className={styles.v}>{profile?.about || "—"}</div>
                    </div>
                </div>

                <div className={styles.block}>
                    <div className={styles.blockTitle}>All reviews by movie</div>

                    {groups.length ? (
                        groups.map((g) => (
                            <div key={g.movieId} className={styles.movieGroup}>
                                {/* ✅ Movie: TITLE (id мелко справа) */}
                                <div className={styles.movieId}>
                                    Movie: {g.movieTitle}{" "}
                                    <span className={styles.movieIdSmall}>({g.movieId})</span>
                                </div>

                                <div className={styles.items}>
                                    {g.list.slice(0, 12).map((r) => (
                                        <div key={r.id} className={styles.item}>
                                            <div className={styles.itemMeta}>
                                                <span className={styles.author}>{r.author}</span>
                                                <span className={styles.time}>{new Date(r.ts).toLocaleString()}</span>
                                            </div>
                                            <div className={styles.text}>{r.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>No reviews yet.</div>
                    )}

                </div>
            </div>
        </div>
    );
}

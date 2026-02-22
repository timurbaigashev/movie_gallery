import { useEffect, useRef, useState } from "react";
import styles from "./introOverlay.module.css";

export default function IntroOverlay({ open, onDone }) {
    const videoRef = useRef(null);
    const [canPlay, setCanPlay] = useState(true);

    useEffect(() => {
        if (!open) return;

        const v = videoRef.current;
        if (!v) return;

        const handleEnded = () => onDone?.();
        const handleError = () => {
            setCanPlay(false);
            // fallback: close after a short time if video missing
            setTimeout(() => onDone?.(), 600);
        };

        v.addEventListener("ended", handleEnded);
        v.addEventListener("error", handleError);

        // attempt autoplay (muted)
        v.play().catch(() => { });

        return () => {
            v.removeEventListener("ended", handleEnded);
            v.removeEventListener("error", handleError);
        };
    }, [open, onDone]);

    if (!open) return null;

    return (
        <div className={styles.overlay}>
            {canPlay ? (
                <video
                    ref={videoRef}
                    className={styles.video}
                    src="/intro.mp4"
                    muted
                    playsInline
                    preload="auto"
                />
            ) : (
                <div className={styles.fallback}>
                    <div className={styles.brand}>Movie Gallery</div>
                    <div className={styles.sub}>Loading…</div>
                </div>
            )}
        </div>
    );
}

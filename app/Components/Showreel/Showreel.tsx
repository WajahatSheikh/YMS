"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "@/app/contexts/LenisContext";
import style from "./index.module.scss";

// 03 · Showreel — Figma node 143:783
//
// Component note (118:250): "Scroll-reactive showreel, Calendly-style. Rest
// 1141×656 → Expanded 1720×880 with a dismiss control. ⚠️ Figma has NO
// scroll-position trigger. Rest→Expanded is wired on a timeout only to demo the
// motion; in code drive it from scroll progress."
//
// Rest    → a short muted loop plays in the card; its size follows scroll progress.
// Tap     → the full MP4 mounts and takes the full canvas (fixed, inset from the
//           viewport edges) with a dismiss control top-right, as Calendly does.
// Dismiss → full video unmounts, the loop resumes, scroll drives the card again.
//
// The loop used to be a 41MB GIF. It is now a 4.8MB H.264 MP4 made from the
// same 466 frames, with preload="none" and a lazily attached poster, so nothing heavy downloads
// until the section is about to be seen. The full MP4 (~33MB) still only mounts
// on tap, so visitors who never press play never download it.

const LOOP_SRC = "/assets/videos/showreel-loop.mp4";
const POSTER_SRC = "/assets/images/showreel-poster.webp";
const VIDEO_SRC = "/assets/videos/yms%20video%20v2.mp4";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

const Showreel = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const loopRef = useRef<HTMLVideoElement>(null);
    const frameRef = useRef<number | null>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLSpanElement>(null);

    const [playing, setPlaying] = useState(false);
    const [showPoster, setShowPoster] = useState(false);
    const lenis = useLenis();

    const setProgress = useCallback((p: number) => {
        stageRef.current?.style.setProperty("--reel-progress", String(p));
    }, []);

    // Scroll-linked growth of the resting card.
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setProgress(1);
            return;
        }

        const update = () => {
            frameRef.current = null;
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;
            // Grows from the moment its top clears the viewport bottom until it
            // has risen to the top quarter of the screen.
            setProgress(clamp01((vh - rect.top) / (vh - vh * 0.25)));
        };

        const onScroll = () => {
            if (frameRef.current === null) frameRef.current = requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        };
    }, [setProgress]);

    // ── Magnetic play badge ───────────────────────────────────────────────────
    // The badge trails the cursor while it is over the card. A raw 1:1 follow
    // looks cheap, so it eases toward the pointer each frame (lerp) and eases
    // back to centre on leave. Pointer-driven only — skipped on touch and when
    // reduced motion is requested.
    useEffect(() => {
        const media = mediaRef.current;
        const badge = badgeRef.current;
        if (!media || !badge) return;

        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduced) return;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let raf: number | null = null;

        const tick = () => {
            // Ease 18% of the remaining distance per frame.
            currentX += (targetX - currentX) * 0.18;
            currentY += (targetY - currentY) * 0.18;

            badge.style.setProperty("--bx", `${currentX.toFixed(2)}px`);
            badge.style.setProperty("--by", `${currentY.toFixed(2)}px`);

            if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                raf = requestAnimationFrame(tick);
            } else {
                raf = null;
            }
        };

        const start = () => {
            if (raf === null) raf = requestAnimationFrame(tick);
        };

        const onMove = (e: PointerEvent) => {
            const rect = media.getBoundingClientRect();
            // Offset from the card's centre, damped so the badge stays well
            // inside the card rather than chasing the edges.
            targetX = (e.clientX - (rect.left + rect.width / 2)) * 0.55;
            targetY = (e.clientY - (rect.top + rect.height / 2)) * 0.55;
            start();
        };

        const onLeave = () => {
            targetX = 0;
            targetY = 0;
            start();
        };

        media.addEventListener("pointermove", onMove);
        media.addEventListener("pointerleave", onLeave);

        return () => {
            media.removeEventListener("pointermove", onMove);
            media.removeEventListener("pointerleave", onLeave);
            if (raf !== null) cancelAnimationFrame(raf);
        };
    }, []);

    // The poster downloads the moment the attribute exists (preload="none" only
    // covers the video), so it is attached once the card is about to be seen,
    // not during page load.
    useEffect(() => {
        const loop = loopRef.current;
        if (!loop) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setShowPoster(true);
                observer.disconnect();
            },
            { rootMargin: "600px 0px" }
        );
        observer.observe(loop);
        return () => observer.disconnect();
    }, []);

    // Play the resting loop only while it is near the viewport and the full
    // video is closed. Reduced-motion visitors keep the poster.
    useEffect(() => {
        const loop = loopRef.current;
        if (!loop) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (playing) {
            loop.pause();
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loop.muted = true;
                    void loop.play().catch(() => {});
                } else {
                    loop.pause();
                }
            },
            { rootMargin: "200px 0px" }
        );
        observer.observe(loop);
        return () => observer.disconnect();
    }, [playing]);

    const close = useCallback(() => setPlaying(false), []);

    // While the overlay is open: lock the page, pause Lenis, and wire Escape.
    useEffect(() => {
        if (!playing) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        lenis?.stop();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", onKey);

        const video = videoRef.current;
        if (video) {
            video.muted = false;
            video.volume = 1;
            void video.play().catch(() => {
                // Sound can still be refused — keep playing rather than not at all.
                video.muted = true;
                void video.play().catch(() => {});
            });
        }

        return () => {
            document.body.style.overflow = previousOverflow;
            lenis?.start();
            document.removeEventListener("keydown", onKey);
        };
    }, [playing, lenis, close]);

    return (
        // Dark island: the reel, its controls and the overlay are video UI.
        <section
            id="showreel"
            ref={sectionRef}
            className={style.section}
            aria-labelledby="showreel-title"
            data-theme="dark"
        >
            {/* The design has no visible title here; the heading keeps the
                page outline complete for search engines and screen readers. */}
            <h2 id="showreel-title" className="sr-only">
                YourMomStudio showreel: product design and development work
            </h2>

            {/* Resting card — the muted loop */}
            <div ref={stageRef} className={style.stage}>
                <div ref={mediaRef} className={style.media}>
                    <button className={style.poster} onClick={() => setPlaying(true)} aria-label="Play showreel">
                        <video
                            ref={loopRef}
                            className={style.gif}
                            src={LOOP_SRC}
                            poster={showPoster ? POSTER_SRC : undefined}
                            width={1600}
                            height={900}
                            muted
                            loop
                            playsInline
                            preload="none"
                            aria-hidden="true"
                            tabIndex={-1}
                        />
                        <span ref={badgeRef} className={style.playBadgeWrap} aria-hidden="true">
                            <span className={style.playBadge}>
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
                                </svg>
                            </span>
                        </span>
                    </button>
                </div>
            </div>

            {/* Playing — full canvas, inset from the viewport edges */}
            {playing && (
                <div className={style.overlay} role="dialog" aria-modal="true" aria-label="Showreel video">
                    <div className={style.overlayPanel}>
                        <video
                            ref={videoRef}
                            className={style.video}
                            src={VIDEO_SRC}
                            autoPlay
                            controls
                            playsInline
                            preload="auto"
                        />
                        <button className={style.dismiss} onClick={close} aria-label="Close video">
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d="M18 6L6 18M6 6l12 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Showreel;

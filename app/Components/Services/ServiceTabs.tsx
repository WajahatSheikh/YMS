"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import style from "./index.module.scss";

// Services we offer: a row of icon tabs above one large card.
//
// The active icon grows and joins the card with a stem. The tabs advance on
// their own: a ring around the active icon fills over ROTATE_MS, and when it
// completes the next service opens (the ring's animationend is the only timer).
// The rotation pauses while the pointer is over the band, while focus is inside
// it, while the band is off screen or the tab is hidden, and stops for good as
// soon as the visitor picks a tab, uses the arrow keys or swipes. Under reduced
// motion it never starts.
//
// Every panel is rendered on the server and kept in the HTML (inactive ones
// `hidden`), so crawlers read all seven services.

const ROTATE_MS = 7000;

export interface ServiceTab {
    slug: string;
    title: string;
    icon: React.ReactNode;
    panel: React.ReactNode;
}

const ActiveContext = createContext(false);

/** The service's preview: a still, with its reel fading in while the card is showing and on screen. */
export const ServiceReel = ({ src, poster, alt }: { src: string; poster: string; alt: string }) => {
    const active = useContext(ActiveContext);
    const ref = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "120px 0px" });
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        if (active && inView && !reduced && !saveData) {
            if (!video.src) video.src = src;
            video.muted = true;
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [active, inView, src]);

    return (
        <>
            <Image src={poster} alt={alt} width={640} height={440} sizes="(max-width: 991px) 92vw, 600px" />
            <video
                ref={ref}
                className={`${style.reel} ${playing ? style.reelOn : ""}`}
                muted
                loop
                playsInline
                preload="none"
                tabIndex={-1}
                aria-hidden="true"
                onPlaying={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
            />
        </>
    );
};

export default function ServiceTabs({ items }: { items: ServiceTab[] }) {
    const [active, setActive] = useState(0);
    const [auto, setAuto] = useState(false);
    const [held, setHeld] = useState({ pointer: false, focus: false, offscreen: true, hidden: false });
    const [dir, setDir] = useState<1 | -1>(1);
    const bandRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const swipe = useRef<{ x: number; y: number } | null>(null);

    const count = items.length;
    const paused = held.pointer || held.focus || held.offscreen || held.hidden;

    // Rotation only where it can be seen, and never under reduced motion.
    useEffect(() => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(true);
        const band = bandRef.current;
        if (!band) return;
        const observer = new IntersectionObserver(([entry]) => setHeld((h) => ({ ...h, offscreen: !entry.isIntersecting })), { threshold: 0.35 });
        observer.observe(band);
        const onVisibility = () => setHeld((h) => ({ ...h, hidden: document.hidden }));
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    const go = useCallback(
        (next: number, { user = true, focus = false } = {}) => {
            const index = (next + count) % count;
            setDir(index > active || (active === count - 1 && index === 0) ? 1 : -1);
            setActive(index);
            if (user) setAuto(false);
            if (focus) tabRefs.current[index]?.focus();
        },
        [active, count]
    );

    const onKeyDown = (event: React.KeyboardEvent) => {
        const target = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 }[event.key];
        if (target === undefined) return;
        event.preventDefault();
        go(target, { focus: true });
    };

    // Swipe the card on touch screens.
    const onPointerDown = (event: React.PointerEvent) => {
        if (event.pointerType !== "mouse") swipe.current = { x: event.clientX, y: event.clientY };
    };
    const onPointerUp = (event: React.PointerEvent) => {
        const start = swipe.current;
        swipe.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(event.clientY - start.y) * 1.4) go(active + (dx < 0 ? 1 : -1));
    };

    return (
        <div
            ref={bandRef}
            className={style.band}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHeld((h) => ({ ...h, pointer: true }))}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHeld((h) => ({ ...h, pointer: false }))}
            onFocus={() => setHeld((h) => ({ ...h, focus: true }))}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld((h) => ({ ...h, focus: false }));
            }}
            style={{ "--rotate": `${ROTATE_MS}ms` } as React.CSSProperties}
            data-auto={auto || undefined}
            data-paused={paused || undefined}
        >
            <div className={style.picker}>
                <div className={style.tabs} role="tablist" aria-label="Services we offer" onKeyDown={onKeyDown}>
                    {items.map((item, i) => (
                        <button
                            key={item.slug}
                            ref={(el) => {
                                tabRefs.current[i] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`service-tab-${item.slug}`}
                            aria-selected={i === active}
                            aria-controls={`service-panel-${item.slug}`}
                            tabIndex={i === active ? 0 : -1}
                            className={`${style.tab} ${i === active ? style.tabOn : ""}`}
                            onClick={() => go(i)}
                        >
                            <span className={style.tabIcon}>
                                {item.icon}
                                {/* The timer: a ring that follows the tab's own rounded-square
                                    outline (it starts at the top edge and runs clockwise). */}
                                {i === active && (
                                    <svg className={style.ring} viewBox="0 0 70 70" aria-hidden="true">
                                        <rect
                                            key={`${active}-${auto}`}
                                            className={style.ringFill}
                                            x="1.5"
                                            y="1.5"
                                            width="67"
                                            height="67"
                                            rx="24"
                                            pathLength={100}
                                            onAnimationEnd={() => auto && go(active + 1, { user: false })}
                                        />
                                    </svg>
                                )}
                            </span>
                            <span className={style.tabName}>{item.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={style.cardWrap} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipe.current = null)}>
                {items.map((item, i) => (
                    <div
                        key={item.slug}
                        role="tabpanel"
                        id={`service-panel-${item.slug}`}
                        aria-labelledby={`service-tab-${item.slug}`}
                        hidden={i !== active}
                        className={style.card}
                        data-dir={dir}
                    >
                        <ActiveContext.Provider value={i === active}>{item.panel}</ActiveContext.Provider>
                    </div>
                ))}
            </div>

        </div>
    );
}

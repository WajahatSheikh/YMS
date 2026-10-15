"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import style from "./index.module.scss";

// The capability explorer — the only stateful part of the Services section.
//
// One markup, two layouts (index.module.scss):
//   ≥992px  an index of services on the left and a showcase stage on the
//           right. Every panel shares the stage's grid cell; only the active
//           one is visible, so switching cross-fades with no layout jump.
//           Hovering a service (after a short intent delay) or focusing it
//           switches the stage; arrow keys move through the list.
//   <992px  accordion cards: a service opens in place, then scrolls into view.
//
// Each panel's content (reel, copy, tags, CTA) is rendered on the server and
// passed in. ServiceVideo reads its panel's open state from context, so a reel
// only plays while its service is the one being shown — and on screen.

export interface Capability {
    title: string;
    label?: string;
    panel: React.ReactNode;
}

const DESKTOP_QUERY = "(min-width: 992px)";
const HOVER_INTENT_MS = 160;
const NAVBAR_HEIGHT = 92;

const PanelOpenContext = createContext(false);

// Reel for a panel. preload="none" means an unopened service costs nothing; the
// poster is attached and the file fetched the first time it's shown. It plays
// only while its panel is open AND on screen, and never for people who've asked
// for reduced motion — they get the poster.
export const ServiceVideo = ({ src, poster }: { src: string; poster: string }) => {
    const playing = useContext(PanelOpenContext);
    const ref = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);
    const [showPoster, setShowPoster] = useState(false);

    useEffect(() => {
        if (playing && inView) setShowPoster(true);
    }, [playing, inView]);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
            rootMargin: "200px 0px"
        });
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (playing && inView && !reduceMotion) {
            // Autoplay needs muted set as a property at call time, not just the attribute.
            video.muted = true;
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [playing, inView]);

    return (
        <video
            ref={ref}
            src={src}
            poster={showPoster ? poster : undefined}
            width={640}
            height={440}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
        />
    );
};

const PlusIcon = () => (
    <svg className={style.plus} viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3.75 9h10.5M9 3.75v10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ArrowIcon = () => (
    <svg className={style.arrow} viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CapabilityExplorer = ({ items }: { items: Capability[] }) => {
    const [active, setActive] = useState<number | null>(0);
    const [revealed, setRevealed] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const triggers = useRef<(HTMLButtonElement | null)[]>([]);
    const hoverTimer = useRef<number | null>(null);

    const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

    // The two-pane layout always shows one service; if the visitor collapsed
    // everything on a narrow screen and then widened it, bring the first back.
    useEffect(() => {
        const query = window.matchMedia(DESKTOP_QUERY);
        const onChange = () => {
            if (query.matches) setActive((current) => current ?? 0);
        };
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    // The list rises in once, staggered, as it enters the viewport.
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setRevealed(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setRevealed(true);
                observer.disconnect();
            },
            { threshold: 0.12 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => () => {
        if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    }, []);

    const select = (index: number) => {
        if (isDesktop()) {
            setActive(index);
            return;
        }
        // Accordion: toggle, then bring the opened card's header into view once
        // the previous card has finished collapsing above it.
        setActive((current) => (current === index ? null : index));
        window.setTimeout(() => {
            const trigger = triggers.current[index];
            if (!trigger) return;
            const top = trigger.getBoundingClientRect().top;
            if (top < NAVBAR_HEIGHT || top > window.innerHeight * 0.55) {
                window.scrollTo({ top: top + window.scrollY - NAVBAR_HEIGHT - 12, behavior: "smooth" });
            }
        }, 380);
    };

    // Desktop with a mouse: hovering a service shows it, after a short delay so
    // sweeping the cursor across the list doesn't flicker through every stage.
    const onHover = (index: number) => {
        if (!isDesktop() || !window.matchMedia("(hover: hover)").matches) return;
        if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => setActive(index), HOVER_INTENT_MS);
    };

    const cancelHover = () => {
        if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
        hoverTimer.current = null;
    };

    // Up/Down/Home/End move through the list; on desktop focus also switches
    // the stage, so keyboard users browse exactly like mouse users.
    const onKeyDown = (event: React.KeyboardEvent, index: number) => {
        const last = items.length - 1;
        const next =
            event.key === "ArrowDown" ? Math.min(last, index + 1)
            : event.key === "ArrowUp" ? Math.max(0, index - 1)
            : event.key === "Home" ? 0
            : event.key === "End" ? last
            : null;
        if (next === null) return;
        event.preventDefault();
        triggers.current[next]?.focus();
        if (isDesktop()) setActive(next);
    };

    return (
        <div
            ref={rootRef}
            className={`${style.explorer} ${revealed ? style.revealed : ""}`}
            onPointerLeave={cancelHover}
        >
            {items.map((item, index) => {
                const open = active === index;
                const number = String(index + 1).padStart(2, "0");
                const triggerId = `capability-trigger-${index}`;
                const panelId = `capability-panel-${index}`;

                return (
                    <div
                        key={item.title}
                        className={`${style.item} ${open ? style.open : ""}`}
                        style={{ "--i": index } as React.CSSProperties}
                    >
                        <h3 className={style.itemHeading}>
                            <button
                                ref={(el) => {
                                    triggers.current[index] = el;
                                }}
                                id={triggerId}
                                type="button"
                                className={style.trigger}
                                aria-expanded={open}
                                aria-controls={panelId}
                                onClick={() => select(index)}
                                onPointerEnter={() => onHover(index)}
                                onPointerLeave={cancelHover}
                                onKeyDown={(event) => onKeyDown(event, index)}
                            >
                                {/* The number is drawn by CSS (::before) so the <h3> reads as
                                    just the service name to search engines and screen readers. */}
                                <span className={style.number} data-number={number} aria-hidden="true" />
                                <span className={style.titleGroup}>
                                    <span className={style.itemTitle}>{item.title}</span>
                                    {/* A real space keeps title and badge as separate words in the heading text. */}
                                    {item.label && " "}
                                    {item.label && <span className={style.label}>{item.label}</span>}
                                </span>
                                <span className={style.icon}>
                                    <PlusIcon />
                                    <ArrowIcon />
                                </span>
                            </button>
                        </h3>

                        {/* Stays mounted so the reveal animates and every service's
                            copy is in the HTML for search engines; hidden panels are
                            visibility:hidden, so out of the tab order and a11y tree. */}
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={triggerId}
                            className={style.panel}
                            style={{ "--rows": items.length } as React.CSSProperties}
                        >
                            <div className={style.panelInner}>
                                <PanelOpenContext.Provider value={open}>{item.panel}</PanelOpenContext.Provider>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CapabilityExplorer;

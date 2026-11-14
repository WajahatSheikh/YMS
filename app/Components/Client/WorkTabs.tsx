"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { bookingLinkProps } from "@/app/lib/booking";
import type { WorkCategory, WorkProject } from "@/app/data/work";
import style from "./index.module.scss";

// Case studies, by kind of work.
//
// A row of tabs (Website Design, Mobile App, Branding, SaaS Product, Game
// Design) switches the panel below. A panel lays its case studies out as one
// featured card and the rest in pairs; a tab with none yet shows an "Uploading
// soon" panel that points to the matching service and a call.
//
// Previews: each thumbnail has a short reel. With a mouse it plays while the
// card is pointed at or focused; on touch it plays while the card is in view.
// Reels load only when first needed, phones get the small version, and nothing
// plays under reduced motion or Save-Data.
//
// Every panel is in the HTML (inactive ones `hidden`), so crawlers and
// no-script visitors still get every case study link.

const pad = (n: number) => String(n).padStart(2, "0");

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const canPlay = () => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    return !saveData;
};

// On touch, only one reel plays at a time (the latest card to come into view).
let stopCurrent: (() => void) | null = null;

const WorkCard = ({ project, index, featured, active }: { project: WorkProject; index: number; featured: boolean; active: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [playing, setPlaying] = useState(false);

    const start = () => {
        const video = videoRef.current;
        if (!video || !canPlay()) return;
        if (!video.src) video.src = window.matchMedia("(max-width: 767px)").matches ? project.reelSmall : project.reel;
        video.muted = true;
        if (stopCurrent && stopCurrent !== stop) stopCurrent();
        stopCurrent = stop;
        video.play().catch(() => {});
    };
    const stop = () => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        setPlaying(false);
        if (video.readyState > 0) video.currentTime = 0;
        if (stopCurrent === stop) stopCurrent = null;
    };

    // Touch: there is no hover, so the reel plays while the card is in view
    // (and only for the tab that is showing).
    useEffect(() => {
        const card = cardRef.current;
        if (!card || !active || !window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
        const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.6 });
        observer.observe(card);
        return () => {
            observer.disconnect();
            stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    return (
        <a
            ref={cardRef}
            className={`${style.card} ${featured ? style.cardFeatured : ""}`}
            href={project.path}
            data-transition
            data-transition-label={project.title}
            onPointerEnter={() => fine() && start()}
            onPointerLeave={() => fine() && stop()}
            onFocus={start}
            onBlur={stop}
        >
            <figure className={style.thumb}>
                <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={2000}
                    height={1375}
                    sizes={featured ? "(max-width: 767px) 92vw, 62vw" : "(max-width: 767px) 92vw, 44vw"}
                />
                <video
                    ref={videoRef}
                    className={`${style.reel} ${playing ? style.reelOn : ""}`}
                    muted
                    loop
                    playsInline
                    preload="none"
                    tabIndex={-1}
                    aria-hidden="true"
                    onPlaying={() => setPlaying(true)}
                />
                <span className={style.thumbCta} aria-hidden="true">
                    View case study
                    <Arrow />
                </span>
            </figure>
            <div className={style.cardBody}>
                <span className={style.cardIndex}>{pad(index + 1)}</span>
                <div className={style.cardText}>
                    <h3 className={style.cardTitle}>{project.title}</h3>
                    <p className={style.cardTeaser}>{project.teaser}</p>
                    <p className={style.cardMeta}>
                        {project.category} · {project.year}
                    </p>
                </div>
                <span className={style.cardArrow} aria-hidden="true">
                    <Arrow />
                </span>
            </div>
        </a>
    );
};

const Soon = ({ category, onBrowse }: { category: WorkCategory; onBrowse: () => void }) => (
    <div className={style.soon}>
        {/* Three ghost cards being "uploaded": decorative. */}
        <div className={style.soonVisual} aria-hidden="true">
            {[0, 1, 2].map((i) => (
                <span key={i} className={style.ghost} style={{ "--g": i } as React.CSSProperties}>
                    <span className={style.ghostThumb} />
                    <span className={style.ghostLine} />
                    <span className={style.ghostLineShort} />
                </span>
            ))}
            <span className={style.soonBar}>
                <span />
            </span>
        </div>
        <div className={style.soonCopy}>
            <p className={style.soonBadge}>
                <i aria-hidden="true" />
                Uploading soon
            </p>
            <h3 className={style.soonTitle}>{category.name} case studies are on their way</h3>
            <p className={style.soonText}>
                {category.soon} Want to see this work now? Book a call and we will walk you through it.
            </p>
            <div className={style.soonActions}>
                <a className={style.soonCta} {...bookingLinkProps(`work-soon-${category.id}`)}>
                    Book a call
                    <Arrow />
                </a>
                <a className={style.soonLink} href={category.service.href}>
                    {category.service.label}
                </a>
                <button type="button" className={style.soonLink} onClick={onBrowse}>
                    See website case studies
                </button>
            </div>
        </div>
    </div>
);

export default function WorkTabs({ categories }: { categories: WorkCategory[] }) {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState<number | null>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // The sliding chip under the active tab.
    useLayoutEffect(() => {
        const list = listRef.current;
        const tab = tabRefs.current[active];
        if (!list || !tab) return;
        const place = () => {
            list.style.setProperty("--chip-x", `${tab.offsetLeft}px`);
            list.style.setProperty("--chip-w", `${tab.offsetWidth}px`);
        };
        place();
        list.setAttribute("data-ready", "");
        const observer = new ResizeObserver(place);
        observer.observe(list);
        return () => observer.disconnect();
    }, [active]);

    useEffect(() => {
        const lean = hovered === null || hovered === active ? 0 : hovered > active ? 8 : -8;
        listRef.current?.style.setProperty("--chip-lean", `${lean}px`);
    }, [hovered, active]);

    const select = (i: number, focus = false) => {
        setActive(i);
        const tab = tabRefs.current[i];
        if (!tab) return;
        if (focus) tab.focus();
        // On a phone the tab row scrolls: bring the chosen tab into view.
        tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        const last = categories.length - 1;
        const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        select((next + categories.length) % categories.length, true);
    };

    return (
        <div className={style.work}>
            <div className={style.tabsRow}>
                <div ref={listRef} className={style.tabs} role="tablist" aria-label="Case studies by type of work" onKeyDown={onKeyDown}>
                    <span className={style.tabChip} aria-hidden="true" />
                    {categories.map((category, i) => (
                        <button
                            key={category.id}
                            ref={(el) => {
                                tabRefs.current[i] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`work-tab-${category.id}`}
                            aria-selected={i === active}
                            aria-controls={`work-panel-${category.id}`}
                            tabIndex={i === active ? 0 : -1}
                            className={`${style.tab} ${i === active ? style.tabOn : ""}`}
                            onClick={() => select(i)}
                            onPointerEnter={() => setHovered(i)}
                            onPointerLeave={() => setHovered(null)}
                        >
                            {category.label}
                            <span className={style.tabCount}>{category.projects.length ? pad(category.projects.length) : "Soon"}</span>
                        </button>
                    ))}
                </div>
            </div>

            {categories.map((category, i) => (
                <div
                    key={category.id}
                    role="tabpanel"
                    id={`work-panel-${category.id}`}
                    aria-labelledby={`work-tab-${category.id}`}
                    hidden={i !== active}
                    className={style.panel}
                >
                    <p className={style.panelIntro}>{category.intro}</p>
                    {category.projects.length ? (
                        <ul className={style.grid} data-count={category.projects.length}>
                            {category.projects.map((project, j) => (
                                <li key={project.slug} className={style.gridItem} style={{ "--i": j } as React.CSSProperties}>
                                    <WorkCard project={project} index={j} featured={j === 0} active={i === active} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Soon category={category} onBrowse={() => select(0, true)} />
                    )}
                </div>
            ))}
        </div>
    );
}

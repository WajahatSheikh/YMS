"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import style from "./index.module.scss";

// The project index: big editorial rows, and — on a desktop with a mouse — a
// preview card that follows the cursor and leans with its speed. The preview
// shows the project's thumbnail, or, until one is supplied, a brand card with
// the project's monogram (the same visual the rows use inline on touch).
//
// Rows are real links into the case studies (data-transition: through the
// page-transition overlay).

export interface IndexProject {
    title: string;
    client: string;
    category: string;
    href: string;
    image?: string;
}

const monogram = (title: string) =>
    title
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

export const Thumb = ({ project, sizes }: { project: IndexProject; sizes: string }) =>
    project.image ? (
        <Image src={project.image} alt="" width={640} height={440} sizes={sizes} />
    ) : (
        <span className={style.monogram} aria-hidden="true">
            {monogram(project.title)}
        </span>
    );

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ProjectIndex = ({ projects }: { projects: IndexProject[] }) => {
    const [active, setActive] = useState<number | null>(null);
    const [revealed, setRevealed] = useState(false);
    const listRef = useRef<HTMLOListElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const target = useRef({ x: 0, y: 0 });
    // The preview is portalled to <body>: the section uses content-visibility,
    // whose containment would make a position:fixed child relative to the
    // section instead of the viewport.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Rows rise in once as the list arrives.
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
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
            { threshold: 0.1 }
        );
        observer.observe(list);
        return () => observer.disconnect();
    }, []);

    // Cursor-following preview: eases toward the pointer each frame and leans
    // in the direction of travel. Desktop with a fine pointer only, and not
    // under reduced motion (the preview then simply doesn't appear).
    useEffect(() => {
        const list = listRef.current;
        const preview = previewRef.current;
        if (!mounted || !list || !preview) return;
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduced) return;

        let x = 0;
        let y = 0;
        let lean = 0;
        let frame: number | null = null;
        let started = false;

        const tick = () => {
            const dx = target.current.x - x;
            const dy = target.current.y - y;
            x += dx * 0.16;
            y += dy * 0.16;
            lean += (Math.max(-10, Math.min(10, dx * 0.12)) - lean) * 0.18;
            preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${lean.toFixed(2)}deg)`;
            frame = Math.abs(dx) + Math.abs(dy) + Math.abs(lean) > 0.1 ? requestAnimationFrame(tick) : null;
        };

        const onMove = (event: PointerEvent) => {
            target.current = { x: event.clientX, y: event.clientY };
            if (!started) {
                // First move: jump there rather than flying in from the corner.
                x = event.clientX;
                y = event.clientY;
                started = true;
            }
            if (frame === null) frame = requestAnimationFrame(tick);
        };

        list.addEventListener("pointermove", onMove);
        return () => {
            list.removeEventListener("pointermove", onMove);
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, [mounted]);

    return (
        <>
            <ol
                ref={listRef}
                className={`${style.list} ${revealed ? style.revealed : ""}`}
                onPointerLeave={() => setActive(null)}
            >
                {projects.map((project, index) => (
                    <li
                        key={project.title}
                        className={`${style.row} ${active === index ? style.active : ""}`}
                        style={{ "--i": index } as React.CSSProperties}
                    >
                        <a
                            className={style.rowLink}
                            href={project.href}
                            data-transition
                            data-transition-label={project.title}
                            onPointerEnter={() => setActive(index)}
                            onFocus={() => setActive(index)}
                            onBlur={() => setActive(null)}
                        >
                            <span className={style.num}>{String(index + 1).padStart(2, "0")}</span>
                            <span className={style.inlineThumb}>
                                <Thumb project={project} sizes="80px" />
                            </span>
                            <span className={style.rowMain}>
                                <span className={style.rowTitle}>{project.title}</span>
                                <span className={style.meta}>
                                    <span className={style.tag}>{project.client}</span>
                                    <span className={style.tag}>{project.category}</span>
                                </span>
                            </span>
                            <span className={style.cta}>
                                <span className={style.ctaLabel}>View case study</span>
                                <span className={style.arrow}>
                                    <ArrowIcon />
                                </span>
                            </span>
                        </a>
                    </li>
                ))}
            </ol>

            {/* Floating preview (desktop). All thumbnails are stacked; the
                active one fades in, so switching rows cross-fades. */}
            {mounted &&
                createPortal(
            <div ref={previewRef} className={`${style.preview} ${active !== null ? style.previewOn : ""}`} aria-hidden="true">
                {projects.map((project, index) => (
                    <span key={project.title} className={`${style.previewItem} ${active === index ? style.previewItemOn : ""}`}>
                        <Thumb project={project} sizes="340px" />
                        <span className={style.previewCaption}>{project.title}</span>
                    </span>
                ))}
            </div>,
                    document.body
                )}
        </>
    );
};

export default ProjectIndex;

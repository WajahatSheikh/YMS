"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/app/data/testimonials";
import style from "./index.module.scss";

// The testimonial slider: a row of tall cards that runs past the right edge,
// scrolled by the arrows beside the heading, the dots under it, a trackpad,
// a swipe or the keyboard (each card's controls are in the tab order).
//
// Card at rest: logo, the pull line in large type, "Read full quote", and who
// said it. On hover (or when something inside it has focus) the card floods
// with a warm brand gradient that drifts and leans toward the cursor, the
// type turns white, and the result and project fade up above the person.
// Touch screens show the result from the start, since there is no hover.
//
// Every quote is in the HTML in full: the pull line is the visible excerpt,
// the complete words are the panel "Read full quote" opens.

const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d={dir === "left" ? "M16 10H4M9 5l-5 5 5 5" : "M4 10h12M11 5l5 5-5 5"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Card = ({ item, index, total }: { item: Testimonial; index: number; total: number }) => {
    const [open, setOpen] = useState(false);
    const pull = item.quote.includes(item.pull) ? item.pull : item.quote;
    const restId = `testimonial-${index}-full`;

    // The gradient leans toward the pointer.
    const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
        if (event.pointerType === "touch") return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--px", `${((event.clientX - box.left) / box.width) * 100}%`);
        event.currentTarget.style.setProperty("--py", `${((event.clientY - box.top) / box.height) * 100}%`);
    };

    return (
        <li className={style.slide} aria-label={`${index + 1} of ${total}`}>
            <figure className={style.card} onPointerMove={onPointerMove}>
                <span className={style.flow} aria-hidden="true" />

                <div className={style.top}>
                    <Image
                        className={style.logo}
                        src={item.logo}
                        alt={item.company}
                        width={item.logoWidth}
                        height={28}
                    />
                </div>

                <div className={style.quoteWrap}>
                    <blockquote className={style.quote}>
                        <p className={style.pull} hidden={open}>
                            &ldquo;{pull}&rdquo;
                        </p>
                        <p className={style.full} id={restId} hidden={!open}>
                            &ldquo;{item.quote}&rdquo;
                        </p>
                    </blockquote>
                    {pull !== item.quote && (
                        <button
                            type="button"
                            className={style.more}
                            aria-expanded={open}
                            aria-controls={restId}
                            onClick={() => setOpen((v) => !v)}
                        >
                            {open ? "Show less" : "Read full quote"}
                        </button>
                    )}
                </div>

                <div className={style.foot}>
                    <dl className={style.metric}>
                        <dt>
                            {item.project} &middot; {item.location}
                        </dt>
                        <dd>{item.result}</dd>
                    </dl>

                    <figcaption className={style.who}>
                        <span className={`${style.avatar} ${item.avatarOnWhite ? style.onWhite : ""}`}>
                            <Image src={item.avatar} alt="" width={44} height={44} />
                        </span>
                        <span className={style.whoText}>
                            <span className={style.name}>{item.name}</span>
                            <span className={style.role}>
                                {item.role}, {item.company}
                            </span>
                        </span>
                    </figcaption>
                </div>
            </figure>
        </li>
    );
};

export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
    const trackRef = useRef<HTMLUListElement>(null);
    const [active, setActive] = useState(0);
    const [edges, setEdges] = useState({ start: true, end: false });

    const sync = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
        const slides = Array.from(track.children) as HTMLElement[];
        let nearest = 0;
        slides.forEach((slide, i) => {
            if (Math.abs(slide.offsetLeft - pad - track.scrollLeft) < Math.abs(slides[nearest].offsetLeft - pad - track.scrollLeft)) nearest = i;
        });
        const end = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
        setActive(end ? slides.length - 1 : nearest);
        setEdges({ start: track.scrollLeft <= 4, end });
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(sync);
        };
        sync();
        track.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            track.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [sync]);

    const goTo = (index: number) => {
        const track = trackRef.current;
        if (!track) return;
        const slides = Array.from(track.children) as HTMLElement[];
        const target = slides[Math.max(0, Math.min(slides.length - 1, index))];
        const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        track.scrollTo({ left: target.offsetLeft - pad, behavior: smooth ? "smooth" : "auto" });
    };

    return (
        <>
            <div className={style.headRow}>
                <div className={style.headMain}>
                    <p className={style.eyebrow}>Client testimonials</p>
                    <h2 id="testimonials-title" className={style.title}>
                        <span>Founders,</span> <span>after they shipped</span>
                    </h2>
                </div>
                <div className={style.arrows}>
                    <button type="button" className={style.arrow} onClick={() => goTo(active - 1)} disabled={edges.start} aria-label="Previous testimonial">
                        <ArrowIcon dir="left" />
                    </button>
                    <button type="button" className={style.arrow} onClick={() => goTo(active + 1)} disabled={edges.end} aria-label="Next testimonial">
                        <ArrowIcon dir="right" />
                    </button>
                </div>
            </div>

            <ul ref={trackRef} className={style.track} aria-label="Client testimonials">
                {items.map((item, index) => (
                    <Card key={item.name} item={item} index={index} total={items.length} />
                ))}
            </ul>

            <div className={style.dots}>
                {items.map((item, index) => (
                    <button
                        key={item.name}
                        type="button"
                        className={`${style.dot} ${index === active ? style.dotOn : ""}`}
                        onClick={() => goTo(index)}
                        aria-label={`Show testimonial ${index + 1}: ${item.name}`}
                        aria-current={index === active || undefined}
                    />
                ))}
            </div>
        </>
    );
}

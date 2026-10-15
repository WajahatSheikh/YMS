"use client";

import { useEffect, useRef } from "react";

// Auto-advances the testimonial cards on phones, where they sit in a
// horizontal snap rail (see .cards in index.module.scss). One card every few
// seconds, smooth, looping back to the first after the last.
//
// It gets out of the way: a touch, swipe or wheel on the rail pauses it for a
// while, and it only runs when the rail is on screen, the tab is visible, the
// viewport is phone-width and reduced motion isn't requested. On wider screens
// the cards are a grid and this does nothing.
//
// Renders a display:contents wrapper so the rail (its only child) stays a
// direct flex item of the section.

const PHONE_QUERY = "(max-width: 767.98px)";
const INTERVAL_MS = 4000;
const PAUSE_AFTER_INTERACTION_MS = 8000;

const AutoAdvance = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rail = ref.current?.firstElementChild as HTMLElement | null;
        if (!rail) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const phone = window.matchMedia(PHONE_QUERY);
        let visible = false;
        let pausedUntil = 0;

        const advance = () => {
            if (!phone.matches || !visible || document.hidden || Date.now() < pausedUntil) return;

            const railLeft = rail.getBoundingClientRect().left;
            const padding = parseFloat(getComputedStyle(rail).scrollPaddingLeft) || 0;
            const maxScroll = rail.scrollWidth - rail.clientWidth;
            // Each card's snap position inside the scrolled content, capped at
            // the furthest the rail can scroll (the last cards share that stop).
            const stops = Array.from(rail.children).map((card) =>
                Math.min(maxScroll, Math.max(0, card.getBoundingClientRect().left - railLeft + rail.scrollLeft - padding))
            );

            // Step from the card nearest the current position, not the first
            // stop past it, so a snap still settling can't make it skip one.
            let current = 0;
            stops.forEach((stop, i) => {
                if (Math.abs(stop - rail.scrollLeft) < Math.abs(stops[current] - rail.scrollLeft)) current = i;
            });
            const atEnd = rail.scrollLeft >= maxScroll - 4;
            const next = atEnd || current + 1 >= stops.length ? 0 : stops[current + 1];

            rail.scrollTo({ left: next, behavior: "smooth" });
        };

        const pause = () => {
            pausedUntil = Date.now() + PAUSE_AFTER_INTERACTION_MS;
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        }, { threshold: 0.5 });
        observer.observe(rail);

        rail.addEventListener("pointerdown", pause, { passive: true });
        rail.addEventListener("touchstart", pause, { passive: true });
        rail.addEventListener("wheel", pause, { passive: true });

        const timer = window.setInterval(advance, INTERVAL_MS);
        return () => {
            window.clearInterval(timer);
            observer.disconnect();
            rail.removeEventListener("pointerdown", pause);
            rail.removeEventListener("touchstart", pause);
            rail.removeEventListener("wheel", pause);
        };
    }, []);

    return (
        <div ref={ref} style={{ display: "contents" }}>
            {children}
        </div>
    );
};

export default AutoAdvance;

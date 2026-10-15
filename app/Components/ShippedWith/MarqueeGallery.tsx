"use client";

import { useEffect, useRef } from "react";

// Drives the two drifting rows of ShippedWith: the first row right to left, the
// second left to right. Hovering the gallery slows both rather than stopping
// them, so the section keeps breathing while a card is examined.
//
// Driven by rAF, not a CSS keyframe. `animation-duration` is not an animatable
// property, so easing it on hover makes the marquee jump to a new point in its
// cycle; interpolating a speed value and writing the transform each frame gives
// a genuinely smooth slow-down.
//
// The rows are server-rendered children marked `data-marquee-row`; each holds
// its cards twice so the wrap is seamless.

const REST_SPEED = 0.55; // px per frame ≈ 33px/s
const HOVER_SPEED = 0.12; // slowed, never stopped

const MarqueeGallery = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    const galleryRef = useRef<HTMLDivElement>(null);
    const hoveredRef = useRef(false);

    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const rows = Array.from(gallery.querySelectorAll<HTMLElement>("[data-marquee-row]"));
        // Row one travels left, row two travels right.
        const directions = rows.map((_, i) => (i % 2 === 0 ? 1 : -1));
        const offsets = rows.map(() => 0);
        let speed = REST_SPEED;
        let frame: number | null = null;
        let visible = true;

        const step = () => {
            frame = requestAnimationFrame(step);
            if (!visible) return;

            const target = hoveredRef.current ? HOVER_SPEED : REST_SPEED;
            // Ease toward the target so the change of pace is itself smooth.
            speed += (target - speed) * 0.06;

            rows.forEach((row, i) => {
                // The track holds two identical sets, so one set is half its width.
                const half = row.scrollWidth / 2;
                if (half <= 0) return;

                offsets[i] = (offsets[i] + speed * directions[i] + half) % half;
                row.style.transform = `translate3d(${-offsets[i]}px, 0, 0)`;
            });
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        observer.observe(gallery);

        frame = requestAnimationFrame(step);
        return () => {
            observer.disconnect();
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div
            ref={galleryRef}
            className={className}
            onPointerEnter={() => {
                hoveredRef.current = true;
            }}
            onPointerLeave={() => {
                hoveredRef.current = false;
            }}
        >
            {children}
        </div>
    );
};

export default MarqueeGallery;

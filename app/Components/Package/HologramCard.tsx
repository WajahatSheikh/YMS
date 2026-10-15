"use client";

import { useEffect, useRef } from "react";

// The pricing card's hologram surface: pointer position drives an iridescent
// sheen and a slight 3D tilt through CSS custom properties written in a rAF
// loop. Skipped on touch and under prefers-reduced-motion, and there is no
// ambient animation — the card is still until the pointer is over it. The card
// content is server-rendered and passed in as children.
const HologramCard = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduced) return;

        let frame: number | null = null;
        let px = 0.5;
        let py = 0.5;

        const apply = () => {
            frame = null;
            card.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
            card.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
            // Tilt is deliberately small — a pricing card should read as solid,
            // not as a toy.
            card.style.setProperty("--rx", `${((0.5 - py) * 5).toFixed(2)}deg`);
            card.style.setProperty("--ry", `${((px - 0.5) * 6).toFixed(2)}deg`);
        };

        const onMove = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            px = (e.clientX - rect.left) / rect.width;
            py = (e.clientY - rect.top) / rect.height;
            if (frame === null) frame = requestAnimationFrame(apply);
        };

        const onLeave = () => {
            px = 0.5;
            py = 0.5;
            if (frame === null) frame = requestAnimationFrame(apply);
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        return () => {
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div ref={cardRef} className={className}>
            {children}
        </div>
    );
};

export default HologramCard;

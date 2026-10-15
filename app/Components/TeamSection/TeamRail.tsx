"use client";

import { useEffect, useRef } from "react";
import style from "./index.module.scss";

// The team scroll rail: edge to edge, draggable with a mouse the way it already
// is with touch, and the cards (server-rendered children) rise in, staggered,
// as the rail arrives.
const TeamRail = ({ children }: { children: React.ReactNode }) => {
    const railRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        const cards = Array.from(rail.children) as HTMLElement[];

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            cards.forEach((card) => card.classList.add(style.inView));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(style.inView);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    // Pointer drag, so the row can be pulled on a trackpad or with a mouse.
    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        let down = false;
        let startX = 0;
        let startScroll = 0;

        const onDown = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            down = true;
            startX = e.clientX;
            startScroll = rail.scrollLeft;
        };

        const onMove = (e: PointerEvent) => {
            if (!down) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 3) rail.classList.add(style.dragging);
            rail.scrollLeft = startScroll - dx;
        };

        const onUp = () => {
            down = false;
            rail.classList.remove(style.dragging);
        };

        rail.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            rail.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, []);

    return (
        <div className={style.railWrap}>
            <ul className={style.rail} ref={railRef} tabIndex={0} aria-label="Team members, scrollable">
                {children}
            </ul>
        </div>
    );
};

export default TeamRail;

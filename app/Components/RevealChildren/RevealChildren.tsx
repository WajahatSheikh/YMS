"use client";

import { useEffect, useRef } from "react";

// Adds `inViewClass` to each direct child as it scrolls into view, once. The
// children are server-rendered; only this observer ships as client code. The
// entrance itself (and any stagger) is CSS in the section's own stylesheet,
// keyed off that class.
//
// Observed per child rather than per list so a stagger tracks the scroll
// instead of firing all at once. Under prefers-reduced-motion every child gets
// the class immediately.
const RevealChildren = ({
    className,
    inViewClass,
    threshold = 0.12,
    rootMargin = "0px 0px -8% 0px",
    children
}: {
    className?: string;
    inViewClass: string;
    threshold?: number;
    rootMargin?: string;
    children: React.ReactNode;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const list = ref.current;
        if (!list) return;

        const items = Array.from(list.children);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            items.forEach((item) => item.classList.add(inViewClass));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(inViewClass);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin }
        );

        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, [inViewClass, threshold, rootMargin]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

export default RevealChildren;

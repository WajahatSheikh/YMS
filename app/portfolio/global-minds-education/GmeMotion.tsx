"use client";

import { useEffect } from "react";

// Scroll motion for the Global Minds Education case study. One GSAP
// ScrollTrigger setup, attached to <main data-gme> by data attributes:
//
//   · the rail     [data-rail-plane] travels DXB → LON with reading progress,
//                  [data-rail-fill] fills behind it, each [data-chapter="n"]
//                  lights its tick; on phones [data-rail-line] is a thin
//                  progress line instead
//   · stamps       [data-stamp]: lands like a passport stamp (scale + settle)
//   · reveals      [data-rise], [data-rise-group] > [data-rise-item]
//   · numbers      [data-count]
//   · intro        [data-intro]: the pass and phone settle into the cover
//   · phones       [data-float="n"]: each phone drifts at its own speed
//   · pinwheels    [data-spin]: a slow turn while on screen (the idle state)
//
// GSAP is imported on demand, so it isn't in the page's first load. Animated
// properties are transform and opacity only. Under reduced motion only the rail
// is kept (it is a progress marker, like a scrollbar) and moves without easing;
// everything else is in its final state.

export default function GmeMotion() {
    useEffect(() => {
        const main = document.querySelector<HTMLElement>("[data-gme]");
        if (!main) return;
        let cancelled = false;
        let cleanup: (() => void) | undefined;

        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
            if (cancelled) return;
            gsap.registerPlugin(ScrollTrigger);

            // Sections below the hero use content-visibility: auto (faster first
            // paint), so the page's real height arrives as each one renders.
            // Re-measure every trigger when it does, so scroll-driven motion
            // stays lined up with the content.
            let refreshTimer = 0;
            const resizeWatch = new ResizeObserver(() => {
                window.clearTimeout(refreshTimer);
                refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
            });
            resizeWatch.observe(main);
            const mm = gsap.matchMedia(main);
            const land = "back.out(2.2)";

            // ── the rail ─────────────────────────────────────────────────────
            const plane = main.querySelector<HTMLElement>("[data-rail-plane]");
            const fill = main.querySelector<HTMLElement>("[data-rail-fill]");
            const line = main.querySelector<HTMLElement>("[data-rail-line]");
            const ticks = Array.from(main.querySelectorAll<HTMLElement>("[class*='railTick']"));
            const light = (count: number) => ticks.forEach((t, i) => t.toggleAttribute("data-on", i < count));
            const chapterTriggers = gsap.utils.toArray<HTMLElement>("[data-chapter]", main).map((chapter) =>
                ScrollTrigger.create({
                    trigger: chapter,
                    start: "top 60%",
                    onEnter: () => light(Number(chapter.dataset.chapter) + 1),
                    onLeaveBack: () => light(Number(chapter.dataset.chapter))
                })
            );
            const progress = ScrollTrigger.create({
                trigger: main,
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    const p = self.progress;
                    if (plane) gsap.set(plane, { "--p": p });
                    if (fill) gsap.set(fill, { scaleY: p });
                    if (line) gsap.set(line, { scaleX: p });
                }
            });

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                main.setAttribute("data-motion", "");

                // ── cover intro ──────────────────────────────────────────────
                gsap.from(main.querySelectorAll("[data-intro]"), { y: 60, rotate: 0, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, delay: 0.2 });

                // ── reveals ──────────────────────────────────────────────────
                gsap.utils.toArray<HTMLElement>("[data-rise]", main).forEach((el) =>
                    gsap.from(el, { y: 28, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } })
                );
                gsap.utils.toArray<HTMLElement>("[data-rise-group]", main).forEach((group) =>
                    gsap.from(group.querySelectorAll("[data-rise-item]"), { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: group, start: "top 86%", once: true } })
                );

                // ── stamps land like a passport stamp ────────────────────────
                gsap.utils.toArray<HTMLElement>("[data-stamp]", main).forEach((el) => {
                    const r = Number(getComputedStyle(el).getPropertyValue("--r") || 0);
                    gsap.from(el, { scale: 1.35, opacity: 0, rotate: r - 14, duration: 0.42, ease: land, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
                });

                // ── numbers ──────────────────────────────────────────────────
                gsap.utils.toArray<HTMLElement>("[data-count]", main).forEach((el) => {
                    const to = Number(el.dataset.count);
                    const n = { v: 0 };
                    gsap.to(n, { v: to, duration: 1.2, ease: "power2.out", snap: { v: 1 }, onUpdate: () => { el.textContent = String(n.v); }, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
                });

                // ── phones drift ─────────────────────────────────────────────
                gsap.utils.toArray<HTMLElement>("[data-float]", main).forEach((el) => {
                    const f = Number(el.dataset.float || 0);
                    gsap.fromTo(el, { yPercent: 6 * f }, { yPercent: -6 * f, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
                });

                // ── pinwheels turn slowly while on screen ────────────────────
                gsap.utils.toArray<HTMLElement>("[data-spin]", main).forEach((el) => {
                    const spin = gsap.to(el, { rotate: "+=360", duration: 40, ease: "none", repeat: -1, paused: true });
                    ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onToggle: (self) => (self.isActive ? spin.play() : spin.pause()) });
                });

                return () => main.removeAttribute("data-motion");
            });

            cleanup = () => {
                resizeWatch.disconnect();
                window.clearTimeout(refreshTimer);
                mm.revert();
                progress.kill();
                chapterTriggers.forEach((t) => t.kill());
            };
        });

        return () => {
            cancelled = true;
            cleanup?.();
        };
    }, []);

    return null;
}

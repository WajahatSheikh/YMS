"use client";

import { useEffect } from "react";

// Scroll motion for the Naturally White case study. One GSAP ScrollTrigger
// setup, attached to <main data-nw> by data attributes:
//
//   · the shade rail  [data-rail]: the tab of the chapter being read
//                     ([data-chapter="n"]) is held out
//   · reveals         [data-rise], [data-rise-group] > [data-rise-item]
//   · numbers         [data-count]
//   · parallax        [data-parallax="n"]: an image drifts ±n% inside its frame
//   · the homepage    [data-page-scroll]: the pinned stage scrubs the full
//                     page through [data-window]; [data-act] lights the act
//   · phones          [data-float="n"]: each phone drifts at its own speed
//
// GSAP is imported on demand, so it isn't in the page's first load. Everything
// animated is transform or opacity. Under reduced motion only the rail is kept
// (it is a progress marker, like a scrollbar); everything else stays in its
// final, visible state.

export default function NwMotion() {
    useEffect(() => {
        const main = document.querySelector<HTMLElement>("[data-nw]");
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
            const ease = "expo.out";

            // ── the shade rail ────────────────────────────────────────────────
            // A class toggle per chapter, never a per-frame style write.
            const tabs = Array.from(main.querySelectorAll<HTMLElement>("[data-rail] > li"));
            const hold = (index: number) => tabs.forEach((tab, i) => tab.toggleAttribute("data-on", i === index));
            const rail = gsap.utils.toArray<HTMLElement>("[data-chapter]", main).map((chapter) =>
                ScrollTrigger.create({
                    trigger: chapter,
                    start: "top 55%",
                    end: "bottom 55%",
                    onToggle: (self) => {
                        const index = Number(chapter.dataset.chapter);
                        if (self.isActive) hold(index);
                        // Scrolled back up past the first chapter: nothing is held.
                        else if (index === 0 && self.direction < 0) hold(-1);
                    }
                })
            );

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                main.setAttribute("data-motion", "");

                // ── reveals: a soft rise (opacity + transform only) ───────────
                // Opacity only, never visibility: a hidden link can't take focus, so a
                // keyboard user would skip everything not yet scrolled into view.
                const from = { opacity: 0, y: 28 };
                const to = { opacity: 1, y: 0, duration: 1.2, ease };
                gsap.utils.toArray<HTMLElement>("[data-rise]", main).forEach((el) => {
                    gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-rise-group]", main).forEach((group) => {
                    gsap.fromTo(group.querySelectorAll("[data-rise-item]"), from, {
                        ...to,
                        stagger: 0.08,
                        scrollTrigger: { trigger: group, start: "top 86%", once: true }
                    });
                });

                // ── numbers count up once ─────────────────────────────────────
                gsap.utils.toArray<HTMLElement>("[data-count]", main).forEach((el) => {
                    const end = Number(el.dataset.count);
                    const state = { v: 0 };
                    gsap.to(state, {
                        v: end,
                        duration: 1.6,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 92%", once: true },
                        onUpdate: () => {
                            el.textContent = String(Math.round(state.v));
                        }
                    });
                });

                // ── parallax: images drift inside their frames ────────────────
                gsap.utils.toArray<HTMLElement>("[data-parallax]", main).forEach((img) => {
                    const amount = Number(img.dataset.parallax);
                    gsap.fromTo(
                        img,
                        { yPercent: -amount },
                        {
                            yPercent: amount,
                            ease: "none",
                            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 }
                        }
                    );
                });

                // ── the homepage: scroll scrubs the page through the window ───
                const band = main.querySelector<HTMLElement>("[data-page-scroll]");
                const windowEl = band?.querySelector<HTMLElement>("[data-window]");
                const pageImg = band?.querySelector<HTMLElement>("[data-page-image]");
                const acts = gsap.utils.toArray<HTMLElement>("[data-act]", band);
                if (band && windowEl && pageImg) {
                    // Not focusable while pinned: there is nothing to scroll inside it.
                    windowEl.removeAttribute("tabindex");
                    const travel = () => Math.max(0, pageImg.offsetHeight - windowEl.clientHeight);
                    gsap.to(pageImg, {
                        y: () => -travel(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: band,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.5,
                            invalidateOnRefresh: true,
                            onUpdate: (self) => {
                                // Which act fills the window right now (measured a third
                                // of the way down it, not at its top edge).
                                const shown = (self.progress * travel() + windowEl.clientHeight * 0.35) / pageImg.offsetHeight;
                                let current = 0;
                                acts.forEach((act, i) => {
                                    if (shown >= Number(act.dataset.from) - 0.02) current = i;
                                });
                                acts.forEach((act, i) => act.toggleAttribute("data-on", i === current));
                            }
                        }
                    });
                    acts[0]?.setAttribute("data-on", "");
                }

                return () => {
                    main.removeAttribute("data-motion");
                    windowEl?.setAttribute("tabindex", "0");
                };
            });

            // ── phones drift at their own speeds (a swipe row on phones) ──────
            mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
                gsap.utils.toArray<HTMLElement>("[data-float]", main).forEach((phone) => {
                    const amount = Number(phone.dataset.float) * 46;
                    gsap.fromTo(
                        phone,
                        { y: amount },
                        {
                            y: -amount,
                            ease: "none",
                            scrollTrigger: { trigger: phone.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 }
                        }
                    );
                });
            });

            // Fonts and images change heights after first layout.
            const refresh = () => ScrollTrigger.refresh();
            document.fonts?.ready.then(refresh);
            window.addEventListener("load", refresh);

            cleanup = () => {
                resizeWatch.disconnect();
                window.clearTimeout(refreshTimer);
                window.removeEventListener("load", refresh);
                rail.forEach((trigger) => trigger.kill());
                hold(-1);
                mm.revert();
            };
        });

        return () => {
            cancelled = true;
            cleanup?.();
        };
    }, []);

    return null;
}

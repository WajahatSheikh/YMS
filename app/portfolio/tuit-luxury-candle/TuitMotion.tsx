"use client";

import { useEffect } from "react";

// All motion on the Tüit case study, on GSAP's one clock (ScrollTrigger).
// Motion verb: "burn slow" — things rise softly like heat and settle; images
// drift a few percent as they pass; nothing snaps.
//
// One driver: scroll position. It moves
//   · the wick      --burn on <main>, 0 → 1 over the whole page
//   · the renders   [data-parallax="n"]: the image drifts ±n% inside its frame
//   · the strip     [data-drift="n"]: the phone row drifts sideways (≥768px)
//   · the page      [data-page-scroll]: the pinned stage scrubs the full
//                   landing page through its window and lights the current act
//   · the reveals   [data-rise], and [data-rise-group] > [data-rise-item]
//   · the counts    [data-count]
//
// GSAP is imported on demand, so it isn't in the page's first load. Under
// reduced motion only the wick's position is kept (it is a progress marker,
// like a scrollbar); everything else stays in its final, visible state.

export default function TuitMotion() {
    useEffect(() => {
        const main = document.querySelector<HTMLElement>("[data-tuit]");
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

            // The wick: how far down the page the reader is. --burn is set on
            // the wick's own two layers, not on <main>: a custom property on
            // <main> would restyle the whole page on every scroll frame.
            const wickParts = main.querySelectorAll<HTMLElement>("[data-wick]");
            const wick = ScrollTrigger.create({
                trigger: main,
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    const burn = self.progress.toFixed(4);
                    wickParts.forEach((part) => part.style.setProperty("--burn", burn));
                }
            });

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                main.setAttribute("data-motion", "");

                // ── reveals: a soft rise (opacity + transform only, so they
                // stay on the compositor; a blur here cost a fifth of the frames)
                // Opacity only, never visibility: a hidden link can't take focus, so a
                // keyboard user would skip everything not yet scrolled into view.
                const from = { opacity: 0, y: 28 };
                const to = { opacity: 1, y: 0, duration: 1.3, ease };
                gsap.utils.toArray<HTMLElement>("[data-rise]", main).forEach((el) => {
                    gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-rise-group]", main).forEach((group) => {
                    gsap.fromTo(group.querySelectorAll("[data-rise-item]"), from, {
                        ...to,
                        stagger: 0.09,
                        scrollTrigger: { trigger: group, start: "top 86%", once: true }
                    });
                });

                // ── numbers count up once ─────────────────────────────────────
                gsap.utils.toArray<HTMLElement>("[data-count]", main).forEach((el) => {
                    const end = Number(el.dataset.count);
                    const state = { v: 0 };
                    gsap.to(state, {
                        v: end,
                        duration: 1.8,
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

                // ── the page: scroll scrubs the landing page through the window ─
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
                                // Which act is at the top of the window right now.
                                const shown = (self.progress * travel()) / pageImg.offsetHeight;
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

            // ── the phone strip drifts sideways (it is a swipe row on phones) ─
            mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
                gsap.utils.toArray<HTMLElement>("[data-drift]", main).forEach((img) => {
                    const amount = Number(img.dataset.drift);
                    gsap.fromTo(
                        img,
                        { xPercent: amount * 0.9 },
                        {
                            xPercent: -amount * 0.9,
                            ease: "none",
                            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 }
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
                wick.kill();
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

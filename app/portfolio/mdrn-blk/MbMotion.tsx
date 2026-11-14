"use client";

import { useEffect } from "react";

// Scroll motion for the MDRN BLK case study. One GSAP ScrollTrigger setup,
// attached to <main data-mb> by data attributes:
//
//   · the deck       [data-deck]: one sticker per chapter ([data-chapter="n"])
//                    slaps on as you reach it; [data-deck-grip] fills with
//                    reading progress
//   · tapes          [data-tape]: a loop that speeds up with scroll velocity
//                    and follows the scroll direction (data-dir flips it)
//   · slaps          [data-slap]: a sticker lands, rotated, with overshoot
//   · drops          [data-drop]: a moodboard photo drops onto the board
//   · stretches      [data-stretch]: a colour tape is pulled across
//   · reveals        [data-rise], [data-rise-group] > [data-rise-item]
//   · numbers        [data-count]
//   · parallax       [data-parallax="n"]: ±n% while in view
//   · the homepage   [data-page-scroll]: pinned stage, page scrubbed through
//                    [data-window], [data-act] lights the act
//   · the stance     [data-stance] [data-ride]: three screens ride one scroll
//   · phones         [data-float="n"]: each phone drifts at its own speed
//
// GSAP is imported on demand, so it isn't in the page's first load. Animated
// properties are transform, opacity and clip-path only. Under reduced motion
// only the deck is kept (it is a progress marker, like a scrollbar) and its
// stickers appear without a slap; everything else is in its final state.

export default function MbMotion() {
    useEffect(() => {
        const main = document.querySelector<HTMLElement>("[data-mb]");
        if (!main) return;
        let cancelled = false;
        let cleanup: (() => void) | undefined;

        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
            if (cancelled) return;
            gsap.registerPlugin(ScrollTrigger);
            const mm = gsap.matchMedia(main);
            const land = "back.out(1.9)";

            // ── the deck ──────────────────────────────────────────────────────
            const deckStickers = Array.from(main.querySelectorAll<HTMLElement>("[data-deck] > [style]"));
            const grip = main.querySelector<HTMLElement>("[data-deck-grip]");
            const show = (count: number) => deckStickers.forEach((st, i) => st.toggleAttribute("data-on", i < count));
            const chapterTriggers = gsap.utils.toArray<HTMLElement>("[data-chapter]", main).map((chapter) =>
                ScrollTrigger.create({
                    trigger: chapter,
                    start: "top 60%",
                    onEnter: () => show(Number(chapter.dataset.chapter) + 1),
                    onLeaveBack: () => show(Number(chapter.dataset.chapter))
                })
            );
            const progress = ScrollTrigger.create({
                trigger: main,
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => grip && gsap.set(grip, { scaleY: self.progress })
            });

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                main.setAttribute("data-motion", "");

                // ── tapes: a loop whose speed follows the scroll ──────────────
                // Each loop only runs while its band is on screen.
                const loops = gsap.utils.toArray<HTMLElement>("[data-tape]", main).map((track) => {
                    const dir = Number(track.dataset.dir || 1);
                    const speed = Number(track.dataset.speed || 1);
                    const loop = gsap.fromTo(track, { xPercent: dir > 0 ? -50 : 0 }, { xPercent: dir > 0 ? 0 : -50, duration: 38 / speed, ease: "none", repeat: -1, paused: true });
                    ScrollTrigger.create({ trigger: track, start: "top bottom", end: "bottom top", onToggle: (self) => (self.isActive ? loop.play() : loop.pause()) });
                    return loop;
                });
                // One shared speed: kicked by scroll velocity, then eased back to
                // cruising in the scroll direction (one reused tween, not one per event).
                const speed = { v: 1 };
                const applySpeed = () => loops.forEach((loop) => loop.timeScale(speed.v));
                const cruise = gsap.quickTo(speed, "v", { duration: 1.2, ease: "power3.out", onUpdate: applySpeed });
                const velocity = ScrollTrigger.create({
                    trigger: main,
                    start: "top top",
                    end: "bottom bottom",
                    onUpdate: (self) => {
                        const dir = self.direction || 1;
                        const kick = Math.min(6, Math.abs(self.getVelocity()) / 400);
                        speed.v = dir * (1 + kick);
                        applySpeed();
                        cruise(dir, speed.v);
                    }
                });

                // ── reveals: a short rise (opacity, never visibility) ─────────
                const from = { opacity: 0, y: 30 };
                const to = { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" };
                gsap.utils.toArray<HTMLElement>("[data-rise]", main).forEach((el) => {
                    gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-rise-group]", main).forEach((group) => {
                    gsap.fromTo(group.querySelectorAll("[data-rise-item]"), from, {
                        ...to,
                        stagger: 0.07,
                        scrollTrigger: { trigger: group, start: "top 86%", once: true }
                    });
                });

                // ── slaps: a sticker lands like it was smacked on ─────────────
                gsap.utils.toArray<HTMLElement>("[data-slap]", main).forEach((el, i) => {
                    gsap.fromTo(
                        el,
                        { opacity: 0, scale: 1.7, rotation: i % 2 ? 14 : -14 },
                        { opacity: 1, scale: 1, rotation: 0, duration: 0.55, ease: land, scrollTrigger: { trigger: el, start: "top 90%", once: true } }
                    );
                });

                // ── drops: photos land on the board one after another ─────────
                const board = main.querySelector<HTMLElement>("[data-drop]")?.parentElement;
                if (board) {
                    gsap.fromTo(
                        board.querySelectorAll("[data-drop]"),
                        { opacity: 0, y: -90, rotation: (i) => (i % 2 ? 10 : -10) },
                        { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "back.out(1.4)", stagger: 0.09, scrollTrigger: { trigger: board, start: "top 78%", once: true } }
                    );
                }

                // ── stretches: colour tapes pulled across, one by one ─────────
                gsap.utils.toArray<HTMLElement>("[data-stretch]", main).forEach((tape, i) => {
                    gsap.fromTo(
                        tape,
                        { clipPath: i % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
                        { clipPath: "inset(0 0% 0 0%)", duration: 0.9, ease: "power4.out", delay: (i % 3) * 0.06, scrollTrigger: { trigger: tape, start: "top 90%", once: true } }
                    );
                });

                // ── numbers count up once ─────────────────────────────────────
                gsap.utils.toArray<HTMLElement>("[data-count]", main).forEach((el) => {
                    const end = Number(el.dataset.count);
                    const state = { v: 0 };
                    gsap.to(state, {
                        v: end,
                        duration: 1.4,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 92%", once: true },
                        onUpdate: () => {
                            el.textContent = String(Math.round(state.v));
                        }
                    });
                });

                // ── parallax ──────────────────────────────────────────────────
                gsap.utils.toArray<HTMLElement>("[data-parallax]", main).forEach((el) => {
                    const amount = Number(el.dataset.parallax);
                    gsap.fromTo(
                        el,
                        { yPercent: -amount },
                        { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 } }
                    );
                });

                // ── the homepage: scroll scrubs the page through the window ───
                const band = main.querySelector<HTMLElement>("[data-page-scroll]");
                const windowEl = band?.querySelector<HTMLElement>("[data-window]");
                // The image that is showing (the desktop page, or the 440 px one on phones).
                const pageImg = Array.from(band?.querySelectorAll<HTMLElement>("[data-page-image]") ?? []).find((img) => getComputedStyle(img).display !== "none");
                const fromKey = pageImg?.hasAttribute("data-mobile") ? "fromMobile" : "from";
                const acts = gsap.utils.toArray<HTMLElement>("[data-act]", band);
                if (band && windowEl && pageImg) {
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
                                // Which act fills the window (measured a third of the way down it).
                                const shown = (self.progress * travel() + windowEl.clientHeight * 0.35) / pageImg.offsetHeight;
                                let current = 0;
                                acts.forEach((act, i) => {
                                    if (shown >= Number(act.dataset[fromKey]) - 0.02) current = i;
                                });
                                acts.forEach((act, i) => act.toggleAttribute("data-on", i === current));
                            }
                        }
                    });
                    acts[0]?.setAttribute("data-on", "");
                }

                // ── the stance: three screens ride the same scroll ────────────
                const stance = main.querySelector<HTMLElement>("[data-stance]");
                if (stance) {
                    gsap.utils.toArray<HTMLElement>("[data-ride]", stance).forEach((img) => {
                        const screen = img.parentElement as HTMLElement;
                        gsap.fromTo(
                            img,
                            { y: 0 },
                            {
                                y: () => -Math.max(0, img.offsetHeight * 0.62 - screen.clientHeight),
                                ease: "none",
                                scrollTrigger: { trigger: stance, start: "top 70%", end: "bottom 30%", scrub: 0.6, invalidateOnRefresh: true }
                            }
                        );
                    });
                }

                return () => {
                    velocity.kill();
                    main.removeAttribute("data-motion");
                    windowEl?.setAttribute("tabindex", "0");
                };
            });

            // ── phones drift at their own speeds (a swipe row on phones) ──────
            mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
                gsap.utils.toArray<HTMLElement>("[data-float]", main).forEach((phone) => {
                    const amount = Number(phone.dataset.float) * 50;
                    gsap.fromTo(
                        phone,
                        { y: amount },
                        { y: -amount, ease: "none", scrollTrigger: { trigger: phone.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 } }
                    );
                });
            });

            // Fonts and images change heights after first layout.
            const refresh = () => ScrollTrigger.refresh();
            document.fonts?.ready.then(refresh);
            window.addEventListener("load", refresh);

            cleanup = () => {
                window.removeEventListener("load", refresh);
                chapterTriggers.forEach((t) => t.kill());
                progress.kill();
                show(0);
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

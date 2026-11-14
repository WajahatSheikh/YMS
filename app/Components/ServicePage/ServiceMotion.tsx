"use client";

import { useEffect } from "react";

// All motion on a service page, on GSAP's one clock (ScrollTrigger).
// Motion verb: "ship to staging". Things slide up into place and settle, like a
// deploy landing; nothing bounces.
//
// One driver for the signature: scroll through the week section. It sets
//   · --p on the stage, 0 → 1: the "now" line down the days, and the reel
//     wiping from grey staging preview to live colour
//   · data-active on the stage, 0 → 4: which day is "now" (days up to it lit)
// On desktop the section grows tall and the stage sticks (CSS sticky, not a
// GSAP pin) while the week plays; on phones it scrubs as the list passes.
//
// The server HTML ships the finished state (Friday, all lit, --p: 1), so
// crawlers, no-JS and reduced-motion visitors see the whole week. GSAP is
// imported on demand, so it is not in the first load.

export default function ServiceMotion() {
    useEffect(() => {
        const page = document.querySelector<HTMLElement>("[data-service-page]");
        if (!page) return;
        let cancelled = false;
        let cleanup: (() => void) | undefined;

        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
            if (cancelled) return;
            gsap.registerPlugin(ScrollTrigger);
            const mm = gsap.matchMedia(page);
            const ease = "expo.out";

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                page.setAttribute("data-motion", "");

                // Reveals: a short rise, opacity and transform only. Opacity, never
                // visibility, so links not yet revealed can still take focus.
                gsap.utils.toArray<HTMLElement>("[data-rise]", page).forEach((el) => {
                    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
                });
                gsap.utils.toArray<HTMLElement>("[data-rise-group]", page).forEach((group) => {
                    const items = group.querySelectorAll<HTMLElement>("[data-rise-item]");
                    gsap.fromTo(
                        items,
                        { opacity: 0, y: 24 },
                        { opacity: 1, y: 0, duration: 0.9, ease, stagger: 0.06, scrollTrigger: { trigger: group, start: "top 85%", once: true } }
                    );
                });

                // The week.
                const section = page.querySelector<HTMLElement>("[data-week]");
                const stage = page.querySelector<HTMLElement>("[data-week-stage]");
                if (!section || !stage) return;
                let last = -1;
                const drive = (p: number) => {
                    stage.style.setProperty("--p", p.toFixed(4));
                    const active = Math.min(4, Math.floor(p * 5));
                    if (active !== last) {
                        last = active;
                        stage.setAttribute("data-active", String(active));
                    }
                };
                drive(0);

                const wide = window.matchMedia("(min-width: 992px) and (min-height: 700px)").matches;
                const trigger = ScrollTrigger.create(
                    wide
                        ? { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.4, invalidateOnRefresh: true, onUpdate: (self) => drive(self.progress) }
                        : { trigger: stage, start: "top 75%", end: "bottom 55%", scrub: 0.4, invalidateOnRefresh: true, onUpdate: (self) => drive(self.progress) }
                );

                return () => {
                    trigger.kill();
                    page.removeAttribute("data-motion");
                    stage.style.setProperty("--p", "1");
                    stage.setAttribute("data-active", "4");
                };
            });

            cleanup = () => mm.revert();
        });

        return () => {
            cancelled = true;
            cleanup?.();
        };
    }, []);

    return null;
}

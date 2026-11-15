"use client";

import { useEffect } from "react";

// Motion for the Squat Smart case study. One clock: GSAP's ticker and
// ScrollTrigger, imported on demand so they are not in the first load.
//
// The driver (DESIGN.md): one value per mat, `stance` (0 = C narrow … 1 = A
// wide), mapped to the feet (--spread, in cqi of the mat), the lit band
// (data-zone) and the zone label. Inputs:
//   · hero mat   [data-mat="hero"]: pointer x across the hero, lagged; at rest a
//                slow rep (--rep) makes the feet sink and spring back. Touch and
//                reduced motion keep the server-rendered Zone B.
//   · stage      [data-stage]: the sticky track's progress in three segments
//                picks A, B, C; links [data-zone-link] jump to a segment.
//   · rail       [data-rail] / [data-rail-line]: page progress; chapters light
//                their tick.
//   · reveals    [data-rise] (+ [data-count] numbers) once, via ScrollTrigger.
//   · drag rail  [data-drag]: mouse drag scrolls the phone rail sideways.
//
// Without script every block is visible and the mats show Zone B. Under reduced
// motion the rail and the stage still track position (they are state, not
// decoration) but nothing animates and there is no idle rep.

const ZONES = [
    { id: "C", label: "Zone C · Inner thigh", spread: 9 },
    { id: "B", label: "Zone B · Quads", spread: 21 },
    { id: "A", label: "Zone A · Glutes", spread: 33 }
] as const;

const zoneAt = (stance: number) => ZONES[stance > 0.66 ? 2 : stance > 0.33 ? 1 : 0];

function applyMat(mat: HTMLElement, stance: number, rep: number, continuous: boolean) {
    const zone = zoneAt(stance);
    const spread = continuous ? 9 + stance * 24 : zone.spread;
    mat.style.setProperty("--spread", spread.toFixed(2));
    mat.style.setProperty("--rep", rep.toFixed(3));
    if (mat.dataset.zone !== zone.id) {
        mat.dataset.zone = zone.id;
        const label = mat.querySelector<HTMLElement>("[data-mat-label]");
        if (label) label.textContent = zone.label;
    }
}

export default function SsMotion() {
    useEffect(() => {
        const main = document.querySelector<HTMLElement>("[data-ss]");
        if (!main) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        let cancelled = false;
        const cleanups: (() => void)[] = [];

        // Drag-to-scroll for the phone rail (pointer input, not a scroll listener).
        main.querySelectorAll<HTMLElement>("[data-drag]").forEach((el) => {
            let down = false;
            let startX = 0;
            let startLeft = 0;
            const onDown = (e: PointerEvent) => {
                if (e.pointerType !== "mouse") return;
                down = true;
                startX = e.clientX;
                startLeft = el.scrollLeft;
                el.setAttribute("data-dragging", "");
            };
            const onMove = (e: PointerEvent) => {
                if (down) el.scrollLeft = startLeft - (e.clientX - startX);
            };
            const onUp = () => {
                down = false;
                el.removeAttribute("data-dragging");
            };
            el.addEventListener("pointerdown", onDown);
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
            cleanups.push(() => {
                el.removeEventListener("pointerdown", onDown);
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);
            });
        });

        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
            if (cancelled) return;
            gsap.registerPlugin(ScrollTrigger);
            const triggers: ScrollTrigger[] = [];
            const ticks: ((time: number) => void)[] = [];

            // Sections below the fold render lazily (content-visibility), so the
            // page height settles late: re-measure when it changes.
            let refreshTimer = 0;
            const resizeWatch = new ResizeObserver(() => {
                window.clearTimeout(refreshTimer);
                refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
            });
            resizeWatch.observe(main);

            // ── rail ──────────────────────────────────────────────────────
            const rail = main.querySelector<HTMLElement>("[data-rail]");
            const line = main.querySelector<HTMLElement>("[data-rail-line]");
            triggers.push(
                ScrollTrigger.create({
                    start: 0,
                    end: "max",
                    onUpdate: (self) => {
                        const p = self.progress.toFixed(4);
                        rail?.style.setProperty("--p", p);
                        rail?.toggleAttribute("data-away", self.progress > 0.94);
                        line?.style.setProperty("--p", p);
                    }
                })
            );
            const tickEls = rail ? Array.from(rail.querySelectorAll<HTMLElement>("[data-tick]")) : [];
            const light = (count: number) => tickEls.forEach((t, i) => t.toggleAttribute("data-on", i < count));
            main.querySelectorAll<HTMLElement>("[data-chapter]").forEach((chapter) => {
                const n = Number(chapter.dataset.chapter);
                triggers.push(ScrollTrigger.create({ trigger: chapter, start: "top 55%", onEnter: () => light(n + 1), onLeaveBack: () => light(n) }));
            });

            // ── stage: three scroll segments, A → B → C ───────────────────
            const track = main.querySelector<HTMLElement>("[data-stage]");
            const stageMat = main.querySelector<HTMLElement>('[data-mat="stage"]');
            if (track && stageMat) {
                const order = ["A", "B", "C"] as const;
                const stanceOf: Record<string, number> = { A: 1, B: 0.5, C: 0 };
                const links = Array.from(track.querySelectorAll<HTMLAnchorElement>("[data-zone-link]"));
                let active = "";
                const setActive = (id: string) => {
                    if (id === active) return;
                    active = id;
                    track.dataset.active = id;
                    links.forEach((a) => (a.dataset.zoneLink === id ? a.setAttribute("aria-current", "step") : a.removeAttribute("aria-current")));
                    applyMat(stageMat, stanceOf[id], Number(stageMat.style.getPropertyValue("--rep") || 0), false);
                };
                // Under reduced motion the stage stays a plain, unpinned block with all
                // three panels visible; the mat still follows the reader.
                if (!reduce) track.setAttribute("data-ready", "");
                const stageRep = (time: number) => stageMat.style.setProperty("--rep", ((Math.sin(time * Math.PI * 0.5) + 1) / 2).toFixed(3));
                ticks.push(stageRep);
                const st = ScrollTrigger.create({
                    trigger: track,
                    start: reduce ? "top 60%" : "top top",
                    end: reduce ? "bottom 40%" : "bottom bottom",
                    invalidateOnRefresh: true,
                    onUpdate: (self) => setActive(order[Math.min(2, Math.floor(self.progress * 3))]),
                    onToggle: (self) => {
                        if (reduce) return;
                        if (self.isActive) gsap.ticker.add(stageRep);
                        else gsap.ticker.remove(stageRep);
                    }
                });
                triggers.push(st);
                if (!active) setActive("A");
                const onLink = (e: Event) => {
                    const id = (e.currentTarget as HTMLElement).dataset.zoneLink ?? "A";
                    e.preventDefault();
                    const i = order.indexOf(id as (typeof order)[number]);
                    const top = st.start + ((i + 0.5) / 3) * (st.end - st.start);
                    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
                    setActive(id);
                };
                links.forEach((a) => a.addEventListener("click", onLink));
                cleanups.push(() => links.forEach((a) => a.removeEventListener("click", onLink)));
            }

            // ── hero mat: pointer stance + idle rep ────────────────────────
            const heroMat = main.querySelector<HTMLElement>('[data-mat="hero"]');
            const hero = heroMat?.closest<HTMLElement>("section");
            if (heroMat && hero && !reduce) {
                const state = { aim: 0.5, cur: 0.5 };
                const onPointer = (e: PointerEvent) => {
                    const r = hero.getBoundingClientRect();
                    state.aim = gsap.utils.clamp(0, 1, (e.clientX - r.left) / r.width);
                };
                if (fine) {
                    hero.addEventListener("pointermove", onPointer);
                    cleanups.push(() => hero.removeEventListener("pointermove", onPointer));
                }
                heroMat.setAttribute("data-live", "");
                const heroTick = (time: number) => {
                    const k = 1 - Math.pow(0.9, gsap.ticker.deltaRatio());
                    state.cur += (state.aim - state.cur) * k;
                    const rep = (Math.sin(time * Math.PI * 0.5) + 1) / 2; // one rep every 4 s
                    applyMat(heroMat, state.cur, rep, true);
                };
                ticks.push(heroTick);
                triggers.push(
                    ScrollTrigger.create({
                        trigger: hero,
                        start: "top bottom",
                        end: "bottom top",
                        onToggle: (self) => (self.isActive ? gsap.ticker.add(heroTick) : gsap.ticker.remove(heroTick))
                    })
                );
            }

            // ── reveals + counters ─────────────────────────────────────────
            if (!reduce) {
                main.setAttribute("data-motion", "");
                const count = (el: HTMLElement) => {
                    const to = Number(el.dataset.count);
                    const decimals = Number(el.dataset.decimals || 0);
                    const o = { v: 0 };
                    gsap.to(o, { v: to, duration: 1.1, ease: "power3.out", onUpdate: () => {
                        el.textContent = o.v.toFixed(decimals);
                    } });
                };
                triggers.push(
                    ...ScrollTrigger.batch("[data-rise]", {
                        start: "top 88%",
                        once: true,
                        onEnter: (els) =>
                            els.forEach((el, i) => {
                                window.setTimeout(() => el.setAttribute("data-in", ""), i * 60);
                                el.querySelectorAll<HTMLElement>("[data-count]").forEach(count);
                            })
                    })
                );
            }

            cleanups.push(() => {
                resizeWatch.disconnect();
                window.clearTimeout(refreshTimer);
                ticks.forEach((t) => gsap.ticker.remove(t));
                triggers.forEach((t) => t.kill());
                main.removeAttribute("data-motion");
            });
        });

        return () => {
            cancelled = true;
            cleanups.forEach((c) => c());
        };
    }, []);

    return null;
}

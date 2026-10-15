"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import style from "./index.module.scss";
import type { FluidMaskConfig } from "./fluidMask";
import { createOrbitTiles, type OrbitTilesConfig } from "./orbitTiles";

export interface FluidRevealItem {
    src: string;
    /**
     * Optional, and deliberately not rendered as alt text: the whole layer is
     * aria-hidden decoration, so the images must carry an empty alt. Use it as
     * an inline note about which asset this is.
     */
    label?: string;
}

interface FluidRevealProps {
    /** Cards revealed behind the mask. Use local /public paths — next.config has no remotePatterns. */
    items: FluidRevealItem[];
    /**
     * CSS custom property whose colour the mask paints. The canvas has to match
     * the section background exactly or the cut-out shows as a visible rectangle.
     */
    coverVar?: string;
    /**
     * Fraction of the section's width the orbit should sweep, 0..1.
     * The canvas always covers the whole section; this controls how far the
     * cards travel, i.e. how much of it actually has something to reveal.
     * Overridden by an explicit `orbit.radius`.
     */
    coverage?: number;
    fluid?: Partial<FluidMaskConfig>;
    orbit?: Partial<OrbitTilesConfig>;
    className?: string;
}

// Touch-first devices (phones, iPads): no hovering cursor to reveal anything.
// Keep in sync with the media query on .reveal in index.module.scss.
const TOUCH_QUERY = "(hover: none), (pointer: coarse)";

const FluidReveal = ({
    items,
    coverVar = "--bg-canvas",
    coverage = 0.8,
    fluid: fluidOverrides,
    orbit: orbitOverrides,
    className
}: FluidRevealProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Overrides live in refs so changing them never re-runs the WebGL setup.
    const fluidCfg = useRef(fluidOverrides);
    const orbitCfg = useRef(orbitOverrides);
    const coverageRef = useRef(coverage);
    fluidCfg.current = fluidOverrides;
    orbitCfg.current = orbitOverrides;
    coverageRef.current = coverage;

    // The mask paints the section colour it read at setup, so a theme switch
    // has to rebuild it (ThemeToggle fires `themechange`).
    const [themeKey, setThemeKey] = useState(0);
    useEffect(() => {
        const onThemeChange = () => setThemeKey((k) => k + 1);
        window.addEventListener("themechange", onThemeChange);
        return () => window.removeEventListener("themechange", onThemeChange);
    }, []);

    useEffect(() => {
        const root = rootRef.current;
        const canvas = canvasRef.current;
        const track = trackRef.current;
        if (!root || !canvas || !track) return;

        // Phones and tablets: the effect is revealed by a hovering cursor, which
        // touch screens don't have, so the whole layer is display:none there
        // (see TOUCH_QUERY in index.module.scss) and nothing here runs.
        if (window.matchMedia(TOUCH_QUERY).matches) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const tiles = Array.from(track.querySelectorAll<HTMLElement>("[data-orbit-item]"));
        const orbit = createOrbitTiles(track, tiles, orbitCfg.current);

        // Size the orbit to the section rather than to a fixed 384px, so the
        // cards actually sweep the width instead of a narrow band in the middle.
        // The outermost card's own width pokes past the radius, so subtract it —
        // otherwise "80%" would really be ~94%.
        const explicitRadius = orbitCfg.current?.radius;
        const applyRadius = () => {
            if (!orbit || explicitRadius != null) return;
            const width = root.clientWidth;
            if (width < 1) return;
            const cardWidth = track.offsetWidth; // layout width, ignores transforms
            const span = width * coverageRef.current - cardWidth * orbit.extremeScale();
            orbit.setRadius(Math.max(0, span / 2));
            orbit.layout();
        };
        applyRadius();
        orbit?.layout(); // covers the explicit-radius case, where applyRadius bails

        const orbitResize =
            typeof ResizeObserver !== "undefined" ? new ResizeObserver(applyRadius) : null;
        orbitResize?.observe(root);

        // Reduced motion keeps everything still and the canvas is hidden in CSS,
        // so skip the WebGL simulation (context, shader compiles, two frame
        // loops) outright and leave the cards where layout put them.
        if (reduced) {
            root.dataset.ready = "";
            return () => orbitResize?.disconnect();
        }

        // Desktop with a fine pointer: only now fetch the WebGL simulation, so its
        // ~700 lines never ride in the bundle every phone downloads and runs.
        const startMask = ({ createFluidMask, cssColorToRgb01 }: typeof import("./fluidMask")) => {
            // Read the real background colour off the element so the mask can never
            // drift from the design token.
            const coverRaw = getComputedStyle(root).getPropertyValue(coverVar).trim();
            const cover = cssColorToRgb01(coverRaw) ?? undefined;

            const mask = createFluidMask(canvas, {
                ...(cover ? { COVER: cover } : {}),
                ...fluidCfg.current
            });

            if (!mask) {
                // No WebGL — drop the cover entirely rather than hiding the tiles
                // behind an opaque canvas.
                canvas.style.display = "none";
                root.dataset.ready = "";
                return undefined;
            }

            // Reveal the cards a frame later, once the mask has painted its cover
            // over them (see .orbit in index.module.scss).
            const readyId = requestAnimationFrame(() => {
                root.dataset.ready = "";
            });

            let last: { x: number; y: number } | null = null;
            let moved = 0;

            // Listening on window rather than the section keeps the effect alive
            // while the pointer is over the hero's headline and CTAs.
            const onPointerMove = (e: PointerEvent) => {
                const r = root.getBoundingClientRect();
                if (r.width < 1 || r.height < 1) return;

                const x = (e.clientX - r.left) / r.width;
                const y = 1 - (e.clientY - r.top) / r.height; // GL origin is bottom-left
                if (x < 0 || x > 1 || y < 0 || y > 1) {
                    last = null;
                    return;
                }

                if (last) {
                    const dx = x - last.x;
                    const dy = y - last.y;
                    const px = Math.hypot(dx * r.width, dy * r.height);
                    moved += px;
                    // Interpolate so a fast flick leaves a continuous trail, not dots.
                    const steps = Math.min(Math.ceil(px / 12), 12);
                    for (let i = 1; i <= steps; i++) {
                        const k = i / steps;
                        mask.splatNormalized(last.x + dx * k, last.y + dy * k, dx * 0.9, dy * 0.9, 1);
                    }
                } else {
                    mask.splatNormalized(x, y, 0, 0, 0.6);
                }
                last = { x, y };
            };

            const onPointerLeave = () => {
                last = null;
            };

            window.addEventListener("pointermove", onPointerMove, { passive: true });
            document.addEventListener("pointerleave", onPointerLeave);

            // The orbit runs on its own rAF: the fluid sim has one too, but the
            // orbit must keep easing toward its target on frames with no pointer.
            let rafId = 0;
            let prev = performance.now();
            const loop = (now: number) => {
                const dt = Math.min((now - prev) / 1000, 0.05);
                prev = now;
                if (orbit) {
                    orbit.advance(moved);
                    orbit.tick(dt);
                }
                moved = 0;
                rafId = requestAnimationFrame(loop);
            };
            rafId = requestAnimationFrame(loop);

            // Both loops sleep while the hero is scrolled away, so the rest of the
            // page doesn't pay for a simulation nobody can see.
            let visible = true;
            const visibility = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting === visible) return;
                visible = entry.isIntersecting;
                if (visible) {
                    mask.resume();
                    prev = performance.now();
                    rafId = requestAnimationFrame(loop);
                } else {
                    mask.pause();
                    cancelAnimationFrame(rafId);
                }
            });
            visibility.observe(root);


            return () => {
                window.removeEventListener("pointermove", onPointerMove);
                document.removeEventListener("pointerleave", onPointerLeave);
                visibility.disconnect();
                cancelAnimationFrame(rafId);
                cancelAnimationFrame(readyId);
                mask.destroy();
            };
        };

        // Idle, the mask paints the same colour as the section, so nothing shows
        // until the cursor moves. Setting it up (WebGL context, shader compiles)
        // is a single ~0.5s task, so it waits for that first movement instead of
        // landing in the page-load window.
        let disposed = false;
        let stopMask: (() => void) | undefined;
        const begin = () => {
            window.removeEventListener("pointermove", begin);
            import("./fluidMask").then((fluid) => {
                if (!disposed) stopMask = startMask(fluid);
            });
        };
        window.addEventListener("pointermove", begin, { passive: true });

        return () => {
            disposed = true;
            window.removeEventListener("pointermove", begin);
            orbitResize?.disconnect();
            stopMask?.();
        };
        // `coverage` is read through a ref inside applyRadius, but it still has to
        // re-run the effect: nothing else would re-apply the radius until the
        // next resize. `themeKey` re-runs it so the mask re-reads its colour.
    }, [coverVar, coverage, themeKey]);

    return (
        <div
            ref={rootRef}
            className={className ? `${style.reveal} ${className}` : style.reveal}
            aria-hidden="true"
        >
            <div className={style.orbit}>
                <div className={style.track} ref={trackRef}>
                    {items.map((item, i) => (
                        <div className={style.item} data-orbit-item key={`${item.src}-${i}`}>
                            <div className={style.card}>
                                {/* lazy, NOT eager or `priority`. On phones and
                                    tablets the layer is display:none, and a lazy
                                    image there is never fetched. On desktop it
                                    still loads at once (it's in the viewport), and
                                    the cards stay hidden until the mask covers
                                    them anyway (data-ready), so nothing is lost.
                                    `priority` would preload decoration at high
                                    fetchpriority, competing with the real LCP. */}
                                <Image
                                    src={item.src}
                                    alt=""
                                    fill
                                    sizes="384px"
                                    loading="lazy"
                                    className={style.image}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Keyed by theme: tearing the old mask down deliberately loses its
                WebGL context, and a canvas can never get a working context
                back after that — so each rebuild gets a fresh element. */}
            <canvas key={themeKey} className={style.canvas} ref={canvasRef} />
        </div>
    );
};

export default FluidReveal;

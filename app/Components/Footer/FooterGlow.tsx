"use client";

import { useEffect, useRef } from "react";
import style from "./index.module.scss";

// Cursor-reactive colour field for the footer background, after the footer plane
// at sharebien.com.
//
// The reference is not a hover trail: a large colour mass sits along the bottom
// of the footer at rest, the cursor pushes its *shape* around, and a grain
// texture sits over the colour. So the mass is drawn every frame regardless of
// input, and the pointer only displaces it.
//
// It is built from a row of overlapping blobs. Each blob has a rest position and
// is pushed away from the cursor with a radial falloff, then springs back — that
// is what makes the silhouette deform rather than just brighten. The reference
// shader does the same thing on a velocity texture:
//
//   dist = 1. - smoothstep(0., 0.22, distance(uv, uMouse));
//   color.rg += uDeltaMouse * dist;
//   color.rg *= min(0.945, uMouseMove);
//
// Deliberately not a second WebGL context — the hero already runs a full fluid
// simulation, and a footer background does not justify another one.

/** Blobs across the width. Enough to read as one mass, few enough to stay cheap. */
const BLOB_COUNT = 9;
/** Cursor influence radius, as a fraction of the footer's width. */
const INFLUENCE = 0.28;
/**
 * The furthest a blob may sit from its rest spot, in px. This is a hard ceiling,
 * not a force: the cursor displaces each blob toward a target at most this far
 * away, so the row can never be flung apart no matter how fast the pointer
 * moves. Past roughly a third of the blob spacing neighbours stop overlapping
 * and the mass tears open, showing the page background through the gap.
 */
const PUSH = 46;
/** Spring back toward rest. */
const STIFFNESS = 0.055;
const DAMPING = 0.82;
/** Height of the mass as a fraction of the footer, and how far it sits below it. */
const MASS_HEIGHT = 0.62;
const MAX_DPR = 2;

interface Blob {
    restX: number;
    restY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    /** Slow idle drift so the mass is never completely static. */
    phase: number;
}

const FooterGlow = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const host = canvas?.parentElement;
        if (!canvas || !host) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

        // Colour comes from the token, so the field follows --bg-brand.
        const brand =
            getComputedStyle(document.documentElement).getPropertyValue("--bg-brand").trim() ||
            "#e85002";
        const rgb = hexToRgb(brand) ?? { r: 232, g: 80, b: 2 };

        let width = 0;
        let height = 0;
        let blobs: Blob[] = [];

        const build = () => {
            const rect = host.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.max(1, Math.round(width * dpr));
            canvas.height = Math.max(1, Math.round(height * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Rest line sits just below the footer's bottom edge so the mass
            // reads as rising out of it rather than floating in the middle.
            const restY = height * (1 - MASS_HEIGHT) + height * MASS_HEIGHT * 0.72;
            const step = width / (BLOB_COUNT - 1);

            blobs = Array.from({ length: BLOB_COUNT }, (_, i) => {
                const restX = step * i;
                return {
                    restX,
                    restY,
                    x: restX,
                    y: restY,
                    vx: 0,
                    vy: 0,
                    // Wider blobs than the gap, so neighbours merge into one mass.
                    radius: step * 1.5,
                    phase: i * 1.7
                };
            });
        };

        build();
        const resizeObserver = new ResizeObserver(build);
        resizeObserver.observe(host);

        let pointerX = -9999;
        let pointerY = -9999;

        const onMove = (e: PointerEvent) => {
            const rect = host.getBoundingClientRect();
            pointerX = e.clientX - rect.left;
            pointerY = e.clientY - rect.top;
        };

        const onLeave = () => {
            pointerX = -9999;
            pointerY = -9999;
        };

        if (finePointer.matches) {
            host.addEventListener("pointermove", onMove);
            host.addEventListener("pointerleave", onLeave);
        }

        let visible = true;
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        intersectionObserver.observe(host);

        let frame: number | null = null;
        let time = 0;

        const draw = () => {
            frame = requestAnimationFrame(draw);
            if (!visible || width === 0) return;

            ctx.clearRect(0, 0, width, height);
            time += 0.005;

            const influence = width * INFLUENCE;

            ctx.globalCompositeOperation = "lighter";

            for (const blob of blobs) {
                if (!reduced.matches) {
                    // The displacement is measured from the blob's rest spot, not
                    // from where it currently sits. Measuring from the live
                    // position fed the push back into itself — a shoved blob was
                    // further from the cursor next frame only because it had
                    // already been shoved, so it kept accelerating until the
                    // falloff ran out, hundreds of px from home. As a rest-relative
                    // field the offset is bounded by PUSH by construction.
                    const dx = blob.restX - pointerX;
                    const dy = blob.restY - pointerY;
                    const dist = Math.hypot(dx, dy);

                    let targetX = blob.restX;
                    let targetY = blob.restY;

                    if (dist < influence && dist > 0.001) {
                        const falloff = 1 - smoothstep(0, influence, dist);
                        targetX += (dx / dist) * falloff * PUSH;
                        targetY += (dy / dist) * falloff * PUSH;
                    }

                    // Spring toward that target, so the shape lags the cursor and
                    // settles back rather than snapping.
                    blob.vx += (targetX - blob.x) * STIFFNESS;
                    blob.vy += (targetY - blob.y) * STIFFNESS;
                    blob.vx *= DAMPING;
                    blob.vy *= DAMPING;
                    blob.x += blob.vx;
                    blob.y += blob.vy;
                }

                // Idle breathing keeps the mass alive with no cursor at all.
                const driftY = Math.sin(time + blob.phase) * height * 0.03;
                const driftR = 1 + Math.sin(time * 1.3 + blob.phase) * 0.06;
                const r = blob.radius * driftR;

                const gradient = ctx.createRadialGradient(
                    blob.x,
                    blob.y + driftY,
                    0,
                    blob.x,
                    blob.y + driftY,
                    r
                );
                gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
                gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.16)`);
                gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(blob.x, blob.y + driftY, r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        frame = requestAnimationFrame(draw);

        return () => {
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            host.removeEventListener("pointermove", onMove);
            host.removeEventListener("pointerleave", onLeave);
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className={style.glow} aria-hidden="true" />
            {/* Grain over the colour, as in the reference. Its own layer so the
                noise does not get blurred along with the mass. */}
            <span className={style.grain} aria-hidden="true" />
        </>
    );
};

function smoothstep(edge0: number, edge1: number, x: number) {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!match) return null;
    return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16)
    };
}

export default FooterGlow;

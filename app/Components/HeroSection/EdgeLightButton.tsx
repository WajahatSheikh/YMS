"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/app/contexts/LenisContext";
import { scrollToSection } from "@/app/lib/scrollToSection";
import style from "./edgeLightButton.module.scss";

// A light rides along the button following the cursor on a critically-ish
// damped spring; as it nears either end, that edge lights up and spills a glow
// outside the pill.
//
// Physics and constants are as supplied. The markup is the same structure, moved
// onto a CSS module — the rest of this codebase has no global stylesheets, and
// unscoped names like `.edge-light-button__glow` would be the one thing that
// could collide with another component later.

const FREQUENCY = 3.4;
const DAMPING = 0.78;
const GLOW_RISE = 0.5;
const EDGE_SATURATION = 0.55;
const EDGE_BRIGHTNESS = 0.12;
const HUE_SHIFT = -5;

interface EdgeLightButtonProps {
    label: string;
    /** Section id to smooth-scroll to on click — lets a server component use the button. */
    scrollTarget?: string;
    onClick?: () => void;
    className?: string;
}

const EdgeLightButton = ({ label, scrollTarget, onClick: onClickProp, className }: EdgeLightButtonProps) => {
    const lenis = useLenis();
    const onClick = scrollTarget ? () => scrollToSection(scrollTarget, lenis) : onClickProp;
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const lightTrackRef = useRef<HTMLSpanElement>(null);
    const rightGlowRef = useRef<HTMLSpanElement>(null);
    const leftGlowRef = useRef<HTMLSpanElement>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const button = buttonRef.current;
        const lightTrack = lightTrackRef.current;
        const rightGlow = rightGlowRef.current;
        const leftGlow = leftGlowRef.current;
        if (!container || !button || !lightTrack || !rightGlow || !leftGlow) return;

        let bound = container.getBoundingClientRect().width / 2 + 12;
        let x = bound;
        let velocity = 0;
        let target = bound;
        let inside = false;
        let last = 0;

        const measure = () => {
            bound = container.getBoundingClientRect().width / 2 + 12;
        };

        const paint = () => {
            lightTrack.style.setProperty("--light-x", `${x.toFixed(2)}px`);
            const normalized = Math.max(-1, Math.min(1, x / bound));
            const magnitude = Math.abs(normalized);
            const intensity = Math.pow(magnitude, GLOW_RISE);
            const colorTuning =
                `hue-rotate(${HUE_SHIFT}deg)` +
                ` saturate(${(1 + EDGE_SATURATION * magnitude).toFixed(3)})` +
                ` brightness(${(1 + EDGE_BRIGHTNESS * magnitude).toFixed(3)})`;

            rightGlow.style.opacity = (normalized > 0 ? intensity : 0).toFixed(3);
            leftGlow.style.opacity = (normalized < 0 ? intensity : 0).toFixed(3);
            rightGlow.style.filter = colorTuning;
            leftGlow.style.filter = colorTuning;
        };

        measure();
        paint();
        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(container);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return () => resizeObserver.disconnect();
        }

        const frame = (now = performance.now()) => {
            const delta = Math.min((now - last) / 1000, 0.032);
            last = now;
            const angularFrequency = 2 * Math.PI * FREQUENCY;
            velocity +=
                (angularFrequency * angularFrequency * (target - x) -
                    2 * DAMPING * angularFrequency * velocity) *
                delta;
            x += velocity * delta;
            paint();

            if (inside || Math.abs(target - x) > 0.15 || Math.abs(velocity) > 0.6) {
                animationFrameRef.current = requestAnimationFrame(frame);
            } else {
                animationFrameRef.current = null;
                x = target;
                velocity = 0;
                paint();
            }
        };

        const kick = () => {
            if (animationFrameRef.current === null) {
                last = performance.now();
                animationFrameRef.current = requestAnimationFrame(frame);
            }
        };

        const onPointerMove = (event: PointerEvent) => {
            const bounds = container.getBoundingClientRect();
            inside = true;
            target = Math.max(
                -bound,
                Math.min(bound, event.clientX - (bounds.left + bounds.width / 2))
            );
            kick();
        };

        const onPointerLeave = () => {
            inside = false;
            target = x;
            kick();
        };

        const onFocus = () => {
            inside = false;
            target = 0;
            kick();
        };

        const onBlur = () => {
            inside = false;
            target = x;
            kick();
        };

        // addEventListener rather than the on* properties the original used, so
        // this cannot silently clobber another handler on the same node.
        container.addEventListener("pointermove", onPointerMove);
        container.addEventListener("pointerleave", onPointerLeave);
        button.addEventListener("focus", onFocus);
        button.addEventListener("blur", onBlur);

        return () => {
            resizeObserver.disconnect();
            container.removeEventListener("pointermove", onPointerMove);
            container.removeEventListener("pointerleave", onPointerLeave);
            button.removeEventListener("focus", onFocus);
            button.removeEventListener("blur", onBlur);
            if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    const Glow = ({
        innerRef,
        mirrored
    }: {
        innerRef: React.RefObject<HTMLSpanElement | null>;
        mirrored?: boolean;
    }) => (
        <span
            ref={innerRef}
            className={`${style.glow} ${mirrored ? style.mirrored : ""}`}
            aria-hidden="true"
        >
            <span className={style.outerGlow} />
            <span className={style.innerGlow} />
            <span className={style.rim}>
                <span className={style.rimGlow} />
            </span>
        </span>
    );

    return (
        <div ref={containerRef} className={`${style.wrap} ${className ?? ""}`}>
            <Glow innerRef={rightGlowRef} />
            <Glow innerRef={leftGlowRef} mirrored />

            <button ref={buttonRef} type="button" className={style.control} onClick={onClick}>
                <span ref={lightTrackRef} className={style.lightTrack} aria-hidden="true">
                    <span className={style.lightCore} />
                    <span className={style.lightBloom} />
                </span>
                <span className={style.label}>{label}</span>
                <svg
                    className={style.arrow}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 9"
                    aria-hidden="true"
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default EdgeLightButton;

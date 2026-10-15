"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePageTransition } from "@/app/contexts/PageTransitionContext";
import style from "./index.module.scss";

// The loader between pages. Five brand columns sweep up, dark columns follow;
// while the next page loads, the wordmark reveals over "Opening case study ·
// <title>" with a progress bar and counter; then the columns lift away.
// Phases come from PageTransitionContext; the motion is all CSS, keyed off
// data-phase. Always dark (it's a curtain), whatever the page theme.

const COLUMNS = 5;

const PageTransition = () => {
    const { phase, label, href } = usePageTransition();
    const [progress, setProgress] = useState(0);
    const frame = useRef<number | null>(null);

    // The counter creeps toward 92 while the route loads (it can't know the
    // real figure), then completes when the reveal starts.
    useEffect(() => {
        if (phase === "cover" || phase === "hold") {
            const tick = () => {
                setProgress((p) => (p >= 92 ? p : p + Math.max(0.4, (92 - p) * 0.045)));
                frame.current = requestAnimationFrame(tick);
            };
            frame.current = requestAnimationFrame(tick);
        } else if (phase === "reveal") {
            setProgress(100);
        } else {
            setProgress(0);
        }
        return () => {
            if (frame.current !== null) cancelAnimationFrame(frame.current);
            frame.current = null;
        };
    }, [phase]);

    const toHome = href === "/" || href.startsWith("/#");
    const kicker = toHome ? "Heading back" : href.startsWith("/portfolio") ? "Opening case study" : "Loading";
    const title = label || (toHome ? "Home" : "");
    const count = String(Math.round(progress)).padStart(3, "0");

    return (
        <div className={style.overlay} data-phase={phase} data-theme="dark" aria-hidden={phase === "idle"}>
            <div className={style.cols} aria-hidden="true">
                {Array.from({ length: COLUMNS }, (_, i) => (
                    <span key={i} className={style.colBrand} style={{ "--i": i } as React.CSSProperties} />
                ))}
            </div>
            <div className={style.cols} aria-hidden="true">
                {Array.from({ length: COLUMNS }, (_, i) => (
                    <span key={i} className={style.colDark} style={{ "--i": i } as React.CSSProperties} />
                ))}
            </div>

            <div className={style.content} role="status">
                <Image
                    className={style.wordmark}
                    src="/assets/images/yms-wordmark-560.webp"
                    width={560}
                    height={118}
                    alt=""
                    unoptimized
                />
                <p className={style.kicker}>{kicker}</p>
                {title && <p className={style.title}>{title}</p>}
                <div className={style.meter} aria-hidden="true">
                    <span className={style.bar}>
                        <span className={style.fill} style={{ transform: `scaleX(${progress / 100})` }} />
                    </span>
                    <span className={style.count}>{count}</span>
                </div>
                {/* Read once by screen readers when the loader appears. */}
                <span className={style.srOnly}>{phase === "idle" ? "" : `Loading ${title || "page"}`}</span>
            </div>
        </div>
    );
};

export default PageTransition;

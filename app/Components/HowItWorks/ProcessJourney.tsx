"use client";

import { useEffect, useRef, useState } from "react";
import { NODES } from "./geometry";
import style from "./index.module.scss";

// The interactive shell of the process section: which phase is active, the
// auto-cycle, and the one-time reveal. Everything inside it — copy,
// illustrations, deliverables, the graph — is server-rendered in HowItWorks.tsx
// and passed in, so this file holds only state.

export interface JourneyPhase {
    title: string;
    /** Illustration + week + title + summary, rendered inside the card button. */
    card: React.ReactNode;
    /** "Led by" + "What you get", shown inline on mobile and in the shared panel above. */
    detail: React.ReactNode;
}

const ProcessJourney = ({
    head,
    graph,
    phases,
    callout
}: {
    head: React.ReactNode;
    graph: React.ReactNode;
    phases: JourneyPhase[];
    callout: React.ReactNode;
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);
    const [inView, setInView] = useState(false);
    const [seen, setSeen] = useState(false);
    const [touched, setTouched] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
                if (entry.isIntersecting) setSeen(true);
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Cycle the phases while the section is on screen, until the visitor takes over.
    useEffect(() => {
        if (!inView || touched || reduced) return;
        const id = window.setInterval(() => setActive((a) => (a + 1) % phases.length), 5000);
        return () => window.clearInterval(id);
    }, [inView, touched, reduced, phases.length]);

    const pick = (i: number) => {
        setTouched(true);
        setActive(i);
    };

    return (
        <section
            id="process"
            ref={sectionRef}
            className={`${style.section} ${seen || reduced ? style.inView : ""}`}
            style={{ "--progress": (NODES[active].x + 6) / 1000 } as React.CSSProperties}
        >
            {head}

            <div className={style.journey}>
                {/* the line graph is decorative — the cards carry the meaning */}
                <div className={style.graph} aria-hidden="true">
                    {graph}
                    {NODES.map((n, i) => (
                        <button
                            key={i}
                            type="button"
                            tabIndex={-1}
                            className={`${style.node} ${i <= active ? style.nodeDone : ""} ${i === active ? style.nodeActive : ""}`}
                            style={{ left: `${n.x / 10}%`, top: `${(n.y / 160) * 100}%`, "--i": i } as React.CSSProperties}
                            onClick={() => pick(i)}
                        >
                            <span>{String(i + 1).padStart(2, "0")}</span>
                        </button>
                    ))}
                </div>

                <ol className={style.phases} onPointerEnter={() => setTouched(true)}>
                    {phases.map((p, i) => {
                        const isActive = i === active;
                        return (
                            <li
                                key={p.title}
                                className={`${style.phase} ${isActive ? style.active : ""}`}
                                style={{ "--i": i } as React.CSSProperties}
                            >
                                <button
                                    type="button"
                                    className={style.card}
                                    aria-expanded={isActive}
                                    aria-controls={`process-detail-${i}`}
                                    onClick={() => pick(i)}
                                    onFocus={() => setTouched(true)}
                                >
                                    {p.card}
                                </button>
                                {/* mobile: details open inline under the phase */}
                                <div className={style.inline} id={`process-detail-${i}`} role="region" aria-label={p.title}>
                                    <div className={style.inlineInner}>{p.detail}</div>
                                </div>
                            </li>
                        );
                    })}
                </ol>

                {/* tablet + desktop: one shared panel for the active phase */}
                <div className={style.panel} aria-live="polite">
                    <div key={active} className={style.panelInner}>
                        {phases[active].detail}
                    </div>
                </div>
            </div>

            {callout}
        </section>
    );
};

export default ProcessJourney;

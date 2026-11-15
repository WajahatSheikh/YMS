"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./ss.module.scss";

// Direction A vs B: drag the handle (or use the arrow keys on the range input)
// to wipe between the two homepage directions. B sits underneath; A is clipped
// from the right by --pos. The native range input sits on top, invisible, so
// keyboard and screen readers get a real slider.

interface Shot {
    tag: string;
    text: string;
    src: string;
    alt: string;
}

export default function CompareSlider({ a, b }: { a: Shot; b: Shot }) {
    const [pos, setPos] = useState(50);

    return (
        <figure className={s.compare} style={{ "--pos": `${pos}%` } as React.CSSProperties}>
            <div className={s.compareFrame}>
                <Image className={s.compareB} src={b.src} alt={b.alt} width={1600} height={900} sizes="(max-width: 767px) 92vw, 80vw" />
                <div className={s.compareA} aria-hidden={pos < 2}>
                    <Image src={a.src} alt={a.alt} width={1600} height={900} sizes="(max-width: 767px) 92vw, 80vw" />
                </div>
                <span className={s.compareHandle} aria-hidden="true">
                    <i>
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M9 6 3 12l6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </i>
                </span>
                <input
                    className={s.compareInput}
                    type="range"
                    min={0}
                    max={100}
                    value={pos}
                    onChange={(e) => setPos(Number(e.target.value))}
                    aria-label="Compare direction A (left) with direction B (right)"
                />
            </div>
            <figcaption className={s.compareCaption}>
                <span data-side="a">
                    <b>{a.tag}</b> {a.text}
                </span>
                <span data-side="b">
                    <b>{b.tag}</b> {b.text}
                </span>
            </figcaption>
        </figure>
    );
}

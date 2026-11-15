"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./ss.module.scss";

// The product card from the store, rebuilt in code: pick a colour and the mat
// swaps; Add to Cart confirms and bumps the little cart. Nothing is sold here,
// it is a demo of the component, so the cart is local state only.

interface Mat {
    id: string;
    label: string;
    swatch: string;
    src: string;
    alt: string;
}

export default function SwatchCard({ mats, price }: { mats: readonly Mat[]; price: string }) {
    const [pick, setPick] = useState(0);
    const [count, setCount] = useState(0);
    const [added, setAdded] = useState(false);
    const timer = useRef(0);
    const mat = mats[pick];

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const add = () => {
        setCount((c) => c + 1);
        setAdded(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className={s.card}>
            <span className={s.cardCart} aria-live="polite">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
                <span className={s.visuallyHidden}>Demo cart: </span>
                {count}
                <span className={s.visuallyHidden}> {count === 1 ? "item" : "items"}</span>
            </span>
            <div className={s.cardMedia}>
                {mats.map((m, i) => (
                    <Image key={m.id} src={m.src} alt={i === pick ? m.alt : ""} width={801} height={379} sizes="(max-width: 767px) 80vw, 380px" data-on={i === pick ? "" : undefined} />
                ))}
            </div>
            <p className={s.cardTitle}>Squat Smart Training Mat · {mat.label}</p>
            <p className={s.cardPrice}>
                {price}
                <span className={s.cardStars} aria-label="4.7 out of 5 stars">
                    ★★★★★
                </span>
            </p>
            <fieldset className={s.cardSwatches}>
                <legend>Colour: {mat.label}</legend>
                {mats.map((m, i) => (
                    <label key={m.id} style={{ "--sw": m.swatch } as React.CSSProperties}>
                        <input type="radio" name="mat-colour" checked={i === pick} onChange={() => setPick(i)} />
                        <span className={s.visuallyHidden}>{m.label}</span>
                    </label>
                ))}
            </fieldset>
            <button type="button" className={`${s.btn} ${s.btnBlue} ${s.cardAdd}`} data-added={added ? "" : undefined} onClick={add}>
                {added ? "Added ✓" : "Add to cart"}
            </button>
        </div>
    );
}

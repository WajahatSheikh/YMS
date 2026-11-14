"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./mb.module.scss";

// 06 · Tricks: the brand's product card, live. Hover (or focus, or press on
// touch) lifts the card, outlines it in ink, slides in the quick-view strip and
// fills the bag button. The heart and the bag really toggle, so every tap lands.

interface Card {
    name: string;
    price: string;
    sticker: string;
    swatches: readonly string[];
    src: string;
    alt: string;
}

const Heart = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.6l.9.9.9-.9a4.6 4.6 0 0 1 6.5 6.6L12 20.3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
    </svg>
);

const Bag = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 8h14l-1 12H6L5 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

export default function TrickCards({ cards, width, height, quickView }: { cards: readonly Card[]; width: number; height: number; quickView: string }) {
    const [liked, setLiked] = useState<Record<number, boolean>>({});
    const [bagged, setBagged] = useState<Record<number, boolean>>({});

    return (
        <div className={s.trickRow} data-rise-group>
            {cards.map((card, i) => (
                <article key={card.name} className={s.card} data-rise-item>
                    <div className={s.cardMedia}>
                        <Image src={card.src} alt={card.alt} width={width} height={height} sizes="(max-width: 767px) 78vw, 28vw" />
                        <span className={s.sticker} data-tone="yellow">
                            {card.sticker}
                        </span>
                        <button
                            type="button"
                            className={s.like}
                            aria-pressed={!!liked[i]}
                            aria-label={`Save ${card.name}`}
                            onClick={() => setLiked((v) => ({ ...v, [i]: !v[i] }))}
                        >
                            <Heart />
                        </button>
                        <span className={s.quick} aria-hidden="true">
                            + {quickView}
                        </span>
                    </div>
                    <div className={s.cardBody}>
                        <h3>{card.name}</h3>
                        <p className={s.price}>{card.price}</p>
                        <p className={s.swatches}>
                            {card.swatches.map((c) => (
                                <i key={c} style={{ background: c }} aria-hidden="true" />
                            ))}
                            {card.swatches.length} colours
                        </p>
                        <button type="button" className={s.bag} aria-pressed={!!bagged[i]} onClick={() => setBagged((v) => ({ ...v, [i]: !v[i] }))}>
                            <Bag />
                            <span aria-live="polite">{bagged[i] ? "In your bag" : "Add to Bag"}</span>
                        </button>
                    </div>
                </article>
            ))}
            <p className={s.trickNote}>
                Hover, tab or tap the cards. <span>Rest → Hover → Pressed</span>
            </p>
        </div>
    );
}

"use client";
import { Fragment } from "react";
import style from "./CTASection.module.scss";

// ── Types ─────────────────────────────────────────────────────────────────────
interface HeadingPart {
    text: string;
    accent: boolean;
    lineBreak?: boolean; // inserts <br /> after this part
}

interface BookCallButtonProps {
    avatarSrc: string;
    avatarAlt: string;
    onClick?: () => void;
}

export interface CTASectionProps {
    avatarSrc?: string;
    avatarAlt?: string;
    onBookCall?: () => void;
}

// ── Heading data — edit copy here, not in JSX ─────────────────────────────────
const HEADING_PARTS: HeadingPart[] = [
    { text: "LET'S ",          accent: false },
    { text: "BUILD",           accent: true  },
    { text: " DIGITAL PRODUCTS", accent: false, lineBreak: true },
    { text: "THAT GROW YOUR ", accent: false },
    { text: "BUSINESS.",       accent: true  },
];

const BTN_LABEL = "Book an intro call";

// ── Sub-components ────────────────────────────────────────────────────────────
const Heading = () => (
    <h2 className={style.heading}>
        {HEADING_PARTS.map((part, i) => (
            <Fragment key={i}>
                {part.accent
                    ? <span className={style.accent}>{part.text}</span>
                    : part.text
                }
                {part.lineBreak && <br />}
            </Fragment>
        ))}
    </h2>
);

const BookCallButton = ({ avatarSrc, avatarAlt, onClick }: BookCallButtonProps) => (
    <button
        type="button"
        className={style.bookBtn}
        onClick={onClick}
        aria-label={BTN_LABEL}
    >
        <span className={style.btnText}>{BTN_LABEL}</span>
        <img
            src={avatarSrc}
            alt={avatarAlt}
            width={54}
            height={54}
            className={style.avatar}
        />
    </button>
);

// ── Section ───────────────────────────────────────────────────────────────────
const CTASection = ({
    avatarSrc = "/assets/images/CTA/avatar.jpg",
    avatarAlt = "Wajahat",
    onBookCall,
}: CTASectionProps) => (
    <section className={style.section} aria-label="Call to action">
        <div className={style.inner}>
            <Heading />
            <BookCallButton
                avatarSrc={avatarSrc}
                avatarAlt={avatarAlt}
                onClick={onBookCall}
            />
        </div>
    </section>
);

export { CTASection };
export default CTASection;

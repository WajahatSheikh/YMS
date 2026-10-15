import { Fragment } from "react";
import style from "./index.module.scss";
import { ctaGlow } from "@/app/lib/ctaGlow";
import { bookingLinkProps } from "@/app/lib/booking";
import EdgeLightButton from "./EdgeLightButton";
import FluidReveal from "@/app/Components/FluidReveal/FluidReveal";

// Cards revealed behind the fluid mask.
//
// Picked for how they survive the effect rather than how they look at full size:
// most of the time a card is blurred (up to 15px), dimmed (down to 0.3
// brightness) and seen only as a fragment through the fluid hole. So these are
// all high-saturation with bold shapes — fine UI detail turns to mush, and
// white-dominant images flare against the near-black canvas. Hue spread is
// deliberate (pink / purple / teal / warm / green) so consecutive cards read as
// different things as they orbit.
const REVEAL_BASE = "/assets/images/Header Fluid";
const REVEAL_ITEMS = [
    { src: `${REVEAL_BASE}/1.png` }, // pink + green, human subject
    { src: `${REVEAL_BASE}/Rectangle 3.png` }, // purple multicolour
    { src: `${REVEAL_BASE}/2.png` }, // teal + orange on dark
    { src: `${REVEAL_BASE}/imgi_7_nbucnyvpl2dkpiqqdv52 1.png` }, // warm skin + blue
    { src: `${REVEAL_BASE}/Rectangle 2.png` } // bright green
];

const HEADLINE = "MVP design and development, on monthly subscription";

// Words, not lines. A line-level reveal would mean laying the headline out,
// measuring where the browser actually broke it, and re-measuring on every
// resize and every type-scale step — and it would fight text-wrap: balance for
// control of those breaks. Words are known at render time, so the spans ship in
// the server HTML and the stagger is pure CSS.
//
// The space between words stays a real text node rather than moving inside a
// span: an inline-block that ends in a space renders that space instead of
// collapsing it, which would shift where the line breaks fall.
const Headline = () => (
    <h1 className={style.heading}>
        {HEADLINE.split(" ").map((word, i, all) => (
            <Fragment key={i}>
                <span className={style.word} style={{ animationDelay: `${0.18 + i * 0.055}s` }}>
                    {word}
                </span>
                {i < all.length - 1 && " "}
            </Fragment>
        ))}
    </h1>
);

// 02 · Hero — Figma node 143:772
//
// Server component. The client pieces are islands inside it: FluidReveal (the
// cursor-revealed cards) and EdgeLightButton (which scrolls to #work itself).
const HeroSection = () => (
    <section id="top" className={style.heroSection}>
        {/* Fluid reveal — sits first so the ambient glow still tints it.
            Idle it paints solid --bg-canvas, so the hero looks unchanged
            until the cursor erases into it. */}
        <FluidReveal items={REVEAL_ITEMS} />

        {/* Ambient glow — purely decorative */}
        <div className={style.glow} aria-hidden="true" />

        <div className={style.content}>
            <div className={style.copy}>
                <Headline />
                <p className={style.sub}>
                    A full product team for funded startups — design, engineering and QA every week, without
                    hiring one.
                </p>
            </div>

            <div className={style.ctaRow}>
                <a className={style.primaryCta} {...bookingLinkProps("hero")} {...ctaGlow}>
                    <svg className={style.callIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path
                            d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span>Book a call</span>
                </a>

                <EdgeLightButton label="See our work" scrollTarget="work" />
            </div>
        </div>

        {/* Price qualifier — Figma node 190:299 */}
        <div className={style.qualifier}>
            <span className={style.dot} aria-hidden="true" />
            <span className={style.price}>From $3,999/month</span>
            <span className={style.separator} aria-hidden="true">
                ·
            </span>
            <span className={style.terms}>Pause or cancel anytime</span>
        </div>
    </section>
);

export default HeroSection;

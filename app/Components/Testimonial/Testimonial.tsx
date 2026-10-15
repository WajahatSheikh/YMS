import Image from "next/image";
import RevealChildren from "@/app/Components/RevealChildren/RevealChildren";
import AutoAdvance from "./AutoAdvance";
import { TESTIMONIALS, type Testimonial as Item } from "@/app/data/testimonials";
import style from "./index.module.scss";

// 07 · Testimonials — "wall of proof".
//
// Art direction: one spotlight testimonial set like an editorial pull quote
// (display type, a marker stroke on the line that matters, a tilted result
// sticker), then the rest as a row of proof cards. Everything that makes it
// read as real is real: photo, name, role, company logo, project, location and
// the client's own words verbatim — no star ratings or badges we can't back up.
//
// Layout
//   ≥1200   spotlight (quote | attribution) · four cards in one row
//   768–1199  spotlight stacked · cards 2×2
//   <768    spotlight stacked · cards in a swipe rail with snap and peek,
//           auto-advancing every few seconds
//
// Server component. Client code: RevealChildren (scroll reveal) and
// AutoAdvance (auto-scrolls the card rail on phones).

const [SPOTLIGHT, ...REST] = TESTIMONIALS;

// Distinct countries, in the order they first appear, for the proof strip.
const COUNTRIES = [...new Set(TESTIMONIALS.map((t) => t.country))];
const listFormat = (items: string[]) =>
    items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items.join("");

// The quote verbatim, with `highlight` wrapped in a marker stroke. If the
// highlight ever stops matching the quote, the quote still renders, unmarked.
const Quote = ({ item, className }: { item: Item; className: string }) => {
    const at = item.quote.indexOf(item.highlight);
    return (
        <blockquote className={className}>
            {at < 0 ? (
                <p>{item.quote}</p>
            ) : (
                <p>
                    {item.quote.slice(0, at)}
                    <mark className={style.mark}>{item.highlight}</mark>
                    {item.quote.slice(at + item.highlight.length)}
                </p>
            )}
        </blockquote>
    );
};

const Avatar = ({ item, size }: { item: Item; size: number }) => (
    <span
        className={`${style.avatar} ${item.avatarOnWhite ? style.onWhite : ""}`}
        style={{ "--size": `${size}px` } as React.CSSProperties}
    >
        <Image src={item.avatar} alt="" width={size} height={size} />
    </span>
);

const PinIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
            d="M8 14.5s4.5-4.06 4.5-7.75a4.5 4.5 0 1 0-9 0C3.5 10.44 8 14.5 8 14.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
        />
        <circle cx="8" cy="6.75" r="1.6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
);

const QuoteGlyph = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden="true">
        <path
            d="M0 48V29.6C0 12.9 8.6 3 25.8 0l2.6 6.3C20.3 8.6 16.1 13.4 15.5 20.7H27V48H0Zm36.9 0V29.6C36.9 12.9 45.5 3 62.7 0l2.6 6.3c-8.1 2.3-12.3 7.1-12.9 14.4h11.5V48H36.9Z"
            fill="currentColor"
        />
    </svg>
);

const Spotlight = ({ item }: { item: Item }) => (
    <figure className={style.spotlight}>
        <QuoteGlyph className={style.glyph} />

        <div className={style.spotlightQuote}>
            <span className={style.result}>{item.result}</span>
            <Quote item={item} className={style.bigQuote} />
        </div>

        <figcaption className={style.spotlightWho}>
            <Avatar item={item} size={72} />
            <span className={style.whoText}>
                <span className={style.name}>{item.name}</span>
                <span className={style.role}>
                    {item.role}, {item.company}
                </span>
            </span>

            <span className={style.rule} aria-hidden="true" />

            <Image className={style.logo} src={item.logo} alt={item.company} width={item.logoWidth} height={28} />
            <span className={style.chips}>
                <span className={style.chip}>{item.project}</span>
                <span className={style.chip}>
                    <PinIcon />
                    {item.location}
                </span>
            </span>
        </figcaption>
    </figure>
);

const Card = ({ item, index }: { item: Item; index: number }) => (
    <figure className={style.card} style={{ "--i": index } as React.CSSProperties}>
        <div className={style.cardTop}>
            <Image className={style.logo} src={item.logo} alt={item.company} width={item.logoWidth} height={28} />
            <span className={style.tag}>{item.result}</span>
        </div>

        <Quote item={item} className={style.cardQuote} />

        <figcaption className={style.cardWho}>
            <Avatar item={item} size={44} />
            <span className={style.whoText}>
                <span className={style.name}>{item.name}</span>
                <span className={style.role}>
                    {item.role}, {item.company}
                </span>
            </span>
        </figcaption>

        <p className={style.cardMeta}>
            <span>{item.project}</span>
            <span className={style.metaDot} aria-hidden="true" />
            <span className={style.metaPlace}>
                <PinIcon />
                {item.location}
            </span>
        </p>
    </figure>
);

const Testimonial = () => (
    <section id="testimonials" className={style.section} aria-labelledby="testimonials-title">
        <header className={style.head}>
            <p className={style.eyebrow}>Real testimonials</p>
            <h2 id="testimonials-title" className={style.title}>
                Founders, after they shipped
            </h2>

            {/* Proof strip: who these people are, at a glance. */}
            <div className={style.proof}>
                <span className={style.stack} aria-hidden="true">
                    {TESTIMONIALS.map((t) => (
                        <Avatar key={t.name} item={t} size={36} />
                    ))}
                </span>
                <p className={style.proofText}>
                    {TESTIMONIALS.length} founders and product leads in {listFormat(COUNTRIES)}
                </p>
            </div>
        </header>

        <Spotlight item={SPOTLIGHT} />

        <AutoAdvance>
            <RevealChildren
                className={style.cards}
                inViewClass={style.inView}
                threshold={0.15}
                rootMargin="0px 0px -6% 0px"
            >
                {REST.map((item, index) => (
                    <Card key={item.name} item={item} index={index} />
                ))}
            </RevealChildren>
        </AutoAdvance>
    </section>
);

export default Testimonial;

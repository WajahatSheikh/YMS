import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Poppins, Space_Mono } from "next/font/google";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { bookingLinkProps } from "@/app/lib/booking";
import { SITE, absoluteUrl } from "@/app/data/site";
import { MB } from "./content";
import MbMotion from "./MbMotion";
import TrickCards from "./TrickCards";
import s from "./mb.module.scss";

// MDRN BLK: case study ("Drop in").
//
// Concept: the page is a skate deck that gets sticker-bombed as you read.
// The brand labels everything with tape stickers, so the case study does too:
// every chapter's sticker slaps onto a deck at the right edge as you reach it,
// tape bands cross the page between chapters and speed up with your scroll,
// and the grounds switch between the brand's black, sky, sand and yellow.
// The palette and type are MDRN BLK's own (Poppins Black Italic shouts, Space
// Mono whispers), so this page is an island: it looks the same in the site's
// light and dark themes. The site header and footer stay as they are.
//
// Server component. Scroll motion (GSAP ScrollTrigger) is MbMotion.tsx; the
// live product cards are TrickCards.tsx. Without script, or under reduced
// motion, every block is simply visible and the tapes stand still.

const poppins = Poppins({ weight: ["400", "500", "600", "900"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-poppins", display: "swap" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono", display: "swap" });

const TITLE = MB.seoTitle;
const DESCRIPTION = MB.seoDescription;
const SHARE = { url: MB.og.src, width: MB.og.width, height: MB.og.height, alt: `${MB.client} website design by ${SITE.name}` };

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: MB.path },
    openGraph: {
        type: "article",
        url: MB.path,
        siteName: SITE.name,
        locale: SITE.locale,
        title: `${TITLE} | ${SITE.name}`,
        description: DESCRIPTION,
        publishedTime: MB.published,
        images: [SHARE]
    },
    twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE.name}`, description: DESCRIPTION, images: [SHARE.url] }
};

const CRUMBS = [
    { name: "Work", path: "/#work" },
    { name: MB.client, path: MB.path }
];

/** "One *phrase* here": the starred phrase gets the brand's highlight chip. */
const highlight = (text: string) => text.split("*").map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Sticker = ({ text, tone, className = "", slap = false }: { text: string; tone: string; className?: string; slap?: boolean }) => (
    <span className={`${s.sticker} ${className}`} data-tone={tone} data-slap={slap || undefined}>
        {text}
    </span>
);

/** A tape band: one real row and a hidden copy so the loop is seamless. Decorative. */
const Tape = ({ words, tone, dir = 1, speed = 1 }: { words: readonly string[]; tone: "white" | "yellow"; dir?: 1 | -1; speed?: number }) => (
    <div className={s.tape} data-tone={tone} aria-hidden="true">
        <div className={s.tapeTrack} data-tape data-dir={dir} data-speed={speed}>
            {[0, 1].map((copy) => (
                <p key={copy} className={s.tapeRow}>
                    {[...words, ...words].map((word, i) => (
                        <span key={i}>
                            {word}
                            <i>★</i>
                        </span>
                    ))}
                </p>
            ))}
        </div>
    </div>
);

const ChapterHead = ({ no, label, title, body }: { no: string; label: string; title: string; body?: string }) => (
    <header className={s.chapterHead}>
        <div>
            <p className={s.chapterNo} data-rise>
                <span>{no}</span>
                <i aria-hidden="true" />
                {label}
            </p>
            <h2 className={s.chapterTitle} data-rise>
                {highlight(title)}
            </h2>
        </div>
        {body && (
            <p className={s.chapterBody} data-rise>
                {body}
            </p>
        )}
    </header>
);

const Browser = ({ children, url = "mdrnblk.com", className = "" }: { children: React.ReactNode; url?: string; className?: string }) => (
    <div className={`${s.browser} ${className}`}>
        <div className={s.chrome} aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{url}</span>
        </div>
        <div className={s.screen}>{children}</div>
    </div>
);

export default function MdrnBlkCaseStudy() {
    const { hero, tapes, chapters, brief, concept, grip, line, dropIn, tricks, stance, thumb, result, closing, next } = MB;

    return (
        <main id="main" className={`${s.page} ${poppins.variable} ${mono.variable}`} data-mb>
            <PageSchema
                path={MB.path}
                title={TITLE}
                description={DESCRIPTION}
                crumbs={CRUMBS}
                extra={[
                    {
                        "@type": "Article",
                        "@id": `${absoluteUrl(MB.path)}#article`,
                        headline: `${hero.title.join(" ")} ${hero.titleFor}`,
                        description: DESCRIPTION,
                        image: [absoluteUrl(MB.og.src), absoluteUrl(hero.desktop.src)],
                        datePublished: MB.published,
                        dateModified: MB.published,
                        author: {
                            "@type": "Person",
                            name: hero.byline.name,
                            jobTitle: hero.byline.role,
                            url: absoluteUrl("/team"),
                            worksFor: { "@id": `${SITE.url}/#organization` }
                        },
                        publisher: { "@id": `${SITE.url}/#organization` },
                        about: { "@type": "Organization", name: MB.client },
                        mainEntityOfPage: { "@id": `${absoluteUrl(MB.path)}#webpage` },
                        inLanguage: "en"
                    }
                ]}
            />

            {/* ───────────── Cover ───────────── */}
            <section className={`${s.band} ${s.hero}`} data-ground="black">
                <div className={s.wrap}>
                    <div className={s.metaBar}>
                        <nav aria-label="Breadcrumb">
                            <ol className={s.crumbs}>
                                <li>
                                    <Link href="/#work">Work</Link>
                                </li>
                                <li aria-current="page">{MB.client}</li>
                            </ol>
                        </nav>
                        <p>{hero.meta[1]}</p>
                        <p>{hero.meta[2]}</p>
                    </div>

                    <h1 className={s.title}>
                        <span className={s.titleWords}>
                            {hero.title.map((word, i) => (
                                <span key={word} className={s.titleMask}>
                                    <span style={{ "--w": i } as React.CSSProperties}>{word}</span>
                                </span>
                            ))}
                        </span>{" "}
                        <span className={s.titleFor}>{hero.titleFor}</span>
                    </h1>

                    <div className={s.coverGrid}>
                        <div className={s.coverCopy}>
                            <p className={s.intro}>{hero.intro}</p>
                            <p className={s.byline}>
                                Design and art direction by <Link href="/team">{hero.byline.name}</Link>, {hero.byline.role}.{" "}
                                <time dateTime={MB.published}>Published {hero.byline.date}</time>
                            </p>
                            <p className={s.cue}>
                                {hero.cue} <span aria-hidden="true">↓</span>
                            </p>
                        </div>

                        <div className={s.stage}>
                            <div className={s.stageBrowser} data-parallax="-4">
                                <Browser>
                                    <Image
                                        src={hero.desktop.src}
                                        alt={hero.desktop.alt}
                                        width={hero.desktop.width}
                                        height={hero.desktop.height}
                                        sizes="(max-width: 991px) 92vw, 62vw"
                                        priority
                                    />
                                </Browser>
                            </div>
                            <div className={s.stagePhone} data-parallax="-12">
                                <div className={s.phoneFrame}>
                                    <Image src={hero.mobile.src} alt={hero.mobile.alt} width={hero.mobile.width} height={hero.mobile.height} sizes="(max-width: 991px) 34vw, 18vw" priority />
                                </div>
                            </div>
                            <Sticker text={hero.tapes[0]} tone="yellow" className={s.stageTapeA} />
                            <Sticker text={hero.tapes[1]} tone="pink" className={s.stageTapeB} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tape break: a rail between spots. */}
            <div className={s.tapes} data-ground="black">
                <Tape words={tapes.a} tone="white" dir={-1} />
                <Tape words={tapes.b} tone="yellow" />
            </div>

            {/* ───────────── 01 · The brief ───────────── */}
            <section className={s.band} data-ground="sand" data-chapter="0">
                <div className={s.wrap}>
                    <ChapterHead no={brief.no} label={brief.label} title={brief.title} body={brief.body} />
                    <dl className={s.facts} data-rise-group>
                        {brief.facts.map((fact) => (
                            <div key={fact.label} data-rise-item>
                                <dt>{fact.label}</dt>
                                <dd>{fact.value}</dd>
                            </div>
                        ))}
                    </dl>
                    <dl className={s.stats} data-rise-group>
                        {brief.stats.map((stat) => (
                            <div key={stat.label} data-rise-item>
                                <dt>{stat.label}</dt>
                                <dd data-count={stat.value}>{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ───────────── 02 · Concept ───────────── */}
            <section className={s.band} data-ground="grey" data-chapter="1">
                <div className={s.wrap}>
                    <ChapterHead no={concept.no} label={concept.label} title={concept.title} body={concept.body} />

                    {/* The moodboard, pinned up like photos on a deck. */}
                    <ul className={s.board}>
                        {concept.photos.map((photo, i) => (
                            <li
                                key={photo.src}
                                className={s.polaroid}
                                style={{ "--x": `${photo.x}%`, "--y": `${photo.y}%`, "--pw": `${photo.w}%`, "--r": `${photo.r}deg`, "--i": i } as React.CSSProperties}
                                data-drop
                            >
                                <figure>
                                    <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 767px) 46vw, 30vw" />
                                </figure>
                                {photo.sticker && (
                                    <Sticker text={photo.sticker.text} tone={photo.sticker.tone} className={s.polaroidSticker} slap />
                                )}
                            </li>
                        ))}
                    </ul>

                    <ol className={s.principles} data-rise-group>
                        {concept.principles.map((p, i) => (
                            <li key={p.title} data-rise-item>
                                <span>{String(i + 1).padStart(2, "0")}</span>
                                <h3>{p.title}</h3>
                                <p>{p.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ───────────── 03 · Grip ───────────── */}
            <section className={s.band} data-ground="black" data-chapter="2">
                <div className={s.wrap}>
                    <ChapterHead no={grip.no} label={grip.label} title={grip.title} body={grip.body} />

                    <ul className={s.colourTapes}>
                        {grip.colours.map((c) => (
                            <li
                                key={c.name}
                                className={s.colourTape}
                                style={{ "--tape": c.hex, "--tape-ink": c.ink, "--r": `${c.r}deg` } as React.CSSProperties}
                                data-stretch
                            >
                                <h3>{c.name}</h3>
                                <p>
                                    <span>{c.use}</span>
                                    <span>{c.hex}</span>
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className={s.kit}>
                        <div className={s.kitType} data-rise>
                            <p className={s.kitAa} aria-hidden="true">
                                Aa
                            </p>
                            <dl>
                                {grip.type.map((t, i) => (
                                    <div key={t.name}>
                                        <dt className={i ? s.kitMono : ""}>{t.name}</dt>
                                        <dd>{t.use}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div className={s.kitParts} data-rise>
                            <p className={s.kitLabel}>Sticker · Button · Icon button</p>
                            <div className={s.kitStickers}>
                                {grip.stickers.map((st) => (
                                    <Sticker key={st.text} text={st.text} tone={st.tone} slap />
                                ))}
                            </div>
                            {/* Specimens: hover them. Not links. */}
                            <div className={s.kitButtons} aria-hidden="true">
                                <span className={s.specButton}>
                                    Shop Now <Arrow />
                                </span>
                                <span className={`${s.specButton} ${s.specButtonOn}`}>
                                    Shop Now <Arrow />
                                </span>
                                <span className={s.specIcon}>
                                    <Arrow />
                                </span>
                                <span className={`${s.specIcon} ${s.specIconOn}`}>
                                    <Arrow />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────── 04 · The line ─────────────
                With motion on, the tall wrapper pins the stage (CSS sticky) and the
                scroll position scrubs the page through the window. Without it, the
                window is an ordinary scroll area. */}
            <section className={`${s.band} ${s.pageBand}`} data-ground="white" data-chapter="3" data-page-scroll>
                <div className={s.pageStage}>
                    <div className={`${s.wrap} ${s.pageGrid}`}>
                        <div className={s.pageCopy}>
                            <ChapterHead no={line.no} label={line.label} title={line.title} />
                            <p className={s.pageBody}>{line.body}</p>
                            <ol className={s.acts}>
                                {line.acts.map((act, i) => (
                                    <li key={act.name} className={s.act} data-act={i} data-from={act.from}>
                                        <span className={s.actRange}>{act.range}</span>
                                        <span className={s.actName}>{act.name}</span>
                                        <span className={s.actText}>{act.text}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className={s.window} data-window tabIndex={0} role="region" aria-label="The full MDRN BLK homepage">
                            <Image
                                src={line.src}
                                alt={line.alt}
                                width={line.width}
                                height={line.height}
                                sizes="(max-width: 991px) 92vw, 860px"
                                placeholder="blur"
                                blurDataURL={line.blur}
                                data-page-image
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────── 05 · Drop in ───────────── */}
            <section className={s.band} data-ground="sky" data-chapter="4">
                <div className={s.wrap}>
                    <ChapterHead no={dropIn.no} label={dropIn.label} title={dropIn.title} body={dropIn.body} />

                    <div className={s.annotated}>
                        <div className={s.annotatedBrowser} data-rise>
                            <Browser>
                                <Image src={hero.desktop.src} alt={hero.desktop.alt} width={hero.desktop.width} height={hero.desktop.height} sizes="(max-width: 1100px) 92vw, 66vw" />
                                {dropIn.notes.map((note, i) => (
                                    <span
                                        key={note.no}
                                        className={s.pin}
                                        data-pin={i + 1}
                                        style={{ "--px": `${note.pin.x}%`, "--py": `${note.pin.y}%` } as React.CSSProperties}
                                        aria-hidden="true"
                                    >
                                        {i + 1}
                                    </span>
                                ))}
                            </Browser>
                        </div>
                        <ol className={s.notes}>
                            {dropIn.notes.map((note, i) => (
                                <li
                                    key={note.no}
                                    className={s.note}
                                    data-note={i + 1}
                                    data-side={note.side}
                                    style={{ "--ny": `${note.y}%`, "--lw-n": `${((note.leader.w / 13.86) * 100).toFixed(2)}%` } as React.CSSProperties}
                                    data-rise
                                >
                                    <span>{note.no}</span>
                                    {note.text}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* ───────────── 06 · Tricks ───────────── */}
            <section className={`${s.band} ${s.tricksBand}`} data-ground="black" data-chapter="5">
                <div className={s.wrap}>
                    <ChapterHead no={tricks.no} label={tricks.label} title={tricks.title} body={tricks.body} />
                    <TrickCards cards={tricks.cards} width={tricks.cardWidth} height={tricks.cardHeight} quickView={tricks.quickView} />
                </div>
                <div className={s.tapes}>
                    <Tape words={tapes.a} tone="white" />
                    <Tape words={tapes.b} tone="yellow" dir={-1} speed={1.2} />
                </div>
                <div className={s.wrap}>
                    <p className={s.tapeNote}>{tricks.tapeNote}</p>
                </div>
            </section>

            {/* ───────────── 07 · Switch stance ─────────────
                The three screens ride the same scroll: each page moves through its
                own screen as the section passes. */}
            <section className={s.band} data-ground="sand" data-chapter="6" data-stance>
                <div className={s.wrap}>
                    <ChapterHead no={stance.no} label={stance.label} title={stance.title} body={stance.body} />
                    <div className={s.trio}>
                        <figure className={s.trioDesktop}>
                            <Browser>
                                <Image
                                    src={stance.screens.desktop.src}
                                    alt="MDRN BLK homepage at desktop width, 1920 px"
                                    width={stance.screens.desktop.width}
                                    height={stance.screens.desktop.height}
                                    sizes="(max-width: 767px) 92vw, 60vw"
                                    data-ride
                                />
                            </Browser>
                            <figcaption>{stance.screens.desktop.label}</figcaption>
                        </figure>
                        <figure className={s.trioTablet}>
                            <div className={s.tabletFrame}>
                                <div className={s.deviceScreen}>
                                    <Image
                                        src={stance.screens.ipad.src}
                                        alt="MDRN BLK homepage at iPad width, 768 px"
                                        width={stance.screens.ipad.width}
                                        height={stance.screens.ipad.height}
                                        sizes="(max-width: 767px) 46vw, 24vw"
                                        data-ride
                                    />
                                </div>
                            </div>
                            <figcaption>{stance.screens.ipad.label}</figcaption>
                        </figure>
                        <figure className={s.trioPhone}>
                            <div className={s.phoneFrame}>
                                <div className={s.deviceScreen}>
                                    <Image
                                        src={stance.screens.mobile.src}
                                        alt="MDRN BLK homepage at mobile width, 440 px"
                                        width={stance.screens.mobile.width}
                                        height={stance.screens.mobile.height}
                                        sizes="(max-width: 767px) 34vw, 14vw"
                                        data-ride
                                    />
                                </div>
                            </div>
                            <figcaption>{stance.screens.mobile.label}</figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ───────────── 08 · Thumb first ───────────── */}
            <section className={`${s.band} ${s.thumbBand}`} data-ground="grey" data-chapter="7">
                <div className={s.wrap}>
                    <ChapterHead no={thumb.no} label={thumb.label} title={thumb.title} body={thumb.body} />
                </div>
                <ul className={s.phones} tabIndex={0} aria-label="MDRN BLK mobile screens">
                    {thumb.phones.map((phone, i) => (
                        <li key={phone.label} className={s.phoneItem} data-float={[0.8, -0.5, 1, -0.7, 0.6][i]}>
                            <figure>
                                <Sticker text={phone.label} tone={i % 2 ? "black" : "yellow"} className={s.phoneLabel} slap />
                                <div className={s.phoneFrame}>
                                    <Image src={phone.src} alt={phone.alt} width={thumb.phoneWidth} height={thumb.phoneHeight} sizes="(max-width: 767px) 62vw, 17vw" />
                                </div>
                            </figure>
                        </li>
                    ))}
                </ul>
                <div className={s.wrap}>
                    <p className={s.swipeHint} aria-hidden="true">
                        {thumb.hint} →
                    </p>
                </div>
            </section>

            {/* ───────────── 09 · The result ───────────── */}
            <section className={s.band} data-ground="white" data-chapter="8">
                <div className={s.wrap}>
                    <ChapterHead no={result.no} label={result.label} title={result.title} />
                    <ol className={s.points} data-rise-group>
                        {result.points.map((point, i) => (
                            <li key={point.title} data-rise-item>
                                <span>{String(i + 1).padStart(2, "0")}</span>
                                <h3>{point.title}</h3>
                                <p>{point.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ───────────── What next ───────────── */}
            <section className={`${s.band} ${s.closing}`} data-ground="yellow">
                <div className={s.wrap}>
                    <h2 className={s.closingTitle} data-rise>
                        {highlight(closing.title)}
                    </h2>
                    <div className={s.closingRow}>
                        <div className={s.closingActions} data-rise>
                            <a className={s.button} {...bookingLinkProps("case-study-mdrn-blk")}>
                                Book a call <Arrow />
                            </a>
                            <ul className={s.chips} aria-label="Related services">
                                {closing.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Sticker text={closing.sticker} tone="black" className={s.closingSticker} slap />
                    </div>
                </div>
            </section>

            {/* ───────────── Next case study ───────────── */}
            <section className={`${s.band} ${s.next}`} data-ground="black">
                <div className={s.wrap}>
                    <Link className={s.nextLink} href={next.href} data-transition data-transition-label={next.title}>
                        <span className={s.nextLabel}>{next.label}</span>
                        <span className={s.nextTitle}>{next.title}</span>
                        <span className={s.nextIcon} aria-hidden="true">
                            <Arrow />
                        </span>
                    </Link>
                </div>
            </section>

            {/* The deck: a skateboard on the right edge that collects one sticker
                per chapter as you reach it. Last in <main> so it paints over every
                band. Decorative; the chapter numbers are in the headings. */}
            <div className={s.deckTrack} aria-hidden="true">
                <div className={s.deck} data-deck>
                    <span className={s.deckGrip} data-deck-grip />
                    <i className={s.deckBolt} />
                    <i className={s.deckBolt} />
                    {chapters.map((c) => (
                        <span
                            key={c.no}
                            className={s.deckSticker}
                            style={{ "--c": c.colour, "--sx": `${c.x}%`, "--sy": `${c.y}%`, "--sr": `${c.r}deg` } as React.CSSProperties}
                        />
                    ))}
                </div>
            </div>

            <MbMotion />
        </main>
    );
}


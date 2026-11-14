import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Italiana } from "next/font/google";
import NextCaseStudy from "@/app/Components/CaseStudy/NextCaseStudy";
import { relatedCaseStudies } from "@/app/data/caseStudies";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { bookingLinkProps } from "@/app/lib/booking";
import { SITE, absoluteUrl } from "@/app/data/site";
import { TUIT } from "./content";
import TuitMotion from "./TuitMotion";
import s from "./tuit.module.scss";

// Tüit Luxury Candle Co. — case study ("Slow burn", Figma frame 588:1030).
//
// Concept: the page is one candle burning down. Grounds darken chapter by
// chapter (linen → ink → sand → linen → taupe → ink → black), a wick runs down
// the right edge with a flame at the reader's position, and everything moves
// like heat: slow rises, slow drifts. The palette and display type are Tüit's
// own, so this page is an island: it looks the same in the site's light and
// dark themes. The site header and footer stay as they are.
//
// Server component. All motion (GSAP ScrollTrigger: reveals, parallax, the
// scrubbed page scroll, the wick) is TuitMotion.tsx; without it, or under
// reduced motion, every block is simply visible.

// The case study's own faces: Italiana for display (Tüit's Grange stand-in),
// Cormorant Garamond Italic for the quiet lines. Body and labels use the
// site's Geist and Geist Mono.
const italiana = Italiana({ weight: "400", subsets: ["latin"], variable: "--font-italiana", display: "swap" });
const cormorant = Cormorant_Garamond({ weight: ["400", "500"], style: ["italic"], subsets: ["latin"], variable: "--font-cormorant", display: "swap" });

const TITLE = TUIT.seoTitle;
const DESCRIPTION = TUIT.seoDescription;
const SHARE = { url: TUIT.og.src, width: TUIT.og.width, height: TUIT.og.height, alt: `${TUIT.client} website design by ${SITE.name}` };

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: TUIT.path },
    openGraph: {
        type: "article",
        url: TUIT.path,
        siteName: SITE.name,
        locale: SITE.locale,
        title: `${TITLE} | ${SITE.name}`,
        description: DESCRIPTION,
        publishedTime: TUIT.published,
        images: [SHARE]
    },
    twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE.name}`, description: DESCRIPTION, images: [SHARE.url] }
};

const CRUMBS = [
    { name: "Work", path: "/#work" },
    { name: TUIT.client, path: TUIT.path }
];

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChapterHead = ({ no, label, title, sub }: { no: string; label: string; title: string; sub?: string }) => (
    <header className={s.chapterHead}>
        <p className={s.chapterNo} data-rise>
            {no}
            <i className={s.ember} aria-hidden="true" />
            {label}
        </p>
        <h2 className={s.chapterTitle} data-rise>
            {title}
        </h2>
        {sub && (
            <p className={s.chapterSub} data-rise>
                {sub}
            </p>
        )}
    </header>
);

export default function TuitCaseStudy() {
    const { hero, cover, brief, phone, concept, page, system, screens, mobile, result, closing } = TUIT;

    return (
        <main id="main" className={`${s.page} ${italiana.variable} ${cormorant.variable}`} data-tuit>
            <PageSchema
                path={TUIT.path}
                title={TITLE}
                description={DESCRIPTION}
                crumbs={CRUMBS}
                extra={[
                    {
                        "@type": "Article",
                        "@id": `${absoluteUrl(TUIT.path)}#article`,
                        headline: `${hero.title.join(" ")} ${hero.titleFor}`,
                        description: DESCRIPTION,
                        image: [absoluteUrl(TUIT.og.src), absoluteUrl(cover.src)],
                        datePublished: TUIT.published,
                        dateModified: TUIT.published,
                        author: { "@type": "Person", name: hero.byline.name, jobTitle: hero.byline.role, worksFor: { "@id": `${SITE.url}/#organization` } },
                        publisher: { "@id": `${SITE.url}/#organization` },
                        about: { "@type": "Organization", name: TUIT.client },
                        mainEntityOfPage: { "@id": `${absoluteUrl(TUIT.path)}#webpage` },
                        inLanguage: "en"
                    }
                ]}
            />

            {/* ───────────── Cover ───────────── */}
            <section className={`${s.band} ${s.hero}`} data-ground="linen">
                <div className={s.wrap}>
                    <div className={s.metaBar}>
                        <nav aria-label="Breadcrumb">
                            <ol className={s.crumbs}>
                                <li>
                                    <Link href="/#work">Work</Link>
                                </li>
                                <li aria-current="page">{TUIT.client}</li>
                            </ol>
                        </nav>
                        <p className={s.kicker}>{hero.kicker}</p>
                    </div>

                    <h1 className={s.title}>
                        {hero.title.map((line, i) => (
                            <span key={line} className={s.titleLine}>
                                <span style={{ "--l": i } as React.CSSProperties}>{line}</span>
                            </span>
                        ))}{" "}
                        <span className={s.titleFor}>{hero.titleFor}</span>
                    </h1>

                    <div className={s.introRow}>
                        <div className={s.introCol}>
                            <p className={s.intro}>{hero.intro}</p>
                            <p className={s.byline}>
                                Design and art direction by <Link href="/team">{hero.byline.name}</Link>, {hero.byline.role}.{" "}
                                <time dateTime={TUIT.published}>Published {hero.byline.date}</time>
                            </p>
                        </div>
                        <dl className={s.meta}>
                            {hero.meta.map((row) => (
                                <div key={row.label}>
                                    <dt>{row.label}</dt>
                                    <dd>{row.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            <figure className={s.render} data-ground="linen">
                <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    sizes="100vw"
                    priority
                    data-parallax="7.5"
                />
            </figure>

            {/* ───────────── No. 1 · The brief ───────────── */}
            <section className={s.band} data-ground="linen">
                <div className={s.wrap}>
                    <ChapterHead no={brief.no} label={brief.label} title={brief.title} />
                    <div className={s.columns} data-rise-group>
                        {brief.columns.map((col) => (
                            <div key={col.title} className={s.column} data-rise-item>
                                <h3>{col.title}</h3>
                                <p>{col.text}</p>
                            </div>
                        ))}
                    </div>
                    <dl className={s.stats} data-rise-group>
                        {brief.stats.map((stat) => (
                            <div key={stat.label} data-rise-item>
                                {/* dd before dt visually: the number is the headline. */}
                                <dt>{stat.label}</dt>
                                <dd data-count={stat.value}>{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <figure className={s.render} data-ground="linen">
                <Image src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} sizes="100vw" data-parallax="7.5" />
            </figure>

            {/* ───────────── No. 2 · The concept ───────────── */}
            <section className={s.band} data-ground="ink">
                <div className={s.wrap}>
                    <ChapterHead no={concept.no} label={concept.label} title={concept.title} sub={concept.sub} />
                    <ol className={s.notes}>
                        {concept.notes.map((note, i) => (
                            <li key={note.name} className={s.note} data-rise>
                                <div className={s.arch}>
                                    <Image src={note.src} alt={note.alt} width={1000} height={667} sizes="(max-width: 767px) 86vw, 30vw" data-parallax="6.8" />
                                </div>
                                <p className={s.noteLabel}>
                                    <span>{note.note}</span>
                                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                                </p>
                                <h3 className={s.noteName}>{note.name}</h3>
                                <p className={s.noteText}>{note.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ───────────── No. 3 · The page ─────────────
                With motion on, the tall wrapper pins the stage (CSS sticky) and the
                scroll position scrubs the page through the window. Without it, the
                window is an ordinary scroll area. */}
            <section className={`${s.band} ${s.pageBand}`} data-ground="sand" data-page-scroll>
                <div className={s.pageStage}>
                    <div className={`${s.wrap} ${s.pageGrid}`}>
                        <div className={s.pageCopy}>
                            <ChapterHead no={page.no} label={page.label} title={page.title} sub={page.sub} />
                            <ol className={s.acts}>
                                {page.acts.map((act, i) => (
                                    <li key={act.name} className={s.act} data-act={i} data-from={act.from}>
                                        <span className={s.actRange}>{act.range}</span>
                                        <span className={s.actName}>{act.name}</span>
                                        <span className={s.actText}>{act.text}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className={s.window} data-window tabIndex={0} role="region" aria-label="The full Tüit landing page">
                            <Image
                                src={page.src}
                                alt={page.alt}
                                width={page.width}
                                height={page.height}
                                sizes="(max-width: 991px) 92vw, 860px"
                                placeholder="blur"
                                blurDataURL={page.blur}
                                data-page-image
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────── No. 4 · The system ───────────── */}
            <section className={s.band} data-ground="linen">
                <div className={s.wrap}>
                    <ChapterHead no={system.no} label={system.label} title={system.title} sub={system.sub} />
                    <ul className={s.jars} data-rise-group>
                        {system.jars.map((jar, i) => (
                            <li key={jar.token} className={s.jarItem} data-rise-item style={{ "--i": i } as React.CSSProperties}>
                                <div className={`${s.jar} ${jar.dark ? s.jarDark : ""}`} style={{ "--wax": jar.hex } as React.CSSProperties}>
                                    <span className={s.jarWick} aria-hidden="true" />
                                    <span className={s.jarFlame} aria-hidden="true" />
                                    <span className={s.jarHex}>{jar.hex}</span>
                                </div>
                                <p className={s.jarName}>{jar.name}</p>
                                <p className={s.jarToken}>{jar.token}</p>
                                <p className={s.jarUse}>{jar.use}</p>
                            </li>
                        ))}
                    </ul>
                    <figure className={s.kit} data-rise>
                        <figcaption>
                            <span className={s.kitTitle}>{system.kit.title}</span>
                            <span className={s.kitCount}>{system.kit.count}</span>
                        </figcaption>
                        <Image
                            src={system.kit.src}
                            alt={system.kit.alt}
                            width={system.kit.width}
                            height={system.kit.height}
                            sizes="(max-width: 991px) 92vw, 1400px"
                        />
                    </figure>
                </div>
            </section>

            {/* ───────────── No. 5 · The screens ───────────── */}
            <section className={s.band} data-ground="taupe">
                <div className={s.wrap}>
                    <ChapterHead no={screens.no} label={screens.label} title={screens.title} sub={screens.sub} />
                    <figure className={s.plate} data-rise>
                        <Image
                            src={screens.src}
                            alt={screens.alt}
                            width={screens.width}
                            height={screens.height}
                            sizes="(max-width: 991px) 92vw, 1400px"
                            data-parallax="4"
                        />
                    </figure>
                    <div className={s.columns} data-rise-group>
                        {screens.notes.map((note) => (
                            <div key={note.name} className={s.column} data-rise-item>
                                <h3>
                                    {note.name}
                                    <span className={s.px}>{note.px}</span>
                                </h3>
                                <p>{note.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────────── No. 6 · In the hand ───────────── */}
            <section className={s.band} data-ground="ink">
                <div className={s.wrap}>
                    <ChapterHead no={mobile.no} label={mobile.label} title={mobile.title} sub={mobile.sub} />
                </div>
                <figure className={s.strip} tabIndex={0} role="region" aria-label="Tüit mobile screens">
                    <Image
                        src={mobile.src}
                        alt={mobile.alt}
                        width={mobile.width}
                        height={mobile.height}
                        sizes="(max-width: 767px) 230vw, 100vw"
                        data-drift="3"
                    />
                </figure>
                {/* Phones only: the strip is a swipe row there. The screens carry
                    their own numbered captions, so there is no second legend. */}
                <div className={s.wrap}>
                    <p className={s.swipeHint} aria-hidden="true">
                        {mobile.hint}
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </p>
                </div>
            </section>

            {/* ───────────── No. 7 · The result ───────────── */}
            <section className={`${s.band} ${s.resultBand}`} data-ground="ink">
                <div className={s.wrap}>
                    <ChapterHead no={result.no} label={result.label} title={result.title} />
                    <div className={s.resultRow}>
                        <ul className={s.points} data-rise-group>
                            {result.points.map((point) => (
                                <li key={point.title} data-rise-item>
                                    <h3>{point.title}</h3>
                                    <p>{point.text}</p>
                                </li>
                            ))}
                        </ul>
                        <figure className={s.quote} data-rise>
                            <blockquote>
                                <p>&ldquo;{result.quote}&rdquo;</p>
                            </blockquote>
                            <figcaption>
                                <a href={result.quoteHref} target="_blank" rel="noopener">
                                    {result.quoteBy}
                                </a>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ───────────── What next ───────────── */}
            <section className={s.band} data-ground="black">
                <div className={s.wrap}>
                    <div className={s.closing}>
                        <h2 className={s.closingTitle} data-rise>
                            {closing.title}
                        </h2>
                        <div className={s.closingSide} data-rise>
                            <p>{closing.text}</p>
                            <div className={s.closingActions}>
                                <a className={s.button} {...bookingLinkProps("case-study-tuit")}>
                                    <span>Book a call</span>
                                    <i aria-hidden="true">
                                        <Arrow />
                                    </i>
                                </a>
                                <Link className={s.textLink} href="/#work">
                                    See all work
                                    <span aria-hidden="true">
                                        <Arrow />
                                    </span>
                                </Link>
                            </div>
                            <ul className={s.related} aria-label="Related services">
                                {closing.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────── Next case study ─────────────
                Back on linen, where the candle was first lit. */}
            <section className={`${s.band} ${s.nextBand}`} data-ground="linen">
                <div className={s.wrap}>
                    <NextCaseStudy related={relatedCaseStudies(TUIT.slug)} cta="View case study" sizes="(max-width: 767px) 92vw, 56vw" classes={{ link: s.nextLink, label: s.nextLabel, title: s.nextTitle, meta: s.nextMeta, tags: s.nextTags, tag: s.nextTag, thumb: s.nextThumb, icon: s.nextIcon }} />
                </div>
            </section>

            {/* The wick: a line down the right edge with a flame at the reader's
                position. Last in <main> so it paints over every band. */}
            <div className={s.wickTrack} aria-hidden="true">
                <div className={s.wickLine} data-wick />
            </div>
            <div className={s.wickTrack} aria-hidden="true">
                <div className={s.wickFlameBox} data-wick>
                    <span className={s.wickFlame} />
                </div>
            </div>

            <TuitMotion />
        </main>
    );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif, Poppins } from "next/font/google";
import NextCaseStudy from "@/app/Components/CaseStudy/NextCaseStudy";
import { relatedCaseStudies } from "@/app/data/caseStudies";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { bookingLinkProps } from "@/app/lib/booking";
import { SITE, absoluteUrl } from "@/app/data/site";
import { NW, plain } from "./content";
import NwMotion from "./NwMotion";
import PagesIndex from "./PagesIndex";
import s from "./nw.module.scss";

// Naturally White: case study ("Shade by shade").
//
// Concept: the brand lifts smiles "3 to 12 shades", so the page itself
// brightens as it is read. The hero opens on the brand's lilac-to-sky gradient
// with a twelve-tab shade guide; each chapter sits on a lighter ground than
// the one before, the last one pure white; and a small shade guide on the right
// edge holds up the tab of the chapter being read. The palette and type are
// the brand's own (Poppins, plus an italic serif for one word per headline),
// so this page is an island: it looks the same in the site's light and dark
// themes. The site header and footer stay as they are.
//
// Server component. All scroll motion (GSAP ScrollTrigger: reveals, parallax,
// the scrubbed homepage scroll, the shade rail) is NwMotion.tsx; without it,
// or under reduced motion, every block is simply visible.

// Poppins is the brand's typeface. Instrument Serif Italic stands in for Juana
// Medium Italic, which is not licensed for this site.
const poppins = Poppins({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-poppins", display: "swap" });
const serif = Instrument_Serif({ weight: "400", style: ["italic"], subsets: ["latin"], variable: "--font-accent", display: "swap" });

const TITLE = NW.seoTitle;
const DESCRIPTION = NW.seoDescription;
const SHARE = { url: NW.og.src, width: NW.og.width, height: NW.og.height, alt: `${NW.client} website design by ${SITE.name}` };

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: NW.path },
    openGraph: {
        type: "article",
        url: NW.path,
        siteName: SITE.name,
        locale: SITE.locale,
        title: `${TITLE} | ${SITE.name}`,
        description: DESCRIPTION,
        publishedTime: NW.published,
        images: [SHARE]
    },
    twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE.name}`, description: DESCRIPTION, images: [SHARE.url] }
};

const CRUMBS = [
    { name: "Work", path: "/#work" },
    { name: NW.client, path: NW.path }
];

/** "One *word* here": the starred word is set in the italic serif. */
const accent = (text: string) => text.split("*").map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChapterHead = ({ no, label, title, sub }: { no: string; label: string; title: string; sub?: string }) => (
    <header className={s.chapterHead}>
        <p className={s.chapterNo} data-rise>
            {no}
            <i className={s.tab} aria-hidden="true" />
            {label}
        </p>
        <h2 className={s.chapterTitle} data-rise>
            {accent(title)}
        </h2>
        {sub && (
            <p className={s.chapterSub} data-rise>
                {sub}
            </p>
        )}
    </header>
);

export default function NaturallyWhiteCaseStudy() {
    const { hero, cover, marquee, chapters, brief, phone, look, page, system, pages, mobile, result, closing } = NW;

    return (
        <main id="main" className={`${s.page} ${poppins.variable} ${serif.variable}`} data-nw>
            <PageSchema
                path={NW.path}
                title={TITLE}
                description={DESCRIPTION}
                crumbs={CRUMBS}
                extra={[
                    {
                        "@type": "Article",
                        "@id": `${absoluteUrl(NW.path)}#article`,
                        headline: `${plain(hero.title.join(" "))} ${hero.titleFor}`,
                        description: DESCRIPTION,
                        image: [absoluteUrl(NW.og.src), absoluteUrl(cover.src)],
                        datePublished: NW.published,
                        dateModified: NW.published,
                        author: { "@type": "Person", name: hero.byline.name, jobTitle: hero.byline.role, worksFor: { "@id": `${SITE.url}/#organization` } },
                        publisher: { "@id": `${SITE.url}/#organization` },
                        about: { "@type": "Organization", name: NW.client },
                        mainEntityOfPage: { "@id": `${absoluteUrl(NW.path)}#webpage` },
                        inLanguage: "en"
                    }
                ]}
            />

            {/* ───────────── Cover ───────────── */}
            <section className={`${s.band} ${s.hero}`} data-ground="hero">
                <div className={s.wrap}>
                    <div className={s.metaBar}>
                        <nav aria-label="Breadcrumb">
                            <ol className={s.crumbs}>
                                <li>
                                    <Link href="/#work">Work</Link>
                                </li>
                                <li aria-current="page">{NW.client}</li>
                            </ol>
                        </nav>
                        <p className={s.kicker}>{hero.kicker}</p>
                    </div>

                    <h1 className={s.title}>
                        {hero.title.map((line, i) => (
                            <span key={line} className={s.titleLine}>
                                <span style={{ "--l": i } as React.CSSProperties}>{accent(line)}</span>
                            </span>
                        ))}{" "}
                        <span className={s.titleFor}>{hero.titleFor}</span>
                    </h1>

                    {/* The shade guide: twelve tabs, the brand's pastels fading to
                        white. Decorative; the note beside it is the real text. */}
                    <div className={s.guide}>
                        <ul className={s.guideTabs} aria-hidden="true">
                            {hero.shades.map((shade, i) => (
                                <li key={shade} style={{ "--shade": shade, "--i": i } as React.CSSProperties} />
                            ))}
                        </ul>
                        <p className={s.guideNote}>{hero.shadeNote}</p>
                    </div>

                    <div className={s.introRow}>
                        <div className={s.introCol}>
                            <p className={s.intro}>{hero.intro}</p>
                            <p className={s.byline}>
                                Design and art direction by <Link href="/team">{hero.byline.name}</Link>, {hero.byline.role}.{" "}
                                <time dateTime={NW.published}>Published {hero.byline.date}</time>
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

            <figure className={s.render}>
                <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="100vw" priority data-parallax="7.5" />
            </figure>

            {/* The brand site's own marquee. One real copy, one hidden copy to
                make the loop seamless. */}
            <div className={s.marquee} data-ground="lilac">
                <div className={s.marqueeTrack}>
                    {[false, true].map((copy) => (
                        <p key={String(copy)} className={s.marqueeRow} aria-hidden={copy || undefined}>
                            {marquee.map((word) => (
                                <span key={word}>
                                    {accent(word)}
                                    <i className={s.tab} aria-hidden="true" />
                                </span>
                            ))}
                        </p>
                    ))}
                </div>
            </div>

            {/* ───────────── 01 · The brief ───────────── */}
            <section className={s.band} data-ground="lilac" data-chapter="0">
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

            <figure className={s.render}>
                <Image src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} sizes="100vw" data-parallax="7.5" />
            </figure>

            {/* ───────────── 02 · The look ───────────── */}
            <section className={s.band} data-ground="sky" data-chapter="1">
                <div className={s.wrap}>
                    <ChapterHead no={look.no} label={look.label} title={look.title} sub={look.sub} />
                    <div className={s.pair}>
                        {look.images.map((image, i) => (
                            <figure key={image.src} className={s.pairItem} data-rise>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={image.width}
                                    height={image.height}
                                    sizes="(max-width: 767px) 92vw, 46vw"
                                    data-parallax={i ? "6" : "4"}
                                />
                            </figure>
                        ))}
                    </div>
                    <div className={s.columns} data-rise-group>
                        {look.notes.map((note) => (
                            <div key={note.name} className={s.column} data-rise-item>
                                <h3>{note.name}</h3>
                                <p>{note.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────────── 03 · The homepage ─────────────
                With motion on, the tall wrapper pins the stage (CSS sticky) and the
                scroll position scrubs the page through the window. Without it, the
                window is an ordinary scroll area. */}
            <section className={`${s.band} ${s.pageBand}`} data-ground="blush" data-chapter="2" data-page-scroll>
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
                        <div className={s.window} data-window tabIndex={0} role="region" aria-label="The full Naturally White homepage">
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

            {/* ───────────── 04 · The system ───────────── */}
            <section className={s.band} data-ground="mist" data-chapter="3">
                <div className={s.wrap}>
                    <ChapterHead no={system.no} label={system.label} title={system.title} sub={system.sub} />

                    {/* The palette as a shade guide: seven tabs hanging from one bar. */}
                    <ul className={s.palette} data-rise-group>
                        {system.shades.map((shade) => (
                            <li key={shade.name} className={s.swatch} data-rise-item>
                                <span className={`${s.swatchTab} ${shade.dark ? s.swatchDark : ""}`} style={{ "--shade": shade.hex } as React.CSSProperties}>
                                    <span className={s.swatchHex}>{shade.hex}</span>
                                </span>
                                <h3 className={s.swatchName}>{shade.name}</h3>
                                <p className={s.swatchUse}>{shade.use}</p>
                            </li>
                        ))}
                    </ul>

                    <div className={s.typeRow} data-rise-group>
                        <div className={s.typeCard} data-rise-item>
                            <p className={s.typeLabel}>Primary typeface</p>
                            <p className={s.typeAa} aria-hidden="true">
                                Aa
                            </p>
                            <h3 className={s.typeName}>{system.type.primary.name}</h3>
                            <p className={s.typeMeta}>
                                {system.type.primary.role}. {system.type.primary.weights}.
                            </p>
                        </div>
                        <div className={s.typeCard} data-rise-item>
                            <p className={s.typeLabel}>Accent typeface</p>
                            <Image
                                className={s.typeSample}
                                src={system.type.accent.sample.src}
                                alt={system.type.accent.sample.alt}
                                width={system.type.accent.sample.width}
                                height={system.type.accent.sample.height}
                                sizes="(max-width: 767px) 80vw, 36vw"
                            />
                            <h3 className={s.typeName}>{system.type.accent.name}</h3>
                            <p className={s.typeMeta}>{system.type.accent.role}.</p>
                        </div>
                    </div>

                    <ul className={s.parts} data-rise-group>
                        {system.parts.map((part) => (
                            <li key={part.name} data-rise-item>
                                <figure className={s.part}>
                                    <div className={s.partImage}>
                                        <Image src={part.src} alt={part.alt} width={part.width} height={part.height} sizes="(max-width: 767px) 80vw, 26vw" />
                                    </div>
                                    <figcaption>
                                        <strong>{part.name}</strong>
                                        <span>{part.text}</span>
                                    </figcaption>
                                </figure>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ───────────── 05 · The pages ───────────── */}
            <section className={s.band} data-ground="dew" data-chapter="4">
                <div className={s.wrap}>
                    <ChapterHead no={pages.no} label={pages.label} title={pages.title} sub={pages.sub} />
                    <PagesIndex items={pages.items} width={pages.imageWidth} height={pages.imageHeight} />
                </div>
            </section>

            <figure className={s.render}>
                <Image
                    src={pages.overview.src}
                    alt={pages.overview.alt}
                    width={pages.overview.width}
                    height={pages.overview.height}
                    sizes="100vw"
                    data-parallax="7.5"
                />
            </figure>

            {/* ───────────── 06 · In the hand ───────────── */}
            <section className={`${s.band} ${s.mobileBand}`} data-ground="petal" data-chapter="5">
                <div className={s.wrap}>
                    <ChapterHead no={mobile.no} label={mobile.label} title={mobile.title} sub={mobile.sub} />
                </div>
                <ul className={s.phones} tabIndex={0} aria-label="Naturally White mobile screens">
                    {mobile.phones.map((item, i) => (
                        <li key={item.name} className={s.phone} data-float={[1, -0.6, 0.8, -1, 0.5][i]}>
                            <figure>
                                <div className={s.phoneFrame}>
                                    <Image src={item.src} alt={item.alt} width={mobile.phoneWidth} height={mobile.phoneHeight} sizes="(max-width: 767px) 62vw, 18vw" />
                                </div>
                                <figcaption>
                                    <span>{String(i + 1).padStart(2, "0")}</span>
                                    {item.name}
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
                <div className={s.wrap}>
                    {/* Phones only: the row is a swipe row there. */}
                    <p className={s.swipeHint} aria-hidden="true">
                        {mobile.hint}
                        <Arrow />
                    </p>
                    <dl className={s.specs} data-rise-group>
                        {mobile.specs.map((spec) => (
                            <div key={spec.label} data-rise-item>
                                <dt>{spec.label}</dt>
                                <dd>{spec.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ───────────── 07 · The result ───────────── */}
            <section className={s.band} data-ground="white" data-chapter="6">
                <div className={s.wrap}>
                    <ChapterHead no={result.no} label={result.label} title={result.title} />
                    <ul className={s.points} data-rise-group>
                        {result.points.map((point) => (
                            <li key={point.title} data-rise-item>
                                <h3>{point.title}</h3>
                                <p>{point.text}</p>
                            </li>
                        ))}
                    </ul>
                    <figure className={s.screens} data-rise>
                        <Image
                            src={result.image.src}
                            alt={result.image.alt}
                            width={result.image.width}
                            height={result.image.height}
                            sizes="(max-width: 991px) 92vw, 1400px"
                        />
                    </figure>
                </div>
            </section>

            {/* ───────────── What next: the one dark band, after white ───────────── */}
            <section className={`${s.band} ${s.closingBand}`} data-ground="ink">
                <div className={s.wrap}>
                    <div className={s.closing}>
                        <h2 className={s.closingTitle} data-rise>
                            {accent(closing.title)}
                        </h2>
                        <div className={s.closingSide} data-rise>
                            <p>{closing.text}</p>
                            <div className={s.closingActions}>
                                <a className={s.button} {...bookingLinkProps("case-study-naturally-white")}>
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
                Back on the hero's lilac-to-sky gradient: a fresh start. */}
            <section className={`${s.band} ${s.nextBand}`} data-ground="hero">
                <div className={s.wrap}>
                    <NextCaseStudy related={relatedCaseStudies(NW.slug)} classes={{ link: s.nextLink, label: s.nextLabel, title: s.nextTitle, meta: s.nextMeta, tags: s.nextTags, tag: s.nextTag, thumb: s.nextThumb, icon: s.nextIcon }} />
                </div>
            </section>

            {/* The shade rail: one tab per chapter, lightest last. The tab of the
                chapter being read is held out. Last in <main> so it paints over
                every band. */}
            <div className={s.railTrack} aria-hidden="true">
                <ol className={s.rail} data-rail>
                    {chapters.map((chapter) => (
                        <li key={chapter.no} style={{ "--shade": chapter.shade } as React.CSSProperties}>
                            <span>{chapter.no}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <NwMotion />
        </main>
    );
}

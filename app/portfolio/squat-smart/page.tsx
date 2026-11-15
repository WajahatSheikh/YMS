import type { Metadata } from "next";
import Image from "next/image";
import { Inter, Saira_Condensed } from "next/font/google";
import NextCaseStudy from "@/app/Components/CaseStudy/NextCaseStudy";
import { BookACall } from "@/app/Components/Header/Header";
import { relatedCaseStudies } from "@/app/data/caseStudies";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { SITE, absoluteUrl } from "@/app/data/site";
import { SS } from "./content";
import CompareSlider from "./CompareSlider";
import SwatchCard from "./SwatchCard";
import CopySwatch from "./CopySwatch";
import SsMotion from "./SsMotion";
import s from "./ss.module.scss";

// Squat Smart: case study ("Find your stance.").
//
// Concept (DESIGN.md): the case study is the mat. Read it like a rep, and your
// pointer sets your stance. Chapters are reps, accents are the A / B / C zone
// letters, and the reader can try the store's real parts.
//
// Signature: the stance mat. In the hero the feet follow the pointer across the
// zones (wide A, centre B, narrow C) and breathe through a slow rep at rest; in
// chapter 04 a sticky stage scrubs A → B → C with scroll. One driver in
// SsMotion.tsx maps a single "stance" value to the feet, the lit band, the zone
// label and the copy. The zone rail on the right edge tracks reading progress
// (a coral line on phones).
//
// The palette is the client's (blush, rose, coral, one blue); headlines use
// Saira Condensed as the web stand-in for Evogria, whose real letterforms are
// shown as images in Foundations. The page is an island: the same in the
// site's light and dark themes. Server component with small client islands;
// without script, or under reduced motion, everything is visible.

const inter = Inter({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-ss-inter", display: "swap" });
const saira = Saira_Condensed({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-ss-display", display: "swap" });

const TITLE = SS.seoTitle;
const DESCRIPTION = SS.seoDescription;
const SHARE = { url: SS.og.src, width: SS.og.width, height: SS.og.height, alt: `${SS.client} Shopify store design by ${SITE.name}` };

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: SS.path },
    openGraph: {
        type: "article",
        url: SS.path,
        siteName: SITE.name,
        locale: SITE.locale,
        title: `${TITLE} | ${SITE.name}`,
        description: DESCRIPTION,
        publishedTime: SS.published,
        images: [SHARE]
    },
    twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE.name}`, description: DESCRIPTION, images: [SHARE.url] }
};

const CRUMBS = [
    { name: "Work", path: "/#work" },
    { name: SS.client, path: SS.path }
];

/** "One *phrase* here": the starred phrase is set in the accent colour. */
const accent = (text: string) => text.split("*").map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FOOT = "M20 4c9 0 15 9 15 24 0 10-3 17-4 26-1 8 2 14 1 22-1 7-5 12-12 12S9 83 8 76c-1-8 2-14 1-22C8 45 5 38 5 28 5 13 11 4 20 4Z";

/**
 * The stance mat: five bands mirrored A B C B A (A wide at the edges, C narrow
 * in the middle) and two feet. SsMotion drives --spread, --rep and data-zone.
 * Server-rendered in its "Zone B" state, which is also the no-script and
 * reduced-motion picture.
 */
const StanceMat = ({ id, label = "Zone B · Quads", className = "" }: { id: string; label?: string; className?: string }) => (
    <div className={`${s.mat} ${className}`} data-mat={id} data-zone="B" aria-hidden="true">
        <span className={s.matBand} data-band="A" />
        <span className={s.matBand} data-band="B" />
        <span className={s.matBand} data-band="C" />
        <span className={s.matBand} data-band="B" />
        <span className={s.matBand} data-band="A" />
        <span className={s.matLetters}>
            <i>A</i>
            <i>B</i>
            <i>C</i>
            <i>B</i>
            <i>A</i>
        </span>
        <span className={s.matFeet}>
            <svg className={s.foot} data-side="l" viewBox="0 0 40 92">
                <path d={FOOT} />
            </svg>
            <svg className={s.foot} data-side="r" viewBox="0 0 40 92">
                <path d={FOOT} />
            </svg>
        </span>
        <b className={s.matLabel} data-mat-label>
            {label}
        </b>
    </div>
);

const Chapter = ({ no, label, title, body, n }: { no: string; label: string; title: string; body?: string; n: number }) => (
    <header className={s.chapterHead} data-chapter={n} data-rise>
        <div>
            <p className={s.chapterNo}>
                <span>Rep {no}</span> {label}
            </p>
            <h2 className={s.chapterTitle}>{accent(title)}</h2>
        </div>
        {body ? <p className={s.chapterBody}>{body}</p> : null}
    </header>
);

export default function SquatSmartCaseStudy() {
    const { hero, chapters, brief, directions, foundations, zones, kit, pages, details, responsive, phone, launch, closing } = SS;

    return (
        <main id="main" className={`${s.page} ${inter.variable} ${saira.variable}`} data-ss>
            <PageSchema
                path={SS.path}
                title={TITLE}
                description={DESCRIPTION}
                crumbs={CRUMBS}
                extra={[
                    {
                        "@type": "Article",
                        "@id": `${absoluteUrl(SS.path)}#article`,
                        headline: `${hero.title.join(" ")} ${hero.titleFor}`,
                        description: DESCRIPTION,
                        image: [absoluteUrl(SS.og.src), absoluteUrl(hero.desktop.src)],
                        datePublished: SS.published,
                        dateModified: SS.published,
                        author: {
                            "@type": "Person",
                            name: hero.byline.name,
                            jobTitle: hero.byline.role,
                            url: absoluteUrl("/team"),
                            worksFor: { "@id": `${SITE.url}/#organization` }
                        },
                        publisher: { "@id": `${SITE.url}/#organization` },
                        about: { "@type": "Organization", name: SS.client, url: hero.live },
                        mainEntityOfPage: { "@id": `${absoluteUrl(SS.path)}#webpage` },
                        inLanguage: "en"
                    }
                ]}
            />

            {/* ───────────── Cover ───────────── */}
            <section className={`${s.band} ${s.hero}`} data-ground="blush">
                <div className={s.wrap}>
                    <ul className={s.heroMeta}>
                        {hero.meta.map((m) => (
                            <li key={m}>{m}</li>
                        ))}
                    </ul>
                    <div className={s.heroHead}>
                        <h1 className={s.heroTitle}>
                            <span>{hero.title[0]}</span> <span>{hero.title[1]}</span>
                            <span className={s.visuallyHidden}> {hero.titleFor}</span>
                        </h1>
                        <div className={s.heroStage}>
                            <StanceMat id="hero" className={s.heroMat} />
                            <p className={s.heroHint} aria-hidden="true">
                                <span data-hint="pointer">Move across the mat to change your stance</span>
                                <span data-hint="touch">A wide · B centre · C narrow</span>
                            </p>
                        </div>
                    </div>
                    <div className={s.heroIntro}>
                        <p>{hero.intro}</p>
                        <ul className={s.zoneChips} aria-label="The mat's three zones">
                            <li>
                                <b>A</b> Glutes
                            </li>
                            <li>
                                <b>B</b> Quads
                            </li>
                            <li>
                                <b>C</b> Inner thigh
                            </li>
                        </ul>
                        <p className={s.byline}>
                            {hero.byline.name} · {hero.byline.role} · {hero.byline.date}
                        </p>
                    </div>
                    <div className={s.heroDevices}>
                        <div className={s.browser}>
                            <span className={s.browserBar} aria-hidden="true">
                                <i />
                                <i />
                                <i />
                                <b>squatsmart.com</b>
                            </span>
                            <Image src={hero.desktop.src} alt={hero.desktop.alt} width={hero.desktop.width} height={hero.desktop.height} priority sizes="(max-width: 767px) 92vw, 70vw" />
                        </div>
                        <div className={`${s.phoneFrame} ${s.heroPhone}`}>
                            <Image src={hero.mobile.src} alt={hero.mobile.alt} width={hero.mobile.width} height={hero.mobile.height} sizes="(max-width: 767px) 40vw, 18vw" />
                        </div>
                        <a className={s.liveBadge} href={hero.live} target="_blank" rel="noopener">
                            Live on Shopify <Arrow />
                        </a>
                    </div>
                    <p className={s.cue} aria-hidden="true">
                        {hero.cue} ↓
                    </p>
                </div>
            </section>

            {/* ───────────── 01 Brief ───────────── */}
            <section className={s.band} data-ground="night">
                <div className={s.wrap}>
                    <Chapter n={0} no={brief.no} label={brief.label} title={brief.title} body={brief.body} />
                    <div className={s.stats} data-rise>
                        {brief.stats.map((st, i) => (
                            <div key={st.label} className={s.stat} data-tone={i}>
                                <p className={s.statValue}>
                                    {"prefix" in st ? st.prefix : ""}
                                    <span data-count={st.value} data-decimals={st.decimals}>
                                        {st.value.toFixed(st.decimals)}
                                    </span>
                                    {st.suffix}
                                </p>
                                <p className={s.statLabel}>{st.label}</p>
                            </div>
                        ))}
                    </div>
                    <dl className={s.facts} data-rise>
                        {brief.facts.map((f) => (
                            <div key={f.label}>
                                <dt>{f.label}</dt>
                                <dd>{f.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ───────────── 02 Directions ───────────── */}
            <section className={s.band} data-ground="white">
                <div className={s.wrap}>
                    <Chapter n={1} no={directions.no} label={directions.label} title={directions.title} body={directions.body} />
                    <div data-rise>
                        <CompareSlider a={directions.a} b={directions.b} />
                    </div>
                </div>
            </section>

            {/* ───────────── 03 Foundations ───────────── */}
            <section className={s.band} data-ground="blush2">
                <div className={s.wrap}>
                    <Chapter n={2} no={foundations.no} label={foundations.label} title={foundations.title} body={foundations.body} />
                    <div className={s.palette} data-rise>
                        {foundations.colours.map((c) => (
                            <CopySwatch key={c.hex} name={c.name} hex={c.hex} use={c.use} dark={["#1A1A1C", "#000000"].includes(c.hex)} />
                        ))}
                    </div>
                    <div className={s.typeRow} data-rise>
                        <figure className={s.typeCard}>
                            <figcaption>Display · Evogria</figcaption>
                            <Image src={foundations.type.hero.src} alt={foundations.type.hero.alt} width={foundations.type.hero.width} height={foundations.type.hero.height} sizes="(max-width: 767px) 86vw, 50vw" />
                            <Image src={foundations.type.section.src} alt={foundations.type.section.alt} width={foundations.type.section.width} height={foundations.type.section.height} sizes="(max-width: 767px) 70vw, 34vw" className={s.typeSmall} />
                            <p>{foundations.type.display}</p>
                        </figure>
                        <figure className={`${s.typeCard} ${s.typeDark}`}>
                            <figcaption>Text · SF Pro</figcaption>
                            <p className={s.typeAa} aria-hidden="true">
                                Aa
                            </p>
                            <p>{foundations.type.text}</p>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ───────────── 04 Zones ───────────── */}
            <section className={`${s.band} ${s.zonesBand}`} data-ground="night">
                <div className={s.wrap}>
                    <Chapter n={3} no={zones.no} label={zones.label} title={zones.title} body={zones.body} />
                </div>
                {/* The sticky stage: 3 scroll segments, one per zone. SsMotion maps the
                    stage's progress to the stance and marks the active zone; the
                    links jump to a segment. Without script all three panels show. */}
                <div className={s.stageTrack} data-stage>
                    <div className={s.stage}>
                        <div className={`${s.wrap} ${s.stageInner}`}>
                            <StanceMat id="stage" className={s.stageMat} />
                            <div className={s.stageSide}>
                                <nav className={s.stageNav} aria-label="Foot zones">
                                    {zones.list.map((z) => (
                                        <a key={z.id} href={`#zone-${z.id}`} className={s.stageLink} data-zone-link={z.id}>
                                            <span>{z.id}</span>
                                            {z.name}
                                        </a>
                                    ))}
                                </nav>
                                <div className={s.stagePanels}>
                                    {zones.list.map((z) => (
                                        <article key={z.id} id={`zone-${z.id}`} className={s.stagePanel} data-zone-panel={z.id}>
                                            <p className={s.stageTag}>
                                                Zone {z.id} · {z.stance}
                                            </p>
                                            <h3>{z.name}</h3>
                                            <p>{z.text}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.wrap}>
                    <div className={s.zoneRefs} data-rise>
                        <figure>
                            <Image src={zones.diagram.src} alt={zones.diagram.alt} width={zones.diagram.width} height={zones.diagram.height} sizes="(max-width: 767px) 92vw, 50vw" />
                            <figcaption>The real mat, printed with the zones</figcaption>
                        </figure>
                        <figure>
                            <Image src={zones.map.src} alt={zones.map.alt} width={zones.map.width} height={zones.map.height} sizes="(max-width: 767px) 92vw, 40vw" />
                            <figcaption>The muscle map from the product page</figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ───────────── 05 Live UI ───────────── */}
            <section className={s.band} data-ground="blush">
                <div className={s.wrap}>
                    <Chapter n={4} no={kit.no} label={kit.label} title={kit.title} body={kit.body} />
                    <div className={s.kit} data-rise>
                        <SwatchCard mats={kit.mats} price={kit.price} />
                        <div className={s.kitSide}>
                            <div className={s.kitButtons}>
                                <p className={s.kitLabel}>Buttons · hover and press</p>
                                <a className={`${s.btn} ${s.btnBlue}`} href="#kit-faq">
                                    Shop now
                                </a>
                                <a className={`${s.btn} ${s.btnRose}`} href="#kit-faq">
                                    Add to my order
                                </a>
                                <a className={`${s.btn} ${s.btnOutline}`} href="#kit-faq">
                                    Write a review
                                </a>
                                <a className={`${s.btn} ${s.btnDark}`} href="#kit-faq">
                                    Learn more
                                </a>
                            </div>
                            <div className={s.kitFaq} id="kit-faq">
                                <p className={s.kitLabel}>FAQ · open a question</p>
                                {kit.faq.map((f, i) => (
                                    <details key={f.q} open={i === 0}>
                                        <summary>{f.q}</summary>
                                        <p>{f.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────── 06 Two pages ───────────── */}
            <section className={s.band} data-ground="rose">
                <div className={s.wrap}>
                    <Chapter n={5} no={pages.no} label={pages.label} title={pages.title} body={pages.body} />
                    <div className={s.pages} data-rise>
                        {[pages.home, pages.product].map((p) => (
                            <figure key={p.label} className={s.pageWindow}>
                                <figcaption>{p.label}</figcaption>
                                <div className={s.pageScroll} tabIndex={0} role="region" aria-label={`${p.label}, scrollable`}>
                                    <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 767px) 92vw, 46vw" />
                                </div>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────────── 07 Details ───────────── */}
            <section className={s.band} data-ground="white">
                <div className={s.wrap}>
                    <Chapter n={6} no={details.no} label={details.label} title={details.title} />
                    <div className={s.details}>
                        {details.crops.map((c) => (
                            <figure key={c.src} className={s.detail} data-wide={"wide" in c && c.wide ? "" : undefined} data-rise>
                                <div className={s.detailImg}>
                                    <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes={"wide" in c && c.wide ? "(max-width: 767px) 92vw, 84vw" : "(max-width: 767px) 92vw, 42vw"} />
                                </div>
                                <figcaption>{c.caption}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────────── 08 Responsive ───────────── */}
            <section className={s.band} data-ground="rose2">
                <div className={s.wrap}>
                    <Chapter n={7} no={responsive.no} label={responsive.label} title={responsive.title} body={responsive.body} />
                    <div className={s.trio} data-rise>
                        <div className={s.browser}>
                            <span className={s.browserBar} aria-hidden="true">
                                <i />
                                <i />
                                <i />
                                <b>squatsmart.com</b>
                            </span>
                            <Image src={responsive.desktop.src} alt={responsive.desktop.alt} width={responsive.desktop.width} height={responsive.desktop.height} sizes="(max-width: 767px) 92vw, 60vw" />
                        </div>
                        <div className={s.ipadFrame}>
                            <Image src={responsive.ipad.src} alt={responsive.ipad.alt} width={responsive.ipad.width} height={responsive.ipad.height} sizes="(max-width: 767px) 40vw, 22vw" />
                        </div>
                        <div className={`${s.phoneFrame} ${s.trioPhone}`}>
                            <Image src={responsive.phone.src} alt={responsive.phone.alt} width={responsive.phone.width} height={responsive.phone.height} sizes="(max-width: 767px) 28vw, 12vw" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────── 09 Phones ───────────── */}
            <section className={s.band} data-ground="coral">
                <div className={s.wrap}>
                    <Chapter n={8} no={phone.no} label={phone.label} title={phone.title} />
                    <p className={s.dragHint} aria-hidden="true">
                        ← {phone.hint} →
                    </p>
                </div>
                <ol className={s.phoneRail} data-drag tabIndex={0} aria-label="Eight screens of the store on a phone">
                    {phone.phones.map((p, i) => (
                        <li key={p.label}>
                            <div className={s.phoneFrame}>
                                <Image src={p.src} alt={p.alt} width={660} height={1428} sizes="(max-width: 767px) 62vw, 300px" draggable={false} />
                            </div>
                            <p>
                                <span>{String(i + 1).padStart(2, "0")}</span> {p.label}
                            </p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* ───────────── 10 Launch ───────────── */}
            <section className={s.band} data-ground="white">
                <div className={s.wrap}>
                    <Chapter n={9} no={launch.no} label={launch.label} title={launch.title} />
                    <ol className={s.steps} data-rise>
                        {launch.steps.map((st) => (
                            <li key={st.no} data-last={st.no === "04" ? "" : undefined}>
                                <b>{st.no}</b>
                                <h3>{st.title}</h3>
                                <p>{st.text}</p>
                            </li>
                        ))}
                    </ol>
                    <p className={s.liveRow} data-rise>
                        <a className={`${s.btn} ${s.btnBlue}`} href={hero.live} target="_blank" rel="noopener">
                            Visit squatsmart.com <Arrow />
                        </a>
                    </p>
                </div>
            </section>

            {/* ───────────── Closing ───────────── */}
            <section className={`${s.band} ${s.closing}`} data-ground="ink">
                <div className={s.wrap}>
                    <p className={s.thanks} aria-hidden="true">
                        Thanks for the reps.
                    </p>
                    <h2 className={s.closingTitle} data-rise>
                        {accent(closing.title)}
                    </h2>
                    <div className={s.closingActions} data-rise>
                        {/* The site's own Book a call pill: one primary action style on the page,
                            the same as the header and the footer. */}
                        <BookACall placement="case-study-squat-smart" className={s.closingCta} />
                        <ul className={s.chips} aria-label="Related services">
                            {closing.links.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} data-transition data-transition-label={link.label}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ───────────── Next case study ───────────── */}
            <section className={`${s.band} ${s.next}`} data-ground="night">
                <div className={s.wrap}>
                    <NextCaseStudy related={relatedCaseStudies(SS.slug)} classes={{ link: s.nextLink, label: s.nextLabel, title: s.nextTitle, meta: s.nextMeta, tags: s.nextTags, tag: s.nextTag, thumb: s.nextThumb, icon: s.nextIcon }} />
                </div>
            </section>

            {/* The zone rail: a small vertical mat on the right edge. The footprint
                walks down it with reading progress and each chapter lights its
                tick. Last in <main> so it paints over every band. Decorative. */}
            <div className={s.rail} data-rail aria-hidden="true">
                <b>A</b>
                <span className={s.railTrack}>
                    {chapters.map((c, i) => (
                        <i key={c} className={s.railTick} data-tick style={{ "--t": `${(i + 0.5) / chapters.length}` } as React.CSSProperties} />
                    ))}
                    <span className={s.railFoot} />
                </span>
                <b>C</b>
            </div>
            <span className={s.railLine} data-rail-line aria-hidden="true" />

            <SsMotion />
        </main>
    );
}

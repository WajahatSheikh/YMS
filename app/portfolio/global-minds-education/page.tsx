import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import NextCaseStudy from "@/app/Components/CaseStudy/NextCaseStudy";
import { relatedCaseStudies } from "@/app/data/caseStudies";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { bookingLinkProps } from "@/app/lib/booking";
import { SITE, absoluteUrl } from "@/app/data/site";
import { GME } from "./content";
import GmeMotion from "./GmeMotion";
import s from "./gme.module.scss";

// Global Minds Education: case study ("Study abroad, from home.").
//
// Concept: the students never board a plane, so the page is a journey. The
// brief is an itinerary, the components are a boarding kit, the seven pages are
// destinations with gate stamps, the three screen sizes are layovers and the
// page ends on "Arrived". The only accent shapes are the petals of the client's
// pinwheel logo.
//
// Signature: the flight rail on the right edge, DXB at the top and LON at the
// bottom. A petal "plane" travels down it with reading progress and every
// chapter stamps its tick as you reach it (GmeMotion.tsx). On phones the rail
// becomes a thin progress line under the header.
//
// The palette and type are the client's own (Inter + IBM Plex Mono, navy,
// orange, sun), so this page is an island: the same in the site's light and
// dark themes. Server component; without script, or under reduced motion,
// every block is visible and the rail shows a static position.

const inter = Inter({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-gme-inter", display: "swap" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-gme-mono", display: "swap" });

const TITLE = GME.seoTitle;
const DESCRIPTION = GME.seoDescription;
const SHARE = { url: GME.og.src, width: GME.og.width, height: GME.og.height, alt: `${GME.client} website design by ${SITE.name}` };

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: GME.path },
    openGraph: {
        type: "article",
        url: GME.path,
        siteName: SITE.name,
        locale: SITE.locale,
        title: `${TITLE} | ${SITE.name}`,
        description: DESCRIPTION,
        publishedTime: GME.published,
        images: [SHARE]
    },
    twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE.name}`, description: DESCRIPTION, images: [SHARE.url] }
};

const CRUMBS = [
    { name: "Work", path: "/#work" },
    { name: GME.client, path: GME.path }
];

const IMG = "/assets/images/work/global-minds-education";
// Pixel sizes of the full-page shots (432 wide), for the destinations wall.
const WALL: Record<string, number> = { home: 2415, about: 1923, alumni: 1499, programs: 1481, course: 2121, partners: 1994, contact: 1285 };
const PETALS = ["#FF6800", "#008CFF", "#00C667", "#7859FD", "#F2392C", "#FFB600", "#FFA133", "#FF5FA2"];
const PETAL: Record<string, string> = { orange: "#FF6800", blue: "#008CFF", green: "#00C667", purple: "#7859FD" };

/** "One *phrase* here": the starred phrase is set in the accent colour. */
const accent = (text: string) => text.split("*").map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Petal = ({ colour, className = "" }: { colour: string; className?: string }) => (
    <i className={`${s.petal} ${className}`} style={{ "--p": colour } as React.CSSProperties} aria-hidden="true" />
);

/** The logo's pinwheel: eight petals around a point. Decorative. */
const Pinwheel = ({ className = "" }: { className?: string }) => (
    <span className={`${s.pinwheel} ${className}`} aria-hidden="true" data-spin>
        {PETALS.map((c, i) => (
            <i key={c} style={{ "--p": c, "--a": `${i * 45}deg` } as React.CSSProperties} />
        ))}
    </span>
);

const Stamp = ({ top, code, bottom, colour, className = "" }: { top: string; code: string; bottom: string; colour: string; className?: string }) => (
    <span className={`${s.stamp} ${className}`} style={{ "--s": colour } as React.CSSProperties} aria-hidden="true" data-stamp>
        <small>{top}</small>
        <b>{code}</b>
        <small>{bottom}</small>
    </span>
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
                {accent(title)}
            </h2>
        </div>
        {body && (
            <p className={s.chapterBody} data-rise>
                {body}
            </p>
        )}
    </header>
);

const Browser = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`${s.browser} ${className}`}>
        <div className={s.chrome} aria-hidden="true">
            <i />
            <i />
            <i />
            <span>globalminds-education.com</span>
        </div>
        <div className={s.screen}>{children}</div>
    </div>
);

export default function GlobalMindsCaseStudy() {
    const { hero, chapters, brief, itinerary, changes, foundations, kit, destinations, firstScreen, flight, layovers, phone, details, result, closing } = GME;

    return (
        <main id="main" className={`${s.page} ${inter.variable} ${mono.variable}`} data-gme>
            <PageSchema
                path={GME.path}
                title={TITLE}
                description={DESCRIPTION}
                crumbs={CRUMBS}
                extra={[
                    {
                        "@type": "Article",
                        "@id": `${absoluteUrl(GME.path)}#article`,
                        headline: `${hero.title.join(" ")} ${hero.titleFor}`,
                        description: DESCRIPTION,
                        image: [absoluteUrl(GME.og.src), absoluteUrl(hero.desktop.src)],
                        datePublished: GME.published,
                        dateModified: GME.published,
                        author: {
                            "@type": "Person",
                            name: hero.byline.name,
                            jobTitle: hero.byline.role,
                            url: absoluteUrl("/team"),
                            worksFor: { "@id": `${SITE.url}/#organization` }
                        },
                        publisher: { "@id": `${SITE.url}/#organization` },
                        about: { "@type": "Organization", name: GME.client },
                        mainEntityOfPage: { "@id": `${absoluteUrl(GME.path)}#webpage` },
                        inLanguage: "en"
                    }
                ]}
            />

            {/* ───────────── Cover ───────────── */}
            <section className={`${s.band} ${s.hero}`} data-ground="navy">
                <Pinwheel className={s.heroWheel} />
                <div className={s.wrap}>
                    <div className={s.metaBar}>
                        <nav aria-label="Breadcrumb">
                            <ol className={s.crumbs}>
                                <li>
                                    <Link href="/#work">Work</Link>
                                </li>
                                <li aria-current="page">{GME.client}</li>
                            </ol>
                        </nav>
                        <p>{hero.meta[1]}</p>
                        <p>{hero.meta[2]}</p>
                    </div>

                    <div className={s.coverGrid}>
                        <div className={s.coverCopy}>
                            <h1 className={s.title}>
                                <span className={s.titleWords}>
                                    {hero.title.map((line, i) => (
                                        <span key={line} className={s.titleMask}>
                                            <span style={{ "--w": i } as React.CSSProperties}>{line}</span>
                                        </span>
                                    ))}
                                </span>{" "}
                                <span className={s.titleFor}>{hero.titleFor}</span>
                            </h1>
                            <p className={s.intro}>{hero.intro}</p>
                            <p className={s.byline}>
                                Design and art direction by <Link href="/team">{hero.byline.name}</Link>, {hero.byline.role}.{" "}
                                <time dateTime={GME.published}>Published {hero.byline.date}</time>
                            </p>
                            <p className={s.cue}>
                                {hero.cue} <span aria-hidden="true">↓</span>
                            </p>
                        </div>

                        <div className={s.stage}>
                            <Browser className={s.heroBrowser}>
                                <Image src={hero.desktop.src} alt={hero.desktop.alt} width={hero.desktop.width} height={hero.desktop.height} sizes="(max-width: 991px) 92vw, 46vw" priority />
                            </Browser>
                            <div className={s.pass} data-intro>
                                <div className={s.passMain}>
                                    <p className={s.passHead}>
                                        <span>Global Minds Education</span>
                                        <span>Boarding pass</span>
                                    </p>
                                    <p className={s.route}>
                                        <span>
                                            <b>DXB</b>
                                            <small>Dubai · Lahore</small>
                                        </span>
                                        <i aria-hidden="true" />
                                        <span>
                                            <b>LON</b>
                                            <small>London · Geneva</small>
                                        </span>
                                    </p>
                                    <dl className={s.passFields}>
                                        {hero.pass.map((f) => (
                                            <div key={f.label}>
                                                <dt>{f.label}</dt>
                                                <dd>{f.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                                <div className={s.passStub} aria-hidden="true">
                                    <small>Admit one</small>
                                    <b>GME</b>
                                    <span className={s.barcode} />
                                    <small>Seat · anywhere</small>
                                </div>
                            </div>
                            <div className={s.heroPhone} data-intro>
                                <Image src={hero.mobile.src} alt={hero.mobile.alt} width={hero.mobile.width} height={hero.mobile.height} sizes="(max-width: 991px) 30vw, 13vw" />
                            </div>
                            <Stamp top="Approved" code="UK" bottom="Online degree" colour="#FFA133" className={s.heroStamp} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────── 01 · Brief ───────────── */}
            <section className={s.band} data-ground="cream" data-chapter="0">
                <div className={s.wrap}>
                    <ChapterHead no={brief.no} label={brief.label} title={brief.title} body={brief.body} />
                    <div className={s.briefGrid}>
                        <dl className={s.facts} data-rise>
                            {brief.facts.map((f) => (
                                <div key={f.label}>
                                    <dt>{f.label}</dt>
                                    <dd>{f.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <ul className={s.stats} data-rise-group>
                            {brief.stats.map((st) => (
                                <li key={st.label} data-rise-item>
                                    <b data-count={st.value}>{st.value}</b>
                                    <span>{st.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ───────────── 02 · Itinerary ───────────── */}
            <section className={s.band} data-ground="white" data-chapter="1">
                <div className={s.wrap}>
                    <ChapterHead no={itinerary.no} label={itinerary.label} title={itinerary.title} body={itinerary.body} />
                    <ol className={s.legs} data-rise-group>
                        {itinerary.legs.map((leg, i) => (
                            <li key={leg.code} data-rise-item>
                                <span className={s.legNo}>{String(i + 1).padStart(2, "0")}</span>
                                <b className={s.legCode}>{leg.code}</b>
                                <span className={s.legStep}>{leg.step}</span>
                                <p>{leg.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ───────────── 03 · What changed ───────────── */}
            <section className={s.band} data-ground="cream" data-chapter="2">
                <div className={s.wrap}>
                    <ChapterHead no={changes.no} label={changes.label} title={changes.title} />
                    <ol className={s.changes} data-rise-group>
                        {changes.items.map((item) => (
                            <li key={item.title} data-rise-item>
                                <Petal colour={PETAL[item.petal]} className={s.changePetal} />
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ───────────── 04 · Foundations ───────────── */}
            <section className={s.band} data-ground="navy" data-chapter="3">
                <div className={s.wrap}>
                    <ChapterHead no={foundations.no} label={foundations.label} title={foundations.title} body={foundations.body} />
                    <div className={s.foundGrid}>
                        <div className={s.wheelStage}>
                            <Pinwheel className={s.bigWheel} />
                        </div>
                        <ul className={s.tags} data-rise-group>
                            {foundations.tags.map((t) => (
                                <li key={t.name} data-rise-item>
                                    <span className={s.tagHead}>
                                        <span>{t.role}</span>
                                        <i aria-hidden="true" />
                                    </span>
                                    <span className={s.swatch} style={{ background: t.hex }} />
                                    <b>{t.name}</b>
                                    <code>{t.hex}</code>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ul className={s.typeCards} data-rise-group>
                        {foundations.type.map((t, i) => (
                            <li key={t.family} data-rise-item>
                                <span className={i ? s.sampleMono : s.sampleSans} aria-hidden="true">
                                    {t.sample}
                                </span>
                                <span>
                                    <b>{t.family}</b>
                                    <small>{t.role}</small>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ───────────── 05 · Boarding kit ───────────── */}
            <section className={s.band} data-ground="cream" data-chapter="4">
                <div className={s.wrap}>
                    <ChapterHead no={kit.no} label={kit.label} title={kit.title} body={kit.body} />
                    <div className={s.kit}>
                        <figure data-rise>
                            <Image src={kit.images[0].src} alt={kit.images[0].alt} width={1600} height={584} sizes="(max-width: 991px) 92vw, 84vw" />
                        </figure>
                        <figure data-rise>
                            <Image src={kit.images[1].src} alt={kit.images[1].alt} width={1600} height={431} sizes="(max-width: 991px) 92vw, 84vw" />
                        </figure>
                    </div>
                </div>
            </section>

            {/* ───────────── 06 · Destinations ───────────── */}
            <section className={`${s.band} ${s.wallBand}`} data-ground="night" data-chapter="5">
                <div className={s.wrap}>
                    <ChapterHead no={destinations.no} label={destinations.label} title={destinations.title} body={destinations.body} />
                </div>
                <ul className={s.wall} tabIndex={0} aria-label="All seven Global Minds Education pages">
                    {destinations.pages.map((p, i) => (
                        <li key={p.code}>
                            <figure>
                                <div className={s.wallPage}>
                                    <Image src={`${IMG}/gme-page-${p.file}-desktop-full.webp`} alt={`Global Minds Education ${p.label} page, full length on desktop`} width={432} height={WALL[p.file]} sizes="(max-width: 767px) 46vw, 13vw" />
                                </div>
                                <figcaption>
                                    <Stamp top={`Gate ${String(i + 1).padStart(2, "0")}`} code={p.code} bottom={p.label} colour={PETALS[i]} className={s.wallStamp} />
                                    <span>{p.label}</span>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
                <div className={s.wrap}>
                    <p className={s.swipeHint} aria-hidden="true">
                        {destinations.hint} →
                    </p>
                </div>
            </section>

            {/* ───────────── 07 · First screen ───────────── */}
            <section className={s.band} data-ground="white" data-chapter="6">
                <div className={s.wrap}>
                    <ChapterHead no={firstScreen.no} label={firstScreen.label} title={firstScreen.title} />
                    <div className={s.pinStage} data-rise>
                        <Browser>
                            <Image src={hero.desktop.src} alt={hero.desktop.alt} width={hero.desktop.width} height={hero.desktop.height} sizes="(max-width: 991px) 92vw, 84vw" />
                        </Browser>
                        {firstScreen.notes.map((n) => (
                            <span key={n.pin} className={s.pin} style={{ "--x": `${n.x}%`, "--y": `${n.y}%` } as React.CSSProperties} aria-hidden="true" data-stamp>
                                {n.pin}
                            </span>
                        ))}
                    </div>
                    <ol className={s.notes} data-rise-group>
                        {firstScreen.notes.map((n) => (
                            <li key={n.pin} data-rise-item>
                                <span aria-hidden="true">{n.pin}</span>
                                <p>{n.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ───────────── 08 · Flight path ───────────── */}
            <section className={s.band} data-ground="cream" data-chapter="7">
                <div className={s.wrap}>
                    <ChapterHead no={flight.no} label={flight.label} title={flight.title} />
                    <ol className={s.path}>
                        {flight.steps.map((st, i) => (
                            <li key={st.code} data-rise>
                                <Browser className={s.pathBrowser}>
                                    <Image src={st.src} alt={st.alt} width={1440} height={i === 1 ? 700 : 1000} sizes="(max-width: 991px) 92vw, 30vw" />
                                </Browser>
                                <div className={s.pathCap}>
                                    <Stamp top="Step" code={st.code} bottom={st.step} colour="#FF6800" className={s.pathStamp} />
                                    <span>
                                        <b>{st.step}</b>
                                        <small>{st.text}</small>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ───────────── 09 · Layovers ───────────── */}
            <section className={s.band} data-ground="sun" data-chapter="8">
                <div className={s.wrap}>
                    <ChapterHead no={layovers.no} label={layovers.label} title={layovers.title} />
                    <p className={s.sizes} data-rise>
                        {layovers.sizes}
                    </p>
                    <div className={s.trio} data-rise>
                        <Browser className={s.trioBrowser}>
                            <Image src={layovers.desktop.src} alt={layovers.desktop.alt} width={1080} height={1300} sizes="(max-width: 991px) 70vw, 54vw" />
                        </Browser>
                        <div className={s.trioIpad}>
                            <Image src={layovers.ipad.src} alt={layovers.ipad.alt} width={768} height={1040} sizes="(max-width: 991px) 36vw, 22vw" />
                        </div>
                        <div className={s.trioPhone}>
                            <Image src={phone.phones[0].src} alt={phone.phones[0].alt} width={660} height={1400} sizes="(max-width: 991px) 22vw, 12vw" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────── 10 · On the phone ───────────── */}
            <section className={`${s.band} ${s.phoneBand}`} data-ground="navy" data-chapter="9">
                <div className={s.wrap}>
                    <ChapterHead no={phone.no} label={phone.label} title={phone.title} />
                </div>
                <ul className={s.phones} tabIndex={0} aria-label="Global Minds Education mobile screens">
                    {phone.phones.map((p, i) => (
                        <li key={p.label} data-float={[0.8, -0.5, 1, -0.7, 0.6][i]}>
                            <figure>
                                <div className={s.phoneFrame}>
                                    <Image src={p.src} alt={p.alt} width={660} height={1400} sizes="(max-width: 767px) 62vw, 17vw" />
                                </div>
                                <figcaption>{p.label}</figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
                <div className={s.wrap}>
                    <p className={s.swipeHint} aria-hidden="true">
                        {phone.hint} →
                    </p>
                </div>
            </section>

            {/* ───────────── 11 · Details ───────────── */}
            <section className={s.band} data-ground="white" data-chapter="10">
                <div className={s.wrap}>
                    <ChapterHead no={details.no} label={details.label} title={details.title} />
                    <ul className={s.details} data-rise-group>
                        {details.crops.map((c) => (
                            <li key={c.src} data-rise-item>
                                <figure>
                                    <div className={s.crop}>
                                        <Image src={c.src} alt={c.alt} width={1440} height={880} sizes="(max-width: 767px) 92vw, 42vw" />
                                    </div>
                                    <figcaption>
                                        <Petal colour={PETAL[c.petal]} />
                                        {c.caption}
                                    </figcaption>
                                </figure>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ───────────── What we delivered ───────────── */}
            <section className={s.band} data-ground="cream">
                <div className={s.wrap}>
                    <header className={s.chapterHead}>
                        <div>
                            <p className={s.chapterNo} data-rise>
                                <i aria-hidden="true" />
                                {result.label}
                            </p>
                            <h2 className={s.chapterTitle} data-rise>
                                {accent(result.title)}
                            </h2>
                        </div>
                    </header>
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

            {/* ───────────── Arrived ───────────── */}
            <section className={`${s.band} ${s.closing}`} data-ground="navy">
                <div className={s.wrap}>
                    <Pinwheel className={s.closingWheel} />
                    <p className={s.arrived} aria-hidden="true">
                        Arrived.
                    </p>
                    <h2 className={s.closingTitle} data-rise>
                        {accent(closing.title)}
                    </h2>
                    <div className={s.closingActions} data-rise>
                        <a className={s.button} {...bookingLinkProps("case-study-global-minds")}>
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
                </div>
            </section>

            {/* ───────────── Next case study ───────────── */}
            <section className={`${s.band} ${s.next}`} data-ground="night">
                <div className={s.wrap}>
                    <NextCaseStudy related={relatedCaseStudies(GME.slug)} classes={{ link: s.nextLink, label: s.nextLabel, title: s.nextTitle, meta: s.nextMeta, tags: s.nextTags, tag: s.nextTag, thumb: s.nextThumb, icon: s.nextIcon }} />
                </div>
            </section>

            {/* The flight rail: DXB to LON on the right edge. The petal plane moves
                with reading progress and each chapter stamps its tick. Last in
                <main> so it paints over every band. Decorative. */}
            <div className={s.rail} aria-hidden="true">
                <b>DXB</b>
                <span className={s.railTrack}>
                    <span className={s.railFill} data-rail-fill />
                    {chapters.map((c, i) => (
                        <i key={c} className={s.railTick} style={{ "--t": `${(i + 0.5) / chapters.length}` } as React.CSSProperties} />
                    ))}
                    <span className={s.railPlane} data-rail-plane />
                </span>
                <b>LON</b>
            </div>
            <span className={s.railLine} data-rail-line aria-hidden="true" />

            <GmeMotion />
        </main>
    );
}

import Image from "next/image";
import Link from "next/link";
import RevealChildren from "@/app/Components/RevealChildren/RevealChildren";
import { ctaGlow } from "@/app/lib/ctaGlow";
import { bookingLinkProps } from "@/app/lib/booking";
import { SITE } from "@/app/data/site";
import FooterGlow from "./FooterGlow";
import style from "./index.module.scss";

// 13 · CTA (143:1453) + 14 · Footer (143:1461)
//
// Figma draws these as two frames, but the footer columns live inside the CTA
// frame and both share the same 120px gutter and 54px rhythm, so they are one
// component here: closing line → Book a call → columns → rule → bottom bar →
// wordmark.
//
// The wordmark is set in MohoStdCondensed-Bold at 493px with a gradient fill.
// That face is not licensed in this project, so it ships as the exported PNG
// rather than as text in a substituted font.
//
// Server component, passed into Wrapper by the root layout. Client islands:
// FooterGlow (the cursor-reactive colour field) and the wordmark's reveal. The
// columns link to the inner pages — the site-wide internal links search
// engines follow; "/#work" is a home-page anchor, which Wrapper's delegated
// handler smooth-scrolls past the fixed header.

const EXPLORE = [
    { label: "Design subscription", href: "/design-subscription" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Process", href: "/process" },
    { label: "FAQ", href: "/faq" }
];

const COMPANY = [
    { label: "The team", href: "/team" },
    { label: "Case studies", href: "/#work" }
];

// Profiles come from app/data/site.ts. Until a URL is set the label renders as
// plain text styled like a link — visible, but not a link Google would flag.
const SOCIAL = [
    { label: "X / Twitter", href: SITE.social.x },
    { label: "LinkedIn", href: SITE.social.linkedin },
    { label: "Instagram", href: SITE.social.instagram }
];

const PhoneIcon = () => (
    <svg className={style.phoneIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
            d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
            fill="currentColor"
        />
    </svg>
);

const linkList = (items: { label: string; href: string }[]) =>
    items.map((item) => (
        <li key={item.label}>
            <Link href={item.href}>{item.label}</Link>
        </li>
    ));

// The wordmark rises the last stretch as the footer comes into view — the one
// piece of motion down here, so it lands rather than just appearing.
const Footer = () => (
    // Dark island in both themes: the footer is the closing dark band, and the
    // wordmark and glow are drawn for it.
    <footer className={style.footer} data-theme="dark">
        <FooterGlow />

        <div className={style.inner}>
            {/* 13 · CTA */}
            {/* Grouped so the 54px rhythm of .inner falls between the block
                and the button, not between the heading and its own strapline. */}
            <div className={style.ctaBlock}>
                <h2 className={style.ctaTitle}>Tell us what you&rsquo;re building.</h2>
                <p className={style.ctaSub}>
                    We&rsquo;ll help you map the right scope, team, timeline, and next steps.
                </p>
            </div>

            <a className={style.cta} {...bookingLinkProps("footer")} {...ctaGlow}>
                <PhoneIcon />
                <span className={style.ctaLabel}>Book a call</span>
            </a>

            {/* Columns */}
            <div className={style.columns}>
                <div className={style.brand}>
                    <p className={style.brandName}>Yourmomstudio</p>
                    <p className={style.brandCopy}>
                        A full product team on one monthly subscription. Design, engineering and QA — from first
                        sketch to launch day.
                    </p>
                </div>

                <nav className={style.column} aria-label="Explore">
                    <p className={style.columnHead}>Explore</p>
                    <ul>{linkList(EXPLORE)}</ul>
                </nav>

                <nav className={style.column} aria-label="Company">
                    <p className={style.columnHead}>Company</p>
                    <ul>{linkList(COMPANY)}</ul>
                </nav>

                <div className={style.column}>
                    <p className={style.columnHead}>Connect</p>
                    <ul>
                        {SOCIAL.map((item) => (
                            <li key={item.label}>
                                {item.href ? (
                                    <a href={item.href} target="_blank" rel="me noopener">
                                        {item.label}
                                    </a>
                                ) : (
                                    <span className={style.pending}>
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ))}
                        <li>
                            <a className={style.email} href={`mailto:${SITE.email}`}>
                                {SITE.email}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* 14 · Footer */}
            <hr className={style.rule} />

            <div className={style.bottomBar}>
                <p className={style.copyright}>© 2026 Yourmomstudio. All rights reserved.</p>
                <p className={style.availability}>
                    <span className={style.dot} aria-hidden="true" />
                    Now accepting projects for 2026
                </p>
            </div>
        </div>

        <RevealChildren className={style.wordmarkReveal} inViewClass={style.inView} threshold={0.15} rootMargin="0px">
            <div className={style.wordmark}>
                {/* `unoptimized` on purpose. Next's optimiser quantises this PNG
                    to an 11-colour palette with a 2-entry tRNS, which crushes the
                    soft alpha on the glyph edges into opaque dark pixels — a black
                    halo round every letter, and the footer glow blocked behind it.
                    Served as-is the alpha survives intact. */}
                <Image
                    src="/assets/images/footer-wordmark.png"
                    alt="YourMomStudio"
                    width={3548}
                    height={747}
                    sizes="100vw"
                    unoptimized
                    priority={false}
                />
            </div>
        </RevealChildren>
    </footer>
);

export default Footer;

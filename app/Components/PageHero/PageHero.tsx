import Link from "next/link";
import { bookingLinkProps } from "@/app/lib/booking";
import { ctaGlow } from "@/app/lib/ctaGlow";
import type { Crumb } from "@/app/Components/Seo/PageSchema";
import style from "./index.module.scss";

// Opening block of every inner page (/services, /pricing, /process, …): a
// visible breadcrumb trail (mirrored in the page's BreadcrumbList schema), the
// page's one <h1>, a lead paragraph and the calls to action.
//
// Server component. "Book a call" goes through bookingLinkProps like every
// other CTA, so the booking modal and the data-cta analytics hook both apply.

interface PageHeroProps {
    eyebrow: string;
    title: string;
    lead: string;
    /** Trail after "Home", ending with this page (rendered without a link). */
    crumbs: Crumb[];
    /** data-cta placement: book-call-<placement>. */
    placement: string;
    secondary?: { label: string; href: string };
}

const PhoneIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
            d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
            fill="currentColor"
        />
    </svg>
);

const PageHero = ({ eyebrow, title, lead, crumbs, placement, secondary }: PageHeroProps) => {
    const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

    return (
        <section className={style.hero}>
            <div className={style.inner}>
                <nav aria-label="Breadcrumb">
                    <ol className={style.crumbs}>
                        {trail.map((crumb, index) =>
                            index === trail.length - 1 ? (
                                <li key={crumb.path} aria-current="page">
                                    {crumb.name}
                                </li>
                            ) : (
                                <li key={crumb.path}>
                                    <Link href={crumb.path}>{crumb.name}</Link>
                                </li>
                            )
                        )}
                    </ol>
                </nav>

                <p className={style.eyebrow}>{eyebrow}</p>
                <h1 className={style.title}>{title}</h1>
                <p className={style.lead}>{lead}</p>

                <div className={style.actions}>
                    <a className={style.cta} {...bookingLinkProps(placement)} {...ctaGlow}>
                        <PhoneIcon />
                        <span>Book a call</span>
                    </a>
                    {secondary && (
                        <Link className={style.secondary} href={secondary.href}>
                            {secondary.label}
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PageHero;

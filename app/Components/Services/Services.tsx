import Link from "next/link";
import { SERVICES, serviceHref } from "@/app/data/services";
import { bookingLinkProps } from "@/app/lib/booking";
import { ctaGlow } from "@/app/lib/ctaGlow";
import ServiceTabs, { ServiceReel } from "./ServiceTabs";
import style from "./index.module.scss";

// 05 · Services we offer.
//
// A warm brand band holds a row of service icons; the active one opens a large
// card below it: the service name and badge, an H3 headline that carries the
// service keyword, a one-sentence summary, three "what you get" chips, a link
// to the service's own page and a call to action that names the service (so
// ads can attribute the lead: book-call-services-<slug>). The service's reel
// plays on the right.
//
// Server component: every card is rendered here and handed to ServiceTabs.tsx,
// which only tracks which one is showing.

const PhoneIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
            d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
            fill="currentColor"
        />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3.5 8.4 6.5 11.2 12.5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// One line icon per service (24 × 24, drawn to read at 20 px).
const p = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
const ICONS: Record<string, React.ReactNode> = {
    "product-design": (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path {...p} d="M4 20l3.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
            <path {...p} d="M13 7l3 3" />
        </svg>
    ),
    websites: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect {...p} x="3" y="4.5" width="18" height="15" rx="2.5" />
            <path {...p} d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
        </svg>
    ),
    "mobile-app": (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect {...p} x="6.5" y="2.5" width="11" height="19" rx="2.6" />
            <path {...p} d="M10.5 18.5h3" />
        </svg>
    ),
    "saas-products": (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect {...p} x="3" y="3.5" width="18" height="17" rx="2.5" />
            <path {...p} d="M7.5 16v-3M12 16V9M16.5 16v-5" />
        </svg>
    ),
    "web-management-system": (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect {...p} x="3.5" y="3.5" width="7" height="7" rx="1.6" />
            <rect {...p} x="13.5" y="3.5" width="7" height="7" rx="1.6" />
            <rect {...p} x="3.5" y="13.5" width="7" height="7" rx="1.6" />
            <path {...p} d="M17 14v6M14 17h6" />
        </svg>
    ),
    "game-design": (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path {...p} d="M7 7h10a4.5 4.5 0 0 1 4.3 5.8l-1 3.4a2.6 2.6 0 0 1-4.6.8L14.5 15h-5l-1.2 2a2.6 2.6 0 0 1-4.6-.8l-1-3.4A4.5 4.5 0 0 1 7 7Z" />
            <path {...p} d="M8 10v3M6.5 11.5h3M15.5 11h.01M17.5 12.5h.01" />
        </svg>
    ),
    "brand-identity": (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path {...p} d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z" />
            <path {...p} d="M18.5 15.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9Z" />
        </svg>
    )
};

const Services = () => (
    <section id="services" className={style.section} aria-labelledby="services-title">
        <header className={style.head}>
            <div className={style.headMain}>
                <p className={style.eyebrow}>Expertise &amp; capabilities</p>
                <h2 id="services-title" className={style.title}>
                    Services we offer
                </h2>
            </div>
        </header>

        <ServiceTabs
            items={SERVICES.map((service) => ({
                slug: service.slug,
                title: service.title,
                icon: ICONS[service.slug],
                panel: (
                    <div className={style.cardInner}>
                        <div className={style.copy}>
                            <p className={style.kicker}>
                                <span className={style.kickerIcon}>{ICONS[service.slug]}</span>
                                {service.title}
                                {service.label && <span className={style.badge}>{service.label}</span>}
                            </p>
                            <h3 className={style.headline}>{service.headline}</h3>
                            <p className={style.summary}>{service.summary}</p>
                            <ul className={style.chips} aria-label={`What you get with ${service.title.toLowerCase()}`}>
                                {service.tags.slice(0, 3).map((tag) => (
                                    <li key={tag}>
                                        <CheckIcon />
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                            <div className={style.actions}>
                                <Link className={style.learn} href={serviceHref(service)}>
                                    Learn more<span className="sr-only"> about {service.title.toLowerCase()}</span>
                                    <ArrowIcon />
                                </Link>
                                <a className={style.cta} {...bookingLinkProps(`services-${service.slug}`)} {...ctaGlow}>
                                    <PhoneIcon />
                                    <span>Book a call</span>
                                </a>
                            </div>
                        </div>
                        <div className={style.media}>
                            {service.video && (
                                <ServiceReel
                                    src={service.video.src}
                                    poster={service.video.poster}
                                    alt={`${service.title} work by YourMomStudio`}
                                />
                            )}
                        </div>
                    </div>
                )
            }))}
        />
    </section>
);

export default Services;

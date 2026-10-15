import Image from "next/image";
import { SERVICES } from "@/app/data/services";
import { bookingLinkProps } from "@/app/lib/booking";
import { ctaGlow } from "@/app/lib/ctaGlow";
import CapabilityExplorer, { ServiceVideo } from "./CapabilityExplorer";
import style from "./index.module.scss";

// 05 · Expertise & Capabilities — the "capability explorer".
//
// Art direction: the reels carry the section. On desktop the services are an
// index on the left and the active one plays large on a showcase stage on the
// right; on phones each service opens as a card. Everything a visitor needs to
// decide is on the stage: what it is, what they get, and a call to action that
// names the service (so ads can attribute the lead: book-call-services-<slug>).
//
// Server component: each stage is rendered here and handed to
// CapabilityExplorer.tsx, which only tracks which service is showing.

const slug = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

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

const Services = () => (
    <section id="services" className={style.section}>
        <header className={style.head}>
            <div className={style.headMain}>
                <p className={style.eyebrow}>Expertise &amp; Capabilities</p>
                <h2 className={style.title}>What we design and build</h2>
            </div>
            <div className={style.headAside}>
                <p className={style.sub}>
                    Bring us in when your idea, product, website, or brand needs to feel sharper, clearer, and ready
                    for what comes next.
                </p>
                <p className={style.meta}>
                    <span className={style.metaCount}>{String(SERVICES.length).padStart(2, "0")}</span>
                    capabilities · one team, from first sketch to launch
                </p>
            </div>
        </header>

        <CapabilityExplorer
            items={SERVICES.map((service, index) => ({
                title: service.title,
                label: service.label,
                panel: (
                    <div className={style.stage}>
                        <div className={style.media}>
                            {service.video ? (
                                <ServiceVideo src={service.video.src} poster={service.video.poster} />
                            ) : (
                                service.image && (
                                    <Image
                                        src={service.image}
                                        alt=""
                                        width={640}
                                        height={440}
                                        sizes="(max-width: 991px) 100vw, 760px"
                                    />
                                )
                            )}
                            <span className={style.mediaTag} aria-hidden="true">
                                {String(index + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                            </span>
                        </div>

                        <div className={style.body}>
                            <p className={style.kicker}>
                                {service.title}
                                {service.label && <span className={style.kickerLabel}>{service.label}</span>}
                            </p>
                            <p className={style.description}>{service.description}</p>

                            <p className={style.whatYouGet}>What you get</p>
                            <ul className={style.tags}>
                                {service.tags.map((tag) => (
                                    <li key={tag} className={style.tag}>
                                        <CheckIcon />
                                        {tag}
                                    </li>
                                ))}
                            </ul>

                            <div className={style.ctaRow}>
                                <a
                                    className={style.cta}
                                    {...bookingLinkProps(`services-${slug(service.title)}`)}
                                    {...ctaGlow}
                                >
                                    <PhoneIcon />
                                    <span>Book a call</span>
                                </a>
                                <span className={style.ctaNote}>about {service.title.toLowerCase()}</span>
                            </div>
                        </div>
                    </div>
                )
            }))}
        />
    </section>
);

export default Services;

import Image from "next/image";
import Link from "next/link";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import { SERVICES, serviceHref, type Service } from "@/app/data/services";
import type { ServicePage } from "@/app/data/servicePages";
import { TESTIMONIALS } from "@/app/data/testimonials";
import { CASE_STUDIES } from "@/app/data/caseStudies";
import { INCLUDES, FIXED_SCOPE_FROM } from "@/app/data/subscription";
import { PRICE_LABEL } from "@/app/data/site";
import { formatUpdated, updatedFor } from "@/app/data/pageDates";
import { bookingLinkProps } from "@/app/lib/booking";
import { ctaGlow } from "@/app/lib/ctaGlow";
import ServiceMotion from "./ServiceMotion";
import HeroReel from "./HeroReel";
import style from "./index.module.scss";

// /services/<slug>: one sprint week of the service (see DESIGN.md).
//
//   hero          service keyword H1, the service's own reel on "staging"
//   what you get  the six deliverables, each with what it actually means
//   the week      the signature: Monday to Friday of this service; scrolling
//                 moves "now" through the week and the reel goes live on Friday
//   bring us in   when this service is the right call
//   proof         the client's own words and/or our case studies, if any
//   price         the subscription and fixed-scope options
//   FAQ           questions only this service answers
//   others        the other six services
//
// Server component: every word is in the HTML. ServiceMotion only adds motion.

const DAY_NAMES: Record<string, string> = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday" };

const PhoneIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
            d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
            fill="currentColor"
        />
    </svg>
);

export const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** Ruled index of services, used for "Other services" here and the /services hub. */
export const ServiceIndex = ({ services, headingLevel = "h3" }: { services: Service[]; headingLevel?: "h2" | "h3" }) => {
    const Heading = headingLevel;
    return (
        <ul className={style.serviceIndex} data-rise-group>
            {services.map((service) => (
                <li key={service.slug} data-rise-item>
                    <Link className={style.serviceRow} href={serviceHref(service)}>
                        <span className={style.serviceThumb} aria-hidden="true">
                            {service.video && <Image src={service.video.poster} alt="" width={240} height={165} sizes="160px" />}
                        </span>
                        <span className={style.serviceText}>
                            <Heading className={style.serviceName}>{service.title}</Heading>
                            {service.label && <span className={style.serviceLabel}>{service.label}</span>}
                            <span className={style.serviceDesc}>{service.seo.description}</span>
                        </span>
                        <span className={style.serviceGo}>
                            <ArrowIcon />
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const ServicePageView = ({ service, page }: { service: Service; page: ServicePage }) => {
    const path = serviceHref(service);
    const updated = updatedFor(path);
    const name = service.title.toLowerCase();
    const testimonial = page.proof?.testimonial ? TESTIMONIALS.find((t) => t.name === page.proof?.testimonial) : undefined;
    const others = SERVICES.filter((other) => other.slug !== service.slug);

    return (
        <div className={style.page} data-service-page>
            {/* ── Hero ── */}
            <section className={style.hero} aria-labelledby="service-title">
                <div className={style.heroInner}>
                    <div className={style.heroCopy}>
                        <nav aria-label="Breadcrumb">
                            <ol className={style.crumbs}>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/services">Services</Link>
                                </li>
                                <li aria-current="page">{service.title}</li>
                            </ol>
                        </nav>
                        <p className={style.eyebrow}>
                            {service.title}
                            {service.label && <span> · {service.label}</span>}
                        </p>
                        <h1 id="service-title" className={style.title}>
                            {service.seo.title}
                        </h1>
                        <p className={style.lead}>{service.description}</p>
                        <div className={style.actions}>
                            <a className={style.cta} {...bookingLinkProps(`service-page-${service.slug}`)} {...ctaGlow}>
                                <PhoneIcon />
                                <span>Book a call</span>
                            </a>
                            <Link className={style.textLink} href="/pricing">
                                See pricing
                                <ArrowIcon />
                            </Link>
                        </div>
                        {updated && (
                            <p className={style.updated}>
                                Updated <time dateTime={updated}>{formatUpdated(updated)}</time>
                            </p>
                        )}
                    </div>

                    {service.video && (
                        <figure className={style.heroMedia}>
                            <div className={style.frame}>
                                <HeroReel src={service.video.src} poster={service.video.poster} alt={`${service.title} work by YourMomStudio`} />
                            </div>
                            <figcaption className={style.chip}>
                                <i aria-hidden="true" />
                                {service.title} work by YourMomStudio
                            </figcaption>
                        </figure>
                    )}
                </div>
            </section>

            {/* ── What you get ── */}
            <section className={style.block} aria-labelledby="get-title">
                <div className={style.indexGrid}>
                    <div className={style.indexHead}>
                        <p className={style.eyebrow}>What you get</p>
                        <h2 id="get-title" className={style.h2}>
                            What&rsquo;s included in {name}
                        </h2>
                    </div>
                    <ul className={style.deliverables} data-rise-group>
                        {page.deliverables.map((item) => (
                            <li key={item.name} data-rise-item>
                                <h3 className={style.deliverableName}>{item.name}</h3>
                                <p className={style.deliverableDetail}>{item.detail}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── The week (signature) ── */}
            <section className={style.week} aria-labelledby="week-title" data-week>
                <div className={style.weekStage} data-week-stage style={{ "--p": 1 } as React.CSSProperties} data-active="4">
                    <div className={style.weekHead}>
                        <p className={style.eyebrow}>One sprint, Monday to Friday</p>
                        <h2 id="week-title" className={style.h2}>
                            A week of {name} with us
                        </h2>
                    </div>

                    <ol className={style.days}>
                        {page.week.map((day, i) => (
                            <li key={day.day} className={style.day} data-day={i}>
                                <span className={style.dayRail} aria-hidden="true">
                                    <span className={style.dayDot} />
                                </span>
                                <span className={style.dayName}>
                                    <abbr title={DAY_NAMES[day.day]}>{day.day}</abbr>
                                </span>
                                <span className={style.dayBody}>
                                    <span className={style.dayTitle}>{day.title}</span>
                                    <span className={style.dayNote}>{day.note}</span>
                                </span>
                            </li>
                        ))}
                    </ol>

                    {service.video && (
                        <div className={style.deploy} aria-hidden="true">
                            <div className={style.deployFrame}>
                                <Image className={style.deployGhost} src={service.video.poster} alt="" width={640} height={440} sizes="(max-width: 991px) 92vw, 46vw" />
                                <Image className={style.deployLive} src={service.video.poster} alt="" width={640} height={440} sizes="(max-width: 991px) 92vw, 46vw" />
                            </div>
                            <p className={style.deployStatus}>
                                <span className={style.statusStaging}>On staging</span>
                                <span className={style.statusLive}>Friday · live demo</span>
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Bring us in when ── */}
            <section className={style.block} aria-labelledby="fit-title">
                <div className={style.fitGrid}>
                    <div className={style.indexHead}>
                        <p className={style.eyebrow}>Is this you?</p>
                        <h2 id="fit-title" className={style.h2}>
                            Bring us in when
                        </h2>
                    </div>
                    <ul className={style.fit} data-rise-group>
                        {page.fit.map((line) => (
                            <li key={line} data-rise-item>
                                {line}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Proof ── */}
            {(testimonial || page.proof?.caseStudies) && (
                <section className={style.block} aria-labelledby="proof-title">
                    <div className={style.proofInner}>
                        <div className={style.indexHead}>
                            <p className={style.eyebrow}>Proof</p>
                            <h2 id="proof-title" className={style.h2}>
                                {testimonial ? "In the client’s words" : "Work we have shipped"}
                            </h2>
                        </div>

                        {testimonial && (
                            <figure className={style.quote} data-rise>
                                <blockquote>
                                    <p>&ldquo;{testimonial.quote}&rdquo;</p>
                                </blockquote>
                                <figcaption className={style.quoteWho}>
                                    <span className={`${style.avatar} ${testimonial.avatarOnWhite ? style.onWhite : ""}`}>
                                        <Image src={testimonial.avatar} alt="" width={52} height={52} />
                                    </span>
                                    <span className={style.whoText}>
                                        <span className={style.whoName}>{testimonial.name}</span>
                                        <span className={style.whoRole}>
                                            {testimonial.role}, {testimonial.company} · {testimonial.location}
                                        </span>
                                    </span>
                                    <span className={style.result}>{testimonial.result}</span>
                                </figcaption>
                            </figure>
                        )}

                        {page.proof?.caseStudies && (
                            <ul className={style.studies} data-rise-group>
                                {CASE_STUDIES.map((study) => (
                                    <li key={study.slug} data-rise-item>
                                        <Link className={style.study} href={study.path}>
                                            <span className={style.studyImg}>
                                                <Image src={study.image} alt={study.imageAlt} width={800} height={550} sizes="(max-width: 767px) 92vw, 25vw" />
                                            </span>
                                            <span className={style.studyClient}>{study.client}</span>
                                            <span className={style.studyCat}>{study.category}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            )}

            {/* ── Price ── */}
            <section className={style.block} aria-labelledby="price-title">
                <div className={style.price} data-rise>
                    <div className={style.priceMain}>
                        <p className={style.eyebrow}>How you pay</p>
                        <h2 id="price-title" className={style.priceFigure}>
                            {PRICE_LABEL}
                            <span>/month</span>
                        </h2>
                        <p className={style.priceText}>
                            {service.title} runs on the same subscription as everything we do: a full product team on a weekly sprint, paused or cancelled any time.
                            Need a one-off instead? Fixed-scope projects start at ${FIXED_SCOPE_FROM.toLocaleString("en-US")}.
                        </p>
                        <Link className={style.textLink} href="/pricing">
                            See pricing and what&rsquo;s included
                            <ArrowIcon />
                        </Link>
                    </div>
                    <ul className={style.includes} aria-label="Included in every subscription">
                        {INCLUDES.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <FAQSection faqs={page.faqs.map((faq) => ({ ...faq, topic: "Process" as const }))} title={`Questions about ${name}`} />

            {/* ── Other services ── */}
            <section className={style.block} aria-labelledby="others-title">
                <div className={style.othersInner}>
                    <div className={style.indexHead}>
                        <p className={style.eyebrow}>Keep exploring</p>
                        <h2 id="others-title" className={style.h2}>
                            Other services
                        </h2>
                    </div>
                    <ServiceIndex services={others} />
                </div>
            </section>

            <ServiceMotion />
        </div>
    );
};

export default ServicePageView;

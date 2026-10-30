import { ctaGlow } from "@/app/lib/ctaGlow";
import { bookingLinkProps } from "@/app/lib/booking";
import { PRICE_LABEL } from "@/app/data/site";
import HologramCard from "./HologramCard";
import style from "./index.module.scss";

// 09 · Pricing — "the receipt".
//
// Art direction: the pitch is a flat price with nothing hidden, so the plan is
// set as a receipt — price at the top, every inclusion as a line item with a
// dotted leader, perforated tear lines with notched edges, and a stamp: "No contracts · pause or cancel anytime". The fixed-scope offer is the
// ticket stub beside it; the weekly loop is a timeline under that; the
// guarantees close the section.
//
// Copy is unchanged from the previous layout. The hologram (pointer sheen +
// slight tilt) on the receipt is HologramCard.tsx, the only client code here.

const INCLUDES = [
    "Product design & UX",
    "Frontend + backend build",
    "QA & testing",
    "Launch & deployment",
    "A dedicated technical PM",
    "Shared Slack channel",
    "Weekly live demo",
    "You own all code & design"
];

const WEEKLY_LOOP = [
    { day: "MON", title: "Sprint kickoff", note: "You set the agenda for the week." },
    { day: "TUE–THU", title: "Design and build", note: "Work ships to staging as it lands." },
    { day: "FRI", title: "Live demo", note: "You review, we plan the next sprint." }
];

const CheckIcon = () => (
    <svg className={style.check} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3.5 8.4 6.5 11.2 12.5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PhoneIcon = () => (
    <svg className={style.phoneIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
            d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
            fill="currentColor"
        />
    </svg>
);

// Rubber stamp: text set on a circle, slowly turning. Decorative — the same
// words are in the receipt copy, so it is hidden from assistive tech.
const Stamp = () => (
    <svg className={style.stamp} viewBox="0 0 120 120" aria-hidden="true">
        <defs>
            <path id="pricing-stamp-ring" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
        </defs>
        <g className={style.stampRing}>
            <text>
                <textPath href="#pricing-stamp-ring" startOffset="0">
                    NO CONTRACTS • PAUSE OR CANCEL ANYTIME •
                </textPath>
            </text>
        </g>
        <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
        <path
            d="M63.5 44 52 63h8l-3.5 13L68 57h-8l3.5-13Z"
            fill="currentColor"
        />
    </svg>
);

const GUARANTEES = [
    {
        label: "You own all code & design",
        path: (
            <>
                <path
                    d="M16.6667 10.8333C16.6667 15 13.75 17.0833 10.2833 18.2917C10.1018 18.3532 9.90461 18.3502 9.725 18.2833C6.25 17.0833 3.33333 15 3.33333 10.8333V5C3.33333 4.77899 3.42113 4.56703 3.57741 4.41074C3.7337 4.25446 3.94566 4.16667 4.16667 4.16667C5.83333 4.16667 7.91667 3.16667 9.36667 1.9C9.54305 1.74921 9.76755 1.66636 9.99967 1.66636C10.2318 1.66636 10.4563 1.74921 10.6327 1.9C12.0908 3.17533 14.1667 4.16667 15.8333 4.16667C16.0543 4.16667 16.2663 4.25446 16.4226 4.41074C16.5789 4.56703 16.6667 4.77899 16.6667 5V10.8333Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.5 10L9.16667 11.6667L12.5 8.33333"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </>
        )
    },
    {
        label: "A live demo every Friday",
        path: (
            <>
                <path d="M6.66667 1.66667V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M13.3333 1.66667V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path
                    d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07953 2.5 5V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5C17.5 4.07953 16.7538 3.33333 15.8333 3.33333Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <path d="M2.5 8.33333H17.5" stroke="currentColor" strokeWidth="1.5" />
            </>
        )
    },
    {
        label: "Pause or cancel any time",
        path: (
            <path
                d="M3.33333 11.6667C3.17564 11.6672 3.02103 11.623 2.88746 11.5391C2.7539 11.4553 2.64686 11.3353 2.57879 11.193C2.51072 11.0508 2.48441 10.8922 2.50292 10.7355C2.52142 10.5789 2.58398 10.4308 2.68333 10.3083L10.9333 1.80833C10.9952 1.7369 11.0795 1.68863 11.1725 1.67144C11.2654 1.65426 11.3614 1.66918 11.4448 1.71375C11.5281 1.75833 11.5938 1.82991 11.6311 1.91676C11.6684 2.0036 11.6751 2.10054 11.65 2.19167L10.05 7.20833C10.0028 7.3346 9.98698 7.47043 10.0038 7.60417C10.0207 7.73791 10.0697 7.86557 10.1467 7.97619C10.2238 8.08681 10.3265 8.1771 10.4461 8.2393C10.5656 8.3015 10.6985 8.33377 10.8333 8.33333H16.6667C16.8244 8.3328 16.979 8.37701 17.1125 8.46085C17.2461 8.54469 17.3531 8.6647 17.4212 8.80695C17.4893 8.9492 17.5156 9.10784 17.4971 9.26445C17.4786 9.42106 17.416 9.5692 17.3167 9.69167L9.06667 18.1917C9.00478 18.2631 8.92045 18.3114 8.82752 18.3286C8.73458 18.3457 8.63856 18.3308 8.55522 18.2862C8.47189 18.2417 8.40618 18.1701 8.36889 18.0832C8.3316 17.9964 8.32494 17.8995 8.35 17.8083L9.95 12.7917C9.99718 12.6654 10.013 12.5296 9.99617 12.3958C9.97932 12.2621 9.93028 12.1344 9.85326 12.0238C9.77623 11.9132 9.67352 11.8229 9.55394 11.7607C9.43435 11.6985 9.30146 11.6662 9.16667 11.6667H3.33333Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        )
    },
    {
        label: "No hiring, no overhead",
        path: (
            <>
                <path
                    d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.8841 12.5 10 12.5H5C4.11595 12.5 3.2681 12.8512 2.64298 13.4763C2.01786 14.1014 1.66667 14.9493 1.66667 15.8333V17.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.5 9.16667C9.34095 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34095 2.5 7.5 2.5C5.65905 2.5 4.16667 3.99238 4.16667 5.83333C4.16667 7.67428 5.65905 9.16667 7.5 9.16667Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18.3333 17.5V15.8333C18.3328 15.0948 18.0869 14.3773 17.6345 13.7936C17.1821 13.2099 16.5484 12.793 15.8333 12.6083"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M13.3333 2.60833C14.0503 2.79192 14.686 3.20892 15.1397 3.79359C15.5935 4.37827 15.8398 5.09736 15.8398 5.8375C15.8398 6.57764 15.5935 7.29673 15.1397 7.88141C14.686 8.46608 14.0503 8.88308 13.3333 9.06667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </>
        )
    }
];

const Package = () => (
    <section id="pricing" className={style.section}>
        <header className={style.head}>
            <span className={style.eyebrow}>
                <span className={style.dot} aria-hidden="true" />
                Subscription
            </span>
            <h2 className={style.title}>One subscription. Your entire design and dev team.</h2>
            <p className={style.sub}>
                Skip the hiring cycle. Designers, developers, QA and a technical PM — all on your product, every week.
            </p>
        </header>

        <div className={style.plans}>
            {/* The receipt — main subscription, hologram surface */}
            <HologramCard className={style.receipt}>
                <span className={style.sheen} aria-hidden="true" />
                <Stamp />

                <div className={style.receiptTop}>
                    <span className={style.badge}>Flat monthly · no scoping, no quotes</span>
                    <h3 className={style.planName}>Product subscription</h3>
                    <p className={style.price}>
                        <span className={style.amount}>{PRICE_LABEL}</span>
                        <span className={style.period}>/ month</span>
                    </p>
                    <p className={style.note}>Pause or cancel any time. No contracts, no scoping calls, no change orders.</p>
                </div>

                <div className={style.perf} aria-hidden="true" />

                <div className={style.lines}>
                    <p className={style.linesHead}>
                        <span>What&rsquo;s included</span>
                        <span>{INCLUDES.length} items</span>
                    </p>
                    <ul className={style.lineList}>
                        {INCLUDES.map((item, index) => (
                            <li key={item} className={style.line} style={{ "--i": index } as React.CSSProperties}>
                                <span className={style.lineText}>{item}</span>
                                <span className={style.leader} aria-hidden="true" />
                                <CheckIcon />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={style.perf} aria-hidden="true" />

                <div className={style.receiptFoot}>
                    <div className={style.ctas}>
                        <a className={style.primaryCta} {...bookingLinkProps("pricing")} {...ctaGlow}>
                            <PhoneIcon />
                            <span>Book a call</span>
                        </a>
                    </div>
                </div>
            </HologramCard>

            <div className={style.side}>
                {/* The stub — fixed-scope offer */}
                <div className={style.stub}>
                    <div className={style.stubMain}>
                        <p className={style.stubLabel}>Prefer fixed scope?</p>
                        <p className={style.stubTitle}>Website design &amp; build</p>
                        <p className={style.stubNote}>A one-off project at a fixed price — same team, same process.</p>
                    </div>
                    <div className={style.stubFoot}>
                        <p className={style.stubPrice}>
                            <span className={style.stubAmount}>From $1,299</span>
                            <span className={style.stubPeriod}>one-off</span>
                        </p>
                        <a className={style.stubLink} href="#services" data-cta="pricing-website-included">
                            <span>See what&rsquo;s included</span>
                            <ArrowIcon />
                        </a>
                    </div>
                </div>

                {/* The weekly loop — a timeline */}
                <div className={style.loop}>
                    <p className={style.loopHead}>
                        <svg className={style.clockIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                                d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
                                stroke="currentColor"
                                strokeWidth="1.4"
                            />
                            <path d="M8 4V8L10.6667 9.33333" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        The weekly loop
                    </p>
                    <ol className={style.loopList}>
                        {WEEKLY_LOOP.map((row) => (
                            <li key={row.day} className={style.loopRow}>
                                <span className={style.loopNode} aria-hidden="true" />
                                <span className={style.day}>{row.day}</span>
                                <span className={style.loopBody}>
                                    <span className={style.loopTitle}>{row.title}</span>
                                    <span className={style.loopNote}>{row.note}</span>
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>

        <ul className={style.guarantees}>
            {GUARANTEES.map((item) => (
                <li key={item.label} className={style.guarantee}>
                    <svg className={style.guaranteeIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        {item.path}
                    </svg>
                    <span>{item.label}</span>
                </li>
            ))}
        </ul>
    </section>
);

export default Package;

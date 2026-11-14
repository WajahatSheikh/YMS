import Link from "next/link";
import PageHero from "@/app/Components/PageHero/PageHero";
import { CompareTable } from "@/app/Components/PageBlocks/PageBlocks";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import ServiceMotion from "@/app/Components/ServicePage/ServiceMotion";
import { ArrowIcon } from "@/app/Components/ServicePage/ServicePage";
import { FIXED_SCOPE_FROM } from "@/app/data/subscription";
import { PRICE_LABEL, SITE } from "@/app/data/site";
import { bookingLinkProps } from "@/app/lib/booking";
import { pageMetadata } from "@/app/lib/seo";
import svc from "@/app/Components/ServicePage/index.module.scss";
import style from "./compare.module.scss";

// /compare/designme-alternative: an honest, dated comparison with DesignMe, a
// design and development subscription founders also look at.
//
// Every DesignMe fact comes from DesignMe's own pages and is dated (CHECKED);
// re-check them every quarter and when their pricing changes, and remove any
// line that can no longer be sourced. Their strengths are stated as plainly as
// ours: a comparison that only flatters us is not believed by people or Google.

const PATH = "/compare/designme-alternative";
const TITLE = "DesignMe alternative: YourMomStudio vs DesignMe";
const DESCRIPTION =
    "DesignMe vs YourMomStudio: a full product team for $3,999 or $10,000 a month. Team, cadence, scope and price compared side by side, with sources.";
const CRUMBS = [{ name: "YourMomStudio vs DesignMe", path: PATH }];
const CHECKED = "15 November 2026";
const FIXED = `$${FIXED_SCOPE_FROM.toLocaleString("en-US")}`;

const SOURCES = [
    { label: "DesignMe: Design subscription (plans, team, cadence, add-ons)", href: "https://www.designme.agency/design-subscription" },
    { label: "DesignMe vs Designjoy (fixed-project prices, launch times)", href: "https://www.designme.agency/compare/designme-vs-designjoy" },
    { label: "DesignMe: About us (location, team)", href: "https://www.designme.agency/about-us" }
];

const FAQS = [
    {
        question: "How much does DesignMe cost compared with YourMomStudio?",
        answer: `As of ${CHECKED}, DesignMe lists Design at $6,000 a month, Development at $6,000 a month and Design + Development at $10,000 a month. YourMomStudio is ${PRICE_LABEL} a month for design, frontend, backend, QA and a technical PM, with fixed-scope builds from ${FIXED}.`
    },
    {
        question: "Is a cheaper subscription a smaller team?",
        answer: "Yes. DesignMe has 15 senior designers and developers and assigns specialists from that pool. YourMomStudio is the same five people every week, working with you in a shared Slack channel, with no account manager in between."
    },
    {
        question: "Can both build the product, not just design it?",
        answer: "Yes. DesignMe builds on Framer, Webflow, Astro and Next.js. YourMomStudio designs and builds websites on Webflow, Framer or custom code, plus web products and iOS and Android apps."
    },
    {
        question: "Can I pause or cancel either one?",
        answer: "Both say yes. DesignMe lets you pause for a month or cancel, with plan changes from the next billing cycle. YourMomStudio can be paused or cancelled any time from your side, without a call."
    },
    {
        question: "Are the DesignMe facts on this page up to date?",
        answer: `They were checked on ${CHECKED} against DesignMe's own website, and the sources are listed on this page. If something has changed, email us and we will correct it.`
    }
];

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function DesignMeAlternativePage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} faqs={FAQS} />
            <PageHero
                eyebrow="Studio comparison"
                title="YourMomStudio vs DesignMe"
                lead={`Both are design and development subscriptions for startups. DesignMe is a 15-person senior team in Gdańsk from $6,000 a month. YourMomStudio is a five-person product team at ${PRICE_LABEL} a month. Here is how they compare on price, team, cadence and scope, and which one fits you.`}
                crumbs={CRUMBS}
                placement="compare-designme"
                secondary={{ label: "See the comparison", href: "#side-by-side" }}
            />

            <div className={svc.page} data-service-page>
                {/* ── The short answer ── */}
                <section className={svc.block} aria-labelledby="answer-title">
                    <div className={svc.indexGrid}>
                        <div className={svc.indexHead}>
                            <p className={svc.eyebrow}>The short answer</p>
                            <h2 id="answer-title" className={svc.h2}>
                                Which one should you pick?
                            </h2>
                        </div>
                        <p className={style.answer} data-rise>
                            Choose DesignMe if you have $10,000 or more a month and want a 15-person senior pool with SEO, CRO and AI
                            engineering under one roof. Choose YourMomStudio if you want design, build and QA every week from the same
                            five people for {PRICE_LABEL} a month, or a fixed-scope build from {FIXED}.
                        </p>
                    </div>
                </section>

            <div id="side-by-side">
                <CompareTable
                    eyebrow={`Checked ${CHECKED}`}
                    title="YourMomStudio vs DesignMe, side by side"
                    intro="DesignMe facts are taken from DesignMe's own website on the date above. Sources are listed at the end of the page."
                    columns={["YourMomStudio", "DesignMe"]}
                    rows={[
                        { label: "Model", values: ["Monthly subscription you can pause or cancel any time, or fixed-scope projects", "Monthly plans you can pause or cancel, or fixed-price projects"] },
                        { label: "Monthly price", values: [`${PRICE_LABEL}/month: design, frontend, backend, QA and a technical PM`, "Design $6,000 · Development $6,000 · Design + Development $10,000"] },
                        { label: "One-off projects", values: [`Fixed scope from ${FIXED}`, "Websites from $15k · brand identity $10k to $20k · product design from $10k"] },
                        { label: "Growth add-ons", values: ["Not sold separately", "SEO and AEO from $3,000/mo · CRO from $3,000/mo · 25-hour pack $3,000"] },
                        { label: "Team", values: ["The same five people every week", "15 senior designers and developers in Gdańsk, plus a project manager"] },
                        { label: "Who you talk to", values: ["The people building your product, in a shared Slack channel", "A dedicated project manager as your single point of contact"] },
                        { label: "Cadence", values: ["Weekly sprint: Monday agenda, build to staging, live demo every Friday", "Most requests move in 24 to 48 hour cycles; weekly call"] },
                        { label: "Services", values: ["Product design, websites, mobile apps, SaaS, web systems, 2D game design, brand identity", "Product, web, brand, motion, code, AI engineering, SEO and CRO"] },
                        { label: "Platforms", values: ["Webflow, Framer or custom code", "Framer, Webflow, Astro, Next.js (Webflow Premium and Framer Enterprise partner)"] },
                        { label: "Ownership", values: ["You own every file and repository from day one", "Figma files, code and docs are yours"] },
                        { label: "Public reviews", values: ["Client testimonials on our site", "5/5 on Clutch"] }
                    ]}
                />
            </div>

                {/* ── Choose if ── */}
                <section className={svc.block} aria-labelledby="choose-title">
                    <div className={style.chooseInner}>
                        <div className={svc.indexHead}>
                            <p className={svc.eyebrow}>Which one fits</p>
                            <h2 id="choose-title" className={svc.h2}>
                                Choose them, or choose us
                            </h2>
                        </div>
                        <div className={style.choose} data-rise-group>
                            <div className={style.col} data-rise-item>
                                <h3 className={style.colTitle}>Choose DesignMe if</h3>
                                <ul className={svc.fit}>
                                    <li>You need SEO, AEO or CRO retainers alongside design and build.</li>
                                    <li>You want partner-level Framer or Webflow builds.</li>
                                    <li>You want a larger bench for many requests in parallel.</li>
                                    <li>Public Clutch reviews matter to your board.</li>
                                </ul>
                                <a className={svc.textLink} href="https://www.designme.agency/" rel="noopener" target="_blank">
                                    Visit DesignMe
                                    <ArrowIcon />
                                </a>
                            </div>
                            <div className={`${style.col} ${style.ours}`} data-rise-item>
                                <h3 className={style.colTitle}>Choose YourMomStudio if</h3>
                                <ul className={svc.fit}>
                                    <li>Your budget for design and build is under $5,000 a month.</li>
                                    <li>You want the same people every week instead of a pool.</li>
                                    <li>You want a Friday demo you can click through on staging.</li>
                                    <li>You need a mobile app or 2D game design, or a one-off build without a $15k minimum.</li>
                                </ul>
                                <a className={svc.cta} {...bookingLinkProps("compare-designme")}>
                                    <span>Book a call</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Price, in one picture ── */}
                <section className={svc.block} aria-labelledby="price-title">
                    <div className={svc.indexGrid}>
                        <div className={svc.indexHead}>
                            <p className={svc.eyebrow}>Price, on one scale</p>
                            <h2 id="price-title" className={svc.h2}>
                                Design and build, per month
                            </h2>
                        </div>
                        <div className={style.bars} data-rise>
                            <div className={style.bar} style={{ "--w": 0.3999 } as React.CSSProperties}>
                                <span className={style.barLabel}>YourMomStudio</span>
                                <span className={style.barTrack}>
                                    <span className={style.barFill} />
                                </span>
                                <span className={style.barValue}>{PRICE_LABEL}/mo · $47,988 a year</span>
                            </div>
                            <div className={`${style.bar} ${style.barThem}`} style={{ "--w": 1 } as React.CSSProperties}>
                                <span className={style.barLabel}>DesignMe, Design + Development</span>
                                <span className={style.barTrack}>
                                    <span className={style.barFill} />
                                </span>
                                <span className={style.barValue}>$10,000/mo · $120,000 a year</span>
                            </div>
                            <p className={style.note}>
                                The plans are not identical. DesignMe&rsquo;s plan runs two requests at once from a 15-person pool; ours is
                                one five-person team on a weekly sprint. Compare what each includes above before comparing the numbers.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── How a week runs ── */}
                <section className={svc.block} aria-labelledby="loop-title">
                    <div className={svc.indexGrid}>
                        <div className={svc.indexHead}>
                            <p className={svc.eyebrow}>How we work</p>
                            <h2 id="loop-title" className={svc.h2}>
                                A sprint you steer every Monday
                            </h2>
                        </div>
                        <div className={style.loop} data-rise>
                            <p>
                                DesignMe describes request cycles. We run a weekly sprint you steer: on Monday you set the agenda, from Tuesday to
                                Thursday we design and build to staging, and on Friday you see it live and shape the next week. Working design in
                                week one, something clickable on staging by the end of week two.
                            </p>
                            <Link className={svc.textLink} href="/process">
                                See our process
                                <ArrowIcon />
                            </Link>
                        </div>
                    </div>
                </section>

            <FAQSection faqs={FAQS.map((faq) => ({ ...faq, topic: "Pricing" as const }))} title="YourMomStudio vs DesignMe: questions" />

                <section className={svc.block} aria-labelledby="sources-title">
                    <div className={svc.indexGrid}>
                        <div className={svc.indexHead}>
                            <p className={svc.eyebrow}>Sources</p>
                            <h2 id="sources-title" className={svc.h2}>
                                Where these facts come from
                            </h2>
                        </div>
                        <div className={style.sources}>
                            <p>
                                DesignMe facts were checked on {CHECKED} on DesignMe&rsquo;s own website. &ldquo;Not sold separately&rdquo; means
                                we don&rsquo;t offer it as an add-on. Spotted something out of date? Email{" "}
                                <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will fix it.
                            </p>
                            <ul>
                                {SOURCES.map((source) => (
                                    <li key={source.href}>
                                        <a href={source.href} rel="noopener nofollow" target="_blank">
                                            {source.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
                <ServiceMotion />
            </div>
        </main>
    );
}

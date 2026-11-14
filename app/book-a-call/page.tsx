import PageHero from "@/app/Components/PageHero/PageHero";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { SITE } from "@/app/data/site";
import { pageMetadata } from "@/app/lib/seo";
import style from "./page.module.scss";

// /book-a-call — the discovery call as a page of its own (the rest of the site
// opens the same Calendly calendar in a modal). A real URL gives search
// engines a "Book a call" page to show under the site in results, and gives
// people a link they can share.
//
// The calendar is Calendly's plain iframe embed, lazy-loaded, with the email
// address as the no-JavaScript / no-iframe fallback.

const PATH = "/book-a-call";
const TITLE = "Book a free discovery call";
const DESCRIPTION =
    "Book a free 30-minute discovery call with YourMomStudio. Tell us what you are building and we will map the scope, team, timeline and next steps with you.";
const CRUMBS = [{ name: "Book a call", path: PATH }];

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const calendarSrc = (() => {
    const url = new URL(SITE.bookingUrl);
    url.searchParams.set("embed_domain", new URL(SITE.url).hostname);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("primary_color", "e85002");
    return url.toString();
})();

const STEPS = [
    { title: "You tell us what you are building", text: "The product, who it is for, where it stands today and what has to happen next." },
    { title: "We map it out together", text: "Scope, the team it needs, a realistic timeline and whether the subscription or a fixed-scope project fits." },
    { title: "You leave with next steps", text: "What to do next, whoever builds it. The call is free and there is no commitment." }
];

export default function BookACallPage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} />
            <PageHero
                eyebrow="Book a call"
                title={TITLE}
                lead="A free 30-minute call with the team. Tell us what you are building and we will help you map the right scope, team, timeline and next steps."
                crumbs={CRUMBS}
                placement="book-a-call-page"
                secondary={{ label: "See pricing", href: "/pricing" }}
                cta={false}
            />

            <section className={style.section} aria-labelledby="call-steps">
                <div className={style.inner}>
                    <div className={style.aside}>
                        <h2 id="call-steps" className={style.heading}>
                            What happens on the call
                        </h2>
                        <ol className={style.steps}>
                            {STEPS.map((step, i) => (
                                <li key={step.title}>
                                    <span className={style.num} aria-hidden="true">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span>
                                        <strong>{step.title}</strong>
                                        {step.text}
                                    </span>
                                </li>
                            ))}
                        </ol>
                        <p className={style.alt}>
                            Prefer email? Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                        </p>
                    </div>

                    <div className={style.calendar}>
                        <iframe src={calendarSrc} title="Choose a time for your discovery call" loading="lazy" />
                    </div>
                </div>
            </section>
        </main>
    );
}

import PageHero from "@/app/Components/PageHero/PageHero";
import { LinkGrid } from "@/app/Components/PageBlocks/PageBlocks";
import { TeamSection } from "@/app/Components/TeamSection/TeamSection";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { faqsByTopic } from "@/app/data/faq";
import { pageMetadata } from "@/app/lib/seo";
import { MEMBERS } from "@/app/data/team";
import { SITE, absoluteUrl } from "@/app/data/site";

// /team — the team from the home page and the team questions.

const PATH = "/team";
const TITLE = "Our team: the people building your product";
const DESCRIPTION =
    "The same five people every week, in a shared Slack channel: design, frontend, backend, QA and a technical PM, with no account manager in between.";
const CRUMBS = [{ name: "Team", path: PATH }];
const FAQS = faqsByTopic("Team");

// Each person on the team as a schema.org Person who works for the studio: the
// real people behind the work, which search engines and AI answers weigh as a
// trust signal. @ids are stable, so the founder node on the home page
// (#wajahat-sheikh) and this one are the same person.
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const PEOPLE = MEMBERS.map((member) => ({
    "@type": "Person",
    "@id": `${SITE.url}/#${slug(member.name)}`,
    name: member.name,
    jobTitle: member.position,
    description: member.specialty,
    image: absoluteUrl(member.photo),
    worksFor: { "@id": `${SITE.url}/#organization` }
}));

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function TeamPage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} faqs={FAQS} extra={PEOPLE} />
            <PageHero
                eyebrow="Team"
                title="The people who design and build your product"
                lead="The same five people every week, in a shared Slack channel. There’s no account manager sitting between you and the people building your product."
                crumbs={CRUMBS}
                placement="team-page"
                secondary={{ label: "How we work", href: "/process" }}
            />
            <TeamSection />
            <FAQSection faqs={FAQS} title="Team questions, answered straight." />
            <LinkGrid
                eyebrow="Keep exploring"
                title="More about working with us"
                links={[
                    { title: "Services", text: "Everything we design and build, from product design to 2D games.", href: "/services" },
                    { title: "Process", text: "Working design in week one and a live demo every Friday.", href: "/process" },
                    { title: "Pricing", text: "One flat monthly price, or a fixed-scope project.", href: "/pricing" }
                ]}
            />
        </main>
    );
}

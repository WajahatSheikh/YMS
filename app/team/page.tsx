import PageHero from "@/app/Components/PageHero/PageHero";
import { LinkGrid } from "@/app/Components/PageBlocks/PageBlocks";
import { TeamSection } from "@/app/Components/TeamSection/TeamSection";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { faqsByTopic } from "@/app/data/faq";
import { pageMetadata } from "@/app/lib/seo";

// /team — the team from the home page and the team questions.

const PATH = "/team";
const TITLE = "Our team: the people building your product";
const DESCRIPTION =
    "The same six people every week, in a shared Slack channel: design, frontend, backend, QA and a technical PM, with no account manager in between.";
const CRUMBS = [{ name: "Team", path: PATH }];
const FAQS = faqsByTopic("Team");

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function TeamPage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} faqs={FAQS} />
            <PageHero
                eyebrow="Team"
                title="The people who design and build your product"
                lead="The same six people every week, in a shared Slack channel. There’s no account manager sitting between you and the people building your product."
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

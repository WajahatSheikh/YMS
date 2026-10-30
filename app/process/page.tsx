import PageHero from "@/app/Components/PageHero/PageHero";
import { LinkGrid, WeekBlock } from "@/app/Components/PageBlocks/PageBlocks";
import HowItWorks from "@/app/Components/HowItWorks/HowItWorks";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { faqsByTopic } from "@/app/data/faq";
import { pageMetadata } from "@/app/lib/seo";

// /process — the first eight weeks (the home page's journey), the weekly
// sprint, and the process questions.

const PATH = "/process";
const TITLE = "Our process: weekly sprints, first call to launch";
const DESCRIPTION =
    "How we work: working design in week one, something clickable on staging by week two, then a weekly sprint with a live demo every Friday.";
const CRUMBS = [{ name: "Process", path: PATH }];
const FAQS = faqsByTopic("Process");

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function ProcessPage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} faqs={FAQS} />
            <PageHero
                eyebrow="Process"
                title="How we work, from first call to launch"
                lead="Working design in week one, and something clickable on staging by the end of week two. After that there’s a live demo every Friday, and you shape the next sprint."
                crumbs={CRUMBS}
                placement="process-page"
                secondary={{ label: "See pricing", href: "/pricing" }}
            />
            <HowItWorks />
            <WeekBlock
                title="Monday you set the agenda. Friday you see it live."
                intro="We design and build Tuesday to Thursday, shipping to staging as work lands."
            />
            <FAQSection faqs={FAQS} title="Process questions, answered straight." />
            <LinkGrid
                eyebrow="Keep exploring"
                title="More about working with us"
                links={[
                    { title: "Design subscription", text: "What one monthly subscription includes, and how it compares to hiring.", href: "/design-subscription" },
                    { title: "Services", text: "Everything we design and build, from product design to 2D games.", href: "/services" },
                    { title: "The team", text: "The same six people every week, in a shared Slack channel.", href: "/team" }
                ]}
            />
        </main>
    );
}

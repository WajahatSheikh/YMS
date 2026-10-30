import PageHero from "@/app/Components/PageHero/PageHero";
import { ChecklistBlock, CompareTable, LinkGrid, MoreLink, WeekBlock } from "@/app/Components/PageBlocks/PageBlocks";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { faqsByTopic } from "@/app/data/faq";
import { INCLUDES } from "@/app/data/subscription";
import { PRICE_LABEL } from "@/app/data/site";
import { pageMetadata } from "@/app/lib/seo";

// /design-subscription — what the subscription is and how it compares to the
// usual alternatives. The price itself lives on /pricing.

const PATH = "/design-subscription";
const TITLE = "Design and development subscription for startups";
const DESCRIPTION = `One monthly subscription for a full product team: design, frontend, backend, QA and a technical PM. ${PRICE_LABEL}/month, pause anytime, you own everything.`;
const CRUMBS = [{ name: "Design subscription", path: PATH }];
const FAQS = faqsByTopic("Process", "Ownership", "Team");

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function DesignSubscriptionPage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} faqs={FAQS} />
            <PageHero
                eyebrow="Design subscription"
                title="A design and development subscription for startups"
                lead={`One subscription buys a full product team, working on your product every week. Not hours in a bucket: an actual team on a sprint cadence. ${PRICE_LABEL} a month, pause or cancel anytime, and you own everything we make.`}
                crumbs={CRUMBS}
                placement="design-subscription-page"
                secondary={{ label: "See pricing", href: "/pricing" }}
            />
            <ChecklistBlock
                eyebrow="What you get"
                title="Everything in one subscription"
                intro="Design, frontend, backend, QA and a technical PM: the whole team you would otherwise hire one role at a time."
                items={INCLUDES}
                footer={<MoreLink href="/pricing">See the price and both plans</MoreLink>}
            />
            <CompareTable
                eyebrow="How it compares"
                title="Subscription vs hiring in-house vs freelancers"
                columns={["YourMomStudio subscription", "Hiring in-house", "Freelancers"]}
                rows={[
                    {
                        label: "Who you get",
                        values: [
                            "Design, frontend, backend, QA and a technical PM",
                            "One hire per role, recruited one at a time",
                            "Usually one specialist per freelancer"
                        ]
                    },
                    {
                        label: "Getting started",
                        values: [
                            "Working design in week one",
                            "Recruiting comes before any work starts",
                            "Quick for one task; you line up the rest"
                        ]
                    },
                    {
                        label: "Commitment",
                        values: ["Monthly; pause or cancel anytime", "Employment contracts and notice periods", "Per project or per hour"]
                    },
                    {
                        label: "Cost",
                        values: [`${PRICE_LABEL} a month, flat`, "Salary, benefits and tools for every hire", "Rates per person, which add up"]
                    },
                    {
                        label: "Who runs the work",
                        values: ["A dedicated technical PM", "You, or a manager you hire", "You"]
                    },
                    {
                        label: "Ownership",
                        values: ["You own all code and design from day one", "Yours", "Depends on each contract"]
                    }
                ]}
            />
            <WeekBlock
                title="Monday you set the agenda. Friday you see it live."
                intro="We design and build Tuesday to Thursday, shipping to staging as work lands."
            />
            <FAQSection faqs={FAQS} />
            <LinkGrid
                eyebrow="Keep exploring"
                title="More about working with us"
                links={[
                    { title: "Pricing", text: "One flat monthly price, or a fixed-scope project.", href: "/pricing" },
                    { title: "Services", text: "Everything we design and build, from product design to 2D games.", href: "/services" },
                    { title: "Process", text: "The first eight weeks, and how every sprint runs.", href: "/process" }
                ]}
            />
        </main>
    );
}

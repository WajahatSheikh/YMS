import PageHero from "@/app/Components/PageHero/PageHero";
import { PlanCards } from "@/app/Components/PageBlocks/PageBlocks";
import Package from "@/app/Components/Package/Package";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { faqsByTopic } from "@/app/data/faq";
import { FIXED_SCOPE_FROM } from "@/app/data/subscription";
import { PRICE_LABEL } from "@/app/data/site";
import { pageMetadata } from "@/app/lib/seo";

// /pricing — the receipt from the home page, the two ways to work with us side
// by side, and the pricing and ownership questions.

const PATH = "/pricing";
const FIXED_LABEL = `$${FIXED_SCOPE_FROM.toLocaleString("en-US")}`;
const TITLE = `Pricing: design & dev subscription from ${PRICE_LABEL}/mo`;
const DESCRIPTION = `A full product team for ${PRICE_LABEL}/month: design, frontend, backend, QA and a technical PM. Pause or cancel anytime. Fixed-scope projects from ${FIXED_LABEL}.`;
const CRUMBS = [{ name: "Pricing", path: PATH }];
const FAQS = faqsByTopic("Pricing", "Ownership");

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function PricingPage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} faqs={FAQS} />
            <PageHero
                eyebrow="Pricing"
                title="One flat monthly price for your whole product team"
                lead={`Design, frontend, backend, QA and a technical PM, working on your product every week for ${PRICE_LABEL} a month. No contracts: pause or cancel anytime. Prefer defined deliverables? Fixed-scope projects start at ${FIXED_LABEL}.`}
                crumbs={CRUMBS}
                placement="pricing-page"
                secondary={{ label: "How the subscription works", href: "/design-subscription" }}
            />
            <Package />
            <PlanCards
                eyebrow="Two ways to work with us"
                title="Subscription or fixed scope"
                intro="Subscription makes sense when the work keeps coming; fixed scope when it doesn’t. Same team and the same process either way."
                plans={[
                    {
                        name: "Product subscription",
                        price: PRICE_LABEL,
                        unit: "/ month",
                        text: "A full product team on a sprint cadence. Not hours in a bucket: an actual team, every week.",
                        points: [
                            "Design, frontend, backend, QA and a technical PM",
                            "A live demo every Friday",
                            "Pause or cancel anytime, without a call",
                            "You own all code and design"
                        ],
                        featured: true
                    },
                    {
                        name: "Fixed-scope project",
                        price: `From ${FIXED_LABEL}`,
                        text: "For a one-off build with defined deliverables.",
                        points: ["Same team, same process", "Defined deliverables", "You own all code and design"]
                    }
                ]}
            />
            <FAQSection faqs={FAQS} title="Pricing questions, answered straight." />
        </main>
    );
}

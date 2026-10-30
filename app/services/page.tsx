import PageHero from "@/app/Components/PageHero/PageHero";
import { LinkGrid, WeekBlock } from "@/app/Components/PageBlocks/PageBlocks";
import Services from "@/app/Components/Services/Services";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { SERVICES, serviceHref } from "@/app/data/services";
import { faqsByTopic } from "@/app/data/faq";
import { pageMetadata } from "@/app/lib/seo";

// /services — the hub: every capability with a link to its own page, the reels
// from the home page's capability explorer, and how the work runs.

const PATH = "/services";
const TITLE = "Design and development services for startups";
const DESCRIPTION =
    "Product design, websites, mobile apps, SaaS products, custom web systems, 2D game design and brand identity, from one product team on one subscription.";
const CRUMBS = [{ name: "Services", path: PATH }];
const FAQS = faqsByTopic("Pricing", "Process");

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function ServicesPage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} faqs={FAQS} />
            <PageHero
                eyebrow="Services"
                title="Design and development services for startups"
                lead="Bring us in when your idea, product, website, or brand needs to feel sharper, clearer, and ready for what comes next. One team designs and builds it, from first sketch to launch."
                crumbs={CRUMBS}
                placement="services-page"
                secondary={{ label: "See pricing", href: "/pricing" }}
            />
            <LinkGrid
                eyebrow={`${SERVICES.length} capabilities`}
                title="Everything we design and build"
                links={SERVICES.map((service) => ({
                    title: service.title,
                    label: service.label,
                    text: service.seo.description,
                    href: serviceHref(service)
                }))}
            />
            <Services />
            <WeekBlock
                title="One sprint a week, a live demo every Friday"
                intro="Working design in week one, and something clickable on staging by the end of week two."
            />
            <FAQSection faqs={FAQS} />
        </main>
    );
}

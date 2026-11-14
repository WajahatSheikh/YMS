import PageHero from "@/app/Components/PageHero/PageHero";
import { WeekBlock } from "@/app/Components/PageBlocks/PageBlocks";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { ServiceIndex } from "@/app/Components/ServicePage/ServicePage";
import ServiceMotion from "@/app/Components/ServicePage/ServiceMotion";
import { SERVICES } from "@/app/data/services";
import { faqsByTopic } from "@/app/data/faq";
import { pageMetadata } from "@/app/lib/seo";
import style from "@/app/Components/ServicePage/index.module.scss";

// /services: the hub. Every capability as a row of the same ruled index the
// service pages end on, each linking to its own page, then how a week runs.

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
                lead="Seven things we design and build, all from the same five people on one subscription. Pick the one you need; each page shows what you get and how a week of it runs."
                crumbs={CRUMBS}
                placement="services-page"
                secondary={{ label: "See pricing", href: "/pricing" }}
            />
            <div className={style.page} data-service-page>
                <section className={style.block} aria-labelledby="all-services">
                    <div className={style.othersInner}>
                        <div className={style.indexHead}>
                            <p className={style.eyebrow}>{SERVICES.length} services</p>
                            <h2 id="all-services" className={style.h2}>
                                Everything we design and build
                            </h2>
                        </div>
                        <ServiceIndex services={SERVICES} />
                    </div>
                </section>
                <ServiceMotion />
            </div>
            <WeekBlock
                title="One sprint a week, a live demo every Friday"
                intro="Working design in week one, and something clickable on staging by the end of week two."
            />
            <FAQSection faqs={FAQS} />
        </main>
    );
}

import PageHero from "@/app/Components/PageHero/PageHero";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { FAQS } from "@/app/data/faq";
import { pageMetadata } from "@/app/lib/seo";

// /faq — every question, with the topic filter.

const PATH = "/faq";
const TITLE = "FAQ: pricing, process, ownership and the team";
const DESCRIPTION =
    "Straight answers about our design and development subscription: what’s included, how fast you see work, pausing or cancelling, and who owns the code.";
const CRUMBS = [{ name: "FAQ", path: PATH }];

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function FaqPage() {
    return (
        <main id="main">
            <PageSchema path={PATH} title={TITLE} description={DESCRIPTION} crumbs={CRUMBS} faqs={FAQS} />
            <PageHero
                eyebrow="FAQ"
                title="Frequently asked questions"
                lead="Straight answers on pricing, process, ownership and the team. Can’t find yours? Book a call and ask us directly."
                crumbs={CRUMBS}
                placement="faq-page"
                secondary={{ label: "See pricing", href: "/pricing" }}
            />
            <FAQSection faqs={FAQS} title="All questions" />
        </main>
    );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/app/Components/PageHero/PageHero";
import { ChecklistBlock, LinkGrid, MoreLink, WeekBlock } from "@/app/Components/PageBlocks/PageBlocks";
import InViewVideo from "@/app/Components/PageBlocks/InViewVideo";
import FAQSection from "@/app/Components/FAQ/FAQSection";
import PageSchema from "@/app/Components/Seo/PageSchema";
import { SERVICES, serviceHref } from "@/app/data/services";
import { faqsByTopic } from "@/app/data/faq";
import { INCLUDES, FIXED_SCOPE_FROM } from "@/app/data/subscription";
import { PRICE_LABEL } from "@/app/data/site";
import { pageMetadata } from "@/app/lib/seo";

// /services/<slug> — one page per capability, built entirely from
// app/data/services.ts: the service's own copy, deliverables and reel, then the
// shared subscription, sprint and FAQ blocks, and links to the other services.

export const dynamicParams = false;

export function generateStaticParams() {
    return SERVICES.map((service) => ({ slug: service.slug }));
}

const findService = async (params: Promise<{ slug: string }>) => {
    const { slug } = await params;
    return SERVICES.find((service) => service.slug === slug);
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const service = await findService(params);
    if (!service) return {};
    return pageMetadata({ path: serviceHref(service), title: service.seo.title, description: service.seo.description });
}

const FAQS = faqsByTopic("Pricing", "Process");

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const service = await findService(params);
    if (!service) notFound();

    const path = serviceHref(service);
    const crumbs = [
        { name: "Services", path: "/services" },
        { name: service.title, path }
    ];
    const name = service.title.toLowerCase();

    return (
        <main id="main">
            <PageSchema
                path={path}
                title={service.seo.title}
                description={service.seo.description}
                crumbs={crumbs}
                faqs={FAQS}
                service={{ name: service.seo.title, description: service.description, serviceType: service.title }}
            />
            <PageHero
                eyebrow={service.label ? `${service.title} · ${service.label}` : service.title}
                title={service.seo.title}
                lead={service.description}
                crumbs={crumbs}
                placement={`service-page-${service.slug}`}
                secondary={{ label: "See pricing", href: "/pricing" }}
            />
            <ChecklistBlock
                eyebrow="What you get"
                title={`What’s included in ${name}`}
                items={service.tags}
                media={service.video && <InViewVideo src={service.video.src} poster={service.video.poster} />}
            />
            <WeekBlock
                title="One sprint a week, a live demo every Friday"
                intro="Working design in week one, and something clickable on staging by the end of week two. After that there’s a live demo every Friday."
            />
            <ChecklistBlock
                eyebrow="One subscription"
                title="Included in every subscription"
                intro={`${service.title} runs on the same ${PRICE_LABEL}/month subscription as everything else we do: a full product team on a sprint cadence, with no contracts. Need a one-off instead? Fixed-scope projects start at $${FIXED_SCOPE_FROM.toLocaleString("en-US")}.`}
                items={INCLUDES}
                footer={<MoreLink href="/pricing">See pricing and what&rsquo;s included</MoreLink>}
            />
            <FAQSection faqs={FAQS} />
            <LinkGrid
                eyebrow="Keep exploring"
                title="Other services"
                links={SERVICES.filter((other) => other.slug !== service.slug).map((other) => ({
                    title: other.title,
                    label: other.label,
                    text: other.seo.description,
                    href: serviceHref(other)
                }))}
            />
        </main>
    );
}

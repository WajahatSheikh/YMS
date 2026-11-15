import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageSchema from "@/app/Components/Seo/PageSchema";
import ServicePageView from "@/app/Components/ServicePage/ServicePage";
import { SERVICES, serviceHref } from "@/app/data/services";
import { SERVICE_PAGES } from "@/app/data/servicePages";
import { pageMetadata } from "@/app/lib/seo";

// /services/<slug>: one page per capability. The shared service data
// (app/data/services.ts) gives the keyword title, description, deliverables and
// reel; app/data/servicePages.ts gives what only this page says: what each
// deliverable means, the sprint week, when to bring us in, proof and its own
// FAQ. Layout and motion: app/Components/ServicePage.

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
    const path = serviceHref(service);
    return pageMetadata({
        path,
        title: service.seo.title,
        description: service.seo.description,
        // The page's own share image (./opengraph-image.tsx).
        image: { url: `${path}/opengraph-image`, width: 1200, height: 630, alt: `${service.seo.title}, by YourMomStudio` }
    });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const service = await findService(params);
    const page = service && SERVICE_PAGES[service.slug];
    if (!service || !page) notFound();

    const path = serviceHref(service);

    return (
        <main id="main">
            <PageSchema
                path={path}
                title={service.seo.title}
                description={service.seo.description}
                crumbs={[
                    { name: "Services", path: "/services" },
                    { name: service.title, path }
                ]}
                faqs={page.faqs}
                service={{ name: service.seo.title, description: service.description, serviceType: service.title }}
            />
            <ServicePageView service={service} page={page} />
        </main>
    );
}

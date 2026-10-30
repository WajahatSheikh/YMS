import { SITE, absoluteUrl } from "@/app/data/site";
import type { Faq } from "@/app/data/faq";

// schema.org data for an inner page: the WebPage itself, its breadcrumb trail
// and, when the page shows them, its FAQs and the service it describes. The
// Organization and WebSite nodes live on the home page (JsonLd.tsx) and are
// referenced here by @id, which is how Google joins graphs across pages.

export interface Crumb {
    name: string;
    path: string;
}

interface PageSchemaProps {
    path: string;
    title: string;
    description: string;
    /** Trail after "Home", ending with this page. */
    crumbs: Crumb[];
    /** Must be exactly the FAQs visible on the page. */
    faqs?: Faq[];
    service?: { name: string; description: string; serviceType: string };
}

export default function PageSchema({ path, title, description, crumbs, faqs, service }: PageSchemaProps) {
    const url = absoluteUrl(path);
    const org = `${SITE.url}/#organization`;
    const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

    const graph: Record<string, unknown>[] = [
        {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: title,
            description,
            isPartOf: { "@id": `${SITE.url}/#website` },
            about: { "@id": org },
            breadcrumb: { "@id": `${url}#breadcrumb` },
            inLanguage: "en"
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: trail.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: absoluteUrl(crumb.path)
            }))
        }
    ];

    if (service) {
        graph.push({
            "@type": "Service",
            "@id": `${url}#service`,
            name: service.name,
            description: service.description,
            serviceType: service.serviceType,
            provider: { "@id": org },
            areaServed: "Worldwide",
            url
        });
    }

    if (faqs?.length) {
        graph.push({
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer }
            }))
        });
    }

    // `<` is escaped so no string in the data can ever close the script tag.
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

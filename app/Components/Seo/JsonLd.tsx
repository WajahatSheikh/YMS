import { SITE, absoluteUrl } from "@/app/data/site";
import { PAGE_UPDATED } from "@/app/data/pageDates";
import { SERVICES } from "@/app/data/services";
import { FAQS } from "@/app/data/faq";

// schema.org structured data for the home page, as one linked @graph:
// Organization → WebSite → WebPage, the service catalogue with the
// subscription price, and the FAQ. Every value comes from the same data files
// the page renders, so the schema can never drift from the visible content.
export default function JsonLd() {
    const org = `${SITE.url}/#organization`;
    const website = `${SITE.url}/#website`;
    const sameAs = Object.values(SITE.social).filter(Boolean);

    const graph = [
        {
            "@type": "Organization",
            "@id": org,
            name: SITE.name,
            alternateName: SITE.alternateNames,
            url: SITE.url,
            // The square orange mark (same as the favicon), which reads at every
            // size Google shows a brand logo; the wide wordmark did not.
            logo: absoluteUrl("/icons/icon-512.png"),
            email: SITE.email,
            description: SITE.description,
            ...(sameAs.length ? { sameAs } : {}),
            // Who runs the studio and how to reach it: entity signals Google
            // and AI answer engines use to tie the brand to real people.
            founder: {
                "@type": "Person",
                "@id": `${SITE.url}/#wajahat-sheikh`,
                name: "Wajahat Sheikh",
                jobTitle: "Head of Product Design",
                image: absoluteUrl("/assets/images/wajahat.png"),
                worksFor: { "@id": org }
            },
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: SITE.email,
                url: absoluteUrl("/book-a-call"),
                availableLanguage: ["English", "Urdu"]
            },
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Product design and development services",
                itemListElement: SERVICES.map((s) => ({
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: s.title, description: s.description, provider: { "@id": org } }
                }))
            }
        },
        {
            "@type": "WebSite",
            "@id": website,
            url: SITE.url,
            name: SITE.name,
            alternateName: SITE.alternateNames,
            publisher: { "@id": org },
            inLanguage: "en"
        },
        {
            "@type": "WebPage",
            "@id": `${SITE.url}/#webpage`,
            url: SITE.url,
            name: SITE.title,
            description: SITE.description,
            dateModified: PAGE_UPDATED["/"],
            isPartOf: { "@id": website },
            about: { "@id": org },
            inLanguage: "en"
        },
        {
            "@type": "Service",
            "@id": `${SITE.url}/#subscription`,
            name: "Product design and development subscription",
            serviceType: "MVP design and development",
            provider: { "@id": org },
            areaServed: "Worldwide",
            offers: {
                "@type": "Offer",
                price: SITE.pricing.amount,
                priceCurrency: SITE.pricing.currency,
                priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: SITE.pricing.amount,
                    priceCurrency: SITE.pricing.currency,
                    unitCode: "MON",
                    referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" }
                },
                url: SITE.url
            }
        },
        {
            "@type": "FAQPage",
            "@id": `${SITE.url}/#faq`,
            mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer }
            }))
        }
    ];

    // `<` is escaped so no string in the data can ever close the script tag.
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

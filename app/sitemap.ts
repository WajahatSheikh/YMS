import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "./data/site";
import { SERVICES, serviceHref } from "./data/services";

// /sitemap.xml — only pages meant to rank.
//
// The /portfolio/* case studies are left out on purpose: they are placeholder
// projects and are marked noindex (see app/portfolio/[slug]/page.tsx). Add each
// one here when it is replaced with a real case study.
const PAGES: { path: string; priority: number }[] = [
    { path: "/design-subscription", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/pricing", priority: 0.9 },
    { path: "/process", priority: 0.7 },
    { path: "/team", priority: 0.6 },
    { path: "/faq", priority: 0.6 }
];

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    return [
        { url: SITE.url, lastModified, changeFrequency: "monthly", priority: 1 },
        ...PAGES.map((page) => ({
            url: absoluteUrl(page.path),
            lastModified,
            changeFrequency: "monthly" as const,
            priority: page.priority
        })),
        ...SERVICES.map((service) => ({
            url: absoluteUrl(serviceHref(service)),
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.8
        }))
    ];
}

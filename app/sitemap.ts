import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "./data/site";
import { SERVICES, serviceHref } from "./data/services";
import { TUIT } from "./portfolio/tuit-luxury-candle/content";
import { NW } from "./portfolio/naturally-white/content";
import { MB } from "./portfolio/mdrn-blk/content";

// /sitemap.xml — only pages meant to rank.
//
// Of the /portfolio/* case studies only the real ones are listed (CASE_STUDIES).
// The rest are placeholder projects, marked noindex (see
// app/portfolio/[slug]/page.tsx). Add each one here when it is replaced with a
// real case study.
const CASE_STUDIES = [MB, TUIT, NW].map((study) => ({ path: study.path, lastModified: new Date(study.published) }));
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
        })),
        ...CASE_STUDIES.map((study) => ({
            url: absoluteUrl(study.path),
            lastModified: study.lastModified,
            changeFrequency: "yearly" as const,
            priority: 0.7
        }))
    ];
}

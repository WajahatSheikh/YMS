import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "./data/site";
import { TUIT } from "./portfolio/tuit-luxury-candle/content";
import { NW } from "./portfolio/naturally-white/content";
import { MB } from "./portfolio/mdrn-blk/content";
import { GME } from "./portfolio/global-minds-education/content";

// /sitemap.xml — only pages meant to rank. The /services pages are switched
// off for now (redirected to /#services in next.config.ts), so they are not listed.
//
// Of the /portfolio/* case studies only the real ones are listed (CASE_STUDIES).
// The rest are placeholder projects, marked noindex (see
// app/portfolio/[slug]/page.tsx). Add each one here when it is replaced with a
// real case study.
const CASE_STUDIES = [GME, MB, TUIT, NW].map((study) => ({ path: study.path, lastModified: new Date(study.published) }));
const PAGES: { path: string; priority: number }[] = [
    { path: "/design-subscription", priority: 0.9 },
    { path: "/pricing", priority: 0.9 },
    { path: "/book-a-call", priority: 0.8 },
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
        ...CASE_STUDIES.map((study) => ({
            url: absoluteUrl(study.path),
            lastModified: study.lastModified,
            changeFrequency: "yearly" as const,
            priority: 0.7
        }))
    ];
}

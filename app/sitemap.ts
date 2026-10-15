import type { MetadataRoute } from "next";
import { SITE } from "./data/site";

// /sitemap.xml — only pages meant to rank.
//
// The /portfolio/* case studies are left out on purpose: they are placeholder
// projects and are marked noindex (see app/portfolio/[slug]/page.tsx). Add each
// one here when it is replaced with a real case study.
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE.url,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1
        }
    ];
}

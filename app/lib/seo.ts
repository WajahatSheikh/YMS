import type { Metadata } from "next";
import { SITE } from "@/app/data/site";

// Metadata for an inner page: its own <title> (the root layout's template adds
// "| YourMomStudio"), description, canonical URL and social cards.
//
// The share image is named explicitly: a page that sets its own `openGraph`
// replaces the root one, and with it the image from app/opengraph-image.tsx.
const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE.title };

export const pageMetadata = ({ path, title, description }: { path: string; title: string; description: string }): Metadata => ({
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
        type: "website",
        url: path,
        siteName: SITE.name,
        locale: SITE.locale,
        title: `${title} | ${SITE.name}`,
        description,
        images: [SHARE_IMAGE]
    },
    twitter: {
        card: "summary_large_image",
        title: `${title} | ${SITE.name}`,
        description,
        images: [SHARE_IMAGE.url]
    }
});

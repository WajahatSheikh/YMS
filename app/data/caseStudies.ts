import { MB } from "@/app/portfolio/mdrn-blk/content";
import { GME } from "@/app/portfolio/global-minds-education/content";
import { NW } from "@/app/portfolio/naturally-white/content";
import { TUIT } from "@/app/portfolio/tuit-luxury-candle/content";

// The real, art-directed case studies, with the tags used to pick "next".
// Each case study ends on a related one: a study that shares at least
// MIN_SHARED tags with it, chosen at random among those (see NextCaseStudy).
// Add a study here when it is built and every other study can lead to it.

export interface CaseStudyCard {
    slug: string;
    path: string;
    client: string;
    category: string;
    year: string;
    tags: readonly string[];
    /** 16:11, 1600 to 2000 px wide: sharp at half the page width on a retina screen. */
    image: string;
    imageAlt: string;
}

export const CASE_STUDIES: readonly CaseStudyCard[] = [
    {
        slug: GME.slug,
        path: GME.path,
        client: GME.client,
        category: GME.category,
        year: GME.year,
        tags: ["Education", "Website", "Responsive", "Design system"],
        image: "/assets/images/work/global-minds-education/gme-next-card.webp",
        imageAlt: "Global Minds Education website in a browser beside a boarding pass graphic and a phone"
    },
    {
        slug: MB.slug,
        path: MB.path,
        client: MB.client,
        category: MB.category,
        year: MB.year,
        tags: ["E-commerce", "Fashion", "Website", "Responsive", "Design system"],
        image: "/assets/images/work/mdrn-blk/mdrn-blk-next-card.webp",
        imageAlt: "MDRN BLK skatewear website on a phone beside a model in beige cargo pants"
    },
    {
        slug: TUIT.slug,
        path: TUIT.path,
        client: TUIT.client,
        category: TUIT.category,
        year: TUIT.year,
        tags: ["E-commerce", "Luxury", "Website", "Responsive", "Design system"],
        image: "/assets/images/work/tuit/tuit-candle-next-card.webp",
        imageAlt: "Tüit Luxury Candle Co. website on an iPad resting on a ribbed clay sculpture"
    },
    {
        slug: NW.slug,
        path: NW.path,
        client: NW.client,
        category: NW.category,
        year: NW.year,
        tags: ["Beauty", "Booking", "Website", "Responsive", "Design system"],
        image: "/assets/images/work/naturally-white/naturally-white-next-card.webp",
        imageAlt: "Naturally White website on an iPad resting on a teal ribbed sculpture"
    }
];

const MIN_SHARED = 2;

export interface RelatedCaseStudy {
    study: CaseStudyCard;
    shared: string[];
}

/** Tags two studies have in common, in the first study's order. */
export const sharedTags = (a: CaseStudyCard, b: CaseStudyCard) => a.tags.filter((tag) => b.tags.includes(tag));

/**
 * The studies related to `slug`, most shared tags first (ties in list order).
 * Falls back to every other study if none shares MIN_SHARED tags.
 */
export const relatedCaseStudies = (slug: string): RelatedCaseStudy[] => {
    const current = CASE_STUDIES.find((study) => study.slug === slug);
    if (!current) return [];
    const others = CASE_STUDIES.filter((study) => study.slug !== slug).map((study) => ({ study, shared: sharedTags(current, study) }));
    const related = others.filter((o) => o.shared.length >= MIN_SHARED);
    return (related.length ? related : others).sort((a, b) => b.shared.length - a.shared.length);
};

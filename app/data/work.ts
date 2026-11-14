import { CASE_STUDIES } from "@/app/data/caseStudies";

// The home page "Case studies" section: one tab per kind of work, each listing
// the real case studies in it. A tab with no case studies yet shows an honest
// "Uploading soon" panel instead of placeholders.
//
// To add a case study: build its page (app/portfolio/<slug>), add it to
// CASE_STUDIES in app/data/caseStudies.ts, then list its slug in the right
// category below with a one-line teaser and its preview reel.

export interface WorkProject {
    slug: string;
    path: string;
    title: string;
    category: string;
    year: string;
    teaser: string;
    image: string;
    imageAlt: string;
    /** 1280 × 880 reel for hover / in-view preview; `reelSmall` (640 × 440) on phones. */
    reel: string;
    reelSmall: string;
}

export interface WorkCategory {
    id: string;
    label: string;
    /** The label in sentence case, for running text ("Mobile app case studies…"). */
    name: string;
    /** One line under the tabs: what this kind of work is. */
    intro: string;
    /** Shown when the tab has no case studies yet. */
    soon: string;
    /** The matching service page. */
    service: { label: string; href: string };
    projects: WorkProject[];
}

const REELS = "/assets/videos/work";

const project = (slug: string, teaser: string, reel: string, reelSmall: string): WorkProject => {
    const study = CASE_STUDIES.find((s) => s.slug === slug);
    if (!study) throw new Error(`work.ts: no case study "${slug}" in CASE_STUDIES`);
    return {
        slug,
        path: study.path,
        title: study.client,
        category: study.category,
        year: study.year,
        teaser,
        image: study.image,
        imageAlt: study.imageAlt,
        reel: `${REELS}/${reel}`,
        reelSmall: `${REELS}/${reelSmall}`
    };
};

export const WORK_CATEGORIES: WorkCategory[] = [
    {
        id: "website-design",
        service: { label: "Website design and development", href: "/services/websites" },
        label: "Website Design",
        name: "Website",
        intro: "Websites and online stores, designed for desktop, tablet and phone and handed over as a build-ready system.",
        soon: "Website case studies are being written up.",
        projects: [
            project("mdrn-blk", "Skatewear e-commerce homepage, rebuilt for desktop, iPad and mobile around a sticker-bombed design system.", "mdrn-blk-website-reel.mp4", "mdrn-blk-website-preview.mp4"),
            project("naturally-white", "Eight-page teeth-whitening website built around one job: getting the visitor to book.", "naturally-white-website-reel.mp4", "naturally-white-website-reel-sm.mp4"),
            project("tuit-luxury-candle", "Luxury candle storefront with a calm, slow-burn design system for three screen sizes.", "tuit-candle-website-reel.mp4", "tuit-candle-website-preview.mp4")
        ]
    },
    {
        id: "mobile-app",
        service: { label: "Mobile app design", href: "/services/mobile-app" },
        label: "Mobile App",
        name: "Mobile app",
        intro: "iOS and Android apps, from first flows to the screens a developer can build from.",
        soon: "Our mobile app case studies are being written up.",
        projects: []
    },
    {
        id: "branding",
        service: { label: "Brand identity", href: "/services/brand-identity" },
        label: "Branding",
        name: "Branding",
        intro: "Identities, logos and the visual systems that carry them across product and marketing.",
        soon: "Our branding case studies are being written up.",
        projects: []
    },
    {
        id: "saas-product",
        service: { label: "SaaS product design", href: "/services/saas-products" },
        label: "SaaS Product",
        name: "SaaS product",
        intro: "Dashboards and web apps for startups, designed around the workflows people repeat every day.",
        soon: "Our SaaS product case studies are being written up.",
        projects: []
    },
    {
        id: "game-design",
        service: { label: "Game design", href: "/services/game-design" },
        label: "Game Design",
        name: "Game design",
        intro: "Learning and casual games, from game loop and levels to the interface around them.",
        soon: "Our game design case studies are being written up.",
        projects: []
    }
];

export const WORK_COUNT = WORK_CATEGORIES.reduce((n, c) => n + c.projects.length, 0);

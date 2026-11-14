// Naturally White case study: every word and number on the page.
//
// Source: Figma file XrSiLLpbOI4fPG4A771F2e, page "Naturely White" (442:64487):
// the homepage and inner pages at 1920 and 440, the component section, and the
// Behance board (503:2260) for the brand description, palette and type notes.
// Figures are counts from that file (8 desktop pages, 12 homepage sections,
// 8 components…), not performance claims; the site has no results data.
//
// In titles, *asterisks* mark the one word set in the italic serif, the way
// the brand's own headlines do it.

const IMG = "/assets/images/work/naturally-white";

export const NW = {
    slug: "naturally-white",
    path: "/portfolio/naturally-white",
    client: "Naturally White",
    clientShort: "Naturally White",
    category: "Website design",
    year: "2026",
    published: "2026-11-14",

    seoTitle: "Naturally White teeth whitening web design",
    seoDescription:
        "Case study: the Naturally White teeth whitening website. Eight pages designed for desktop and mobile, with a pastel design system built around booking.",

    hero: {
        kicker: "Website design, 2026",
        title: ["Brighter,", "shade by *shade*"],
        titleFor: "for Naturally White",
        // The brand's own promise, from its "How we do it" section.
        shadeNote: "Lifts 3 to 12 shades",
        // Twelve tabs, the brand's pastels fading to white.
        shades: ["#B1E2E6", "#BDDFEE", "#C8DBF6", "#D1D5FD", "#D5E1FC", "#DAF0FB", "#E5EDFA", "#F0EAF9", "#FAE8F8", "#FCF0FA", "#FDF8FD", "#FFFFFF"],
        intro: "Naturally White lifts smiles three to twelve shades. We designed its website to do the same for the brand: eight pages, on desktop and mobile, that make it easy to pick a treatment, find a studio and book.",
        meta: [
            { label: "Role", value: "UI/UX design, art direction" },
            { label: "Scope", value: "8 pages, responsive system, UI kit" },
            { label: "Screens", value: "Desktop 1920, mobile 440" },
            { label: "Tools", value: "Figma auto layout, variables, components" }
        ],
        byline: { name: "Wajahat Sheikh", role: "Head of Product Design", date: "November 2026" }
    },

    cover: {
        src: `${IMG}/naturally-white-website-ipad-mockup.webp`,
        alt: "Naturally White homepage on an iPad resting on a teal ribbed sculpture",
        width: 1600,
        height: 1200
    },

    // The brand site's own marquee words.
    marquee: ["Instant results", "*No sensitivity*", "Smile", "*Naturally White*"],

    // One entry per chapter: its number and the ground it sits on. The shade
    // rail at the edge of the page is drawn from this list.
    chapters: [
        { no: "01", shade: "#D1D5FD" },
        { no: "02", shade: "#DAF0FB" },
        { no: "03", shade: "#FAE8F8" },
        { no: "04", shade: "#F4F1FE" },
        { no: "05", shade: "#F0F9FD" },
        { no: "06", shade: "#FDF6FC" },
        { no: "07", shade: "#FFFFFF" }
    ],

    brief: {
        no: "01",
        label: "The brief",
        title: "One site, from first look to *booked*",
        columns: [
            {
                title: "The brand",
                text: "Naturally White is a teeth-whitening and smile-care brand: in-studio whitening, at-home products and clear aligners, with studios from Houston Memorial to Dallas Lovers Lane."
            },
            {
                title: "The job",
                text: "One website where a visitor can explore treatments, shop the products, read real reviews, find the nearest studio and book an appointment, without the page ever feeling clinical."
            },
            {
                title: "The answer",
                text: "Eight pages designed at 1920 px and rebuilt at 440 px, drawn from one kit of eight components and a soft pastel palette, so every page feels like the same smile."
            }
        ],
        stats: [
            { value: 8, label: "Pages" },
            { value: 16, label: "Layouts" },
            { value: 2, label: "Screen sizes" },
            { value: 12, label: "Homepage sections" },
            { value: 8, label: "Components" }
        ]
    },

    phone: {
        src: `${IMG}/naturally-white-mobile-website-phone-mockup.webp`,
        alt: "Naturally White mobile homepage on a phone among clear glass crystals",
        width: 1600,
        height: 1200
    },

    look: {
        no: "02",
        label: "The look",
        title: "Soft pastels, *confident* contrast",
        sub: "Friendly, never clinical.",
        images: [
            {
                src: `${IMG}/naturally-white-before-after-page-ipad.webp`,
                alt: "Naturally White before and after results page on an iPad held in two hands",
                width: 1600,
                height: 1200
            },
            {
                src: `${IMG}/naturally-white-location-page-ipad-mockup.webp`,
                alt: "Naturally White Houston Memorial studio page on an iPad between glass panels",
                width: 1600,
                height: 1200
            }
        ],
        notes: [
            { name: "Colour", text: "Four airy pastels (lilac, blush, sky and aqua) set the mood. Black type and one warm star accent keep it legible." },
            { name: "Type", text: "Poppins carries every heading, label and paragraph. Juana Italic steps in for a single word in each headline to add warmth." },
            { name: "Imagery", text: "Real smiles, shade guides and studio photographs on aqua backdrops, so the proof is always on screen." }
        ]
    },

    page: {
        no: "03",
        label: "The homepage",
        title: "One scroll, *three* jobs",
        sub: "Twelve sections that take a visitor from curious to booked.",
        src: `${IMG}/naturally-white-teeth-whitening-homepage-full.webp`,
        alt: "Full Naturally White homepage design, from the hero and client reviews to services, shop, studio locations and footer",
        width: 1024,
        height: 5643,
        // 16px-wide preview shown while the full page loads (sharp, webp q40).
        blur: "data:image/webp;base64,UklGRoABAABXRUJQVlA4IHQBAADwBwCdASoQAFgAPuliqE2pJaQiNVgIASAdCUAVhm0WOxdqidQqI680S481njPdZxEjfLJANi9+u8vf65jyaYN/N9YzeFcB/OAA/usnT+YSh0RYKrhNJYk3W6hT9JZQUNS6wjr8bfIEK1DQbh8NTJrQrAIUXhQPv9l6KEB0iIXhdkSa/bTvlnWGCDXN2e76woWj/8ndi5zxJvI9G9zqmksr2hxx9cVfd9mK+Yz4UoAP4EAudZswPo7RN4CsHt2pgM33ClK/74PiZ0y6/oWcJiQDFfHyOsV5OaNIyftkAxHrieDXW1Ew7YwenXvpaNdft9wMRyGN7GEIBADFOljfpYAwP0TF4UAiYSS3h7ZnjNcPO5TDSdR5UFezHrWeya/KED9P//gvh0JThkvK9xgCr3ZR4q2w/qoshjgiXG0ncfLkgIf0YLj1qrPS0tp9BTwmwCgUeNkqr47FECofFi4LdpRAQ7+JFjXBK+GbpAU8sBIySNZqAAA=",
        // `from`: where each act starts, as a fraction of the page image's height.
        acts: [
            { range: "01", name: "Trust", text: "Hero, press logos and client reviews.", from: 0 },
            { range: "02", name: "Choose", text: "Services, how it works and the shop.", from: 0.247 },
            { range: "03", name: "Visit", text: "Studio locations, the gallery and the footer.", from: 0.676 }
        ]
    },

    system: {
        no: "04",
        label: "The system",
        title: "Seven colours, *two* typefaces",
        sub: "Every colour has one job.",
        shades: [
            { hex: "#D1D5FD", name: "Lilac", use: "Announcement bar, badges, price rows", dark: false },
            { hex: "#FAE8F8", name: "Blush", use: "Reviews, forms and visit sections", dark: false },
            { hex: "#DAF0FB", name: "Sky", use: "Buttons, footer and cards", dark: false },
            { hex: "#B1E2E6", name: "Aqua", use: "Banners and photo backdrops", dark: false },
            { hex: "#000000", name: "Ink", use: "Text and icons", dark: true },
            { hex: "#FFFFFF", name: "White", use: "Surfaces", dark: false },
            { hex: "#FE9330", name: "Star", use: "Ratings accent", dark: false }
        ],
        type: {
            primary: { name: "Poppins", role: "Headings, labels and body", weights: "Regular, Medium, SemiBold" },
            accent: {
                name: "Juana Medium Italic",
                role: "One word in each headline",
                // The live headline, exported from the design, so the face shown is Juana itself.
                sample: {
                    src: `${IMG}/naturally-white-poppins-juana-headline.webp`,
                    alt: "Uncover The Beauty Of A Natural Smile, set in Poppins with Beauty and Smile in Juana italic",
                    width: 847,
                    height: 338
                }
            }
        },
        // One component each, exported at its own size.
        parts: [
            {
                src: `${IMG}/naturally-white-ui-review-card.webp`,
                alt: "Naturally White review card with a client photo, quote and five stars",
                width: 570,
                height: 276,
                name: "Review card",
                text: "Four tints, one layout."
            },
            {
                src: `${IMG}/naturally-white-ui-step-card.webp`,
                alt: "Naturally White step card: before and after photo beside the Instant Results promise",
                width: 780,
                height: 471,
                name: "Step card",
                text: "Photo, promise, action."
            },
            {
                src: `${IMG}/naturally-white-ui-product-card.webp`,
                alt: "Naturally White product card for the whitening bundle with a sale badge and prices",
                width: 431,
                height: 571,
                name: "Product card",
                text: "Sale badge, price, old price."
            }
        ]
    },

    pages: {
        no: "05",
        label: "The pages",
        title: "Every page, one *family*",
        sub: "Six more templates from the same kit.",
        items: [
            {
                name: "Houston Memorial",
                kind: "Studio page",
                text: "Hero, top-rated services, client reviews, before and after, FAQ and a visit-us block.",
                src: `${IMG}/naturally-white-page-houston-memorial.webp`,
                alt: "Naturally White Houston Memorial studio page hero with studio photos"
            },
            {
                name: "Dallas Lovers Lane",
                kind: "Studio page",
                text: "The same template with a second studio's photos and details.",
                src: `${IMG}/naturally-white-page-dallas-lovers-lane.webp`,
                alt: "Naturally White Dallas Lovers Lane studio page hero"
            },
            {
                name: "Services",
                kind: "Treatments",
                text: "Top-rated services, before and after results, and the questions people ask before booking.",
                src: `${IMG}/naturally-white-page-services.webp`,
                alt: "Naturally White services page hero"
            },
            {
                name: "Contact",
                kind: "Get in touch",
                text: "A short form and direct contact details, then a booking banner.",
                src: `${IMG}/naturally-white-page-contact.webp`,
                alt: "Naturally White contact page hero with the Say hello heading"
            },
            {
                name: "Locations",
                kind: "Studio finder",
                text: "Every studio in one grid, each with its own Book now.",
                src: `${IMG}/naturally-white-page-locations.webp`,
                alt: "Naturally White locations page hero"
            },
            {
                name: "Franchise",
                kind: "For partners",
                text: "Why franchise, what it costs and how to invest, ending in an enquiry form.",
                src: `${IMG}/naturally-white-page-franchise.webp`,
                alt: "Naturally White franchise page hero"
            }
        ],
        imageWidth: 1024,
        imageHeight: 439,
        overview: {
            src: `${IMG}/naturally-white-website-pages-overview.webp`,
            alt: "Isometric overview of Naturally White website pages: results, services, shop and locations",
            width: 1600,
            height: 1200
        }
    },

    mobile: {
        no: "06",
        label: "In the hand",
        title: "Rebuilt for the *thumb*",
        sub: "Every page has its own 440 px layout.",
        hint: "Swipe to see all five",
        phones: [
            { name: "Hero", src: `${IMG}/naturally-white-mobile-hero.webp`, alt: "Naturally White mobile homepage hero with the Book appointment button" },
            { name: "Reviews", src: `${IMG}/naturally-white-mobile-reviews.webp`, alt: "Naturally White mobile press logos and client review cards" },
            { name: "How it works", src: `${IMG}/naturally-white-mobile-how-it-works.webp`, alt: "Naturally White mobile how we do it section with a swipe row of step cards" },
            { name: "Shop", src: `${IMG}/naturally-white-mobile-shop.webp`, alt: "Naturally White mobile shop with whitening products in two columns" },
            { name: "Footer", src: `${IMG}/naturally-white-mobile-footer.webp`, alt: "Naturally White mobile gallery and footer with contact details" }
        ],
        phoneWidth: 440,
        phoneHeight: 820,
        specs: [
            { value: "24 px", label: "Side gutters" },
            { value: "44 px", label: "Tap targets" },
            { value: "40 px", label: "Headings" },
            { value: "16 px", label: "Body text" }
        ]
    },

    result: {
        no: "07",
        label: "The result",
        title: "Ready to *build*",
        points: [
            { title: "Eight pages, sixteen layouts", text: "Every page exists at 1920 px and at 440 px, so nothing about mobile is left to guesswork." },
            {
                title: "Sections with names",
                text: "Each page is a vertical stack of named bands (Nav, Hero, FAQ, Footer) in Figma auto layout, which maps straight to components in code."
            },
            { title: "One kit behind it", text: "Eight components and a shared set of colour variables: change a button or a tint once and every page follows." }
        ],
        image: {
            src: `${IMG}/naturally-white-website-desktop-screens.webp`,
            alt: "Three desktop monitors showing Naturally White results, services and studio pages",
            width: 1600,
            height: 489
        }
    },

    closing: {
        title: "Want a website that earns the *booking*?",
        text: "We design and build websites, products and brands for funded startups, on one monthly subscription.",
        links: [
            { label: "Website design and development", href: "/services/websites" },
            { label: "Brand identity", href: "/services/brand-identity" },
            { label: "Product design", href: "/services/product-design" }
        ]
    },

    card: {
        image: `${IMG}/naturally-white-website-design-thumbnail.webp`,
        video: "/assets/videos/work/naturally-white-website-preview.mp4"
    },

    og: { src: `${IMG}/naturally-white-website-case-study-og.jpg`, width: 1200, height: 630 }
} as const;

/** "One *word* here" → "One word here" (for metadata and schema). */
export const plain = (text: string) => text.replace(/\*/g, "");

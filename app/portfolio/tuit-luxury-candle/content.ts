// Tüit Luxury Candle Co. case study — every word and number on the page.
//
// Source: the Figma case study (file XrSiLLpbOI4fPG4A771F2e, frame 588:1030
// "Case Study v2 — Slow Burn"). Figures are counts from that file (12
// sections, 63 original layers, 21 text styles…), not performance claims; the
// page makes none. The FAQ answers are mirrored word for word into the FAQPage
// structured data (page.tsx), so edit them here.

const IMG = "/assets/images/work/tuit";

export const TUIT = {
    slug: "tuit-luxury-candle",
    path: "/portfolio/tuit-luxury-candle",
    client: "Tüit Luxury Candle Co.",
    clientShort: "Tüit",
    category: "E-commerce website",
    year: "2026",
    published: "2026-11-14",

    // <title> (the layout appends "| YourMomStudio") and meta description.
    seoTitle: "Tüit Luxury Candle e-commerce website design",
    seoDescription:
        "Case study: how we rebuilt Tüit Luxury Candle Co.'s desktop-only landing page as a responsive e-commerce storefront with a Figma design system for 3 screen sizes.",

    hero: {
        kicker: "E-commerce landing page, 2026",
        title: ["A slow-burn", "storefront"],
        titleFor: "for Tüit Luxury Candle Co.",
        intro: "Tüit sells candles that take their time. We rebuilt its desktop-only landing page as a responsive e-commerce storefront with a design system behind it, and kept the calm.",
        meta: [
            { label: "Role", value: "UI/UX design, art direction" },
            { label: "Scope", value: "Landing page, responsive system, UI kit" },
            { label: "Screens", value: "Desktop 1920, iPad 768, mobile 440" },
            { label: "Tools", value: "Figma auto layout, variables, components" }
        ],
        byline: { name: "Wajahat Sheikh", role: "Head of Product Design", date: "November 2026" }
    },

    cover: {
        src: `${IMG}/tuit-candle-website-ipad-mockup.webp`,
        alt: "Tüit Luxury Candle Co. website on an iPad resting on a terracotta bench",
        width: 1600,
        height: 1200
    },

    brief: {
        no: "No. 1",
        label: "The brief",
        title: "A brand that sells calm, stuck on one screen",
        columns: [
            {
                title: "The brief",
                text: "Tüit hand-pours coconut-wax candles with cotton wicks. The page had to feel like the product, warm and unhurried, while still selling best sellers, bundles, gift sets and journal posts on one scroll."
            },
            {
                title: "The problem",
                text: "The whole page lived in one 1920 px frame. All 63 layers were placed by hand, there was no tablet or mobile version, and every card and button was a one-off copy."
            },
            {
                title: "What we did",
                text: "We rebuilt all 12 sections in auto layout, designed iPad and mobile layouts from scratch, and moved colour, type and repeated parts into tokens and components."
            }
        ],
        stats: [
            { value: 12, label: "Sections" },
            { value: 3, label: "Screen sizes" },
            { value: 3, label: "Components" },
            { value: 21, label: "Text styles" },
            { value: 8, label: "Colour tokens" }
        ]
    },

    phone: {
        src: `${IMG}/tuit-candle-mobile-website-phone-mockup.webp`,
        alt: "Tüit mobile website on a phone leaning beside a ceramic vase of dried flowers",
        width: 1600,
        height: 1200
    },

    concept: {
        no: "No. 2",
        label: "The concept",
        title: "Designed like a fragrance",
        sub: "Every scent is built from three notes. So is this page.",
        notes: [
            {
                note: "Top note",
                name: "Calm",
                text: "Generous whitespace, one focal product per view and an even spacing rhythm let the eye slow down before it shops.",
                src: `${IMG}/tuit-candle-concept-calm.webp`,
                alt: "Lit sand-coloured Tüit candle on a rust book beside a glass ring"
            },
            {
                note: "Heart note",
                name: "Craft",
                text: "A hairline editorial serif over quiet Poppins, still-life photography and cards built from one reusable component.",
                src: `${IMG}/tuit-candle-concept-craft.webp`,
                alt: "Grey ceramic Tüit candle on a tan surface with a brass ornament"
            },
            {
                note: "Base note",
                name: "Glow",
                text: "Linen, sand and wax tones grounded by forest ink, so the flame stays the brightest thing on screen.",
                src: `${IMG}/tuit-candle-concept-glow.webp`,
                alt: "Lit grey stone Tüit candle on a marble ledge in soft daylight"
            }
        ]
    },

    page: {
        no: "No. 3",
        label: "The page",
        title: "One unhurried scroll",
        sub: "Twelve sections, hero to footer, each one a named auto-layout frame.",
        src: `${IMG}/tuit-candle-landing-page-full.webp`,
        alt: "Full Tüit Luxury Candle Co. landing page, from the Mood Serenity hero and best sellers to gifting, the journal and footer",
        width: 1200,
        height: 6915,
        // 16px-wide preview shown while the full page loads (sharp, webp q40).
        blur: "data:image/webp;base64,UklGRpQBAABXRUJQVlA4IIgBAACwBwCdASoQAFwAPuliqU2pJaQiMAqpIB0JYwDCD6mT8stOqQQXGIPn0olfemZpgAvjOaKeZxNIiEUV3glo9PGl/nM1KH2cAP7xEzZ4r+K4r99eSRem3ATvUYwrMWoiupERxhnI5U6jRNnGiO7/KziH9cQ6AddXuYJWijmdhgd22aMngYCT9Ezi0DdrYI66ew1xmUi6xiqFTtYYOi49QA+YPS6rjQiwNNuQL53SfYF1hjZbaGh9O5bQ30yPgmjPHQR0zTkwVyC/3eG0G3pXTwdMfJSFWuQa1Zfzysp99udJdK70IsxzdD5v+ZypVnh+a8nxWY562Ain9VxXPsD33k1QFfLq4uDFGBl4Gcqu37x2UcjXtg7wOhqjyUD0af026m7RnMjfA+xP5p0bLnd2iQfnkCmO2SNGdl5kjKyHBZSDPqqzzecOGLbQG2YsAS/qRx1qs2CZf5WUwMk3cNLGnroXmQ/5XXR7FH3BKAZhkOIzAh+bTaRYni3zZQ+mU6wo79yH9C4eJ8AAAA==",
        // The three acts of the scroll, and how far down the page each one starts.
        acts: [
            { range: "01 to 04", name: "Discover", text: "Hero, best sellers, press and the limited-time bundle.", from: 0 },
            { range: "05 to 07", name: "Browse", text: "Product categories, new arrivals and the Village Collection.", from: 0.31 },
            { range: "08 to 12", name: "Desire", text: "Reviews, gifting, the journal, social and the footer.", from: 0.64 }
        ]
    },

    system: {
        no: "No. 4",
        label: "The system",
        title: "A kit, not a collage",
        sub: "Six of the eight colour tokens, poured like wax. Three components, one set of rules.",
        jars: [
            { hex: "#EDE8E1", name: "Linen", token: "tuit/cream", use: "Page canvas", dark: false },
            { hex: "#E2DAC9", name: "Sand Wax", token: "tuit/sand", use: "Cards & panels", dark: false },
            { hex: "#E5DDD1", name: "Smoke", token: "tuit/stone", use: "Glow & chrome", dark: false },
            { hex: "#122B23", name: "Forest Wick", token: "tuit/ink", use: "Headlines", dark: true },
            { hex: "#000000", name: "Midnight", token: "tuit/black", use: "Body & CTAs", dark: true },
            { hex: "#FFBF1E", name: "Ember", token: "tuit/star", use: "Ratings", dark: false }
        ],
        kit: {
            src: `${IMG}/tuit-candle-ui-kit-components.webp`,
            alt: "Tüit UI kit: best seller and new arrival product cards, a journal card, and light and dark buttons",
            width: 1680,
            height: 764,
            title: "Components",
            count: "3 sets · 6 variants"
        }
    },

    screens: {
        no: "No. 5",
        label: "The screens",
        title: "One ritual, every screen",
        sub: "Rebuilt for each size, not resized.",
        src: `${IMG}/tuit-candle-responsive-website-devices.webp`,
        alt: "Tüit website hero shown on a desktop monitor, an iPad and a phone",
        width: 1600,
        height: 920,
        notes: [
            { name: "Desktop", px: "1920 px", text: "70 px margins, three and four product cards in a row, a 50/50 gifting split and an editorial category collage." },
            { name: "iPad", px: "768 px", text: "40 px margins. Best sellers become a swipe row, new arrivals a 2 by 2 grid, journal posts a horizontal list." },
            { name: "Mobile", px: "440 px", text: "24 px margins, 44 px tap targets, smaller display type and a dark gradient on photos so text stays readable." }
        ]
    },

    mobile: {
        no: "No. 6",
        label: "In the hand",
        title: "Made for the thumb",
        sub: "Five moments from the 440 px scroll.",
        src: `${IMG}/tuit-candle-mobile-website-screens.webp`,
        alt: "Five Tüit mobile screens: hero, best sellers, product categories, new arrivals and gifting",
        width: 1680,
        height: 960,
        hint: "Swipe to see all five"
    },

    result: {
        no: "No. 7",
        label: "The result",
        title: "Ready to build",
        points: [
            { title: "One system, three screens", text: "Desktop, iPad and mobile share the same tokens, text styles and components, so one change carries everywhere." },
            { title: "Built the way it will be coded", text: "Every section is a named auto-layout frame with fill and hug sizing, which maps straight to flex and grid." },
            { title: "The calm survived", text: "Whitespace, still-life photography and the warm palette hold at every size." }
        ],
        quote: "Crafting serenity and sophistication, one exquisite scent at a time.",
        quoteBy: "The brand line of Tüit, from Instagram @tuitcandleco",
        quoteHref: "https://www.instagram.com/tuitcandleco/"
    },

    closing: {
        title: "Want a storefront that feels like this?",
        text: "We design and build websites, products and brands for funded startups, on one monthly subscription.",
        links: [
            { label: "Website design and development", href: "/services/websites" },
            { label: "Brand identity", href: "/services/brand-identity" },
            { label: "Product design", href: "/services/product-design" }
        ]
    },

    // Work-list card (home page) and social share image.
    card: {
        image: `${IMG}/tuit-candle-website-design-thumbnail.webp`,
        video: "/assets/videos/work/tuit-candle-website-preview.mp4"
    },
    og: { src: `${IMG}/tuit-candle-website-case-study-og.jpg`, width: 1200, height: 630 }
} as const;

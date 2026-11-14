// MDRN BLK case study: every word and number on the page.
//
// Source: Figma file XrSiLLpbOI4fPG4A771F2e, page "MDRN Blk" (614:18775): the
// homepage rebuilt at 1920 / 768 / 440 (sections 01 to 03), the component kit
// (04), the Behance board (05) and the "YMS Case Study v2" frames (08). Figures
// are counts from that file (14 page bands, 3 screen sizes, 4 components, 30
// text styles, 10 colour tokens), not performance claims; the site has no
// results data.

const IMG = "/assets/images/work/mdrn-blk";

export const MB = {
    slug: "mdrn-blk",
    path: "/portfolio/mdrn-blk",
    client: "MDRN BLK",
    clientShort: "MDRN BLK",
    category: "E-commerce website",
    year: "2026",
    published: "2026-11-14",

    seoTitle: "MDRN BLK skatewear e-commerce website design",
    seoDescription:
        "Case study: the MDRN BLK skatewear e-commerce homepage, rebuilt in Figma auto layout for desktop, iPad and mobile with a sticker-bombed design system.",

    hero: {
        meta: ["Case study · MDRN BLK", "E-commerce homepage · Desktop / iPad / Mobile", "Yourmomstudio · 2026"],
        title: ["Drop", "in."],
        titleFor: "MDRN BLK skatewear e-commerce website",
        intro: "A homepage for MDRN BLK that shops like a session: quick to read, loud where it counts and easy on the thumb.",
        cue: "Scroll to drop in",
        byline: { name: "Wajahat Sheikh", role: "Head of Product Design", date: "November 2026" },
        desktop: { src: `${IMG}/mdrn-blk-homepage-hero-desktop.webp`, alt: "MDRN BLK homepage hero on desktop: Skate in style and comfort, with a model in beige cargo pants", width: 1920, height: 1005 },
        mobile: { src: `${IMG}/mdrn-blk-homepage-hero-mobile.webp`, alt: "MDRN BLK homepage hero on a phone", width: 880, height: 1900 },
        tapes: ["Skate in style and comfort", "New drop · Best sellers · Shop the look"]
    },

    // The tape bands that cross the page between chapters.
    tapes: {
        a: ["MDRN BLK skate", "Style up", "New drop"],
        b: ["Style up", "Skate in style", "Shop the look"]
    },

    // One sticker per chapter on the deck rail at the page edge.
    chapters: [
        { no: "01", colour: "#F6EB16", x: 18, y: 12, r: -12 },
        { no: "02", colour: "#EC078D", x: 62, y: 21, r: 9 },
        { no: "03", colour: "#71C043", x: 24, y: 31, r: 6 },
        { no: "04", colour: "#FFFFFF", x: 58, y: 41, r: -8 },
        { no: "05", colour: "#C8E4EB", x: 20, y: 51, r: 14 },
        { no: "06", colour: "#F6EB16", x: 60, y: 61, r: -5 },
        { no: "07", colour: "#EBE4DA", x: 26, y: 70, r: -14 },
        { no: "08", colour: "#EC078D", x: 62, y: 79, r: 7 },
        { no: "09", colour: "#71C043", x: 30, y: 88, r: -9 }
    ],

    brief: {
        no: "01",
        label: "The brief",
        title: "Same attitude. *Better structure.*",
        body: "MDRN BLK had a homepage with the right energy and the wrong build: one long canvas of absolutely positioned groups, no shared components and no layout for tablet or phone. The job was to keep the street voice, tighten the grid and turn every block into a responsive, reusable system. The logo, Poppins, the yellow highlight and the street photography all stayed.",
        facts: [
            { label: "Client", value: "MDRN BLK" },
            { label: "Industry", value: "Skatewear e-commerce" },
            { label: "Role", value: "UI/UX design, art direction" },
            { label: "Screens", value: "Desktop 1920 · iPad 768 · Mobile 440" },
            { label: "Delivered", value: "Auto-layout pages, tokens, UI kit" },
            { label: "Studio", value: "Yourmomstudio" }
        ],
        stats: [
            { value: 14, label: "Page bands" },
            { value: 3, label: "Screen sizes" },
            { value: 4, label: "Components" },
            { value: 30, label: "Text styles" },
            { value: 10, label: "Colour tokens" }
        ]
    },

    concept: {
        no: "02",
        label: "Concept",
        title: "Built like a *sticker-bombed* deck.",
        body: "Skaters label everything they own. The page does the same: tape stickers mark what is new, trending or on sale, highlight chips carry the promise in each headline, and a running tape band breaks the scroll like a rail between spots.",
        // Positions as % of a 1760 × 1000 board (from the Figma moodboard).
        photos: [
            { src: `${IMG}/mdrn-blk-skate-crew-moodboard.webp`, alt: "Four skaters with boards at a skatepark", width: 1100, height: 1046, x: 0, y: 4, w: 30.8, r: -2, sticker: { text: "Fall Collection Is Here", tone: "yellow", r: 4 } },
            { src: `${IMG}/mdrn-blk-sunglasses-portrait-moodboard.webp`, alt: "Portrait of a woman in yellow sunglasses", width: 894, height: 1100, x: 32.5, y: 9, w: 21.9, r: 3, sticker: { text: "New", tone: "pink", r: -8 } },
            { src: `${IMG}/mdrn-blk-downhill-skater-moodboard.webp`, alt: "Skater carving down a hillside road", width: 1100, height: 647, x: 55, y: 2, w: 34.8, r: 2, sticker: null },
            { src: `${IMG}/mdrn-blk-streetwear-model-moodboard.webp`, alt: "Model in a white tee and olive cargo pants", width: 1100, height: 819, x: 75.5, y: 36, w: 24.5, r: 3, sticker: { text: "Trending", tone: "green", r: 4 } },
            { src: `${IMG}/mdrn-blk-vintage-car-moodboard.webp`, alt: "Woman leaning on a vintage car in a graphic tee", width: 1100, height: 886, x: 31, y: 58, w: 29.5, r: -2, sticker: { text: "Best Seller", tone: "black", r: -5 } },
            { src: `${IMG}/mdrn-blk-group-walk-moodboard.webp`, alt: "Group of friends walking down a sunny street", width: 1100, height: 430, x: 59, y: 62, w: 26.5, r: 1, sticker: { text: "Sale", tone: "pink", r: 9 } }
        ],
        principles: [
            { title: "Loud labels", text: "Stickers say new, trending, best seller or sale. No extra banners needed." },
            { title: "One accent, one job", text: "Yellow highlights, pink promotes, green sorts. Every colour has a single role." },
            { title: "Thumb first", text: "Every product rail swipes on a phone and every photo stacks over its copy." }
        ]
    },

    grip: {
        no: "03",
        label: "Grip",
        title: "Grip.",
        body: "Six colours with one job each. Poppins Black Italic shouts, Space Mono whispers the details, and four components carry every state.",
        colours: [
            { name: "Yellow", hex: "#F6EB16", use: "Highlight · stickers · hover", ink: "#0B0B0B", r: -0.9 },
            { name: "Pink", hex: "#EC078D", use: "Promo · cart badge", ink: "#0B0B0B", r: 0.6 },
            { name: "Green", hex: "#71C043", use: "Category chips", ink: "#0B0B0B", r: -0.4 },
            { name: "Sky", hex: "#C8E4EB", use: "Hero ground", ink: "#0B0B0B", r: 0.8 },
            { name: "Sand", hex: "#EBE4DA", use: "Editorial ground", ink: "#0B0B0B", r: -0.7 },
            { name: "White", hex: "#FFFFFF", use: "Cards · surfaces", ink: "#0B0B0B", r: 0.5 }
        ],
        type: [
            { name: "Poppins Black Italic", use: "Headlines · chips · ticker" },
            { name: "Space Mono", use: "Labels · prices · meta" }
        ],
        stickers: [
            { text: "Fall Collection Is Here", tone: "yellow" },
            { text: "Sale", tone: "pink" },
            { text: "Trending", tone: "green" },
            { text: "Best Seller", tone: "white" }
        ]
    },

    line: {
        no: "04",
        label: "The line",
        title: "One line, *top to bottom.*",
        body: "Fourteen bands, one rhythm: loud hero, tape break, product rail, full-bleed photo, product rail, sale, the look, vitals, press, feed and footer. Every band is its own auto-layout frame, so the order can change without anything breaking.",
        src: `${IMG}/mdrn-blk-skatewear-homepage-desktop-full.webp`,
        alt: "Full MDRN BLK homepage design, from the hero and new drop to best sellers, the sale, shop the look, accessories, press and footer",
        width: 1200,
        height: 6136,
        // 16px-wide preview shown while the full page loads (sharp, webp q40).
        blur: "data:image/webp;base64,UklGRtABAABXRUJQVlA4IMQBAADQCQCdASoQAFIAPtlapk2oJaOiNVv8AQAbCWUAyVNtrwLqtStu/OU67VceC0F5zp6HfdMz/cRKd1FG24pSwW1t1ilrYmC+54q7rumNEr8RMht7fwnZGgAA/ueA+2u1ekCSUVlzlPOC48v72JDKXAAU3zv7ZKXFYVMSIqS36GH+ncwwMfY4PMruGpqduK3p3+run6EF88qKbfO8KsE3BfMUAuvvASWmn2aIkqnPH5rTpW11EqE+pXqw/OlQk/1C9STbOXvke2pt+cbtsocuN/MKtlF6Vd3fb7AWy4lmDtnQr7AqVs3ZKJxDoerL/xdTT/AGt6lyG7viadCvx9o",
        // `from`: where each act starts, as a fraction of the page image's height.
        acts: [
            { range: "01", name: "Hero → New drop", text: "Announcement bar, nav, the hero, the tape band and the new drop rail.", from: 0 },
            { range: "02", name: "Duo → Sale → Look", text: "Two full-bleed photos, best sellers, the 25% off band and shop the look.", from: 0.2306 },
            { range: "03", name: "Vitals → Footer", text: "Skate vitals, accessories, press, the feed and the wordmark footer.", from: 0.6151 }
        ]
    },

    dropIn: {
        no: "05",
        label: "Drop in",
        title: "Three seconds *to get it.*",
        body: "Sticker, headline, highlight, one button. You know what this shop sells before the thumb moves.",
        // Pins as % of the browser screen; notes and leaders as % of a 1760 × 676 stage.
        notes: [
            { no: "01", text: "Tape sticker sets the season", pin: { x: 4.66, y: 35.3 }, side: "left", y: 33.6, leader: { x: 13.86, w: 6.25 } },
            { no: "02", text: "Highlight chip carries the promise", pin: { x: 33.4, y: 55.7 }, side: "left", y: 51.9, leader: { x: 13.86, w: 25.17 } },
            { no: "03", text: "Outline type is texture, never content", pin: { x: 12.5, y: 92.6 }, side: "left", y: 85.1, leader: { x: 13.86, w: 11.42 } },
            { no: "04", text: "Cart badge in promo pink", pin: { x: 96.1, y: 6.1 }, side: "right", y: 7.4, leader: { x: 80.4, w: 5.74 } },
            { no: "05", text: "Hotspot shops the fit from the photo", pin: { x: 88.5, y: 92.6 }, side: "right", y: 85.1, leader: { x: 75.4, w: 10.74 } }
        ]
    },

    tricks: {
        no: "06",
        label: "Tricks",
        title: "Every tap *lands.*",
        body: "Hover lifts a card, outlines it in ink, slides in quick view and fills the bag button. Buttons flip to the yellow highlight. On touch, the same states show on press. Try them.",
        cards: [
            {
                name: "Flocky Denim Pants",
                price: "$220",
                sticker: "New",
                swatches: ["#0B0B0B", "#EBE4DA", "#C8E4EB"],
                src: `${IMG}/mdrn-blk-product-flocky-denim-pants.webp`,
                alt: "Flocky denim pants in washed grey, front view"
            },
            {
                name: "Cropped Denim Pants",
                price: "$170",
                sticker: "New",
                swatches: ["#0B0B0B", "#EBE4DA", "#C8E4EB"],
                src: `${IMG}/mdrn-blk-product-cropped-denim-pants.webp`,
                alt: "Cropped denim pants in mid blue, front view"
            }
        ],
        cardWidth: 840,
        cardHeight: 736,
        quickView: "Quick view · Sizes XS to XL",
        tapeNote: "Tape band · runs between rails, speeds up with your scroll"
    },

    stance: {
        no: "07",
        label: "Switch stance",
        title: "Same board, *any stance.*",
        body: "Desktop, iPad and phone each got their own layout, not a squeezed copy. Scroll and all three screens ride the same page.",
        screens: {
            desktop: { src: `${IMG}/mdrn-blk-skatewear-homepage-desktop-full.webp`, width: 1200, height: 6136, label: "Desktop · 1920" },
            ipad: { src: `${IMG}/mdrn-blk-skatewear-homepage-ipad-full.webp`, width: 768, height: 10743, label: "iPad · 768" },
            mobile: { src: `${IMG}/mdrn-blk-skatewear-homepage-mobile-full.webp`, width: 600, height: 12714, label: "Mobile · 440" }
        }
    },

    thumb: {
        no: "08",
        label: "Thumb first",
        title: "Built for *the thumb.*",
        body: "Product rails swipe, photos stack over their copy and every tap target is at least 44 px. Five stops on the 440 px scroll:",
        hint: "Swipe to see all five",
        // Five stops cut from the 440 px page (600 × 1333 each).
        phoneWidth: 600,
        phoneHeight: 1333,
        phones: [
            { label: "01 · Land", src: `${IMG}/mdrn-blk-mobile-01-land.webp`, alt: "MDRN BLK mobile hero with the Skate in style and comfort headline" },
            { label: "02 · Swipe the drop", src: `${IMG}/mdrn-blk-mobile-02-swipe-the-drop.webp`, alt: "MDRN BLK mobile new drop rail with product cards" },
            { label: "03 · Catch the sale", src: `${IMG}/mdrn-blk-mobile-03-catch-the-sale.webp`, alt: "MDRN BLK mobile 25% off sale band" },
            { label: "04 · Shop the look", src: `${IMG}/mdrn-blk-mobile-04-shop-the-look.webp`, alt: "MDRN BLK mobile shop the look carousel" },
            { label: "05 · Sign up", src: `${IMG}/mdrn-blk-mobile-05-sign-up.webp`, alt: "MDRN BLK mobile newsletter sign-up and footer" }
        ]
    },

    result: {
        no: "09",
        label: "The result",
        title: "Ready to *ship.*",
        points: [
            { title: "One system, three screens", text: "Desktop, iPad and mobile share the same tokens, text styles and components, so one change carries everywhere." },
            { title: "Built the way it will be coded", text: "Every band is a named auto-layout frame with fill and hug sizing, which maps straight to flex and grid." },
            { title: "The attitude survived", text: "The stickers, the yellow highlight and the street photography hold at every size." }
        ]
    },

    closing: {
        title: "Want a storefront with *this much attitude?*",
        sticker: "See you at the next drop",
        links: [
            { label: "Website design and development", href: "/services/websites" },
            { label: "Brand identity", href: "/services/brand-identity" },
            { label: "Product design", href: "/services/product-design" }
        ]
    },

    next: { label: "Next case study", title: "Tüit Luxury Candle Co.", href: "/portfolio/tuit-luxury-candle" },

    card: {
        image: `${IMG}/mdrn-blk-website-design-thumbnail.webp`,
        video: "/assets/videos/work/mdrn-blk-website-preview.mp4"
    },

    og: { src: `${IMG}/mdrn-blk-website-case-study-og.jpg`, width: 1200, height: 630 }
} as const;

/** "One *phrase* here" → "One phrase here" (for metadata and schema). */
export const plain = (text: string) => text.replace(/\*/g, "");

// Squat Smart case study: every word, number and image on the page.
//
// Sources: the live store at squatsmart.com (product facts, rating, reviews,
// FAQ) and the Figma file XrSiLLpbOI4fPG4A771F2e, page "Squat Smart": the
// approved design rebuilt at 1920 / 768 / 440, the rejected direction, the
// component kit and the Behance board. No sales or conversion figures: the
// client has not shared any, so the page claims none.

const IMG = "/assets/images/work/squat-smart";

export const SS = {
    slug: "squat-smart",
    path: "/portfolio/squat-smart",
    client: "Squat Smart",
    category: "Shopify store",
    year: "2026",
    published: "2026-11-15",

    seoTitle: "Squat Smart Shopify store case study",
    seoDescription:
        "Case study: landing page and product page for Squat Smart, an at-home squat mat with guided foot zones. Two directions, one approved, built and live on Shopify.",

    hero: {
        meta: ["Case study · Squat Smart", "Landing page + product page · Shopify", "YourMomStudio · 2026"],
        title: ["Find your", "stance."],
        titleFor: "Squat Smart Shopify store",
        intro: "Squat Smart makes a training mat printed with A, B and C foot zones that guide your squat. We designed its landing page and product page in two directions, the client approved one, and we built it on Shopify.",
        cue: "Scroll to squat",
        byline: { name: "Wajahat Sheikh", role: "Head of Product Design", date: "November 2026" },
        desktop: { src: `${IMG}/ss-hero-desktop.webp`, alt: "Squat Smart homepage hero: Better form. Stronger glutes., a woman in lilac activewear sitting beside the training mat", width: 1920, height: 1080 },
        mobile: { src: `${IMG}/ss-mobile-05-pdp.webp`, alt: "Squat Smart product page on a phone with the gallery, rating and price", width: 660, height: 1428 },
        live: "https://squatsmart.com"
    },

    // One zone per chapter on the rail at the page edge.
    chapters: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],

    brief: {
        no: "01",
        label: "The brief",
        title: "A mat that fixes your squat needed a store that *explains it fast.*",
        body: "Most Squat Smart buyers are beginners training at home: unsure their form is right, and some have already felt it in their knees. The store had to explain the three zones in seconds, show real people using the mat, and make Add to Cart feel like the obvious next rep.",
        facts: [
            { label: "Client", value: "Squat Smart" },
            { label: "Industry", value: "Fitness · direct to consumer" },
            { label: "Role", value: "Art direction, UX/UI, Shopify build" },
            { label: "Pages", value: "Landing page · Product page" },
            { label: "Screens", value: "Desktop 1920 · iPad 768 · Mobile 440" },
            { label: "Status", value: "Live on Shopify" }
        ],
        stats: [
            { value: 4.7, decimals: 1, suffix: "", label: "Average rating from 10,656 verified reviews" },
            { value: 10, decimals: 0, prefix: "5 to ", suffix: "", label: "Minutes a day is all the routine asks for" },
            { value: 3, decimals: 0, suffix: "", label: "Foot zones: A glutes, B quads, C inner thigh" },
            { value: 2, decimals: 0, suffix: " → 1", label: "Directions presented, one approved" }
        ]
    },

    directions: {
        no: "02",
        label: "Two directions",
        title: "Two stances. *One winner.*",
        body: "We took the homepage to the client in two complete directions. Drag the handle to compare them. The client approved B, and B is what we built and shipped.",
        a: { tag: "A · Train Smarter, Not Harder", text: "Neon lime and sun yellow, gym-floor energy, oversized type.", src: `${IMG}/ss-direction-a.webp`, alt: "Direction A: Train smarter, not harder in huge white type over a neon lime and yellow homepage" },
        b: { tag: "B · Better Form. Stronger Glutes.", text: "Soft blush, studio light, one clear blue action. Approved.", src: `${IMG}/ss-direction-b.webp`, alt: "Direction B: Better form. Stronger glutes. on a soft blush homepage with a woman beside the mat" }
    },

    foundations: {
        no: "03",
        label: "Foundations",
        title: "Soft studio light. *Hard-working type.*",
        body: "Blush and rose carry the calm of a home workout, coral marks every star and check, and one blue does all the selling. Tap a colour to copy it.",
        colours: [
            { name: "Blush", hex: "#F9ECED", use: "Backgrounds" },
            { name: "Rose", hex: "#FFC1C1", use: "Tags, sale bars" },
            { name: "Coral", hex: "#FF6D6D", use: "Stars, checks" },
            { name: "Sky", hex: "#00ADFA", use: "The one action" },
            { name: "Night", hex: "#1A1A1C", use: "Activation band" },
            { name: "Ink", hex: "#000000", use: "Type, press bar" }
        ],
        type: {
            display: "Evogria sets every headline in tight, athletic capitals.",
            text: "SF Pro keeps product facts and reviews easy to read.",
            hero: { src: `${IMG}/ss-type-evogria-hero.webp`, alt: "Better form. Stronger glutes. set in Evogria", width: 1348, height: 270 },
            section: { src: `${IMG}/ss-type-evogria-section.webp`, alt: "One pad. Total control. Maximum results. set in Evogria", width: 1004, height: 184 }
        }
    },

    zones: {
        no: "04",
        label: "The zone system",
        title: "The mat became *the grid.*",
        body: "The A, B and C zones printed on the mat run through the whole site: zone tags on How It Works, lettered markers on the product photos, numbered benefit cards. Scroll the stage or pick a zone.",
        diagram: { src: `${IMG}/ss-mat-diagram.webp`, alt: "The Squat Smart mat seen from above, with footprints in zones A, B and C", width: 1216, height: 580 },
        map: { src: `${IMG}/ss-muscle-map.webp`, alt: "Front and back views of a squat with markers A, B and C on the thighs and glutes", width: 1245, height: 1050 },
        list: [
            { id: "A", name: "Glute Activation", stance: "Wide stance", text: "Wide stance placement maximizes glute engagement for powerful lower body development.", muscle: "Gluteal muscle group (gluteus maximus)" },
            { id: "B", name: "Quad Focus", stance: "Center stance", text: "Center placement targets quadriceps for balanced strength and muscle definition.", muscle: "Anterior thigh muscle group (quadriceps femoris)" },
            { id: "C", name: "Inner Thigh", stance: "Narrow stance", text: "Narrow stance activates inner thighs for complete leg sculpting and stability.", muscle: "Medial thigh muscle group (adductor muscles)" }
        ]
    },

    kit: {
        no: "05",
        label: "Live UI",
        title: "Not screenshots. *Try the parts.*",
        body: "The product card, buttons and FAQ below are the real components, rebuilt in code. Pick a colour, hover a button, add to cart, open a question.",
        mats: [
            { id: "blush", label: "Blush", swatch: "#F1DFE2", src: `${IMG}/ss-mat-blush.webp`, alt: "Blush Squat Smart mat with pink footprints" },
            { id: "sand", label: "Sand", swatch: "#D9C9A8", src: `${IMG}/ss-mat-sand.webp`, alt: "Sand Squat Smart mat with brown footprints" },
            { id: "black", label: "Midnight", swatch: "#141414", src: `${IMG}/ss-mat-midnight.webp`, alt: "Black Squat Smart mat with white footprints" }
        ],
        price: "$37.97",
        faq: [
            { q: "Is it truly portable?", a: "Yes. The Squat Smart Training Mat rolls up to a compact 6-inch diameter and weighs less than 3 lbs. It fits into any standard gym bag or carry-on." },
            { q: "What exercises can I do with Squat Smart?", a: "Squats, sumo squats, goblet squats, bodyweight squats, and other lower-body exercises that benefit from proper foot positioning." }
        ]
    },

    pages: {
        no: "06",
        label: "Two pages",
        title: "Two pages, one flow *from scroll to cart.*",
        body: "Home earns trust in order: press, product, the zone system, benefits, science, video reviews and community posts. The product page puts gallery, proof and buy box side by side. Scroll inside each page.",
        home: { label: "Home page · 1920", src: `${IMG}/ss-page-home-full.webp`, alt: "The full Squat Smart homepage from hero to footer", width: 826, height: 3884 },
        product: { label: "Product page · 1920", src: `${IMG}/ss-page-product-full.webp`, alt: "The full Squat Smart product page from gallery to footer", width: 807, height: 3949 }
    },

    details: {
        no: "07",
        label: "Details",
        title: "Built for *every rep.*",
        crops: [
            { src: `${IMG}/ss-detail-buy-box.webp`, w: 1728, h: 1205, alt: "Product page gallery beside a buy box with price, colours, sale bar, Add to Cart and payment split", caption: "A buy box that answers price, colour, payment and shipping in one glance", wide: true },
            { src: `${IMG}/ss-detail-activation.webp`, w: 1728, h: 767, alt: "Dark band with a woman squatting on the mat and four callouts: confidence in form, glute activation, knee alignment, core engagement", caption: "Anatomy turned into four reasons to buy", wide: true },
            { src: `${IMG}/ss-detail-benefits.webp`, w: 1600, h: 691, alt: "Three tall photo cards: Improve your form, Protect your knees, Train with confidence", caption: "Benefit cards, numbered like the zones" },
            { src: `${IMG}/ss-detail-video-reviews.webp`, w: 1600, h: 618, alt: "Row of video review tiles with play buttons, stars and verified ticks", caption: "Video reviews before written ones" },
            { src: `${IMG}/ss-detail-testimonials.webp`, w: 1600, h: 619, alt: "Three testimonial cards in blush with names, quotes and stars", caption: "Real customer words, real names" },
            { src: `${IMG}/ss-detail-faq.webp`, w: 1400, h: 608, alt: "FAQ list with rose question bars and the first answer open", caption: "The last doubts, answered before the footer" }
        ]
    },

    responsive: {
        no: "08",
        label: "Responsive",
        title: "Same stance on *every screen.*",
        body: "Every section was rebuilt in auto layout at 1920, 768 and 440. Rows become 2-up grids or swipe carousels, buttons go full width on phones, and the header folds into menu, logo, search and cart.",
        desktop: { src: `${IMG}/ss-product-desktop.webp`, alt: "Squat Smart product page on desktop", width: 1920, height: 1080 },
        ipad: { src: `${IMG}/ss-ipad-home.webp`, alt: "Squat Smart homepage on iPad", width: 900, height: 1200 },
        phone: { src: `${IMG}/ss-mobile-01-home.webp`, alt: "Squat Smart homepage on a phone", width: 660, height: 1428 }
    },

    phone: {
        no: "09",
        label: "On the phone",
        title: "Thumb-first, all the way *to checkout.*",
        hint: "Drag or swipe through all eight",
        phones: [
            { label: "Home", src: `${IMG}/ss-mobile-01-home.webp`, alt: "Homepage hero on a phone" },
            { label: "Shop", src: `${IMG}/ss-mobile-02-products.webp`, alt: "Product grid on a phone, two mats per row" },
            { label: "Zones", src: `${IMG}/ss-mobile-03-hiw.webp`, alt: "How Squat Smart works on a phone with zone tags" },
            { label: "Activation", src: `${IMG}/ss-mobile-04-rep.webp`, alt: "Built for every rep band on a phone with callouts" },
            { label: "Product", src: `${IMG}/ss-mobile-05-pdp.webp`, alt: "Product page gallery and title on a phone" },
            { label: "Buy box", src: `${IMG}/ss-mobile-06-buy.webp`, alt: "Colours, sale bar and full-width Add to Cart on a phone" },
            { label: "Reviews", src: `${IMG}/ss-mobile-07-reviews.webp`, alt: "Verified reviews grid on a phone" },
            { label: "FAQ", src: `${IMG}/ss-mobile-08-faq.webp`, alt: "Frequently asked questions on a phone" }
        ]
    },

    launch: {
        no: "10",
        label: "Launch",
        title: "Approved. Built. *Live on Shopify.*",
        steps: [
            { no: "01", title: "Two directions", text: "Homepage and product page designed in two complete visual directions." },
            { no: "02", title: "Client approval", text: "The client approved Direction B: soft blush, studio light, one blue action." },
            { no: "03", title: "Shopify build", text: "We developed the approved pages on Shopify, section by section." },
            { no: "04", title: "Live", text: "squatsmart.com is live with the training mat, the training system upsell and reviews." }
        ]
    },

    closing: {
        title: "Want a store that *sells the stance?*",
        links: [
            { label: "Website design and development", href: "/services/websites" },
            { label: "Product design", href: "/services/product-design" },
            { label: "Brand identity", href: "/services/brand-identity" }
        ]
    },

    og: { src: `${IMG}/squat-smart-website-case-study-og-v2.jpg`, width: 1200, height: 630 }
} as const;

/** "One *phrase* here" → "One phrase here" (for metadata and schema). */
export const plain = (text: string) => text.replace(/\*/g, "");

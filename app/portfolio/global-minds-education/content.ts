// Global Minds Education case study: every word and number on the page.
//
// Source: Figma file XrSiLLpbOI4fPG4A771F2e, page "Global Minds Education"
// (665:4833): the seven pages rebuilt at 1440 / 768 / 440 (sections 01 to 03),
// the component kit (00), the Behance board (04) and the YMS case study frames
// (09). Figures are counts from that file (7 pages, 3 screen sizes, 21 page
// frames, 31 colour tokens, 48 text styles), not performance claims; the site
// has no results data yet.

const IMG = "/assets/images/work/global-minds-education";

export const GME = {
    slug: "global-minds-education",
    path: "/portfolio/global-minds-education",
    client: "Global Minds Education",
    clientShort: "Global Minds",
    category: "Education website",
    year: "2026",
    published: "2026-11-15",

    seoTitle: "Global Minds Education online university website design",
    seoDescription:
        "Case study: a seven-page website for Global Minds Education, an online university partner, rebuilt in Figma auto layout for desktop, iPad and mobile around the logo's pinwheel.",

    hero: {
        meta: ["Case study · Global Minds Education", "Seven-page website · Desktop / iPad / Mobile", "YourMomStudio · 2026"],
        title: ["Study abroad,", "from home."],
        titleFor: "Global Minds Education website",
        intro: "Global Minds Education connects students in the UAE and Pakistan with degrees from universities in the UK, Switzerland and the US. We rebuilt their website so it works the way those students browse: on a phone.",
        cue: "Scroll to board",
        byline: { name: "Wajahat Sheikh", role: "Head of Product Design", date: "November 2026" },
        desktop: { src: `${IMG}/gme-homepage-hero-desktop.webp`, alt: "Global Minds Education homepage hero: Building global minds for a better tomorrow, over a collage of campus photos", width: 1920, height: 1114 },
        mobile: { src: `${IMG}/gme-mobile-01-home.webp`, alt: "Global Minds Education homepage on a phone", width: 660, height: 1400 },
        pass: [
            { label: "Passenger", value: "Every student" },
            { label: "Flight", value: "GME 2026" },
            { label: "Gate", value: "Online" },
            { label: "Seat", value: "Anywhere" },
            { label: "Class", value: "Bachelor's to PhD" },
            { label: "Boarding", value: "Any intake" }
        ]
    },

    // One stamp per chapter on the flight rail at the page edge.
    chapters: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],

    brief: {
        no: "01",
        label: "The brief",
        title: "Seven pages, built for *one screen size.*",
        body: "The site sold flexible, study-anywhere degrees, but the design only worked on a 1440 desktop. Every page was placed by hand, buttons came in five colours, and there was no tablet or phone layout for the students most likely to visit on a phone. The job: keep the content and the brand, and give it a system that travels.",
        facts: [
            { label: "Client", value: "Global Minds Education" },
            { label: "Industry", value: "Online higher education" },
            { label: "Role", value: "UI/UX design, art direction" },
            { label: "Screens", value: "Desktop 1440 · iPad 768 · Mobile 440" },
            { label: "Delivered", value: "7 auto-layout pages, tokens, UI kit" },
            { label: "Studio", value: "YourMomStudio" }
        ],
        stats: [
            { value: 7, label: "Pages" },
            { value: 3, label: "Screen sizes" },
            { value: 21, label: "Page frames" },
            { value: 31, label: "Colour tokens" },
            { value: 48, label: "Text styles" }
        ]
    },

    itinerary: {
        no: "02",
        label: "The itinerary",
        title: "Told as *a journey.*",
        body: "The students never board a plane, so the project borrowed the language of one: a brief as an itinerary, components as a boarding kit, pages as destinations and screen sizes as layovers.",
        legs: [
            { code: "DEP", step: "Departure", text: "An audit of seven desktop-only pages" },
            { code: "CHK", step: "Check-in", text: "One set of colour, type and spacing tokens" },
            { code: "BRD", step: "Boarding", text: "Every shared block turned into a component" },
            { code: "LAY", step: "Layovers", text: "iPad 768 and mobile 440, composed, not squeezed" },
            { code: "ARR", step: "Arrival", text: "21 auto-layout frames, ready for development" }
        ]
    },

    changes: {
        no: "03",
        label: "What changed",
        title: "Three things we fixed *before the copy.*",
        items: [
            { petal: "orange", title: "Five button colours became one hierarchy.", text: "Orange is the main action, blue the trusted second step, and yellow stays on course cards only. Every button has rest, hover and pressed states." },
            { petal: "blue", title: "Random triangles became the logo's petals.", text: "The shapes scattered across the old pages now come from the pinwheel in the logo, so every accent points back to the brand." },
            { petal: "green", title: "One desktop layout became three.", text: "Carousels stack, tables turn into chips, and the long course page gets a jump menu on the phone." }
        ]
    },

    foundations: {
        no: "04",
        label: "Foundations",
        title: "The logo's pinwheel, *taken apart.*",
        body: "Eight petals from the mark became the accent system. Each colour has one job, so the page never looks like a paint box.",
        tags: [
            { name: "gme/orange", hex: "#FF6800", role: "Main action" },
            { name: "gme/blue", hex: "#008CFF", role: "Second step" },
            { name: "gme/sun", hex: "#FFA133", role: "Brand band" },
            { name: "gme/navy", hex: "#042540", role: "Hero ground" },
            { name: "gme/cream", hex: "#FFF6EF", role: "Paper" },
            { name: "gme/yellow", hex: "#FFB600", role: "Enrol only" },
            { name: "gme/green", hex: "#00C667", role: "Price, success" },
            { name: "gme/ink", hex: "#181818", role: "Text" }
        ],
        type: [
            { family: "Inter", role: "Headings, body, buttons", sample: "Aa" },
            { family: "IBM Plex Mono", role: "Labels, prices, codes", sample: "Aa" }
        ]
    },

    kit: {
        no: "05",
        label: "Boarding kit",
        title: "Every shared piece is a component, *every state drawn.*",
        body: "Header, footer, testimonials and the advisor form are shared blocks with desktop, iPad and phone versions, so a change in one place reaches all 21 frames.",
        images: [
            { src: `${IMG}/gme-component-kit-buttons-cards.webp`, alt: "Global Minds Education UI kit: orange, blue, outline and yellow buttons in rest, hover and pressed states, a course card, a stat card, an FAQ item and a select input", width: 1600, height: 0 },
            { src: `${IMG}/gme-component-kit-testimonial-partner.webp`, alt: "Global Minds Education testimonial card and partner card for London Business School", width: 1600, height: 0 }
        ]
    },

    destinations: {
        no: "06",
        label: "Destinations",
        title: "Seven pages. *One passport.*",
        body: "Every page keeps the same header, footer, testimonials and advisor form, so a student always knows where they are.",
        hint: "Swipe through all seven",
        pages: [
            { code: "GME", label: "Home", file: "home" },
            { code: "ABT", label: "About us", file: "about" },
            { code: "ALM", label: "Alumni", file: "alumni" },
            { code: "PRG", label: "Programs", file: "programs" },
            { code: "CRS", label: "Course", file: "course" },
            { code: "PTN", label: "Partners", file: "partners" },
            { code: "CNT", label: "Contact", file: "contact" }
        ]
    },

    firstScreen: {
        no: "07",
        label: "The first screen",
        title: "Know where you are in *three seconds.*",
        notes: [
            { pin: "1", x: 50, y: 42, text: "A navy scrim over the campus collage keeps the headline readable on every photo." },
            { pin: "2", x: 44, y: 70, text: "One orange action, one quiet secondary. The old page had both in competing colours." },
            { pin: "3", x: 50, y: 92, text: "Accreditations lifted onto a card at the fold, so trust shows before the first scroll." }
        ]
    },

    flight: {
        no: "08",
        label: "Flight path",
        title: "Browse, compare, apply. *Three screens.*",
        steps: [
            { code: "PRG", step: "Browse", text: "All programs, filtered by level", src: `${IMG}/gme-programs-page-desktop.webp`, alt: "Global Minds Education diploma programs page with filter tabs and course cards" },
            { code: "CRS", step: "Compare", text: "A course page with a jump menu", src: `${IMG}/gme-course-page-desktop.webp`, alt: "BSc (Hons) Computing course page with price, award, mode and duration" },
            { code: "ADV", step: "Apply", text: "An advisor form with three fields", src: `${IMG}/gme-advisor-form-desktop.webp`, alt: "Talk to our academic advisors form beside an illustrated student" }
        ]
    },

    layovers: {
        no: "09",
        label: "Layovers",
        title: "Three layovers. *One system.*",
        sizes: "1440 · 768 · 440",
        desktop: { src: `${IMG}/gme-homepage-desktop.webp`, alt: "Global Minds Education homepage on desktop" },
        ipad: { src: `${IMG}/gme-homepage-ipad.webp`, alt: "Global Minds Education homepage on iPad" }
    },

    phone: {
        no: "10",
        label: "On the phone",
        title: "Most students arrive on a phone. *So we started there.*",
        hint: "Swipe to see all five",
        phones: [
            { label: "Home", src: `${IMG}/gme-mobile-01-home.webp`, alt: "Global Minds Education homepage on a phone" },
            { label: "Programs", src: `${IMG}/gme-mobile-02-programs.webp`, alt: "Diploma programs page on a phone with filter chips and a course card" },
            { label: "Course", src: `${IMG}/gme-mobile-03-course.webp`, alt: "BSc (Hons) Computing course page on a phone with stacked buttons" },
            { label: "Partners", src: `${IMG}/gme-mobile-04-partners.webp`, alt: "Our partners page on a phone with a fan of campus photos" },
            { label: "Contact", src: `${IMG}/gme-mobile-05-contact.webp`, alt: "Contact page on a phone with the advisor team collage" }
        ]
    },

    details: {
        no: "11",
        label: "Details",
        title: "Small pieces that *carry the brand.*",
        crops: [
            { src: `${IMG}/gme-detail-faq-panel.webp`, alt: "FAQ as a dark split panel with the first answer open", caption: "FAQ as a split panel, first answer open", petal: "orange" },
            { src: `${IMG}/gme-detail-course-page.webp`, alt: "Course page with an On this page menu and numbered sections", caption: "Course page: jump menu, numbered sections, role chips", petal: "blue" },
            { src: `${IMG}/gme-detail-footer-cta.webp`, alt: "Dark footer that opens with a Ready to earn an internationally recognised degree call to action", caption: "Footer opens with one clear next step", petal: "green" },
            { src: `${IMG}/gme-detail-course-cards.webp`, alt: "Featured course cards with price chips, degree and duration", caption: "Course cards with price, degree and length", petal: "purple" }
        ]
    },

    result: {
        label: "What we delivered",
        title: "A website that travels, and *a system that keeps it that way.*",
        points: [
            { title: "Seven pages, three screens", text: "Home, About, Alumni, Programs, Course, Partners and Contact, each composed for desktop, iPad and phone." },
            { title: "Shared blocks, one source", text: "Header, footer, testimonials and the advisor form are components, so one edit reaches all 21 frames." },
            { title: "Built the way it will be coded", text: "Named auto-layout frames with fill and hug sizing, colour tokens and a type scale per screen size, ready to hand to developers." }
        ]
    },

    closing: {
        title: "Want a website students *can use on a phone?*",
        links: [
            { label: "Services we offer", href: "/#services" }
        ]
    },

    og: { src: `${IMG}/gme-website-case-study-og.jpg`, width: 1200, height: 630 }
} as const;

/** "One *phrase* here" → "One phrase here" (for metadata and schema). */
export const plain = (text: string) => text.replace(/\*/g, "");

// Single source of truth for site-wide facts: SEO metadata, structured data,
// CTAs and the footer all read from here, so a change is made once.
//
// Environment overrides (set them per deployment, see .env.example):
//   NEXT_PUBLIC_SITE_URL     production origin, used for canonical + Open Graph URLs
//   NEXT_PUBLIC_BOOKING_URL  where every "Book a call" goes (Calendly, Cal.com, HubSpot…)
//   NEXT_PUBLIC_GA_ID        Google Analytics 4 measurement ID (defaults to the YMS property)
//   NEXT_PUBLIC_GTM_ID       Google Tag Manager container for ad conversions
//   GOOGLE_SITE_VERIFICATION Google Search Console HTML-tag verification code

const EMAIL = "hello@yourmomstudio.com";

export const SITE = {
    name: "YourMomStudio",
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourmomstudio.com").replace(/\/$/, ""),
    locale: "en_US",

    // <title> and meta description for the home page — ~60 / ~155 characters.
    title: "MVP Design & Development on Monthly Subscription | YourMomStudio",
    description:
        "A full product team for funded startups: product design, web and mobile development and QA every week, from $3,999/month. Pause or cancel anytime.",

    email: EMAIL,

    // Every "Book a call" goes here. A Calendly link opens in the on-page
    // booking modal (app/Components/BookingModal); anything else is a plain link.
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com/yourmomstudio/business-meeting",

    // Google Analytics 4 measurement ID — public by design (it ships in the page).
    // Override or clear it with NEXT_PUBLIC_GA_ID.
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-LQEHGRQFD1",

    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",

    // Search Console "HTML tag" method: only the content="…" value. Empty = no tag.
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION ?? "",

    pricing: { amount: 3999, currency: "USD", period: "month" },

    // Real profile URLs only — these feed the footer links and schema.org
    // `sameAs`. While a value is empty its footer label still shows but is not
    // clickable, and it is left out of the schema.
    social: {
        x: "" as string,
        linkedin: "" as string,
        instagram: "https://www.instagram.com/your.momstudio/" as string
    }
} as const;

/** The monthly price as shown on the page, e.g. "$3,999" — matches the Service schema. */
export const PRICE_LABEL = `$${SITE.pricing.amount.toLocaleString("en-US")}`;

export const absoluteUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

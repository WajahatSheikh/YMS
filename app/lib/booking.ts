import { SITE } from "@/app/data/site";

// Props for every "Book a call" link.
//
// - One destination for the whole site (SITE.bookingUrl), so changing the
//   scheduling link is a single edit or env change.
// - `data-booking` hands the click to BookingModal, which opens a Calendly link
//   in an on-page modal instead of leaving the site. Modifier-clicks, a
//   non-Calendly URL, or JavaScript not having loaded yet all fall back to the
//   plain link, in a new tab.
// - `data-cta` names where the click came from. In Google Tag Manager, a
//   "Click — All Elements" trigger on `[data-cta]` gives one event per
//   placement (hero, header, pricing, faq, footer); BookingModal also pushes
//   `book_call_open` and `book_call_scheduled` to the dataLayer with that name.
export function bookingLinkProps(placement: string) {
    const href = SITE.bookingUrl;
    const external = /^https?:\/\//.test(href);
    return {
        href,
        "data-booking": "",
        "data-cta": `book-call-${placement}`,
        ...(external ? { target: "_blank", rel: "noopener" } : {})
    } as const;
}

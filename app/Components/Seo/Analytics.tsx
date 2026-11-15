import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SITE } from "@/app/data/site";

// Analytics tags, kept off the critical rendering path. The small inline config
// runs after hydration (`afterInteractive`) so the dataLayer queue exists for
// early events (the booking modal); the 100 KB+ gtag.js library itself waits
// for the page's load event (`lazyOnload`) and then processes that queue.
// `afterInteractive` on the library made Next add a high-priority <link
// rel=preload> for it in <head>, which competed with the CSS for bandwidth
// on slow phones and pushed the first paint (and LCP) back.
//
// Google Analytics 4 (gtag.js) — SITE.gaId. Loads only on the live production
// deployment (Vercel sets VERCEL_ENV=production there), so local dev, local
// builds and preview deployments don't add fake visits to the reports. Page
// views come from the config call plus GA4's enhanced measurement, which also
// counts client-side navigations into the case studies. The booking modal sends
// `book_call_open` and `book_call_scheduled` events (BookingModal.tsx) — mark
// `book_call_scheduled` as a key event in GA4 to count booked calls.
//
// Vercel Web Analytics — cookieless visitor and page-view counts in the Vercel
// dashboard (Project → Analytics). The script only reports on Vercel
// deployments and is served from the site's own /_vercel/insights path.
//
// Google Tag Manager — loads only when NEXT_PUBLIC_GTM_ID is set, for Google
// Ads conversions and remarketing configured inside the container. If GA4 is
// later moved into GTM, clear NEXT_PUBLIC_GA_ID so visits aren't counted twice.
// Every "Book a call" link carries `data-cta="book-call-<placement>"` (see
// app/lib/booking.ts) for click triggers.
const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;
const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

const isLiveSite = process.env.VERCEL_ENV === "production";

const GoogleAnalytics = ({ id }: { id: string }) => (
    <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
        <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}
        </Script>
    </>
);

const GoogleTagManager = ({ id }: { id: string }) => (
    <>
        <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
        </Script>
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${id}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
            />
        </noscript>
    </>
);

export default function Analytics() {
    const ga = isLiveSite && GA_ID_PATTERN.test(SITE.gaId) ? SITE.gaId : null;
    const gtm = GTM_ID_PATTERN.test(SITE.gtmId) ? SITE.gtmId : null;

    return (
        <>
            {ga && <GoogleAnalytics id={ga} />}
            {gtm && <GoogleTagManager id={gtm} />}
            <VercelAnalytics />
        </>
    );
}

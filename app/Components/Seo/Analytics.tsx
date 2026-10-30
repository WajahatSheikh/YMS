import Script from "next/script";
import { SITE } from "@/app/data/site";

// Analytics tags, both kept off the critical rendering path (`afterInteractive`).
//
// Google Analytics 4 (gtag.js) — SITE.gaId. Loads only on the live production
// deployment (Vercel sets VERCEL_ENV=production there), so local dev, local
// builds and preview deployments don't add fake visits to the reports. Page
// views come from the config call plus GA4's enhanced measurement, which also
// counts client-side navigations into the case studies. The booking modal sends
// `book_call_open` and `book_call_scheduled` events (BookingModal.tsx) — mark
// `book_call_scheduled` as a key event in GA4 to count booked calls.
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
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
        </>
    );
}

"use client";

import { useEffect } from "react";

// One delegated listener for the clicks GA4 can't see on its own:
// - `contact_email_click`: any mailto: link (footer, FAQ, book-a-call page).
//   Marked as a key event in GA4 next to `book_call_scheduled`.
// - `case_study_click`: any link into /portfolio/…, with the page it was
//   clicked on, so the reports show whether the home page sends people on.
// `location` is the nearest section id (or "footer"), so placements can be
// compared. gtag only exists on the live site (Analytics.tsx); elsewhere this
// sends nothing. The Window.gtag type is declared in BookingModal.tsx.
const placement = (el: Element) => {
    if (el.closest("footer")) return "footer";
    return el.closest("section[id]")?.id ?? "page";
};

const ClickTracking = () => {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const link = (e.target as Element | null)?.closest?.("a[href]");
            if (!link || !window.gtag) return;
            const href = link.getAttribute("href") ?? "";

            if (href.startsWith("mailto:")) {
                window.gtag("event", "contact_email_click", { location: placement(link) });
                return;
            }

            const url = new URL(href, window.location.href);
            if (url.origin === window.location.origin && url.pathname.startsWith("/portfolio/")) {
                window.gtag("event", "case_study_click", {
                    case_study: url.pathname,
                    from_page: window.location.pathname,
                    location: placement(link)
                });
            }
        };

        document.addEventListener("click", onClick, { capture: true });
        return () => document.removeEventListener("click", onClick, { capture: true });
    }, []);

    return null;
};

export default ClickTracking;

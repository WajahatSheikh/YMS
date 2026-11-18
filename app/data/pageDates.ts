// When each page's content last really changed (YYYY-MM-DD).
//
// One source for the sitemap's <lastmod> and the "Updated" line shown on the
// page. Google only trusts lastmod from sites where it is accurate, so this is a
// hand-kept date, not the build time: change a page's date when you change what
// the page says, and leave it alone for a redeploy or a styling tweak.

export const PAGE_UPDATED: Record<string, string> = {
    "/": "2026-11-18",
    "/design-subscription": "2026-11-18",
    "/pricing": "2026-11-18",
    "/book-a-call": "2026-11-15",
    "/process": "2026-11-18",
    "/team": "2026-11-18",
    "/faq": "2026-11-18",
    "/services": "2026-11-18"
};

/** Service pages share one date unless a page is edited on its own. */
export const SERVICES_UPDATED = "2026-11-18";

/** "15 November 2026" for an ISO date. */
export const formatUpdated = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** The page's last-edit date, if it has one on record. */
export const updatedFor = (path: string): string | undefined =>
    PAGE_UPDATED[path] ?? (path.startsWith("/services/") ? SERVICES_UPDATED : undefined);

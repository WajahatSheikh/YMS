import type { NextConfig } from "next";

// Security headers sent with every response.
//
// The Content-Security-Policy is deliberately limited to directives that can't
// break the page: no plugins, no <base> hijacking, forms only post to us, and
// the site can't be framed by another origin (clickjacking). Script and frame
// sources aren't restricted — the inline theme script, Google Tag Manager and
// the Calendly booking iframe would each need allow-listing, and nonces would
// force every page to render dynamically instead of statically.
//
// HSTS leaves out includeSubDomains: mail/webmail subdomains are served by the
// hosting panel, not Vercel, and may not all have certificates.
const SECURITY_HEADERS = [
    {
        key: "Content-Security-Policy",
        value: "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'"
    },
    { key: "Strict-Transport-Security", value: "max-age=63072000" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" }
];

const nextConfig: NextConfig = {
    // Lets a production build run beside `next dev` without clobbering .next.
    distDir: process.env.NEXT_DIST_DIR || ".next",
    poweredByHeader: false,
    sassOptions: {
        // Note: no `additionalData` here — globals.scss opens with `@use`, and
        // Sass requires `@use` to precede every other rule, so a prepended
        // `@import` breaks the build. Stylesheets import _variables.scss directly.
        silenceDeprecations: ["import", "legacy-js-api"]
    },
    async headers() {
        return [{ source: "/:path*", headers: SECURITY_HEADERS }];
    }
};

export default nextConfig;

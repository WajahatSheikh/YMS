import type { Metadata } from "next";
import Link from "next/link";

// Branded 404. Next.js serves it with a real 404 status, so search engines drop
// dead URLs instead of indexing a "soft 404"; the noindex is belt and braces.
export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false, follow: true }
};

export default function NotFound() {
    return (
        <main
            id="main"
            style={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-5)",
                padding: "var(--space-16) var(--gutter)",
                textAlign: "center"
            }}
        >
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-brand)", letterSpacing: "0.1em" }}>404</p>
            <h1 className="display-s" style={{ color: "var(--text-primary)" }}>
                This page doesn&rsquo;t exist
            </h1>
            <p className="body-l" style={{ color: "var(--text-tertiary)", maxWidth: "46ch" }}>
                The link may be old or mistyped. Everything we do is on the home page.
            </p>
            <Link
                href="/"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    height: "var(--control-lg)",
                    padding: "0 var(--space-6)",
                    borderRadius: "var(--radius-full)",
                    background: "var(--gradient-brand)",
                    color: "var(--text-on-brand)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500
                }}
            >
                Back to home
            </Link>
        </main>
    );
}

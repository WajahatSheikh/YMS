import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";
import Wrapper from "./Components/Wrapper/Wrapper";
import Footer from "./Components/Footer/Footer";
import Analytics from "./Components/Seo/Analytics";
import { SITE } from "./data/site";
import { THEME_COLOR, THEME_INIT_SCRIPT } from "./lib/theme";

// ── Fonts ────────────────────────────────────────────────────────────────────
// Stack Sans Notch is self-hosted via next/font/local: the files ship from our
// own origin, so there is no render-blocking request to a font CDN on first
// paint. Only the two weights the display scale uses are wired up — 500
// (Display/XS, Display/2XS) and 600 (Display/L, M, S). The 400/700 files are
// kept in ./fonts, so adding a weight back is one line.
const stackSans = localFont({
    variable: "--font-stack-sans",
    display: "swap",
    src: [
        { path: "./fonts/StackSansNotch-500.woff2", weight: "500", style: "normal" },
        { path: "./fonts/StackSansNotch-600.woff2", weight: "600", style: "normal" }
    ]
});

const geist = Geist({
    variable: "--font-geist",
    subsets: ["latin"],
    display: "swap"
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap"
});

// The pre-redesign faces (IBM Plex Mono/Sans, Inter, Inter Tight) are no longer
// loaded. Their CSS variables are aliased to the design-system faces in
// _tokens.scss, so the few legacy stylesheets that still reference them render
// in Geist / Geist Mono instead of downloading four extra families.

// ── SEO ──────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: {
        default: SITE.title,
        template: `%s | ${SITE.name}`
    },
    description: SITE.description,
    applicationName: SITE.name,
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: "/",
        siteName: SITE.name,
        locale: SITE.locale,
        title: SITE.title,
        description: SITE.description
        // images come from app/opengraph-image.tsx
    },
    twitter: {
        card: "summary_large_image",
        title: SITE.title,
        description: SITE.description
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
    },
    formatDetection: { telephone: false, email: false, address: false },
    category: "technology"
};

export const viewport: Viewport = {
    // Dark is the default theme; the pre-paint script and ThemeToggle update the
    // theme-color meta when the visitor is on light.
    themeColor: THEME_COLOR.dark,
    colorScheme: "dark light",
    width: "device-width",
    initialScale: 1
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // The font variables must live on <html>, not <body>: _tokens.scss declares
        // --font-display/--font-sans/--font-mono on :root, and a custom property
        // that references an undefined variable is invalid at computed-value time.
        // data-theme defaults to dark in the server HTML; THEME_INIT_SCRIPT swaps it
        // before first paint, hence suppressHydrationWarning on <html>.
        <html
            lang="en"
            data-theme="dark"
            className={`${stackSans.variable} ${geist.variable} ${geistMono.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                <a className="skip-link" href="#main">
                    Skip to content
                </a>
                {/* Footer is a server component, so it is handed to the client
                    Wrapper as a slot rather than imported inside it. */}
                <Wrapper footer={<Footer />}>{children}</Wrapper>
                <Analytics />
            </body>
        </html>
    );
}

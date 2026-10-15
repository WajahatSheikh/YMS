import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Lets a production build run beside `next dev` without clobbering .next.
    distDir: process.env.NEXT_DIST_DIR || ".next",
    poweredByHeader: false,
    sassOptions: {
        // Note: no `additionalData` here — globals.scss opens with `@use`, and
        // Sass requires `@use` to precede every other rule, so a prepended
        // `@import` breaks the build. Stylesheets import _variables.scss directly.
        silenceDeprecations: ["import", "legacy-js-api"]
    }
};

export default nextConfig;
